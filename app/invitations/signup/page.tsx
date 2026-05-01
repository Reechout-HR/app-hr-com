import { Suspense } from "react";

import { InvitationSignupPage } from "@/components/organization/invitation-signup-page";

export const metadata = {
  title: "Accept invitation",
  robots: { index: false, follow: false },
};

export default function InvitationSignupRoute() {
  return (
    <Suspense fallback={null}>
      <InvitationSignupPage />
    </Suspense>
  );
}
