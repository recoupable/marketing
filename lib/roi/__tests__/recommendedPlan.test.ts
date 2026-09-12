import { describe, expect, it } from "vitest";
import { recommendedPlan } from "../recommendedPlan";

describe("recommendedPlan", () => {
  it("suggests the plan the modeled monthly value could fund", () => {
    expect(recommendedPlan({ monthlyNetValue: 12_000 })).toBe("partner");
    expect(recommendedPlan({ monthlyNetValue: 9_999 })).toBe("partner");
    expect(recommendedPlan({ monthlyNetValue: 2_500 })).toBe("advisory");
    expect(recommendedPlan({ monthlyNetValue: 999 })).toBe("advisory");
    expect(recommendedPlan({ monthlyNetValue: 400 })).toBe("platform");
    expect(recommendedPlan({ monthlyNetValue: -50 })).toBe("platform");
  });
});
