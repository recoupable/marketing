import type { Band } from "@/components/valuation/types";

/** Server-side input for persisting a valuation lead to Attio (chat#1798). */
export type ValuationLeadInput = {
  email: string;
  artistName: string;
  artistId: string;
  valueBand: Band;
  /** Lifetime stream total, when known. The server-side valuation endpoint
   * (docs#272) returns a band but no stream count, so this may be absent. */
  lifetimeStreams?: number;
  followerCount?: number;
};
