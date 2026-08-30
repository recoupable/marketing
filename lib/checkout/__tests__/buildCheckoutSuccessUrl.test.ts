import { describe, expect, it } from "vitest";
import { buildCheckoutSuccessUrl } from "@/lib/checkout/buildCheckoutSuccessUrl";

/**
 * Stripe substitutes the literal `{CHECKOUT_SESSION_ID}` in the success URL;
 * an encoded placeholder is passed through untouched and the app cannot claim
 * the subscription (app#2044 row 10).
 */
describe("buildCheckoutSuccessUrl", () => {
  it("lands in the app with checkout=success, attribution, and the raw session placeholder", () => {
    const url = buildCheckoutSuccessUrl("pro");
    expect(url.startsWith("https://teams.recoupable.dev/?")).toBe(true);
    expect(url).toContain("checkout=success");
    expect(url).toContain("utm_source=marketing");
    expect(url).toContain("utm_campaign=pro-trial");
    expect(url.endsWith("&session_id={CHECKOUT_SESSION_ID}")).toBe(true);
    expect(url).not.toContain("%7B");
  });

  it("tags the Starter campaign", () => {
    expect(buildCheckoutSuccessUrl("starter")).toContain("utm_campaign=starter");
  });
});
