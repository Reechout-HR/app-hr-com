/** Matches Angular `lastUpdated = new Date('2024-01-01')` on legal pages. */
export const LEGAL_LAST_UPDATED_ISO = "2024-01-01";

export function formatLegalDate(iso: string) {
  try {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}
