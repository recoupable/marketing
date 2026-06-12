import { describe, it, expect } from "vitest";
import { formatUsd } from "../formatUsd";

describe("formatUsd", () => {
  it("formats millions with one decimal", () => {
    expect(formatUsd(541_600_000)).toBe("$541.6M");
  });

  it("formats thousands rounded", () => {
    expect(formatUsd(109_400)).toBe("$109K");
  });

  it("formats small amounts rounded", () => {
    expect(formatUsd(660.4)).toBe("$660");
  });
});
