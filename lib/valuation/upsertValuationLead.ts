import type { Band } from "@/components/valuation/types";
import { usd } from "@/lib/format/usd";
import { assertPersonByEmail } from "@/lib/attio/assertPersonByEmail";
import { createNote } from "@/lib/attio/createNote";
import { isRecordInList } from "@/lib/attio/isRecordInList";
import { addRecordToList } from "@/lib/attio/addRecordToList";

const ATTIO_WORKSPACE = "recoup";
const LIST_SLUG = "valuation_leads";
// Stable id of the "Valuation Leads" list — the per-record entries endpoint
// reports membership by list id, not slug. Attio is one workspace (shared by
// preview + prod), so this id is constant.
const LIST_ID = "f5abf9c0-b0a0-4d47-a6b1-37072e415e65";

export type ValuationLeadInput = {
  email: string;
  artistName: string;
  artistId: string;
  valueBand: Band;
  lifetimeStreams: number;
  followerCount?: number;
};

/** Attribute values for the Person assert — the *latest* run's snapshot. */
function leadAttributes(lead: ValuationLeadInput, today: string): Record<string, unknown> {
  const values: Record<string, unknown> = {
    email_addresses: [{ email_address: lead.email }],
    lead_source: "Catalog Valuation",
    est_catalog_value: lead.valueBand.central, // band central = the lead score
    looked_up_artist: lead.artistName,
    spotify_artist_url: `https://open.spotify.com/artist/${lead.artistId}`,
    lifetime_streams: lead.lifetimeStreams,
    valued_at: today,
  };
  if (typeof lead.followerCount === "number") values.follower_count = lead.followerCount;
  return values;
}

/** Markdown body for one run's activity note. */
function leadNoteContent(lead: ValuationLeadInput, today: string): string {
  const b = lead.valueBand;
  const followers =
    typeof lead.followerCount === "number"
      ? `\n- Followers: ${lead.followerCount.toLocaleString("en-US")}`
      : "";
  return (
    `Valued [${lead.artistName}](https://open.spotify.com/artist/${lead.artistId}) at ` +
    `**${usd(b.central)}** (range ${usd(b.low)}–${usd(b.high)}).\n\n` +
    `- Lifetime streams: ${lead.lifetimeStreams.toLocaleString("en-US")}${followers}\n` +
    `- Run date: ${today}`
  );
}

/**
 * Persist a valuation lead to Attio as a qualified, pipeline-staged record with
 * a running activity log (chat#1798). Orchestrates the Attio primitives in
 * `lib/attio`:
 *   1. assert the Person by email + qualifying attributes (latest run);
 *   2. attach a timestamped Note — every run, incl. re-runs → a chronology;
 *   3. add to the "Valuation Leads" pipeline at **New** only if not already on
 *      it (never duplicates a card or resets its stage).
 *
 * Best-effort and never throws. Returns the person-assert outcome plus a deep
 * link to the record (for the Telegram ping).
 */
export async function upsertValuationLead(
  lead: ValuationLeadInput,
): Promise<{ success: boolean; error?: string; recordUrl?: string }> {
  if (!process.env.ATTIO_API_KEY) {
    return { success: false, error: "ATTIO_API_KEY not configured" };
  }

  const today = new Date().toISOString().slice(0, 10);
  const { recordId, error } = await assertPersonByEmail(leadAttributes(lead, today));
  if (error) return { success: false, error };
  if (!recordId) return { success: true };

  const recordUrl = `https://app.attio.com/${ATTIO_WORKSPACE}/person/${recordId}/overview`;

  // Activity log: one note per run (every run, incl. re-runs) for a chronology.
  await createNote({
    parentObject: "people",
    parentRecordId: recordId,
    title: `Catalog valuation — ${lead.artistName} (${today})`,
    content: leadNoteContent(lead, today),
  });

  // Pipeline: add at New only if absent — re-runs must not duplicate the card
  // or reset a stage sales already advanced.
  if (!(await isRecordInList("people", recordId, LIST_ID))) {
    await addRecordToList(LIST_SLUG, "people", recordId, { stage: ["New"] });
  }

  return { success: true, recordUrl };
}
