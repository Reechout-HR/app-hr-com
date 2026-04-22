import type { ReactNode } from "react";
import { Calendar, type LucideIcon } from "lucide-react";

import { PAGE_SHELL_CLASS } from "@/lib/site/page-layout";

const gradientText =
  "bg-gradient-to-br from-[var(--primary-color)] via-[var(--accent-violet)] to-[var(--accent-pink)] bg-clip-text text-transparent";

export type LegalMetaRow = {
  icon?: LucideIcon;
  label: string;
  value: string;
};

export type LegalPageHeroProps = {
  badgeIcon: LucideIcon;
  badge: string;
  title: ReactNode;
  description: string;
  meta: LegalMetaRow[];
};

export function LegalPageHero({
  badgeIcon: BadgeIcon,
  badge,
  title,
  description,
  meta,
}: LegalPageHeroProps) {
  return (
    <section
      className="relative w-full overflow-hidden border-b border-[var(--border-color-light)] pt-[calc(var(--site-nav-height)+clamp(1.75rem,4vw,2.75rem))] pb-[clamp(2.5rem,6vw,4rem)] dark:border-white/[0.08]"
      aria-labelledby="legal-page-hero-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(var(--primary-color-rgb),0.12),transparent)]"
        aria-hidden
      />
      <div className={`relative z-[1] ${PAGE_SHELL_CLASS}`}>
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[rgba(var(--primary-color-rgb),0.22)] bg-[rgba(var(--primary-color-rgb),0.08)] px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--primary-color)] dark:border-[rgba(var(--accent-violet-rgb),0.35)] dark:bg-[rgba(var(--primary-color-rgb),0.12)] dark:text-[var(--accent-violet)]">
            <BadgeIcon className="h-3.5 w-3.5" aria-hidden strokeWidth={2} />
            {badge}
          </div>
          <h1
            id="legal-page-hero-heading"
            className="mb-4 text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold leading-[1.12] tracking-[-0.03em] text-[var(--text-heading)]"
          >
            {title}
          </h1>
          <p className="mx-auto max-w-[40rem] text-[clamp(0.95rem,1.4vw,1.0625rem)] leading-[1.65] text-[var(--text-secondary)]">
            {description}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-[var(--text-muted)]">
            {meta.map((row) => {
              const Icon = row.icon ?? Calendar;
              return (
                <span
                  key={`${row.label}-${row.value}`}
                  className="inline-flex items-center gap-2"
                >
                  <Icon className="h-4 w-4 shrink-0 opacity-80" aria-hidden />
                  <span className="font-medium text-[var(--text-secondary)]">
                    {row.label}:
                  </span>
                  <span>{row.value}</span>
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export { gradientText };
