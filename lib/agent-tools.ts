import { calculateWorkflowROI, readinessQuestions, recommendReadiness } from "./marketing-migration-tools.ts";
import type { ROIInputs } from "./marketing-migration-tools.ts";
import { generalInterests } from "./inquiry-topics.ts";

export const utilityToolNames = ["estimate_workflow_roi", "assess_workflow_readiness", "prepare_project_brief"] as const;
export type UtilityToolName = typeof utilityToolNames[number];
export type AgentToolName = "search_recoup" | "read_recoup_page" | UtilityToolName;
export type AgentToolDefinition = {
  name: AgentToolName;
  description: string;
  inputSchema: Record<string, unknown>;
  annotations: { readOnlyHint: true };
};

const roiLimits: Record<keyof ROIInputs, { maximum: number; description: string }> = {
  monthlyHours: { maximum: 100_000, description: "Current total team hours spent on this workflow per month, in hours/month." },
  hourlyCost: { maximum: 10_000, description: "Loaded labor cost in USD per person-hour." },
  timeReduction: { maximum: 100, description: "Assumed share of current work time saved, in percent from 0 to 100. Supply your own assumption; this is not a Recoup performance promise." },
  monthlySystemCost: { maximum: 1_000_000, description: "Estimated recurring system and operating cost, in USD/month." },
  setupCost: { maximum: 10_000_000, description: "Estimated one-time implementation cost, in USD." },
};

const objectSchema = (properties: Record<string, unknown>, required: string[]) => ({
  type: "object", properties, required, additionalProperties: false,
});

export const agentToolDefinitions: readonly AgentToolDefinition[] = [
  {
    name: "search_recoup",
    description: "Search Recoup’s public website, guides, API documentation, blog, and playbook. Returns matching public content with IDs for read_recoup_page. Use a relevant query and optional content type; follow the returned cursor for more matches.",
    inputSchema: objectSchema({
      query: { type: "string", minLength: 1, maxLength: 240, description: "Words or a question to search for." },
      type: { type: "string", enum: ["all", "page", "docs", "blog", "playbook"], default: "all" },
      limit: { type: "integer", minimum: 1, maximum: 10, default: 5 },
      cursor: { type: "string", minLength: 1, maxLength: 200, description: "Opaque pagination cursor returned by the previous search." },
    }, ["query"]),
    annotations: { readOnlyHint: true },
  },
  {
    name: "read_recoup_page",
    description: "Read the public text of a Recoup page by an ID returned by search_recoup. Use the returned continuation offset when the content is longer than one response. Does not browse arbitrary URLs or read private account data.",
    inputSchema: objectSchema({
      id: { type: "string", minLength: 1, maxLength: 300, description: "Public content ID returned by search_recoup." },
      offset: { type: "integer", minimum: 0, default: 0, description: "Character offset supplied by the previous response; start at zero." },
      maxLength: { type: "integer", minimum: 1, maximum: 12_000, default: 6000, description: "Maximum characters to return." },
    }, ["id"]),
    annotations: { readOnlyHint: true },
  },
  {
    name: "estimate_workflow_roi",
    description: "Calculate the potential value of time saved on one workflow using five explicit assumptions. Returns hours saved, capacity value, recurring net value, first-year net value, and payback. All costs are USD. Capacity value is not guaranteed cash savings; this does not generate a quote or submit a lead.",
    inputSchema: objectSchema(Object.fromEntries(Object.entries(roiLimits).map(([key, limit]) => [key, {
      type: "number", minimum: 0, maximum: limit.maximum, description: limit.description,
    }])), Object.keys(roiLimits)),
    annotations: { readOnlyHint: true },
  },
  {
    name: "assess_workflow_readiness",
    description: "Recommend a practical next step for one music-business workflow using all seven answers from Recoup’s readiness check. Ask the user for any missing answer; do not infer it. Returns a recommendation and next steps, not a numerical score, certification, or promise of readiness.",
    inputSchema: objectSchema({ answers: objectSchema(Object.fromEntries(readinessQuestions.map(question => [question.id, {
      type: "string", enum: [...question.options], description: question.question,
    }])), readinessQuestions.map(question => question.id)) }, ["answers"]),
    annotations: { readOnlyHint: true },
  },
  {
    name: "prepare_project_brief",
    description: "Prepare a short project inquiry draft from a workflow, desired outcome, and optional tools and frequency. Returns text the user can review on /contact. Does not save information, submit an inquiry, contact Recoup, book a call, or promise scope or pricing.",
    inputSchema: objectSchema({
      workflow: { type: "string", minLength: 20, maxLength: 500, description: "Describe the current workflow and where work gets difficult. Do not include passwords or confidential records." },
      desiredOutcome: { type: "string", minLength: 10, maxLength: 500, description: "What the team would like to improve or produce." },
      tools: { type: "string", minLength: 1, maxLength: 500, description: "Optional tools or data sources involved." },
      frequency: { type: "string", minLength: 1, maxLength: 120, description: "Optional description of how often the work happens." },
      interest: { type: "string", enum: [...generalInterests], default: "Not sure yet" },
    }, ["workflow", "desiredOutcome"]),
    annotations: { readOnlyHint: true },
  },
];

export type AgentToolIssue = { field: string; message: string };
export class AgentToolInputError extends Error {
  readonly code: "INVALID_INPUT" | "UNKNOWN_TOOL";
  readonly issues: AgentToolIssue[];

