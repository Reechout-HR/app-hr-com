import { Suspense } from "react";

import { authSuspenseFallbackClassName } from "@/app/(auth)/auth-tokens";
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

import { ResetPasswordForm } from "./reset-password-form";

export default function ResetPasswordPage() {
  return (
    <AuthPageRoot>
      <AuthLeftPanel />

      <AuthRightColumn>
        <AuthRightMain>
          <AuthFormStack>
            <AuthMobileLogoRow>
              <AuthWordmark href="/" />
            </AuthMobileLogoRow>

            <Suspense
              fallback={
                <div className={authSuspenseFallbackClassName}>
                  <div
                    className="h-8 w-8 animate-spin rounded-full border-[3px] border-[var(--border)] border-t-[var(--primary-color)]"
                    aria-hidden
                  />
                </div>
              }
            >
              <ResetPasswordForm />
            </Suspense>
          </AuthFormStack>
        </AuthRightMain>

        <AuthFooterSlot>
          <AuthFooter />
        </AuthFooterSlot>
      </AuthRightColumn>
    </AuthPageRoot>
  );
}
