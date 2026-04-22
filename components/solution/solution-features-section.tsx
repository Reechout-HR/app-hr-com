import type { SolutionFeatureIconName } from "@/components/home/home-icons";
import { PAGE_SHELL_CLASS } from "@/components/page-shell";
import { SolutionFeatureIcon } from "@/components/home/home-icons";
import { SectionHeader } from "@/components/home/section-header";

export type SolutionFeaturesHeader = {
  kicker: string;
  title: string;
  description: string;
};

export type SolutionFeatureItem = {
  title: string;
  description: string;
  icon: SolutionFeatureIconName;
};

export type SolutionFeaturesSectionProps = {
  header: SolutionFeaturesHeader;
  features: readonly SolutionFeatureItem[];
  ariaLabel?: string;
};

export function SolutionFeaturesSection({
  header,
  features,
  ariaLabel = "Features",
}: SolutionFeaturesSectionProps) {
  return (
    <section
      className="relative w-full overflow-hidden py-20 md:py-28"
      aria-label={ariaLabel}
    >
      <div className={`relative z-[1] ${PAGE_SHELL_CLASS}`}>
        <SectionHeader
          kicker={header.kicker}
          title={header.title}
          description={header.description}
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-10">
          {features.map((f) => (
            <article
              key={f.title}
              className="flex h-full flex-col rounded-2xl border border-[var(--border-color-light)] bg-[var(--background-color)] p-6 shadow-[var(--shadow-light)] transition-shadow hover:shadow-[var(--shadow-medium)] dark:border-white/[0.08] md:p-8"
            >
              <div className="mb-5 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[rgba(var(--primary-color-rgb),0.22)] bg-[rgba(var(--primary-color-rgb),0.08)] text-[var(--primary-color)] dark:border-[rgba(var(--accent-violet-rgb),0.35)] dark:bg-[rgba(var(--primary-color-rgb),0.12)] dark:text-[var(--accent-violet)]">
                <SolutionFeatureIcon name={f.icon} className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-lg font-bold tracking-[-0.02em] text-[var(--text-heading)] md:text-xl">
                {f.title}
              </h3>
              <p className="text-[clamp(0.95rem,1.5vw,1.05rem)] leading-relaxed text-[var(--text-secondary)]">
                {f.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
