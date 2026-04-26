"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import * as THREE from "three";
import { cn } from "@/lib/utils";

export type AgentState = null | "thinking" | "listening" | "talking";

interface OrbProps {
  colors?: [string, string];
  colorsRef?: React.RefObject<[string, string]>;
  resizeDebounce?: number;
  seed?: number;
  agentState?: AgentState;
  volumeMode?: "auto" | "manual";
  manualInput?: number;
  manualOutput?: number;
  inputVolumeRef?: React.RefObject<number>;
  outputVolumeRef?: React.RefObject<number>;
  getInputVolume?: () => number;
  getOutputVolume?: () => number;
  className?: string;
  height?: string | number;
  width?: string | number;
}

const vertexShader = `
uniform float uTime;
uniform sampler2D uPerlinTexture;
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform float uTime;
uniform float uAnimation;
uniform float uInverted;
uniform float uOffsets[7];
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform float uInputVolume;
uniform float uOutputVolume;
uniform float uOpacity;
uniform sampler2D uPerlinTexture;
varying vec2 vUv;

const float PI = 3.14159265358979323846;

bool drawOval(vec2 polarUv, vec2 polarCenter, float a, float b, bool reverseGradient, float softness, out vec4 color) {
    vec2 p = polarUv - polarCenter;
    float oval = (p.x * p.x) / (a * a) + (p.y * p.y) / (b * b);
    float edge = smoothstep(1.0, 1.0 - softness, oval);
    if (edge > 0.0) {
        float gradient = reverseGradient ? (1.0 - (p.x / a + 1.0) / 2.0) : ((p.x / a + 1.0) / 2.0);
        gradient = mix(0.5, gradient, 0.1);
        color = vec4(vec3(gradient), 0.85 * edge);
        return true;
    }
    return false;
}

vec3 colorRamp(float grayscale, vec3 color1, vec3 color2, vec3 color3, vec3 color4) {
    if (grayscale < 0.33) {
        return mix(color1, color2, grayscale * 3.0);
    } else if (grayscale < 0.66) {
        return mix(color2, color3, (grayscale - 0.33) * 3.0);
    } else {
        return mix(color3, color4, (grayscale - 0.66) * 3.0);
    }
}

vec2 hash2(vec2 p) {
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}

float noise2D(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    float n = mix(
        mix(dot(hash2(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
            dot(hash2(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
        mix(dot(hash2(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
            dot(hash2(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x),
        u.y
    );
    return 0.5 + 0.5 * n;
}

float sharpRing(vec3 decomposed, float time) {
    float ringStart = 1.0;
    float ringWidth = 0.3;
    float noiseScale = 5.0;
    float noise = mix(
        noise2D(vec2(decomposed.x, time) * noiseScale),
        noise2D(vec2(decomposed.y, time) * noiseScale),
        decomposed.z
    );
    noise = (noise - 0.5) * 2.5;
    return ringStart + noise * ringWidth * 1.5;
}

float smoothRing(vec3 decomposed, float time) {
    float ringStart = 0.9;
    float ringWidth = 0.2;
    float noiseScale = 6.0;
    float noise = mix(
        noise2D(vec2(decomposed.x, time) * noiseScale),
        noise2D(vec2(decomposed.y, time) * noiseScale),
        decomposed.z
    );
    noise = (noise - 0.5) * 5.0;
    return ringStart + noise * ringWidth;
}

float flow(vec3 decomposed, float time, sampler2D perlinTex) {
    return mix(
        texture(perlinTex, vec2(time, decomposed.x / 2.0)).r,
        texture(perlinTex, vec2(time, decomposed.y / 2.0)).r,
        decomposed.z
    );
}

void main() {
    vec2 uv = vUv * 2.0 - 1.0;
    float radius = length(uv);
    float theta = atan(uv.y, uv.x);
    if (theta < 0.0) theta += 2.0 * PI;

    vec3 decomposed = vec3(
        theta / (2.0 * PI),
        mod(theta / (2.0 * PI) + 0.5, 1.0) + 1.0,
        abs(theta / PI - 1.0)
    );

    float noise = flow(decomposed, radius * 0.03 - uAnimation * 0.2, uPerlinTexture) - 0.5;
    theta += noise * mix(0.08, 0.25, uOutputVolume);

    vec4 color = vec4(1.0, 1.0, 1.0, 1.0);
    float originalCenters[7] = float[7](0.0, 0.5 * PI, 1.0 * PI, 1.5 * PI, 2.0 * PI, 2.5 * PI, 3.0 * PI);
    float centers[7];
    for (int i = 0; i < 7; i++) {
        centers[i] = originalCenters[i] + 0.5 * sin(uTime / 20.0 + uOffsets[i]);
    }

    float a, b;
    vec4 ovalColor;
    for (int i = 0; i < 7; i++) {
        float noiseVal = texture(uPerlinTexture, vec2(mod(centers[i] + uTime * 0.05, 1.0), 0.5)).r;
        a = 0.5 + noiseVal * 0.3;
        b = noiseVal * mix(3.5, 2.5, uInputVolume);
        bool reverseGradient = (i % 2 == 1);
        float distTheta = min(
            abs(theta - centers[i]),
            min(
                abs(theta + 2.0 * PI - centers[i]),
                abs(theta - 2.0 * PI - centers[i])
            )
        );
        float softness = 0.6;
        if (drawOval(vec2(distTheta, radius), vec2(0.0, 0.0), a, b, reverseGradient, softness, ovalColor)) {
            color.rgb = mix(color.rgb, ovalColor.rgb, ovalColor.a);
            color.a = max(color.a, ovalColor.a);
        }
    }
    
    float ringRadius1 = sharpRing(decomposed, uTime * 0.1);
    float ringRadius2 = smoothRing(decomposed, uTime * 0.1);
    float inputRadius1 = radius + uInputVolume * 0.2;
    float inputRadius2 = radius + uInputVolume * 0.15;
    float opacity1 = mix(0.2, 0.6, uInputVolume);
    float opacity2 = mix(0.15, 0.45, uInputVolume);
    float ringAlpha1 = (inputRadius2 >= ringRadius1) ? opacity1 : 0.0;
    float ringAlpha2 = smoothstep(ringRadius2 - 0.05, ringRadius2 + 0.05, inputRadius1) * opacity2;
    float totalRingAlpha = max(ringAlpha1, ringAlpha2);
    vec3 ringColor = vec3(1.0);
    color.rgb = 1.0 - (1.0 - color.rgb) * (1.0 - ringColor * totalRingAlpha);

    vec3 c1 = vec3(0.0);
    vec3 c2 = uColor1;
    vec3 c3 = uColor2;
    vec3 c4 = vec3(1.0);

    float luminance = mix(color.r, 1.0 - color.r, uInverted);
    color.rgb = colorRamp(luminance, c1, c2, c3, c4);
    color.a *= uOpacity;

    gl_FragColor = color;
}
`;

