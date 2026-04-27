"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { authApi } from "@/lib/api";
import { getAccessToken } from "@/lib/auth/auth-token";
import { getFirstIncompleteOnboardingPath } from "@/lib/auth/onboarding";
import { useAuthStore } from "@/lib/store";

/**
 * Client gate: only render dashboard UI when the user is fully onboarded.
 * Otherwise redirect to the next onboarding step (same as Angular `onboardingCompleteGuard`).
 */
export function DashboardOnboardingGate({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const token = getAccessToken();
    if (!token) {
      router.replace("/login");
      return;
    }

    let cancelled = false;

    (async () => {
      try {
        const me = await authApi.getMe();
        if (cancelled) {
          return;
        }
        setUser(me.data);
        const next = getFirstIncompleteOnboardingPath(me.data);
        if (next) {
          router.replace(next);
          return;
        }
        setReady(true);
      } catch {
        if (!cancelled) {
          router.replace("/login");
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [router, setUser]);

  if (!ready) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--background-color)]">
        <div
          className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--primary-color)] border-t-transparent"
          role="status"
          aria-label="Loading"
        />
      </div>
    );
  }

  return <>{children}</>;
}
