import { describe, expect, it } from "vitest";
import { formatUsd } from "../formatUsd";

describe("formatUsd", () => {
  it("formats dollars with at most two decimals", () => {
    expect(formatUsd(1234.5)).toBe("$1,234.50");
    expect(formatUsd(40)).toBe("$40.00");
    expect(formatUsd(0.125)).toBe("$0.13");
  });
});
