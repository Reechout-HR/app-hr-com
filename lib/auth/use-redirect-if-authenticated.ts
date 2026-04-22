"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { getAccessToken } from "@/lib/auth/auth-token";

/** Send users with a stored access token away from `/login` (and similar). */
export function useRedirectIfAuthenticated(to = "/") {
  const router = useRouter();

  useEffect(() => {
    if (getAccessToken()) {
      router.replace(to);
    }
  }, [router, to]);
}
