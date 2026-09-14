export const billingCycles = ["monthly", "annual"] as const;
export type BillingCycle = (typeof billingCycles)[number];
export const annualDiscountPercent = 20;

export const pricingPlans = [
  {
    id: "platform",
    name: "Recoup Cloud",
    kind: "Self-serve",
    monthlyCents: 9900,
    description: "The tools and music skills. You take it from here.",
    includes: "Your workspace includes",
    features: ["Recoup Cloud access", "Music skill pack", "Artist context and research", "Content and recurring workflows"],
    detail: "For people who want to run the work themselves.",
    action: "Open Recoup Cloud",
  },
  {
    id: "advisory",
    name: "Advisory",
    kind: "Advisory + consulting",
    monthlyCents: 99900,
    description: "An expert in your corner. A clear plan for your team.",
    includes: "Guidance for your business",
    features: ["AI strategy and workflow review", "A prioritized action plan", "Advice on tools and implementation", "Team coaching and adoption"],
    detail: "You lead implementation. We help you get it right.",
    action: "Talk about advisory",
  },
  {
    id: "partner",
    name: "Build + Partner",
    kind: "Hands-on delivery",
    monthlyCents: 999900,
    description: "Your AI build partner. From the first idea to daily use.",
    includes: "A team to put AI to work",
    features: ["Custom agents and applications", "Connections to your tools and data", "Testing, documentation, and handoff", "Team training and ongoing improvements"],
    detail: "We agree on the build scope and delivery schedule together.",
    action: "Discuss your build",
  },
] as const;

export type PricingPlanId = (typeof pricingPlans)[number]["id"];
export type InquiryPlanId = Exclude<PricingPlanId, "platform"> | "enterprise";
export type PricingSelection = { plan: InquiryPlanId; billing: BillingCycle };

export function formatUsd(cents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency", currency: "USD",
    minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(cents / 100);
}

export function planPrice(planId: PricingPlanId, billing: BillingCycle) {
  const plan = pricingPlans.find((item) => item.id === planId)!;
  // Round the discounted monthly equivalent down to whole dollars before annualizing.
  const monthlyCents = billing === "annual"
    ? Math.floor(plan.monthlyCents * (100 - annualDiscountPercent) / 10_000) * 100
    : plan.monthlyCents;
  const billedCents = billing === "annual" ? monthlyCents * 12 : monthlyCents;
  return {
    monthlyCents, billedCents,
    monthly: formatUsd(monthlyCents),
    billed: formatUsd(billedCents),
    annualSavings: formatUsd(plan.monthlyCents * 12 - monthlyCents * 12),
    terms: billing === "annual" ? `${formatUsd(billedCents)} billed annually` : "Billed monthly",
  };
}

export function pricingInquiryHref(plan: InquiryPlanId, billing: BillingCycle = "monthly") {
  return `/start-project?${new URLSearchParams({ plan, ...(plan === "enterprise" ? {} : { billing }) })}`;
}

export function parsePricingSelection(
  plan: string | string[] | undefined,
  billing: string | string[] | undefined,
): PricingSelection | undefined {
  if (plan !== "advisory" && plan !== "partner" && plan !== "enterprise") return undefined;
  if (billing !== undefined && billing !== "monthly" && billing !== "annual") return undefined;
  return { plan, billing: plan === "enterprise" ? "monthly" : billing ?? "monthly" };
}

export function pricingSelectionLabel(selection: PricingSelection) {
  if (selection.plan === "enterprise") return "Enterprise · Custom engagement";
  const plan = pricingPlans.find((item) => item.id === selection.plan)!;
  const price = planPrice(plan.id, selection.billing);
  return `${plan.name} · Starting at ${price.monthly}/month · ${price.terms}`;
}

export function pricingSummary() {
  return pricingPlans.map((plan) => {
    const annual = planPrice(plan.id, "annual");
    return `${plan.name}: ${formatUsd(plan.monthlyCents)}/month, or ${annual.monthly}/month billed annually at ${annual.billed}. ${plan.description} Includes: ${plan.features.join("; ")}.`;
  });
}
