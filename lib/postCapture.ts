/**
 * Posts a lead-capture payload and reports whether it was stored.
 *
 * Returns a result rather than throwing so a caller can render its own output
 * and surface the capture failure as independent concerns. Discarding this
 * result is what silently dropped every audit and calculator lead
 * (recoupable/chat#1800).
 *
 * @param endpoint - The capture endpoint, e.g. `/api/subscribe`.
 * @param payload - The submission body.
 * @returns `{ ok: true }`, or `{ ok: false, error }` with a message to show.
 */
export async function postCapture(
  endpoint: string,
  payload: Record<string, unknown>,
): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    const response = await fetch(endpoint, {
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
