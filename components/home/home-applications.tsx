import { HOME_APPLICATION_STEPS } from "@/app/home-content";
import { ApplicationStepsSection } from "./application-steps-section";

export function HomeApplicationsSection() {
  return (
    <ApplicationStepsSection
      header={{
        kicker: "How it works",
        title: "From applicants to shortlist in minutes",
        description: "Invite, interview, and shortlist on real signal",
      }}
      steps={HOME_APPLICATION_STEPS}
    />
  );
}
