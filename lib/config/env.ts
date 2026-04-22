/**
 * Public env for browser + server. API base must use NEXT_PUBLIC_* for client-side axios.
 * Matches Angular `environment.apiUrl` (e.g. http://localhost:8000).
 */
export function getPublicApiBaseUrl(): string {
  const raw = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";
  return raw.replace(/\/+$/, "");
}
