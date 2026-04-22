import { SITE_BASE_URL } from "@/lib/site/marketing-site";

export const SECURITY_PAGE_PATH = "/security";

export const securityPageCanonical = `${SITE_BASE_URL}${SECURITY_PAGE_PATH}`;

export const SECURITY_PAGE_METADATA = {
  title: "Security | ReechOut - AI Phone Interview Automation",
  description:
    "Learn how ReechOut protects your data with encryption, access controls, infrastructure security, and compliance practices.",
  keywords:
    "ReechOut, security, data encryption, SOC 2, GDPR, compliance, infrastructure security",
  author: "ReechOut",
  robots: "index, follow",
  language: "English",
} as const;
