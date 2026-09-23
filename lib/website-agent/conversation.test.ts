import { describe, expect, it } from "vitest";
import type {
  EveMessage,
  EveMessagePart,
  MessageStreamEvent,
} from "eve/client";
import { getConversationTurns } from "./getConversationTurns";
import { getActivitySteps } from "./getActivitySteps";
import { getVisibleReplyParts } from "./getVisibleReplyParts";
import { getActiveQuestion } from "./getActiveQuestion";
import { aiSetupQuestion } from "./aiSetupQuestion";

const user: EveMessage = {
  id: "user-1",
  role: "user",
  parts: [{ type: "text", text: "seeker music" }],
};
const tool = (overrides: Record<string, unknown> = {}): EveMessagePart =>
  ({
    type: "dynamic-tool",
    toolName: "read_company_website",
    toolCallId: "read-1",
    state: "output-available",
    input: { url: "https://seekermusic.com" },
    output: { url: "https://seekermusic.com/", title: "Seeker Music" },
    ...overrides,
  }) as EveMessagePart;

describe("stable conversation turns", () => {
  it("keeps the opening and late research results before an answer during research", () => {
    const first = {
      ...user,
      id: "received-1:user",
      metadata: { turnId: "run-1" },
    };
    const followup = { ...first, id: "received-2:user" };
    const opening = tool({
      toolName: "ask_user_question",
      toolCallId: "question-1",
      stepIndex: 0,
      output: aiSetupQuestion,
    });
    const read = tool({ stepIndex: 1 });
    const assistant: EveMessage = {
      id: "assistant-1",
      role: "assistant",
      metadata: { turnId: "run-1" },
      parts: [opening, read],
    };
    const received = (id: string, sequence: number): MessageStreamEvent => ({
      type: "message.received",
      meta: { id, at: "2026-09-22T12:00:00Z" },
      data: { message: "test", turnId: "run-1", sequence },
    });
    const step = (stepIndex: number, sequence: number): MessageStreamEvent => ({
      type: "step.started",
      meta: { id: `step-${stepIndex}`, at: "2026-09-22T12:00:00Z" },
      data: { modelId: "test", turnId: "run-1", stepIndex, sequence },
    });
    const events = [
      received("received-1", 0),
      step(0, 1),
      step(1, 2),
      received("received-2", 3),
    ];
    const beforeReply = getConversationTurns(
      [first, assistant, followup],
      events,
    );
    expect(beforeReply[0].assistants[0].parts).toEqual([opening, read]);
    expect(beforeReply[1].assistants).toEqual([]);
    expect(getActiveQuestion(beforeReply[1])).toBeUndefined();

    const nextQuestion = tool({
      toolName: "ask_user_question",
      toolCallId: "question-2",
      stepIndex: 2,
      output: {
        ...aiSetupQuestion,
        message: "Your agents already answer questions.",
        question: "What happens after an answer?",
      },
    });
    const afterReply = getConversationTurns(
      [first, { ...assistant, parts: [opening, read, nextQuestion] }, followup],
      [...events, step(2, 4)],
    );
    expect(afterReply[0].assistants[0].parts).toEqual([opening, read]);
    expect(afterReply[1].assistants[0].parts).toEqual([nextQuestion]);
    expect(getActiveQuestion(afterReply[1])?.question).toBe(
      "What happens after an answer?",
    );
    // The same durable events restore the same order after reconnect/reload.
    expect(
      getConversationTurns(
        [
          first,
          { ...assistant, parts: [opening, read, nextQuestion] },
          followup,
        ],
        [...events, step(2, 4)],
      ),
    ).toEqual(afterReply);
  });
  it("places a steered response after the follow-up, even when Eve updates it in place", () => {
    const first = { ...user, metadata: { turnId: "run-1" } };
    const assistant: EveMessage = {
      id: "assistant-1",
      role: "assistant",
      metadata: { turnId: "run-1" },
      parts: [{ type: "text", text: "Answer including your new context" }],
    };
    const followup = { ...first, id: "followup-1" };
    const turns = getConversationTurns([first, assistant, followup]);
    expect(turns[0].assistants).toEqual([]);
    expect(turns[1].assistants).toEqual([assistant]);
  });
  it("renders a structured question once without a second prose version", () => {
    const intro: EveMessagePart = {
      type: "text",
      text: "Here is what I found.",
    };
    const question = tool({
      toolName: "ask_user_question",
      output: {
        context: "",
        question: "What tools do you use?",
        options: [
          { label: "None", description: "" },
          { label: "Some", description: "" },
        ],
      },
    });
    const duplicate: EveMessagePart = {
      type: "text",
      text: "What tools do you use? None or some?",
    };
    expect(getVisibleReplyParts([intro, question, duplicate])).toEqual([
      intro,
      question,
    ]);
    expect(
      getVisibleReplyParts([
        tool({
          toolName: "ask_user_question",
          output: { error: "Invalid sources" },
        }),
        duplicate,
      ]),
    ).toHaveLength(2);
  });
  it("keeps the user's anchor when thinking becomes research and a question", () => {
    const pending = getConversationTurns([user]);
    const researching = getConversationTurns([
      user,
      { id: "assistant-1", role: "assistant", parts: [tool()] },
    ]);
    const question = getConversationTurns([
      user,
      {
        id: "assistant-1",
        role: "assistant",
        parts: [
          tool(),
          tool({ toolName: "ask_user_question", toolCallId: "question-1" }),
        ],
      },
    ]);
    expect(pending[0].id).toBe(researching[0].id);
    expect(question[0].id).toBe(pending[0].id);
    expect(question).toHaveLength(1);
  });
  it("retains earlier activity when another user turn begins", () => {
    const assistant: EveMessage = {
      id: "assistant-1",
      role: "assistant",
      parts: [tool()],
    };
    const turns = getConversationTurns([
      user,
      assistant,
      { ...user, id: "user-2" },
    ]);
    expect(turns).toHaveLength(2);
    expect(turns[0].assistants).toEqual([assistant]);
    expect(turns[1].assistants).toEqual([]);
  });
});

