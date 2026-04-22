"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CircleDollarSign } from "lucide-react";
import Link from "next/link";

import { HOME_PRICING, HOME_PRICING_FEATURES } from "@/app/home-content";
import { cn } from "@/lib/ui/cn";

import { IconCheckCircle } from "./home-icons";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const btnPrimary =
  "inline-flex min-h-[52px] w-full max-w-none items-center justify-center gap-2.5 rounded-[14px] border-0 bg-[var(--primary-color)] px-8 py-3.5 text-[15.5px] font-semibold tracking-[-0.01em] text-white shadow-[0_0_0_1px_rgba(var(--primary-color-rgb),0.45),inset_0_1px_0_rgba(var(--white-rgb),0.2),0_12px_28px_rgba(var(--primary-color-rgb),0.35),0_2px_4px_rgba(var(--shadow-rgb),0.18)] transition-[transform,box-shadow,filter] duration-200 ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_0_0_1px_rgba(var(--primary-color-rgb),0.55),inset_0_1px_0_rgba(var(--white-rgb),0.28),0_20px_40px_rgba(var(--primary-color-rgb),0.4),0_4px_12px_rgba(var(--shadow-rgb),0.22)]";

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

      <div className="relative z-[1] mx-auto w-full max-w-[840px]">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 40 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.65, ease: EASE }}
          className="rounded-[28px] border border-[var(--border-color-light)] bg-[var(--background-color)] p-[clamp(2.5rem,6vw,4rem)] text-center shadow-[var(--shadow-medium)] dark:border-white/[0.09]"
        >
          <div
            className="mx-auto mb-6 flex h-[58px] w-[58px] items-center justify-center rounded-2xl border border-[rgba(var(--primary-color-rgb),0.28)] bg-[rgba(var(--primary-color-rgb),0.1)] text-[var(--primary-color)] dark:border-[rgba(var(--accent-violet-rgb),0.4)] dark:bg-[rgba(var(--primary-color-rgb),0.15)] dark:text-[var(--accent-violet)]"
            aria-hidden
          >
            <CircleDollarSign className="h-7 w-7" strokeWidth={2} />
          </div>

          <h2
            id="pricing-heading"
            className="mb-[18px] text-[clamp(1.75rem,4.6vw,3rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-[var(--text-heading)]"
          >
            {HOME_PRICING.title}
          </h2>
          <p className="mx-auto mb-10 max-w-[620px] text-base leading-[1.65] text-[var(--text-secondary)]">
            {HOME_PRICING.description}
          </p>

          <div className="mb-8 text-center">
            <span className="mb-4 inline-block rounded-full bg-[rgba(var(--primary-color-rgb),0.1)] px-4 py-1 text-sm font-bold uppercase tracking-wide text-[var(--primary-color)] dark:bg-[rgba(var(--primary-color-rgb),0.15)] dark:text-[var(--accent-violet)]">
              {HOME_PRICING.badge}
            </span>
            <div className="mb-2 text-4xl font-extrabold text-[var(--text-heading)] md:text-5xl">
              {HOME_PRICING.priceLabel}
            </div>
            <p className="text-[var(--text-secondary)]">{HOME_PRICING.priceSubtitle}</p>
          </div>

          <ul className="mb-8 space-y-3 text-left">
            {HOME_PRICING_FEATURES.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-[var(--text-primary)]"
              >
                <IconCheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-[var(--success-emerald)]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <Link href={HOME_PRICING.ctaHref} className={cn(btnPrimary)}>
            {HOME_PRICING.ctaLabel}
            <ArrowRight className="h-[17px] w-[17px] shrink-0" aria-hidden />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
