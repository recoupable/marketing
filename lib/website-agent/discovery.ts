import { z } from "zod/v3";

const answer = z.string().trim().min(1).max(400).nullable();

export const discoverySchema = z
  .object({
    scope: answer.describe(
      "Visitor's role, team and the part of the company this report covers.",
    ),
    priority: answer.describe(
      "Business outcome the visitor actually wants to improve, not an idea selected by the agent.",
    ),
    currentProcess: answer.describe(
      "How the work happens today, from input to finished output.",
    ),
    problem: answer.describe(
      "What is difficult or missing, and why it matters to the visitor.",
    ),
    workload: answer.describe(
      "Frequency, approximate volume or time spent, as described by the visitor.",
    ),
    successMeasure: answer.describe(
      "What would make a first test useful, in the visitor's terms.",
    ),
  })
  .strict();
