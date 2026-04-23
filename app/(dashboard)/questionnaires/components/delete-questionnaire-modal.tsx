"use client";

import { AlertCircle, FileText, Info } from "lucide-react";
import { format } from "date-fns";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Questionnaire } from "@/lib/api/questionnaires";
import { cn } from "@/lib/ui/cn";

interface DeleteQuestionnaireModalProps {
  isOpen: boolean;
  isDeleting: boolean;
  questionnaire: Questionnaire | null;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteQuestionnaireModal({
  isOpen,
  isDeleting,
  questionnaire,
  onClose,
  onConfirm,
}: DeleteQuestionnaireModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && !isDeleting) onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleEscape);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, isDeleting, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm sm:p-6"
        >
          <div className="absolute inset-0" onClick={() => !isDeleting && onClose()} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            className="relative flex w-full max-w-[520px] flex-col overflow-hidden rounded-[20px] border border-[var(--border-color-light)] bg-[var(--glass-bg-medium)] shadow-[0_8px_32px_rgba(var(--shadow-rgb),0.15)] backdrop-blur-xl"
          >
            <div className="flex items-center gap-4 border-b border-[var(--glass-border-light)] bg-[var(--glass-bg-light)] p-6">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-[var(--error-color)]/30 bg-[var(--glass-bg-light)] text-[var(--error-color)] shadow-[0_4px_16px_rgba(var(--error-color-rgb),0.2)]">
            <AlertCircle className="h-7 w-7" strokeWidth={2.5} />
          </div>
          <h3 className="text-[22px] font-semibold text-[var(--text-primary)]">
            Delete Questionnaire
          </h3>
        </div>

        <div className="flex flex-col gap-6 bg-[var(--background-color)] p-6">
          <p className="text-[15px] leading-relaxed text-[var(--text-secondary)]">
            Are you sure you want to delete this questionnaire? This action cannot be undone.
          </p>

          <div className="overflow-hidden rounded-xl border border-[var(--glass-border-light)] bg-[var(--glass-bg-light)] shadow-[0_4px_16px_rgba(var(--shadow-rgb),0.05)] backdrop-blur-md">
            <div className="flex items-center gap-2.5 border-b border-[var(--glass-border-light)] bg-[var(--glass-bg-medium)] px-5 py-4">
              <FileText className="h-5 w-5 text-[var(--icon-accent-color)]" />
              <span className="text-[15px] font-semibold text-[var(--text-primary)]">
                Questionnaire Details
              </span>
            </div>
            <div className="flex flex-col p-5">
              <div className="flex items-center justify-between border-b border-[var(--glass-border-light)] py-3 first:pt-0 last:border-0 last:pb-0">
                <span className="text-sm font-medium text-[var(--text-secondary)]">Title:</span>
                <span className="max-w-[200px] break-words text-right text-sm font-semibold text-[var(--text-primary)]">
                  {questionnaire?.title}
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-[var(--glass-border-light)] py-3 first:pt-0 last:border-0 last:pb-0">
                <span className="text-sm font-medium text-[var(--text-secondary)]">Questions:</span>
                <span className="max-w-[200px] break-words text-right text-sm font-semibold text-[var(--text-primary)]">
                  {questionnaire?.number_of_questions}
                </span>
              </div>
              {questionnaire?.created_at && (
                <div className="flex items-center justify-between border-b border-[var(--glass-border-light)] py-3 first:pt-0 last:border-0 last:pb-0">
                  <span className="text-sm font-medium text-[var(--text-secondary)]">Created:</span>
                  <span className="max-w-[200px] break-words text-right text-sm font-semibold text-[var(--text-primary)]">
                    {format(new Date(questionnaire.created_at), "MMM d, yyyy")}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2.5 rounded-xl border border-[var(--warning-color)]/30 bg-[var(--glass-bg-light)] px-5 py-4 shadow-[0_4px_16px_rgba(var(--warning-color-rgb),0.15)] backdrop-blur-md">
            <Info className="h-5 w-5 shrink-0 text-[var(--warning-color)]" />
            <span className="text-sm font-medium text-[var(--warning-color)]">
              All associated data will be permanently removed.
            </span>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-[var(--glass-border-light)] bg-[var(--glass-bg-light)] p-5">
          <button
            type="button"
            disabled={isDeleting}
            onClick={onClose}
            className="flex h-10 items-center justify-center rounded-xl border border-[var(--border-color-light)] bg-transparent px-4 text-sm font-medium text-[var(--text-primary)] transition-colors hover:border-[var(--border-color)] hover:bg-[var(--surface-1)] disabled:pointer-events-none disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={isDeleting}
            onClick={onConfirm}
            className="flex h-10 items-center justify-center gap-2 rounded-xl bg-[var(--error-color)] px-4 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:pointer-events-none disabled:opacity-50"
          >
            {isDeleting ? "Deleting..." : "Delete Questionnaire"}
          </button>
        </div>
      </motion.div>
    </motion.div>
    )}
    </AnimatePresence>
  );
}
