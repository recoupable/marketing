import { PLAN_ENTITLEMENTS, PLAN_IDS } from "@/lib/pricing/entitlements";
import { formatCadence } from "@/lib/pricing/formatCadence";

export interface ComparisonRow {
  label: string;
  /** One cell per plan, in `PLAN_IDS` order. */
  values: string[];
}

const perPlan = (f: (id: (typeof PLAN_IDS)[number]) => string) => PLAN_IDS.map(f);

/**
 * The comparison table under the plan cards. Numeric rows derive from the
 * entitlement table so the page cannot drift from the gate; the yes/no rows
 * name the Pro-only gates in the api (roster scrape, recipients, API keys).
 */
export function buildComparisonRows(reportRunUsd: number): ComparisonRow[] {
  return [
    {
      label: "Monthly credits",
      values: perPlan((id) => `$${PLAN_ENTITLEMENTS[id].credits_usd.toFixed(2)}`),
    },
    {
      label: "Report runs that buys",
      values: perPlan(
        (id) => `About ${Math.floor(PLAN_ENTITLEMENTS[id].credits_usd / reportRunUsd)}`,
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
      label: "Shortest cadence",
      values: perPlan((id) => formatCadence(PLAN_ENTITLEMENTS[id].min_cadence_minutes)),
    },
    { label: "Report recipients", values: ["You", "You", "Anyone you choose"] },
    { label: "Roster monitoring", values: ["No", "No", "Daily, every artist"] },
    { label: "API keys", values: ["No", "No", "Yes"] },
    { label: "Card required", values: ["No", "Yes", "Yes, $0 for 30 days"] },
  ];
}
