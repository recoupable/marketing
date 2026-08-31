import { describe, expect, it } from "vitest";
import { buildProofStats } from "../buildProofStats";
import { PROOF_NUMBERS } from "../const";

/**
 * The proof numbers are a dated snapshot of the production database, re-run
 * monthly. They render as formatted counts with the window stated.
 */
describe("buildProofStats", () => {
  it("formats the snapshot as two labelled counts", () => {
    expect(buildProofStats({ reportsSent30d: 1790, artistsOnReports: 69, asOf: "2026-08-29" })).toEqual([
      { value: "1,790", label: "reports emailed in the last 30 days" },
      { value: "69", label: "artists on a scheduled report" },
    ]);
  });

  it("pins the current snapshot to a real query date", () => {
    expect(PROOF_NUMBERS.asOf).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(PROOF_NUMBERS.reportsSent30d).toBeGreaterThan(0);
    expect(PROOF_NUMBERS.artistsOnReports).toBeGreaterThan(0);
  });
});
