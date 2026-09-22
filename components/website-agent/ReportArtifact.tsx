"use client";

import { Download, FileText } from "lucide-react";
import {
  Artifact,
  ArtifactContent,
  ArtifactHeader,
  ArtifactTitle,
  ArtifactDescription,
  ArtifactActions,
} from "@/components/ai-elements/artifact";
import { Button } from "@/components/ui/button";
import { planSchema, type WorkflowPlan } from "@/lib/workflow-plan/schema";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { PlanReport } from "./PlanReport";

export function ReportArtifact({
  plan,
  streaming = false,
}: {
  plan: Partial<WorkflowPlan>;
  streaming?: boolean;
}) {
  const complete = !streaming && planSchema.safeParse(plan).success;
  function download() {
    if (!complete) return;
    const final = planSchema.parse(plan);
    const text = [
      final.title,
      final.summary,
      "WHAT YOUR TEAM GETS",
      final.output,
      "YOUR FIRST STEP",
      final.firstStep,
      "WHAT YOU NEED",
      ...final.inputs,
      "HOW TO START",
      ...final.steps.map((step, i) => `${i + 1}. ${step}`),
      "HUMAN REVIEW",
      final.review,
      "CHECK IT WORKED",
      final.success,
    ].join("\n\n");
    const url = URL.createObjectURL(
      new Blob([text], { type: "text/plain;charset=utf-8" }),
    );
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "recoup-ai-opportunity-report.txt";
    anchor.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return (
    <Artifact
      className="wa-report-artifact"
      aria-label={
        streaming ? "Your report is being written" : "Your downloadable report"
      }
      aria-busy={streaming}
    >
      <ArtifactHeader className="wa-report-header">
        <FileText size={21} aria-hidden="true" />
        <div>
          <ArtifactTitle>Your AI opportunity report</ArtifactTitle>
          <ArtifactDescription>
            {streaming ? (
              <Shimmer>Writing your report…</Shimmer>
            ) : (
              "Ready to download · Text document"
            )}
          </ArtifactDescription>
        </div>
        {complete && (
          <ArtifactActions>
            <Button
              variant="ghost"
              onClick={download}
              aria-label="Download your report"
              className="wa-report-download"
            >
              <Download size={16} />
              <span>Download</span>
            </Button>
          </ArtifactActions>
        )}
      </ArtifactHeader>
      <ArtifactContent className="wa-report-content">
        <PlanReport plan={plan} streaming={streaming} />
      </ArtifactContent>
    </Artifact>
  );
}
