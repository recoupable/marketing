import { createAttioContact } from "./attio";
import { createAttioNote } from "./createAttioNote";
import { buildBookingNote, type BookingNoteInput } from "./buildBookingNote";

/** A validated advisory booking submission. */
export interface BookingSubmission extends BookingNoteInput {
  name: string;
  email: string;
}

/**
 * Persists an advisory booking as an Attio person plus an "Advisory Inquiry"
 * note, and reports whether the lead was actually stored.
 *
 * Both steps are load-bearing: the person without the note is an email address
 * nobody will action. A caller must translate `ok: false` into a non-200 —
 * reporting success on a failed capture is what silently lost every advisory
 * lead between 2026-06-17 and 2026-08-06 (recoupable/chat#1800).
 *
 * @param submission - The validated booking submission.
 * @returns `{ ok: true }`, or `{ ok: false, error }` with the upstream reason.
 */
export async function submitBookingToAttio(
  submission: BookingSubmission,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const { name, email, ...booking } = submission;

  const contact = await createAttioContact({
    email,
    name,
    source: "website /advisory/book",
  });

  if (!contact.success || !contact.recordId) {
    return {
      ok: false,
      error: contact.error ?? "Attio returned no record id for the contact",
    };
  }

  const note = buildBookingNote(booking);
  const written = await createAttioNote({ recordId: contact.recordId, ...note });

  if (!written.success) {
    return { ok: false, error: written.error ?? "Attio note was not created" };
  }

  return { ok: true };
}
