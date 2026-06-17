import type { Band } from "@/components/valuation/types";

export type ValuationLead = {
  email: string;
  artistName: string;
  valueBand: Band;
};

/**
 * Fire-and-forget the valuation lead on run success (chat#1798): the signed-in
 * email + looked-up artist + value band → our own `/api/valuation/lead` route,
 * which upserts Attio and pings Telegram server-side. Best-effort — a
 * notification failure must never affect the rendered valuation, so this never
 * awaits or throws.
 */
export function captureValuationLead(lead: ValuationLead): void {
  void fetch("/api/valuation/lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(lead),
  }).catch(() => {});
}
