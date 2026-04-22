import {
  INTERVIEW_HERO,
  INTERVIEW_HERO_TRUST_ITEMS,
} from "@/app/interview/content";
import { getHomeProductScreenshot } from "@/app/home-content";
import { SolutionHeroSection } from "@/components/solution/solution-hero-section";

export function InterviewHeroSection() {
  return (
    <SolutionHeroSection
      hero={INTERVIEW_HERO}
      trustItems={INTERVIEW_HERO_TRUST_ITEMS}
      screenshot={getHomeProductScreenshot("interviews")}
    />
  );
}
