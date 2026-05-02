import { apiClient } from "./client";

export interface GeminiBootstrapData {
  status: string;
  schedule_date: string | null;
  can_start: boolean;
  ws_url: string | null;
  short_token: string | null;
  candidate_name: string | null;
  interview_title: string | null;
  voice: string | null;
}

export interface GeminiBootstrapResponse {
  data: GeminiBootstrapData | null;
  message: string;
  error: string | null;
}

export const interviewsGeminiApi = {
  getBootstrap: async (candidateId: string) => {
    const { data } = await apiClient.get<GeminiBootstrapResponse>(
      `/api/interviews/gemini/bootstrap/${candidateId}/`,
    );
    return data;
  },
};
