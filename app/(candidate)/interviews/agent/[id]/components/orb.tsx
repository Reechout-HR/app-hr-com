"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { cn } from "@/lib/ui/cn";

export type AgentState = "speaking" | "listening" | "thinking" | "connecting" | "idle" | null;

interface OrbProps {
  state: AgentState;
  colors?: [string, string];
  className?: string;
}

export function Orb({ state, colors = ["#611f69", "#a76abc"], className }: OrbProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const sphereRef = useRef<THREE.Mesh | null>(null);
  const frameIdRef = useRef<number | null>(null);
  const uniformsRef = useRef<Record<string, { value: number | THREE.Color }>>({});

  // We map the state to an "intensity" value that drives the shader
  const getTargetIntensity = (s: AgentState) => {
    switch (s) {
      case "speaking": return 2.0;
      case "listening": return 1.0;
      case "thinking": return 1.5;
      case "connecting": return 0.8;
      case "idle":
      default: return 0.5;
    }
  };

  useEffect(() => {
    if (!mountRef.current) return;
    
    const mountNode = mountRef.current;

    // Setup THREE.js Scene
    const width = mountNode.clientWidth || 300;
    const height = mountNode.clientHeight || 300;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 5;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountNode.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Shader Uniforms
    const uniforms = {
      uTime: { value: 0.0 },
      uIntensity: { value: getTargetIntensity(state) },
      uColor1: { value: new THREE.Color(colors[0]) },
      uColor2: { value: new THREE.Color(colors[1]) }
    };
    uniformsRef.current = uniforms;

    // Geometry & Material
    const geometry = new THREE.IcosahedronGeometry(2, 64);
    
    // Custom Shader Material mimicking a glowing, pulsating orb
    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: `
        uniform float uTime;
        uniform float uIntensity;
        varying vec2 vUv;
        varying vec3 vNormal;
        
        // Simplex noise function
        vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
        vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
        
        float snoise(vec3 v) {
          const vec2 C = vec2(1.0/6.0, 1.0/3.0);
          const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
          vec3 i  = floor(v + dot(v, C.yyy));
          vec3 x0 = v - i + dot(i, C.xxx);
          vec3 g = step(x0.yzx, x0.xyz);
          vec3 l = 1.0 - g;
          vec3 i1 = min(g.xyz, l.zxy);
          vec3 i2 = max(g.xyz, l.zxy);
          vec3 x1 = x0 - i1 + C.xxx;
          vec3 x2 = x0 - i2 + C.yyy;
          vec3 x3 = x0 - D.yyy;
          i = mod289(i);
          vec4 p = permute(permute(permute(
                     i.z + vec4(0.0, i1.z, i2.z, 1.0))
                   + i.y + vec4(0.0, i1.y, i2.y, 1.0))
                   + i.x + vec4(0.0, i1.x, i2.x, 1.0));
          float n_ = 0.142857142857;
          vec3  ns = n_ * D.wyz - D.xzx;
          vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
          vec4 x_ = floor(j * ns.z);
          vec4 y_ = floor(j - 7.0 * x_);
          vec4 x = x_ *ns.x + ns.yyyy;
          vec4 y = y_ *ns.x + ns.yyyy;
          vec4 h = 1.0 - abs(x) - abs(y);
          vec4 b0 = vec4(x.xy, y.xy);
          vec4 b1 = vec4(x.zw, y.zw);
          vec4 s0 = floor(b0)*2.0 + 1.0;
          vec4 s1 = floor(b1)*2.0 + 1.0;
          vec4 sh = -step(h, vec4(0.0));
          vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
          vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
          vec3 p0 = vec3(a0.xy, h.x);
          vec3 p1 = vec3(a0.zw, h.y);
          vec3 p2 = vec3(a1.xy, h.z);
          vec3 p3 = vec3(a1.zw, h.w);
          vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
          p0 *= norm.x;
          p1 *= norm.y;
          p2 *= norm.z;
          p3 *= norm.w;
          vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
          m = m * m;
          return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
        }

        void main() {
          vUv = uv;
          vNormal = normal;
          
          // Add noise displacement based on time and intensity
          float noise = snoise(position * 0.8 + uTime * 0.5) * 0.2 * uIntensity;
          vec3 newPosition = position + normal * noise;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform float uIntensity;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        varying vec2 vUv;
        varying vec3 vNormal;

        void main() {
          // Mix colors based on UV and time
          float mixValue = (sin(vUv.x * 10.0 + uTime) + cos(vUv.y * 10.0 + uTime)) * 0.5 + 0.5;
          vec3 color = mix(uColor1, uColor2, mixValue);
          
          // Add glow/fresnel effect
          float fresnel = dot(vNormal, vec3(0.0, 0.0, 1.0));
          fresnel = clamp(1.0 - fresnel, 0.0, 1.0);
          fresnel = pow(fresnel, 3.0);
          
          // Boost brightness based on intensity
          color += color * fresnel * uIntensity;
          
          gl_FragColor = vec4(color, 0.85);
        }
      `,
      transparent: true,
      wireframe: false,
    });

    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);
    sphereRef.current = sphere;

    // Add ambient lighting to the scene wrapper if needed, 
    // but shader material doesn't react to standard lights directly without specific setup.

    // Animation Loop
    const clock = new THREE.Clock();
    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Update uniforms
      if (uniformsRef.current) {
        uniformsRef.current.uTime.value = elapsedTime;
        
        // Smoothly interpolate intensity
        const targetIntensity = getTargetIntensity(state);
        const currentIntensity = uniformsRef.current.uIntensity.value as number;
        uniformsRef.current.uIntensity.value = currentIntensity + (targetIntensity - currentIntensity) * 0.05;
      }

      // Rotate sphere slowly
      if (sphereRef.current) {
        sphereRef.current.rotation.y += 0.002;
        sphereRef.current.rotation.x += 0.001;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Handle Resize
    const handleResize = () => {
      if (!mountNode || !rendererRef.current || !cameraRef.current) return;
      const newWidth = mountNode.clientWidth;
      const newHeight = mountNode.clientHeight;
      rendererRef.current.setSize(newWidth, newHeight);
      cameraRef.current.aspect = newWidth / newHeight;
      cameraRef.current.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (frameIdRef.current !== null) cancelAnimationFrame(frameIdRef.current);
      if (mountNode && rendererRef.current) mountNode.removeChild(rendererRef.current.domElement);
      
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [state, colors]);

  // Update uniforms when props change without full re-render
  useEffect(() => {
    if (uniformsRef.current?.uColor1?.value instanceof THREE.Color && uniformsRef.current?.uColor2?.value instanceof THREE.Color) {
      uniformsRef.current.uColor1.value.set(colors[0]);
      uniformsRef.current.uColor2.value.set(colors[1]);
    }
  }, [colors]);

  return <div ref={mountRef} className={cn("w-full h-full", className)} />;
}
