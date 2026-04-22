import { SITE_BASE_URL } from "@/lib/site/marketing-site";

export const PRIVACY_POLICY_PAGE_PATH = "/privacy-policy";

export const privacyPolicyCanonical = `${SITE_BASE_URL}${PRIVACY_POLICY_PAGE_PATH}`;

export const PRIVACY_POLICY_METADATA = {
  title: "Privacy Policy | ReechOut - AI Phone Interview Automation",
  description:
    "Read ReechOut's Privacy Policy to understand how we collect, use, and protect your personal information and data.",
  keywords:
    "ReechOut, privacy policy, data protection, GDPR, user privacy, data security, personal information, privacy rights",
  author: "ReechOut",
  robots: "index, follow",
  language: "English",
} as const;
