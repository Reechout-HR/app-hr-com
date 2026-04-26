import { apiClient } from "./client";
import { Question } from "./questionnaires";

export interface CreateQuestionRequest {
  questionnaire_id: string;
  question_text: string;
  order: number;
  question_type: string;
}

export interface UpdateQuestionRequest {
  question_text?: string;
  order?: number;
  questionnaire_id?: string;
  question_type?: string;
}

export type UpdateQuestionsOrderRequest = Array<{
  id: number;
  order: number;
}>;

export const questionsApi = {
  createQuestion: async (payload: CreateQuestionRequest) => {
    const { data } = await apiClient.post<Question>(
      `/api/questions/`,
      payload
    );
    return data;
  },

  updateQuestion: async (id: number, payload: UpdateQuestionRequest) => {
    const { data } = await apiClient.put<Question>(
      `/api/questions/${id}/`,
      payload
    );
    return data;
  },

  deleteQuestion: async (id: number) => {
    const { data } = await apiClient.delete(`/api/questions/${id}/`);
    return data;
  },

  updateQuestionsOrder: async (payload: UpdateQuestionsOrderRequest) => {
    const { data } = await apiClient.put<void>(
      `/api/question/reorder/`,
      payload
    );
    return data;
  },
};
