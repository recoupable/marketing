import type { ValuationLeadInput } from "@/lib/valuation/valuationLeadInput";
import { usd } from "@/lib/format/usd";

/**
 * Markdown body for one run's activity note — the chronology entry attached to
 * the Attio person on every valuation run.
 */
export function leadNoteContent(lead: ValuationLeadInput, today: string): string {
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
