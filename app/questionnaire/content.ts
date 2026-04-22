import type { MarketingCta } from "@/app/home-content";
import { SITE_BASE_URL } from "@/lib/site/marketing-site";
import type { SolutionHeroModel } from "@/components/solution/solution-page-model";

export const QUESTIONNAIRE_PAGE_PATH = "/questionnaire";

export const QUESTIONNAIRE_METADATA = {
  title: "Questionnaire Builder - Create AI-Powered Surveys | ReechOut",
  description:
    "Build intelligent questionnaires with our AI-powered questionnaire builder. Create dynamic surveys, customize questions, and design engaging interview flows. Perfect for recruitment and candidate screening.",
  keywords:
    "questionnaire builder, survey builder, interview questions, custom questionnaires, AI questionnaire, recruitment questions, candidate screening questions, interview flow builder",
  author: "ReechOut",
  robots: "index, follow",
  language: "English",
} as const;

export const QUESTIONNAIRE_HERO = {
  badge: "AI Questionnaire Builder",
  titleLine1: "Create the Perfect Interview",
  titleLine2Prefix: "in ",
  titleHighlight: "60 Seconds",
  description:
    "AI-powered questionnaire builder that generates role-specific questions instantly. No templates to wrestle with. No hours of writing. Just smart screening questions that actually work.",
  stats: [
    { value: "∞", label: "Questions" },
    { value: "5min", label: "Setup" },
    { value: "100%", label: "Customizable" },
  ] as const,
  ctaLabel: "Book a Demo",
  ctaHref: "/contact",
} as const satisfies SolutionHeroModel;

export const QUESTIONNAIRE_FEATURES_HEADER = {
  kicker: "Why Questionnaire Builder?",
  title: "Everything You Need to Create Perfect Questionnaires",
  description:
    "Build intelligent questionnaires with powerful features designed to make questionnaire creation fast, easy, and effective.",
} as const;

export const QUESTIONNAIRE_FEATURES = [
  {
    title: "From Blank Page to Perfect Interview in Minutes",
    description:
      "Type in the role. Add your job description. Our AI generates intelligent, targeted questions automatically. Then customize anything you want, or use it as-is.",
    icon: "thunderbolt" as const,
  },
  {
    title: "Questions That Actually Reveal Who Can Do the Job",
    description:
      "Forget generic interview questions. Our AI creates role-specific questions based on real job requirements. Get questions that uncover skills, experience, and cultural fit.",
    icon: "robot" as const,
  },
  {
    title: "Your Questions, Your Way",
    description:
      "Add, edit, reorder, or rewrite any question. Build libraries for different roles. Clone and adapt successful questionnaires. Complete control, zero complexity.",
    icon: "edit" as const,
  },
] as const;

export const QUESTIONNAIRE_APPLICATION_HEADER = {
  kicker: "How It Works",
  title: "Three Simple Steps to Build Your Questionnaire",
  description:
    "Create professional questionnaires in minutes with our intuitive builder.",
} as const;

export const QUESTIONNAIRE_APPLICATION_STEPS = [
  {
    number: "01",
    title: "AI Create Questionnaire",
    description:
      "Start by creating a new questionnaire. Give it a name, add details and instructions, and choose your preferred template or start from scratch.",
    icon: "file-add" as const,
  },
  {
    number: "02",
    title: "AI Add Questions",
    description:
      "Add questions one by one or import from templates. Customize question text, set order, and organize questions to create the perfect flow.",
    icon: "plus-circle" as const,
  },
  {
    number: "03",
    title: "AI Launch & Use",
    description:
      "Review your questionnaire, make any final adjustments, and launch. Use it for phone interviews, candidate screening, or assessments.",
    icon: "check-circle" as const,
  },
] as const;

export const QUESTIONNAIRE_BENEFITS_HEADER = {
  kicker: "Benefits",
  title: "Why Choose Our Questionnaire Builder?",
  description:
    "Build better questionnaires faster and streamline your candidate screening process.",
} as const;

export const QUESTIONNAIRE_BENEFIT_ITEMS = [
  {
    title: "Create in Minutes, Not Hours",
    description:
      "Build professional questionnaires in minutes instead of spending hours writing and organizing questions manually. Our intuitive interface makes it effortless.",
  },
  {
    title: "Consistent Quality Across Roles",
    description:
      "Create standardized questionnaires for different roles while maintaining flexibility. Ensure every candidate gets fair, comprehensive screening.",
  },
  {
    title: "Reuse & Adapt",
    description:
      "Save time by duplicating successful questionnaires and adapting them for new roles. Build a library of templates your team can use.",
  },
  {
    title: "Candidates Actually Enjoy Answering",
    description:
      "Well-crafted questions get better responses. Our AI creates questions that feel conversational, not interrogational. Higher completion rates mean better data for you.",
  },
] as const;

export const QUESTIONNAIRE_BENEFIT_VISUAL_STATS = [
  { value: "∞", label: "Questions" },
  { value: "5min", label: "Setup Time" },
] as const;

export const QUESTIONNAIRE_CTA: MarketingCta = {
  heading: "Start Building Your Questionnaires Today",
  description:
    "Join hundreds of companies using our questionnaire builder to create effective screening questionnaires. Book a demo to see it in action.",
  primaryLabel: "Book a Demo",
  primaryHref: "/contact",
};

export const questionnaireCanonical = `${SITE_BASE_URL}${QUESTIONNAIRE_PAGE_PATH}`;
