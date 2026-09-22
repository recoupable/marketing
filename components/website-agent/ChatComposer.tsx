"use client";

import { useId, useLayoutEffect, useRef, useState } from "react";
import {
  ArrowUp,
  Check,
  ChevronDown,
  Info,
  MessageCircleQuestion,
  Pencil,
  Square,
  X,
} from "lucide-react";
import type { z } from "zod/v3";
import {
  PromptInput,
  PromptInputHeader,
  PromptInputTextarea,
  PromptInputSubmit,
} from "@/components/ai-elements/prompt-input";
import { Suggestion } from "@/components/ai-elements/suggestion";
import { MessageResponse } from "@/components/ai-elements/message";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { questionSchema } from "@/lib/website-agent/question";

export function ChatComposer({
  input,
  onInput,
  onSend,
  onStop,
  busy,
  disabled,
  question,
}: {
  input: string;
  onInput: (text: string) => void;
  onSend: (text: string) => void;
  onStop: () => void;
  busy: boolean;
  disabled: boolean;
  question?: z.infer<typeof questionSchema> & { id: string; pending?: boolean };
}) {
  const id = useId();
  const textarea = useRef<HTMLTextAreaElement>(null);
  const [collapsedQuestion, setCollapsedQuestion] = useState<string>();
  const [helpQuestion, setHelpQuestion] = useState<string>();
  const [selection, setSelection] = useState<{
    questionId: string;
    label: string;
  }>();
  const [fileError, setFileError] = useState(false);
  const open = !!question && collapsedQuestion !== question.id;
  const selected =
    selection?.questionId === question?.id ? selection?.label : undefined;
  const answer = input.trim() || selected || "";
  const stopOnSubmit = busy && !answer && !question;
  useLayoutEffect(() => {
    if (!textarea.current) return;
    textarea.current.style.height = "auto";
    textarea.current.style.height = `${Math.min(textarea.current.scrollHeight, 140)}px`;
  }, [input]);

  return (
    <div className="wa-chat-input">
      <PromptInput
        className={`wa-prompt${question ? " wa-prompt-has-question" : ""}`}
        maxFiles={0}
        onError={() => setFileError(true)}
        onSubmit={({ text }) => {
          const reply = text.trim() || selected;
          if (!disabled && !question?.pending && reply) {
            onSend(reply);
            setSelection(undefined);
            setFileError(false);
          }
        }}
      >
        {question && (
          <PromptInputHeader className="wa-prompt-question">
            <Collapsible
              open={open}
              onOpenChange={(next) =>
                setCollapsedQuestion(next ? undefined : question.id)
              }
              className="wa-question-disclosure"
            >
              <div className="wa-question-meta">
                <span className="wa-question-caption">
                  <MessageCircleQuestion size={16} aria-hidden="true" />
                  Question
                </span>
                <div className="wa-question-controls">
                  {question.context && (
                    <TooltipProvider delayDuration={250}>
                      <Tooltip
                        open={helpQuestion === question.id}
                        onOpenChange={(next) =>
                          setHelpQuestion(next ? question.id : undefined)
                        }
                      >
                        <TooltipTrigger asChild>
                          <Button
                            type="button"
                            variant="ghost"
                            className="wa-question-help"
                            aria-label="Why we’re asking"
                            onClick={() =>
                              setHelpQuestion((current) =>
                                current === question.id
                                  ? undefined
                                  : question.id,
                              )
                            }
                          >
                            <Info size={15} aria-hidden="true" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent
                          className="wa-question-help-popover"
                          side="top"
                          sideOffset={8}
                        >
                          {question.context}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                  <CollapsibleTrigger asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      className="wa-question-toggle"
                      aria-label={open ? "Collapse question" : "Show question"}
                    >
                      {open ? (
                        <X size={16} aria-hidden="true" />
                      ) : (
                        <ChevronDown size={16} aria-hidden="true" />
                      )}
                    </Button>
                  </CollapsibleTrigger>
                </div>
              </div>
              {!open && (
                <p className="wa-question-collapsed">{question.question}</p>
              )}
              <CollapsibleContent className="wa-question-content">
                <div
                  className="wa-question-title"
                  id={`${id}-question`}
                  aria-busy={question.pending}
                >
                  <MessageResponse isAnimating={!!question.pending}>
                    {question.question}
                  </MessageResponse>
                </div>
                <div
                  className="wa-question-suggestions"
                  role="group"
                  aria-labelledby={`${id}-question`}
                >
                  {question.options.map((option, index) => (
                    <Suggestion
                      key={option.label}
                      suggestion={option.label}
                      disabled={disabled || question.pending}
                      onClick={(label) => {
                        setSelection(
                          selected === label
                            ? undefined
                            : { questionId: question.id, label },
                        );
                        onInput("");
                      }}
                      aria-pressed={selected === option.label}
                      title={option.description}
                      aria-description={option.description}
                    >
                      <span className="wa-option-number" aria-hidden="true">
                        {selected === option.label ? (
                          <Check size={14} />
                        ) : (
                          index + 1
                        )}
                      </span>
                      <span className="wa-option-label">{option.label}</span>
                    </Suggestion>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          </PromptInputHeader>
        )}
        <div className="wa-prompt-row">
          {question && (
            <span className="wa-answer-pencil" aria-hidden="true">
              <Pencil size={14} />
            </span>
          )}
          <label htmlFor={id} className="sr-only">
            Your message
          </label>
          <PromptInputTextarea
            id={id}
            ref={textarea}
            rows={1}
            maxLength={6000}
            value={input}
            disabled={disabled}
            placeholder={
              question ? "Or write your own answer…" : "Message Recoup…"
            }
            onChange={(event) => {
              setSelection(undefined);
              onInput(event.target.value);
            }}
          />
          <div className="wa-prompt-actions">
            {busy && (question || answer) && (
              <Button
                type="button"
                variant="ghost"
                className="wa-stop-secondary"
                aria-label="Stop response"
                onClick={onStop}
              >
                <Square size={14} fill="currentColor" />
              </Button>
            )}
            {question && (
              <Button
                type="button"
                variant="ghost"
                className="wa-question-skip"
                disabled={disabled || question.pending}
                onClick={() => {
                  setSelection(undefined);
                  onSend("Skip this question for now.");
                }}
              >
                Skip
              </Button>
            )}
            <PromptInputSubmit
              className={`wa-prompt-submit${question ? " wa-answer-send" : ""}`}
              status={stopOnSubmit ? "streaming" : "ready"}
              onStop={onStop}
              disabled={
                disabled || !!question?.pending || (!stopOnSubmit && !answer)
              }
              aria-label={
                stopOnSubmit
                  ? "Stop response"
                  : question
                    ? "Send answer"
                    : "Send message"
              }
            >
              {question ? (
                "Send"
              ) : stopOnSubmit ? (
                <Square size={13} fill="currentColor" />
              ) : (
                <ArrowUp size={19} />
              )}
            </PromptInputSubmit>
          </div>
        </div>
      </PromptInput>
      {fileError && (
        <p className="wa-input-note" role="status">
          Paste text or a website link here. File uploads aren’t available in
          this chat.
        </p>
      )}
    </div>
  );
}
