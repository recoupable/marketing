import { readFile } from "node:fs/promises";

export async function readCrmImportExclusions(path: string | URL): Promise<Set<string>> {
  let data: unknown;
  try { data = JSON.parse(await readFile(path, "utf8")); }
  catch { throw new Error("CRM exclusion registry missing or invalid; import stopped."); }
  if (!data || typeof data !== "object" || !("exclusions" in data) || !Array.isArray(data.exclusions)) {
    throw new Error("CRM exclusions must contain an exclusions array.");
  }
  const emails = new Set<string>();
  for (const row of data.exclusions) {
    if (!row || typeof row !== "object" || typeof row.email !== "string" ||
        !/^[^\s@*]+@[^\s@*]+\.[^\s@*]+$/.test(row.email.trim())) {
      throw new Error("CRM exclusions require exact emails; wildcards are forbidden.");
    }
    emails.add(row.email.trim().toLowerCase());
  }
  return emails;
}
