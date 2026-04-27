import type { Metadata } from "next";

import { AuthThemeToggle } from "./components/AuthThemeToggle";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AuthThemeToggle />
      {children}
    </>
  );
}
