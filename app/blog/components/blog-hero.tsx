import { BookOpen, Globe, Mic } from "lucide-react";

import { PAGE_SHELL_CLASS } from "@/components/page-shell";

export type BlogHeroProps = {
  badge?: string;
  title: string;
  subtitle: string;
};

export function BlogHero({
  badge = "Blog",
  title,
  subtitle,
}: BlogHeroProps) {
  return (
    <section
      className="relative w-full overflow-hidden pt-[calc(var(--site-nav-height)+clamp(2rem,5vw,3rem))] pb-[clamp(2.5rem,6vw,4rem)]"
      aria-labelledby="blog-hero-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 select-none"
        aria-hidden
      >
        <div className="absolute left-[4%] top-[12%] opacity-70 max-md:left-[2%]">
          <div className="blog-float-1 rounded-2xl border border-[rgba(var(--primary-color-rgb),0.14)] bg-[rgba(var(--primary-color-rgb),0.06)] p-3.5 shadow-[0_10px_30px_rgba(var(--shadow-rgb),0.06)] backdrop-blur-sm dark:border-white/[0.08] dark:bg-white/[0.04]">
            <BookOpen
              className="h-7 w-7 text-[var(--primary-color)]"
              strokeWidth={2}
            />
          </div>
        </div>
        <div className="absolute right-[2%] top-[28%] opacity-70 max-md:right-0">
          <div className="blog-float-2 rounded-2xl border border-[rgba(var(--primary-color-rgb),0.14)] bg-[rgba(var(--primary-color-rgb),0.06)] p-3 shadow-[0_10px_30px_rgba(var(--shadow-rgb),0.06)] backdrop-blur-sm dark:border-white/[0.08] dark:bg-white/[0.04]">
            <Globe
              className="h-6 w-6 text-[var(--star-gold)]"
              strokeWidth={2}
            />
          </div>
        </div>
        <div className="absolute bottom-[8%] left-[12%] opacity-70 max-md:bottom-[4%]">
          <div className="blog-float-3 rounded-xl border border-[rgba(var(--primary-color-rgb),0.14)] bg-[rgba(var(--primary-color-rgb),0.06)] p-2.5 shadow-[0_10px_30px_rgba(var(--shadow-rgb),0.06)] backdrop-blur-sm dark:border-white/[0.08] dark:bg-white/[0.04]">
            <Mic
              className="h-5 w-5 text-[var(--success-emerald)]"
              strokeWidth={2}
            />
          </div>
        </div>
      </div>

      <div className={`relative z-[2] ${PAGE_SHELL_CLASS}`}>
        <div className="mx-auto max-w-[52rem] text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[rgba(var(--primary-color-rgb),0.22)] bg-[rgba(var(--primary-color-rgb),0.08)] px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--primary-color)] dark:border-[rgba(var(--accent-violet-rgb),0.35)] dark:bg-[rgba(var(--primary-color-rgb),0.12)] dark:text-[var(--accent-violet)]">
            <span
              className="h-1.5 w-1.5 shrink-0 animate-[roBadgePulse_2s_ease-in-out_infinite] rounded-full bg-[var(--primary-color)]"
              aria-hidden
            />
            {badge}
          </div>
          <h1
            id="blog-hero-heading"
            className="mb-4 text-[clamp(1.75rem,4.2vw,2.75rem)] font-extrabold leading-[1.12] tracking-[-0.03em] text-[var(--text-heading)] md:mb-5"
          >
            {title}
          </h1>
          <p className="mx-auto max-w-[38rem] text-[clamp(0.95rem,1.4vw,1.0625rem)] leading-[1.65] text-[var(--text-secondary)]">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}
