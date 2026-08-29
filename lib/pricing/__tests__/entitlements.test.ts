import { describe, expect, it } from "vitest";
import { PLAN_ENTITLEMENTS, PLAN_IDS } from "../entitlements";
import { formatCadence } from "../formatCadence";
import { formatTaskLimit } from "../formatTaskLimit";

/**
 * Mirrors `getPlanEntitlements` in the api (app#2044 row 3). The page may
 * only advertise what the gate enforces, so the numbers are pinned here.
 */
describe("PLAN_ENTITLEMENTS", () => {
  it("lists the three plans in selling order", () => {
    expect(PLAN_IDS).toEqual(["free", "starter", "pro"]);
  });

  it("pins the api's entitlement table", () => {
    expect(PLAN_ENTITLEMENTS.free).toEqual({
      credits_usd: 3.33,
      task_limit: 1,
      min_cadence_minutes: 10080,
    });
    expect(PLAN_ENTITLEMENTS.starter).toEqual({
      credits_usd: 20,
      task_limit: 3,
      min_cadence_minutes: 1440,
    });
    expect(PLAN_ENTITLEMENTS.pro).toEqual({
      credits_usd: 300,
      task_limit: null,
      min_cadence_minutes: 60,
    });
  });
});

describe("formatCadence", () => {
  it("names the shortest cadence in plain words", () => {
    expect(formatCadence(10080)).toBe("Weekly");
    expect(formatCadence(1440)).toBe("Daily");
    expect(formatCadence(60)).toBe("Hourly");
  });

  it("falls back to minutes for anything else", () => {
    expect(formatCadence(30)).toBe("Every 30 minutes");
  });
});

describe("formatTaskLimit", () => {
  it("states a cap as a count and no cap as unlimited", () => {
    expect(formatTaskLimit(1)).toBe("1 task");
    expect(formatTaskLimit(3)).toBe("3 tasks");
    expect(formatTaskLimit(null)).toBe("Unlimited tasks");
  });
});
