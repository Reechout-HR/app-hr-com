"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";

import {
  HOME_PRICING_FOOTNOTE,
  HOME_PRICING_HEADER,
  HOME_PRICING_PLANS,
  type HomePricingPlan,
} from "@/app/home-content";
import { cn } from "@/lib/ui/cn";
import { PAGE_SHELL_CLASS } from "@/components/page-shell";

import { IconCheckCircle } from "./home-icons";
import { SectionHeader } from "./section-header";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const btnPrimary =
  "inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-[12px] border-0 bg-[var(--primary-color)] px-6 py-3 text-[14.5px] font-semibold tracking-[-0.01em] text-white shadow-[0_0_0_1px_rgba(var(--primary-color-rgb),0.45),inset_0_1px_0_rgba(var(--white-rgb),0.2),0_10px_24px_rgba(var(--primary-color-rgb),0.32),0_2px_4px_rgba(var(--shadow-rgb),0.18)] transition-[transform,box-shadow,filter] duration-200 ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_0_0_1px_rgba(var(--primary-color-rgb),0.55),inset_0_1px_0_rgba(var(--white-rgb),0.28),0_18px_36px_rgba(var(--primary-color-rgb),0.4),0_4px_12px_rgba(var(--shadow-rgb),0.22)]";

const btnGhost =
  "inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-[12px] border border-[var(--border-color-light)] bg-[var(--surface-2)] px-6 py-3 text-[14.5px] font-semibold tracking-[-0.01em] text-[var(--text-primary)] shadow-[var(--shadow-light)] transition-[transform,background-color,border-color,box-shadow] duration-200 ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:-translate-y-0.5 hover:bg-[var(--surface-3)] hover:shadow-[var(--shadow-medium)]";

export function HomePricingSection() {
  const reduce = useReducedMotion();

  return (
    <section
      id="pricing"
      className="relative overflow-hidden bg-gradient-to-b from-[var(--hero-bg-tint)] via-[var(--primary-lighter)] to-[var(--gray-bg)] px-6 py-[clamp(4.5rem,10vw,7.5rem)] dark:from-[var(--bg-purple-deeper)] dark:via-[var(--background-color)] dark:to-[var(--bg-purple-deeper)]"
      aria-labelledby="pricing-heading"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div
          className="absolute -right-[120px] -top-[220px] h-[520px] w-[520px] rounded-full blur-[24px]"
          style={{
            background:
              "radial-gradient(circle, rgba(var(--primary-color-rgb), 0.2) 0%, transparent 72%)",
          }}
        />
        <div
          className="absolute -bottom-[220px] -left-[120px] h-[460px] w-[460px] rounded-full blur-[24px]"
          style={{
            background:
              "radial-gradient(circle, rgba(var(--accent-violet-rgb), 0.18) 0%, transparent 72%)",
          }}
        />
      </div>

      <div className={cn("relative z-[1]", PAGE_SHELL_CLASS)}>
        <SectionHeader
          kicker={HOME_PRICING_HEADER.kicker}
          title={HOME_PRICING_HEADER.title}
          description={HOME_PRICING_HEADER.description}
        />
        <h2 id="pricing-heading" className="sr-only">
          {HOME_PRICING_HEADER.title}
        </h2>

        <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-3 md:gap-8 lg:gap-10">
          {HOME_PRICING_PLANS.map((plan, index) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              index={index}
              reduce={Boolean(reduce)}
            />
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-[640px] text-center text-sm leading-relaxed text-[var(--text-muted)] md:mt-12">
          {HOME_PRICING_FOOTNOTE}
        </p>
      </div>
    </section>
  );
}

function PricingCard({
  plan,
  index,
  reduce,
}: {
  plan: HomePricingPlan;
  index: number;
  reduce: boolean;
}) {
  const featured = Boolean(plan.featured);
  const cta = plan.cta;
  const ctaIsExternal = cta.external ?? cta.href.startsWith("http");

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 32 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, ease: EASE, delay: index * 0.06 }}
      className={cn(
        "relative flex h-full flex-col rounded-2xl border bg-[var(--background-color)] p-6 shadow-[var(--shadow-light)] transition-shadow hover:shadow-[var(--shadow-medium)] md:p-8",
        featured
          ? "border-[rgba(var(--primary-color-rgb),0.4)] shadow-[var(--shadow-medium)] md:-translate-y-2 dark:border-[rgba(var(--accent-violet-rgb),0.55)]"
          : "border-[var(--border-color-light)] dark:border-white/[0.08]",
      )}
    >
      {featured && plan.badge ? (
        <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center rounded-full bg-[var(--primary-color)] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-white shadow-[0_4px_12px_rgba(var(--primary-color-rgb),0.45)]">
          {plan.badge}
        </span>
      ) : null}

      <div className="mb-5">
        <h3 className="mb-2 text-xl font-bold tracking-[-0.02em] text-[var(--text-heading)] md:text-[1.375rem]">
          {plan.name}
        </h3>
        <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
          {plan.description}
        </p>
      </div>

      <div className="mb-6 flex items-baseline gap-1.5">
        <span className="text-4xl font-extrabold tracking-tight text-[var(--text-heading)] md:text-[2.75rem]">
          {plan.price}
        </span>
        {plan.cadence ? (
          <span className="text-sm font-semibold text-[var(--text-secondary)]">
            {plan.cadence}
          </span>
        ) : null}
      </div>

      <ul className="mb-8 flex flex-1 flex-col gap-3 text-left">
        {plan.features.map((item) => (
          <li
            key={item}
            className="flex items-start gap-3 text-[15px] leading-relaxed text-[var(--text-primary)]"
          >
            <IconCheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-[var(--success-emerald)]" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <Link
        href={cta.href}
        className={cn(featured ? btnPrimary : btnGhost)}
        {...(ctaIsExternal
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {ctaIsExternal ? (
          <Calendar className="h-[17px] w-[17px] shrink-0" aria-hidden />
        ) : null}
        {cta.label}
        {ctaIsExternal ? null : (
          <ArrowRight className="h-[17px] w-[17px] shrink-0" aria-hidden />
        )}
      </Link>
    </motion.article>
  );
}
