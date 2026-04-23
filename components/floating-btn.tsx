"use client";

import Image from "next/image";
import { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/ui/cn";

export interface FloatingBtnProps extends ComponentPropsWithoutRef<"button"> {
  /**
   * The text to display inside the button. Defaults to "New Resource".
   */
  text?: string;
}

export function FloatingBtn({
  text = "New Resource",
  className,
  ...props
}: FloatingBtnProps) {
  return (
    <div className="fixed bottom-6 right-6 z-40 sm:hidden">
      <button
        className={cn(
          "flex items-center gap-2 rounded-full bg-[var(--primary-color)] px-4 py-3 text-sm font-semibold text-white shadow-[0_4px_14px_0_rgba(var(--primary-color-rgb),0.39)] transition-transform hover:scale-105 active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--primary-color)]",
          className
        )}
        {...props}
      >
        <span>{text}</span>
        <Image
          src="https://storage.googleapis.com/images.reechout.com/android-chrome-192x192.webp"
          alt="ReechOut icon"
          width={24}
          height={24}
          className="h-6 w-6 rounded-full bg-white/20 p-0.5"
        />
      </button>
    </div>
  );
}
