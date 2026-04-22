import type { MarketingCta } from "@/app/home-content";
import { SITE_BASE_URL } from "@/lib/site/marketing-site";
import type { SolutionHeroModel } from "@/components/solution/solution-page-model";

export const REPORTS_PAGE_PATH = "/reports";

export const REPORTS_METADATA = {
  title: "AI Candidate Reports - Comprehensive Interview Analytics | ReechOut",
  description:
    "Get comprehensive AI-powered candidate reports with transcripts, scores, summaries, and analytics. Make faster, data-driven hiring decisions with detailed candidate assessments.",
  keywords:
    "candidate reports, interview reports, interview analytics, candidate assessment, interview transcripts, candidate scoring, recruitment analytics, hiring reports",
  author: "ReechOut",
  robots: "index, follow",
  language: "English",
} as const;

export const REPORTS_HERO = {
  badge: "AI Candidate Reports",
  titleLine1: "Know Everything About Every Candidate",
  titleHighlight: "Instantly",
  description:
    "AI-powered reports that do the analysis for you. Full transcripts, competency scores, red flags, and hiring recommendations delivered seconds after the interview ends.",
  stats: [
    { value: "100%", label: "Complete" },
    { value: "AI", label: "Insights" },
    { value: "Instant", label: "Delivery" },
  ] as const,
  ctaLabel: "Book a Demo",
  ctaHref: "/contact",
} as const satisfies SolutionHeroModel;

export const REPORTS_FEATURES_HEADER = {
  kicker: "Why Candidate Reports?",
  title: "Everything You Need for Comprehensive Candidate Assessment",
  description:
    "Get detailed insights into every candidate with AI-powered reports that include scores, transcripts, and analytics.",
} as const;

export const REPORTS_FEATURES = [
  {
    title: "Every Word, Every Pause, Every Insight",
    description:
      "Timestamped transcripts let you jump to any moment. Catch what matters, verify responses, and share exact quotes with your team. Export in any format you need.",
    icon: "file-text" as const,
  },
  {
    title: "Skip to the Bottom Line",
    description:
      "Our AI reads between the lines so you don't have to. Get instant scores on technical ability, communication, culture fit, and more. Plus executive summaries that highlight what you actually need to know.",
    icon: "robot" as const,
  },
  {
    title: "Collaborate Without the Copy-Paste Nightmare",
    description:
      "One-click export to PDF, CSV, or JSON. Share reports with hiring managers instantly. Integrate with your ATS. No more email chains with scattered feedback.",
    icon: "team" as const,
  },
] as const;

export const REPORTS_APPLICATION_HEADER = {
  kicker: "How It Works",
  title: "Three Simple Steps to Get Candidate Reports",
  description:
    "Receive comprehensive candidate reports automatically after each interview.",
} as const;

export const REPORTS_APPLICATION_STEPS = [
  {
    number: "01",
    title: "AI Candidate Completes Interview",
    description:
      "Candidates complete phone interviews using our AI-powered system. Interviews are automatically recorded and analyzed in real-time.",
    icon: "phone" as const,
  },
  {
    number: "02",
    title: "AI Analyzes & Scores",
    description:
      "Our AI automatically analyzes responses, generates scores across multiple dimensions, creates summaries, and extracts key candidate information.",
    icon: "robot" as const,
  },
  {
    number: "03",
    title: "Compare Apples to Apples",
    description:
      "Side-by-side candidate comparisons with standardized scoring. Filter by competencies, sort by fit, and identify your top candidates in seconds, not hours of spreadsheet gymnastics.",
    icon: "file-pdf" as const,
  },
] as const;

export const REPORTS_BENEFITS_HEADER = {
  kicker: "Benefits",
  title: "Why Choose Comprehensive Candidate Reports?",
  description:
    "Make faster, more informed hiring decisions with AI-powered candidate reports that provide everything you need.",
} as const;

export const REPORTS_BENEFIT_ITEMS = [
  {
    title: "Save Time on Review",
    description:
      "Get comprehensive insights in minutes instead of spending hours reviewing interviews manually. AI-powered summaries highlight key information instantly.",
  },
  {
    title: "Data-Driven Decisions",
    description:
      "Make objective hiring decisions based on comprehensive scores, transcripts, and analytics. Reduce bias and improve hiring quality with consistent evaluation criteria.",
  },
  {
    title: "Complete Candidate Picture",
    description:
      "Access everything you need in one place: transcripts, scores, summaries, and candidate details. No need to piece together information from multiple sources.",
  },
  {
    title: "Easy Sharing & Integration",
    description:
      "Export reports in multiple formats and share with your team instantly. Integrate with your ATS for seamless workflow and better collaboration.",
  },
] as const;

export const REPORTS_BENEFIT_VISUAL_STATS = [
  { value: "100%", label: "Complete" },
  { value: "Instant", label: "Delivery" },
] as const;

export const REPORTS_CTA: MarketingCta = {
  heading: "Start Getting Comprehensive Candidate Reports Today",
  description:
    "Join hundreds of companies using AI-powered candidate reports to make faster, data-driven hiring decisions. Book a demo to see it in action.",
  primaryLabel: "Book a Demo",
  primaryHref: "/contact",
};

export const reportsCanonical = `${SITE_BASE_URL}${REPORTS_PAGE_PATH}`;
