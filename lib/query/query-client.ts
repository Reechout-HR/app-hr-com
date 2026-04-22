import { QueryClient } from "@tanstack/react-query";

/**
 * Module singleton so non-React code (e.g. axios interceptors, auth store) can
 * clear cached queries on logout — same idea as RegulateIQ `lib/query-client.ts`.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      retry: 1,
      refetchOnWindowFocus: false,
      retryDelay: (attempt) => Math.min(1_000 * 2 ** attempt, 10_000),
    },
    mutations: {
      retry: 0,
    },
  },
});
