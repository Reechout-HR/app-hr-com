import Image from "next/image";
import {
  Eye,
  Flag,
  Heart,
  Landmark,
  Rocket,
  Star,
  Trophy,
  Wrench,
} from "lucide-react";

import { IconCalendar, IconCheckCircle } from "@/components/home/home-icons";
import { PrimaryCtaLink } from "@/components/home/primary-cta-link";
import { SectionHeader } from "@/components/home/section-header";
import {
  ABOUT_US_BELIEVE,
  ABOUT_US_FOUNDERS,
  ABOUT_US_FOUNDERS_HEADER,
  ABOUT_US_FUTURE,
  ABOUT_US_HERO,
  ABOUT_US_HERO_CHROME_LABEL,
  ABOUT_US_IMAGES,
  ABOUT_US_JOURNEY_CARDS,
  ABOUT_US_JOURNEY_HEADER,
  ABOUT_US_MISSION_CARDS,
  ABOUT_US_MISSION_HEADER,
} from "@/app/about-us/content";
import { DEFAULT_SOLUTION_TRUST_ITEMS } from "@/lib/site/marketing-site";
import { PAGE_SHELL_CLASS } from "@/components/page-shell";

function AboutUsLinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const journeyIcon = (name: (typeof ABOUT_US_JOURNEY_CARDS)[number]["icon"]) => {
  const cls = "h-6 w-6";
  switch (name) {
    case "rocket":
      return <Rocket className={cls} aria-hidden strokeWidth={2} />;
    case "wrench":
      return <Wrench className={cls} aria-hidden strokeWidth={2} />;
    default:
      return null;
  }
};

const missionIcon = (name: (typeof ABOUT_US_MISSION_CARDS)[number]["icon"]) => {
  const cls = "h-6 w-6";
  switch (name) {
    case "flag":
      return <Flag className={cls} aria-hidden strokeWidth={2} />;
    case "eye":
      return <Eye className={cls} aria-hidden strokeWidth={2} />;
    case "heart":
      return <Heart className={cls} aria-hidden strokeWidth={2} />;
    default:
      return null;
  }
};

