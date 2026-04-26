"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "next-themes";

function ParticleField({ count = 8000 }) {
  const mesh = useRef<THREE.Points>(null);
  const { resolvedTheme } = useTheme();

  // Initialize positions
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 25; // X
      pos[i * 3 + 1] = (Math.random() - 0.5) * 25; // Y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 25; // Z
    }
    return pos;
  }, [count]);

  useFrame((state, delta) => {
    if (mesh.current) {
      const posAttr = mesh.current.geometry.attributes.position;
      const array = posAttr.array as Float32Array;

      // Cap delta to prevent massive jumps when switching tabs
      const safeDelta = Math.min(delta, 0.1);

      for (let i = 0; i < count; i++) {
        const iy = i * 3 + 1;
        // Gentle upward movement
        array[iy] += safeDelta * 0.15; 

        // Wrap particles safely far off-screen
        if (array[iy] > 12.5) {
          array[iy] -= 25; // subtract full height to preserve relative spacing
        }
      }
      
      posAttr.needsUpdate = true;
      
      // Extremely slow rotation for subtle depth change
      mesh.current.rotation.y += safeDelta * 0.02;
    }
  });

  // Theme-aware color and opacity
  const isDark = resolvedTheme === "dark";
  const particleColor = isDark ? "#a855f7" : "#611f69";
  const particleOpacity = isDark ? 0.5 : 0.6; // Higher opacity for light mode visibility

  return (
    <group rotation={[0, 0, 0]}>
      <Points ref={mesh} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={particleColor}
          size={0.018} // Slightly larger for better visibility in light mode
          sizeAttenuation={true}
          depthWrite={false}
          opacity={particleOpacity}
        />
      </Points>
    </group>
  );
}

export function HeroParticleBackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none h-full w-full opacity-70 dark:opacity-80">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }} dpr={[1, 2]}>
        <ParticleField />
      </Canvas>
    </div>
  );
}
