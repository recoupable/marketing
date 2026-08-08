import { createAttioContact } from "./attio";
import { notifyLeadCaptured } from "./notifyLeadCaptured";

/** A validated /api/subscribe submission. */
export interface SubscriberSubmission {
  email: string;
  name?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  source_post_slug?: string;
}

/**
 * Persists a subscriber to Attio and pages a human that a lead arrived.
 *
 * Shares the shape of `submitBookingToAttio` so both capture paths report
 * failure the same way — a caller must translate `ok: false` into a non-200
 * (recoupable/chat#1800).
 *
 * @param submission - The validated subscribe submission.
 * @returns `{ ok: true }`, or `{ ok: false, error }` with the upstream reason.
 */
export async function submitSubscriberToAttio(
  submission: SubscriberSubmission,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const { email, name, utm_source, utm_medium, utm_campaign, source_post_slug } =
    submission;

  const contact = await createAttioContact({
    email,
    name,
    source: utm_source || "website",
    utm_source,
    utm_medium,
    utm_campaign,
    source_post_slug,
  });

  if (!contact.success) {
    return { ok: false, error: contact.error ?? "Attio did not store the subscriber" };
  }

  // Paging is announcement, not capture — see submitBookingToAttio.
  await notifyLeadCaptured({
    email,
    source: utm_campaign || utm_source || "website",
    name,
  }).catch(() => {});

  return { ok: true };
}
