"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export type HelpTopic = "jobDescription" | "topPerformers" | "commonFailureModes";

interface HelpDialogProps {
  topic: HelpTopic | null;
  onClose: () => void;
}

const CONTENT: Record<
  HelpTopic,
  {
    title: string;
    intro: string;
    goodLabel: string;
    good: React.ReactNode;
    badLabel: string;
    bad: React.ReactNode;
    tipsLabel: string;
    tips: React.ReactNode;
    footer?: React.ReactNode;
  }
> = {
  jobDescription: {
    title: "How to Write a Job Description",
    intro: "A clear Job Description helps our AI generate relevant questions.",
    goodLabel: "✅ Good Example",
    good: (
      <p>
        &quot;Senior Backend Engineer to design scalable APIs using Node.js and PostgreSQL.
        Experience with AWS Lambda and Docker is required. Must have 5+ years in distributed
        systems.&quot;
      </p>
    ),
    badLabel: "❌ Bad Example",
    bad: <p>&quot;Looking for a developer who knows coding. Good pay.&quot;</p>,
    tipsLabel: "Key Elements to Include",
    tips: (
      <ul className="list-disc space-y-1 pl-5">
        <li>
          <strong>Role Title &amp; Level:</strong> (e.g., Senior, Junior, Lead)
        </li>
        <li>
          <strong>Tech Stack:</strong> (e.g., React, Python, AWS)
        </li>
        <li>
          <strong>Core Responsibilities:</strong> (e.g., &quot;Build APIs&quot;, &quot;Manage Database&quot;)
        </li>
      </ul>
    ),
  },
  topPerformers: {
    title: "Describing Success Patterns",
    intro:
      "Think of 3–5 real top performers in this role. Describe specific behaviors they exhibit, not abstract traits.",
    goodLabel: "✅ Good Examples",
    good: (
      <ul className="list-disc space-y-1 pl-5">
        <li>
          &quot;They always follow up with customers without being reminded.&quot; →{" "}
          <strong>Reliability &amp; Ownership</strong>
        </li>
        <li>
          &quot;They stay calm with angry callers.&quot; →{" "}
          <strong>Resilience Under Stress + Empathy</strong>
        </li>
        <li>
          &quot;They learn new tools quickly when we change systems.&quot; →{" "}
          <strong>Learning &amp; Adaptability</strong>
        </li>
        <li>
          &quot;They proactively share knowledge with teammates.&quot; →{" "}
          <strong>Communication &amp; Clarity</strong>
        </li>
      </ul>
    ),
    badLabel: "❌ Bad Examples",
    bad: (
      <ul className="list-disc space-y-1 pl-5">
        <li>&quot;They are good at their job.&quot;</li>
        <li>&quot;They have good communication skills.&quot;</li>
        <li>&quot;They are reliable.&quot;</li>
      </ul>
    ),
    tipsLabel: "Key Tips",
    tips: (
      <ul className="list-disc space-y-1 pl-5">
        <li>
          <strong>Be Specific:</strong> Describe actions, not traits
        </li>
        <li>
          <strong>Use Real Examples:</strong> Think of actual people and what they do
        </li>
        <li>
          <strong>Focus on Behaviors:</strong> What do they do differently?
        </li>
        <li>
          <strong>Multiple Examples:</strong> 3–5 examples help identify patterns
        </li>
      </ul>
    ),
  },
  commonFailureModes: {
    title: "Describing Failure Patterns",
    intro:
      "When people fail in this role, what usually goes wrong? Describe specific failure patterns, not just \"they weren't good enough.\"",
    goodLabel: "✅ Good Examples",
    good: (
      <ul className="list-disc space-y-1 pl-5">
        <li>
          &quot;They ghost shifts without notice.&quot; → <strong>Low Reliability</strong>
        </li>
        <li>
          &quot;They get flustered with angry customers.&quot; → <strong>Low Resilience</strong>
        </li>
        <li>
          &quot;They resist new tools and processes.&quot; →{" "}
          <strong>Low Learning &amp; Adaptability</strong>
        </li>
        <li>
          &quot;They don&apos;t ask for help when stuck.&quot; → <strong>Low Communication</strong>
        </li>
        <li>
          &quot;They blame others when things go wrong.&quot; → <strong>Low Ownership</strong>
        </li>
      </ul>
    ),
    badLabel: "❌ Bad Examples",
    bad: (
      <ul className="list-disc space-y-1 pl-5">
        <li>&quot;They weren&apos;t a good fit.&quot;</li>
        <li>&quot;They lacked skills.&quot;</li>
        <li>&quot;They didn&apos;t work well with others.&quot;</li>
      </ul>
    ),
    tipsLabel: "Key Tips",
    tips: (
      <ul className="list-disc space-y-1 pl-5">
        <li>
          <strong>Be Specific:</strong> What exactly went wrong?
        </li>
        <li>
          <strong>Pattern Recognition:</strong> What do multiple failures have in common?
        </li>
        <li>
          <strong>Behavioral Focus:</strong> Describe what they did (or didn&apos;t do)
        </li>
        <li>
          <strong>Risk Areas:</strong> These help identify what to emphasize in questions
        </li>
      </ul>
    ),
    footer: (
      <p className="italic text-[var(--text-secondary)]">
        💡 Tip: These failure patterns help us identify which competencies to emphasize in the
        questionnaire and show managers later: &quot;This candidate seems strong where your failing
        hires were weak.&quot;
      </p>
    ),
  },
};

export function HelpDialog({ topic, onClose }: HelpDialogProps) {
  const open = topic != null;
  const data = topic ? CONTENT[topic] : null;

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-[560px] w-[95vw] max-h-[85vh] overflow-y-auto p-0 rounded-[var(--radius-md)] border-[var(--header-floating-border)] bg-[var(--header-floating-bg)] shadow-[0_24px_48px_rgba(var(--shadow-rgb),0.12)] backdrop-blur-xl">
        {data ? (
          <>
            <DialogHeader className="border-b border-[var(--header-floating-border)] bg-transparent px-6 py-5 text-left">
              <DialogTitle className="text-lg font-semibold text-foreground">
                {data.title}
              </DialogTitle>
              <DialogDescription className="text-sm text-[var(--text-secondary)] mt-1">
                {data.intro}
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-6 p-6 text-sm text-foreground">
              <section className="space-y-2">
                <h4 className="text-sm font-semibold text-[var(--success-color)]">
                  {data.goodLabel}
                </h4>
                <div className="rounded-xl border border-[var(--success-color)]/25 bg-[var(--success-color)]/5 p-4 leading-relaxed">
                  {data.good}
                </div>
              </section>

              <section className="space-y-2">
                <h4 className="text-sm font-semibold text-[var(--error-color)]">{data.badLabel}</h4>
                <div className="rounded-xl border border-[var(--error-color)]/25 bg-[var(--error-color)]/5 p-4 leading-relaxed">
                  {data.bad}
                </div>
              </section>

              <section className="space-y-2">
                <h4 className="text-sm font-semibold text-foreground">{data.tipsLabel}</h4>
                <div className="rounded-xl border border-[var(--header-floating-border)] bg-[var(--surface-2)] p-4 leading-relaxed text-[var(--text-secondary)]">
                  {data.tips}
                </div>
              </section>

              {data.footer && (
                <div className="rounded-xl border border-[var(--header-floating-border)] bg-[var(--surface-2)] p-4 text-sm leading-relaxed">
                  {data.footer}
                </div>
              )}
            </div>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
