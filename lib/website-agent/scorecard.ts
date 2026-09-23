import { z } from "zod/v3";
import {
  scorecardRubric,
  type ScorecardArea,
  type ScorecardCriterion,
} from "./scorecardRubric";
import { insightSchema } from "./insight";
import { briefReviewSchema } from "./briefReview";

const criterionIds = scorecardRubric.flatMap((area) =>
  area.criteria.map((criterion) => criterion.id),
);
export const criterionIdSchema = z.enum(
  criterionIds as [ScorecardCriterion, ...ScorecardCriterion[]],
);
export const areaIdSchema = z.enum(
  scorecardRubric.map((area) => area.id) as [ScorecardArea, ...ScorecardArea[]],
);
export const evidenceFactSchema = z
  .object({
    summary: z.string().trim().min(12).max(360),
    quote: z.string().trim().min(1).max(600),
    question: z.string().min(1).max(100).optional(),
  })
  .strict();
export const assessmentCriterionSchema = z
  .object({
    id: criterionIdSchema,
    status: z.enum(["yes", "no", "unknown"]),
    quote: z.string().trim().min(1).max(600).nullable(),
    question: z.string().min(1).max(100).optional(),
  })
  .strict()
  .refine(
    (value) =>
      value.status === "unknown"
        ? value.quote === null && !value.question
        : !!value.quote,
    {
      message:
        "Known answers require a verbatim visitor quote; unknown answers use null.",
    },
  );
export const assessmentSchema = z
  .object({
    scope: evidenceFactSchema.nullable(),
    priority: evidenceFactSchema.nullable(),
    criteria: z
      .array(assessmentCriterionSchema)
      .max(15)
      .refine(
        (items) => new Set(items.map((item) => item.id)).size === items.length,
        "Each criterion appears once.",
      ),
  })
  .strict();
export const scorecardReviewSchema = briefReviewSchema.extend({
  assessment: assessmentSchema,
});
export const assessmentUpdateSchema = z
  .object({
    scope: evidenceFactSchema
      .nullable()
      .optional()
      .describe(
        "A new or corrected scope. Null or omitted keeps the saved scope.",
      ),
    priority: evidenceFactSchema
      .nullable()
      .optional()
      .describe(
        "A new or corrected future priority. Null or omitted keeps the saved priority.",
      ),
    criteria: assessmentSchema.shape.criteria,
  })
  .strict();

const nextMoveSchema = z
  .object({
    area: areaIdSchema,
    action: z.string().min(5).max(100),
    why: z.string().min(12).max(280),
    firstStep: z.string().min(12).max(360),
    check: z.string().min(12).max(280),
  })
  .strict();
const peerSchema = z
  .object({
    company: z.string().min(1).max(80),
    relevance: z.string().min(12).max(200),
    practice: z.string().min(12).max(280),
    published: z.string().max(40).nullable(),
    source: insightSchema.shape.sources.element,
  })
  .strict();
export const scorecardInputSchema = z
  .object({
    summary: z.string().min(20).max(480),
    nextMoves: z.array(nextMoveSchema).min(1).max(3),
    peers: z.array(peerSchema).max(3),
  })
  .strict();
export const scorecardSchema = scorecardInputSchema.extend({
  assessment: assessmentSchema,
  version: z.literal("recoup-ai-scorecard-v1"),
  assessedAt: z.string(),
});
export type Assessment = z.infer<typeof assessmentSchema>;
export type Scorecard = z.infer<typeof scorecardSchema>;
export type ScorecardDraft = Pick<Scorecard, "assessment"> &
  Partial<Omit<Scorecard, "assessment">>;
