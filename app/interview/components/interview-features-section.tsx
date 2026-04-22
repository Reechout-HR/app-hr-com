import {
  INTERVIEW_FEATURES,
  INTERVIEW_FEATURES_HEADER,
} from "@/app/interview/content";
import { SolutionFeaturesSection } from "@/components/solution/solution-features-section";

export function InterviewFeaturesSection() {
  return (
    <SolutionFeaturesSection
      header={INTERVIEW_FEATURES_HEADER}
      features={INTERVIEW_FEATURES}
    />
  );
}
