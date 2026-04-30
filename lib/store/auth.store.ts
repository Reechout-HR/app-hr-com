import { create } from "zustand";

import type { AuthUser } from "@/lib/auth/types";
import { queryClient } from "@/lib/query/query-client";

type AuthState = {
  user: AuthUser | null;
  /** True after first client-side run (optional hydration patterns). */
  isReady: boolean;
  setReady: (ready: boolean) => void;
  setUser: (user: AuthUser | null) => void;
  /**
   * Establish the in-memory session. Tokens live in httpOnly cookies that the
   * browser attaches automatically, so only the user profile needs to be stored.
   */
  setSession: (user: AuthUser) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isReady: false,

  setReady: (ready) => set({ isReady: ready }),

  setUser: (user) => set({ user }),

  setSession: (user) => {
    set({ user });
  },

  clearAuth: () => {
    queryClient.clear();
    set({ user: null });
  },
}));
