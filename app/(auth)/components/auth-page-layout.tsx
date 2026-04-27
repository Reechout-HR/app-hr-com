"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

import { PageAmbientBackground } from "@/components/page-ambient-background";

/**
 * Root shell for auth routes — same gradient + ambient layer as the marketing hero
 * so the canvas behind the form reads as the same product.
 */
export function AuthPageRoot({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-screen w-full overflow-hidden bg-gradient-to-b from-[var(--hero-bg-tint)] via-[var(--primary-lighter)] to-[var(--background-color)] dark:from-[#0a0612] dark:via-[#120a18] dark:to-[var(--background-color)]">
      <PageAmbientBackground />
      {children}
    </div>
  );
}

/**
 * Right column wrapper. Decoration is provided by `AuthPageRoot`'s ambient layer;
 * this stays transparent so the gradient/aurora bleeds through behind the form card.
 */
export function AuthRightColumn({ children }: { children: ReactNode }) {
  return (
    <div className="relative z-[1] flex min-h-screen min-h-0 w-full min-w-0 flex-1 flex-col overflow-hidden bg-transparent pt-9 max-lg:pl-[clamp(1.25rem,5.5vw,2.5rem)] max-lg:pr-[6%] max-lg:pt-[4vh] max-md:px-[5%] max-md:pb-4 max-md:pl-[clamp(1rem,5vw,1.75rem)] max-md:pt-[5vh] lg:px-8 lg:pb-16">
      {children}
    </div>
  );
}

export function AuthFormStack({ children }: { children: ReactNode }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      className="relative z-[1] flex w-full max-w-[460px] flex-col gap-[22px] max-lg:w-[85%] max-lg:max-w-full max-md:w-[92%]"
    >
      {children}
    </motion.div>
  );
}

export function AuthMobileLogoRow({ children }: { children: ReactNode }) {
  return (
    <div className="hidden w-full max-lg:flex max-lg:justify-start max-lg:pl-[clamp(8px,2.5vw,20px)]">
      {children}
    </div>
  );
}

export function AuthFooterSlot({ children }: { children: ReactNode }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="absolute bottom-6 left-0 right-0 z-[2] text-center max-md:relative max-md:mt-6 max-md:pb-4"
    >
      {children}
    </motion.div>
  );
}

/** Centers the form card stack vertically in the remaining space above the footer. */
export function AuthRightMain({ children }: { children: ReactNode }) {
  return (
    <div className="relative z-[1] flex w-full flex-1 flex-col items-center justify-center px-1 py-6 lg:py-10">
      {children}
    </div>
  );
}
