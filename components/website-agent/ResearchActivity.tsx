"use client";

import { useEffect, useId, useState } from "react";
import { Check, CircleAlert, LoaderCircle, Minus } from "lucide-react";
import {
  ChainOfThought,
  ChainOfThoughtContent,
  ChainOfThoughtHeader,
  ChainOfThoughtStep,
} from "@/components/ai-elements/chain-of-thought";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { Marker, MarkerContent } from "@/components/ui/marker";
import type { ActivityStep } from "@/lib/website-agent/getActivitySteps";

export function ResearchActivity({
  steps,
  active,
}: {
  steps: ActivityStep[];
  active: boolean;
}) {
  const contentId = useId();
  const [revealed, setRevealed] = useState(false);
  const [chosenOpen, setChosenOpen] = useState<boolean>();
  const hasSteps = steps.length > 0;
  useEffect(() => {
    if (!hasSteps) return;
    const timer = window.setTimeout(() => setRevealed(true), 450);
    return () => window.clearTimeout(timer);
  }, [hasSteps]);

  if (!hasSteps)
    return active ? (
      <Marker className="wa-thinking" role="status">
        <MarkerContent>
          <Shimmer>Thinking…</Shimmer>
        </MarkerContent>
      </Marker>
    ) : null;

  const current = steps.find((step) => step.state === "active");
  const checkedSources = new Set(
    steps
      .filter((step) => step.state === "complete" && step.url)
      .map((step) => step.url),
  ).size;
  const failed = steps.some((step) => step.state === "failed");
  const label = active
    ? (current?.label ?? "Thinking…")
    : checkedSources
      ? `Checked ${checkedSources} ${checkedSources === 1 ? "source" : "sources"}${failed ? " · some unavailable" : ""}`
      : failed
        ? "Some information was unavailable"
        : steps.some(
              (step) =>
                step.label === "Preparing your report" &&
                step.state === "complete",
            )
          ? "Report ready"
          : steps.some((step) => step.label === "Saving your answers")
            ? "Saved your answers"
            : "Research complete";

  return (
    <ChainOfThought
      className="wa-turn-activity"
      open={chosenOpen ?? revealed}
      onOpenChange={setChosenOpen}
    >
      <ChainOfThoughtHeader
        className="wa-activity-heading"
        aria-controls={contentId}
      >
        {active ? <Shimmer>{label}</Shimmer> : label}
      </ChainOfThoughtHeader>
      <ChainOfThoughtContent
        id={contentId}
        className="wa-activity-trail"
        aria-label="Research activity"
      >
        {steps.map((step) => (
          <ChainOfThoughtStep
            key={step.id}
            className={`wa-trail-step is-${step.state}`}
            icon={
              step.state === "active"
                ? LoaderCircle
                : step.state === "failed"
                  ? CircleAlert
                  : step.state === "stopped"
                    ? Minus
                    : Check
            }
            status={step.state === "active" ? "active" : "complete"}
            label={
              step.url ? (
                <a
                  href={step.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="wa-trail-source"
                >
                  <span
                    className="wa-trail-favicon"
                    aria-hidden="true"
                    style={{
                      backgroundImage: `url("/api/company-favicon?domain=${encodeURIComponent(step.domain!)}")`,
                    }}
                  />
                  <span>
                    {step.state === "complete" ? step.title : step.label}
                  </span>
                </a>
              ) : (
                step.label
              )
            }
          />
        ))}
      </ChainOfThoughtContent>
    </ChainOfThought>
  );
}
