import { describe, expect, it } from "vitest";
import { pricingCopy } from "../pricing";

/**
 * Guards the pricing page against advertising plans that cannot be bought.
 * The api exposes exactly one Stripe price (the $99 Pro with a 30-day trial);
 * everything else on the page is the free tier.
 */
describe("pricingCopy plans", () => {
  it("sells exactly the Free and Pro plans, in that order", () => {
    expect(pricingCopy.plans.map((p) => p.id)).toEqual(["free", "pro"]);
  });

  it("never quotes the retired $19 price anywhere in the copy", () => {
    expect(JSON.stringify(pricingCopy)).not.toContain("$19");
  });

  it("gives every plan except Pro a link target", () => {
    for (const plan of pricingCopy.plans) {
      if (plan.id === "pro") expect(plan.ctaHref).toBeUndefined();
      else expect(plan.ctaHref).toMatch(/^https?:\/\//);
    }
  });

  it("prices credits from the real allotments, as dollars", () => {
    const [free, pro] = pricingCopy.plans;
    expect(free.features.some((f) => f.startsWith("$3.33 in agent credits"))).toBe(true);
    expect(pro.features.some((f) => f.startsWith("$99.99 in agent credits"))).toBe(true);
  });

  it("keeps a book-a-call path for labels", () => {
    expect(pricingCopy.partnerLine.href).toMatch(/^https?:\/\//);
    expect(pricingCopy.partnerLine.cta.length).toBeGreaterThan(0);
  });
});
