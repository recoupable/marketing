import { beforeEach, describe, expect, it, vi } from "vitest";
import { getAssessmentProfile } from "./getAssessmentProfile";
import { scorecardRubric } from "./scorecardRubric";
import { assessmentSchema, type Assessment } from "./scorecard";
import { scorecardText } from "./scorecardText";
import { getAssessmentFocus } from "./getAssessmentFocus";

const stores = vi.hoisted(() => ({
  assessment: { get: vi.fn(), update: vi.fn() },
  assessmentReview: { get: vi.fn(), update: vi.fn() },
  assessmentAnswers: { get: vi.fn(), update: vi.fn() },
  research: { get: vi.fn() },
}));
vi.mock("eve/tools", () => ({ defineTool: (tool: unknown) => tool }));
vi.mock("eve/hooks", () => ({ defineHook: (hook: unknown) => hook }));
vi.mock("../../agent/lib/assessment", () => stores);
vi.mock("../../agent/lib/research", () => ({ research: stores.research }));
import recordTool from "../../agent/tools/record_assessment";
import reviewTool from "../../agent/tools/review_scorecard";
import publishTool from "../../agent/tools/publish_scorecard";
import evidenceHook from "../../agent/hooks/assessment-evidence";

const record = (
  recordTool as unknown as {
    execute: (input: Partial<Assessment>) => {
      error?: string;
      complete?: boolean;
      nextQuestion?: ReturnType<typeof getAssessmentFocus>;
    };
  }
).execute;
const review = (
  reviewTool as unknown as {
    execute: () => { error?: string; assessment?: Assessment };
  }
).execute;
const publish = (
  publishTool as unknown as {
    execute: (input: unknown) => Record<string, unknown>;
  }
).execute;
const receive = (
  evidenceHook as unknown as {
    events: {
      "message.received": (event: {
        data: { message: string; kind?: string };
      }) => void;
    };
  }
).events["message.received"];
let current: Assessment;
let confirmation: { snapshot: string | null; confirmed: boolean };
let answers: {
  messages: string[];
  partialRequested: boolean;
  pendingQuestion?: string | null;
  answeredQuestions?: { answer: string; question: string }[];
};
const known: Assessment = {
  scope: {
    summary: "A five-person independent label team",
    quote: "I run a five-person independent label team.",
  },
  priority: {
    summary: "Reduce the time spent on release checks",
    quote: "We need to reduce the time spent on release checks.",
  },
  criteria: scorecardRubric.flatMap((area, areaIndex) =>
    area.criteria.map((criterion, index) => ({
      id: criterion.id,
      status:
        index < [2, 2, 1, 1, 0][areaIndex] ? ("yes" as const) : ("no" as const),
      quote: `${criterion.label}: ${index < [2, 2, 1, 1, 0][areaIndex] ? "we do this regularly" : "we do not do this yet"}.`,
    })),
  ),
};
const narrative = {
  summary:
    "Your shared knowledge and recurring tasks are further along than team adoption and measurement.",
  nextMoves: [
    {
      area: "results",
      action: "Measure one recurring release check",
      why: "You have a process but no comparison with the previous approach.",
      firstStep:
        "Pick an upcoming release and time the complete check, including review.",
      check:
        "Compare errors and total effort with the previous manual process.",
    },
  ],
  peers: [],
};

beforeEach(() => {
  current = { scope: null, priority: null, criteria: [] };
  confirmation = { snapshot: null, confirmed: false };
  answers = { messages: [], partialRequested: false };
  stores.assessment.get.mockImplementation(() => current);
  stores.assessment.update.mockImplementation((save) => {
    current = save(current);
  });
  stores.assessmentReview.get.mockImplementation(() => confirmation);
  stores.assessmentReview.update.mockImplementation((save) => {
    confirmation = save(confirmation);
  });
  stores.assessmentAnswers.get.mockImplementation(() => answers);
  stores.assessmentAnswers.update.mockImplementation((save) => {
    answers = save(answers);
  });
  stores.research.get.mockReturnValue({});
});

