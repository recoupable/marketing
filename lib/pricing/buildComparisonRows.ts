import { PLAN_ENTITLEMENTS, PLAN_IDS } from "@/lib/pricing/entitlements";
import { formatCadence } from "@/lib/pricing/formatCadence";

export interface ComparisonColumn {
  name: string;
  price: string;
  /** Under 640px; omit to reuse `price`. */
  mobilePrice?: string;
}

export interface ComparisonRow {
  label: string;
  /** Under 640px the label column is narrow (mirrors app `PlanTableRow`). */
  mobileLabel: string;
  /** One cell per plan, in `PLAN_IDS` order. */
  values: string[];
}

const perPlan = (f: (id: (typeof PLAN_IDS)[number]) => string) => PLAN_IDS.map(f);

/** Match app `/plan` (`lib/plan/planTable.ts`): `$20` not `$20.00`. */
const formatCreditsCell = (usd: number) =>
  `$${usd.toFixed(2).replace(/\.00$/, "")}`;

/** Plan headers — same names/prices as app `PLAN_COLUMNS`. */
export const COMPARISON_COLUMNS: ComparisonColumn[] = [
  { name: "Free", price: "$0" },
  { name: "Starter", price: "$19/mo" },
  { name: "Pro", price: "$99/mo, 3x credits", mobilePrice: "$99/mo, 3x" },
];

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
      mobileLabel: "Credits a month",
      values: perPlan((id) => formatCreditsCell(PLAN_ENTITLEMENTS[id].credits_usd)),
    },
    {
      label: "Report runs that buys",
      mobileLabel: "Report runs",
      values: perPlan(
        (id) => `~${Math.floor(PLAN_ENTITLEMENTS[id].credits_usd / reportRunUsd)}`,
      ),
    },
    {
      label: "Scheduled tasks",
      mobileLabel: "Tasks",
      values: perPlan((id) => {
        const limit = PLAN_ENTITLEMENTS[id].task_limit;
        return limit === null ? "Unlimited" : String(limit);
      }),
    },
    {
      label: "Fastest cadence",
      mobileLabel: "Fastest cadence",
      values: perPlan((id) => formatCadence(PLAN_ENTITLEMENTS[id].min_cadence_minutes)),
    },
    {
      label: "Reports emailed to",
      mobileLabel: "Reports emailed to",
      values: ["You", "You", "Anyone"],
    },
    { label: "API keys", mobileLabel: "API keys", values: ["check", "check", "check"] },
    {
      label: "Daily social monitoring",
      mobileLabel: "Social monitoring",
      values: ["dash", "dash", "check"],
    },
    { label: "Card required", mobileLabel: "Card required", values: ["No", "Yes", "Yes"] },
  ];
}
