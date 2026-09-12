import { pricingPlans, type PricingPlanId } from "../pricing.ts";

/** The plan a modeled monthly value could fund: the analytics label for a computed scenario, never a quote. */
export function recommendedPlan(result: { monthlyNetValue: number }): PricingPlanId {
  const affords = (id: PricingPlanId) => result.monthlyNetValue >= pricingPlans.find((plan) => plan.id === id)!.monthlyCents / 100;
  if (affords("partner")) return "partner";
  if (affords("advisory")) return "advisory";
  return "platform";
}
