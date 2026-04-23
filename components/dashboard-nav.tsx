"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { LogOut, Moon, Plus, Sun, User as UserIcon } from "lucide-react";

import { cn } from "@/lib/ui/cn";
import { THEME_KEY } from "@/lib/ui/theme";
import { useAuthStore } from "@/lib/store/auth.store";

interface DashboardNavProps {
  /** 
   * Optional callback for the "New Resource" button. 
   * If omitted, it will default to routing to `/interview/create` for interviews.
   */
  onCreateNew?: () => void;
}

export function DashboardNav({ onCreateNew }: DashboardNavProps) {
  const pathname = usePathname();
  const router = useRouter();
  const clearAuth = useAuthStore((s) => s.clearAuth);
  
  const [darkMode, setDarkMode] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  // Determine active tab based on route
  const activeTab = pathname?.includes("/questionnaire") ? "questionnaires" : "interviews";

  // Theme initialization
  useEffect(() => {
    const root = document.documentElement;
    const stored = localStorage.getItem(THEME_KEY) as "dark" | "light" | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = stored === "dark" || (!stored && prefersDark) ? "dark" : "light";
    
    if (initial === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    
    setDarkMode(root.classList.contains("dark"));
  }, []);

  const toggleTheme = useCallback(() => {
    const root = document.documentElement;
    root.classList.toggle("dark");
    const next = root.classList.contains("dark") ? "dark" : "light";
    localStorage.setItem(THEME_KEY, next);
    setDarkMode(next === "dark");
  }, []);

  // Close profile dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    if (profileOpen) document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [profileOpen]);

  const handleLogout = () => {
    clearAuth();
    router.push("/login");
  };

  const handleCreateClick = () => {
    if (onCreateNew) {
      onCreateNew();
    } else {
      if (activeTab === "questionnaires") {
        // You might use a query param `?create=true` or global state to trigger a modal later
        router.push("/questionnaires?create=true");
      } else {
        router.push("/interview/create");
      }
    }
  };

  return (
    <header className="sticky top-2 z-40 flex w-full flex-col items-stretch px-4 sm:top-4 sm:px-6 lg:px-8 mb-2 sm:mb-4">
      <div className="mx-auto flex w-full max-w-[1400px] min-h-[52px] shrink-0 items-center justify-between gap-3 rounded-[20px] border border-[var(--header-floating-border)] bg-[var(--header-floating-bg)] py-3 px-[clamp(0.875rem,2.5vw,1.125rem)] shadow-[0_4px_32px_rgba(var(--shadow-rgb),0.09),0_1px_4px_rgba(var(--shadow-rgb),0.05)] sm:px-[clamp(1.125rem,3.5vw,1.5rem)] lg:px-[clamp(1.25rem,4vw,2rem)]">
        {/* Left: Logo & Product Name */}
        <Link href="/interviews" className="flex min-w-0 shrink-0 items-center gap-2 sm:gap-2.5 no-underline outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-color)] rounded-md">
          <Image
            src="https://storage.googleapis.com/images.reechout.com/android-chrome-192x192.webp"
            alt="ReechOut Logo"
            width={40}
            height={40}
            className="h-8 w-auto max-w-full object-contain md:h-10"
          />
          <span className="hidden text-lg font-extrabold tracking-tight text-[var(--product-name-color)] md:text-xl md:block">
            ReechOut
          </span>
        </Link>

        {/* Center: Navigation Tabs */}
        <nav className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-sm:hidden">
          <ul className="flex items-center gap-1 rounded-lg border border-[var(--border-color-light)] bg-[var(--surface-1)] p-1 shadow-sm">
            <li>
              <Link
                href="/interviews"
                className={cn(
                  "block rounded-md px-4 py-1.5 text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-color)]",
                  activeTab === "interviews"
                    ? "bg-[var(--background-color)] text-[var(--primary-color)] shadow-sm border border-[var(--border-color-light)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-transparent"
                )}
              >
                Interviews
              </Link>
            </li>
            <li>
              <Link
                href="/questionnaires"
                className={cn(
                  "block rounded-md px-4 py-1.5 text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-color)]",
                  activeTab === "questionnaires"
                    ? "bg-[var(--background-color)] text-[var(--primary-color)] shadow-sm border border-[var(--border-color-light)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-transparent"
                )}
              >
                Questionnaires
              </Link>
            </li>
          </ul>
        </nav>

        {/* Right: Actions */}
        <div className="ml-auto flex shrink-0 items-center gap-1.5 sm:gap-2.5 lg:ml-7">
          {/* Desktop Create Button */}
          <button
            onClick={handleCreateClick}
            className="hidden items-center justify-center gap-1.5 whitespace-nowrap rounded-md border-0 bg-[var(--primary-color)] font-semibold text-white transition-opacity hover:opacity-90 shadow-[0_0_0_1px_rgba(var(--primary-color-rgb),0.35),0_4px_14px_rgba(var(--primary-color-rgb),0.28)] sm:flex h-8 px-3 text-[13px] md:h-10 md:px-4 md:text-sm"
          >
            <Plus className="h-4 w-4 shrink-0" strokeWidth={2.5} />
            {activeTab === "questionnaires" ? "New Questionnaire" : "New Interview"}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            className="flex items-center justify-center shrink-0 rounded-full text-[var(--text-secondary)] transition-[border-color,background-color,color] duration-200 hover:bg-[var(--surface-1)] hover:text-[var(--text-primary)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-color)] border border-[var(--border-color-light)] bg-transparent h-8 w-8 md:h-10 md:w-10"
          >
            {darkMode ? <Sun className="h-4 w-4 md:h-5 md:w-5" strokeWidth={2} /> : <Moon className="h-4 w-4 md:h-5 md:w-5" strokeWidth={2} />}
          </button>

          {/* Profile Dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              aria-haspopup="true"
              aria-expanded={profileOpen}
              className="flex items-center justify-center shrink-0 rounded-full bg-[var(--surface-1)] text-[var(--text-secondary)] transition-[border-color,background-color,color] duration-200 hover:text-[var(--text-primary)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-color)] border border-[var(--border-color-light)] h-8 w-8 md:h-10 md:w-10"
            >
              <UserIcon className="h-4 w-4 md:h-5 md:w-5" strokeWidth={2} />
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-xl border border-[var(--border-color-light)] bg-[var(--background-color)] py-1 shadow-[0_8px_32px_rgba(var(--shadow-rgb),0.14)] ring-1 ring-black ring-opacity-5 focus:outline-none">
                <button
                  disabled
                  className="flex w-full items-center gap-2 px-4 py-2 text-sm text-[var(--text-secondary)] opacity-50 cursor-not-allowed"
                >
                  <UserIcon className="h-4 w-4" />
                  Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 px-4 py-2 text-sm text-[var(--text-secondary)] transition-colors hover:bg-[var(--surface-1)] hover:text-red-500"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
