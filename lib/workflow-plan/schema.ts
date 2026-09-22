import { z } from "zod/v3";

export const answersSchema = z
  .object({
    bottleneck: z.array(z.enum([
      "Catalog reporting",
      "Missing royalties",
      "Pitching for briefs",
      "Acquisition diligence",
      "Something else",
    ])).min(1).max(5),
    sources: z
      .array(
        z.enum([
          "Spreadsheets",
          "Royalty platforms",
          "Shared drives",
          "Email",
          "Catalog database",
          "Not sure yet",
        ]),
      )
      .min(1)
      .max(6),
    outcome: z.array(z.enum([
      "A weekly catalog income report",
      "A royalty review queue",
      "A shortlist for each brief",
      "An acquisition diligence checklist",
      "A shared catalog dashboard",
      "Help me decide",
    ])).min(1).max(6),
  })
  .strict();
export type WorkflowAnswers = z.infer<typeof answersSchema>;
export const planSchema = z.object({
  title: z.string().min(1).max(100),
  summary: z.string().min(1).max(500),
  output: z.string().min(1).max(1200).describe("Complete description of the deliverable and essential fields. Never cut off a sentence or field list."),
  inputs: z.array(z.string().min(1).max(220)).min(2).max(4),
  steps: z.array(z.string().min(1).max(1000)).min(3).max(5),
  review: z.string().min(1).max(1200),
  firstStep: z.string().min(1).max(400),
  success: z.string().min(1).max(800),
});
export type WorkflowPlan = z.infer<typeof planSchema>;
export const requestSchema = z
  .object({
    answers: answersSchema,
    plan: planSchema.optional(),
    question: z.string().trim().min(3).max(500).optional(),
  })
  .strict()
  .refine((value) => !value.question || value.plan, "A follow-up needs a plan");

export const draftAnswersSchema = answersSchema.extend({
  bottleneck: answersSchema.shape.bottleneck.min(0),
  sources: answersSchema.shape.sources.min(0),
  outcome: answersSchema.shape.outcome.min(0),
});
