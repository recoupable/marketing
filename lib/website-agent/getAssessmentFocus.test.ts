import { describe, expect, it } from "vitest";
import type { Assessment } from "./scorecard";
import { getAssessmentFocus } from "./getAssessmentFocus";
import { getAssessmentProfile } from "./getAssessmentProfile";
import { scorecardRubric } from "./scorecardRubric";

const scope = {
  summary: "Cross-functional use at our company",
  quote: "I lead cross-functional AI use at our company.",
};
const priority = {
  summary: "Faster answers about our catalog",
  quote: "We want faster answers about our catalog.",
};
const criteria: Assessment["criteria"] = scorecardRubric.flatMap((area) =>
  area.criteria.map((criterion) => ({
    id: criterion.id,
    status: "yes" as const,
    quote: `We do this today: ${criterion.label}.`,
  })),
);

describe("assessment conversation focus", () => {
  it("starts with scope, then stays with actual capabilities instead of asking a goal", () => {
    const assessment: Assessment = {
      scope: null,
      priority: null,
      criteria: [],
    };
    expect(getAssessmentFocus(assessment).topic).toBe("scope");
    expect(getAssessmentFocus({ ...assessment, scope })).toMatchObject({
      phase: "current_setup",
      topic: "knowledge",
    });
  });

  it("finishes answer quality before moving to workflows or future wishes", () => {
    expect(
      getAssessmentFocus({
        scope,
        priority: null,
        criteria: criteria.slice(0, 2),
      }),
    ).toMatchObject({
      topic: "knowledge",
      criteria: ["knowledge_checks"],
    });
    expect(
      getAssessmentFocus({
        scope,
        priority: null,
        criteria: criteria.slice(0, 3),
      }).topic,
    ).toBe("workflows");
  });

  it("keeps volunteered ambitions separate from evidence of present results", () => {
    const assessment: Assessment = { scope, priority, criteria: [] };
    expect(getAssessmentFocus(assessment).topic).toBe("knowledge");
    expect(getAssessmentProfile(assessment).areas.at(-1)?.level).toBeNull();
  });

  it("uses rich answers to skip topics already understood, regardless of patch order", () => {
    const richAnswer = {
      scope,
      priority: null,
      criteria: criteria.slice(0, 12).reverse(),
    };
    expect(getAssessmentFocus(richAnswer)).toMatchObject({
      phase: "current_setup",
      topic: "results",
    });
  });

  it("moves past explicitly unknown answers without scoring them as absent", () => {
    const assessment: Assessment = {
      scope,
      priority: null,
      criteria: criteria.slice(0, 3).map((criterion) => ({
        ...criterion,
        status: "unknown",
        quote: null,
      })),
    };
    expect(getAssessmentFocus(assessment).topic).toBe("workflows");
    expect(getAssessmentProfile(assessment).areas[0].level).toBeNull();
    assessment.criteria.push(...criteria.slice(3));
    expect(getAssessmentFocus(assessment)).toMatchObject({
      phase: "current_setup",
      topic: "clarification",
      criteria: ["knowledge_use", "knowledge_records", "knowledge_checks"],
    });
  });

  it("opens the priority discussion only after all current areas are understood", () => {
    expect(
      getAssessmentFocus({ scope, priority: null, criteria }),
    ).toMatchObject({
      phase: "priorities",
      topic: "priority",
    });
    expect(getAssessmentFocus({ scope, priority, criteria }).topic).toBe(
      "review",
    );
  });
});
