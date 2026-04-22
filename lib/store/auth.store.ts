import { create } from "zustand";

import { clearAllTokens, setAccessToken, setRefreshToken } from "@/lib/auth/auth-token";
import type { AuthTokens, AuthUser } from "@/lib/auth/types";
import { queryClient } from "@/lib/query/query-client";

type AuthState = {
  user: AuthUser | null;
  /** True after first client-side run (optional hydration patterns). */
  isReady: boolean;
  setReady: (ready: boolean) => void;
  setUser: (user: AuthUser | null) => void;
  setSession: (tokens: AuthTokens, user: AuthUser) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isReady: false,

  setReady: (ready) => set({ isReady: ready }),

  setUser: (user) => set({ user }),

  setSession: (tokens, user) => {
    setAccessToken(tokens.access);
    setRefreshToken(tokens.refresh);
    set({ user });
  },

  clearAuth: () => {
    clearAllTokens();
    queryClient.clear();
    set({ user: null });
  },
}));
