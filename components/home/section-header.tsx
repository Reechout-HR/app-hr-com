import { Zap } from "lucide-react";

import { cn } from "@/lib/ui/cn";

export type SectionHeaderProps = {
  kicker: string;
  title: string;
  description?: string;
  className?: string;
  titleClassName?: string;
  /** Applied to the description paragraph (spacing + typography). */
  descriptionClassName?: string;
  /** Tighter bottom margin on the description (e.g. CTA block before a button). */
  compact?: boolean;
  /** `bolt`: lightning icon (RegulateIQ-style); default: pulsing dot. */
  kickerLeading?: "pulse" | "bolt";
};

export function SectionHeader({
  kicker,
  title,
  description,
  className,
  titleClassName,
  descriptionClassName,
  compact,
  kickerLeading = "pulse",
}: SectionHeaderProps) {
  return (
    <div className={cn("flex flex-col items-center text-center", className)}>
      <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[rgba(var(--primary-color-rgb),0.22)] bg-[rgba(var(--primary-color-rgb),0.08)] px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--primary-color)] dark:border-[rgba(var(--accent-violet-rgb),0.35)] dark:bg-[rgba(var(--primary-color-rgb),0.12)] dark:text-[var(--accent-violet)]">
        {kickerLeading === "bolt" ? (
          <Zap
            className="h-3.5 w-3.5 shrink-0 text-[var(--primary-color)] dark:text-[var(--accent-violet)]"
            aria-hidden
            strokeWidth={2}
          />
        ) : (
          <span
            className="h-1.5 w-1.5 shrink-0 animate-[roBadgePulse_2s_ease-in-out_infinite] rounded-full bg-[var(--primary-color)]"
            aria-hidden
          />
        )}
        <span>{kicker}</span>
      </div>
      <h2
        className={cn(
          "mb-4 max-w-[900px] text-[clamp(1.875rem,4vw,2.5rem)] font-extrabold leading-[1.1] tracking-[-0.03em] text-[var(--text-heading)] md:mb-5",
          titleClassName,
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "max-w-2xl text-[clamp(0.95rem,1.5vw,1.125rem)] leading-[1.65] text-[var(--text-secondary)]",
            compact ? "mb-8" : "mb-12",
            descriptionClassName,
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
