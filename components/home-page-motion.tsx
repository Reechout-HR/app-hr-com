"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

type HomePageNavMotionProps = {
  children: ReactNode;
};

/** Subtle nav entrance on first paint. */
export function HomePageNavMotion({ children }: HomePageNavMotionProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className="overflow-visible"
      initial={reduce ? false : { opacity: 0, y: -10 }}
      animate={reduce ? false : { opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease }}
    >
      {children}
    </motion.div>
  );
}

type HomePageMotionSectionProps = {
  children: ReactNode;
  /** Stagger order after load (0 = first). */
  index: number;
};

const STAGGER = 0.07;
const SECTION_DURATION = 0.5;

/** Fade + slide up; delay derived from index for a cascading homepage load. */
export function HomePageMotionSection({
  children,
  index,
}: HomePageMotionSectionProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className="w-full"
      initial={reduce ? false : { opacity: 0, y: 28 }}
      animate={reduce ? false : { opacity: 1, y: 0 }}
      transition={{
        duration: SECTION_DURATION,
        delay: reduce ? 0 : index * STAGGER,
        ease,
      }}
    >
      {children}
    </motion.div>
  );
}
