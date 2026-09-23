import { expect, it } from "vitest";
import type { EveMessage, EveMessagePart } from "eve/client";
import { getScorecardContext } from "./getScorecardContext";
import { getStreamingPresentation } from "./getStreamingPresentation";
import { getActiveQuestion } from "./getActiveQuestion";
import type { Assessment } from "./scorecard";
import type { ConversationTurn } from "./getConversationTurns";

const assessment: Assessment = { scope: null, priority: null, criteria: [] };
const review = {
  question: "Does this reflect how your team uses AI?",
  context: "Check the evidence.",
  options: [
    { label: "Show my scorecard", description: "This reflects our setup" },
    { label: "Correct something", description: "Change an answer" },
  ],
  recap: [{ label: "Company knowledge", value: "Not assessed" }],
  assessment,
};
const tool = (toolName: string, output: unknown) =>
  ({
    type: "dynamic-tool",
    toolName,
    toolCallId: toolName,
    state: "output-available",
    output,
  }) as EveMessagePart;
const assistant = (parts: EveMessagePart[]) =>
  ({ id: "assistant", role: "assistant", parts }) as EveMessage;
const visitor = (text: string) =>
  ({
    id: "visitor",
    role: "user",
    parts: [{ type: "text", text }],
  }) as EveMessage;

it("keeps scorecard previews hidden until the actual recap has been confirmed", () => {
  const messages = [assistant([tool("record_assessment", { assessment })])];
  expect(getScorecardContext(messages).preview).toBeUndefined();
  expect(
    getScorecardContext([...messages, visitor("Show my scorecard")]).preview,
  ).toBeUndefined();
  messages.push(assistant([tool("review_scorecard", review)]));
  expect(getScorecardContext(messages).preview).toBeUndefined();
  messages.push(visitor("Show my scorecard"));
  expect(getScorecardContext(messages).preview).toEqual(assessment);
  expect(
    getScorecardContext([...messages, visitor("Actually that is wrong")])
      .preview,
  ).toBeUndefined();
  const changed = {
    ...assessment,
    scope: {
      summary: "A different team is in scope",
      quote: "Please assess a different team.",
    },
  };
  expect(
    getScorecardContext([
      ...messages,
      assistant([tool("record_assessment", { assessment: changed })]),
    ]).preview,
  ).toBeUndefined();
});

it("streams real summary chunks with fixed ratings but no unverified peer claims", () => {
  const part = {
    type: "dynamic-tool",
    toolName: "publish_scorecard",
    toolCallId: "scorecard",
    state: "input-streaming",
    input: { summary: "Your team", peers: [{ company: "Unverified" }] },
  } as EveMessagePart;
  expect(getStreamingPresentation(part, {}, false)).toBeUndefined();
  expect(getStreamingPresentation(part, {}, false, assessment)).toEqual({
    kind: "scorecard",
    value: { assessment, summary: "Your team" },
  });
});

it("keeps the scorecard confirmation in the existing composer through subsequent research", () => {
  const turn = {
    id: "turn",
    assistants: [
      assistant([
        tool("review_scorecard", review),
        tool("read_company_website", { title: "News" }),
      ]),
    ],
  } as ConversationTurn;
  expect(getActiveQuestion(turn)).toMatchObject({
    question: review.question,
    pending: false,
  });
});
