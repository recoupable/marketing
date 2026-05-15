import { NextResponse } from "next/server";
import { z } from "zod";

const ATTIO_BASE_URL = "https://api.attio.com/v2";

const bookingSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email"),
  company: z.string().min(1, "Company name is required"),
  role: z.string().optional(),
  package: z.enum(["strategy-session", "ai-transformation", "retained-advisor"]),
  rosterSize: z.string().optional(),
  message: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = bookingSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 },
      );
    }

    const { name, email, company, role, package: pkg, rosterSize, message } = parsed.data;

    const apiKey = process.env.ATTIO_API_KEY;
    if (!apiKey) {
      console.error("ATTIO_API_KEY not configured");
      return NextResponse.json(
        { error: "Something went wrong. Please try again." },
        { status: 500 },
      );
    }

    const packageLabels: Record<string, string> = {
      "strategy-session": "Strategy Session ($2,500)",
      "ai-transformation": "AI Transformation ($10,000)",
      "retained-advisor": "Retained Advisor ($5,000/mo)",
    };

    // Create/update contact in Attio
    const contactRes = await fetch(`${ATTIO_BASE_URL}/objects/people/records`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          values: {
            email_addresses: [{ email_address: email }],
            name: [{ first_name: name.split(" ")[0], last_name: name.split(" ").slice(1).join(" ") || undefined }],
          },
        },
        matching_attribute: "email_addresses",
      }),
    });

    if (!contactRes.ok) {
      const err = await contactRes.text();
      console.error("Attio contact error:", err);
    }

    // Create a note on the contact with booking details
    const noteBody = [
      `📅 Advisory Booking Request`,
      `Package: ${packageLabels[pkg] || pkg}`,
      company && `Company: ${company}`,
      role && `Role: ${role}`,
      rosterSize && `Roster Size: ${rosterSize}`,
      message && `Message: ${message}`,
      `Source: website /advisory/book`,
    ]
      .filter(Boolean)
      .join("\n");

    // Get the contact ID for the note
    if (contactRes.ok) {
      const contactData = await contactRes.json();
      const recordId = contactData?.data?.id?.record_id;
      if (recordId) {
        await fetch(`${ATTIO_BASE_URL}/notes`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: {
              title: `Advisory Inquiry: ${packageLabels[pkg]}`,
              content: noteBody,
              parent_object: "people",
              parent_record_id: recordId,
            },
          }),
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 },
    );
  }
}
