"use client";

import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Questionnaire } from "@/lib/api/questionnaires";

interface UpdateQuestionnaireModalProps {
  isOpen: boolean;
  isUpdating: boolean;
  questionnaire: Questionnaire | null;
  onClose: () => void;
  onConfirm: (title: string) => void;
}

export function UpdateQuestionnaireModal({
  isOpen,
  isUpdating,
  questionnaire,
  onClose,
  onConfirm,
}: UpdateQuestionnaireModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (isOpen && questionnaire) {
      setTitle(questionnaire.title || "");
    }
  }, [isOpen, questionnaire]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && !isUpdating) onClose();
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
  }, [isOpen, isUpdating, onClose]);

  const isFormValid = title.trim().length >= 3;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm sm:p-6"
        >
          <div className="absolute inset-0" onClick={() => !isUpdating && onClose()} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            className="relative flex w-full max-w-[520px] flex-col overflow-hidden rounded-[20px] border border-[var(--border-color-light)] bg-[var(--background-color)] shadow-[0_8px_32px_rgba(var(--shadow-rgb),0.15)]"
          >
            <div className="flex items-center justify-between border-b border-[var(--divider-color)] bg-[var(--glass-bg-light)] px-6 py-4 backdrop-blur-md">
          <h3 className="text-base font-semibold text-[var(--text-primary)]">
            Update Questionnaire
          </h3>
          <button
            onClick={onClose}
            disabled={isUpdating}
            className="flex h-8 w-8 items-center justify-center rounded-full text-[var(--text-secondary)] transition-colors hover:bg-[var(--surface-2)] hover:text-[var(--text-primary)] disabled:pointer-events-none"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex flex-col gap-6 p-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="questionnaire-title" className="text-sm font-medium text-[var(--text-primary)]">
              <span className="text-[var(--error-color)] mr-1">*</span>
              Questionnaire Name
            </label>
            <input
              id="questionnaire-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter questionnaire name"
              className="h-10 w-full rounded-xl border border-[var(--border-color)] bg-[var(--background-color)] px-3 text-sm text-[var(--text-primary)] outline-none transition-colors focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color-rgb)]/20"
            />
            {title.trim().length > 0 && title.trim().length < 3 && (
              <p className="text-xs text-[var(--error-color)] mt-1">
                Please enter a valid questionnaire name (minimum 3 characters)
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-[var(--divider-color)] bg-[var(--glass-bg-light)] px-4 py-2.5 backdrop-blur-md">
          <button
            type="button"
            disabled={isUpdating}
            onClick={onClose}
            className="flex h-8 items-center justify-center rounded-xl border border-transparent bg-transparent px-4 text-sm font-medium text-[var(--text-primary)] transition-colors hover:border-[var(--primary-color)] hover:text-[var(--primary-color)] disabled:pointer-events-none disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={isUpdating || !isFormValid}
            onClick={() => onConfirm(title)}
            className="flex h-8 items-center justify-center gap-2 rounded-xl bg-[var(--primary-color)] px-4 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:pointer-events-none disabled:opacity-50"
          >
            {isUpdating ? "Updating..." : "Update"}
          </button>
        </div>
      </motion.div>
    </motion.div>
    )}
    </AnimatePresence>
  );
}
