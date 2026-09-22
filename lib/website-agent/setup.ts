import { z } from "zod/v3";

/** Unknown and explicitly absent are different answers. */
export const setupSchema = z.object({
  aiUsage: z.string().max(400).nullable(),
  aiTools: z.array(z.string().max(100)).max(10).nullable(),
  dataSources: z.array(z.string().max(150)).max(10).nullable(),
  previousAttempts: z.string().max(600).nullable(),
  pilotOwner: z.string().max(200).nullable(),
  accessConstraints: z.string().max(600).nullable(),
}).strict();
