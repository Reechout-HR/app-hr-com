/** Split a display name into Django `first_name` + `last_name` fields. */
export function splitFullName(fullName: string): { first_name: string; last_name: string } {
  const parts = fullName.trim().split(/\s+/);
  const first_name = parts[0] ?? "";
  const last_name = parts.slice(1).join(" ");
  return { first_name, last_name };
}
