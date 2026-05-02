/**
 * Browser-side audio plumbing for the Gemini Live candidate agent.
 *
 * Design notes:
 * - Mic `AudioContext` runs at 16 kHz so the browser's native resampler does
 *   the heavy lifting — we never touch a sample on the main thread except to
 *   convert Float32 → PCM16 on the already-small buffered frames.
 * - Mic frames are 32 ms (512 samples @ 16 kHz). Matches the 20-40 ms chunking
 *   guidance Google publishes for Gemini Live and keeps barge-in snappy.
 * - Playback runs at a dedicated 24 kHz `AudioContext` with a single
 *   `AudioWorkletProcessor` that owns a queue and streams continuously. On
 *   `interrupted` we post `"interrupt"` to the worklet which drains the queue
 *   on the audio thread — no allocations, no races with the main thread.
 * - Both worklets are inline string literals converted to Blob URLs, so we
 *   don't ship standalone `.js` files under `/public/`.
 */

const CAPTURE_RATE = 16000;
const PLAYBACK_RATE = 24000;

// --- Inline worklet source ------------------------------------------------

const CAPTURE_WORKLET_SRC = `
class AudioCaptureProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.bufferSize = 512; // 32ms @ 16kHz
    this.buffer = new Float32Array(this.bufferSize);
    this.bufferIndex = 0;
  }
  process(inputs) {
    const input = inputs[0];
    if (!input || input.length === 0) return true;
    const ch = input[0];
    if (!ch) return true;
    for (let i = 0; i < ch.length; i++) {
      this.buffer[this.bufferIndex++] = ch[i];
      if (this.bufferIndex >= this.bufferSize) {
        this.port.postMessage(this.buffer);
        this.buffer = new Float32Array(this.bufferSize);
        this.bufferIndex = 0;
      }
    }
    return true;
  }
}
registerProcessor("gemini-capture", AudioCaptureProcessor);
`;

const PLAYBACK_WORKLET_SRC = `
class PCMPlaybackProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.queue = [];
    this.offset = 0;
    this.port.onmessage = (e) => {
      if (e.data === "interrupt") {
        this.queue = [];
        this.offset = 0;
      } else if (e.data instanceof Float32Array) {
        this.queue.push(e.data);
      }
    };
  }
  process(_inputs, outputs) {
    const out = outputs[0];
    if (!out || out.length === 0) return true;
    const ch = out[0];
    let i = 0;
    while (i < ch.length && this.queue.length > 0) {
      const buf = this.queue[0];
      if (!buf || buf.length === 0) {
        this.queue.shift();
        this.offset = 0;
        continue;
      }
      const remOut = ch.length - i;
      const remBuf = buf.length - this.offset;
      const n = Math.min(remOut, remBuf);
      for (let k = 0; k < n; k++) ch[i++] = buf[this.offset++];
      if (this.offset >= buf.length) {
        this.queue.shift();
        this.offset = 0;
      }
    }
    while (i < ch.length) ch[i++] = 0;
    return true;
  }
}
registerProcessor("gemini-playback", PCMPlaybackProcessor);
`;

function moduleUrl(src: string): string {
  return URL.createObjectURL(new Blob([src], { type: "text/javascript" }));
}

