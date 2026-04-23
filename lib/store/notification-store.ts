import { create } from "zustand";

export interface QuestionnaireUpdate {
  questionnaireId: string;
  title: string;
  questionCount: number;
  type: "completed" | "regenerated" | "failed";
  error?: string;
}

type NotificationState = {
  latestUpdate: QuestionnaireUpdate | null;
  setLatestUpdate: (update: QuestionnaireUpdate) => void;
  clearLatestUpdate: () => void;
};

/**
 * Global Zustand store replacing the Angular NotificationService subject logic.
 * Any component can reactively subscribe to `latestUpdate`.
 */
export const useNotificationStore = create<NotificationState>((set) => ({
  latestUpdate: null,
  setLatestUpdate: (update) => set({ latestUpdate: update }),
  clearLatestUpdate: () => set({ latestUpdate: null }),
}));
