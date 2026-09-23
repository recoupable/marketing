import { describe, expect, it } from "vitest";
import type { EveMessagePart } from "eve/client";
import { getQuestionMessage } from "./getQuestionMessage";
import { getActiveQuestion } from "./getActiveQuestion";
import { getVisibleReplyParts } from "./getVisibleReplyParts";
import { parseStreamingInput } from "./parseStreamingInput";
import { aiSetupQuestion } from "./aiSetupQuestion";
import { questionSchema } from "./question";

const questionPart = (output: unknown): EveMessagePart => ({
  type: "dynamic-tool",
  toolName: "ask_user_question",
  toolCallId: "question-1",
  state: "output-available",
  input: {},
  output,
});

describe("conversational question messages", () => {
  it("streams the explanation before the question or choices have arrived", async () => {
    const part: EveMessagePart = {
      type: "dynamic-tool",
      toolName: "ask_user_question",
      toolCallId: "question-1",
      state: "input-streaming",
      input: undefined,
      inputText: '{"message":"I’ll read your website and',
    };
    const draft = {
      ...part,
      input: (await parseStreamingInput(part))?.input,
    } as EveMessagePart;
    expect(getQuestionMessage(draft)).toEqual({
      id: "question-1",
      text: "I’ll read your website and",
      streaming: true,
    });
    expect(
      getActiveQuestion({
        id: "turn-1",
        assistants: [{ id: "assistant-1", role: "assistant", parts: [draft] }],
      }),
    ).toBeUndefined();
  });

  it("retains the explanation when completed and preserves the four choices", () => {
    expect(getQuestionMessage(questionPart(aiSetupQuestion))).toEqual({
      id: "question-1",
      text: aiSetupQuestion.message,
      streaming: false,
    });
    expect(questionSchema.parse(aiSetupQuestion).options).toHaveLength(4);
  });

  it("keeps a follow-up acknowledgement without a duplicate prose question", () => {
    const part = questionPart({
      ...aiSetupQuestion,
      message:
        "You’re using agents for answers. Let’s look at what happens after an answer.",
      question: "Which work still needs your team to carry it through?",
    });
    const duplicate: EveMessagePart = {
      type: "text",
      text: "Which work still needs your team to carry it through?",
    };
    const visible = getVisibleReplyParts([part, duplicate]);
    expect(visible).toEqual([part]);
    expect(getQuestionMessage(visible[0])?.text).toContain(
      "what happens after an answer",
    );
  });

  it("does not invent messages for older questions or expose failed tool arguments", () => {
    const { message, ...legacy } = aiSetupQuestion;
    expect(message).toBeTruthy();
    expect(getQuestionMessage(questionPart(legacy))).toBeUndefined();
    expect(
      getQuestionMessage({
        ...questionPart({ error: "Invalid sources" }),
        input: aiSetupQuestion,
      } as EveMessagePart),
    ).toBeUndefined();
    expect(
      getQuestionMessage({
        ...questionPart(aiSetupQuestion),
        toolName: "update_brief",
      } as EveMessagePart),
    ).toBeUndefined();
    expect(
      questionSchema.safeParse({ ...aiSetupQuestion, message: "x".repeat(361) })
        .success,
    ).toBe(false);
  });
});
