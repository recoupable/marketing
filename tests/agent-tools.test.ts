import { test, expect } from "vitest";
import { agentToolDefinitions, AgentToolInputError, executeUtilityTool, isUtilityToolName } from "../lib/agent-tools.ts";
import { calculateWorkflowROI, readinessQuestions, recommendReadiness } from "../lib/marketing-migration-tools.ts";

const assumptions = { monthlyHours: 40, hourlyCost: 40, timeReduction: 50, monthlySystemCost: 100, setupCost: 2500 };
const answers = Object.fromEntries(readinessQuestions.map(question => [question.id, question.options[0]]));
const brief = { workflow: "Our finance team reconciles royalty statements by hand.", desiredOutcome: "Prepare a report with unresolved differences ready for review." };

function invalid(run: () => unknown, field?: string) {
  expect(run).toThrow(expect.toSatisfy((error: unknown) => {
    if (!(error instanceof AgentToolInputError)) expect.unreachable("Expected AgentToolInputError");
    expect(error.code).toBe("INVALID_INPUT");
    if (field) expect(error.issues.some(issue => issue.field === field), JSON.stringify(error.issues)).toBeTruthy();
    return true;
  }));
}

test("the five public tool contracts distinguish content reading from local utilities", () => {
  expect(agentToolDefinitions.map(tool => tool.name)).toStrictEqual(["search_recoup", "read_recoup_page", "estimate_workflow_roi", "assess_workflow_readiness", "prepare_project_brief"]);
  expect(agentToolDefinitions.every(tool => tool.annotations.readOnlyHint && tool.inputSchema.additionalProperties === false)).toBeTruthy();
  expect(isUtilityToolName("prepare_project_brief")).toBe(true);
  expect(isUtilityToolName("search_recoup")).toBe(false);
  expect(() => executeUtilityTool("submit_lead", {})).toThrow(expect.toSatisfy(error => error instanceof AgentToolInputError && error.code === "UNKNOWN_TOOL"));
});

test("ROI uses the visible calculator, preserves assumptions, and explains units and limits", () => {
  const result = executeUtilityTool("estimate_workflow_roi", assumptions);
  expect(result.status).toBe("calculated");
  if (result.status !== "calculated") expect.unreachable();
  expect(result.result).toStrictEqual(calculateWorkflowROI(assumptions));
  expect(result.assumptions).toStrictEqual(assumptions);
  expect(result.units.capacityValue).toBe("USD/month");
  expect(result.interpretation).toMatch(/not guaranteed cash savings/);
  expect(assumptions).toStrictEqual({ monthlyHours: 40, hourlyCost: 40, timeReduction: 50, monthlySystemCost: 100, setupCost: 2500 });
});

test("ROI keeps negative value and null payback instead of promising returns", () => {
  const result = executeUtilityTool("estimate_workflow_roi", { monthlyHours: 10, hourlyCost: 20, timeReduction: 50, monthlySystemCost: 200, setupCost: 1000 });
  if (result.status !== "calculated") expect.unreachable();
  expect(result.result.monthlyNetValue).toBe(-100);
  expect(result.result.firstYearNetValue).toBe(-2200);
  expect(result.result.paybackMonths).toBe(null);
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
  if (zero.status !== "calculated") expect.unreachable();
  expect(zero.result.hoursSaved).toBe(0);
  expect(zero.result.paybackMonths).toBe(null);
});

test("readiness uses the current seven questions and recommendations without guessing", () => {
  for (const question of readinessQuestions) {
    for (const option of question.options) {
      const supplied = { ...answers, [question.id]: option };
      const result = executeUtilityTool("assess_workflow_readiness", { answers: supplied });
      if (result.status !== "assessed") expect.unreachable();
      expect(result.answers).toStrictEqual(supplied);
      expect(result.recommendation).toStrictEqual(recommendReadiness(supplied));
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
  if (result.status !== "draft") expect.unreachable();
  expect(result.submitted).toBe(false);
  expect(result.nextStep).toBe("/contact");
  expect(result.draft.interest).toBe("Custom systems");
  expect(result.draft.message).toBe(`Current workflow\n${brief.workflow}\n\nDesired outcome\n${brief.desiredOutcome}\n\nTools and information\nSpreadsheet exports and our royalty system\n\nHow often the work happens\nEvery month`);
  expect(Object.keys(result).sort()).toStrictEqual(["draft", "nextStep", "status", "submitted"]);
  const minimal = executeUtilityTool("prepare_project_brief", brief);
  if (minimal.status !== "draft") expect.unreachable();
  expect(minimal.draft.interest).toBe("Not sure yet");
  expect(!minimal.draft.message.includes("undefined")).toBeTruthy();
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
