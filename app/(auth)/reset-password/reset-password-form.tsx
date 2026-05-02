"use client";

import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { AlertTriangle, ArrowLeft, CheckCircle, Lock } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import {
  authBackLinkClassName,
  authCardClassName,
  authCardHeaderClassName,
  authCardHeaderLineClassName,
  authCardInnerClassName,
  authCardSubtitleClassName,
  authCardTitleClassName,
  authFormErrorBoxClassName,
  authLabelClassName,
  authPasswordStrengthBlockClassName,
  authStateIconErrorClassName,
  authStateIconSuccessClassName,
  authStateIconWrapErrorClassName,
  authStateIconWrapSuccessClassName,
  authStateStackClassName,
  authSubmitButtonClassName,
  authTitleFlushClassName,
} from "@/app/(auth)/auth-tokens";
import { AuthPasswordField } from "@/app/(auth)/components/AuthPasswordField";
import PasswordStrengthBar from "@/app/(auth)/components/PasswordStrengthBar";
import { resetPasswordSchema, type ResetPasswordFormValues } from "@/lib/auth/auth-schemas";
import { authApi, parseApiError } from "@/lib/api";
import { cn } from "@/lib/ui/cn";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1.5 text-[14px] text-[var(--error-color)]">{message}</p>;
}

export function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [success, setSuccess] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (!success) return;
    const timer = setTimeout(() => router.push("/login"), 3000);
    return () => clearTimeout(timer);
  }, [success, router]);

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: ResetPasswordFormValues) => {
      if (!token) {
        throw new Error("Missing reset token");
      }
      return authApi.resetPassword(token, values.new_password);
    },
    onSuccess: () => {
      setSuccess(true);
    },
    onError: (error) => {
      setFormError(parseApiError(error));
    },
  });

  const form = useForm({
    defaultValues: {
      new_password: "",
      confirm_password: "",
    } as ResetPasswordFormValues,
    validators: { onSubmit: resetPasswordSchema },
    onSubmit: ({ value }) => {
      setFormError(null);
      mutate(value);
    },
  });

  if (!token) {
    return (
      <div className={authCardClassName}>
        <div className={authCardInnerClassName}>
          <div className={authStateStackClassName}>
            <div className={authStateIconWrapErrorClassName}>
              <AlertTriangle className={authStateIconErrorClassName} size={26} aria-hidden />
            </div>
            <h2 className={cn(authCardTitleClassName, authTitleFlushClassName)}>
              Invalid reset link
            </h2>
            <p className={authCardSubtitleClassName}>
              This password reset link is missing or invalid. Please request a new one.
            </p>
            <Link href="/forgot-password" className={authBackLinkClassName}>
              Request a new link
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className={authCardClassName}>
        <div className={authCardInnerClassName}>
          <div className={authStateStackClassName}>
            <div className={authStateIconWrapSuccessClassName}>
              <CheckCircle className={authStateIconSuccessClassName} size={26} aria-hidden />
            </div>
            <h2 className={cn(authCardTitleClassName, authTitleFlushClassName)}>
              Password updated
            </h2>
            <p className={authCardSubtitleClassName}>
              Your password has been reset successfully. You&apos;ll be redirected to sign in
              shortly.
            </p>
            <Link href="/login" className={authBackLinkClassName}>
              <ArrowLeft size={14} />
              Sign in
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={authCardClassName}>
      <div className={authCardInnerClassName}>
        <div className={authCardHeaderClassName}>
          <div className={authCardHeaderLineClassName} />
          <h2 className={authCardTitleClassName}>Set new password</h2>
          <p className={authCardSubtitleClassName}>Choose a strong password for your account.</p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            void form.handleSubmit();
          }}
          className="flex flex-col gap-4"
        >
          {formError ? (
            <div className={authFormErrorBoxClassName} role="alert">
              {formError}
            </div>
          ) : null}
          <form.Field name="new_password">
            {(field) => (
              <div className={authPasswordStrengthBlockClassName}>
                <label htmlFor="reset-new" className={authLabelClassName}>
                  New Password
                </label>
                <AuthPasswordField
                  id="reset-new"
                  autoComplete="new-password"
                  placeholder="••••••••"
                  icon={<Lock className="h-4 w-4" strokeWidth={2} aria-hidden />}
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                />
                <PasswordStrengthBar password={field.state.value ?? ""} />
                <FieldError message={field.state.meta.errors[0]?.message} />
              </div>
            )}
          </form.Field>

          <form.Field name="confirm_password">
            {(field) => (
              <div>
                <label htmlFor="reset-confirm" className={authLabelClassName}>
                  Confirm Password
                </label>
                <AuthPasswordField
                  id="reset-confirm"
                  autoComplete="new-password"
                  placeholder="••••••••"
                  icon={<Lock className="h-4 w-4" strokeWidth={2} aria-hidden />}
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                />
                <FieldError message={field.state.meta.errors[0]?.message} />
              </div>
            )}
          </form.Field>

          <button type="submit" disabled={isPending} className={authSubmitButtonClassName}>
            {isPending ? "Resetting…" : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
