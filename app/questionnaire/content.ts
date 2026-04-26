import type { MarketingCta } from "@/app/home-content";
import { SITE_BASE_URL } from "@/lib/site/marketing-site";
import type { SolutionHeroModel } from "@/components/solution/solution-page-model";

export const QUESTIONNAIRE_PAGE_PATH = "/questionnaire";

export const QUESTIONNAIRE_METADATA = {
  title:
    "Questionnaire builder - Structured, role-specific interview questions | ReechOut",
  description:
    "Build structured, role-specific interviews in minutes. Evaluate real capability with questions that go beyond generic screening—fast setup, full control, consistent evaluation.",
  keywords:
    "questionnaire builder, interview questions, role-specific screening, hiring signal, candidate evaluation, structured interviews, recruitment, interview design",
  author: "ReechOut",
  robots: "index, follow",
  language: "English",
} as const;

export const QUESTIONNAIRE_HERO = {
  badge: "AI Questionnaire Builder",
  titleLine1: "Create interviews that actually reveal",
  titleLine2Prefix: " ",
  titleHighlight: "who can do the job",
  titleLine2Suffix: "",
  description:
    "Generate structured, role-specific questions in minutes so you can evaluate real capability, not rehearsed answers.",
  stats: [
    { value: "∞", label: "Unlimited questions" },
    { value: "5 min", label: "setup" },
    { value: "", label: "Fully customizable" },
  ] as const,
  ctaLabel: "Start Free Trial",
  ctaHref: "/signup",
} as const satisfies SolutionHeroModel;

export const QUESTIONNAIRE_FEATURES_HEADER = {
  kicker: "Why Questionnaire Builder?",
  title: "Build better interviews from the start",
  description:
    "Most interviews fail because the questions are weak or generic. ReechOut helps you create structured interviews that surface how candidates think, communicate, and approach real problems.",
} as const;

export const QUESTIONNAIRE_FEATURES = [
  {
    title: "From role to interview in minutes",
    description:
      "Add a job description or describe the role. Generate a complete interview instantly. Edit or use it as-is.",
    icon: "thunderbolt" as const,
  },
  {
    title: "Ask what actually matters",
    description:
      "Get role-specific questions designed to uncover real skills, thinking, and decision-making. No generic or repetitive questions.",
    icon: "robot" as const,
  },
  {
    title: "Customize everything",
    description:
      "Edit, reorder, or remove any question. Reuse and adapt interviews across roles. Build your own library over time.",
    icon: "edit" as const,
  },
] as const;

export const QUESTIONNAIRE_APPLICATION_HEADER = {
  kicker: "How It Works",
  title: "Three simple steps",
  description: "From a role to a live interview, without the busywork",
} as const;

export const QUESTIONNAIRE_APPLICATION_STEPS = [
  {
    number: "01",
    title: "Create interview",
    description: "Add role details or paste a job description",
    icon: "file-add" as const,
  },
  {
    number: "02",
    title: "Generate questions",
    description: "Structured questions are created automatically",
    icon: "robot" as const,
  },
  {
    number: "03",
    title: "Review and launch",
    description: "Edit if needed and start interviewing candidates",
    icon: "check-circle" as const,
  },
] as const;

export const QUESTIONNAIRE_BENEFITS_HEADER = {
  kicker: "Benefits",
  title: "Why teams use it",
  description: "Build faster, evaluate fairly, and hire with clearer signal",
} as const;

export const QUESTIONNAIRE_BENEFIT_ITEMS = [
  {
    title: "Create interviews quickly",
    description: "No manual question writing or setup",
  },
  {
    title: "Keep evaluation consistent",
    description: "Same structure across every candidate",
  },
  {
    title: "Improve signal",
    description: "Questions designed to reveal real thinking",
  },
  {
    title: "Reuse and scale",
    description: "Build a library of interviews for different roles",
  },
] as const;

export const QUESTIONNAIRE_BENEFIT_VISUAL_STATS = [
  { value: "∞", label: "Unlimited questions" },
  { value: "Fast", label: "setup" },
] as const;

export const QUESTIONNAIRE_CTA: MarketingCta = {
  heading: "Create your first interview in minutes",
  description:
    "Start with a role and generate a structured interview instantly. No setup complexity, no templates to manage.",
  primaryLabel: "Start Free Trial",
  primaryHref: "/signup",
};

export const questionnaireCanonical = `${SITE_BASE_URL}${QUESTIONNAIRE_PAGE_PATH}`;
