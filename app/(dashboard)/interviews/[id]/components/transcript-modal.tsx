"use client";

import { useQuery } from "@tanstack/react-query";
import { FileText, Mail, User as UserIcon, X } from "lucide-react";

import { interviewsApi, type InterviewCandidate } from "@/lib/api/interviews";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { cn } from "@/lib/ui/cn";

interface TranscriptModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidate: InterviewCandidate | null;
}

export function TranscriptModal({
  isOpen,
  onClose,
  candidate,
}: TranscriptModalProps) {
  const {
    data: report,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["candidate-report", candidate?.id],
    queryFn: () => interviewsApi.getCandidateReport(candidate!.id!),
    enabled: isOpen && !!candidate?.id,
  });

  const parseTranscript = (transcript: string | null | undefined) => {
    if (!transcript) return [];
    const messages: Array<{ speaker: string; message: string }> = [];
    for (const line of transcript.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed) continue;
      if (trimmed.startsWith("User:")) {
        messages.push({
          speaker: "user",
          message: trimmed.replace("User:", "").trim(),
        });
      } else if (trimmed.startsWith("AI:")) {
        messages.push({
          speaker: "ai",
          message: trimmed.replace("AI:", "").trim(),
        });
      }
    }
    return messages;
  };

  const messages = parseTranscript(report?.transcript);

  if (!candidate) return null;

  const fullName = `${candidate.first_name ?? ""} ${candidate.last_name ?? ""}`.trim();

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="max-w-[1000px] w-[95vw] h-[85vh] p-0 overflow-hidden border-0 bg-[var(--gray-bg)] shadow-[var(--shadow-medium)] rounded-[var(--radius-lg)] flex flex-col"
      >
        <VisuallyHidden>
          <DialogTitle>Interview Transcript — {fullName}</DialogTitle>
        </VisuallyHidden>

        {/* Header */}
        <div className="glass-header-overlay relative shrink-0 flex items-center justify-between bg-[var(--glass-bg-medium)] backdrop-blur-[15px] backdrop-saturate-[180%] border-b border-[var(--glass-border-medium)] px-8 py-5 shadow-[0_2px_8px_var(--glass-shadow-medium)] z-10">
          <div className="relative z-[1] flex items-center gap-5 min-w-0">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[var(--primary-color)] to-[var(--primary-hover)] shadow-[0_4px_16px_rgba(var(--primary-color-rgb),0.3)]">
              <UserIcon className="h-8 w-8 text-white" />
            </div>
            <div className="flex flex-col min-w-0 gap-1.5">
              <h2 className="text-2xl font-bold tracking-[-0.5px] leading-tight text-[var(--text-primary)] m-0 truncate">
                {fullName || candidate.email}
              </h2>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-sm text-[var(--text-secondary)]">
                <span className="flex items-center gap-1.5 min-w-0">
                  <Mail className="h-4 w-4 shrink-0 text-[var(--icon-accent-color)]" />
                  <span className="truncate">{candidate.email}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <FileText className="h-4 w-4 text-[var(--icon-accent-color)]" />
                  Interview Transcript
                </span>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="relative z-[1] flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[var(--glass-white-overlay)] backdrop-blur-[10px] border border-[var(--glass-border-medium)] shadow-[0_2px_4px_var(--glass-shadow-medium)] transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-[var(--glass-white-overlay-dark)] hover:border-[var(--glass-border-dark)] hover:-translate-y-0.5 hover:shadow-[0_4px_8px_var(--glass-shadow-dark)] active:translate-y-0 group"
          >
            <X className="h-[18px] w-[18px] text-[var(--text-secondary)] transition-colors duration-300 group-hover:text-[var(--primary-color)]" />
          </button>
        </div>

        {/* Chat area */}
        <div className="chat-top-fade glass-scrollbar relative flex-1 overflow-y-auto bg-[var(--gray-bg)] px-8 py-6">
          {isLoading ? (
            <div className="min-h-[200px]" aria-hidden />
          ) : isError || !report ? (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-[var(--text-secondary)]">
              <FileText className="h-10 w-10 opacity-50" />
              <p>Unable to load the transcript.</p>
            </div>
          ) : messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-[var(--text-secondary)]">
              <FileText className="h-10 w-10 opacity-50" />
              <p>No transcript available for this interview.</p>
            </div>
          ) : (
            <div className="mx-auto flex max-w-3xl flex-col gap-4">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "flex w-full",
                    msg.speaker === "user"
                      ? "justify-end"
                      : "justify-start",
                  )}
                  style={{
                    animation: "fade-in-up 0.3s ease both",
                    animationDelay: `${Math.min(idx * 30, 600)}ms`,
                  }}
                >
                  <div
                    className={cn(
                      "flex flex-col max-w-[75%] px-[18px] py-[14px]",
                      msg.speaker === "user"
                        ? "bg-gradient-to-br from-[var(--primary-color)] to-[var(--primary-hover)] text-white rounded-[20px_20px_4px_20px] shadow-[0_4px_12px_rgba(var(--primary-color-rgb),0.25)]"
                        : "bg-[var(--glass-bg-medium)] backdrop-blur-[15px] border border-[var(--glass-border-medium)] text-[var(--text-primary)] rounded-[20px_20px_20px_4px] shadow-[0_2px_8px_var(--glass-shadow-medium)]",
                    )}
                  >
                    <div className="text-[14px] leading-[1.6] whitespace-pre-wrap">
                      {msg.message}
                    </div>
                    <div
                      className={cn(
                        "mt-2 text-[11px] font-medium",
                        msg.speaker === "user"
                          ? "text-white/85 text-right"
                          : "text-[var(--text-secondary)] text-left",
                      )}
                    >
                      {msg.speaker === "user" ? "You" : "AI Assistant"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
