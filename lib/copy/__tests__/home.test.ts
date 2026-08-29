import { describe, expect, it } from "vitest";
import { homeCopy, homeToMarkdown } from "../home";
import { pricingCopy } from "../pricing";

/**
 * The homepage's job is to get a visitor to the aha moment (the valuation,
 * which needs no account until the result) and to show the plans before the
 * closing pitch (app#2044 row 11). Guards the CTAs and the strip copy.
 */
describe("homeCopy CTAs", () => {
  it("makes the free valuation the primary call to action", () => {
    expect(homeCopy.hero.ctaPrimary).toBe("Value your catalog free");
    expect(homeCopy.hero.ctaHref).toBe("https://recoupable.dev/valuation");
    expect(homeCopy.closing.ctaLabel).toBe("Value your catalog free");
    expect(homeCopy.closing.ctaHref).toBe("https://recoupable.dev/valuation");
  });

  it("keeps the app sign-up as the secondary action", () => {
    expect(homeCopy.hero.ctaSecondary).toBe("Get started");
    expect(homeCopy.hero.ctaSecondaryHref).toBe("https://teams.recoupable.dev");
    expect(homeCopy.closing.ctaSecondaryLabel).toBe("Get started free");
    expect(homeCopy.closing.ctaSecondaryHref).toBe("https://teams.recoupable.dev");
  });

  it("introduces the pricing strip and points at the full comparison", () => {
    expect(homeCopy.pricingStrip.eyebrow).toBe("Pricing");
    expect(homeCopy.pricingStrip.title.length).toBeGreaterThan(0);
    expect(homeCopy.pricingStrip.compareLabel).toBe("Compare plans");
    expect(homeCopy.pricingStrip.compareHref).toBe("/pricing");
  });

  it("uses no em or en dashes in the new copy", () => {
    const fresh = JSON.stringify([homeCopy.hero, homeCopy.closing, homeCopy.pricingStrip]);
    expect(fresh).not.toMatch(/[–—]/);
  });

  it("shows the same three plans on the strip as on /pricing", () => {
    expect(pricingCopy.plans.map((p) => p.id)).toEqual(["free", "starter", "pro"]);
  });

  it("lists both hero actions in the machine markdown", () => {
    const md = homeToMarkdown(homeCopy);
    expect(md).toContain("[Value your catalog free](https://recoupable.dev/valuation)");
    expect(md).toContain("[Get started](https://teams.recoupable.dev)");
  });
});
