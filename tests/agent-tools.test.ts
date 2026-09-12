import assert from "node:assert/strict";
import test from "node:test";
import { agentToolDefinitions, AgentToolInputError, executeUtilityTool, isUtilityToolName } from "../lib/agent-tools.ts";
import { calculateWorkflowROI, readinessQuestions, recommendReadiness } from "../lib/marketing-migration-tools.ts";

const assumptions = { monthlyHours: 40, hourlyCost: 40, timeReduction: 50, monthlySystemCost: 100, setupCost: 2500 };
const answers = Object.fromEntries(readinessQuestions.map(question => [question.id, question.options[0]]));
const brief = { workflow: "Our finance team reconciles royalty statements by hand.", desiredOutcome: "Prepare a report with unresolved differences ready for review." };

function invalid(run: () => unknown, field?: string) {
  assert.throws(run, error => {
    assert.ok(error instanceof AgentToolInputError);
    assert.equal(error.code, "INVALID_INPUT");
    if (field) assert.ok(error.issues.some(issue => issue.field === field), JSON.stringify(error.issues));
    return true;
  });
}

test("the five public tool contracts distinguish content reading from local utilities", () => {
  assert.deepEqual(agentToolDefinitions.map(tool => tool.name), ["search_recoup", "read_recoup_page", "estimate_workflow_roi", "assess_workflow_readiness", "prepare_project_brief"]);
  assert.ok(agentToolDefinitions.every(tool => tool.annotations.readOnlyHint && tool.inputSchema.additionalProperties === false));
  assert.equal(isUtilityToolName("prepare_project_brief"), true);
  assert.equal(isUtilityToolName("search_recoup"), false);
  assert.throws(() => executeUtilityTool("submit_lead", {}), error => error instanceof AgentToolInputError && error.code === "UNKNOWN_TOOL");
});

test("ROI uses the visible calculator, preserves assumptions, and explains units and limits", () => {
  const result = executeUtilityTool("estimate_workflow_roi", assumptions);
  assert.equal(result.status, "calculated");
  if (result.status !== "calculated") assert.fail();
  assert.deepEqual(result.result, calculateWorkflowROI(assumptions));
  assert.deepEqual(result.assumptions, assumptions);
  assert.equal(result.units.capacityValue, "USD/month");
  assert.match(result.interpretation, /not guaranteed cash savings/);
  assert.deepEqual(assumptions, { monthlyHours: 40, hourlyCost: 40, timeReduction: 50, monthlySystemCost: 100, setupCost: 2500 });
});

test("ROI keeps negative value and null payback instead of promising returns", () => {
  const result = executeUtilityTool("estimate_workflow_roi", { monthlyHours: 10, hourlyCost: 20, timeReduction: 50, monthlySystemCost: 200, setupCost: 1000 });
  if (result.status !== "calculated") assert.fail();
  assert.equal(result.result.monthlyNetValue, -100);
  assert.equal(result.result.firstYearNetValue, -2200);
  assert.equal(result.result.paybackMonths, null);
});

test("ROI requires every assumption and rejects coercion, nonfinite values, and out-of-range values", () => {
  for (const key of Object.keys(assumptions)) {
    const missing: Record<string, unknown> = { ...assumptions };
    delete missing[key];
    invalid(() => executeUtilityTool("estimate_workflow_roi", missing), key);
    for (const bad of [-1, NaN, Infinity, -Infinity, "25", null, undefined]) {
      invalid(() => executeUtilityTool("estimate_workflow_roi", { ...assumptions, [key]: bad }), key);
    }
  }
  for (const [key, bad] of Object.entries({ monthlyHours: 100_001, hourlyCost: 10_001, timeReduction: 101, monthlySystemCost: 1_000_001, setupCost: 10_000_001 })) {
    invalid(() => executeUtilityTool("estimate_workflow_roi", { ...assumptions, [key]: bad }), key);
  }
  const zero = executeUtilityTool("estimate_workflow_roi", Object.fromEntries(Object.keys(assumptions).map(key => [key, 0])));
  if (zero.status !== "calculated") assert.fail();
  assert.equal(zero.result.hoursSaved, 0);
  assert.equal(zero.result.paybackMonths, null);
});

test("readiness uses the current seven questions and recommendations without guessing", () => {
  for (const question of readinessQuestions) {
    for (const option of question.options) {
      const supplied = { ...answers, [question.id]: option };
      const result = executeUtilityTool("assess_workflow_readiness", { answers: supplied });
      if (result.status !== "assessed") assert.fail();
      assert.deepEqual(result.answers, supplied);
      assert.deepEqual(result.recommendation, recommendReadiness(supplied));
    }
    const missing: Record<string, unknown> = { ...answers };
    delete missing[question.id];
    invalid(() => executeUtilityTool("assess_workflow_readiness", { answers: missing }), `answers.${question.id}`);
    invalid(() => executeUtilityTool("assess_workflow_readiness", { answers: { ...answers, [question.id]: "Probably yes" } }), `answers.${question.id}`);
  }
  invalid(() => executeUtilityTool("assess_workflow_readiness", { answers: {} }), "answers.access");
  invalid(() => executeUtilityTool("assess_workflow_readiness", { answers: { ...answers, score: 10 } }), "answers.score");
});

test("project briefs are readable drafts with no submission and no contact data in a URL", () => {
  const result = executeUtilityTool("prepare_project_brief", { ...brief, tools: "  Spreadsheet exports and our royalty system  ", frequency: "Every month", interest: "Custom systems" });
  if (result.status !== "draft") assert.fail();
  assert.equal(result.submitted, false);
  assert.equal(result.nextStep, "/contact");
  assert.equal(result.draft.interest, "Custom systems");
  assert.equal(result.draft.message, `Current workflow\n${brief.workflow}\n\nDesired outcome\n${brief.desiredOutcome}\n\nTools and information\nSpreadsheet exports and our royalty system\n\nHow often the work happens\nEvery month`);
  assert.deepEqual(Object.keys(result).sort(), ["draft", "nextStep", "status", "submitted"]);
  const minimal = executeUtilityTool("prepare_project_brief", brief);
  if (minimal.status !== "draft") assert.fail();
  assert.equal(minimal.draft.interest, "Not sure yet");
  assert.ok(!minimal.draft.message.includes("undefined"));
});

test("project briefs enforce meaningful bounded text and known interests", () => {
  for (const [field, value] of [
    ["workflow", "Too short"], ["workflow", "a".repeat(501)], ["workflow", " ".repeat(30)],
    ["desiredOutcome", "short"], ["desiredOutcome", "a".repeat(501)],
    ["tools", ""], ["tools", "a".repeat(501)], ["frequency", "a".repeat(121)],
    ["interest", "Buy a subscription"], ["interest", 5], ["interest", null],
  ] as const) invalid(() => executeUtilityTool("prepare_project_brief", { ...brief, [field]: value }), field);
  for (const field of ["workflow", "desiredOutcome"]) {
    const missing: Record<string, unknown> = { ...brief };
    delete missing[field];
    invalid(() => executeUtilityTool("prepare_project_brief", missing), field);
  }
});

test("utility boundaries reject nonobjects and unknown input keys before doing any work", () => {
  for (const [tool, good] of [["estimate_workflow_roi", assumptions], ["assess_workflow_readiness", { answers }], ["prepare_project_brief", brief]] as const) {
    for (const input of [null, [], "hello", 0, new Date()]) invalid(() => executeUtilityTool(tool, input), "input");
    invalid(() => executeUtilityTool(tool, { ...good, sendToCRM: true }), "input.sendToCRM");
  }
});