describe("honest activity states", () => {
  it("identifies the missing page without declaring the whole website unreadable", () => {
    const steps = getActivitySteps(
      [
        tool(),
        tool({
          toolCallId: "missing-page",
          input: { url: "https://seekermusic.com/hiphop50" },
          output: { error: "This page returned HTTP 404.", statusCode: 404 },
        }),
      ],
      false,
    );
    expect(steps[0].state).toBe("complete");
    expect(steps[1]).toMatchObject({
      state: "failed",
      url: "https://seekermusic.com/hiphop50",
      label: "Page not found: seekermusic.com/hiphop50",
    });
  });
  it("keeps the specific page visible for older failures without a reason", () => {
    const [step] = getActivitySteps(
      [
        tool({
          input: { url: "https://example.com/news" },
          output: { error: "Unavailable" },
        }),
      ],
      false,
    );
    expect(step.label).toBe("Couldn’t read example.com/news");
  });
  it("does not expose credentials as a source link", () => {
    const [step] = getActivitySteps(
      [
        tool({
          input: { url: "https://visitor:secret@example.com/news" },
          output: { error: "Unavailable" },
        }),
      ],
      false,
    );
    expect(step.url).toBeUndefined();
    expect(step.label).not.toContain("secret");
  });
  it("does not mark a caught website error as a checked source", () => {
    expect(
      getActivitySteps([tool({ output: { error: "Unavailable" } })], false)[0]
        .state,
    ).toBe("failed");
  });
  it("distinguishes streaming, cancelled and completed reads", () => {
    const pending = tool({ state: "input-available", output: undefined });
    expect(getActivitySteps([pending], true)[0].state).toBe("active");
    expect(getActivitySteps([pending], false)[0].state).toBe("stopped");
    expect(getActivitySteps([tool()], false)[0].state).toBe("complete");
  });
  it("does not turn a partial result into a completed read", () => {
    expect(getActivitySteps([tool({ partial: true })], true)[0].state).toBe(
      "active",
    );
  });
  it("excludes partial arguments, questions and untrusted links", () => {
    expect(
      getActivitySteps(
        [
          tool({ state: "input-streaming" }),
          tool({ toolName: "ask_user_question" }),
        ],
        true,
      ),
    ).toEqual([]);
    expect(
      getActivitySteps(
        [tool({ input: { url: "javascript:alert(1)" }, output: {} })],
        false,
      )[0].url,
    ).toBeUndefined();
  });
});
