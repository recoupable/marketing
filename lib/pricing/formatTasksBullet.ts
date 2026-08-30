import type { PlanId } from "@/lib/pricing/entitlements";
import { PLAN_ENTITLEMENTS } from "@/lib/pricing/entitlements";
import { formatCadence } from "@/lib/pricing/formatCadence";
import { formatTaskLimit } from "@/lib/pricing/formatTaskLimit";

/**
 * Plan-card bullet for a plan's task cap and cadence floor:
 * "1 scheduled task, weekly at most".
 */
export function formatTasksBullet(id: PlanId): string {
  const { task_limit, min_cadence_minutes } = PLAN_ENTITLEMENTS[id];
  const tasks = formatTaskLimit(task_limit).replace(/tasks?$/, (n) => `scheduled ${n}`);
  return `${tasks}, ${formatCadence(min_cadence_minutes).toLowerCase()} at most`;
}
