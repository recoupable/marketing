import { z } from "zod";

const answer = z.enum(["yes", "no", "unknown"]);
export const strategySchema = z.object({
  workflow: z.string().trim().min(5).max(180),
  outcome: z.string().trim().min(10).max(400),
  purpose: z.enum(["feasibility", "capacity", "revenue"]),
  owner: z.string().trim().min(2).max(100),
  access: answer,
  example: answer,
  review: answer,
  baseline: answer,
  reviewDate: z.iso.date(),
  success: z.string().trim().min(10).max(400),
  stop: z.string().trim().min(10).max(400),
});

export type StrategyInput = z.infer<typeof strategySchema>;
