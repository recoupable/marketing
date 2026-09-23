import { describe, expect, it } from "vitest";
import type { EveMessage, EveMessagePart } from "eve/client";
import { parseStreamingInput } from "./parseStreamingInput";
import { getStreamingPresentation } from "./getStreamingPresentation";
import { getActiveQuestion } from "./getActiveQuestion";
import { getResearchPages } from "./getResearchPages";
import { canPreviewReport } from "./canPreviewReport";

const inputPart = (toolName: string, inputText: string): EveMessagePart => ({
  type: "dynamic-tool",
  toolName,
  toolCallId: "tool-1",
  state: "input-streaming",
  input: undefined,
  inputText,
});
const result = (toolName: string, output: unknown): EveMessagePart => ({
  type: "dynamic-tool",
  toolName,
  toolCallId: toolName,
  state: "output-available",
  input: {},
  output,
});
const assistant = (...parts: EveMessagePart[]): EveMessage => ({
  id: "assistant",
  role: "assistant",
  parts,
});
const user = (text: string): EveMessage => ({
  id: text,
  role: "user",
  parts: [{ type: "text", text }],
});
const sources = [
  {
    title: "About",
    url: "https://example.com/about",
    quote: "a new music service",
  },
];
const pages = {
  "https://example.com/about": "We launched a new music service.",
};

describe("incremental visitor-facing responses", () => {
  it("handles every split in a source URL without crashing or rendering unverified text", async () => {
    const body = JSON.stringify({
      sources,
      title: "A useful connection",
      finding: "The company launched a service.",
    });
    for (let i = 1; i <= body.length; i++) {
      const part = inputPart("publish_finding", body.slice(0, i));
      const draft = {
        ...part,
        input: (await parseStreamingInput(part))?.input,
      } as EveMessagePart;
      expect(() => getStreamingPresentation(draft, pages, false)).not.toThrow();
    }
  });
  it("shows a growing question from real incomplete JSON without enabling incomplete choices", async () => {
    for (const question of ["Which", "Which tools do you use?"]) {
      const part = inputPart("ask_user_question", `{"question":"${question}`);
      const snapshot = await parseStreamingInput(part);
      const draft = { ...part, input: snapshot?.input } as EveMessagePart;
      expect(
        getActiveQuestion({ id: "turn", assistants: [assistant(draft)] }),
      ).toMatchObject({ question, pending: true, options: [] });
    }
    const complete = {
      context: "",
      question: "Which tools do you use?",
      options: [
        { label: "ChatGPT", description: "" },
        { label: "Claude", description: "" },
      ],
    };
    expect(
      getActiveQuestion({
        id: "turn",
        assistants: [assistant(result("ask_user_question", complete))],
      }),
    ).toMatchObject({ pending: false, options: complete.options });
  });
  it("decodes split quotes and newlines without exposing raw JSON or unrelated tool arguments", async () => {
    const text =
      '{"title":"A \\"catalog\\" question","finding":"First line\\nSecond';
    expect(
      (await parseStreamingInput(inputPart("publish_finding", text)))?.input,
    ).toEqual({ title: 'A "catalog" question', finding: "First line\nSecond" });
    expect(
      await parseStreamingInput(inputPart("update_brief", text)),
    ).toBeUndefined();
    expect(
      await parseStreamingInput(inputPart("publish_plan", "x".repeat(32001))),
    ).toBeUndefined();
  });
  it("streams an insight only after its source excerpts match read pages", async () => {
    const part = inputPart(
      "publish_finding",
      `{"sources":${JSON.stringify(sources)},"title":"A useful connection","finding":"The company launched`,
    );
    const snapshot = await parseStreamingInput(part);
    const draft = { ...part, input: snapshot?.input } as EveMessagePart;
    expect(getStreamingPresentation(draft, {}, false)).toBeUndefined();
    expect(
      getStreamingPresentation(
        draft,
        { "https://example.com/about": "Different evidence" },
        false,
      ),
    ).toBeUndefined();
    expect(getStreamingPresentation(draft, pages, false)).toEqual({
      kind: "finding",
      value: { title: "A useful connection", finding: "The company launched" },
    });
    expect(
      getStreamingPresentation(
        result("publish_finding", { error: "Invalid source" }),
        pages,
        false,
      ),
    ).toBeUndefined();
  });
  it("keeps partially started report fields and lists visible, but requires a confirmed brief", async () => {
    const part = inputPart(
      "publish_plan",
      '{"title":"Release check","summary":"","inputs":["Approved checklist","',
    );
    const draft = {
      ...part,
      input: (await parseStreamingInput(part))?.input,
    } as EveMessagePart;
    expect(getStreamingPresentation(draft, {}, false)).toBeUndefined();
    expect(getStreamingPresentation(draft, {}, true)).toMatchObject({
      kind: "report",
      value: {
        title: "Release check",
        summary: "",
        inputs: ["Approved checklist", ""],
      },
    });
    expect(
      getStreamingPresentation(
        result("publish_plan", { error: "Context missing" }),
        {},
        true,
      ),
    ).toBeUndefined();
  });
  it("only uses completed successful page reads as preview evidence", () => {
    const page = {
      url: sources[0].url,
      text: pages[sources[0].url as keyof typeof pages],
    };
    expect(
      getResearchPages([assistant(result("read_company_website", page))]),
    ).toEqual(pages);
    expect(
      getResearchPages([
        assistant(
          result("web_search", page),
          result("read_company_website", { ...page, error: "Failed" }),
        ),
      ]),
    ).toEqual({});
  });
});

describe("report preview readiness", () => {
  const brief = {
    goal: "Release checks",
    readiness: { ready: true, missing: [] },
  };
  const recap = {
    context: "Check this",
    question: "Ready?",
    options: [
      { label: "Build my report", description: "" },
      { label: "Change", description: "" },
    ],
    recap: [{ label: "Goal", value: "Release checks" }],
  };
  const history = [
    assistant(result("update_brief", brief), result("review_brief", recap)),
  ];
  it("requires the recap and actual visitor confirmation before showing a streaming report", () => {
    expect(canPreviewReport([user("Build my report")])).toBe(false);
    expect(canPreviewReport(history)).toBe(false);
    expect(canPreviewReport([...history, user("Build my report")])).toBe(true);
    expect(canPreviewReport([...history, user("Change the goal")])).toBe(false);
  });
  it("revokes preview access when the saved brief changes or becomes incomplete", () => {
    const confirmed = [...history, user("Build my report")];
    expect(
      canPreviewReport([
        ...confirmed,
        assistant(result("update_brief", { ...brief, goal: "Other work" })),
      ]),
    ).toBe(false);
    expect(
      canPreviewReport([
        ...confirmed,
        assistant(
          result("update_brief", { ...brief, readiness: { ready: false } }),
        ),
      ]),
    ).toBe(false);
    expect(
      canPreviewReport([
        ...confirmed,
        assistant(result("update_brief", brief)),
      ]),
    ).toBe(true);
  });
});
