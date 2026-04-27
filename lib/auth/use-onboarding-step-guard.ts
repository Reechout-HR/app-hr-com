"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { authApi } from "@/lib/api";
import { getAccessToken } from "@/lib/auth/auth-token";
import { getFirstIncompleteOnboardingPath } from "@/lib/auth/onboarding";
import { useAuthStore } from "@/lib/store";

export type OnboardingStepName = "verify" | "setup" | "pending";

/**
 * Redirects to the correct route for the current user, matching Angular
 * `verifyEmailPageGuard`, `companySetupPageGuard`, `pendingApprovalPageGuard`.
 * Returns `true` when the current page is the right step to show.
 */
export function useOnboardingStepGuard(step: OnboardingStepName): boolean {
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (!getAccessToken()) {
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
        const u = me.data;

        if (step === "verify") {
          if (u.email_verified) {
            router.replace(getFirstIncompleteOnboardingPath(u) ?? "/interviews");
            return;
          }
        } else if (step === "setup") {
          if (!u.email_verified) {
            router.replace("/verify-email");
            return;
          }
          if (u.company_profile_completed) {
            router.replace(getFirstIncompleteOnboardingPath(u) ?? "/interviews");
            return;
          }
        } else {
          if (!u.email_verified) {
            router.replace("/verify-email");
            return;
          }
          if (!u.company_profile_completed) {
            router.replace("/company-setup");
            return;
          }
          if (u.account_approved) {
            router.replace("/interviews");
            return;
          }
        }
        if (!cancelled) {
          setOk(true);
        }
      } catch {
        if (!cancelled) {
          router.replace("/login");
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [router, setUser, step]);

  return ok;
}
