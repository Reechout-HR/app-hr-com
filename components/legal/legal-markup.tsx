import type { ReactNode } from "react";

import { PAGE_SHELL_CLASS } from "@/lib/site/page-layout";

export function LegalArticle({ children }: { children: ReactNode }) {
  return (
    <article
      className={`${PAGE_SHELL_CLASS} pb-[clamp(3rem,8vw,5rem)]`}
      aria-label="Document content"
    >
      <div className="mx-auto max-w-3xl">{children}</div>
    </article>
  );
}

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="mb-12 border-b border-[var(--border-color-light)] pb-10 last:mb-0 last:border-b-0 dark:border-white/[0.08]">
      <h2 className="mb-5 text-xl font-bold tracking-tight text-[var(--text-heading)] md:text-[1.35rem]">
        {title}
      </h2>
      <div className="space-y-4 text-base leading-[1.75] text-[var(--text-secondary)]">
        {children}
      </div>
    </section>
  );
}

export function LegalSubheading({ children }: { children: ReactNode }) {
  return (
    <h3 className="mt-6 text-base font-bold text-[var(--text-heading)] first:mt-0 md:text-lg">
      {children}
    </h3>
  );
}

export function LegalP({ children }: { children: ReactNode }) {
  return <p>{children}</p>;
}

export function LegalUl({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-2 pl-5 marker:text-[var(--primary-color)]">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

export function LegalContactBox({ children }: { children: ReactNode }) {
  return (
    <div className="mt-4 rounded-xl border border-[var(--border-color-light)] bg-[var(--gray-bg)] px-4 py-3 text-[var(--text-secondary)] dark:border-white/[0.1] dark:bg-[var(--bg-purple-deeper)]">
      {children}
    </div>
  );
}
