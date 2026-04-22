"use client";

import { useLoaderStore } from "@/stores/loader-store";

/**
 * Full-screen loading overlay driven by `apiClient` interceptors + `useLoaderStore`.
 * Spinner: `::before` / `::after` dual-ball + box-shadow animation (see `reech-pair-spatial-loader` in `globals.css`).
 */
export function GlobalApiLoader() {
  const isLoading = useLoaderStore((s) => s.isLoading);

  if (!isLoading) return null;

  return (
    <div
      className="pointer-events-auto fixed inset-0 z-[10001] flex items-center justify-center bg-[rgba(var(--primary-color-rgb),0.1)] backdrop-blur-[5px]"
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label="Loading"
    >
      <div
        className="inline-flex origin-center max-[768px]:scale-90"
        aria-hidden
      >
        <div className="reech-pair-spatial-loader" />
      </div>
    </div>
  );
}
