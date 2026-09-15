import { expect, test } from "vitest";
import { generalInterests } from "../../inquiry-topics.ts";
import { startProjectCopy } from "../startProjectCopy.ts";

test("Podcast guest is an inquiry interest", () => {
  expect(generalInterests).toContain("Podcast guest");
});

test("a podcast guest lands on guest copy and skips the project qualification block", () => {
  const copy = startProjectCopy({ interest: "Podcast guest", freeAudit: true });
  expect(copy.kicker).toBe("Be a guest");
  expect(copy.title).toMatch(/story/i);
  expect(copy.qualified).toBe(false);
});

test("every other interest keeps the free-audit or project copy", () => {
  expect(startProjectCopy({ interest: "AI strategy", freeAudit: true }).kicker).toBe("Free AI audit");
  expect(startProjectCopy({ interest: "Custom systems", freeAudit: false }).kicker).toBe("Start a project");
  expect(startProjectCopy({ interest: "Custom systems", freeAudit: false }).qualified).toBe(true);
});
