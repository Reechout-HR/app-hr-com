import type { Metadata } from "next";

import { DashboardFcmInit } from "@/components/dashboard-fcm-init";
import { DashboardNav } from "@/components/dashboard-nav";
import { DashboardFooter } from "@/components/dashboard-footer";

import { DashboardOnboardingGate } from "./dashboard-onboarding-gate";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardOnboardingGate>
      <div className="flex min-h-screen flex-col bg-[var(--background-color)]">
        <DashboardFcmInit />
        <DashboardNav />
        <main className="flex-1 overflow-auto px-4 sm:px-6 lg:px-8">
          {children}
        </main>
        <DashboardFooter />
      </div>
    </DashboardOnboardingGate>
  );
}
