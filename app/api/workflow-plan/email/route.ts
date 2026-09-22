import { createHash } from "node:crypto";
import { z } from "zod/v3";
import { planDeliveryToken } from "@/lib/workflow-plan/planDeliveryToken";
import { planText } from "@/lib/workflow-plan/planText";
import { allowPlanRequest } from "@/lib/workflow-plan/allowPlanRequest";

export const runtime = "nodejs";
export const maxDuration = 30;
export async function POST(request: Request) {
  const json = (body: unknown, status = 200) => Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
  const key = process.env.RESEND_API_KEY;
  const from = process.env.WORKFLOW_PLAN_EMAIL_FROM;
  if (!key || !from) return json({ error: "Email delivery is not configured." }, 503);
  try {
    if (new URL(request.headers.get("origin") || "").host !== (request.headers.get("host") || new URL(request.url).host))
      return json({ error: "Please use this website." }, 403);
  } catch { return json({ error: "Please use this website." }, 403); }
  if (!allowPlanRequest(request)) return json({ error: "Please try again later." }, 429);
  try {
    const reader = request.body?.getReader();
    if (!reader) return json({ error: "Missing details." }, 400);
    let size = 0;
    const chunks: Uint8Array[] = [];
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 24000) { await reader.cancel(); return json({ error: "Request too large." }, 413); }
      chunks.push(value);
    }
    const input = z.object({
      email: z.string().trim().email().max(254),
      token: z.string().max(22000),
    }).parse(JSON.parse(Buffer.concat(chunks).toString()));
    const { answers, plan } = planDeliveryToken(key).verify(input.token);
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        "Idempotency-Key": createHash("sha256").update(input.email.toLowerCase() + input.token).digest("hex"),
      },
      body: JSON.stringify({
        from, to: [input.email], subject: "Your Recoup workflow brief",
        text: planText(answers, plan),
      }),
      signal: AbortSignal.timeout(20000),
    });
    const receipt = await response.json();
    if (!response.ok || !receipt.id) return json({ error: "Your plan is ready, but the email could not be sent. Please retry." }, 502);
    return json({ ok: true });
  } catch { return json({ error: "Could not email this plan. Please regenerate it and try again." }, 400); }
}
