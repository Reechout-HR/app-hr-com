"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useLayoutEffect, useRef, useState } from "react";

import { HOME_TESTIMONIALS } from "@/app/home-content";
import { IconMessage, IconStar } from "./home-icons";

type HomeTestimonial = (typeof HOME_TESTIMONIALS)[number];

const LOOP_SECONDS = 50;

function TestimonialCard({ t }: { t: HomeTestimonial }) {
  return (
    <article
      className="flex h-full flex-col rounded-2xl border border-[var(--border-color-light)] bg-[var(--background-color)] p-6 shadow-[var(--shadow-light)] transition-shadow hover:shadow-[var(--shadow-medium)]"
      itemScope
      itemType="https://schema.org/Review"
    >
      <div className="mb-4 text-[var(--primary-color)]">
        <IconMessage className="h-8 w-8 opacity-80" aria-hidden />
      </div>
      <div
        className="mb-4 flex gap-0.5 text-[var(--star-gold)]"
        itemProp="reviewRating"
        itemScope
        itemType="https://schema.org/Rating"
        aria-label="5 star rating"
      >
        <meta itemProp="ratingValue" content="5" />
        <meta itemProp="bestRating" content="5" />
        {Array.from({ length: 5 }).map((_, i) => (
          <IconStar key={i} className="h-4 w-4" aria-hidden />
        ))}
      </div>
      <blockquote
        className="mb-6 flex-1 text-[var(--text-primary)] leading-relaxed"
        itemProp="reviewBody"
      >
        &ldquo;{t.content}&rdquo;
      </blockquote>
      <div
        className="flex items-center gap-4 border-t border-[var(--border-color-light)] pt-4"
        itemProp="author"
        itemScope
        itemType="https://schema.org/Person"
      >
        <Image
          src={t.avatar}
          alt=""
          width={50}
          height={50}
          className="h-[50px] w-[50px] rounded-full object-cover"
        />
        <div>
          <p
            className="font-semibold text-[var(--text-heading)]"
            itemProp="name"
          >
            {t.author}
          </p>
          {t.position ? (
            <p
              className="text-sm text-[var(--text-secondary)]"
              itemProp="jobTitle"
            >
              {t.position}
            </p>
          ) : null}
          {t.company ? (
            <p className="text-sm text-[var(--text-muted)]">{t.company}</p>
          ) : null}
        </div>
      </div>
    </article>
  );
}

const SLIDE_WIDTH =
  "w-[280px] min-w-[280px] sm:w-[320px] sm:min-w-[320px] md:w-[380px] md:min-w-[380px]";

function TestimonialSlides({ items, suffix }: { items: readonly HomeTestimonial[]; suffix: string }) {
  return (
    <>
      {items.map((t, i) => (
        <div
          key={`${suffix}-${i}-${t.author}`}
          className={`flex shrink-0 ${SLIDE_WIDTH}`}
          aria-hidden={suffix === "b" ? true : undefined}
        >
          <TestimonialCard t={t} />
        </div>
      ))}
    </>
  );
}

export function HomeTestimonialsSlider() {
  const items = HOME_TESTIMONIALS;
  const prefersReducedMotion = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const [loopPx, setLoopPx] = useState(0);

  const measure = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const half = el.scrollWidth / 2;
    if (half > 0) setLoopPx(half);
  }, []);

  useLayoutEffect(() => {
    measure();
    const el = trackRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => measure());
    ro.observe(el);
    return () => ro.disconnect();
  }, [measure]);

  if (prefersReducedMotion) {
    return (
      <div
        className="flex flex-wrap justify-center gap-6 md:gap-8"
        role="region"
        aria-label="Customer testimonials"
      >
        {items.map((t) => (
          <div key={`static-${t.author}-${t.company}`} className={SLIDE_WIDTH}>
            <TestimonialCard t={t} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className="relative overflow-hidden py-5"
      role="region"
      aria-label="Customer testimonials"
    >
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-[2] w-[min(150px,18vw)] bg-gradient-to-r from-[var(--background-color)] to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-[2] w-[min(150px,18vw)] bg-gradient-to-l from-[var(--background-color)] to-transparent"
        aria-hidden
      />

      <motion.div
        ref={trackRef}
        className="flex w-max items-stretch gap-6 md:gap-8"
        initial={false}
        animate={loopPx > 0 ? { x: [0, -loopPx] } : { x: 0 }}
        transition={{
          duration: LOOP_SECONDS,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
      >
        <TestimonialSlides items={items} suffix="a" />
        <TestimonialSlides items={items} suffix="b" />
      </motion.div>
    </div>
  );
}