function recordKnown() {
  receive({
    data: {
      message: [
        known.scope!.quote,
        known.priority!.quote,
        ...known.criteria.map((criterion) => criterion.quote),
      ].join("\n"),
    },
  });
  return record(known);
}

describe("fixed assessment rubric", () => {
  it("does not turn missing or skipped answers into low ratings", () => {
    const profile = getAssessmentProfile(current);
    expect(profile.assessed).toBe(0);
    expect(profile.areas.every((area) => area.level === null)).toBe(true);
    expect(profile.missing).toHaveLength(17);
    const partial = { ...known, criteria: known.criteria.slice(0, 2) };
    expect(getAssessmentProfile(partial).areas[0].level).toBeNull();
  });
  it("distinguishes no use from unknown and requires cumulative evidence", () => {
    const profile = getAssessmentProfile(known);
    expect(profile.complete).toBe(true);
    expect(profile.areas.map((area) => area.level)).toEqual([2, 2, 1, 1, 0]);
    expect(profile.repeatable).toBe(2);
    const inconsistent = structuredClone(known);
    inconsistent.criteria[0].status = "no";
    expect(getAssessmentProfile(inconsistent).areas[0].level).toBeNull();
  });
  it("rejects duplicate criteria and known answers without evidence", () => {
    expect(
      assessmentSchema.safeParse({
        ...known,
        criteria: [known.criteria[0], known.criteria[0]],
      }).success,
    ).toBe(false);
    expect(
      assessmentSchema.safeParse({
        ...known,
        criteria: [{ ...known.criteria[0], quote: null }],
      }).success,
    ).toBe(false);
  });
});

