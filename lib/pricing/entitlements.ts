/** Plan ids in selling order; the api resolves the same set from Stripe price ids. */
export const PLAN_IDS = ["free", "starter", "pro"] as const;

export type PlanId = (typeof PLAN_IDS)[number];

export interface PlanEntitlements {
  /** Monthly credit allotment in dollars. */
  credits_usd: number;
  /** Enabled scheduled tasks the plan allows; null is uncapped. */
  task_limit: number | null;
  /** Shortest gap the plan allows between two runs of one task. */
  min_cadence_minutes: number;
}

/**
 * What each plan is entitled to. Mirrors `getPlanEntitlements` in the api
 * (`api/lib/plans/`), which is the source of truth and enforces these numbers
 * on `POST /api/tasks`; the page only advertises what the gate enforces.
 */
export const PLAN_ENTITLEMENTS: Record<PlanId, PlanEntitlements> = {
  free: { credits_usd: 3.33, task_limit: 1, min_cadence_minutes: 10080 },
  starter: { credits_usd: 20, task_limit: 3, min_cadence_minutes: 1440 },
  pro: { credits_usd: 300, task_limit: null, min_cadence_minutes: 60 },
};
