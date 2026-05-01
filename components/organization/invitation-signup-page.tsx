"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AlertTriangle, Building2, Lock, Mail, User } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Controller, useForm, useWatch } from "react-hook-form";
import { useState } from "react";

import {
  authCardClassName,
  authCardEyebrowClassName,
  authCardHeaderClassName,
  authCardHeaderLineClassName,
  authCardInnerClassName,
  authCardSubtitleClassName,
  authCardTitleClassName,
  authCheckboxRowClassName,
  authFormErrorBoxClassName,
  authLabelClassName,
  authPasswordStrengthBlockClassName,
  authSignInLinkClassName,
  authSignInTextClassName,
  authSubmitButtonClassName,
} from "@/app/(auth)/auth-tokens";
import AuthFooter from "@/app/(auth)/components/AuthFooter";
import { AuthInputField } from "@/app/(auth)/components/AuthInputField";
import AuthLeftPanel from "@/app/(auth)/components/AuthLeftPanel";
import {
  AuthFooterSlot,
  AuthFormStack,
  AuthMobileLogoRow,
  AuthPageRoot,
  AuthRightColumn,
  AuthRightMain,
} from "@/app/(auth)/components/auth-page-layout";
import { AuthPasswordField } from "@/app/(auth)/components/AuthPasswordField";
import { AuthWordmark } from "@/app/(auth)/components/AuthWordmark";
import PasswordStrengthBar from "@/app/(auth)/components/PasswordStrengthBar";
import { Button } from "@/components/ui/button";
import { orgsApi, parseApiError, parseFieldErrors } from "@/lib/api";
import {
  invitationSignupSchema,
  type InvitationSignupFormValues,
} from "@/lib/auth/auth-schemas";
import { useAuthStore } from "@/lib/store/auth.store";
import { cn } from "@/lib/ui/cn";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="mt-1.5 text-[14px] text-[var(--error-color)]">{message}</p>
  );
}

