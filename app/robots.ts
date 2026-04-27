import type { MetadataRoute } from "next";

import { SITE_BASE_URL } from "@/lib/site/marketing-site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/login",
        "/signup",
        "/register",
        "/forgot-password",
        "/reset-password",
        "/verify-email",
        "/company-setup",
        "/pending-approval",
        "/interviews",
        "/questionnaires",
        "/interview/create",
        "/interview/screening",
        "/interview/share",
      ],
    },
    sitemap: `${SITE_BASE_URL}/sitemap.xml`,
  };
}
