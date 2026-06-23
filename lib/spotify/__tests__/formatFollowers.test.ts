import { describe, expect, it } from "vitest";
import { formatFollowers } from "@/lib/spotify/formatFollowers";

describe("formatFollowers", () => {
  it("drops a trailing .0 for whole millions", () => {
    expect(formatFollowers(113_000_000)).toBe("113M");
    expect(formatFollowers(1_000_000)).toBe("1M");
  });

  it("keeps one decimal for fractional millions", () => {
    expect(formatFollowers(1_200_000)).toBe("1.2M");
  });

  it("rolls 999.5K+ up to 1M instead of '1000K'", () => {
    expect(formatFollowers(999_999)).toBe("1M");
  });

  it("formats thousands and small counts", () => {
    expect(formatFollowers(45_200)).toBe("45K");
    expect(formatFollowers(500)).toBe("500");
  });
});
