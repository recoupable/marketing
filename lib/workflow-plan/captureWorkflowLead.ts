import { z } from "zod/v3";
import { postLead } from "@/lib/leads/postLead";
import { answersSchema, type WorkflowAnswers } from "./schema";

const contactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(254),
});

export async function captureWorkflowLead(
  contact: { name: string; email: string },
  answers: WorkflowAnswers,
  fetcher: typeof fetch = fetch,
) {
  const parsed = contactSchema.safeParse(contact);
  const context = answersSchema.safeParse(answers);
  if (!parsed.success || !context.success)
    return { ok: false as const, error: "Please check your name, email, and answers." };
  return postLead({
    kind: "subscribe",
    source: "/workflow-plan",
    ...parsed.data,
    audit_answers: context.data,
    utm_source: "website",
    utm_medium: "lead-magnet",
    utm_campaign: "workflow-plan",
  }, fetcher);
}
