import type { PlanId } from "@/lib/pricing/entitlements";
import { PLAN_ENTITLEMENTS } from "@/lib/pricing/entitlements";

/**
 * Plan-card bullet for a plan's monthly analyze cap:
 * "5 tracks analyzed a month with Music Flamingo", or unlimited.
 */
export function formatAnalyzeBullet(id: PlanId): string {
  const { analyze_limit } = PLAN_ENTITLEMENTS[id];
  if (analyze_limit === null) return "Unlimited track analysis with Music Flamingo";
  return `${analyze_limit} tracks analyzed a month with Music Flamingo`;
}
