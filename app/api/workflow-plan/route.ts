import { planDeliveryToken } from "@/lib/workflow-plan/planDeliveryToken";
import { requestSchema, planSchema } from "@/lib/workflow-plan/schema";
import { createPlanHandler } from "@/lib/workflow-plan/createPlanHandler";
import { generatePlan } from "@/lib/workflow-plan/generatePlan";
import { allowPlanRequest } from "@/lib/workflow-plan/allowPlanRequest";

export const runtime = "nodejs";
export const maxDuration = 30;
const handle = createPlanHandler({
  generate: generatePlan,
  allow: allowPlanRequest,
  enabled: () => process.env.WORKFLOW_PLAN_AI_ENABLED === "true",
});


// Only server-generated plans may be mailed; callers cannot supply email content.
export async function POST(request: Request) {
  const key = process.env.RESEND_API_KEY;
  if (!key || !process.env.WORKFLOW_PLAN_EMAIL_FROM) return handle(request);
  const copy = request.clone();
  const response = await handle(request);
  if (!response.ok) return response;
  const result = await response.json();
  if (!result.plan) return Response.json(result, { headers: { "Cache-Control": "no-store" } });
  const input = requestSchema.parse(await copy.json());
  const token = planDeliveryToken(key).issue(input.answers, planSchema.parse(result.plan));
  return Response.json({ ...result, deliveryToken: token }, { headers: { "Cache-Control": "no-store" } });
}
