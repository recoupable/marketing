import { NextResponse } from "next/server";
import { z } from "zod";
import { submitBookingToAttio } from "@/lib/submitBookingToAttio";

const bookingSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email"),
  company: z.string().min(1, "Company name is required"),
  role: z.string().optional(),
  package: z.enum(["strategy-session", "ai-transformation", "retained-advisor"]),
  rosterSize: z.string().optional(),
  message: z.string().optional(),
});

/**
 * POST /api/book
 *
 * Captures an advisory booking request as an Attio person plus an
 * "Advisory Inquiry" note.
 *
 * Returns 502 when the lead could not be stored. This route previously logged
 * the Attio failure and returned `{ success: true }` regardless, which reported
 * every lost lead to the submitter as captured (recoupable/chat#1800).
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = bookingSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
    }

    const result = await submitBookingToAttio(parsed.data);

    if (!result.ok) {
      console.error("[book] lead was not captured:", result.error);
      return NextResponse.json(
        { error: "We could not save your request. Please try again." },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
