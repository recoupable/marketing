import { describe, expect, it } from "vitest";
import { readinessQuestions } from "../readinessQuestions";
import { recommendReadiness } from "../recommendReadiness";

const ready = Object.fromEntries(readinessQuestions.map((question) => [question.id, question.options[0]]));

describe("recommendReadiness score", () => {
  it("counts the readiness gates passed, out of three", () => {
    expect(recommendReadiness(ready).score).toBe(3);
    expect(recommendReadiness({ ...ready, access: "We are not sure yet" }).score).toBe(2);
    expect(recommendReadiness({ ...ready, workflow: "Still deciding" }).score).toBe(2);
    expect(recommendReadiness({ ...ready, owner: "We need help training the team" }).score).toBe(2);
    expect(recommendReadiness({ ...ready, access: "We are not sure yet", workflow: "Still deciding", owner: "We need help training the team" }).score).toBe(0);
  });
  it("keeps the recommendation tied to the first failed gate", () => {
    expect(recommendReadiness({ ...ready, access: "We are not sure yet" }).title).toBe("Start with the information.");
    expect(recommendReadiness(ready).interest).toBe("Custom systems");
  });
});