/** Home-style hero: centered copy, trust row, CTA, browser-chrome figure. */
export function AboutUsHeroSection() {
  const h = ABOUT_US_HERO;

  return (
    <section
      id="about-hero"
      className="relative w-full overflow-hidden pt-[calc(var(--site-nav-height)+clamp(2rem,5vw,3.5rem))] pb-[clamp(3rem,8vw,5rem)]"
      aria-label="About Us"
    >
      <div className={`relative z-[2] ${PAGE_SHELL_CLASS}`}>
        <div className="mx-auto flex max-w-[52rem] flex-col items-center text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[rgba(var(--primary-color-rgb),0.22)] bg-[rgba(var(--primary-color-rgb),0.08)] px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--primary-color)] dark:border-[rgba(var(--accent-violet-rgb),0.35)] dark:bg-[rgba(var(--primary-color-rgb),0.12)] dark:text-[var(--accent-violet)]">
            <span
              className="h-1.5 w-1.5 shrink-0 animate-[roBadgePulse_2s_ease-in-out_infinite] rounded-full bg-[var(--primary-color)]"
              aria-hidden
            />
            <span>{h.badge}</span>
          </div>

          <h1 className="mb-4 text-[clamp(2.25rem,5vw,3.75rem)] font-extrabold leading-[1.1] tracking-[-0.03em] text-[var(--text-heading)] md:mb-6">
            <span className="block">{h.titleBeforeHighlight}</span>
            <span className="mt-1 block">
              <span className="relative inline-block bg-[length:200%_auto] bg-gradient-to-br from-[var(--primary-color)] via-[var(--accent-violet)] to-[var(--accent-pink)] bg-clip-text text-transparent animate-[hero-gradient-shift_3s_ease_infinite] after:absolute after:bottom-1 after:left-0 after:right-0 after:h-1 after:rounded-sm after:bg-gradient-to-r after:from-[var(--primary-color)] after:via-[var(--accent-violet)] after:to-[var(--accent-pink)] after:opacity-30 after:content-['']">
                {h.titleHighlight}
              </span>
            </span>
          </h1>

          <p className="mb-6 max-w-[42rem] text-[clamp(0.95rem,1.5vw,1.125rem)] leading-[1.65] text-[var(--text-secondary)] md:mb-8">
            {h.description}
          </p>

          <blockquote className="mb-8 max-w-[42rem] rounded-2xl border border-[var(--border-color-light)] bg-[var(--surface-2)] px-5 py-5 text-[clamp(0.95rem,1.35vw,1.05rem)] italic leading-relaxed text-[var(--text-secondary)] shadow-[var(--shadow-light)] dark:border-white/[0.08] dark:bg-white/[0.04] md:px-7 md:py-6">
            {h.quote}
          </blockquote>

          <div className="mb-8 w-full md:mb-10">
            <PrimaryCtaLink href="/contact">
              <IconCalendar className="h-5 w-5 shrink-0" />
              <span>Book a Demo</span>
            </PrimaryCtaLink>
          </div>

          <div className="mb-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 md:mb-12 md:gap-x-5 md:gap-y-4">
            {DEFAULT_SOLUTION_TRUST_ITEMS.map((label) => (
              <div
                key={label}
                className="flex items-center gap-1.5 text-[13px] font-semibold text-[var(--text-primary)]"
              >
                <IconCheckCircle className="h-4 w-4 shrink-0 text-[var(--success-emerald)]" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto max-w-[1060px]">
          <figure className="relative overflow-hidden rounded-t-2xl border border-b-0 border-[var(--border-color-light)] shadow-[0_-8px_48px_rgba(var(--primary-color-rgb),0.08),0_0_0_1px_rgba(var(--shadow-rgb),0.06)] dark:border-white/[0.09] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.04),inset_0_1px_0_rgba(255,255,255,0.06)]">
            <div className="flex items-center gap-2.5 border-b border-[var(--border-color-light)] bg-[var(--surface-2)] px-4 py-2.5 dark:border-white/[0.07] dark:bg-[rgba(12,10,20,0.98)]">
              <div className="flex shrink-0 gap-1.5" aria-hidden>
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              </div>
              <div className="flex min-w-0 flex-1 justify-center">
                <div className="max-w-full truncate whitespace-nowrap rounded-md border border-[var(--border-color-light)] bg-[var(--background-color)] px-5 py-1 text-[11px] tracking-wide text-[var(--text-muted)] dark:border-white/[0.08] dark:bg-white/[0.05] dark:text-white/35">
                  {ABOUT_US_HERO_CHROME_LABEL}
                </div>
              </div>
            </div>
            <div className="bg-[var(--background-color)] p-1 sm:p-2">
              <Image
                src={ABOUT_US_IMAGES.hero}
                alt="Founders at Harvard Innovation Labs"
                width={1200}
                height={900}
                priority
                sizes="(max-width: 1024px) 100vw, 896px"
                className="block h-auto w-full rounded-lg object-cover object-center sm:rounded-[10px]"
              />
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}

export function AboutUsJourneySection() {
  return (
    <section
      className="relative w-full overflow-hidden py-20 md:py-28"
      aria-label="Our Story"
    >
      <div className={`relative z-[1] ${PAGE_SHELL_CLASS}`}>
        <SectionHeader
          kicker={ABOUT_US_JOURNEY_HEADER.kicker}
          title={ABOUT_US_JOURNEY_HEADER.title}
          description={ABOUT_US_JOURNEY_HEADER.description}
          kickerLeading="bolt"
        />
        <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {ABOUT_US_JOURNEY_CARDS.map((card) => (
            <article
              key={card.title}
              className="flex h-full flex-col rounded-2xl border border-[var(--border-color-light)] bg-[var(--background-color)] p-6 shadow-[var(--shadow-light)] transition-shadow hover:shadow-[var(--shadow-medium)] dark:border-white/[0.08] md:p-8"
            >
              <div className="mb-5 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[rgba(var(--primary-color-rgb),0.22)] bg-[rgba(var(--primary-color-rgb),0.08)] text-[var(--primary-color)] dark:border-[rgba(var(--accent-violet-rgb),0.35)] dark:bg-[rgba(var(--primary-color-rgb),0.12)] dark:text-[var(--accent-violet)]">
                {journeyIcon(card.icon)}
              </div>
              <h3 className="mb-3 text-lg font-bold tracking-[-0.02em] text-[var(--text-heading)] md:text-xl">
                {card.title}
              </h3>
              <p className="whitespace-pre-line text-[clamp(0.95rem,1.5vw,1.05rem)] leading-relaxed text-[var(--text-secondary)]">
                {card.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AboutUsFoundersSection() {
  return (
    <section
      className="relative overflow-hidden border-y border-[var(--border-color-light)] bg-[var(--gray-bg)] py-[clamp(5rem,10vw,7.5rem)] dark:border-white/[0.08] dark:bg-[rgba(var(--black-rgb),0.35)]"
      aria-label="Meet the Founders"
    >
      <div
        className="pointer-events-none absolute left-[10%] top-[20%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(var(--primary-color-rgb),0.08)_0%,transparent_70%)] blur-[60px] dark:bg-[radial-gradient(circle,rgba(var(--accent-violet-rgb),0.12)_0%,transparent_70%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-[10%] right-[10%] h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(var(--accent-violet-rgb),0.08)_0%,transparent_70%)] blur-[60px]"
        aria-hidden
      />

      <div className={`relative z-[1] ${PAGE_SHELL_CLASS}`}>
        <SectionHeader
          kicker={ABOUT_US_FOUNDERS_HEADER.kicker}
          title={ABOUT_US_FOUNDERS_HEADER.title}
        />
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-6 md:gap-8 lg:grid-cols-3">
          {ABOUT_US_FOUNDERS.map((founder) => (
            <article
              key={founder.name}
              className="flex flex-col overflow-hidden rounded-[28px] border border-[var(--border-color-light)] bg-[var(--background-color)] shadow-[0_20px_60px_rgba(var(--shadow-rgb),0.08)] transition-shadow hover:shadow-[0_24px_64px_rgba(var(--shadow-rgb),0.1)] dark:border-white/[0.09]"
            >
              <div className="relative border-b border-[var(--border-color-light)] bg-[var(--surface-2)] p-6 dark:border-white/[0.08]">
                <div className="mx-auto flex max-w-[220px] justify-center">
                  <div className="relative overflow-hidden rounded-[20px] border border-[var(--border-color-light)] dark:border-white/[0.08]">
                    <Image
                      src={founder.image}
                      alt={`${founder.name} — ${founder.role}`}
                      width={320}
                      height={320}
                      className="aspect-square object-cover"
                      sizes="(max-width: 1024px) 220px, 320px"
                    />
                  </div>
                </div>
                <div className="mt-4 flex justify-center">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(var(--primary-color-rgb),0.22)] bg-[rgba(var(--primary-color-rgb),0.08)] px-3 py-1 text-xs font-bold text-[var(--primary-color)] dark:border-[rgba(var(--accent-violet-rgb),0.35)] dark:text-[var(--accent-violet)]">
                    <Star
                      className="h-3.5 w-3.5 fill-[var(--primary-color)] text-[var(--primary-color)] dark:fill-[var(--accent-violet)] dark:text-[var(--accent-violet)]"
                      aria-hidden
                      strokeWidth={2}
                    />
                    <span>{founder.role}</span>
                  </span>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6 md:p-8">
                <h3 className="mb-2 text-xl font-extrabold tracking-[-0.02em] text-[var(--text-heading)]">
                  {founder.name}
                </h3>
                <p className="mb-3 text-sm font-semibold text-[var(--primary-color)] dark:text-[var(--accent-violet)]">
                  {founder.bio}
                </p>
                {founder.description.trim() ? (
                  <p className="mb-5 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {founder.description}
                  </p>
                ) : null}
                <div className="mb-5 flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                  <Landmark
                    className="mt-0.5 h-4 w-4 shrink-0 text-[var(--primary-color)] dark:text-[var(--accent-violet)]"
                    aria-hidden
                    strokeWidth={2}
                  />
                  <span>{founder.education}</span>
                </div>
                <div className="mb-6">
                  <h4 className="mb-3 flex items-center gap-2 text-sm font-bold text-[var(--text-heading)]">
                    <Trophy
                      className="h-4 w-4 text-[var(--primary-color)] dark:text-[var(--accent-violet)]"
                      aria-hidden
                      strokeWidth={2}
                    />
                    Key contributions
                  </h4>
                  <ul className="space-y-2">
                    {founder.achievements.map((a) => (
                      <li
                        key={a}
                        className="flex gap-2 text-sm leading-relaxed text-[var(--text-secondary)]"
                      >
                        <IconCheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[var(--success-emerald)]" />
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <a
                  href={founder.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border-color-light)] text-[#0a66c2] transition-colors hover:bg-[#0a66c2]/10 dark:border-white/[0.12]"
                  aria-label={`${founder.name} on LinkedIn`}
                >
                  <AboutUsLinkedInIcon className="h-5 w-5" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/** “Product” band styling — principles + direction. */
export function AboutUsPrinciplesSection() {
  return (
    <section
      className="relative w-full overflow-hidden py-20 md:py-28"
      aria-label="Principles and direction"
    >
      <div className={`relative z-[1] ${PAGE_SHELL_CLASS}`}>
        <SectionHeader
          kicker={ABOUT_US_BELIEVE.kicker}
          title={ABOUT_US_BELIEVE.title}
          description={ABOUT_US_BELIEVE.description}
          descriptionClassName="whitespace-pre-line"
        />
        <div className="mx-auto mt-16 max-w-[900px] border-t border-[var(--border-color-light)] pt-16 dark:border-white/[0.08]">
          <SectionHeader
            kicker={ABOUT_US_FUTURE.kicker}
            title={ABOUT_US_FUTURE.title}
            description={ABOUT_US_FUTURE.description}
            descriptionClassName="whitespace-pre-line"
          />
          {ABOUT_US_FUTURE.tagline ? (
            <p className="mx-auto mt-6 max-w-2xl text-center text-[clamp(0.95rem,1.5vw,1.05rem)] font-semibold leading-relaxed text-[var(--text-primary)]">
              {ABOUT_US_FUTURE.tagline}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export function AboutUsMissionSection() {
  return (
    <section
      className="relative w-full overflow-hidden border-t border-[var(--border-color-light)] bg-[var(--gray-bg)] py-20 dark:border-white/[0.08] dark:bg-[rgba(var(--black-rgb),0.2)] md:py-28"
      aria-label="Mission and Values"
    >
      <div className={`relative z-[1] ${PAGE_SHELL_CLASS}`}>
        <SectionHeader
          kicker={ABOUT_US_MISSION_HEADER.kicker}
          title={ABOUT_US_MISSION_HEADER.title}
          description={ABOUT_US_MISSION_HEADER.description}
          kickerLeading="bolt"
        />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8 lg:gap-10">
          {ABOUT_US_MISSION_CARDS.map((m) => (
            <article
              key={m.number}
              className="flex h-full flex-col rounded-2xl border border-[var(--border-color-light)] bg-[var(--background-color)] p-6 shadow-[var(--shadow-light)] transition-shadow hover:shadow-[var(--shadow-medium)] dark:border-white/[0.08] md:p-8"
            >
              <div className="mb-5 flex items-center justify-between gap-3">
                <span className="inline-flex items-center rounded-full border border-[rgba(var(--primary-color-rgb),0.22)] bg-[rgba(var(--primary-color-rgb),0.08)] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--primary-color)] dark:border-[rgba(var(--accent-violet-rgb),0.35)] dark:bg-[rgba(var(--primary-color-rgb),0.12)] dark:text-[var(--accent-violet)]">
                  Step {m.number}
                </span>
              </div>
              <div className="mb-5 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[var(--border-color-light)] bg-[var(--surface-2)] text-[var(--primary-color)] dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-[var(--accent-violet)]">
                {missionIcon(m.icon)}
              </div>
              <h3 className="mb-3 text-lg font-bold tracking-[-0.02em] text-[var(--text-heading)] md:text-xl">
                {m.title}
              </h3>
              <p className="text-[clamp(0.95rem,1.5vw,1.05rem)] leading-relaxed text-[var(--text-secondary)]">
                {m.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
