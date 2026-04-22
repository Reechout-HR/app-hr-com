import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/ui/cn";

const PRIMARY_CTA_BASE =
  "inline-flex min-h-[50px] items-center justify-center gap-2.5 rounded-xl border-0 bg-gradient-to-br from-[var(--primary-color)] to-[var(--primary-hover)] px-7 py-3 text-[15px] font-semibold text-white shadow-[0_0_0_1px_rgba(var(--primary-color-rgb),0.35),inset_0_1px_0_rgba(255,255,255,0.15),0_4px_16px_rgba(var(--primary-color-rgb),0.28)] transition-[transform,box-shadow,filter] duration-200 hover:-translate-y-0.5 hover:brightness-[1.04] hover:shadow-[0_0_0_1px_rgba(var(--primary-color-rgb),0.45),0_10px_28px_rgba(var(--primary-color-rgb),0.35)] md:min-h-14 md:px-7 md:text-base";

export type PrimaryCtaLinkProps = {
  /** Full width (e.g. card footer); default matches hero centered CTA. */
  fullWidth?: boolean;
} & ComponentPropsWithoutRef<typeof Link>;

export function PrimaryCtaLink({
  fullWidth,
  className,
  children,
  ...props
}: PrimaryCtaLinkProps) {
  return (
    <Link
      className={cn(
        PRIMARY_CTA_BASE,
        fullWidth
          ? "w-full max-w-none"
          : "w-full max-w-xs md:w-auto md:max-w-none",
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
}

export type PrimaryCtaAnchorProps = {
  fullWidth?: boolean;
} & ComponentPropsWithoutRef<"a">;

/** Same styling as {@link PrimaryCtaLink} for external URLs (e.g. Cal.com). */
export function PrimaryCtaAnchor({
  fullWidth,
  className,
  children,
  ...props
}: PrimaryCtaAnchorProps) {
  return (
    <a
      className={cn(
        PRIMARY_CTA_BASE,
        fullWidth
          ? "w-full max-w-none"
          : "w-full max-w-xs md:w-auto md:max-w-none",
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}
