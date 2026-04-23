"use client";

import { cn } from "@/lib/ui/cn";

export function DashboardFooter({ className }: { className?: string }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={cn(
        "mt-auto w-full border-t border-[var(--border-color-light)] bg-[var(--bg-near-white)] py-6 text-center text-sm text-[var(--text-secondary)] transition-colors",
        className
      )}
    >
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        © {currentYear} Copyright ReechOut Ltd. All Rights Reserved
      </div>
    </footer>
  );
}
