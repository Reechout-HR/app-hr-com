"use client";

import { useRouter } from "next/navigation";
import { FloatingBtn } from "@/components/floating-btn";

export default function InterviewsPage() {
  const router = useRouter();

  const handleCreateNew = () => {
    router.push("/interview/create");
  };

  return (
    <div className="mx-auto w-full max-w-[1400px] pt-4 pb-8 sm:pt-6">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">Interviews</h1>
        {/* We can place additional header controls here like search, filter, etc. */}
      </div>
      
      {/* Skeleton Content Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div 
            key={i} 
            className="flex h-48 flex-col justify-between rounded-xl border border-[var(--border-color-light)] bg-[var(--surface-1)] p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="animate-pulse">
              <div className="mb-4 flex items-start justify-between">
                <div className="h-5 w-2/3 rounded-md bg-[var(--border-color)]" />
                <div className="h-8 w-8 rounded-full bg-[var(--border-color)]" />
              </div>
              <div className="mb-3 h-4 w-1/2 rounded-md bg-[var(--border-color)] opacity-70" />
              <div className="h-4 w-1/3 rounded-md bg-[var(--border-color)] opacity-70" />
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-[var(--border-color-light)] pt-4 animate-pulse">
              <div className="h-8 w-24 rounded-md bg-[var(--border-color)]" />
              <div className="h-4 w-16 rounded-md bg-[var(--border-color)] opacity-60" />
            </div>
          </div>
        ))}
      </div>

      {/* Renders only on mobile */}
      <FloatingBtn text="New Interview" onClick={handleCreateNew} />
    </div>
  );
}
