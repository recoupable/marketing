/**
 * "Receipts" comparison rows (W-25) — generic chatbot vs Recoup, in the
 * pm-world product/12 format: numbered experience claims, ✗ alternative vs
 * ✓ ours. Rendered on /platform.
 */

export interface ReceiptRow {
  claim: string;
  generic: string;
  recoup: string;
}

export const RECEIPTS: readonly ReceiptRow[] = [
  {
    claim: "Knows your roster",
    generic: "Starts from zero every chat — you re-explain the artists, the deals, the goals.",
    recoup: "Context loads from your stack: roster, catalog, and deal terms are already there.",
  },
  {
    claim: "Reads the real data",
    generic: "Can't open a royalty statement or query a distributor without you copy-pasting.",
    recoup: "Connects to the systems you allow — royalty data, distribution, Drive — and pulls it itself.",
  },
  {
    claim: "Runs the actual workflow",
    generic: "Gives advice about release plans. You still build the plan.",
    recoup: "Executes the workflow — release plans, diligence reports, content batches — as skills.",
  },
  {
    claim: "Works in your tools",
    generic: "Lives in one chat tab, separate from where work happens.",
    recoup: "Runs in Claude, Cursor, Chat, or your own product over MCP and the API.",
  },
  {
    claim: "You own the output",
    generic: "Workflows live in a vendor's app. Cancel and they're gone.",
    recoup: "Skills and agents live in repos your organization controls. Leave anytime, keep everything.",
  },
] as const;
