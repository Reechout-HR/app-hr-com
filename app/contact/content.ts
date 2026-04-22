import { SITE_BASE_URL, REECHOUT_CONNECT_URL } from "@/lib/site/marketing-site";

export const CONTACT_PAGE_PATH = "/contact";

export const contactCanonical = `${SITE_BASE_URL}${CONTACT_PAGE_PATH}`;

export const CONTACT_SUPPORT_EMAIL = "support@reechout.com";

export const CONTACT_METADATA = {
  title: "Contact Us | ReechOut - Book a Demo",
  description:
    "Get in touch with ReechOut. Book a demo to see how our AI-powered phone interview platform can transform your hiring.",
  keywords:
    "ReechOut, contact, book a demo, AI phone interviews, hiring automation, HR tech, recruitment",
  author: "ReechOut",
  robots: "index, follow",
  language: "English",
} as const;

export const CONTACT_HERO = {
  badge: "Get in touch",
  titleBeforeHighlight: "Let’s talk about your",
  titleHighlight: "hiring",
  subtitle:
    "Book a walkthrough with our team or send a message—we typically respond within one business day.",
} as const;

export const CONTACT_FORM = {
  title: "Book a demo",
  subtitle: "Tell us a bit about yourself and we’ll get back to you shortly.",
  submitLabel: "Book a demo",
  submittingLabel: "Sending…",
  successTitle: "Thank you",
  successDescription: "Our team will reach out to you soon.",
} as const;

export const CONTACT_SIDEBAR = {
  directHeading: "Prefer to reach out directly?",
  directDescription:
    "Use the details below or pick a time on our calendar—we’re happy to help.",
  supportHoursHeading: "Support hours",
  supportHoursDescription:
    "Monday – Friday. We aim to reply to all inquiries within one business day.",
} as const;

export type ContactCardIcon = "mail" | "calendar" | "clock";

export type ContactCard = {
  icon: ContactCardIcon;
  title: string;
  value: string;
  description: string;
  href?: string;
};

export const CONTACT_CARDS: ContactCard[] = [
  {
    icon: "mail",
    title: "Email us",
    value: CONTACT_SUPPORT_EMAIL,
    description: "Drop us a line anytime",
    href: `mailto:${CONTACT_SUPPORT_EMAIL}`,
  },
  {
    icon: "calendar",
    title: "Schedule a call",
    value: "Pick a time that works",
    description: "30-minute intro or product walkthrough",
    href: REECHOUT_CONNECT_URL,
  },
  {
    icon: "clock",
    title: "Response time",
    value: "Within 1 business day",
    description: "For demo requests and general questions",
  },
];

export const CONTACT_TRUST_ITEMS = [
  { icon: "zap" as const, text: "Reply within one business day" },
  { icon: "shield" as const, text: "GDPR-ready hiring data" },
  { icon: "headphones" as const, text: "Dedicated onboarding support" },
  { icon: "users" as const, text: "Built for growing teams" },
] as const;
