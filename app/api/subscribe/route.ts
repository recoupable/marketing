import { NextResponse } from "next/server";
import { z } from "zod";
import { submitSubscriberToAttio } from "@/lib/submitSubscriberToAttio";

/**
 * Zod schema for subscribe request body.
 * Captures email + optional name + UTM attribution params.
 */
const subscribeBodySchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  name: z.string().optional(),
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
  source_post_slug: z.string().optional(),
});

/**
 * POST /api/subscribe
 *
 * Captures a subscriber with UTM attribution, stores the contact in Attio and
 * pages a human that a lead arrived. Called by SubscribeForm, BlogCTA,
 * PlaybookForm, AuditForm and ROICalculator.
 *
 * Returns 502 when the lead could not be stored — the caller must surface that
 * rather than discard it (recoupable/chat#1800).
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = subscribeBodySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
    }

    const result = await submitSubscriberToAttio(parsed.data);

    if (!result.ok) {
      console.error("[subscribe] lead was not captured:", result.error);
      return NextResponse.json(
        { error: "We could not save your details. Please try again." },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}
