import type { MarketingCta } from "@/app/home-content";
import { SITE_BASE_URL } from "@/lib/site/marketing-site";
import type { SolutionHeroModel } from "@/components/solution/solution-page-model";

export const REPORTS_PAGE_PATH = "/reports";

export const REPORTS_METADATA = {
  title: "Candidate reports - Structured interview insights and decisions | ReechOut",
  description:
    "Clear, structured insights after every interview. Know who to move forward with—full visibility, easy sharing, and confident hiring decisions without second-guessing.",
  keywords:
    "candidate reports, interview insights, hiring decisions, interview transcripts, structured insights, team alignment, shortlist, recruitment",
  author: "ReechOut",
  robots: "index, follow",
  language: "English",
} as const;

export const REPORTS_HERO = {
  badge: "AI Candidate Reports",
  titleLine1: "Know who to move forward with",
  titleLine2Prefix: "",
  titleHighlight: "instantly",
  titleLine2Suffix: "",
  description:
    "Clear, structured insights after every interview so you can decide quickly and confidently.",
  stats: [
    { value: "", label: "Complete profiles" },
    { value: "", label: "Structured insights" },
    { value: "", label: "Instant delivery" },
  ] as const,
  ctaLabel: "Start Free Trial",
  ctaHref: "/signup",
} as const satisfies SolutionHeroModel;

export const REPORTS_FEATURES_HEADER = {
  kicker: "Why Candidate Reports?",
  title: "Everything you need to decide",
  description:
    "Most teams finish interviews and still aren't sure who to move forward with. ReechOut gives you clear, structured insights so you can make decisions without second-guessing.",
} as const;

export const REPORTS_FEATURES = [
  {
    title: "See what actually happened in the interview",
    description:
      "Access full transcripts with timestamps. Review key responses, verify answers, and share exact moments with your team.",
    icon: "file-text" as const,
  },
  {
    title: "Get straight to the point",
    description:
      "See strengths, gaps, and overall fit at a glance. No need to read through full interviews to understand a candidate.",
    icon: "robot" as const,
  },
  {
    title: "Share decisions easily",
    description:
      "Share reports with your team in one click. Everyone sees the same structured information, no scattered notes or long discussions.",
    icon: "team" as const,
  },
] as const;

export const REPORTS_APPLICATION_HEADER = {
  kicker: "How It Works",
  title: "Three simple steps",
  description: "From interview to a clear read on who to shortlist",
} as const;

export const REPORTS_APPLICATION_STEPS = [
  {
    number: "01",
    title: "Candidate completes interview",
    description: "Candidates complete structured interviews automatically.",
    icon: "phone" as const,
  },
  {
    number: "02",
    title: "System analyzes responses",
    description: "Responses are processed and converted into structured insights.",
    icon: "robot" as const,
  },
  {
    number: "03",
    title: "Compare candidates",
    description:
      "See candidates side by side and identify who to move forward with.",
    icon: "file-pdf" as const,
  },
] as const;

export const REPORTS_BENEFITS_HEADER = {
  kicker: "Benefits",
  title: "Why teams rely on reports",
  description: "Clarity, speed, and the same view for everyone",
} as const;

export const REPORTS_BENEFIT_ITEMS = [
  {
    title: "Save time on review",
    description:
      "Get what you need in minutes instead of reviewing full interviews",
  },
  {
    title: "Make better decisions",
    description:
      "Clear structure helps you evaluate candidates consistently",
  },
  {
    title: "See the full picture",
    description: "All candidate insights in one place",
  },
  {
    title: "Align your team",
    description: "Everyone works from the same information",
  },
] as const;

export const REPORTS_BENEFIT_VISUAL_STATS = [
  { value: "Complete", label: "profiles" },
  { value: "Instant", label: "insights" },
] as const;

export const REPORTS_CTA: MarketingCta = {
  heading: "Make faster, more confident hiring decisions",
  description:
    "Stop relying on memory and scattered notes. Use structured insights to decide who to move forward with.",
  primaryLabel: "Start Free Trial",
  primaryHref: "/signup",
};

export const reportsCanonical = `${SITE_BASE_URL}${REPORTS_PAGE_PATH}`;
