import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";

import type { BlogPostCardFields } from "@/app/blog/content";

function formatDate(iso: string) {
  try {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export type BlogPostCardProps = {
  post: BlogPostCardFields;
};

export function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--border-color-light)] bg-[var(--surface-1)] shadow-[var(--shadow-light)] transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-[rgba(var(--primary-color-rgb),0.28)] hover:shadow-[var(--shadow-medium)] dark:border-white/[0.08] dark:bg-[var(--surface-1)]">
      <Link href={`/blog/${post.slug}`} className="flex h-full flex-col">
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-[var(--gray-bg)] dark:bg-[var(--bg-purple-deeper)]">
          {post.coverImageUrl ? (
            <Image
              src={post.coverImageUrl}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div
              className="absolute inset-0 bg-gradient-to-br from-[rgba(var(--primary-color-rgb),0.12)] via-[rgba(var(--accent-violet-rgb),0.08)] to-[rgba(var(--accent-pink-rgb),0.06)]"
              aria-hidden
            />
          )}
        </div>
        <div className="flex flex-1 flex-col p-5 md:p-6">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="inline-flex rounded-full border border-[rgba(var(--primary-color-rgb),0.2)] bg-[rgba(var(--primary-color-rgb),0.06)] px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-[var(--primary-color)] dark:border-[rgba(var(--accent-violet-rgb),0.35)] dark:text-[var(--accent-violet)]">
              {post.category}
            </span>
            <span className="inline-flex items-center gap-1 text-[13px] text-[var(--text-secondary)]">
              <Calendar className="h-3.5 w-3.5 shrink-0 opacity-80" aria-hidden />
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            </span>
          </div>
          <h2 className="mb-2 text-lg font-bold leading-snug tracking-[-0.02em] text-[var(--text-heading)] transition-colors group-hover:text-[var(--primary-color)] md:text-xl">
            {post.title}
          </h2>
          <p className="mb-4 flex-1 text-sm leading-relaxed text-[var(--text-secondary)] line-clamp-3">
            {post.excerpt}
          </p>
          <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--primary-color)]">
            Read article
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden
            />
          </span>
        </div>
      </Link>
    </article>
  );
}
