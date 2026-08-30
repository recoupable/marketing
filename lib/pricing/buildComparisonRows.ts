import { PLAN_ENTITLEMENTS, PLAN_IDS } from "@/lib/pricing/entitlements";
import { formatCadence } from "@/lib/pricing/formatCadence";

export interface ComparisonRow {
  label: string;
  /** One cell per plan, in `PLAN_IDS` order. */
  values: string[];
}

const perPlan = (f: (id: (typeof PLAN_IDS)[number]) => string) => PLAN_IDS.map(f);

/** Match app `/plan` (`lib/plan/planTable.ts`): `$20` not `$20.00`. */
const formatCreditsCell = (usd: number) =>
  `$${usd.toFixed(2).replace(/\.00$/, "")}`;

/**
 * The comparison table under the plan cards. Labels and cell wording match
 * the app `/plan` table (`PLAN_TABLE_ROWS` in `lib/plan/planTable.ts`) so the
 * two surfaces stay in sync. Numeric rows still derive from `PLAN_ENTITLEMENTS`
 * (mirrors the api gate). `check` / `dash` render as icons in ComparisonTable.
 */
export function buildComparisonRows(reportRunUsd: number): ComparisonRow[] {
  return [
    {
      label: "Agent credits every month",
      values: perPlan((id) => formatCreditsCell(PLAN_ENTITLEMENTS[id].credits_usd)),
    },
    {
      label: "Report runs that buys",
      values: perPlan(
        (id) => `~${Math.floor(PLAN_ENTITLEMENTS[id].credits_usd / reportRunUsd)}`,
      ),
    },
    {
      label: "Scheduled tasks",
      values: perPlan((id) => {
        const limit = PLAN_ENTITLEMENTS[id].task_limit;
        return limit === null ? "Unlimited" : String(limit);
      }),
    },
    {
      label: "Fastest cadence",
      values: perPlan((id) => formatCadence(PLAN_ENTITLEMENTS[id].min_cadence_minutes)),
    },
    { label: "Reports emailed to", values: ["You", "You", "Anyone"] },
    { label: "API keys", values: ["check", "check", "check"] },
    { label: "Daily social monitoring", values: ["dash", "dash", "check"] },
    { label: "Card required", values: ["No", "Yes", "Yes"] },
  ];
}
