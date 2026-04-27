"use client";

import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import {
  Calendar,
  CheckCircle,
  Code,
  DollarSign,
  AlertCircle as ExclamationCircle,
  FileText,
  Heart,
  HelpCircle,
  Lightbulb,
  MessageSquare,
  Star,
  User as UserIcon,
  Users,
  AlertTriangle as Warning,
} from "lucide-react";
import { cn } from "@/lib/ui/cn";

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
  type ReportModalIcon,
} from "./report-modal-shared";

interface AiReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidate: InterviewCandidate | null;
}

type SectionKey =
  | "scores"
  | "summary"
  | "technical"
  | "behavioral"
  | "communication"
  | "cultural_fit"
  | "questions"
  | "details";

export function AiReportModal({
  isOpen,
  onClose,
  candidate,
}: AiReportModalProps) {
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
    const sections: SectionKey[] = [
      "scores",
      "summary",
      "technical",
      "behavioral",
      "communication",
      "cultural_fit",
      "questions",
      "details",
    ];
    let currentActive: SectionKey = "scores";
    for (const section of sections) {
      const el = document.getElementById(`air-${section}`);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 300) currentActive = section;
      }
    }
    setActiveSection(currentActive);
  };

  const scrollToSection = (id: SectionKey) => {
    const el = document.getElementById(`air-${id}`);
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

  const formatDuration = (seconds: number | null | undefined) => {
    if (!seconds) return "-";
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    if (h > 0) return `${h}h ${m}m ${s}s`;
    return `${m}m ${s}s`;
  };

  const overallScore = formatScoreParts(report?.score);
  const overallColor = getScoreColor(report?.score);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="max-w-[1400px] w-[95vw] h-[85vh] p-0 overflow-hidden border-0 bg-[var(--gray-bg)] shadow-[var(--shadow-medium)] rounded-[var(--radius-lg)] flex flex-col"
      >
        <VisuallyHidden>
          <DialogTitle>AI Report — {fullName}</DialogTitle>
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
                {report?.ai_summary && (
                  <ReportNavItem
                    icon={FileText}
                    label="Summary"
                    isActive={activeSection === "summary"}
                    onClick={() => scrollToSection("summary")}
                  />
                )}
              </ReportNavCategory>

              <ReportNavCategory title="Assessment">
                <ReportNavItem
                  icon={Code}
                  label="Technical"
                  isActive={activeSection === "technical"}
                  onClick={() => scrollToSection("technical")}
                />
                <ReportNavItem
                  icon={Users}
                  label="Behavioral"
                  isActive={activeSection === "behavioral"}
                  onClick={() => scrollToSection("behavioral")}
                />
                <ReportNavItem
                  icon={MessageSquare}
                  label="Communication"
                  isActive={activeSection === "communication"}
                  onClick={() => scrollToSection("communication")}
                />
                {(report?.cultural_fit_summary ||
                  report?.cultural_fit_score) && (
                  <ReportNavItem
                    icon={Heart}
                    label="Cultural Fit"
                    isActive={activeSection === "cultural_fit"}
                    onClick={() => scrollToSection("cultural_fit")}
                  />
                )}
              </ReportNavCategory>

              <ReportNavCategory title="Details">
                {report?.question_evaluations &&
                  report.question_evaluations.length > 0 && (
                    <ReportNavItem
                      icon={HelpCircle}
                      label="Question Breakdown"
                      isActive={activeSection === "questions"}
                      onClick={() => scrollToSection("questions")}
                    />
                  )}
                <ReportNavItem
                  icon={UserIcon}
                  label="Candidate Details"
                  isActive={activeSection === "details"}
                  onClick={() => scrollToSection("details")}
                />
              </ReportNavCategory>
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
                <p>Unable to load the report. It may still be processing.</p>
              </div>
            ) : (
              <div className="relative z-[1] mx-auto flex max-w-[940px] flex-col gap-10 pb-12">
                {/* Score */}
                <section id="air-scores" className={GLASS_CARD_CLASS}>
                  <GlassCardHeader
                    icon={Star}
                    title="Overall Score"
                    subtitle="Performance assessment based on interview responses."
                  />

                  <div className="relative z-[1] mb-6 rounded-xl bg-gradient-to-br from-[rgba(var(--primary-color-rgb),0.15)] to-[rgba(var(--primary-color-rgb),0.08)] border border-[rgba(var(--primary-color-rgb),0.2)] p-8 flex items-center gap-8">
                    <div className="relative flex h-20 w-20 shrink-0 items-center justify-center">
                      <div
                        aria-hidden
                        className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(var(--primary-color-rgb),0.3)_0%,transparent_70%)] animate-[pulse-glow_2s_ease-in-out_infinite]"
                      />
                      <Star
                        className="relative z-[1] h-10 w-10 text-[var(--icon-accent-color)] fill-current"
                        style={{
                          filter: "drop-shadow(0 4px 8px rgba(var(--primary-color-rgb),0.3))",
                        }}
                      />
                    </div>
                    <div className="flex flex-col">
                      <div className="text-xs font-bold uppercase tracking-[1.5px] text-[var(--text-secondary)] mb-1">
                        Overall Score
                      </div>
                      <div
                        className="font-extrabold leading-none tracking-[-2px] text-[56px]"
                        style={{ color: overallColor }}
                      >
                        {overallScore.value}
                        <span className="text-3xl font-bold opacity-80 ml-1">
                          {overallScore.unit}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="relative z-[1] grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <SecondaryScoreCard
                      icon={Code}
                      label="Technical"
                      score={report.technical_score}
                    />
                    <SecondaryScoreCard
                      icon={Users}
                      label="Behavioral"
                      score={report.behavioral_score}
                    />
                    <SecondaryScoreCard
                      icon={MessageSquare}
                      label="Communication"
                      score={report.communication_score}
                    />
                    {(report.cultural_fit_score ||
                      report.cultural_fit_summary) && (
                      <SecondaryScoreCard
                        icon={Heart}
                        label="Cultural Fit"
                        score={report.cultural_fit_score}
                      />
                    )}
                  </div>
                </section>

                {/* Summary */}
                {report.ai_summary && (
                  <section id="air-summary" className={GLASS_CARD_CLASS}>
                    <GlassCardHeader
                      icon={FileText}
                      title="Summary"
                      subtitle="AI-generated assessment based on interview responses."
                    />

                    <div className="relative z-[1] flex flex-col gap-5">
                      {report.ai_summary.overall_assessment && (
                        <div className="rounded-xl bg-[var(--glass-bg-medium)] backdrop-blur-[15px] border-2 border-[var(--glass-border-medium)] p-7">
                          <div className="mb-4 flex items-center gap-3">
                            <FileText className="h-6 w-6 text-[var(--icon-accent-color)]" />
                            <h3 className="text-xl font-bold text-[var(--text-primary)] m-0">
                              Overall Assessment
                            </h3>
                          </div>
                          <p className="text-[15px] leading-[1.7] text-[var(--text-primary)] m-0">
                            {report.ai_summary.overall_assessment}
                          </p>
                        </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {report.ai_summary.key_strengths &&
                          report.ai_summary.key_strengths.length > 0 && (
                            <div className="rounded-xl p-6 bg-[var(--glass-bg-medium)] backdrop-blur-[15px] border border-[rgba(var(--success-color-rgb),0.2)]">
                              <div className="mb-4 flex items-center gap-3">
                                <CheckCircle className="h-5 w-5 text-[var(--success-color)] fill-current" />
                                <h3 className="text-base font-bold text-[var(--success-color)] m-0">
                                  Key Strengths
                                </h3>
                              </div>
                              <ul className="m-0 p-0 list-none space-y-3">
                                {report.ai_summary.key_strengths.map(
                                  (str, i) => (
                                    <li
                                      key={i}
                                      className="flex items-start gap-3 text-[14px] leading-[1.6] text-[var(--text-primary)]"
                                    >
                                      <CheckCircle className="h-4 w-4 mt-1 shrink-0 text-[var(--success-color)]" />
                                      <span>{str}</span>
                                    </li>
                                  ),
                                )}
                              </ul>
                            </div>
                          )}

                        {report.ai_summary.job_fit && (
                          <div className="rounded-xl p-6 bg-[var(--glass-bg-medium)] backdrop-blur-[15px] border border-[rgba(var(--primary-color-rgb),0.2)]">
                            <div className="mb-4 flex items-center gap-3">
                              <UserIcon className="h-5 w-5 text-[var(--icon-accent-color)]" />
                              <h3 className="text-base font-bold text-[var(--text-primary)] m-0">
                                Job Fit
                              </h3>
                            </div>
                            <p className="text-[14px] leading-[1.7] text-[var(--text-primary)] m-0">
                              {report.ai_summary.job_fit}
                            </p>
                          </div>
                        )}
                      </div>

                      {report.ai_summary.recommendations && (
                        <div className="rounded-xl p-6 bg-gradient-to-br from-[rgba(var(--primary-color-rgb),0.1)] to-[rgba(var(--primary-color-rgb),0.05)] border border-[rgba(var(--primary-color-rgb),0.3)]">
                          <div className="mb-4 flex items-center gap-3">
                            <Lightbulb className="h-6 w-6 text-[var(--icon-accent-color)] fill-current" />
                            <h3 className="text-lg font-bold text-[var(--text-accent-color)] m-0">
                              Recommendation
                            </h3>
                          </div>
                          <p className="text-[15px] font-medium leading-[1.7] text-[var(--text-primary)] m-0">
                            {report.ai_summary.recommendations}
                          </p>
                        </div>
                      )}

                      {report.ai_summary.areas_of_concern &&
                        report.ai_summary.areas_of_concern.length > 0 && (
                          <div className="rounded-xl p-6 bg-[var(--glass-bg-medium)] backdrop-blur-[15px] border border-[rgba(var(--error-color-rgb),0.2)]">
                            <div className="mb-4 flex items-center gap-3">
                              <Warning className="h-5 w-5 text-[var(--error-color)]" />
                              <h3 className="text-base font-bold text-[var(--error-color)] m-0">
                                Areas of Concern
                              </h3>
                              <span className="ml-auto rounded-full bg-[rgba(var(--error-color-rgb),0.15)] text-[var(--error-color)] px-2.5 py-0.5 text-xs font-bold">
                                {report.ai_summary.areas_of_concern.length}
                              </span>
                            </div>
                            <ul className="m-0 p-0 list-none space-y-2.5">
                              {report.ai_summary.areas_of_concern.map(
                                (concern, i) => (
                                  <li
                                    key={i}
                                    className="border-l-[3px] border-l-[var(--error-color)] bg-[rgba(var(--error-color-rgb),0.05)] rounded-r-md px-4 py-2.5 text-[14px] leading-[1.6] text-[var(--text-primary)]"
                                  >
                                    {concern}
                                  </li>
                                ),
                              )}
                            </ul>
                          </div>
                        )}
                    </div>
                  </section>
                )}

                {/* Analysis sections */}
                {(report.technical_summary || report.technical_score) && (
                  <AnalysisSection
                    id="air-technical"
                    title="Technical Analysis"
                    subtitle="Assessment of technical skills and competencies."
                    icon={Code}
                    score={report.technical_score}
                    summary={report.technical_summary}
                    skills={report.ai_summary?.technical_skills}
                  />
                )}

                {(report.behavioral_summary || report.behavioral_score) && (
                  <AnalysisSection
                    id="air-behavioral"
                    title="Behavioral Analysis"
                    subtitle="Assessment of behavioral competencies and soft skills."
                    icon={Users}
                    score={report.behavioral_score}
                    summary={report.behavioral_summary}
                  />
                )}

                {(report.communication_summary ||
                  report.communication_score) && (
                  <AnalysisSection
                    id="air-communication"
                    title="Communication Analysis"
                    subtitle="Assessment of communication skills and clarity."
                    icon={MessageSquare}
                    score={report.communication_score}
                    summary={report.communication_summary}
                  />
                )}

                {(report.cultural_fit_summary || report.cultural_fit_score) && (
                  <AnalysisSection
                    id="air-cultural_fit"
                    title="Cultural Fit Analysis"
                    subtitle="Assessment of cultural alignment and organizational fit."
                    icon={Heart}
                    score={report.cultural_fit_score}
                    summary={report.cultural_fit_summary}
                  />
                )}

                {/* Question Breakdown */}
                {report.question_evaluations &&
                  report.question_evaluations.length > 0 && (
                    <section id="air-questions" className={GLASS_CARD_CLASS}>
                      <GlassCardHeader
                        icon={HelpCircle}
                        title="Question Breakdown"
                        subtitle="Detailed evaluation of candidate responses to interview questions."
                      />

                      <div className="relative z-[1] flex flex-col gap-5">
                        {report.question_evaluations.map((qe, idx) => {
                          const qScoreColor = getScoreColor(qe.score);
                          return (
                            <div
                              key={idx}
                              className="rounded-xl p-7 bg-[var(--glass-bg-medium)] backdrop-blur-[15px] border border-[var(--glass-border-medium)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_16px_var(--glass-shadow-medium)]"
                            >
                              <div className="mb-5 flex items-start gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[rgba(var(--primary-color-rgb),0.15)] to-[rgba(var(--primary-color-rgb),0.08)] text-xl font-extrabold text-[var(--text-accent-color)]">
                                  {idx + 1}
                                </div>
                                <div className="flex-1 min-w-0 flex flex-col gap-3">
                                  <h4 className="text-[17px] font-semibold leading-[1.6] text-[var(--text-primary)] m-0">
                                    {qe.question_text}
                                  </h4>
                                  <div className="flex flex-wrap items-center gap-2.5">
                                    <span className="text-[12px] font-medium uppercase tracking-wider px-3 py-1 rounded-lg bg-[rgba(var(--primary-color-rgb),0.1)] text-[var(--primary-color)] border border-[rgba(var(--primary-color-rgb),0.3)]">
                                      {qe.question_type}
                                    </span>
                                    <span
                                      className="text-[13px] font-bold text-white rounded-xl px-4 py-1.5"
                                      style={{ backgroundColor: qScoreColor }}
                                    >
                                      {qe.score}% Score
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {qe.response_quality && (
                                <div className="mb-5 flex items-center gap-3 rounded-lg bg-[var(--glass-bg-light)] backdrop-blur-[10px] border border-[var(--glass-border-light)] px-4 py-3">
                                  <span className="text-[11px] font-bold uppercase tracking-[1px] text-[var(--text-secondary)]">
                                    Response Quality
                                  </span>
                                  <span
                                    aria-hidden
                                    className="h-2 w-2 rounded-full"
                                    style={{ backgroundColor: qScoreColor }}
                                  />
                                  <span className="text-[13px] font-medium text-[var(--text-primary)]">
                                    {qe.response_quality}
                                  </span>
                                </div>
                              )}

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {qe.key_points && qe.key_points.length > 0 && (
                                  <div className="rounded-xl bg-[rgba(var(--success-color-rgb),0.05)] border border-[rgba(var(--success-color-rgb),0.2)] p-4">
                                    <div className="mb-2.5 flex items-center gap-2 text-[13px] font-bold text-[var(--success-color)]">
                                      <CheckCircle className="h-4 w-4" /> Key
                                      Points
                                    </div>
                                    <ul className="m-0 p-0 list-none space-y-1.5">
                                      {qe.key_points.map((kp, i) => (
                                        <li
                                          key={i}
                                          className="flex gap-2 text-[13px] leading-[1.6] text-[var(--text-primary)]"
                                        >
                                          <span className="text-[var(--success-color)]">
                                            •
                                          </span>
                                          <span>{kp}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}

                                {qe.concerns && qe.concerns.length > 0 && (
                                  <div className="rounded-xl bg-[rgba(var(--error-color-rgb),0.05)] border border-[rgba(var(--error-color-rgb),0.2)] p-4">
                                    <div className="mb-2.5 flex items-center gap-2 text-[13px] font-bold text-[var(--error-color)]">
                                      <ExclamationCircle className="h-4 w-4" />{" "}
                                      Concerns
                                    </div>
                                    <ul className="m-0 p-0 list-none space-y-1.5">
                                      {qe.concerns.map((con, i) => (
                                        <li
                                          key={i}
                                          className="flex gap-2 text-[13px] leading-[1.6] text-[var(--text-primary)]"
                                        >
                                          <span className="text-[var(--error-color)]">
                                            •
                                          </span>
                                          <span>{con}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </section>
                  )}

                {/* Candidate Details */}
                <section id="air-details" className={GLASS_CARD_CLASS}>
                  <GlassCardHeader
                    icon={UserIcon}
                    title="Candidate Details"
                    subtitle="Additional information about the candidate."
                  />

                  <div className="relative z-[1] grid grid-cols-1 md:grid-cols-3 gap-5">
                    {report.questions_answered !== null &&
                      report.total_questions !== null && (
                        <DetailCard title="Performance" icon={HelpCircle}>
                          <DetailRow
                            label="Questions Answered"
                            value={`${report.questions_answered}/${report.total_questions}`}
                            isLarge
                          />
                          {report.question_coverage && (
                            <DetailRow
                              label="Coverage"
                              value={`${report.question_coverage}%`}
                            />
                          )}
                          {report.duration_seconds && (
                            <DetailRow
                              label="Duration"
                              value={formatDuration(report.duration_seconds)}
                            />
                          )}
                        </DetailCard>
                      )}

                    {(report.total_experience_years ||
                      report.notice_period_days !== null ||
                      report.availability_date) && (
                      <DetailCard
                        title="Experience & Availability"
                        icon={Calendar}
                      >
                        {report.total_experience_years && (
                          <DetailRow
                            label="Total Experience"
                            value={`${report.total_experience_years} years`}
                          />
                        )}
                        {report.notice_period_days !== null &&
                          report.notice_period_days !== undefined && (
                            <DetailRow
                              label="Notice Period"
                              value={`${report.notice_period_days} days`}
                            />
                          )}
                        {report.availability_date && (
                          <DetailRow
                            label="Availability"
                            value={report.availability_date}
                          />
                        )}
                      </DetailCard>
                    )}

                    {((report.expected_salary_min &&
                      report.expected_salary_max) ||
                      report.current_location ||
                      report.current_ctc) && (
                      <DetailCard
                        title="Compensation & Location"
                        icon={DollarSign}
                      >
                        {report.current_ctc && (
                          <DetailRow
                            label="Current CTC"
                            value={`$${report.current_ctc}`}
                          />
                        )}
                        {report.expected_salary_min &&
                          report.expected_salary_max && (
                            <DetailRow
                              label="Expected Salary"
                              value={`$${report.expected_salary_min} – $${report.expected_salary_max}`}
                            />
                          )}
                        {report.current_location && (
                          <DetailRow
                            label="Current Location"
                            value={report.current_location}
                          />
                        )}
                      </DetailCard>
                    )}
                  </div>

                  {(report.red_flags || report.unanswered_questions) && (
                    <div className="relative z-[1] mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
                      {report.red_flags && (
                        <div className="rounded-xl border-l-4 border-l-[var(--warning-color)] bg-[rgba(var(--warning-color-rgb),0.08)] p-5">
                          <div className="mb-2 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[var(--warning-color)]">
                            <Warning className="h-4 w-4" /> Red Flags
                          </div>
                          <p className="text-[14px] leading-[1.6] text-[var(--text-primary)] m-0 whitespace-pre-wrap">
                            {report.red_flags}
                          </p>
                        </div>
                      )}
                      {report.unanswered_questions && (
                        <div className="rounded-xl border-l-4 border-l-[var(--warning-color)] bg-[rgba(var(--warning-color-rgb),0.08)] p-5">
                          <div className="mb-2 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[var(--warning-color)]">
                            <ExclamationCircle className="h-4 w-4" /> Unanswered
                            Questions
                          </div>
                          <p className="text-[14px] leading-[1.6] text-[var(--text-primary)] m-0 whitespace-pre-wrap">
                            {report.unanswered_questions}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </section>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function SecondaryScoreCard({
  icon: Icon,
  label,
  score,
}: {
  icon: ReportModalIcon;
  label: string;
  score?: string | number | null;
}) {
  const color = getScoreColor(score);
  const hasScore = score !== null && score !== undefined && score !== "";
  return (
    <div className="group flex items-center gap-4 rounded-xl bg-[var(--glass-bg-medium)] backdrop-blur-[15px] border border-[var(--glass-border-medium)] p-5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_24px_var(--glass-shadow-dark)]">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[rgba(var(--primary-color-rgb),0.1)] border border-[rgba(var(--primary-color-rgb),0.2)]">
        <Icon className="h-[22px] w-[22px] text-[var(--icon-accent-color)]" />
      </div>
      <div className="flex flex-col">
        <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-0.5">
          {label}
        </div>
        <div
          className="text-[28px] font-bold leading-none tracking-[-1px]"
          style={{ color: hasScore ? color : "var(--text-secondary)" }}
        >
          {hasScore ? score : "—"}
          {hasScore && (
            <span className="text-base font-semibold opacity-70 ml-1">%</span>
          )}
        </div>
      </div>
    </div>
  );
}

function AnalysisSection({
  id,
  title,
  subtitle,
  icon: Icon,
  score,
  summary,
  skills,
}: {
  id: string;
  title: string;
  subtitle: string;
  icon: ReportModalIcon;
  score?: string | number | null;
  summary?: string | null;
  skills?: string[] | null;
}) {
  const color = getScoreColor(score);
  const numScore =
    typeof score === "string" ? parseFloat(score) : (score ?? 0);
  const safeScore = Number.isNaN(numScore) ? 0 : numScore;
  const dasharray = `${(safeScore / 100) * 283} 283`;
  const hasScore = score !== null && score !== undefined && score !== "";

  return (
    <section id={id} className={GLASS_CARD_CLASS}>
      <GlassCardHeader icon={Icon} title={title} subtitle={subtitle} />

      <div className="relative z-[1] grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
        <div className="flex flex-col items-center gap-4 rounded-xl p-7 bg-gradient-to-br from-[var(--glass-bg-medium)] to-[var(--glass-bg-dark)] border border-[var(--glass-border-medium)]">
          <div className="relative flex h-[140px] w-[140px] items-center justify-center">
            <svg
              className="h-full w-full -rotate-90"
              viewBox="0 0 100 100"
            >
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="var(--glass-border-medium)"
                strokeWidth="6"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke={color}
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={dasharray}
                className="transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)]"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span
                className="text-[40px] font-extrabold tracking-[-2px] leading-none"
                style={{ color: hasScore ? color : "var(--text-secondary)" }}
              >
                {hasScore ? score : "—"}
              </span>
              {hasScore && (
                <span className="text-xs font-semibold text-[var(--text-secondary)] mt-0.5">
                  /100
                </span>
              )}
            </div>
          </div>
          <div className="text-[12px] font-bold uppercase tracking-[1.5px] text-[var(--text-secondary)] text-center">
            {title.replace(" Analysis", "")} Score
          </div>
        </div>

        <div className="rounded-xl bg-[var(--glass-bg-medium)] backdrop-blur-[15px] border border-[var(--glass-border-medium)] p-7">
          <div className="mb-4 flex items-center gap-3">
            <Icon className="h-6 w-6 text-[var(--icon-accent-color)]" />
            <h3 className="text-xl font-bold text-[var(--text-primary)] m-0">
              Analysis Summary
            </h3>
          </div>
          <p className="text-[15px] leading-[1.8] text-[var(--text-primary)] m-0 whitespace-pre-wrap">
            {summary || "No summary available."}
          </p>

          {skills && skills.length > 0 && (
            <div className="mt-5 pt-5 border-t border-[var(--glass-border-light)]">
              <h4 className="mb-3 text-[12px] font-bold uppercase tracking-[1px] text-[var(--text-secondary)] m-0">
                Technical Skills Identified
              </h4>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <span
                    key={i}
                    className="text-[13px] font-medium px-3.5 py-1.5 rounded-xl border border-[rgba(var(--primary-color-rgb),0.3)] bg-[rgba(var(--primary-color-rgb),0.1)] text-[var(--primary-color)] backdrop-blur-[10px]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function DetailCard({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: ReportModalIcon;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 rounded-xl bg-[var(--glass-bg-medium)] backdrop-blur-[15px] border border-[var(--glass-border-medium)] p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_24px_var(--glass-shadow-dark)]">
      <div className="flex items-center gap-2.5 pb-3 border-b border-[var(--glass-border-light)]">
        <Icon className="h-[22px] w-[22px] text-[var(--icon-accent-color)]" />
        <h3 className="text-[13px] font-bold uppercase tracking-[1px] text-[var(--text-primary)] m-0">
          {title}
        </h3>
      </div>
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  );
}

function DetailRow({
  label,
  value,
  isLarge,
}: {
  label: string;
  value: string | number;
  isLarge?: boolean;
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-secondary)]">
        {label}
      </span>
      <span
        className={cn(
          "font-semibold text-[var(--text-primary)]",
          isLarge ? "text-base text-[var(--text-accent-color)]" : "text-[14px]",
        )}
      >
        {value}
      </span>
    </div>
  );
}
