import type { Band } from "@/components/valuation/types";

const ATTIO_BASE_URL = "https://api.attio.com/v2";
const LIST_SLUG = "valuation_leads";

export type ValuationLeadInput = {
  email: string;
  artistName: string;
  artistId: string;
  valueBand: Band;
  lifetimeStreams: number;
  followerCount?: number;
};

/**
 * Persist a valuation lead to Attio as a qualified, pipeline-staged record
 * (chat#1798). Two writes:
 *   1. assert the Person by email and set the qualifying attributes — `source`,
 *      `est_catalog_value` (the lead score), artist, Spotify link, streams,
 *      followers, valued-at;
 *   2. drop them onto the "Valuation Leads" pipeline at stage **New**.
 *
 * Best-effort and never throws — the caller's valuation already succeeded, so a
 * CRM failure is logged, not surfaced. The list add is skipped if the person
 * assert fails (no record to attach to). Returns the person-assert outcome.
 */
export async function upsertValuationLead(
  lead: ValuationLeadInput,
): Promise<{ success: boolean; error?: string }> {
  const apiKey = process.env.ATTIO_API_KEY;
  if (!apiKey) return { success: false, error: "ATTIO_API_KEY not configured" };

  const headers = {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  };

  // The same recording's catalog value is the band's central estimate — that's
  // the number sales sorts the board by, so it's the lead score.
  const values: Record<string, unknown> = {
    email_addresses: [{ email_address: lead.email }],
    lead_source: "Catalog Valuation",
    est_catalog_value: lead.valueBand.central,
    looked_up_artist: lead.artistName,
    spotify_artist_url: `https://open.spotify.com/artist/${lead.artistId}`,
    lifetime_streams: lead.lifetimeStreams,
    valued_at: new Date().toISOString().slice(0, 10),
  };
  if (typeof lead.followerCount === "number") values.follower_count = lead.followerCount;

  let recordId: string;
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

  // Drop the lead onto the pipeline. A failure here doesn't undo the qualified
  // person record, so log via the returned error but still count the lead saved.
  if (recordId) {
    try {
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
    } catch (err) {
      console.error("[valuation/lead] pipeline add error:", err);
    }
  }

  return { success: true };
}
