"use client";

import { useState } from "react";
import { Check, Copy, RotateCcw } from "lucide-react";
import {
  Message,
  MessageContent,
  MessageResponse,
  MessageActions,
  MessageAction,
} from "@/components/ai-elements/message";
import { Suggestion } from "@/components/ai-elements/suggestion";
import { getActivitySteps } from "@/lib/website-agent/getActivitySteps";
import { getVisibleReplyParts } from "@/lib/website-agent/getVisibleReplyParts";
import type { ConversationTurn } from "@/lib/website-agent/getConversationTurns";
import { questionSchema } from "@/lib/website-agent/question";
import { planSchema } from "@/lib/workflow-plan/schema";
import { ResearchActivity } from "./ResearchActivity";
import { CompanyInsight } from "./CompanyInsight";
import { ReportArtifact } from "./ReportArtifact";

export function ChatTurn({
  turn,
  active,
  latest,
  stopped,
  error,
  onSend,
}: {
  turn: ConversationTurn;
  active: boolean;
  latest: boolean;
  stopped: boolean;
  error: boolean;
  onSend: (text: string) => void;
}) {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const parts = turn.assistants.flatMap((message) => message.parts);
  const replyParts = turn.assistants.flatMap((message) =>
    getVisibleReplyParts(message.parts),
  );
  const steps = getActivitySteps(parts, active);
  const hasVisibleAnswer =
    !latest ||
    replyParts.some(
      (part) =>
        (part.type === "text" && part.text.trim()) ||
        (part.type === "dynamic-tool" &&
          part.state === "output-available" &&
          questionSchema.safeParse(part.output).data?.insight),
    );
  const copy = replyParts
    .flatMap((part) => {
      if (part.type === "text") return [part.text];
      if (part.type !== "dynamic-tool" || part.state !== "output-available")
        return [];
      const question = questionSchema.safeParse(part.output);
      if (!question.success) return [];
      const { insight, question: text } = question.data;
      return insight
        ? [
            insight.title,
            insight.finding,
            insight.implication,
            insight.test,
            ...insight.sources.map(
              (source) => `${source.title}: ${source.url}`,
            ),
            text,
          ]
        : [text];
    })
    .join("\n\n");
  const userText =
    turn.user?.parts
      .filter((part) => part.type === "text")
      .map((part) => part.text)
      .join("\n\n") ?? "";

  return (
    <div className="wa-turn" data-turn-id={turn.id}>
      {turn.user && (
        <Message
          from="user"
          className="wa-message wa-user"
          aria-label="Your message"
        >
          <MessageContent className="wa-message-content">
            <p className="wa-user-text">{userText}</p>
          </MessageContent>
        </Message>
      )}
      <div className="wa-assistant-turn">
        <ResearchActivity steps={steps} active={active} />
        <Message
          from="assistant"
          className="wa-message wa-assistant"
          aria-label="Recoup response"
        >
          <MessageContent className="wa-message-content">
            {replyParts.map((part, index) => {
              if (part.type === "text" && part.text.trim())
                return (
                  <MessageResponse
                    key={`text-${index}`}
                    isAnimating={active && part.state === "streaming"}
                  >
                    {part.text}
                  </MessageResponse>
                );
              if (
                part.type !== "dynamic-tool" ||
                part.state !== "output-available" ||
                part.partial
              )
                return null;
              if (
                ["ask_user_question", "present_choices"].includes(part.toolName)
              ) {
                const result = questionSchema.safeParse(part.output);
                if (!result.success) return null;
                return (
                  <div className="wa-turn-question" key={part.toolCallId}>
                    {result.data.insight && (
                      <CompanyInsight insight={result.data.insight} />
                    )}
                    {!latest && (
                      <p className="wa-asked-question">
                        {result.data.question}
                      </p>
                    )}
                  </div>
                );
              }
              if (part.toolName === "publish_plan") {
                const result = planSchema.safeParse(part.output);
                return result.success ? (
                  <ReportArtifact key={part.toolCallId} plan={result.data} />
                ) : null;
              }
              return null;
            })}
          </MessageContent>
          {!active && copy && hasVisibleAnswer && (
            <MessageActions className="wa-message-actions">
              <MessageAction
                tooltip={copied ? "Copied" : "Copy response"}
                aria-label={copied ? "Copied" : "Copy response"}
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(copy);
                    setCopied(true);
                    setCopyError(false);
                    window.setTimeout(() => setCopied(false), 1800);
                  } catch {
                    setCopyError(true);
                  }
                }}
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
              </MessageAction>
              {copyError && (
                <span role="status">Select the text to copy it.</span>
              )}
            </MessageActions>
          )}
        </Message>
        {stopped && (
          <div className="wa-turn-notice">
            <span>Response stopped.</span>
            {latest && (
              <Suggestion
                suggestion="Continue where you stopped."
                onClick={onSend}
              >
                Continue
              </Suggestion>
            )}
          </div>
        )}
        {error && (
          <div className="wa-turn-error" role="alert">
            <span>
              Something interrupted this response. Your messages are still here.
            </span>
            <Suggestion
              suggestion={userText || "Please continue."}
              onClick={onSend}
            >
              <RotateCcw size={14} /> Try again
            </Suggestion>
          </div>
        )}
      </div>
    </div>
  );
}