describe("assessment evidence and publishing", () => {
  it("rejects fabricated visitor quotes and framework messages", () => {
    expect(record(known).error).toContain("actual visitor message");
    receive({
      data: { message: known.scope!.quote, kind: "execution.background_task" },
    });
    expect(record({ scope: known.scope, criteria: [] }).error).toBeDefined();
    expect(current.criteria).toEqual([]);
  });
  it("attaches a short reply to its actual question and rejects invented context", () => {
    receive({ data: { message: "Yes" } });
    expect(
      record({
        criteria: [{ id: "knowledge_use", status: "yes", quote: "Yes" }],
      }).error,
    ).toContain("actual question");
    answers.pendingQuestion = "Do you use AI for real business questions?";
    receive({ data: { message: "Yes" } });
    expect(
      record({
        criteria: [{ id: "knowledge_use", status: "yes", quote: "Yes" }],
      }).error,
    ).toBeUndefined();
    expect(current.criteria[0].question).toBe(
      "Do you use AI for real business questions?",
    );
    expect(
      record({
        criteria: [
          {
            id: "knowledge_records",
            status: "yes",
            quote: "Yes",
            question: "Does AI use all your records?",
          },
        ],
      }).error,
    ).toContain("actual question");
  });
  it("accepts a rich answer without requiring an arbitrary question count", () => {
    expect(recordKnown().complete).toBe(true);
    expect(current).toEqual(known);
  });
  it("returns the current capability focus after scope even when priority is missing", () => {
    receive({ data: { message: known.scope!.quote } });
    expect(
      record({ scope: known.scope, criteria: [] }).nextQuestion,
    ).toMatchObject({
      phase: "current_setup",
      topic: "knowledge",
    });
    expect(record({ criteria: [] }).nextQuestion?.topic).toBe("knowledge");
    receive({
      data: { message: known.criteria.map((item) => item.quote).join("\n") },
    });
    expect(record({ criteria: known.criteria }).nextQuestion?.topic).toBe(
      "priority",
    );
  });
  it("preserves scope and priority when later answers send null for unchanged fields", () => {
    receive({
      data: { message: `${known.scope!.quote}\n${known.priority!.quote}` },
    });
    record({ scope: known.scope, priority: known.priority, criteria: [] });
    receive({
      data: {
        message: known.criteria
          .slice(0, 3)
          .map((item) => item.quote)
          .join("\n"),
      },
    });
    const result = record({
      scope: null,
      priority: null,
      criteria: known.criteria.slice(0, 3),
    });
    expect(result.error).toBeUndefined();
    expect(result.nextQuestion?.topic).toBe("workflows");
    expect(current.scope).toEqual(known.scope);
    expect(current.priority).toEqual(known.priority);

    const correction = {
      summary: "Only the three-person catalog team is being assessed.",
      quote: "Actually, assess just our three-person catalog team.",
    };
    receive({ data: { message: correction.quote } });
    record({ scope: correction, priority: null, criteria: [] });
    expect(current.scope).toEqual(correction);
    expect(current.priority).toEqual(known.priority);
  });
  it("cannot publish from broad setup choices or self-confirm the recap", () => {
    receive({ data: { message: "ChatGPT / Claude Team plan" } });
    expect(review().error).toBeDefined();
    expect(publish(narrative).error).toBeDefined();
    recordKnown();
    receive({ data: { message: "Show my scorecard" } });
    expect(publish(narrative).error).toBeDefined();
    expect(review().assessment).toEqual(known);
    expect(publish(narrative).error).toBeDefined();
    receive({ data: { message: "Show my scorecard" } });
    const result = publish(narrative);
    expect(result.assessment).toEqual(known);
    expect(result.version).toBe("recoup-ai-scorecard-v1");
  });
  it("keeps corrections, skip and changed snapshots unconfirmed", () => {
    recordKnown();
    review();
    receive({ data: { message: "Skip this question" } });
    expect(publish(narrative).error).toBeDefined();
    receive({
      data: { message: "Show my scorecard", kind: "execution.background_task" },
    });
    expect(publish(narrative).error).toBeDefined();
    receive({ data: { message: "Show my scorecard" } });
    record({
      criteria: [{ id: "results_goal", status: "unknown", quote: null }],
    });
    expect(publish(narrative).error).toBeDefined();
    expect(
      current.criteria.filter((item) => item.status !== "unknown"),
    ).toHaveLength(14);
  });
  it("allows a partial assessment only after an explicit visitor request, retaining unknowns", () => {
    recordKnown();
    current = { ...current, criteria: current.criteria.slice(0, 3) };
    expect(review().error).toBeDefined();
    receive({ data: { message: "Show my partial scorecard" } });
    expect(review().error).toBeUndefined();
    receive({ data: { message: "Show my scorecard" } });
    const result = publish(narrative);
    expect(getAssessmentProfile(result.assessment as Assessment).assessed).toBe(
      1,
    );
    expect(
      getAssessmentProfile(result.assessment as Assessment).areas[1].level,
    ).toBeNull();
  });
  it("requires peer quotes to match opened pages, independently of visitor evidence", () => {
    recordKnown();
    review();
    receive({ data: { message: "Show my scorecard" } });
    const peer = {
      company: "Example Music",
      relevance: "An independent label with a similar release process.",
      practice: "The company describes using AI to prepare release checks.",
      published: null,
      source: {
        title: "Release checks",
        url: "https://example.com/release-checks",
        quote: "We use AI to prepare release checks.",
      },
    };
    expect(publish({ ...narrative, peers: [peer] }).error).toBeDefined();
    stores.research.get.mockReturnValue({
      [peer.source.url]: peer.source.quote,
    });
    expect(publish({ ...narrative, peers: [peer] }).peers).toEqual([peer]);
  });
  it("downloads the evidence, unknowns and methodology alongside recommendations", () => {
    recordKnown();
    review();
    receive({ data: { message: "Show my scorecard" } });
    const output = publish(narrative);
    const text = scorecardText(output as Parameters<typeof scorecardText>[0]);
    expect(text).toContain("2 rated Repeatable or Established");
    expect(text).toContain(known.criteria[0].quote);
    expect(text).toContain("No percentile or industry ranking is calculated");
    expect(text).toContain(narrative.nextMoves[0].firstStep);
  });
});
