"use client";

import { Download, ChartNoAxesColumnIncreasing } from "lucide-react";
import {
  Artifact,
  ArtifactHeader,
  ArtifactTitle,
  ArtifactDescription,
  ArtifactContent,
  ArtifactActions,
} from "@/components/ai-elements/artifact";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { Suggestion } from "@/components/ai-elements/suggestion";
import { Button } from "@/components/ui/button";
import {
  scorecardSchema,
  type ScorecardDraft,
} from "@/lib/website-agent/scorecard";
import { scorecardText } from "@/lib/website-agent/scorecardText";
import { ScorecardReport } from "./ScorecardReport";

export function ScorecardArtifact({
  scorecard,
  streaming = false,
  onSend,
}: {
  scorecard: ScorecardDraft;
  streaming?: boolean;
  onSend: (text: string) => void;
}) {
  const complete = !streaming && scorecardSchema.safeParse(scorecard).success;
  function download() {
    if (!complete) return;
    const url = URL.createObjectURL(
      new Blob([scorecardText(scorecardSchema.parse(scorecard))], {
        type: "text/plain;charset=utf-8",
      }),
    );
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "recoup-ai-scorecard.txt";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return (
    <Artifact
      className="wa-scorecard-artifact"
      aria-label="Your AI Scorecard"
      aria-busy={streaming}
    >
      <ArtifactHeader className="wa-scorecard-header">
        <ChartNoAxesColumnIncreasing size={19} aria-hidden="true" />
        <div>
          <ArtifactTitle className="wa-scorecard-title">
            AI Scorecard
          </ArtifactTitle>
          <ArtifactDescription className="wa-scorecard-description">
            {streaming ? (
              <Shimmer>Connecting your answers…</Shimmer>
            ) : (
              `Based on your answers · ${scorecard.assessedAt}`
            )}
          </ArtifactDescription>
        </div>
        {complete && (
          <ArtifactActions>
            <Button
              variant="ghost"
              onClick={download}
              aria-label="Download your AI Scorecard"
            >
              <Download size={16} />
              <span>Download</span>
            </Button>
          </ArtifactActions>
        )}
      </ArtifactHeader>
      <ArtifactContent className="wa-scorecard-content">
        <ScorecardReport scorecard={scorecard} streaming={streaming} />
      </ArtifactContent>
      {complete && (
        <div className="wa-scorecard-followup">
          <p>Put your next move into practice.</p>
          <div>
            <Suggestion
              suggestion="Help me build an implementation plan for the first next move in my scorecard."
              onClick={onSend}
            >
              Build my action plan
            </Suggestion>
            <Suggestion
              suggestion="I want to correct something in my AI Scorecard."
              onClick={onSend}
            >
              Correct an answer
            </Suggestion>
          </div>
        </div>
      )}
    </Artifact>
  );
}