export function InvitationSignupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const setSession = useAuthStore((s) => s.setSession);
  const [formError, setFormError] = useState<string | null>(null);

  const previewQuery = useQuery({
    queryKey: ["invitation", token],
    queryFn: () => orgsApi.previewInvitation(token),
    enabled: Boolean(token),
    retry: false,
  });

  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<InvitationSignupFormValues>({
    resolver: zodResolver(invitationSignupSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      password: "",
      confirm_password: "",
      terms: false,
    },
  });

  const password =
    useWatch({ control, name: "password", defaultValue: "" }) ?? "";

  const { mutate, isPending } = useMutation({
    mutationFn: (values: InvitationSignupFormValues) =>
      orgsApi.signupFromInvitation({
        token,
        first_name: values.first_name,
        last_name: values.last_name,
        password: values.password,
      }),
    onSuccess: (response) => {
      const user = response.data?.user;
      if (user) {
        setSession(user);
        router.replace("/verify-email");
      } else {
        router.replace("/login");
      }
    },
    onError: (error) => {
      const fieldErrors = parseFieldErrors(error);
      for (const [key, msg] of Object.entries(fieldErrors)) {
        if (key === "password") setError("password", { message: msg });
        if (key === "first_name") setError("first_name", { message: msg });
        if (key === "last_name") setError("last_name", { message: msg });
      }
      if (!Object.keys(fieldErrors).length) {
        setFormError(parseApiError(error));
      }
    },
  });

  const onSubmit = (values: InvitationSignupFormValues) => {
    setFormError(null);
    mutate(values);
  };

  if (!token) {
    return (
      <Shell>
        <ErrorCard
          title="Invitation link incomplete"
          body="The link is missing a token. Ask the person who invited you to send it again."
        />
      </Shell>
    );
  }

  if (previewQuery.isLoading) {
    return null;
  }

  if (previewQuery.isError || !previewQuery.data?.data) {
    return (
      <Shell>
        <ErrorCard
          title="We couldn't find this invitation"
          body={
            parseApiError(previewQuery.error) ||
            "The invitation may have expired or been revoked. Ask for a new one."
          }
        />
      </Shell>
    );
  }

  const preview = previewQuery.data.data;

  return (
    <Shell>
      <div className={authCardClassName}>
        <div className={authCardInnerClassName}>
          <div className="mb-6 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-[color-mix(in_srgb,var(--foreground)_8%,transparent)] bg-[color-mix(in_srgb,var(--foreground)_4%,transparent)] text-[var(--text-muted)]">
              {preview.logo_signed_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={preview.logo_signed_url}
                  alt={preview.org_name ?? "Organization logo"}
                  className="h-full w-full object-cover"
                />
              ) : (
                <Building2 className="h-7 w-7" />
              )}
            </div>
          </div>

          <header className={authCardHeaderClassName}>
            <div className={authCardHeaderLineClassName} />
            <p className={authCardEyebrowClassName}>Invitation</p>
            <h2 className={authCardTitleClassName}>
              Join {preview.org_name ?? "your team"}
            </h2>
            <p className={authCardSubtitleClassName}>
              Finish creating your account to get started. Your role will be{" "}
              <span className="font-semibold capitalize text-[var(--text-heading)]">
                {preview.role}
              </span>
              .
            </p>
          </header>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            {formError ? (
              <div className={authFormErrorBoxClassName} role="alert">
                {formError}
              </div>
            ) : null}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="invite-first-name"
                  className={authLabelClassName}
                >
                  First Name
                </label>
                <AuthInputField
                  id="invite-first-name"
                  autoComplete="given-name"
                  placeholder="Jane"
                  icon={<User className="h-4 w-4" strokeWidth={2} aria-hidden />}
                  {...register("first_name")}
                />
                <FieldError message={errors.first_name?.message} />
              </div>

              <div>
                <label
                  htmlFor="invite-last-name"
                  className={authLabelClassName}
                >
                  Last Name
                </label>
                <AuthInputField
                  id="invite-last-name"
                  autoComplete="family-name"
                  placeholder="Doe"
                  icon={<User className="h-4 w-4" strokeWidth={2} aria-hidden />}
                  {...register("last_name")}
                />
                <FieldError message={errors.last_name?.message} />
              </div>
            </div>

            <div>
              <label htmlFor="invite-email" className={authLabelClassName}>
                Email
              </label>
              <AuthInputField
                id="invite-email"
                type="email"
                value={preview.email}
                readOnly
                icon={<Mail className="h-4 w-4" strokeWidth={2} aria-hidden />}
                inputClassName="cursor-not-allowed opacity-80 focus:-translate-y-0 focus:shadow-none"
              />
              <p className="mt-1.5 text-[12px] text-[var(--text-muted)]">
                This invitation is tied to this email address.
              </p>
            </div>

            <div className={authPasswordStrengthBlockClassName}>
              <label htmlFor="invite-password" className={authLabelClassName}>
                Password
              </label>
              <AuthPasswordField
                id="invite-password"
                autoComplete="new-password"
                placeholder="••••••••"
                icon={<Lock className="h-4 w-4" strokeWidth={2} aria-hidden />}
                {...register("password")}
              />
              <PasswordStrengthBar password={password} />
              <FieldError message={errors.password?.message} />
            </div>

            <div>
              <label htmlFor="invite-confirm" className={authLabelClassName}>
                Confirm Password
              </label>
              <AuthPasswordField
                id="invite-confirm"
                autoComplete="new-password"
                placeholder="••••••••"
                icon={<Lock className="h-4 w-4" strokeWidth={2} aria-hidden />}
                {...register("confirm_password")}
              />
              <FieldError message={errors.confirm_password?.message} />
            </div>

            <div className={authCheckboxRowClassName}>
              <Controller
                name="terms"
                control={control}
                render={({ field }) => (
                  <input
                    id="invite-terms"
                    type="checkbox"
                    className="mt-0.5 h-4 w-4 shrink-0 rounded border border-[var(--border-color)] accent-[var(--primary-color)]"
                    checked={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    ref={field.ref}
                  />
                )}
              />
              <div>
                <label
                  htmlFor="invite-terms"
                  className={cn(
                    authLabelClassName,
                    "mb-0 cursor-pointer font-normal",
                  )}
                >
                  I agree to the{" "}
                  <Link
                    href="/terms-of-service"
                    className={authSignInLinkClassName}
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy-policy"
                    className={authSignInLinkClassName}
                  >
                    Privacy Policy
                  </Link>
                </label>
                <FieldError message={errors.terms?.message} />
              </div>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className={authSubmitButtonClassName}
            >
              {isPending ? "Creating account…" : "Create account & join"}
            </button>
          </form>
        </div>
      </div>

      <p className={authSignInTextClassName}>
        Already have an account?{" "}
        <Link
          href={`/login?invite_token=${encodeURIComponent(token)}`}
          className={authSignInLinkClassName}
        >
          Sign in
        </Link>
      </p>
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <AuthPageRoot>
      <AuthLeftPanel />

      <AuthRightColumn>
        <AuthRightMain>
          <AuthFormStack>
            <AuthMobileLogoRow>
              <AuthWordmark href="/" />
            </AuthMobileLogoRow>

            {children}
          </AuthFormStack>
        </AuthRightMain>

        <AuthFooterSlot>
          <AuthFooter />
        </AuthFooterSlot>
      </AuthRightColumn>
    </AuthPageRoot>
  );
}

function ErrorCard({ title, body }: { title: string; body: string }) {
  return (
    <div className={authCardClassName}>
      <div className={authCardInnerClassName}>
        <div className="mb-6 flex justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--destructive)_25%,transparent)] bg-[color-mix(in_srgb,var(--destructive)_10%,transparent)]">
            <AlertTriangle className="h-7 w-7 text-[var(--destructive)]" />
          </div>
        </div>

        <header className={authCardHeaderClassName}>
          <div className={authCardHeaderLineClassName} />
          <h2 className={authCardTitleClassName}>{title}</h2>
          <p className={authCardSubtitleClassName}>{body}</p>
        </header>

        <div className="mt-2">
          <Button
            asChild
            variant="outline"
            className="h-[46px] w-full rounded-[10px] text-[15px] font-semibold"
          >
            <Link href="/">Go to homepage</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
