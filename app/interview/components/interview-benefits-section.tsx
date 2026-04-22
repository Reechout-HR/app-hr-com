import {
  INTERVIEW_BENEFIT_ITEMS,
  INTERVIEW_BENEFIT_VISUAL_STATS,
  INTERVIEW_BENEFITS_HEADER,
} from "@/app/interview/content";
import { SolutionBenefitsSection } from "@/components/solution/solution-benefits-section";

export function InterviewBenefitsSection() {
  return (
    <SolutionBenefitsSection
      header={INTERVIEW_BENEFITS_HEADER}
      items={INTERVIEW_BENEFIT_ITEMS}
      visualStats={INTERVIEW_BENEFIT_VISUAL_STATS}
    />
  );
}
