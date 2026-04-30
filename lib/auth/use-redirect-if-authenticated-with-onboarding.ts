"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { getFirstIncompleteOnboardingPath } from "@/lib/auth/onboarding";
import { useAuthStore } from "@/lib/store";

/**
 * Used on /login and /signup. If the store already has a user (populated by
 * the boot-time `/auth/me` in `AuthBootstrap`), redirect straight to the next
 * onboarding step or /interviews. Pure store read — no extra network call.
 */
export function useRedirectIfAuthenticatedWithOnboarding() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const isReady = useAuthStore((s) => s.isReady);

  useEffect(() => {
    if (!isReady || !user) return;
    const next = getFirstIncompleteOnboardingPath(user);
    router.replace(next ?? "/interviews");
  }, [isReady, user, router]);
}
