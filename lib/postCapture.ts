/**
 * Posts a lead-capture payload to the Recoup api and reports whether it was
 * stored. All five capture surfaces go through here — marketing keeps no
 * Attio client and no capture routes; `POST /api/leads` on the api owns
 * storage, the triage note, and the Telegram page (recoupable/chat#1800,
 * 2026-08-13 decision).
 *
 * Returns a result rather than throwing so a caller can render its own output
 * and surface the capture failure as independent concerns. Discarding this
 * result is what silently dropped every audit and calculator lead.
 *
 * @param payload - The submission body, including `kind` and `source`.
 * @returns `{ ok: true }`, or `{ ok: false, error }` with a message to show.
 */
export async function postCapture(
  payload: Record<string, unknown>,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const baseUrl = process.env.NEXT_PUBLIC_RECOUP_API_URL || "https://api.recoupable.dev";

  try {
    const response = await fetch(`${baseUrl}/api/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      return {
        ok: false,
        error: body?.error || "We could not save your details. Please try again.",
      };
    }

    return { ok: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return { ok: false, error: message };
  }
}