function float32ToPCM16(input: Float32Array): ArrayBuffer {
  const out = new Int16Array(input.length);
  for (let i = 0; i < input.length; i++) {
    const s = Math.max(-1, Math.min(1, input[i]));
    out[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
  }
  return out.buffer;
}

function pcm16ToFloat32(buffer: ArrayBuffer): Float32Array {
  const pcm = new Int16Array(buffer);
  const out = new Float32Array(pcm.length);
  for (let i = 0; i < pcm.length; i++) {
    out[i] = pcm[i] / 32768;
  }
  return out;
}

// --- Public API -----------------------------------------------------------

export interface GeminiAudioController {
  start: (onAudio: (pcm16: ArrayBuffer) => void) => Promise<void>;
  playAudio: (data: ArrayBuffer) => void;
  stopPlayback: () => void;
  stop: () => Promise<void>;
  isActive: () => boolean;
}

export function createGeminiAudioController(): GeminiAudioController {
  let captureCtx: AudioContext | null = null;
  let playbackCtx: AudioContext | null = null;
  let mediaStream: MediaStream | null = null;
  let captureNode: AudioWorkletNode | null = null;
  let playbackNode: AudioWorkletNode | null = null;
  let active = false;
  // Keep the Blob URLs around so we can revoke them on teardown.
  let captureUrl: string | null = null;
  let playbackUrl: string | null = null;

  async function initPlayback(): Promise<AudioWorkletNode> {
    if (playbackNode && playbackCtx) return playbackNode;
    const Ctor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) throw new Error("AudioContext is not available in this browser");
    const ctx = new Ctor({ sampleRate: PLAYBACK_RATE });
    playbackUrl = moduleUrl(PLAYBACK_WORKLET_SRC);
    await ctx.audioWorklet.addModule(playbackUrl);
    const node = new AudioWorkletNode(ctx, "gemini-playback");
    node.connect(ctx.destination);
    if (ctx.state === "suspended") {
      await ctx.resume();
    }
    playbackCtx = ctx;
    playbackNode = node;
    return node;
  }

  async function start(onAudio: (pcm16: ArrayBuffer) => void): Promise<void> {
    if (active) return;

    // Playback comes first — initializing it inside the user-gesture click
    // handler satisfies iOS Safari's audio unlock requirement.
    await initPlayback();

    const Ctor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) throw new Error("AudioContext is not available in this browser");

    const ctx = new Ctor({ sampleRate: CAPTURE_RATE });
    captureUrl = moduleUrl(CAPTURE_WORKLET_SRC);
    await ctx.audioWorklet.addModule(captureUrl);
    if (ctx.state === "suspended") {
      await ctx.resume();
    }
    captureCtx = ctx;

    mediaStream = await navigator.mediaDevices.getUserMedia({
      audio: {
        channelCount: 1,
        sampleRate: CAPTURE_RATE,
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true,
      },
    });

    const source = ctx.createMediaStreamSource(mediaStream);
    const node = new AudioWorkletNode(ctx, "gemini-capture");
    captureNode = node;

    node.port.onmessage = (event: MessageEvent<Float32Array>) => {
      if (!active) return;
      onAudio(float32ToPCM16(event.data));
    };

    source.connect(node);
    active = true;
  }

  function playAudio(data: ArrayBuffer): void {
    const node = playbackNode;
    if (!node || !playbackCtx) return;
    if (playbackCtx.state === "suspended") {
      void playbackCtx.resume();
    }
    const frame = pcm16ToFloat32(data);
    if (frame.length === 0) return;
    node.port.postMessage(frame, [frame.buffer]);
  }

  function stopPlayback(): void {
    playbackNode?.port.postMessage("interrupt");
  }

  async function stop(): Promise<void> {
    active = false;

    if (captureNode) {
      try {
        captureNode.port.onmessage = null;
        captureNode.disconnect();
      } catch {
        /* noop */
      }
      captureNode = null;
    }

    if (mediaStream) {
      for (const t of mediaStream.getTracks()) {
        try {
          t.stop();
        } catch {
          /* noop */
        }
      }
      mediaStream = null;
    }

    if (playbackNode) {
      playbackNode.port.postMessage("interrupt");
      try {
        playbackNode.disconnect();
      } catch {
        /* noop */
      }
      playbackNode = null;
    }

    for (const ctx of [captureCtx, playbackCtx]) {
      if (!ctx) continue;
      try {
        await ctx.close();
      } catch {
        /* noop */
      }
    }
    captureCtx = null;
    playbackCtx = null;

    if (captureUrl) {
      URL.revokeObjectURL(captureUrl);
      captureUrl = null;
    }
    if (playbackUrl) {
      URL.revokeObjectURL(playbackUrl);
      playbackUrl = null;
    }
  }

  return {
    start,
    playAudio,
    stopPlayback,
    stop,
    isActive: () => active,
  };
}
