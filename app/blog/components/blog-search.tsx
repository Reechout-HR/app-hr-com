"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";

import type { BlogPostCardFields } from "@/app/blog/content";

import { BlogPostCard } from "./blog-post-card";

export type BlogSearchProps = {
  posts: BlogPostCardFields[];
};

export function BlogSearch({ posts }: BlogSearchProps) {
  const categories = useMemo(() => {
    const unique = new Set(posts.map((p) => p.category));
    return ["All", ...Array.from(unique).sort()];
  }, [posts]);

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      const catOk = category === "All" || p.category === category;
      if (!catOk) return false;
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    });
  }, [posts, query, category]);

  return (
    <div className="w-full">
      <div className="mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-center md:justify-between md:gap-6">
        <div className="relative max-w-md flex-1">
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-very-muted)]"
            aria-hidden
          />
          <label htmlFor="blog-search" className="sr-only">
            Search articles
          </label>
          <input
            id="blog-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title or topic…"
            className="w-full rounded-xl border border-[var(--border-color-light)] bg-[var(--surface-1)] py-2.5 pl-10 pr-4 text-sm text-[var(--text-primary)] shadow-[var(--shadow-light)] outline-none transition-[border-color,box-shadow] placeholder:text-[var(--text-very-muted)] focus:border-[rgba(var(--primary-color-rgb),0.45)] focus:ring-2 focus:ring-[rgba(var(--primary-color-rgb),0.15)] dark:border-white/[0.1] dark:bg-[var(--background-color)]"
          />
        </div>
        <div
          className="flex flex-wrap gap-2"
          role="tablist"
          aria-label="Filter by category"
        >
          {categories.map((cat) => {
            const selected = category === cat;
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setCategory(cat)}
                className={
                  selected
                    ? "rounded-full border border-[rgba(var(--primary-color-rgb),0.35)] bg-[rgba(var(--primary-color-rgb),0.12)] px-3.5 py-1.5 text-xs font-bold text-[var(--primary-color)] dark:text-[var(--accent-violet)]"
                    : "rounded-full border border-[var(--border-color-light)] bg-transparent px-3.5 py-1.5 text-xs font-semibold text-[var(--text-secondary)] transition-colors hover:border-[rgba(var(--primary-color-rgb),0.25)] hover:text-[var(--text-primary)] dark:border-white/[0.1]"
                }
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-xl border border-dashed border-[var(--border-color-light)] bg-[var(--gray-bg)] px-6 py-12 text-center text-sm text-[var(--text-secondary)] dark:border-white/[0.1] dark:bg-[var(--bg-purple-deeper)]">
          No articles match your filters. Try another keyword or category.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {filtered.map((post) => (
            <BlogPostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
