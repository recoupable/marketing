import type { Band } from "@/components/valuation/types";

/** Server-side input for persisting a valuation lead to Attio (chat#1798). */
export type ValuationLeadInput = {
  email: string;
  artistName: string;
  artistId: string;
  valueBand: Band;
  lifetimeStreams: number;
  followerCount?: number;
};
