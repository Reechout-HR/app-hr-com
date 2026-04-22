import type { MarketingCta } from "@/app/home-content";
import { SITE_BASE_URL } from "@/lib/site/marketing-site";

export const ABOUT_US_PAGE_PATH = "/about-us";

export const aboutUsCanonical = `${SITE_BASE_URL}${ABOUT_US_PAGE_PATH}`;

export const ABOUT_US_METADATA = {
  title: "About Us | ReechOut - AI Phone Interview Automation",
  description:
    "Learn about ReechOut, the AI-powered phone interview automation platform. Discover our mission, team, and commitment to transforming recruitment.",
  keywords:
    "ReechOut, about us, company, team, founders, AI interview automation, recruitment technology, HR tech, phone interview platform",
  author: "ReechOut",
  robots: "index, follow",
  language: "English",
} as const;

/** Same CDN assets as Angular `about-us.component`. */
export const ABOUT_US_IMAGES = {
  hero: "https://storage.googleapis.com/images.reechout.com/about-us.webp",
} as const;

/** Fake browser chrome for hero figure (home hero pattern). */
export const ABOUT_US_HERO_CHROME_LABEL = "app.reechout.com/about";

export const ABOUT_US_HERO = {
  badge: "Our Story",
  titleBeforeHighlight: "Building the Future of",
  titleHighlight: "Recruitment",
  description:
    "Two Harvard students, countless late nights at Harvard Innovation Labs, and a shared vision to revolutionize how companies find talent. This is how ReechOut was born.",
  quote:
    "Harvard Innovation Labs, 2AM. The whiteboard behind us has been erased and rewritten about 47 times. The coffee? Our fourth round. The idea? Finally starting to click.",
} as const;

export const ABOUT_US_JOURNEY_HEADER = {
  kicker: "Our Journey",
  title: "The Problem We Couldn't Ignore",
  description:
    "It started with a simple question: Why does hiring still feel like it's stuck in 2005?",
} as const;

export const ABOUT_US_JOURNEY_CARDS = [
  {
    title: "The Problem",
    body: "We watched talented friends lose opportunities because they couldn't schedule a phone screen fast enough. We saw companies miss incredible candidates because HR teams were drowning in volume. And we realized that the first interview, the one that's mostly just qualifying questions, was the biggest bottleneck.",
    icon: "rocket" as const,
  },
  {
    title: "The Solution",
    body: "So we built ReechOut. Not as a replacement for human judgment, but as a way to handle the parts that don't need it. The scheduling. The basic screening. The repetitive questions. The note-taking.",
    icon: "wrench" as const,
  },
] as const;

export const ABOUT_US_FOUNDERS_HEADER = {
  kicker: "Our Founders",
  title: "Meet the Minds Behind ReechOut",
  description:
    "Two Harvard students with a proven track record of building products that solve real problems. They've experienced the recruitment pain firsthand, and now they're revolutionizing it.",
} as const;

export const ABOUT_US_FOUNDERS = [
  {
    name: "Mehmood Khosa",
    role: "Founder & Product Designer",
    image: "https://storage.googleapis.com/images.reechout.com/mehmood.webp",
    bio: "Harvard student and experienced product designer. Passionate about solving real problems through innovative solutions and building products that transform industries.",
    description:
      "Product designer focused on product details, workflows, and user experience. Experienced firsthand the inefficiencies in the recruitment process. Now dedicated to revolutionizing how companies find and screen talent through thoughtful design.",
    education: "Harvard University",
    achievements: [
      "Led product design and workflows for multiple successful products",
      "Experienced the pain points of recruitment firsthand",
      "Designs the product vision and user experience for ReechOut",
    ],
    linkedin: "https://www.linkedin.com/in/mehmoodkhosa/",
  },
  {
    name: "Hassan Ahmed",
    role: "Founder & Product Designer",
    image: "https://storage.googleapis.com/images.reechout.com/hassan.webp",
    bio: "Harvard student and product designer focused on creating solutions that make a real difference. Obsessed with building great products.",
    description:
      "Product designer specializing in product details, workflows, and user experience design. Recognized the urgent need to streamline recruitment and screening processes. Committed to creating tools that help teams hire better and faster through exceptional design.",
    education: "Harvard University",
    achievements: [
      "Designed multiple products solving real-world problems",
      "Identified inefficiencies in recruitment through firsthand experience",
      "Crafts the product details and user workflows for ReechOut",
    ],
    linkedin: "https://www.linkedin.com/in/hssnahmd/",
  },
  {
    name: "Ali Hasan",
    role: "Founder & Technical Lead",
    image: "https://storage.googleapis.com/images.reechout.com/ali_hasan.webp",
    bio: "Technical lead and software architect passionate about building cutting-edge solutions using state-of-the-art technologies.",
    description:
      "Technical lead responsible for all software development, using state-of-the-art models and handling the complete software development cycle. Builds robust, scalable systems that power ReechOut's AI-driven interview platform.",
    education: "Lahore University of Management Sciences",
    achievements: [
      "Develops and maintains the complete software development cycle",
      "Implements state-of-the-art AI models and technologies",
      "Architects and builds the technical foundation for ReechOut",
    ],
    linkedin: "https://www.linkedin.com/in/ali-hasan-49abaa19b/",
  },
] as const;

export const ABOUT_US_BELIEVE = {
  kicker: "What We Believe",
  title: "Our Principles",
  description:
    "Every candidate deserves a shot, regardless of when they can answer a phone. Every recruiter deserves to spend their time on conversations that matter, not checking boxes. And every company deserves a hiring process that scales without compromising quality.",
} as const;

export const ABOUT_US_FUTURE = {
  kicker: "Where We're Going",
  title: "Building the Most Human-Friendly AI Interviewer",
  description:
    "We're building the most human-friendly AI interviewer on the planet. One that respects candidates' time, speaks naturally, asks smart follow-ups, and gives recruiters their sanity back.",
  tagline: "Started at Harvard. Built for companies everywhere.",
} as const;

export const ABOUT_US_MISSION_HEADER = {
  kicker: "Our Principles",
  title: "Mission-Driven Innovation",
  description:
    "Everything we do is guided by our core values: Efficiency, Fairness, and Human-Centric AI.",
} as const;

export const ABOUT_US_MISSION_CARDS = [
  {
    number: "01",
    title: "Our Mission",
    body: "To make hiring accessible, efficient, and equitable by automating initial screens with AI that understands context, nuance, and potential.",
    icon: "flag" as const,
  },
  {
    number: "02",
    title: "Our Vision",
    body: "A world where every candidate gets a fair shot and every recruiter focuses on meaningful connections, not administrative tasks.",
    icon: "eye" as const,
  },
  {
    number: "03",
    title: "Our Values",
    body: "Innovation with integrity, customer obsession, diversity in hiring, and continuous improvement powered by feedback.",
    icon: "heart" as const,
  },
] as const;

export const ABOUT_US_CTA: MarketingCta = {
  heading: "Reach Out to ReechOut",
  description:
    "We're always happy to chat about hiring, AI, or why we think phone screens shouldn't feel like phone screens.",
  primaryLabel: "Book a Demo",
  primaryHref: "/contact",
};
