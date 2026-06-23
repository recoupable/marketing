import type { User } from "@privy-io/react-auth";
import type { Artist, Result } from "@/components/valuation/types";
import { captureValuationLead } from "@/lib/valuation/captureValuationLead";

/**
 * Capture the valuation lead for a completed run (email + artist + value band →
 * Attio + Telegram), when we have a signed-in email and a value band.
 * Fire-and-forget; must not affect the rendered result.
 */
export function captureRunLead(
  user: User | null,
  artist: Artist,
  result: Result,
): void {
  const email = user?.email?.address;
  if (!email || !result.valueBand) return;
  captureValuationLead({
    email,
    artistName: artist.name,
    artistId: artist.id,
    valueBand: result.valueBand,
    lifetimeStreams: result.totalStreams,
    followerCount: artist.followers,
  });
}
