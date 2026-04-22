import type { Metadata } from "next";

import { ApplicationStepsSection } from "@/components/home/application-steps-section";
import { HomeCtaSection } from "@/components/home/home-cta-section";
import {
  HomePageMotionSection,
  HomePageNavMotion,
} from "@/components/home-page-motion";
import {
  InterviewBenefitsSection,
  InterviewFeaturesSection,
  InterviewHeroSection,
} from "@/app/interview/components";
import { PageAmbientBackground } from "@/components/page-ambient-background";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import {
  INTERVIEW_APPLICATION_HEADER,
  INTERVIEW_APPLICATION_STEPS,
  INTERVIEW_CTA,
  INTERVIEW_METADATA,
  INTERVIEW_OG_IMAGE,
  INTERVIEW_PAGE_PATH,
  SITE_BASE_URL,
} from "@/app/interview/content";

const interviewCanonical = `${SITE_BASE_URL}${INTERVIEW_PAGE_PATH}`;

export const metadata: Metadata = {
  title: INTERVIEW_METADATA.title,
  description: INTERVIEW_METADATA.description,
  keywords: INTERVIEW_METADATA.keywords,
  authors: [{ name: INTERVIEW_METADATA.author }],
  robots: INTERVIEW_METADATA.robots,
  alternates: {
    canonical: interviewCanonical,
  },
  openGraph: {
    title: INTERVIEW_METADATA.title,
    description: INTERVIEW_METADATA.description,
    type: "website",
    url: interviewCanonical,
    locale: "en_US",
    images: [
      {
        url: INTERVIEW_OG_IMAGE,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: INTERVIEW_METADATA.title,
    description: INTERVIEW_METADATA.description,
    images: [INTERVIEW_OG_IMAGE],
  },
  other: {
    language: INTERVIEW_METADATA.language,
  },
};

export default function InterviewPage() {
  return (
    <div className="relative bg-gradient-to-b from-[var(--hero-bg-tint)] via-[var(--primary-lighter)] to-[var(--background-color)] dark:from-[#0a0612] dark:via-[#120a18] dark:to-[var(--background-color)]">
      <PageAmbientBackground />
      <div className="relative z-[1] flex min-h-screen flex-col text-[var(--text-primary)]">
        <HomePageNavMotion>
          <SiteNav mode="scroll" />
        </HomePageNavMotion>
        <main className="flex flex-1 flex-col">
          <HomePageMotionSection index={0}>
            <InterviewHeroSection />
          </HomePageMotionSection>
          <HomePageMotionSection index={1}>
            <InterviewFeaturesSection />
          </HomePageMotionSection>
          <HomePageMotionSection index={2}>
            <ApplicationStepsSection
              header={INTERVIEW_APPLICATION_HEADER}
              steps={INTERVIEW_APPLICATION_STEPS}
              sectionId="interview-how-it-works"
              ariaLabel="How it works"
            />
          </HomePageMotionSection>
          <HomePageMotionSection index={3}>
            <InterviewBenefitsSection />
          </HomePageMotionSection>
          <HomePageMotionSection index={4}>
            <HomeCtaSection cta={INTERVIEW_CTA} />
          </HomePageMotionSection>
        </main>
        <HomePageMotionSection index={5}>
          <SiteFooter />
        </HomePageMotionSection>
      </div>
    </div>
  );
}
