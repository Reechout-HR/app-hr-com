import { HOME_APPLICATION_STEPS } from "@/app/home-content";
import { ApplicationStepsSection } from "./application-steps-section";

export function HomeApplicationsSection() {
  return (
    <ApplicationStepsSection
      header={{
        kicker: "How It Works",
        title: "From Polished Resumes to Real Capability",
        description:
          "Set up automated interviews in minutes and start screening candidates at scale",
      }}
      steps={HOME_APPLICATION_STEPS}
    />
  );
}
