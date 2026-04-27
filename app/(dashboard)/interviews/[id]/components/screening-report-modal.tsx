"use client";

import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import {
  CheckCircle,
  FileText,
  HelpCircle,
  Star,
  XCircle,
} from "lucide-react";

import { interviewsApi, type InterviewCandidate } from "@/lib/api/interviews";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {
  FloatingCloseButton,
  GLASS_CARD_CLASS,
  GlassCardHeader,
  ProfileCard,
  ReportNavCategory,
  ReportNavItem,
  getScoreColor,
} from "./report-modal-shared";

interface ScreeningReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidate: InterviewCandidate | null;
}

type SectionKey = "scores" | "evaluation" | "answers";

export function ScreeningReportModal({
  isOpen,
  onClose,
  candidate,
}: ScreeningReportModalProps) {
  const {
    data: report,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["candidate-report", candidate?.id],
    queryFn: () => interviewsApi.getCandidateReport(candidate!.id!),
    enabled: isOpen && !!candidate?.id,
  });

  const [activeSection, setActiveSection] = useState<SectionKey>("scores");
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const sections: SectionKey[] = ["scores", "evaluation", "answers"];
    let currentActive: SectionKey = "scores";
    for (const section of sections) {
      const el = document.getElementById(`scr-${section}`);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 300) currentActive = section;
      }
    }
    setActiveSection(currentActive);
  };

  const scrollToSection = (id: SectionKey) => {
    const el = document.getElementById(`scr-${id}`);
    const container = scrollRef.current;
    if (el && container) {
      const containerRect = container.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      const scrollTop =
        elRect.top - containerRect.top + container.scrollTop - 20;
      container.scrollTo({ top: scrollTop, behavior: "smooth" });
      setActiveSection(id);
    }
  };

  if (!candidate) return null;

  const candidateInitials = `${candidate.first_name?.[0] || ""}${
    candidate.last_name?.[0] || ""
  }`.toUpperCase();
  const fullName = `${candidate.first_name ?? ""} ${candidate.last_name ?? ""}`.trim();

  const formatScoreParts = (
    score: string | number | null | undefined,
  ): { value: string; unit: string } => {
    if (score === null || score === undefined || score === "") {
      return { value: "—", unit: "" };
    }
    const num = typeof score === "string" ? parseFloat(score) : score;
    if (Number.isNaN(num)) return { value: "—", unit: "" };
    return { value: String(num), unit: "%" };
  };

  const hasAnswers =
    report?.screening_answers &&
    Object.keys(report.screening_answers).length > 0;
  const isPassed =
    report?.screening_passed ?? candidate.status === "screening_passed";
  const screeningScore = formatScoreParts(report?.screening_score);
  const scoreColor = getScoreColor(report?.screening_score);

  const PassIcon = isPassed ? CheckCircle : XCircle;
  const passColor = isPassed
    ? "var(--success-color)"
    : "var(--error-color)";
  const passColorRgb = isPassed
    ? "var(--success-color-rgb)"
    : "var(--error-color-rgb)";

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="max-w-[1400px] w-[95vw] h-[85vh] p-0 overflow-hidden border-0 bg-[var(--gray-bg)] shadow-[var(--shadow-medium)] rounded-[var(--radius-lg)] flex flex-col"
      >
        <VisuallyHidden>
          <DialogTitle>Screening Report — {fullName}</DialogTitle>
        </VisuallyHidden>

        <div className="relative flex h-full w-full overflow-hidden">
          <FloatingCloseButton onClick={onClose} />

          {/* Sidebar */}
          <aside className="glass-sidebar-overlay glass-scrollbar-thin relative w-[280px] shrink-0 overflow-y-auto bg-[var(--glass-bg-light)] backdrop-blur-[20px] backdrop-saturate-[180%] border-r border-[var(--glass-border-light)] flex flex-col">
            <ProfileCard
              initials={candidateInitials}
              name={fullName || candidate.email}
              email={candidate.email}
            />

            <nav className="relative z-[1] p-6 flex-1">
              <ReportNavCategory title="General">
                <ReportNavItem
                  icon={Star}
                  label="Score"
                  isActive={activeSection === "scores"}
                  onClick={() => scrollToSection("scores")}
                />
                {report?.screening_evaluation && (
                  <ReportNavItem
                    icon={FileText}
                    label="Evaluation"
                    isActive={activeSection === "evaluation"}
                    onClick={() => scrollToSection("evaluation")}
                  />
                )}
              </ReportNavCategory>

              {hasAnswers && (
                <ReportNavCategory title="Details">
                  <ReportNavItem
                    icon={HelpCircle}
                    label="Answers"
                    isActive={activeSection === "answers"}
                    onClick={() => scrollToSection("answers")}
                  />
                </ReportNavCategory>
              )}
            </nav>
          </aside>

          {/* Content panel */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="glass-scrollbar flex-1 overflow-y-auto bg-[var(--gray-bg)] px-12 py-10 relative"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[var(--primary-color)] opacity-[0.03] rounded-full blur-[120px]"
            />

            {isLoading ? (
              <div className="min-h-[50vh]" aria-hidden />
            ) : isError || !report ? (
              <div className="flex flex-col items-center justify-center h-full gap-3 text-[var(--text-secondary)]">
                <FileText className="h-12 w-12 opacity-50" />
                <p>Unable to load the screening report.</p>
              </div>
            ) : (
              <div className="relative z-[1] mx-auto flex max-w-[940px] flex-col gap-10 pb-12">
                {/* Score */}
                <section id="scr-scores" className={GLASS_CARD_CLASS}>
                  <GlassCardHeader
                    icon={PassIcon}
                    title="Screening Score"
                    subtitle={
                      isPassed
                        ? "Candidate passed the screening stage."
                        : "Candidate did not pass the screening stage."
                    }
                  />

                  <div
                    className="relative z-[1] rounded-xl p-8 flex items-center gap-8"
                    style={{
                      background: `linear-gradient(135deg, rgba(${passColorRgb},0.15) 0%, rgba(${passColorRgb},0.08) 100%)`,
                      border: `1px solid rgba(${passColorRgb},0.2)`,
                    }}
                  >
                    <div className="relative flex h-20 w-20 shrink-0 items-center justify-center">
                      <div
                        aria-hidden
                        className="absolute inset-0 rounded-full animate-[pulse-glow_2s_ease-in-out_infinite]"
                        style={{
                          background: `radial-gradient(circle, rgba(${passColorRgb},0.3) 0%, transparent 70%)`,
                        }}
                      />
                      <PassIcon
                        className="relative z-[1] h-10 w-10 fill-current"
                        style={{
                          color: passColor,
                          filter: `drop-shadow(0 4px 8px rgba(${passColorRgb},0.3))`,
                        }}
                      />
                    </div>
                    <div className="flex flex-col">
                      <div className="text-xs font-bold uppercase tracking-[1.5px] text-[var(--text-secondary)] mb-1">
                        Screening Score
                      </div>
                      <div
                        className="font-extrabold leading-none tracking-[-2px] text-[56px]"
                        style={{ color: scoreColor }}
                      >
                        {screeningScore.value}
                        <span className="text-3xl font-bold opacity-80 ml-1">
                          {screeningScore.unit}
                        </span>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Evaluation */}
                {report.screening_evaluation && (
                  <section id="scr-evaluation" className={GLASS_CARD_CLASS}>
                    <GlassCardHeader
                      icon={FileText}
                      title="Evaluation"
                      subtitle="AI-generated screening summary."
                    />
                    <div className="relative z-[1] rounded-xl bg-[var(--glass-bg-medium)] backdrop-blur-[15px] border-2 border-[var(--glass-border-medium)] p-7">
                      <p className="text-[15px] leading-[1.8] text-[var(--text-primary)] m-0 whitespace-pre-wrap">
                        {report.screening_evaluation}
                      </p>
                    </div>
                  </section>
                )}

                {/* Answers */}
                {hasAnswers && (
                  <section id="scr-answers" className={GLASS_CARD_CLASS}>
                    <GlassCardHeader
                      icon={HelpCircle}
                      title="Screening Questions"
                      subtitle="Candidate responses to screening questions."
                    />

                    <div className="relative z-[1] flex flex-col gap-5">
                      {Object.entries(report.screening_answers!).map(
                        ([id, qa], idx) => (
                          <div
                            key={id}
                            className="rounded-xl p-7 bg-[var(--glass-bg-medium)] backdrop-blur-[15px] border border-[var(--glass-border-medium)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_16px_var(--glass-shadow-medium)]"
                          >
                            <div className="mb-5 flex items-start gap-4">
                              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[rgba(var(--primary-color-rgb),0.15)] to-[rgba(var(--primary-color-rgb),0.08)] text-xl font-extrabold text-[var(--text-accent-color)]">
                                {idx + 1}
                              </div>
                              <div className="flex-1 min-w-0 pt-2">
                                <h4 className="text-[17px] font-semibold leading-[1.6] text-[var(--text-primary)] m-0">
                                  {qa.question_text}
                                </h4>
                              </div>
                            </div>

                            <div className="flex flex-col gap-2">
                              <span className="text-[11px] font-bold uppercase tracking-[1px] text-[var(--text-secondary)]">
                                Response
                              </span>
                              <div className="rounded-lg border border-[var(--glass-border-light)] border-l-4 border-l-[var(--primary-color)] bg-[var(--glass-bg-light)] backdrop-blur-[10px] p-4 text-[15px] leading-[1.7] text-[var(--text-primary)] whitespace-pre-wrap">
                                {qa.answer}
                              </div>
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  </section>
                )}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
