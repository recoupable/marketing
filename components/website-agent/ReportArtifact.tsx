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
import type { WorkflowPlan } from "@/lib/workflow-plan/schema";
import { PlanReport } from "./PlanReport";

export function ReportArtifact({ plan }: { plan: WorkflowPlan }) {
  function download() {
    const text = [
      plan.title,
      plan.summary,
      "WHAT YOUR TEAM GETS",
      plan.output,
      "YOUR FIRST STEP",
      plan.firstStep,
      "WHAT YOU NEED",
      ...plan.inputs,
      "HOW TO START",
      ...plan.steps.map((step, i) => `${i + 1}. ${step}`),
      "HUMAN REVIEW",
      plan.review,
      "CHECK IT WORKED",
      plan.success,
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
      aria-label="Your downloadable report"
    >
      <ArtifactHeader className="wa-report-header">
        <FileText size={21} aria-hidden="true" />
        <div>
          <ArtifactTitle>Your AI opportunity report</ArtifactTitle>
          <ArtifactDescription>
            Ready to download · Text document
          </ArtifactDescription>
        </div>
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
      </ArtifactHeader>
      <ArtifactContent className="wa-report-content">
        <PlanReport plan={plan} />
      </ArtifactContent>
    </Artifact>
  );
}
