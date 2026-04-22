"use client";

import Lenis from "lenis";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const LenisContext = createContext<Lenis | null>(null);

export function useLenis(): Lenis | null {
  return useContext(LenisContext);
}

export function LenisProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const instance = new Lenis({
      lerp: 0.09,
      smoothWheel: true,
      autoRaf: true,
    });
    queueMicrotask(() => {
      setLenis(instance);
    });

    return () => {
      instance.destroy();
      queueMicrotask(() => {
        setLenis(null);
      });
    };
  }, []);

  const value = useMemo(() => lenis, [lenis]);

  return (
    <LenisContext.Provider value={value}>{children}</LenisContext.Provider>
  );
}
