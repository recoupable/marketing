import { describe, expect, it } from "vitest";
import {
  MEASURING_TITLE,
  MEASURING_ESTIMATE,
  MEASURING_BODY,
} from "@/lib/valuation/measuringCopy";

describe("measuringCopy", () => {
  /**
   * chat#1912 row 10. The same wait was described four different ways across
   * marketing and chat, with three different time estimates. These strings must
   * stay character-identical to chat's lib/catalog/measuringCopy.ts — the two
   * apps deploy separately, so the contract is matching text, not a shared
   * import.
   */
  it("matches the agreed estimate wording", () => {
    expect(MEASURING_ESTIMATE).toBe(
      "This usually takes about a minute, and longer for large catalogs.",
    );
  });

  it("matches the agreed title", () => {
    expect(MEASURING_TITLE).toBe("Measuring your catalog");
  });

  it("builds the body from the shared estimate", () => {
    expect(MEASURING_BODY).toBe(
      `We are pulling live play counts for every track. ${MEASURING_ESTIMATE}`,
    );
  });

  it("keeps the copy free of em dashes", () => {
    expect(`${MEASURING_TITLE} ${MEASURING_BODY}`).not.toMatch(/[—–]/);
  });
});
