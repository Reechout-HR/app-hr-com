import { SITE_BASE_URL } from "@/lib/site/marketing-site";

export const TERMS_OF_SERVICE_PAGE_PATH = "/terms-of-service";

export const termsOfServiceCanonical = `${SITE_BASE_URL}${TERMS_OF_SERVICE_PAGE_PATH}`;

export const TERMS_OF_SERVICE_METADATA = {
  title: "Terms of Service | ReechOut - AI Phone Interview Automation",
  description:
    "Read ReechOut's Terms of Service governing access and use of our AI phone interview automation platform.",
  keywords:
    "ReechOut, terms of service, user agreement, terms and conditions, legal, SaaS terms",
  author: "ReechOut",
  robots: "index, follow",
  language: "English",
} as const;
