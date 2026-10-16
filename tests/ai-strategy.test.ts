import { describe, expect, test } from "vitest";
import { assessProject } from "../lib/ai-strategy/assessProject";
import { formatStrategyBrief } from "../lib/ai-strategy/formatStrategyBrief";
import {
  strategySchema,
  type StrategyInput,
} from "../lib/ai-strategy/strategySchema";
import { parseAgentDraft } from "../lib/agent-draft";

const project: StrategyInput = {
  workflow: "Weekly catalog report",
  outcome: "Deliver a reviewed exceptions list before the finance meeting",
  purpose: "capacity",
  owner: "Finance lead",
  access: "yes",
  example: "yes",
  review: "yes",
  baseline: "yes",
  reviewDate: "2099-11-02",
  success: "Less total human time with no loss of acceptance quality",
  stop: "Incorrect matches or longer review and correction time",
};

describe("first-project decisions", () => {
  test("an unknown prerequisite cannot count as ready, and every gap remains visible", () => {
    const result = assessProject({
      ...project,
      access: "unknown",
      review: "no",
      baseline: "unknown",
    });
    expect(result.ready).toBe(false);
    expect(result.gaps).toHaveLength(3);
    expect(result.gaps.join(" ")).toMatch(
      /permission.*reviewer.*task takes today/,
    );
  });
  test.each(["access", "example", "review", "baseline"] as const)(
    "%s alone prevents readiness",
    (key) => {
      expect(assessProject({ ...project, [key]: "no" }).ready).toBe(false);
      expect(assessProject({ ...project, [key]: "unknown" }).ready).toBe(false);
    },
  );
  test("confirmed prerequisites permit scoping a test", () =>
    expect(assessProject(project)).toEqual({ ready: true, gaps: [] }));
});

test("the exported maximum-size brief survives the existing inquiry draft contract", () => {
  const input = strategySchema.parse({
    ...project,
    workflow: "W".repeat(180),
    outcome: "O".repeat(400),
    owner: "N".repeat(100),
    success: "S".repeat(400),
    stop: "T".repeat(400),
    access: "unknown",
    example: "unknown",
    review: "unknown",
    baseline: "unknown",
  });
  const draft = {
    interest: "AI strategy",
    message: formatStrategyBrief(input),
  };
  const now = Date.now();
  expect(
    parseAgentDraft(JSON.stringify({ draft, expiresAt: now + 3_600_000 }), now),
  ).toEqual(draft);
  expect(draft.message).toContain(input.stop);
  expect(draft.message).toContain("Not sure yet");
});

test("calendar dates and substantive text are validated", () => {
  expect(
    strategySchema.safeParse({ ...project, reviewDate: "2026-02-30" }).success,
  ).toBe(false);
  expect(
    strategySchema.safeParse({ ...project, outcome: "          " }).success,
  ).toBe(false);
});

test("measurement guidance changes with the test purpose", () => {
  expect(formatStrategyBrief(project)).toContain("confirmed budget change");
  expect(formatStrategyBrief({ ...project, purpose: "feasibility" })).toContain(
    "corrections, and failures",
  );
  expect(formatStrategyBrief({ ...project, purpose: "revenue" })).toContain(
    "comparable group",
  );
});
