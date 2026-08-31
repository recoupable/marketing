import { existsSync } from "fs";
import path from "path";
import { describe, expect, it } from "vitest";
import { homeCopy } from "../home";
import { pricingCopy } from "../pricing";

const PUBLIC_DIR = path.resolve(__dirname, "../../../public");

/**
 * The proof block is the only product evidence on /pricing. Its screenshot
 * must ship with the page and its quote must be the one the homepage already
 * makes, so the two pages never disagree.
 */
describe("pricingCopy proof", () => {
  it("ships the screenshot it references", () => {
    expect(pricingCopy.proof.image).toMatch(/^\/images\//);
    expect(existsSync(path.join(PUBLIC_DIR, pricingCopy.proof.image))).toBe(true);
  });

  it("describes the screenshot for screen readers", () => {
    expect(pricingCopy.proof.alt.length).toBeGreaterThan(20);
  });

  it("shows the dated production numbers next to the report", () => {
    expect(pricingCopy.proof.stats).toHaveLength(2);
    expect(pricingCopy.proof.stats[0].label).toMatch(/last 30 days/);
    expect(pricingCopy.proof.statsNote).toMatch(/as of \d{4}-\d{2}-\d{2}/);
  });

  it("names the signed-in state per plan without dashes", () => {
    expect(pricingCopy.signedIn.planLabel("pro")).toBe("Your plan: Pro");
    expect(pricingCopy.signedIn.planLabel("free")).toBe("Your plan: Free");
    expect(pricingCopy.signedIn.upgradeCta).toBe("Upgrade to Pro");
    expect(pricingCopy.signedIn.openAppCta).toBe("Open the app");
    expect(JSON.stringify(pricingCopy.signedIn)).not.toMatch(/[–—]/);
  });

  it("reuses the homepage quote verbatim", () => {
    expect(pricingCopy.proof.quote).toBe(homeCopy.proof.quote);
    expect(homeCopy.proof.attribution).toContain(pricingCopy.proof.attribution);
  });
});
