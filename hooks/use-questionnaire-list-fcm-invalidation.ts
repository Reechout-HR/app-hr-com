"use client";

import { useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useNotificationStore } from "@/lib/store/notification-store";

const TERMINAL_TYPES = new Set([
  "questionnaire_completed",
  "questionnaire_regenerated",
  "questionnaire_failed",
  "completed",
  "regenerated",
  "failed",
]);

function normalizeType(raw: string): "completed" | "regenerated" | "failed" | null {
  if (raw === "questionnaire_completed" || raw === "completed") return "completed";
  if (raw === "questionnaire_regenerated" || raw === "regenerated") return "regenerated";
  if (raw === "questionnaire_failed" || raw === "failed") return "failed";
  return null;
}

/**
 * When FCM reports a questionnaire finished (or failed), refresh the paginated list
 * AND surface the same toast Angular's `NotificationService` consumer shows
 * (`app_hr_com/.../questionnaire.component.ts#handleQuestionnaireUpdate`).
 */
export function useQuestionnaireListFcmInvalidation() {
  const queryClient = useQueryClient();
  const latestUpdate = useNotificationStore((s) => s.latestUpdate);
  const lastKey = useRef<string | null>(null);

  useEffect(() => {
    if (!latestUpdate) return;
    const raw = String(latestUpdate.type);
    const shouldRefresh =
      TERMINAL_TYPES.has(raw) ||
      /questionnaire_(completed|regenerated|failed)$/.test(raw);

    if (!shouldRefresh) return;

    const dedupeKey = `${latestUpdate.questionnaireId}-${raw}`;
    if (lastKey.current === dedupeKey) return;
    lastKey.current = dedupeKey;

    queryClient.invalidateQueries({ queryKey: ["questionnaires"] });

    const kind = normalizeType(raw);
    const title = latestUpdate.title || "Questionnaire";
    const count = latestUpdate.questionCount;

    if (kind === "completed") {
      toast.success(`${title} has been generated with ${count} questions!`);
    } else if (kind === "regenerated") {
      toast.success(`${title} has been updated with ${count} new questions!`);
    } else if (kind === "failed") {
      toast.error(`Failed to generate ${title}. ${latestUpdate.error || "Please try again."}`);
    }
  }, [latestUpdate, queryClient]);
}
