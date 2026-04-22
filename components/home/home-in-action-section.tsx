"use client";

/**
 * Mirrors RegulateIQ `ProductScreenshots` (regulateiq-com/src/blocks/ProductScreenshots/Component.client.tsx):
 * panel background, glows, Shield + section tag, vertical tabs with layoutId accent, screenshot card + AnimatePresence.
 */

import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import Image from "next/image";
import { Shield } from "lucide-react";
import { useState } from "react";

import {
  HOME_IN_ACTION_HEADLINE,
  HOME_IN_ACTION_ITEMS,
} from "@/app/home-content";
import { cn } from "@/lib/ui/cn";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

type ProductTabId = (typeof HOME_IN_ACTION_ITEMS)[number]["id"];

export function HomeInActionSection() {
  const items = HOME_IN_ACTION_ITEMS;
  const [activeTab, setActiveTab] = useState<ProductTabId>(
    items[0]?.id ?? "interviews",
  );

  const active = items.find((t) => t.id === activeTab) ?? items[0];

  return (
    <section
      id="product"
      className="relative overflow-hidden border-y border-[var(--border-color-light)] bg-[var(--gray-bg)] py-[clamp(5rem,10vw,7.5rem)] dark:border-white/[0.08] dark:bg-[rgba(var(--black-rgb),0.35)]"
      aria-labelledby="product-heading"
    >
      {/* Background glows — RegulateIQ ProductScreenshots */}
      <div
        className="pointer-events-none absolute left-[10%] top-[20%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(var(--primary-color-rgb),0.08)_0%,transparent_70%)] blur-[60px] dark:bg-[radial-gradient(circle,rgba(var(--accent-violet-rgb),0.12)_0%,transparent_70%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-[10%] right-[10%] h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(var(--accent-violet-rgb),0.08)_0%,transparent_70%)] blur-[60px]"
        aria-hidden
      />

      <div className="relative z-[1] mx-auto w-full max-w-[1200px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 48, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-14 text-center"
        >
          <div
            className="mb-5 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--primary-color)] dark:text-[var(--accent-violet)]"
            style={{
              background: "rgba(var(--primary-color-rgb), 0.08)",
            }}
          >
            <Shield className="h-[11px] w-[11px] shrink-0" strokeWidth={2} aria-hidden />
            {HOME_IN_ACTION_HEADLINE.sectionTag}
          </div>
          <h2
            id="product-heading"
            className="mb-4 text-[clamp(1.875rem,4.5vw,3.25rem)] font-extrabold leading-[1.08] tracking-[-0.035em] text-[var(--text-heading)]"
          >
            {HOME_IN_ACTION_HEADLINE.title}
          </h2>
          <p className="mx-auto max-w-[580px] text-base leading-[1.7] text-[var(--text-muted)]">
            {HOME_IN_ACTION_HEADLINE.description}
          </p>
        </motion.div>

        <div className="grid items-center gap-6 lg:grid-cols-[250px_1fr] lg:gap-10">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
            className="flex flex-row gap-3 overflow-x-auto pb-2 [-webkit-overflow-scrolling:touch] lg:flex-col lg:overflow-visible lg:pb-0"
            role="tablist"
            aria-label="Product screenshots"
          >
            <LayoutGroup id="reechout-product-tabs">
              {items.map((t) => {
                const isActive = activeTab === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    role="tab"
                    id={`product-tab-${t.id}`}
                    aria-selected={isActive}
                    aria-controls="product-panel"
                    title={t.description}
                    onClick={() => setActiveTab(t.id)}
                    className={cn(
                      "relative overflow-hidden rounded-2xl border px-6 py-[18px] text-left text-base transition-colors",
                      "max-lg:shrink-0 max-lg:whitespace-nowrap max-lg:py-3 max-lg:pl-5 max-lg:pr-5",
                      isActive
                        ? "border-[rgba(var(--primary-color-rgb),0.3)] bg-[var(--background-color)] font-extrabold text-[var(--primary-color)] shadow-[0_10px_30px_rgba(var(--primary-color-rgb),0.1)] dark:border-[rgba(var(--accent-violet-rgb),0.35)] dark:text-[var(--accent-violet)]"
                        : "border-transparent font-semibold text-[var(--text-muted)] hover:bg-black/[0.02] dark:hover:bg-white/[0.04]",
                    )}
                  >
                    {isActive ? (
                      <motion.div
                        layoutId="activeTabIndicator"
                        className="absolute bottom-[20%] left-0 top-[20%] w-1 rounded-r bg-[var(--primary-color)] dark:bg-[var(--accent-violet)]"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    ) : null}
                    <span className="relative pl-1">{t.label}</span>
                  </button>
                );
              })}
            </LayoutGroup>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
            className="relative"
          >
            <div
              className="pointer-events-none absolute inset-[-40px] bg-[radial-gradient(circle_at_center,rgba(var(--primary-color-rgb),0.08)_0%,transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(var(--accent-violet-rgb),0.1)_0%,transparent_70%)]"
              aria-hidden
            />
            <div
              id="product-panel"
              role="tabpanel"
              aria-labelledby={`product-tab-${active?.id}`}
              className="relative rounded-[32px] border border-[var(--border-color-light)] bg-[var(--background-color)] p-4 shadow-[0_20px_60px_rgba(var(--shadow-rgb),0.08)] dark:border-white/[0.09]"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
                  transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                >
                  <div className="overflow-hidden rounded-[20px] border border-[var(--border-color-light)] dark:border-white/[0.08]">
                    <Image
                      src={active.imageLight}
                      alt={`ReechOut — ${active.label}`}
                      width={3456}
                      height={1994}
                      sizes="(max-width: 1024px) 100vw, 55vw"
                      className="block h-auto w-full dark:hidden"
                      priority={activeTab === items[0]?.id}
                    />
                    <Image
                      src={active.imageDark}
                      alt={`ReechOut — ${active.label}`}
                      width={3456}
                      height={1994}
                      sizes="(max-width: 1024px) 100vw, 55vw"
                      className="hidden h-auto w-full dark:block"
                      priority={activeTab === items[0]?.id}
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
