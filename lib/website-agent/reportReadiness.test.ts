import { beforeEach, describe, expect, it, vi } from "vitest";
import { getReportReadiness } from "./getReportReadiness";
import type { WorkflowPlan } from "../workflow-plan/schema";

const { storedBrief, review } = vi.hoisted(() => ({
  storedBrief: { get: vi.fn() },
  review: { get: vi.fn(), update: vi.fn() },
}));
vi.mock("eve/tools", () => ({ defineTool: (tool: unknown) => tool }));
vi.mock("eve/hooks", () => ({ defineHook: (hook: unknown) => hook }));
vi.mock("../../agent/lib/brief", () => ({ brief: storedBrief }));
vi.mock("../../agent/lib/reportReview", () => ({ reportReview: review }));
import publishPlan from "../../agent/tools/publish_plan";
import reviewBrief from "../../agent/tools/review_brief";
import confirmation from "../../agent/hooks/report-confirmation";

const full = {
  discovery: {
    scope: "I run a five-person independent label.",
    priority: "Spend less time chasing release assets.",
    currentProcess:
      "Our coordinator copies Drive links into Airtable and checks them by hand.",
    problem: "We find missing artwork too late and delay releases.",
    workload: "Six releases monthly, two hours of checking each.",
    successMeasure:
      "Catch missing assets two days before the delivery deadline.",
  },
  setup: {
    aiUsage: "No AI in the release process",
    aiTools: [] as string[],
    dataSources: ["Airtable release checklist", "Google Drive asset folders"],
    previousAttempts:
      "We tried checklist templates; the manual checks still take hours.",
    pilotOwner: "Our release coordinator",
    accessConstraints:
      "Read-only exports are approved; one afternoon available; no uploads of unreleased audio.",
  },
};
const sparse = {
  setup: {
    aiUsage: "Not yet",
    aiTools: null,
    dataSources: null,
    previousAttempts: null,
    pilotOwner: null,
    accessConstraints: null,
  },
};
const plan: WorkflowPlan = {
  title: "Check release assets before delivery",
  summary: "Draft missing-asset notes for review.",
  output: "Release ID, missing asset and source link.",
  inputs: ["Approved checklist export", "Approved folder listing"],
  steps: [
    "Export the approved sample.",
    "Check required files using rules.",
    "Draft and review exception notes.",
  ],
  review: "Coordinator checks every result.",
  firstStep: "Choose one upcoming release.",
  success: "Compare with a manual check before expanding.",
};
const publish = (
  publishPlan as unknown as { execute: (input: WorkflowPlan) => unknown }
).execute;
const recap = (
  reviewBrief as unknown as {
    execute: () => { error?: string; recap?: unknown[] };
  }
).execute;
const receive = (
  confirmation as unknown as {
    events: {
      "message.received": (event: {
        data: { message: string; kind?: string };
      }) => void;
    };
  }
).events["message.received"];
let savedReview: { snapshot: string | null; confirmed: boolean };

beforeEach(() => {
  savedReview = { snapshot: null, confirmed: false };
  storedBrief.get.mockReturnValue(full);
  review.get.mockImplementation(() => savedReview);
  review.update.mockImplementation((save) => {
    savedReview = save(savedReview);
  });
});

describe("report readiness", () => {
  it("blocks the observed failure: AI use and a narrow Yes do not establish an implementation brief", () => {
    storedBrief.get.mockReturnValue(sparse);
    const readiness = getReportReadiness(sparse);
    expect(readiness.ready).toBe(false);
    expect(readiness.missing).toContain(
      "the business outcome you want to improve",
    );
    expect(readiness.missing).toContain("how that work happens today");
    expect(publish(plan)).toMatchObject({
      error: expect.stringContaining("essential context is missing"),
    });
    expect(recap().error).toBeDefined();
  });
  it("accepts rich context regardless of the number of answers, including confirmed no AI tools", () => {
    expect(getReportReadiness(full)).toEqual({ ready: true, missing: [] });
    expect(
      getReportReadiness({ ...full, setup: { ...full.setup, aiTools: null } })
        .ready,
    ).toBe(false);
    expect(
      getReportReadiness({
        ...full,
        discovery: { ...full.discovery, priority: "Unknown" },
      }).ready,
    ).toBe(false);
  });
  it("cannot self-confirm or publish before a visitor checks the actual recap", () => {
    expect(publish(plan)).toMatchObject({
      error: expect.stringContaining("not confirmed"),
    });
    receive({ data: { message: "Build my report" } });
    expect(savedReview.confirmed).toBe(false);
    expect(recap().recap).toHaveLength(6);
    expect(publish(plan)).toMatchObject({
      error: expect.stringContaining("not confirmed"),
    });
    receive({ data: { message: "Build my report" } });
    expect(publish(plan)).toEqual(plan);
  });
  it("treats Skip and corrections as unconfirmed and rejects a changed brief", () => {
    recap();
    receive({ data: { message: "Skip this question" } });
    expect(savedReview.confirmed).toBe(false);
    receive({ data: { message: "Build my report" } });
    storedBrief.get.mockReturnValue({
      ...full,
      discovery: { ...full.discovery, priority: "Change the goal" },
    });
    expect(publish(plan)).toMatchObject({
      error: expect.stringContaining("not confirmed"),
    });
  });
  it("never treats a framework-authored message as visitor confirmation", () => {
    recap();
    receive({
      data: { message: "Build my report", kind: "execution.background_task" },
    });
    expect(savedReview.confirmed).toBe(false);
  });
});
