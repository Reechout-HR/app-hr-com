"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AlertTriangle,
  Building2,
  CheckCircle2,
  LogIn,
  UserPlus,
} from "lucide-react";
import { toast } from "sonner";

import { authApi, orgsApi, parseApiError } from "@/lib/api";
import { useAuthStore } from "@/lib/store/auth.store";

import {
  authCardClassName,
  authCardEyebrowClassName,
  authCardHeaderClassName,
  authCardHeaderLineClassName,
  authCardInnerClassName,
  authCardSubtitleClassName,
  authCardTitleClassName,
  authSubmitButtonClassName,
} from "@/app/(auth)/auth-tokens";
import AuthFooter from "@/app/(auth)/components/AuthFooter";
import AuthLeftPanel from "@/app/(auth)/components/AuthLeftPanel";
import {
  AuthFooterSlot,
  AuthFormStack,
  AuthMobileLogoRow,
  AuthPageRoot,
  AuthRightColumn,
  AuthRightMain,
} from "@/app/(auth)/components/auth-page-layout";
import { AuthWordmark } from "@/app/(auth)/components/AuthWordmark";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/ui/cn";

export function AcceptInvitePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token") ?? "";
  const isReady = useAuthStore((s) => s.isReady);
  const me = useAuthStore((s) => s.user);
  const setUser = useAuthStore((s) => s.setUser);
  const queryClient = useQueryClient();

  const previewQuery = useQuery({
    queryKey: ["invitation", token],
    queryFn: () => orgsApi.previewInvitation(token),
    enabled: Boolean(token),
    retry: false,
  });

  const acceptMutation = useMutation({
    mutationFn: () => orgsApi.acceptInvitation(token),
    onSuccess: async (res) => {
      if (res.data?.status === "joined") {
        toast.success("Welcome aboard", {
          description: `You're now part of ${res.data.org_name ?? "the organization"}.`,
        });
        // refresh the profile so the dashboard sees the new role + org
        try {
          const refreshed = await authApi.getMe();
          if (refreshed.data) setUser(refreshed.data);
        } catch {
          /* non-fatal */
        }
        queryClient.invalidateQueries({ queryKey: ["org"] });
        queryClient.invalidateQueries({ queryKey: ["interviews"] });
        queryClient.invalidateQueries({ queryKey: ["questionnaires"] });
        router.replace("/interviews");
      } else {
        // signup_required
        router.replace(`/invitations/signup?token=${encodeURIComponent(token)}`);
      }
    },
    onError: (error) =>
      toast.error("Couldn't accept invitation", {
        description: parseApiError(error),
      }),
  });

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

  if (previewQuery.isLoading || !isReady) {
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
  const signedIn = Boolean(me);
  const emailMatches =
    signedIn && me!.email.toLowerCase() === preview.email.toLowerCase();

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
              Join {preview.org_name ?? "this organization"}
            </h2>
            <p className={authCardSubtitleClassName}>
              You&apos;ve been invited as a{" "}
              <span className="font-semibold capitalize text-[var(--text-heading)]">
                {preview.role}
              </span>
              . Accept to join your team on ReechOut.
            </p>
            <p className="mt-3 text-[13px] text-[var(--text-muted)]">
              Invitation for{" "}
              <span className="font-medium text-[var(--text-body)]">
                {preview.email}
              </span>
            </p>
          </header>

          {signedIn && !emailMatches && (
            <div className="mb-5 rounded-[10px] border border-[color-mix(in_srgb,var(--warning-color,#faad14)_30%,transparent)] bg-[color-mix(in_srgb,var(--warning-color,#faad14)_10%,transparent)] px-4 py-3 text-[13px] leading-[1.5] text-[var(--text-body)]">
              You&apos;re currently signed in as{" "}
              <span className="font-semibold">{me!.email}</span>. This
              invitation was sent to{" "}
              <span className="font-semibold">{preview.email}</span>. Sign out
              and sign in with the invited email, or accept by creating a new
              account.
            </div>
          )}

          <div className="flex flex-col gap-3">
            {signedIn && emailMatches ? (
              <button
                type="button"
                onClick={() => acceptMutation.mutate()}
                disabled={acceptMutation.isPending}
                className={authSubmitButtonClassName}
              >
                {acceptMutation.isPending ? (
                  "Joining…"
                ) : (
                  <span className="inline-flex items-center justify-center gap-2">
                    <CheckCircle2 className="h-4 w-4" />
                    Join {preview.org_name ?? "organization"}
                  </span>
                )}
              </button>
            ) : (
              <>
                <Link
                  href={`/invitations/signup?token=${encodeURIComponent(token)}`}
                  className={cn(
                    authSubmitButtonClassName,
                    "inline-flex items-center justify-center gap-2 no-underline",
                  )}
                >
                  <UserPlus className="h-4 w-4" />
                  Create an account
                </Link>
                <Button
                  asChild
                  variant="outline"
                  className="h-[46px] rounded-[10px] text-[15px] font-semibold"
                >
                  <Link
                    href={`/login?invite_token=${encodeURIComponent(token)}`}
                  >
                    <LogIn className="mr-2 h-4 w-4" />
                    I already have an account
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
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
