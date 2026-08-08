import { createAttioContact } from "./attio";
import { createAttioNote } from "./createAttioNote";
import { buildSubscriberNote, type SubscriberNoteInput } from "./buildSubscriberNote";
import { notifyLeadCaptured } from "./notifyLeadCaptured";

/** A validated /api/subscribe submission. */
export type SubscriberSubmission = SubscriberNoteInput;

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
  const { email, name, company, utm_source, utm_medium, utm_campaign, source_post_slug } =
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

  // The qualifying detail is a bonus on top of a stored contact, not the lead
  // itself — unlike an advisory booking, where the note IS the enquiry. Losing
  // it is logged, but must not lose the lead that was captured.
  const note = buildSubscriberNote(submission);
  if (note && contact.recordId) {
    const written = await createAttioNote({ recordId: contact.recordId, ...note });
    if (!written.success) {
      console.error("[subscribe] lead stored but detail note failed:", written.error);
    }
  }

  // Paging is announcement, not capture — see submitBookingToAttio.
  await notifyLeadCaptured({
    email,
    source: utm_campaign || utm_source || "website",
    name,
    company,
  }).catch(() => {});

  return { ok: true };
}
