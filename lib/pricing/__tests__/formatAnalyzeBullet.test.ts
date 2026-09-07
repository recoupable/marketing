import { describe, expect, it } from "vitest";
import { formatAnalyzeBullet } from "../formatAnalyzeBullet";
import { formatAnalyzeLimit } from "../formatAnalyzeLimit";

describe("formatAnalyzeLimit", () => {
  it("states a cap as a count and no cap as unlimited, in the app table's words", () => {
    expect(formatAnalyzeLimit(5)).toBe("5");
    expect(formatAnalyzeLimit(null)).toBe("Unlimited");
  });
});

describe("formatAnalyzeBullet", () => {
  it("names Free as five tracks a month", () => {
    expect(formatAnalyzeBullet("free")).toBe("5 tracks analyzed a month with Music Flamingo");
  });

  it("names Starter and Pro as unlimited", () => {
    expect(formatAnalyzeBullet("starter")).toBe("Unlimited track analysis with Music Flamingo");
    expect(formatAnalyzeBullet("pro")).toBe("Unlimited track analysis with Music Flamingo");
  });
});
