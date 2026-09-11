import { z } from "zod";

const tag = z
  .string()
  .max(100)
  .regex(/^[a-zA-Z0-9_.-]+$/);
const attributionSchema = z.object({
  utm_source: tag.optional(),
  utm_medium: tag.optional(),
  utm_campaign: tag.optional(),
  utm_content: tag.optional(),
});
export type VideoAttribution = z.infer<typeof attributionSchema>;
const storageKey = "recoup:music-video-attribution:v1";

/** First tagged visit to this offer in this tab; never store contact details. */
export function getVideoAttribution(): VideoAttribution {
  if (typeof window === "undefined") return {};
  try {
    const saved = window.sessionStorage.getItem(storageKey);
    if (saved) {
      const parsed = attributionSchema.safeParse(JSON.parse(saved));
      if (parsed.success && Object.keys(parsed.data).length) return parsed.data;
    }
  } catch {
    /* Storage restrictions must not block the request. */
  }
  const params = new URLSearchParams(window.location.search);
  const attribution: Record<string, string> = {};
  for (const key of [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
  ] as const) {
    const parsed = tag.safeParse(params.get(key));
    if (parsed.success) attribution[key] = parsed.data;
  }
  if (Object.keys(attribution).length) {
    try {
      window.sessionStorage.setItem(storageKey, JSON.stringify(attribution));
    } catch {
      /* Best effort. */
    }
  }
  return attribution;
}
