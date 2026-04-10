import { NextResponse } from "next/server";
import { z } from "zod";
import { createAttioContact } from "@/lib/attio";

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
 * Captures a new email subscriber with UTM attribution and sends
 * the contact to Attio CRM. Called by the SubscribeForm component.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = subscribeBodySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 },
      );
    }

    const { email, name, utm_source, utm_medium, utm_campaign, source_post_slug } =
      parsed.data;

    // Create contact in Attio with attribution data
    const result = await createAttioContact({
      email,
      name,
      source: utm_source || "website",
      utm_source,
      utm_medium,
      utm_campaign,
      source_post_slug,
    });

    if (!result.success) {
      // Log the error server-side but return a generic message to the client
      return NextResponse.json(
        { error: "Something went wrong. Please try again." },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }
}
