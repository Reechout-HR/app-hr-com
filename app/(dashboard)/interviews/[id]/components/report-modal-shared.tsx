"use client";

import type { ComponentType, ReactNode, SVGProps } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/ui/cn";

export type ReportModalIcon = ComponentType<SVGProps<SVGSVGElement>>;

export const GLASS_CARD_CLASS =
  "glass-card-shimmer relative overflow-hidden rounded-[var(--radius-lg)] " +
  "bg-[var(--glass-bg-medium)] backdrop-blur-[15px] border border-[var(--glass-border-medium)] " +
  "p-8 shadow-[0_12px_24px_var(--glass-shadow-dark),0_0_0_1px_var(--glass-white-overlay)_inset] " +
  "transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] " +
  "hover:-translate-y-1 hover:shadow-[0_16px_32px_var(--glass-shadow-dark),0_0_0_1px_var(--glass-white-overlay-dark)_inset] " +
  "hover:border-[var(--glass-border-dark)]";

export const INNER_CARD_CLASS =
  "rounded-xl bg-[var(--glass-bg-medium)] backdrop-blur-[15px] border border-[var(--glass-border-medium)]";

export function getScoreColor(
  score: string | number | null | undefined,
): string {
  if (score === null || score === undefined || score === "") {
    return "var(--text-secondary)";
  }
  const num = typeof score === "string" ? parseFloat(score) : score;
  if (Number.isNaN(num)) return "var(--text-secondary)";
  if (num >= 80) return "var(--success-color)";
  if (num >= 60) return "var(--warning-color)";
  return "var(--error-color)";
}

export function ProfileCard({
  initials,
  name,
  email,
}: {
  initials: string;
  name: string;
  email: string;
}) {
  return (
    <div className="relative overflow-hidden p-8 text-center bg-gradient-to-br from-[var(--glass-primary-overlay-medium)] to-[var(--glass-primary-overlay)] border-b border-[var(--glass-border-medium)]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--glass-white-overlay-dark)] to-transparent pointer-events-none" />
      <div className="relative z-[1] flex flex-col items-center gap-3">
        <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-gradient-to-br from-[var(--glass-primary-overlay-dark)] to-[var(--glass-primary-overlay-medium)] border border-[rgba(var(--primary-color-rgb),0.3)] text-[26px] font-extrabold text-[var(--text-accent-color)] shadow-[0_8px_20px_rgba(var(--primary-color-rgb),0.15)]">
          {initials || "?"}
        </div>
        <div className="flex flex-col gap-1 min-w-0 w-full">
          <div className="text-base font-bold text-[var(--text-primary)] truncate leading-tight">
            {name}
          </div>
          <div className="text-[13px] text-[var(--text-secondary)] truncate">
            {email}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ReportNavCategory({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="mb-6 last:mb-0">
      <div className="px-3 pb-2.5 mb-1.5 text-[11px] font-bold uppercase tracking-[1px] text-[var(--text-secondary)]">
        {title}
      </div>
      <div className="flex flex-col">{children}</div>
    </div>
  );
}

export function ReportNavItem({
  icon: Icon,
  label,
  isActive,
  onClick,
}: {
  icon: ReportModalIcon;
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group relative flex items-center gap-3 mx-1 mb-1.5 px-4 py-3 rounded-[var(--radius-md)] text-sm text-left transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] backdrop-blur-[10px]",
        isActive
          ? "bg-gradient-to-br from-[rgba(var(--primary-color-rgb),0.2)] to-[rgba(var(--primary-color-rgb),0.1)] border border-[rgba(var(--primary-color-rgb),0.5)] shadow-[0_4px_12px_rgba(var(--primary-color-rgb),0.15)]"
          : "bg-[var(--glass-white-overlay-light)] border border-[var(--glass-border-medium)] shadow-[0_2px_4px_var(--glass-shadow-medium)] hover:bg-[var(--glass-white-overlay)] hover:border-[var(--glass-border-dark)] hover:translate-x-1 hover:shadow-[0_4px_8px_var(--glass-shadow-medium)]",
      )}
    >
      <Icon
        className={cn(
          "h-[18px] w-[18px] shrink-0 transition-colors duration-300",
          isActive
            ? "text-[var(--icon-accent-color)]"
            : "text-[var(--text-secondary)] group-hover:text-[var(--icon-accent-color)]",
        )}
      />
      <span
        className={cn(
          "transition-colors duration-300",
          isActive
            ? "font-semibold text-[var(--text-accent-color)]"
            : "font-medium text-[var(--text-primary)] group-hover:text-[var(--text-accent-color)]",
        )}
      >
        {label}
      </span>
    </button>
  );
}

export function FloatingCloseButton({
  onClick,
  className,
}: {
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Close"
      className={cn(
        "absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--glass-bg-light)] backdrop-blur-[10px] border border-[var(--glass-border-light)] shadow-[var(--shadow-light)] transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-[var(--glass-white-overlay-dark)] hover:rotate-90 hover:shadow-[var(--shadow-medium)] group",
        className,
      )}
    >
      <X className="h-[18px] w-[18px] text-[var(--text-secondary)] transition-colors duration-300 group-hover:text-[var(--primary-color)]" />
    </button>
  );
}

export function GlassCardHeader({
  icon: Icon,
  title,
  subtitle,
  rightSlot,
}: {
  icon: ReportModalIcon;
  title: string;
  subtitle?: string;
  rightSlot?: ReactNode;
}) {
  return (
    <header className="relative z-[1] mb-6 flex items-start gap-4">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[rgba(var(--primary-color-rgb),0.2)] to-[rgba(var(--primary-color-rgb),0.1)] backdrop-blur-[10px] border border-[rgba(var(--primary-color-rgb),0.3)] shadow-[0_4px_8px_rgba(var(--primary-color-rgb),0.1)]">
        <Icon className="h-6 w-6 text-[var(--icon-accent-color)]" />
      </div>
      <div className="flex-1 min-w-0">
        <h1 className="text-2xl font-bold leading-tight text-[var(--text-primary)] m-0 mb-2">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm leading-relaxed text-[var(--text-secondary)] m-0">
            {subtitle}
          </p>
        )}
      </div>
      {rightSlot && (
        <div className="relative z-[1] shrink-0 ml-2">{rightSlot}</div>
      )}
    </header>
  );
}
