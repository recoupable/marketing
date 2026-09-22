"use client";

import { useId, useLayoutEffect, useRef, useState } from "react";
import { ArrowUp, ChevronDown, Square } from "lucide-react";
import type { z } from "zod/v3";
import {
  PromptInput,
  PromptInputHeader,
  PromptInputTextarea,
  PromptInputSubmit,
} from "@/components/ai-elements/prompt-input";
import { Suggestion } from "@/components/ai-elements/suggestion";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
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
  question?: z.infer<typeof questionSchema> & { id: string };
}) {
  const id = useId();
  const textarea = useRef<HTMLTextAreaElement>(null);
  const [collapsedQuestion, setCollapsedQuestion] = useState<string>();
  const [fileError, setFileError] = useState(false);
  const open = !!question && collapsedQuestion !== question.id;
  useLayoutEffect(() => {
    if (!textarea.current) return;
    textarea.current.style.height = "auto";
    textarea.current.style.height = `${Math.min(textarea.current.scrollHeight, 140)}px`;
  }, [input]);

  return (
    <div className="wa-chat-input">
      <PromptInput
        className="wa-prompt"
        maxFiles={0}
        onError={() => setFileError(true)}
        onSubmit={({ text }) => {
          if (!disabled && text.trim()) {
            onSend(text);
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
              <CollapsibleTrigger className="wa-question-toggle">
                <span>{question.question}</span>
                <ChevronDown size={16} aria-hidden="true" />
                <span className="sr-only">
                  {open ? "Collapse choices" : "Show choices"}
                </span>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div
                  className="wa-question-suggestions"
                  aria-label="Suggested answers"
                >
                  {question.options.map((option) => (
                    <Suggestion
                      key={option.label}
                      suggestion={option.label}
                      disabled={disabled}
                      onClick={onSend}
                      title={option.description}
                      aria-description={option.description}
                    >
                      {option.label}
                    </Suggestion>
                  ))}
                </div>
                {question.context && (
                  <details className="wa-question-why">
                    <summary>Why we’re asking</summary>
                    <p>{question.context}</p>
                  </details>
                )}
              </CollapsibleContent>
            </Collapsible>
          </PromptInputHeader>
        )}
        <div className="wa-prompt-row">
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
            placeholder={question ? "Or write an answer…" : "Message Recoup…"}
            onChange={(event) => onInput(event.target.value)}
          />
          <div className="wa-prompt-actions">
            {busy && input.trim() && (
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
            <PromptInputSubmit
              className="wa-prompt-submit"
              status={busy && !input.trim() ? "streaming" : "ready"}
              onStop={onStop}
              disabled={disabled || (!busy && !input.trim())}
              aria-label={
                busy && !input.trim() ? "Stop response" : "Send message"
              }
            >
              {busy && !input.trim() ? (
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
