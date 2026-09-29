import { expect, test } from "vitest";
import { generalInterests } from "../../inquiry-topics.ts";
import { startProjectCopy } from "../startProjectCopy.ts";

test("Podcast guest is an inquiry interest", () => {
  expect(generalInterests).toContain("Podcast guest");
});

test("a podcast guest lands on guest copy and skips the project qualification block", () => {
  const copy = startProjectCopy({ interest: "Podcast guest" });
  expect(copy.kicker).toBe("Be a guest");
  expect(copy.title).toMatch(/story/i);
  expect(copy.qualified).toBe(false);
});

test("project interests use project copy without audit language", () => {
  expect(startProjectCopy({ interest: "AI strategy" }).kicker).toBe("Start a project");
  expect(startProjectCopy({ interest: "Custom systems" }).kicker).toBe("Custom AI systems");
  expect(startProjectCopy({ interest: "Custom systems" }).qualified).toBe(true);
});

test("the guest interest is one shared constant", async () => {
  const { podcastGuestInterest } = await import("../../inquiry-topics.ts");
  expect(podcastGuestInterest).toBe("Podcast guest");
  expect(startProjectCopy({ interest: podcastGuestInterest }).qualified).toBe(false);
});

test("project copy makes no audit promise", () => {
  expect(JSON.stringify(startProjectCopy({ interest: "Custom systems" }))).not.toMatch(/audit/i);
});
