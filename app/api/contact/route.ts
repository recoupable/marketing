import { NextResponse } from "next/server";
import { z } from "zod";
import { createAttioLead } from "@/lib/attio";

/**
 * POST /api/contact (W-13)
 *
 * Qualified lead capture for the contact form — replaces the mailto: path on
 * /consulting, /partners, /trust. Validates with Zod, then asserts a person in
 * Attio with the qualification fields. Returns a generic error to the client.
 */
const contactBodySchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  name: z.string().min(1, "Please enter your name"),
  company: z.string().optional(),
  orgType: z.enum(["label", "catalog", "distributor", "management", "other"]).optional(),
  projectSize: z.enum(["one-session", "sprint", "ongoing", "partnership", "unsure"]).optional(),
  message: z.string().max(2000).optional(),
  source: z.string().optional(),
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactBodySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 },
      );
    }

    const result = await createAttioLead(parsed.data);

    if (!result.success) {
      return NextResponse.json(
        { error: "Something went wrong. Please try again or email hi@recoupable.com." },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}
