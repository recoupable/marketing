import { describe, expect, test } from "vitest";
import { getStrategyProject } from "../lib/ai-strategy/getStrategyProject";
import { formatStrategyExample } from "../lib/ai-strategy/formatStrategyExample";
import { aiStrategyCopy as copy } from "../lib/copy/ai-strategy";

describe("automation example handoff", () => {
  test.each(copy.projects)("preserves the selected $id example", (project) => {
    const href = `/contact?workflow=Custom%20systems&strategy=${project.id}`;
    const query = new URL(href, "https://example.test").searchParams;
    expect(getStrategyProject(query.get("strategy"))).toBe(project);
    expect(query.get("workflow")).toBe("Custom systems");
  });
  test.each([
    undefined,
    null,
    "",
    "unknown",
    ["royalty-reporting"],
    { id: "release-prep" },
    "<script>alert(1)</script>",
  ])("ignores invalid or repeated query values: %j", (value) =>
    expect(getStrategyProject(value)).toBeUndefined(),
  );
});

test.each(copy.projects)(
  "$id download includes every prerequisite and the human review",
  (project) => {
    const example = formatStrategyExample(project);
    expect(example).toContain(copy.exampleNote);
    expect(example).toContain(project.review);
    for (const requirement of project.requirements)
      expect(example).toContain(requirement);
    expect(example).toContain(project.firstTest);
    expect(example).toContain(project.measure);
    expect(example).toContain(copy.handoffNote);
    expect(example).not.toMatch(/you have the basics|your project is ready/i);
  },
);
