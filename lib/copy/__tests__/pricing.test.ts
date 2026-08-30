import { describe, expect, it } from "vitest";
import { pricingCopy } from "../pricing";

/**
 * Guards the pricing page against advertising plans the api does not sell.
 * Three plans exist in Stripe and in the api's entitlement gate (app#2044):
 * Free ($0), Starter ($19, no trial), Pro ($99, 30-day trial).
 */
describe("pricingCopy plans", () => {
  const byId = (id: string) => pricingCopy.plans.find((p) => p.id === id);

  it("sells exactly Free, Starter and Pro, in that order", () => {
    expect(pricingCopy.plans.map((p) => p.id)).toEqual(["free", "starter", "pro"]);
  });

  it("prices the plans at $0, $19 and $99 a month", () => {
    expect(byId("free")?.price).toBe("$0");
    expect(byId("starter")?.price).toBe("$19");
    expect(byId("pro")?.price).toBe("$99");
    expect(byId("starter")?.period).toBe("/mo");
  });

  it("gives only the Free plan a link target; paid plans start checkout", () => {
    expect(byId("free")?.ctaHref).toMatch(/^https?:\/\//);
    expect(byId("starter")?.ctaHref).toBeUndefined();
    expect(byId("pro")?.ctaHref).toBeUndefined();
  });

  it("highlights Pro only", () => {
    expect(pricingCopy.plans.filter((p) => p.highlighted).map((p) => p.id)).toEqual(["pro"]);
  });

  it("prices credits from the entitlement table, as dollars", () => {
    expect(byId("free")?.features.some((f) => f.startsWith("$3.33 in agent credits"))).toBe(true);
    expect(byId("starter")?.features.some((f) => f.startsWith("$20.00 in agent credits"))).toBe(true);
    expect(byId("pro")?.features.some((f) => f.startsWith("$300.00 in agent credits"))).toBe(true);
  });

  it("states the task cap and shortest cadence on every card", () => {
    expect(byId("free")?.features).toContain("1 scheduled task, weekly at most");
    expect(byId("starter")?.features).toContain("3 scheduled tasks, daily at most");
    expect(byId("pro")?.features).toContain("Unlimited scheduled tasks, hourly at most");
  });

  it("discloses price and cancel terms under each paid CTA", () => {
    expect(byId("pro")?.ctaNote).toBe(
      "$0 today. Card required, cancel anytime before day 30.",
    );
    expect(byId("starter")?.ctaNote).toBe("$19 today. Cancel anytime.");
  });

  it("keeps a book-a-call path for labels", () => {
    expect(pricingCopy.partnerLine.href).toMatch(/^https?:\/\//);
    expect(pricingCopy.partnerLine.cta.length).toBeGreaterThan(0);
  });

  it("makes no claims the product cannot keep", () => {
    const text = JSON.stringify(pricingCopy).toLowerCase();
    expect(text).not.toContain("annual");
    expect(text).not.toContain("switch plans");
    expect(text).not.toContain("1 credit");
  });

  it("uses no em or en dashes in visitor-facing copy", () => {
    expect(JSON.stringify(pricingCopy)).not.toMatch(/[–—]/);
  });

  it("sends both free CTAs to the same place with the same label", () => {
    const free = byId("free");
    expect(pricingCopy.closing.cta).toBe(free?.cta);
    expect(pricingCopy.closing.href).toBe(free?.ctaHref);
  });
});

describe("pricingCopy comparison table", () => {
  it("matches the app /plan table labels (lib/plan/planTable.ts)", () => {
    expect(pricingCopy.comparison.columns.map((c) => c.name)).toEqual([
      "Free",
      "Starter",
      "Pro",
    ]);
    expect(pricingCopy.comparison.columns.map((c) => c.price)).toEqual([
      "$0",
      "$19/mo",
      "$99/mo, 3x credits",
    ]);
    expect(pricingCopy.comparison.rows.map((r) => r.label)).toEqual([
      "Agent credits every month",
      "Report runs it buys",
      "Scheduled tasks",
      "Fastest cadence",
      "Reports emailed to",
      "API keys",
      "Daily social monitoring",
      "Card required",
    ]);
    expect(pricingCopy.comparison.rows.map((r) => r.mobileLabel)).toEqual([
      "Credits a month",
      "Report runs",
      "Tasks",
      "Fastest cadence",
      "Reports emailed to",
      "API keys",
      "Social monitoring",
      "Card required",
    ]);
    for (const row of pricingCopy.comparison.rows) {
      expect(row.values).toHaveLength(3);
    }
  });

  it("keeps the table to the app-approved cell wording", () => {
    const byLabel = Object.fromEntries(pricingCopy.comparison.rows.map((r) => [r.label, r.values]));
    expect(byLabel["Agent credits every month"]).toEqual(["$3.33", "$20", "$300"]);
    expect(byLabel["Report runs it buys"]).toEqual(["~4", "~26", "~391"]);
    expect(byLabel["Scheduled tasks"]).toEqual(["1", "3", "Unlimited"]);
    expect(byLabel["Fastest cadence"]).toEqual(["Weekly", "Daily", "Hourly"]);
    expect(byLabel["Reports emailed to"]).toEqual(["You", "You", "Anyone"]);
    expect(byLabel["API keys"]).toEqual(["check", "check", "check"]);
    expect(byLabel["Daily social monitoring"]).toEqual(["dash", "dash", "check"]);
    expect(byLabel["Card required"]).toEqual(["No", "Yes", "Yes"]);
    const pro = pricingCopy.plans.find((p) => p.id === "pro")!;
    expect(pro.features.some((f) => /api key/i.test(f))).toBe(false);
    expect(JSON.stringify(pricingCopy.faq)).not.toMatch(/Pro adds API keys/);
  });
});
