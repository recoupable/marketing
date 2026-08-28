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

  it("reuses the homepage quote verbatim", () => {
    expect(pricingCopy.proof.quote).toBe(homeCopy.proof.quote);
    expect(pricingCopy.proof.attribution).toBe(homeCopy.proof.attribution);
  });
});
