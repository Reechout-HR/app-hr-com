import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { InterviewListItem } from "@/lib/api/interviews";

export type ViewMode = "list" | "grid";

interface InterviewsState {
  viewMode: ViewMode;
  searchQuery: string;
  dateFilter: string;
  statusFilter: string;
  isDeleteModalOpen: boolean;
  selectedInterview: InterviewListItem | null;

  // Actions
  setViewMode: (mode: ViewMode) => void;
  setSearchQuery: (query: string) => void;
  setDateFilter: (filter: string) => void;
  setStatusFilter: (filter: string) => void;
  setIsDeleteModalOpen: (isOpen: boolean) => void;
  setSelectedInterview: (interview: InterviewListItem | null) => void;
}

export const useInterviewsStore = create<InterviewsState>()(
  persist(
    (set) => ({
      viewMode: "list",
      searchQuery: "",
      dateFilter: "",
      statusFilter: "",
      isDeleteModalOpen: false,
      selectedInterview: null,

      setViewMode: (mode) => set({ viewMode: mode }),
      setSearchQuery: (query) => set({ searchQuery: query }),
      setDateFilter: (filter) => set({ dateFilter: filter }),
      setStatusFilter: (filter) => set({ statusFilter: filter }),
      setIsDeleteModalOpen: (isOpen) => set({ isDeleteModalOpen: isOpen }),
      setSelectedInterview: (interview) => set({ selectedInterview: interview }),
    }),
    {
      name: "interviews-storage", // persist viewMode, search etc.
      partialize: (state) => ({ viewMode: state.viewMode }), // Only persist viewMode to match Angular behavior
    }
  )
);
