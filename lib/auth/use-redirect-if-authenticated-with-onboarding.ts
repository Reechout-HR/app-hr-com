"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { getAccessToken } from "@/lib/auth/auth-token";
import { getFirstIncompleteOnboardingPath } from "@/lib/auth/onboarding";
import { authApi } from "@/lib/api";
import { useAuthStore } from "@/lib/store";

/**
 * When a token exists, resolve `/auth/me` and send the user to the next
 * onboarding step (or /interviews). Matches Angular
 * `redirectIfAuthenticatedOnboarding` on /login and /signup.
 */
export function useRedirectIfAuthenticatedWithOnboarding() {
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);
  const clearAuth = useAuthStore((s) => s.clearAuth);

  useEffect(() => {
    if (!getAccessToken()) {
      return;
    }

    let cancelled = false;

    (async () => {
      try {
        const meRes = await authApi.getMe();
        if (cancelled) {
          return;
        }
        setUser(meRes.data);
        const next = getFirstIncompleteOnboardingPath(meRes.data);
        router.replace(next ?? "/interviews");
      } catch {
        if (cancelled) {
          return;
        }
        clearAuth();
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [router, setUser, clearAuth]);
}
