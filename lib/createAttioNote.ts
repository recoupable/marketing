import { ATTIO_BASE_URL } from "./attio";

/** A note to attach to an existing Attio person record. */
export interface AttioNoteInput {
  recordId: string;
  title: string;
  content: string;
}

/**
 * Attaches a note to an Attio person record.
 *
 * Returns a result rather than throwing, so a caller can decide whether a lost
 * note should fail the request — for an advisory inquiry it should, because the
 * note is the inquiry.
 *
 * @param input - The parent record id and the note to write.
 * @returns Whether the note was created, with the Attio error when it was not.
 */
export async function createAttioNote(
  input: AttioNoteInput,
): Promise<{ success: boolean; error?: string }> {
  const apiKey = process.env.ATTIO_API_KEY;

  if (!apiKey) {
    return { success: false, error: "ATTIO_API_KEY not configured" };
  }

  try {
    const response = await fetch(`${ATTIO_BASE_URL}/notes`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          title: input.title,
          content: input.content,
          format: "plaintext",
          parent_object: "people",
          parent_record_id: input.recordId,
        },
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      return {
        success: false,
        error: `Attio note error: ${response.status} — ${errorBody}`,
      };
    }

    return { success: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return { success: false, error: message };
  }
}
