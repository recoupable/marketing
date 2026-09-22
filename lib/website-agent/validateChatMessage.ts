import { z } from "zod";

const schema = z.object({
  message: z.string().max(6000).trim().min(1),
  turnPolicy: z.literal("steer").optional(),
  clientContext: z
    .object({ entryMode: z.enum(["faq", "planner"]).catch("planner") })
    .catch({ entryMode: "planner" }),
});

export function validateChatMessage(input: unknown) {
  return schema.safeParse(input);
}
