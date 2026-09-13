import { describe, expect, it } from "vitest";
import { readinessQuestions } from "../readinessQuestions";
import { readinessScore } from "../readinessScore";
import { recommendReadiness } from "../recommendReadiness";

const ready = Object.fromEntries(readinessQuestions.map((question) => [question.id, question.options[0]]));

describe("readinessScore", () => {
  it("counts the readiness gates passed, out of three", () => {
    expect(readinessScore(ready)).toBe(3);
    expect(readinessScore({ ...ready, access: "We are not sure yet" })).toBe(2);
    expect(readinessScore({ ...ready, workflow: "Still deciding" })).toBe(2);
    expect(readinessScore({ ...ready, owner: "We need help training the team" })).toBe(2);
    expect(readinessScore({ ...ready, access: "We are not sure yet", workflow: "Still deciding", owner: "We need help training the team" })).toBe(0);
  });
});

describe("recommendReadiness", () => {
  it("ties the recommendation to the first failed gate and exposes no score", () => {
    expect(recommendReadiness({ ...ready, access: "We are not sure yet" }).title).toBe("Start with the information.");
    expect(recommendReadiness(ready).interest).toBe("Custom systems");
    expect(Object.keys(recommendReadiness(ready)).sort()).toEqual(["description", "interest", "steps", "title"]);
  });
});
