/** A captured lead, as posted to the api notification endpoint. */
export interface CapturedLead {
  email: string;
  source: string;
  name?: string;
  company?: string;
  role?: string;
  package?: string;
  rosterSize?: string;
  message?: string;
}

/**
 * Pages a human on Telegram that a lead was captured, via
 * `POST /api/notifications/lead` on the Recoup api.
 *
 * Never throws and never returns a failure. By the time this runs the lead is
 * already stored in Attio, so a paging outage must not surface an error to a
 * visitor whose submission actually succeeded — it is logged instead. The
 * capture endpoint's own status stays the honest signal (recoupable/chat#1800).
 *
 * Unauthenticated by decision (chat#1800, 2026-08-12): the forms feeding this
 * call are public anyway, so a shared secret added setup without adding
 * protection. Revisit if the channel gets spammed.
 *
 * @param lead - The lead that was just stored.
 */
export async function notifyLeadCaptured(lead: CapturedLead): Promise<void> {
  const baseUrl = process.env.RECOUP_API_URL || "https://api.recoupable.dev";

  try {
    const response = await fetch(`${baseUrl}/api/notifications/lead`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    });

    if (!response.ok) {
      console.error(
        `[notify-lead] notifier returned ${response.status} — lead stored but not announced`,
      );
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error(`[notify-lead] ${message} — lead stored but not announced`);
  }
}
