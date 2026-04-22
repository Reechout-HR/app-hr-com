import { PAGE_SHELL_CLASS } from "@/components/page-shell";
import { IconCheckCircle, IconDashboard } from "@/components/home/home-icons";
import { SectionHeader } from "@/components/home/section-header";

export type SolutionBenefitsHeader = {
  kicker: string;
  title: string;
  description: string;
};

export type SolutionBenefitItem = {
  title: string;
  description: string;
};

export type SolutionBenefitsSectionProps = {
  header: SolutionBenefitsHeader;
  items: readonly SolutionBenefitItem[];
  visualStats: readonly { value: string; label: string }[];
  ariaLabel?: string;
};

export function SolutionBenefitsSection({
  header,
  items,
  visualStats,
  ariaLabel = "Benefits",
}: SolutionBenefitsSectionProps) {
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

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex min-w-0 flex-col gap-8 md:gap-10">
            {items.map((item) => (
              <div key={item.title} className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[rgba(var(--primary-color-rgb),0.1)] text-[var(--primary-color)] dark:bg-[rgba(var(--primary-color-rgb),0.15)] dark:text-[var(--accent-violet)]">
                  <IconCheckCircle className="h-5 w-5" aria-hidden />
                </div>
                <div className="min-w-0">
                  <h3 className="mb-2 text-lg font-bold tracking-[-0.02em] text-[var(--text-heading)] md:text-xl">
                    {item.title}
                  </h3>
                  <p className="text-[clamp(0.95rem,1.5vw,1.05rem)] leading-relaxed text-[var(--text-secondary)]">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md rounded-[28px] border border-[var(--border-color-light)] bg-[var(--surface-2)] p-8 shadow-[var(--shadow-medium)] dark:border-white/[0.09] dark:bg-[rgba(12,10,20,0.85)] md:p-10">
              <div className="mb-8 flex justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[rgba(var(--primary-color-rgb),0.12)] text-[var(--primary-color)] dark:bg-[rgba(var(--primary-color-rgb),0.18)] dark:text-[var(--accent-violet)]">
                  <IconDashboard className="h-10 w-10" aria-hidden />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {visualStats.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-2xl border border-[var(--border-color-light)] bg-[var(--background-color)] px-4 py-5 text-center dark:border-white/[0.08]"
                  >
                    <div className="text-2xl font-extrabold tabular-nums text-[var(--primary-color)] md:text-[1.75rem]">
                      {s.value}
                    </div>
                    <div className="mt-1 text-xs font-medium text-[var(--text-secondary)] md:text-sm">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
