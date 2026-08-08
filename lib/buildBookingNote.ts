/** A booking submission, already validated by the route's Zod schema. */
export interface BookingNoteInput {
  company: string;
  package: "strategy-session" | "ai-transformation" | "retained-advisor";
  role?: string;
  rosterSize?: string;
  message?: string;
}

const PACKAGE_LABELS: Record<string, string> = {
  "strategy-session": "Strategy Session ($2,500)",
  "ai-transformation": "AI Transformation ($10,000)",
  "retained-advisor": "Retained Advisor ($5,000/mo)",
};

/**
 * Formats an advisory booking as the Attio note that a human actually reads.
 *
 * The title carries the "Advisory Inquiry" prefix the CRM is searched by, so it
 * must stay stable — see recoupable/chat#1800.
 *
 * @param input - The validated booking submission.
 * @returns The note title and plaintext content.
 */
export function buildBookingNote(input: BookingNoteInput): {
  title: string;
  content: string;
} {
  const label = PACKAGE_LABELS[input.package] || input.package;

  const content = [
    `📅 Advisory Booking Request`,
    `Package: ${label}`,
    input.company && `Company: ${input.company}`,
    input.role && `Role: ${input.role}`,
    input.rosterSize && `Roster Size: ${input.rosterSize}`,
    input.message && `Message: ${input.message}`,
    `Source: website /advisory/book`,
  ]
    .filter(Boolean)
    .join("\n");

  return { title: `Advisory Inquiry: ${label}`, content };
}
