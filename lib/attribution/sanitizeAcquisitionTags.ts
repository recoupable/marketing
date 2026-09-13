import { acquisitionTagKeys, type AcquisitionTags } from "./AcquisitionTags.ts";

function tag(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const text = value.trim();
  // Campaign labels only: no email addresses, URLs, query strings, control
  // characters, click IDs, or arbitrary objects. Reject rather than truncate.
  if (!text || text.length > 100 || !/^[a-z0-9][a-z0-9 ._-]*$/i.test(text)) return undefined;
  return text;
}

export function sanitizeAcquisitionTags(value: unknown): AcquisitionTags | undefined {
  if (!value || typeof value !== "object" || Array.isArray(value)) return undefined;
  const input = value as Record<string, unknown>;
  const tags: AcquisitionTags = {};
  for (const key of acquisitionTagKeys) {
    const safe = tag(input[key]);
    if (safe) tags[key] = safe;
  }
  return Object.keys(tags).length ? tags : undefined;
}
