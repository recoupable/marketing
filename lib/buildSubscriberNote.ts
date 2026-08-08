/** A subscribe submission, including the qualifying data Zod used to strip. */
export interface SubscriberNoteInput {
  email: string;
  name?: string;
  company?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  source_post_slug?: string;
  audit_score?: string;
  audit_answers?: Record<string, string>;
  roi_inputs?: Record<string, number>;
  roi_results?: Record<string, string | number>;
}

/** Renders a flat object as `key: value` lines, skipping empties. */
function entries(label: string, source?: Record<string, string | number>): string[] {
  if (!source || Object.keys(source).length === 0) return [];
  return [
    `${label}:`,
    ...Object.entries(source).map(([key, value]) => `  ${key}: ${value}`),
  ];
}

/**
 * Formats the qualifying data behind a subscribe submission as an Attio note.
 *
 * A note rather than custom attributes: the audit answers, ROI inputs and UTM
 * params have no attributes defined on the People object, and asserting against
 * ones that do not exist 400s. This is the same shape the booking flow already
 * uses, and it is what makes the data readable in the CRM.
 *
 * @param input - The validated subscribe submission.
 * @returns The note, or null when there is nothing qualifying to record.
 */
export function buildSubscriberNote(
  input: SubscriberNoteInput,
): { title: string; content: string } | null {
  const lines = [
    input.company && `Company: ${input.company}`,
    input.audit_score && `Audit score: ${input.audit_score}`,
    ...entries("Audit answers", input.audit_answers),
    ...entries("ROI inputs", input.roi_inputs),
    ...entries("ROI results", input.roi_results),
    input.utm_source && `utm_source: ${input.utm_source}`,
    input.utm_medium && `utm_medium: ${input.utm_medium}`,
    input.utm_campaign && `utm_campaign: ${input.utm_campaign}`,
    input.source_post_slug && `source_post_slug: ${input.source_post_slug}`,
  ].filter(Boolean) as string[];

  // Attribution alone is not qualifying — a blog signup carrying only a
  // campaign should stay a plain contact rather than gain an empty note.
  const qualifying =
    input.company ||
    input.audit_score ||
    input.audit_answers ||
    input.roi_inputs ||
    input.roi_results;

  if (!qualifying) return null;

  return {
    title: `Lead: ${input.utm_campaign || "website"}`,
    content: lines.join("\n"),
  };
}
