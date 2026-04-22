import { PAGE_SHELL_CLASS } from "@/components/page-shell";
import {
  AppStepIcon,
  type AppStepIconName,
} from "./home-icons";
import { SectionHeader } from "./section-header";

export type ApplicationStepsHeader = {
  kicker: string;
  title: string;
  description: string;
};

export type ApplicationStepItem = {
  number: string;
  title: string;
  description: string;
  icon: AppStepIconName;
};

export type ApplicationStepsSectionProps = {
  header: ApplicationStepsHeader;
  steps: readonly ApplicationStepItem[];
  sectionId?: string;
  ariaLabel?: string;
  kickerLeading?: "pulse" | "bolt";
};

export function ApplicationStepsSection({
  header,
  steps,
  sectionId = "how-it-works",
  ariaLabel = "How it works",
  kickerLeading = "bolt",
}: ApplicationStepsSectionProps) {
  return (
    <section
      id={sectionId}
      className="relative w-full overflow-hidden py-20 md:py-28"
      aria-label={ariaLabel}
    >
      <div className={`relative z-[1] ${PAGE_SHELL_CLASS}`}>
        <SectionHeader
          kicker={header.kicker}
          title={header.title}
          description={header.description}
          kickerLeading={kickerLeading}
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8 lg:gap-10">
          {steps.map((app) => (
            <article
              key={app.number}
              className="flex h-full flex-col rounded-2xl border border-[var(--border-color-light)] bg-[var(--background-color)] p-6 shadow-[var(--shadow-light)] transition-shadow hover:shadow-[var(--shadow-medium)] dark:border-white/[0.08] md:p-8"
            >
              <div className="mb-5 flex items-center justify-between gap-3">
                <span className="inline-flex items-center rounded-full border border-[rgba(var(--primary-color-rgb),0.22)] bg-[rgba(var(--primary-color-rgb),0.08)] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--primary-color)] dark:border-[rgba(var(--accent-violet-rgb),0.35)] dark:bg-[rgba(var(--primary-color-rgb),0.12)] dark:text-[var(--accent-violet)]">
                  Step {app.number}
                </span>
              </div>

              <div className="mb-5 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[var(--border-color-light)] bg-[var(--surface-2)] text-[var(--primary-color)] dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-[var(--accent-violet)]">
                <AppStepIcon name={app.icon} className="h-6 w-6" />
              </div>

              <h3 className="mb-3 text-lg font-bold tracking-[-0.02em] text-[var(--text-heading)] md:text-xl">
                {app.title}
              </h3>
              <p className="text-[clamp(0.95rem,1.5vw,1.05rem)] leading-relaxed text-[var(--text-secondary)]">
                {app.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
