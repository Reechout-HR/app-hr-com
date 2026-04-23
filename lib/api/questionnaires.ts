import { apiClient } from "./client";

export interface Questionnaire {
  id: string;
  title: string;
  details?: string;
  number_of_questions: number;
  created_at: string;
  user?: string;
  status: "pending" | "processing" | "completed" | "failed";
}

export interface PaginatedQuestionnaireResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Questionnaire[];
}

export const questionnairesApi = {
  getQuestionnaires: async (page = 1, pageSize = 10) => {
    const { data } = await apiClient.get<PaginatedQuestionnaireResponse>(
      `/api/questionnaires/?page=${page}&page_size=${pageSize}`
    );
    return data;
  },

  deleteQuestionnaire: async (id: string) => {
    const { data } = await apiClient.delete(`/api/questionnaires/${id}/`);
    return data;
  },
};
