import { homeCopy } from "./home.ts";
import {
  annualDiscountPercent,
  billingCycles,
  planPrice,
  pricingInquiryHref,
  pricingPlans,
} from "../pricing.ts";
import { absoluteUrl } from "../seo.ts";

export function homePricingMarkdown(): string {
  const copy = homeCopy.engagements;
  return [
    `## ${copy.eyebrow}: ${copy.title}`,
    "Choose your billing: Monthly or Annually. Annual prices show the monthly equivalent, with the full annual charge listed alongside.",
    `Save ${annualDiscountPercent}% or more annually`,
    ...pricingPlans
      .filter((plan) => plan.id !== "platform")
      .flatMap((plan) => {
        const build = plan.id === "partner";
        const action = build ? copy.partnerAction : copy.advisoryAction;
        return [
          `### ${plan.name}`,
          build ? copy.partner : copy.advisory,
          ...billingCycles.map((cycle) => {
            const price = planPrice(plan.id, cycle);
            return `- ${cycle === "monthly" ? "Monthly" : "Annually"}: ${copy.startingAt} ${price.monthly} / month. USD · ${price.terms}. [${action}](${absoluteUrl(pricingInquiryHref(plan.id, cycle))})`;
          }),
          ...(build ? [copy.scope] : []),
        ];
      }),
    `[${copy.compare}](${absoluteUrl("/pricing")})`,
  ].join("\n\n");
}
