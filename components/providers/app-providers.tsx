"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";

import { AuthBootstrap } from "@/components/auth-bootstrap";
import { GlobalApiLoader } from "@/components/global-api-loader";
import { queryClient } from "@/lib/query/query-client";

type AppProvidersProps = {
  children: ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthBootstrap />
      {children}
      <GlobalApiLoader />
    </QueryClientProvider>
  );
}
