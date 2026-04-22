import { create } from "zustand";

/**
 * Request-count–based global loader (same semantics as Angular `LoaderService`).
 * Multiple in-flight HTTP calls keep the overlay until the last one finishes.
 */
type LoaderStore = {
  requestCount: number;
  isLoading: boolean;
  show: () => void;
  hide: () => void;
  forceHide: () => void;
  reset: () => void;
};

export const useLoaderStore = create<LoaderStore>((set, get) => ({
  requestCount: 0,
  isLoading: false,

  show: () => {
    const next = get().requestCount + 1;
    set({ requestCount: next });
    if (next === 1) {
      set({ isLoading: true });
    }
  },

  hide: () => {
    const next = Math.max(0, get().requestCount - 1);
    set({ requestCount: next });
    if (next === 0) {
      set({ isLoading: false });
    }
  },

  forceHide: () => {
    set({ requestCount: 0, isLoading: false });
  },

  reset: () => {
    set({ requestCount: 0, isLoading: false });
  },
}));