  constructor(code: "INVALID_INPUT" | "UNKNOWN_TOOL", issues: AgentToolIssue[]) {
    super(code === "UNKNOWN_TOOL" ? "Unknown utility tool." : "Some tool inputs are missing or invalid.");
    this.name = "AgentToolInputError";
    this.code = code;
    this.issues = issues;
  }
}

function invalid(issues: AgentToolIssue[]): never {
  throw new AgentToolInputError("INVALID_INPUT", issues);
}

function requireObject(input: unknown, allowed: readonly string[], field = "input"): Record<string, unknown> {
  if (input === null || typeof input !== "object" || Array.isArray(input) || ![Object.prototype, null].includes(Object.getPrototypeOf(input))) {
    return invalid([{ field, message: "Must be an object containing the documented fields." }]);
  }
  const unexpected = Reflect.ownKeys(input).filter(key => typeof key !== "string" || !allowed.includes(key));
  if (unexpected.length) return invalid(unexpected.map(key => ({ field: `${field}.${String(key)}`, message: "Unknown field." })));
  return input as Record<string, unknown>;
}

function validateROI(input: unknown): ROIInputs {
  const values = requireObject(input, Object.keys(roiLimits));
  const issues: AgentToolIssue[] = [];
  for (const [key, limit] of Object.entries(roiLimits)) {
    const value = values[key];
    if (typeof value !== "number" || !Number.isFinite(value) || value < 0 || value > limit.maximum) {
      issues.push({ field: key, message: `Required finite number between 0 and ${limit.maximum}. ${limit.description}` });
    }
  }
  if (issues.length) invalid(issues);
  return { monthlyHours: values.monthlyHours as number, hourlyCost: values.hourlyCost as number, timeReduction: values.timeReduction as number, monthlySystemCost: values.monthlySystemCost as number, setupCost: values.setupCost as number };
}

function validateReadiness(input: unknown): Record<string, string> {
  const values = requireObject(input, ["answers"]);
  const answers = requireObject(values.answers, readinessQuestions.map(question => question.id), "answers");
  const issues: AgentToolIssue[] = [];
  for (const question of readinessQuestions) {
    const value = answers[question.id];
    if (typeof value !== "string" || !(question.options as readonly string[]).includes(value)) {
      issues.push({ field: `answers.${question.id}`, message: `Choose one of: ${question.options.join("; ")}.` });
    }
  }
  if (issues.length) invalid(issues);
  return Object.fromEntries(readinessQuestions.map(question => [question.id, answers[question.id] as string]));
}

export type ProjectBriefDraft = {
  status: "draft";
  draft: { interest: typeof generalInterests[number]; message: string };
  submitted: false;
  nextStep: "/contact";
};

function prepareProjectBrief(input: unknown): ProjectBriefDraft {
  const values = requireObject(input, ["workflow", "desiredOutcome", "tools", "frequency", "interest"]);
  const issues: AgentToolIssue[] = [];
  function text(field: string, minimum: number, maximum: number, optional = false): string | undefined {
    const value = values[field];
    if (optional && value === undefined) return undefined;
    if (typeof value !== "string" || value.trim().length < minimum || value.length > maximum) {
      issues.push({ field, message: `Must contain at least ${minimum} characters after trimming and no more than ${maximum} characters in total.` });
      return undefined;
    }
    return value.trim();
  }
  const workflow = text("workflow", 20, 500);
  const desiredOutcome = text("desiredOutcome", 10, 500);
  const tools = text("tools", 1, 500, true);
  const frequency = text("frequency", 1, 120, true);
  const interest = values.interest === undefined ? "Not sure yet" : values.interest;
  if (typeof interest !== "string" || !(generalInterests as readonly string[]).includes(interest)) {
    issues.push({ field: "interest", message: `Choose one of: ${generalInterests.join("; ")}.` });
  }
  if (issues.length) invalid(issues);

  const sections = [`Current workflow\n${workflow}`, `Desired outcome\n${desiredOutcome}`];
  if (tools) sections.push(`Tools and information\n${tools}`);
  if (frequency) sections.push(`How often the work happens\n${frequency}`);
  return {
    status: "draft",
    draft: { interest: interest as typeof generalInterests[number], message: sections.join("\n\n") },
    submitted: false,
    nextStep: "/contact",
  };
}

export function isUtilityToolName(name: string): name is UtilityToolName {
  return (utilityToolNames as readonly string[]).includes(name);
}

export function executeUtilityTool(name: string, input: unknown) {
  if (name === "estimate_workflow_roi") {
    const assumptions = validateROI(input);
    return {
      status: "calculated" as const,
      assumptions,
      result: calculateWorkflowROI(assumptions),
      units: { monthlyHours: "hours/month", hourlyCost: "USD/hour", timeReduction: "percent", monthlySystemCost: "USD/month", setupCost: "USD", hoursSaved: "hours/month", capacityValue: "USD/month", monthlyNetValue: "USD/month", firstYearNetValue: "USD", paybackMonths: "months" },
      interpretation: "The value of freed team time is capacity value, not guaranteed cash savings. Results depend on your assumptions and are not a quote. Null payback means recurring net value is not positive.",
    };
  }
  if (name === "assess_workflow_readiness") {
    const answers = validateReadiness(input);
    return { status: "assessed" as const, answers, recommendation: recommendReadiness(answers) };
  }
  if (name === "prepare_project_brief") return prepareProjectBrief(input);
  throw new AgentToolInputError("UNKNOWN_TOOL", [{ field: "name", message: "Choose estimate_workflow_roi, assess_workflow_readiness, or prepare_project_brief." }]);
}
