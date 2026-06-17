import type { Band } from "@/components/valuation/types";
import { usd } from "@/lib/format/usd";

const ATTIO_BASE_URL = "https://api.attio.com/v2";
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

/**
 * Persist a valuation lead to Attio as a qualified, pipeline-staged record with
 * a running activity log (chat#1798). Per run:
 *   1. assert the Person by email and set the qualifying attributes (these hold
 *      the *latest* run — source, est. value/lead-score, artist, streams, …);
 *   2. attach a timestamped Note — fires on *every* run, including re-runs, so
 *      the record keeps a chronology of what the person valued and when;
 *   3. drop them onto the "Valuation Leads" pipeline at **New** if not already
 *      on it (check-then-create — never duplicates a card or resets its stage).
 *
 * Best-effort and never throws — the caller's valuation already succeeded, so a
 * CRM failure is logged, not surfaced. Returns the person-assert outcome plus a
 * deep link to the record (for the Telegram ping).
 */
export async function upsertValuationLead(
  lead: ValuationLeadInput,
): Promise<{ success: boolean; error?: string; recordUrl?: string }> {
  const apiKey = process.env.ATTIO_API_KEY;
  if (!apiKey) return { success: false, error: "ATTIO_API_KEY not configured" };

  const headers = {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  };
  const today = new Date().toISOString().slice(0, 10);

  // The band's central estimate is the number sales sorts the board by — the
  // lead score. Attributes overwrite each run; the Note (below) keeps history.
  const values: Record<string, unknown> = {
    email_addresses: [{ email_address: lead.email }],
    lead_source: "Catalog Valuation",
    est_catalog_value: lead.valueBand.central,
    looked_up_artist: lead.artistName,
    spotify_artist_url: `https://open.spotify.com/artist/${lead.artistId}`,
    lifetime_streams: lead.lifetimeStreams,
    valued_at: today,
  };
  if (typeof lead.followerCount === "number") values.follower_count = lead.followerCount;

  let recordId: string | undefined;
  try {
    const res = await fetch(
      `${ATTIO_BASE_URL}/objects/people/records?matching_attribute=email_addresses`,
      { method: "PUT", headers, body: JSON.stringify({ data: { values } }) },
    );
    if (!res.ok) {
      return { success: false, error: `Attio person assert failed: ${res.status} — ${await res.text()}` };
    }
    const data = await res.json();
    recordId = data?.data?.id?.record_id;
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : "Unknown error" };
  }

  if (!recordId) return { success: true };
  const recordUrl = `https://app.attio.com/${ATTIO_WORKSPACE}/person/${recordId}/overview`;

  // Activity log: one note per run (every run, incl. re-runs) for a chronology.
  try {
    const band = lead.valueBand;
    const followers =
      typeof lead.followerCount === "number"
        ? `\n- Followers: ${lead.followerCount.toLocaleString("en-US")}`
        : "";
    const content =
      `Valued [${lead.artistName}](https://open.spotify.com/artist/${lead.artistId}) at ` +
      `**${usd(band.central)}** (range ${usd(band.low)}–${usd(band.high)}).\n\n` +
      `- Lifetime streams: ${lead.lifetimeStreams.toLocaleString("en-US")}${followers}\n` +
      `- Run date: ${today}`;
    const res = await fetch(`${ATTIO_BASE_URL}/notes`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        data: {
          parent_object: "people",
          parent_record_id: recordId,
          title: `Catalog valuation — ${lead.artistName} (${today})`,
          format: "markdown",
          content,
        },
      }),
    });
    if (!res.ok) {
      console.error(`[valuation/lead] note create failed: ${res.status} — ${await res.text()}`);
    }
  } catch (err) {
    console.error("[valuation/lead] note create error:", err);
  }

  // Drop the lead onto the pipeline — but only if it isn't already there. The
  // route fires on every run; a blind create would litter the board with
  // duplicate cards, and asserting would reset a card sales already advanced
  // past "New". So check-then-create: leave any existing entry (and its stage)
  // untouched.
  try {
    const existing = await fetch(
      `${ATTIO_BASE_URL}/objects/people/records/${recordId}/entries`,
      { headers },
    );
    const entries: Array<{ list_id?: string; id?: { list_id?: string } }> = existing.ok
      ? ((await existing.json())?.data ?? [])
      : [];
    const onBoard = entries.some(e => (e.list_id ?? e.id?.list_id) === LIST_ID);
    if (!onBoard) {
      const res = await fetch(`${ATTIO_BASE_URL}/lists/${LIST_SLUG}/entries`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          data: {
            parent_object: "people",
            parent_record_id: recordId,
            entry_values: { stage: ["New"] },
          },
        }),
      });
      if (!res.ok) {
        console.error(`[valuation/lead] pipeline add failed: ${res.status} — ${await res.text()}`);
      }
    }
  } catch (err) {
    console.error("[valuation/lead] pipeline add error:", err);
  }

  return { success: true, recordUrl };
}
