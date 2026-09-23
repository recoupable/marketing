import type { EveMessagePart } from "eve/client";
import { z } from "zod/v3";
import { scorecardInputSchema, type Assessment } from "./scorecard";
import { insightSchema } from "./insight";
import { validateInsightSources } from "./validateInsightSources";

// Empty strings and short lists are normal while the next field is arriving.
const text = z.string().max(1200).optional();
const findingDraft = z.object({
  title: text,
  finding: text,
  implication: text,
  test: text,
});
const planDraft = z.object({
  title: text,
  summary: text,
  output: text,
  firstStep: text,
  review: text,
  success: text,
  inputs: z.array(z.string().max(220)).max(4).optional(),
  steps: z.array(z.string().max(1000)).max(5).optional(),
});

export function getStreamingPresentation(
  part: EveMessagePart,
  pages: Record<string, string>,
  reportAllowed: boolean,
  assessment?: Assessment,
) {
  if (
    part.type !== "dynamic-tool" ||
    !["input-streaming", "input-available"].includes(part.state)
  )
    return;
  if (part.toolName === "publish_scorecard" && assessment) {
    const summary = z
      .object({ summary: z.string().max(480).optional() })
      .safeParse(part.input);
    const moves = scorecardInputSchema
      .pick({ nextMoves: true })
      .safeParse(part.input);
    if (summary.success && summary.data.summary)
      return {
        kind: "scorecard" as const,
        value: {
          assessment,
          summary: summary.data.summary,
          ...(moves.success ? { nextMoves: moves.data.nextMoves } : {}),
        },
      };
  }
  if (part.toolName === "publish_finding") {
    const evidence = insightSchema
      .pick({ sources: true })
      .strip()
      .safeParse(part.input);
    const draft = findingDraft.safeParse(part.input);
    if (
      !evidence.success ||
      !draft.success ||
      validateInsightSources(evidence.data.sources, pages)
    )
      return;
    if (draft.data.title || draft.data.finding)
      return { kind: "finding" as const, value: draft.data };
  }
  if (part.toolName === "publish_plan" && reportAllowed) {
    const draft = planDraft.safeParse(part.input);
    if (draft.success && (draft.data.title || draft.data.summary))
      return { kind: "report" as const, value: draft.data };
  }
}
