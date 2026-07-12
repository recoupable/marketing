import { describe, it, expect } from "vitest";
import { proportionalShare } from "../proportionalShare";

describe("proportionalShare", () => {
  it("allocates the central value proportionally to streams", () => {
    expect(proportionalShare(25, 100, 1_000_000)).toBe(250_000);
  });

  it("returns 0 when nothing has been measured", () => {
    expect(proportionalShare(25, 0, 1_000_000)).toBe(0);
  });
});
