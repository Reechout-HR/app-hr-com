import type { MarketingCta } from "@/app/home-content";
import type { SolutionHeroModel } from "@/components/solution/solution-page-model";
import {
  DEFAULT_SOLUTION_TRUST_ITEMS,
  MARKETING_OG_IMAGE,
  SITE_BASE_URL,
} from "@/lib/site/marketing-site";

export { SITE_BASE_URL };

export const INTERVIEW_PAGE_PATH = "/interview";

export const INTERVIEW_OG_IMAGE = MARKETING_OG_IMAGE;

export const INTERVIEW_METADATA = {
  title:
    "AI Interviews - Phone & Web Voice Agent | Automated Candidate Screening | ReechOut",
  description:
    "Automate interviews with AI-powered technology. Conduct phone interviews or web-based voice agent interviews 24/7, screen candidates efficiently, and get detailed reports. Save time and scale your hiring process.",
  keywords:
    "AI phone interviews, automated interviews, phone interview automation, voice agent interviews, candidate screening, interview automation, recruitment software, automated candidate screening",
  author: "ReechOut",
  robots: "index, follow",
  language: "English",
} as const;

export const INTERVIEW_HERO = {
  badge: "AI-Powered Voice Intelligence",
  titleLine1: "Screen 100 Candidates in the Time It Takes",
  titleLine2Prefix: "to ",
  titleHighlight: "Interview One",
  description:
    "Automated AI voice interviews that work 24/7 via phone or web. Natural conversations, intelligent follow-ups, instant insights. So you only spend time with candidates who truly fit.",
  stats: [
    { value: "24/7", label: "Available" },
    { value: "10x", label: "Faster" },
    { value: "96%", label: "Satisfaction" },
  ] as const,
  ctaLabel: "Book a Demo",
  ctaHref: "/contact",
} as const satisfies SolutionHeroModel;

/** @deprecated Use DEFAULT_SOLUTION_TRUST_ITEMS from `@/lib/site/marketing-site`. */
export const INTERVIEW_HERO_TRUST_ITEMS = DEFAULT_SOLUTION_TRUST_ITEMS;

export const INTERVIEW_FEATURES_HEADER = {
  kicker: "The Complete Voice Interview Platform",
  title: "Everything You Need for Automated Voice Screening",
  description:
    "From candidate engagement to detailed analytics, our enterprise-grade platform streamlines every aspect of voice-based screening. Choose phone or web-based interviews based on your workflow.",
} as const;

export const INTERVIEW_FEATURES = [
  {
    title: "Never Miss a Great Candidate",
    description:
      "Interview candidates instantly, any time zone, any schedule. No more back-and-forth emails or lost candidates to faster competitors. Reduce time-to-hire by 70%.",
    icon: "clock" as const,
  },
  {
    title: "Conversations That Feel Human, Intelligence That's Better",
    description:
      "Our AI doesn't just ask questions. It listens, adapts, and digs deeper when it matters. Candidates get an engaging experience. You get the truth behind the resume.",
    icon: "volume" as const,
  },
  {
    title: "Know Who to Hire Before the First Handshake",
    description:
      "Every interview delivers structured scores, complete transcripts, and competency assessments. Compare candidates objectively and make confident decisions fast.",
    icon: "file-pdf" as const,
  },
] as const;

export const INTERVIEW_APPLICATION_STEPS = [
  {
    number: "01",
    title: "Deploy at Scale",
    description:
      "Invite candidates via email or SMS with personalized links for web-based interviews or dedicated phone numbers. Candidates can begin immediately, with no downloads or registration required.",
    icon: "phone" as const,
  },
  {
    number: "02",
    title: "Intelligent Conversations",
    description:
      "Our AI interviewer conducts structured conversations via phone or web, asking customized questions, actively listening, and adapting based on responses. Every interaction is recorded and analyzed in real-time.",
    icon: "robot" as const,
  },
  {
    number: "03",
    title: "Data-Driven Decisions",
    description:
      "Access comprehensive candidate profiles with competency scores, response summaries, sentiment analysis, and complete transcripts. Filter and rank candidates based on objective criteria to accelerate your hiring pipeline.",
    icon: "file-pdf" as const,
  },
] as const;

export const INTERVIEW_BENEFITS_HEADER = {
  kicker: "Benefits",
  title: "Why Leading Companies Choose ReechOut",
  description:
    "Reduce hiring costs, accelerate time-to-hire, and improve candidate quality with AI-powered voice interviews that scale with your business.",
} as const;

export const INTERVIEW_BENEFIT_ITEMS = [
  {
    title: "Get Your Hiring Team's Time Back",
    description:
      "Automate initial screening for unlimited candidates simultaneously. Your team focuses on final-round interviews while AI handles the groundwork, conducting 50+ interviews in the time it takes for one traditional phone screen.",
  },
  {
    title: "Fair Hiring, Every Single Time",
    description:
      "Every candidate experiences identical interview conditions with consistent questioning and objective evaluation criteria. Reduce unconscious bias and ensure fair, compliant hiring practices.",
  },
  {
    title: "Scale Without the Growing Pains",
    description:
      "Whether you're hiring 10 or 10,000 candidates, the system performs flawlessly. Handle seasonal hiring surges, rapid growth phases, or ongoing recruitment without additional resources.",
  },
  {
    title: "Multi-Channel Flexibility",
    description:
      "Offer candidates choice with both phone and web-based interviews. Web interviews provide privacy-first screening without requiring phone numbers, ideal for international candidates and sensitive roles.",
  },
] as const;

export const INTERVIEW_BENEFIT_VISUAL_STATS = [
  { value: "50+", label: "Interviews/Day" },
  { value: "24/7", label: "Availability" },
] as const;

export const INTERVIEW_APPLICATION_HEADER = {
  kicker: "How It Works",
  title: "From Invitation to Insight in Three Steps",
  description:
    "Deploy automated voice interviews in minutes with our streamlined workflow designed for high-volume hiring.",
} as const;

/** Angular CTA: single primary to contact; no secondary link. */
export const INTERVIEW_CTA: MarketingCta = {
  heading: "Ready to Transform Your Hiring Process?",
  description:
    "Join innovative companies using AI voice interviews to screen faster, hire better, and scale effortlessly. See ReechOut in action with a personalized demo.",
  primaryLabel: "See It in Action",
  primaryHref: "/contact",
};
