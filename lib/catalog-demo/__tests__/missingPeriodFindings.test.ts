import { describe, expect, it } from "vitest";
import { missingPeriodFindings } from "../missingPeriodFindings";

const required = {
  periods: ["2025-Q1"],
  source: {
    file: "deal_notes.txt" as const,
    line: 2,
    text: "required_periods=2025-Q1",
  },
};

describe("missingPeriodFindings", () => {
  it("names the supplied periods when there are some", () => {
    const [finding] = missingPeriodFindings(
      { ...required, periods: ["2025-Q1", "2025-Q2"] },
      ["2025-Q1"],
      [],
    );
    expect(finding.explanation).toContain(
      "The supplied statement contains 2025-Q1 only.",
    );
  });

  it("stays a full sentence when no statement rows were supplied", () => {
    const [finding] = missingPeriodFindings(required, [], []);
    expect(finding.explanation).toContain("No statement has been supplied.");
    expect(finding.explanation).not.toMatch(/contains\s+only/);
  });
});
