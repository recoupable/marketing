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
  const baseUrl = process.env.NEXT_PUBLIC_RECOUP_API_URL || (process.env.NEXT_PUBLIC_VERCEL_ENV === "production" ? "https://recoup-api.vercel.app" : "https://test-recoup-api.vercel.app");

  try {
    const response = await fetch(`${baseUrl}/api/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(20_000),
    });

    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      return {
        ok: false,
        error: body?.error || "We could not save your details. Please try again.",
      };
    }

    const receipt: unknown = await response.json().catch(() => null);
    if (response.status !== 200 || !receipt || typeof receipt !== "object" || !("status" in receipt) || receipt.status !== "success") {
      return { ok: false, error: "We could not save your details. Please try again." };
    }
    return { ok: true };
  } catch (err) {
    // Transport failure (offline, DNS, CORS): the visitor gets the friendly
    // message, the operator gets the real error in the console (chat#1800).
    console.error("[postCapture] network failure:", err);
    return { ok: false, error: "We could not save your details. Please try again." };
  }
}
