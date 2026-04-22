import { AuthThemeToggle } from "./components/AuthThemeToggle";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AuthThemeToggle />
      {children}
    </>
  );
}
