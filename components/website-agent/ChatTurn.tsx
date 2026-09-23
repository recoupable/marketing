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
import { getQuestionMessage } from "@/lib/website-agent/getQuestionMessage";
import type { ConversationTurn } from "@/lib/website-agent/getConversationTurns";
import { questionSchema } from "@/lib/website-agent/question";
import { insightSchema } from "@/lib/website-agent/insight";
import { briefReviewSchema } from "@/lib/website-agent/briefReview";
import { BriefReview } from "./BriefReview";
import { planSchema } from "@/lib/workflow-plan/schema";
import { ResearchActivity } from "./ResearchActivity";
import { CompanyInsight } from "./CompanyInsight";
import { ReportArtifact } from "./ReportArtifact";
import { ScorecardArtifact } from "./ScorecardArtifact";
import { ScorecardReview } from "./ScorecardReview";
import {
  assessmentSchema,
  scorecardSchema,
  type Assessment,
} from "@/lib/website-agent/scorecard";
import { getStreamingPresentation } from "@/lib/website-agent/getStreamingPresentation";

export function ChatTurn({
  turn,
  hideUserMessage = false,
  active,
  latest,
  stopped,
  error,
  onSend,
  researchPages,
  reportPreviewAllowed,
  scorecardPreview,
}: {
  turn: ConversationTurn;
  hideUserMessage?: boolean;
  active: boolean;
  latest: boolean;
  stopped: boolean;
  error: boolean;
  onSend: (text: string) => void;
  researchPages: Record<string, string>;
  reportPreviewAllowed: boolean;
  scorecardPreview?: Assessment;
}) {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const parts = turn.assistants.flatMap((message) => message.parts);
  const replyParts = turn.assistants.flatMap((message) =>
    getVisibleReplyParts(message.parts),
  );
  const steps = getActivitySteps(parts, active);
  const questionMessages = replyParts.flatMap((part) => {
    const message = getQuestionMessage(part);
    return message ? [message] : [];
  });
  const hasVisibleAnswer =
    !latest ||
    questionMessages.length > 0 ||
    replyParts.some(
      (part) =>
        (part.type === "text" && part.text.trim()) ||
        (part.type === "dynamic-tool" &&
          part.state === "output-available" &&
          (questionSchema.safeParse(part.output).data?.insight ||
            (part.toolName === "publish_finding" &&
              insightSchema.safeParse(part.output).success))),
    );
  const copy = replyParts
    .flatMap((part) => {
      if (part.type === "text") return [part.text];
      if (part.type !== "dynamic-tool" || part.state !== "output-available")
        return [];
      const question = questionSchema.safeParse(part.output);
      const finding =
        part.toolName === "publish_finding"
          ? insightSchema.safeParse(part.output).data
          : undefined;
      if (!question.success && !finding) return [];
      const insight = finding ?? question.data?.insight;
      const text = question.data?.question ?? "";
      return insight
        ? [
            insight.title,
            insight.finding,
            insight.implication,
            insight.test,
            ...insight.sources.map(
              (source) => `${source.title}: ${source.url}`,
            ),
            question.data?.message ?? "",
            text,
          ]
        : [question.data?.message ?? "", text];
    })
    .join("\n\n");
  const userText =
    turn.user?.parts
      .filter((part) => part.type === "text")
      .map((part) => part.text)
      .join("\n\n") ?? "";

  return (
    <div className="wa-turn" data-turn-id={turn.id}>
      {turn.user && !hideUserMessage && (
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
        {questionMessages.map((message) => (
          <Message
            key={message.id}
            from="assistant"
            className="wa-message wa-assistant wa-conversation-message"
            aria-label="Recoup message"
          >
            <MessageContent className="wa-message-content">
              <MessageResponse isAnimating={active && message.streaming}>
                {message.text}
              </MessageResponse>
            </MessageContent>
          </Message>
        ))}
        <ResearchActivity
          steps={steps}
          active={
            active && (latest || steps.some((step) => step.state === "active"))
          }
        />
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
              const preview = active
                ? getStreamingPresentation(
                    part,
                    researchPages,
                    reportPreviewAllowed,
                    scorecardPreview,
                  )
                : undefined;
              if (preview && part.type === "dynamic-tool") {
                if (preview.kind === "scorecard")
                  return (
                    <ScorecardArtifact
                      key={part.toolCallId}
                      scorecard={preview.value}
                      streaming
                      onSend={onSend}
                    />
                  );
                return preview.kind === "finding" ? (
                  <CompanyInsight
                    key={part.toolCallId}
                    insight={preview.value}
                    streaming
                  />
                ) : (
                  <ReportArtifact
                    key={part.toolCallId}
                    plan={preview.value}
                    streaming
                  />
                );
              }
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
              if (part.toolName === "publish_scorecard") {
                const result = scorecardSchema.safeParse(part.output);
                return result.success ? (
                  <ScorecardArtifact
                    key={part.toolCallId}
                    scorecard={result.data}
                    onSend={onSend}
                  />
                ) : null;
              }
              if (
                part.toolName === "review_scorecard" &&
                part.output &&
                typeof part.output === "object"
              ) {
                const result = assessmentSchema.safeParse(
                  (part.output as Record<string, unknown>).assessment,
                );
                return result.success ? (
                  <ScorecardReview
                    key={part.toolCallId}
                    assessment={result.data}
                  />
                ) : null;
              }
              if (part.toolName === "publish_plan") {
                const result = planSchema.safeParse(part.output);
                return result.success ? (
                  <ReportArtifact key={part.toolCallId} plan={result.data} />
                ) : null;
              }
              if (part.toolName === "publish_finding") {
                const result = insightSchema.safeParse(part.output);
                return result.success ? (
                  <CompanyInsight key={part.toolCallId} insight={result.data} />
                ) : null;
              }
              if (part.toolName === "review_brief") {
                const result = briefReviewSchema.safeParse(part.output);
                return result.success ? (
                  <BriefReview key={part.toolCallId} review={result.data} />
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