export const Orb: React.FC<OrbProps> = ({
  colors = ["#CADCFC", "#A0B9D1"],
  colorsRef,
  resizeDebounce = 100,
  seed,
  agentState = null,
  volumeMode = "auto",
  manualInput,
  manualOutput,
  inputVolumeRef,
  outputVolumeRef,
  getInputVolume,
  getOutputVolume,
  className,
  height,
  width,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const uniformsRef = useRef<any>(null);
  const clockRef = useRef(new THREE.Clock());
  const animationFrameIdRef = useRef<number | null>(null);

  const curInRef = useRef(0);
  const curOutRef = useRef(0);
  const animSpeedRef = useRef(0.1);
  const targetColor1Ref = useRef(new THREE.Color(colors[0]));
  const targetColor2Ref = useRef(new THREE.Color(colors[1]));

  const splitmix32 = (a: number) => {
    return () => {
      a |= 0;
      a = (a + 0x9e3779b9) | 0;
      let t = a ^ (a >>> 16);
      t = Math.imul(t, 0x21f0aaad);
      t = t ^ (t >>> 15);
      t = Math.imul(t, 0x735a2d97);
      return ((t = t ^ (t >>> 15)) >>> 0) / 4294967296;
    };
  };

  const clamp01 = (n: number) => {
    if (!Number.isFinite(n)) return 0;
    return Math.min(1, Math.max(0, n));
  };

  const updateSize = () => {
    if (!containerRef.current || !rendererRef.current || !cameraRef.current)
      return;
    const { clientWidth, clientHeight } = containerRef.current;
    if (clientWidth === 0 || clientHeight === 0) return;

    rendererRef.current.setSize(clientWidth, clientHeight);

    const aspect = clientWidth / clientHeight;
    let left, right, top, bottom;

    if (aspect > 1) {
      left = -3.5 * aspect;
      right = 3.5 * aspect;
      top = 3.5;
      bottom = -3.5;
    } else {
      left = -3.5;
      right = 3.5;
      top = 3.5 / aspect;
      bottom = -3.5 / aspect;
    }

    cameraRef.current.left = left;
    cameraRef.current.right = right;
    cameraRef.current.top = top;
    cameraRef.current.bottom = bottom;
    cameraRef.current.updateProjectionMatrix();
  };

  useEffect(() => {
    targetColor1Ref.current.set(colors[0]);
    targetColor2Ref.current.set(colors[1]);
  }, [colors]);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      premultipliedAlpha: true,
    });
    rendererRef.current = renderer;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.OrthographicCamera(-3.5, 3.5, 3.5, -3.5, -100, 100);
    cameraRef.current = camera;

    const loader = new THREE.TextureLoader();
    const perlinNoiseTexture = loader.load(
      "https://storage.googleapis.com/eleven-public-cdn/images/perlin-noise.png"
    );
    perlinNoiseTexture.wrapS = THREE.RepeatWrapping;
    perlinNoiseTexture.wrapT = THREE.RepeatWrapping;

    const random = splitmix32(seed ?? Math.floor(Math.random() * 2 ** 32));
    const offsets = new Float32Array(
      Array.from({ length: 7 }, () => random() * Math.PI * 2)
    );

    const isDark = document.documentElement.classList.contains("dark");
    const uniforms = {
      uColor1: { value: new THREE.Color(colors[0]) },
      uColor2: { value: new THREE.Color(colors[1]) },
      uOffsets: { value: offsets },
      uPerlinTexture: { value: perlinNoiseTexture },
      uTime: { value: 0 },
      uAnimation: { value: 0.1 },
      uInverted: { value: isDark ? 1 : 0 },
      uInputVolume: { value: 0 },
      uOutputVolume: { value: 0 },
      uOpacity: { value: 0 },
    };
    uniformsRef.current = uniforms;

    const geometry = new THREE.CircleGeometry(3.5, 64);
    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    updateSize();

    const animate = () => {
      animationFrameIdRef.current = requestAnimationFrame(animate);

      const delta = clockRef.current.getDelta();
      const u = uniformsRef.current;
      if (!u || !rendererRef.current || !sceneRef.current || !cameraRef.current)
        return;

      if (colorsRef?.current) {
        const live = colorsRef.current;
        if (live[0]) targetColor1Ref.current.set(live[0]);
        if (live[1]) targetColor2Ref.current.set(live[1]);
      }

      u.uTime.value += delta * 0.5;

      if (u.uOpacity.value < 1) {
        u.uOpacity.value = Math.min(1, u.uOpacity.value + delta * 2);
      }

      let targetIn = 0;
      let targetOut = 0.3;

      if (volumeMode === "manual") {
        targetIn = clamp01(
          manualInput ??
            inputVolumeRef?.current ??
            getInputVolume?.() ??
            0
        );
        targetOut = clamp01(
          manualOutput ??
            outputVolumeRef?.current ??
            getOutputVolume?.() ??
            0
        );
      } else {
        const t = u.uTime.value * 2;
        if (agentState === null) {
          targetIn = 0;
          targetOut = 0.3;
        } else if (agentState === "listening") {
          targetIn = clamp01(0.55 + Math.sin(t * 3.2) * 0.35);
          targetOut = 0.45;
        } else if (agentState === "talking") {
          targetIn = clamp01(0.65 + Math.sin(t * 4.8) * 0.22);
          targetOut = clamp01(0.75 + Math.sin(t * 3.6) * 0.22);
        } else {
          const base = 0.38 + 0.07 * Math.sin(t * 0.7);
          const wander = 0.05 * Math.sin(t * 2.1) * Math.sin(t * 0.37 + 1.2);
          targetIn = clamp01(base + wander);
          targetOut = clamp01(0.48 + 0.12 * Math.sin(t * 1.05 + 0.6));
        }
      }

      curInRef.current += (targetIn - curInRef.current) * 0.2;
      curOutRef.current += (targetOut - curOutRef.current) * 0.2;

      const targetSpeed = 0.1 + (1 - Math.pow(curOutRef.current - 1, 2)) * 0.9;
      animSpeedRef.current += (targetSpeed - animSpeedRef.current) * 0.12;

      u.uAnimation.value += delta * animSpeedRef.current;
      u.uInputVolume.value = curInRef.current;
      u.uOutputVolume.value = curOutRef.current;
      u.uColor1.value.lerp(targetColor1Ref.current, 0.08);
      u.uColor2.value.lerp(targetColor2Ref.current, 0.08);

      rendererRef.current.render(sceneRef.current, cameraRef.current);
    };

    animate();

    const resizeObserver = new ResizeObserver(() => {
      updateSize();
    });
    resizeObserver.observe(containerRef.current);

    const mutationObserver = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains("dark");
      if (uniformsRef.current) {
        uniformsRef.current.uInverted.value = isDark ? 1 : 0;
      }
    });
    mutationObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const handleContextLost = (event: Event) => {
      event.preventDefault();
      setTimeout(() => {
        renderer.forceContextRestore();
      }, 1);
    };
    canvas.addEventListener("webglcontextlost", handleContextLost, false);

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      resizeObserver.disconnect();
      mutationObserver.disconnect();
      canvas.removeEventListener("webglcontextlost", handleContextLost);
      renderer.dispose();
      perlinNoiseTexture.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, [seed]); // Re-init only if seed changes

  const getContainerStyles = () => {
    const styles: React.CSSProperties = {};
    if (width !== undefined) {
      styles.width = typeof width === "number" ? `${width}px` : width;
    }
    if (height !== undefined) {
      styles.height = typeof height === "number" ? `${height}px` : height;
    }
    return styles;
  };

  return (
    <div
      ref={containerRef}
      className={cn("relative h-full w-full", className)}
      style={getContainerStyles()}
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};
