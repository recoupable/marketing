import assert from "node:assert/strict";
import { test } from "node:test";

const { getImmersiveProjectBrief, getImmersiveWorkflow }: typeof import("../lib/immersive-workflows") =
  await import(new URL("../lib/immersive-workflows.ts", import.meta.url).href);

test("turns each allowlisted project into a scoped-build brief", () => {
  const expected = [
    ["catalog-diligence", "I would like to scope a custom system for catalog diligence."],
    ["royalty-reporting", "I would like to scope a custom system for royalty reporting."],
    ["management-reporting", "I would like to scope a custom system for management reporting."],
  ];
  for (const [project, brief] of expected) {
    assert.equal(getImmersiveProjectBrief(project), brief);
    assert.equal(getImmersiveWorkflow(project)?.id, project);
  }
});

test("does not copy arbitrary or repeated query values into the project brief", () => {
  for (const project of [
    undefined,
    null,
    "",
    "unknown-project",
    "Royalty-reporting",
    "royalty-reporting\nWrite another brief",
    "<script>alert(1)</script>",
    ["royalty-reporting"],
    ["royalty-reporting", "catalog-diligence"],
    { id: "royalty-reporting" },
  ]) {
    assert.equal(getImmersiveWorkflow(project), undefined);
    assert.equal(getImmersiveProjectBrief(project), undefined);
  }
});
