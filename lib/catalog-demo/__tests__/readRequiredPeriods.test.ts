import { describe, expect, it } from "vitest";
import { northstarFixture } from "../northstarFixture";
import { readRequiredPeriods } from "../readRequiredPeriods";

function withNotes(line: string) {
  return {
    ...northstarFixture,
    sources: {
      ...northstarFixture.sources,
      "deal_notes.txt": [northstarFixture.sources["deal_notes.txt"][0], line],
    },
  };
}

describe("readRequiredPeriods", () => {
  it("reads the required periods and cites the notes line", () => {
    const required = readRequiredPeriods(northstarFixture);
    expect(required.periods).toEqual(["2025-Q1", "2025-Q2", "2025-Q3"]);
    expect(required.source).toEqual({
      file: "deal_notes.txt",
      line: 2,
      text: "required_periods=2025-Q1|2025-Q2|2025-Q3",
    });
  });

  it("rejects a repeated period so one missing period cannot produce two findings", () => {
    expect(() =>
      readRequiredPeriods(
        withNotes("required_periods=2025-Q1|2025-Q3|2025-Q3"),
      ),
    ).toThrow(/required periods/i);
  });
});
