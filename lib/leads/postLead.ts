import { siteConfig } from "../config.ts";

export type LeadResult = { ok: true } | { ok: false; error: string };

const failure = "We could not save your details. Please try again.";

/**
 * The one browser-side path to `POST /api/leads` on the Recoup api, which owns
 * Attio storage, the triage note, and the Telegram page (chat#1800). Resolves
 * `{ ok: true }` only when the api itself confirmed the lead was stored, so a
 * caller can never show a saved state for an unrelated 2xx.
 */
export async function postLead(payload: Record<string, unknown>, fetcher: typeof fetch = fetch): Promise<LeadResult> {
  try {
    const response = await fetcher(`${siteConfig.apiUrl}/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(20_000),
    });
    const body: unknown = await response.json().catch(() => null);
    const record = body && typeof body === "object" ? (body as Record<string, unknown>) : null;
    if (response.status === 200 && record?.status === "success") return { ok: true };
    const error = typeof record?.error === "string" && record.error ? record.error : failure;
    return { ok: false, error };
  } catch (err) {
    // The visitor gets the friendly message; the operator gets the real error.
    console.error("[postLead] network failure:", err);
    return { ok: false, error: failure };
  }
}
