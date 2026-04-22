import { cn } from "@/lib/ui/cn";

/** Shared `<input>` styles for auth forms (replaces auth-form-layout `.input`). */
export function authInputClassName(opts?: {
  withLeadingIcon?: boolean;
  /** Right padding for password visibility toggle (`AuthPasswordField`). */
  withPasswordToggle?: boolean;
  extra?: string;
}) {
  const { withLeadingIcon, withPasswordToggle, extra } = opts ?? {};
  return cn(
    "h-[46px] w-full rounded-[10px] px-3.5 text-[15px] text-[var(--text-heading)]",
    "bg-[color-mix(in_srgb,var(--foreground)_4%,transparent)]",
    "border border-[color-mix(in_srgb,var(--foreground)_10%,transparent)]",
    "transition-[border-color,box-shadow,background-color] duration-150",
    "placeholder:text-[var(--text-muted)] placeholder:opacity-[0.85]",
    "hover:border-[color-mix(in_srgb,var(--primary-color)_25%,var(--foreground)_10%)]",
    "focus:border-[var(--primary-color)] focus:bg-[var(--bg-card)] focus:outline-none focus:shadow-[0_0_0_3px_rgba(var(--primary-color-rgb),0.16)]",
    withLeadingIcon && "pl-[42px]",
    withPasswordToggle && "pr-11",
    extra,
  );
}

export const authPasswordToggleButtonClassName = cn(
  "absolute right-1.5 top-1/2 z-[1] flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg",
  "text-[var(--text-muted)] transition-colors",
  "hover:bg-[color-mix(in_srgb,var(--foreground)_6%,transparent)] hover:text-[var(--text-heading)]",
);

export const authInputIconWrapClassName =
  "pointer-events-none absolute left-3.5 top-1/2 z-[1] flex -translate-y-1/2 items-center justify-center text-[var(--text-muted)] transition-colors duration-200 group-focus-within:text-[var(--primary-color)]";

export const authCardHeaderClassName = "mb-7 text-center max-md:mb-5";

export const authCardHeaderLineClassName =
  "mx-auto mb-4 h-[3px] w-10 rounded-[2px] bg-gradient-to-r from-[var(--color-primary)] to-[rgba(var(--color-primary-rgb),0.15)] shadow-[0_0_12px_rgba(var(--color-primary-rgb),0.45)]";

/** Row under password field — spaced below input / field error. */
export const authForgotRowClassName = "mt-4 flex justify-end";

export const authPasswordStrengthBlockClassName = "mb-1";

export const authCheckboxRowClassName = "flex flex-row items-start gap-2.5";

export const authStateStackClassName =
  "flex flex-col items-center gap-4 text-center";

export const authStateIconWrapSuccessClassName = cn(
  "flex h-14 w-14 shrink-0 items-center justify-center rounded-full border",
  "border-[color-mix(in_srgb,var(--color-success)_25%,transparent)]",
  "bg-[color-mix(in_srgb,var(--color-success)_12%,transparent)]",
);

export const authStateIconWrapErrorClassName = cn(
  "flex h-14 w-14 shrink-0 items-center justify-center rounded-full border",
  "border-[color-mix(in_srgb,var(--destructive)_25%,transparent)]",
  "bg-[color-mix(in_srgb,var(--destructive)_10%,transparent)]",
);

export const authStateIconSuccessClassName = "text-[var(--color-success)]";
export const authStateIconErrorClassName = "text-[var(--destructive)]";

export const authTitleFlushClassName = "mb-0";

export const authSuspenseFallbackClassName = "flex items-center justify-center p-12";

export const authLinkPlainClassName =
  "cursor-pointer border-0 bg-transparent p-0 text-[13px] text-[var(--text-muted)]";

export const authSubmitButtonClassName = cn(
  "relative w-full cursor-pointer overflow-hidden rounded-xl border-0 font-bold tracking-wide text-white",
  "h-[46px] shadow-[0_0_0_1px_rgba(var(--primary-color-rgb),0.4),0_4px_20px_rgba(var(--primary-color-rgb),0.35)]",
  "bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-hover)]",
  "transition-[transform,box-shadow] duration-150",
  "before:pointer-events-none before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/[0.15] before:to-transparent",
  "hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_rgba(var(--primary-color-rgb),0.5),0_8px_28px_rgba(var(--primary-color-rgb),0.45)]",
  "active:scale-[0.99] active:translate-y-0 active:shadow-[0_2px_8px_rgba(var(--primary-color-rgb),0.25)]",
  "disabled:cursor-not-allowed disabled:opacity-65 disabled:hover:translate-y-0",
);

export const authLabelClassName =
  "mb-2 block text-[13px] font-medium text-[var(--text-body)]";

export const authCardClassName = cn(
  "overflow-hidden rounded-[20px] max-sm:rounded-[18px] border-b border-[rgba(var(--color-primary-rgb),0.06)] border-l border-[rgba(var(--color-primary-rgb),0.08)] border-r border-[rgba(var(--color-primary-rgb),0.08)] border-t border-[rgba(var(--color-primary-rgb),0.35)]",
  "bg-[linear-gradient(160deg,rgba(var(--color-primary-rgb),0.06)_0%,var(--bg-card)_42%)]",
  "shadow-[0_32px_64px_-16px_rgba(0,0,0,0.18),0_0_0_1px_rgba(var(--color-primary-rgb),0.06),0_0_60px_rgba(var(--color-primary-rgb),0.05)]",
  "backdrop-blur-[10px] dark:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.45),0_0_0_1px_rgba(var(--color-primary-rgb),0.08),0_0_60px_rgba(var(--color-primary-rgb),0.06)]",
);

export const authCardInnerClassName = "px-9 py-9 max-md:px-5 max-md:py-5";

export const authCardTitleClassName =
  "mb-1.5 text-center text-[1.35rem] font-extrabold tracking-[-0.02em] text-[var(--text-heading)]";

export const authCardSubtitleClassName =
  "m-0 text-center text-sm leading-[1.45] text-[var(--text-muted)]";

export const authSignInTextClassName =
  "block text-center text-sm text-[var(--text-muted)]";

export const authSignInLinkClassName =
  "ml-1 font-semibold text-[var(--color-primary)] no-underline hover:underline hover:text-[var(--color-primary-hover)]";

export const authForgotLinkClassName =
  "text-[13px] font-medium text-[var(--color-primary)] no-underline hover:underline hover:text-[var(--color-primary-hover)]";

export const authBackLinkClassName =
  "inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-primary)] no-underline hover:underline hover:text-[var(--color-primary-hover)]";

export const authFormErrorBoxClassName = cn(
  "rounded-lg border px-3.5 py-2.5 text-sm text-[var(--destructive)]",
  "border-[color-mix(in_srgb,var(--destructive)_22%,transparent)]",
  "bg-[color-mix(in_srgb,var(--destructive)_10%,transparent)]",
);
