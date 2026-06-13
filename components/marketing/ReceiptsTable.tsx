import { RECEIPTS } from "@/lib/copy/receipts";

/**
 * ✗/✓ experience-claims table (W-25) — the pm-world "receipts" pattern:
 * numbered claims, generic-chatbot column vs Recoup column.
 */
export function ReceiptsTable() {
  return (
    <div className="space-y-0" data-testid="receipts-table">
      <div className="hidden sm:grid grid-cols-[44px_1fr_1fr_1fr] gap-6 pb-3 border-b border-(--border)">
        <span />
        <span className="font-ui text-[11px] font-semibold text-(--foreground)/35 uppercase tracking-[0.16em]">
          The claim
        </span>
        <span className="font-ui text-[11px] font-semibold text-(--foreground)/35 uppercase tracking-[0.16em]">
          Generic chatbot
        </span>
        <span className="font-ui text-[11px] font-semibold text-(--foreground)/35 uppercase tracking-[0.16em]">
          Recoup
        </span>
      </div>
      {RECEIPTS.map((row, i) => (
        <div
          key={row.claim}
          className="grid sm:grid-cols-[44px_1fr_1fr_1fr] gap-2 sm:gap-6 py-5 border-b border-(--border)"
        >
          <span className="font-pixel text-[15px] text-(--foreground)/30">
            {String(i + 1).padStart(2, "0")}
          </span>
          <p className="font-ui font-bold text-[15px] text-(--foreground) leading-snug">
            {row.claim}
          </p>
          <p className="text-[13px] text-(--foreground)/50 leading-relaxed">
            <span aria-hidden className="mr-1.5 text-(--foreground)/35">✗</span>
            {row.generic}
          </p>
          <p className="text-[13px] text-(--foreground)/70 leading-relaxed">
            <span aria-hidden className="mr-1.5">✓</span>
            {row.recoup}
          </p>
        </div>
      ))}
    </div>
  );
}
