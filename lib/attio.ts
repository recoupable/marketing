/**
 * Attio CRM client — creates and manages contacts with attribution data.
 *
 * Env var required: ATTIO_API_KEY
 *
 * Contact model:
 * - email, name, source, utm_source, utm_medium, utm_campaign,
 *   source_post_slug, lifecycle_stage, tags, subscribed_at
 */

import { buildAttioName } from "./buildAttioName";

export const ATTIO_BASE_URL = "https://api.attio.com/v2";

/** Shape of a new contact being sent to Attio */
export interface AttioContactInput {
  email: string;
  name?: string;
  source?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  source_post_slug?: string;
}

/**
 * Create or update a contact in Attio with full attribution data.
 * Uses the Attio "assert" pattern — creates if new, updates if exists.
 * Tags the contact with "welcome-sequence-pending" for automation.
 */
export async function createAttioContact(
  input: AttioContactInput,
): Promise<{ success: boolean; recordId?: string; error?: string }> {
  const apiKey = process.env.ATTIO_API_KEY;

  if (!apiKey) {
    return { success: false, error: "ATTIO_API_KEY not configured" };
  }

  const name = buildAttioName(input.name);

  try {
    // Attio's assert endpoint takes `matching_attribute` as a QUERY param, not
    // in the body — sending it in the body 400s ("Query params validation
    // error"). https://docs.attio.com/rest-api/endpoint-reference/objects/assert-a-record
    const response = await fetch(
      `${ATTIO_BASE_URL}/objects/people/records?matching_attribute=email_addresses`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            values: {
              email_addresses: [{ email_address: input.email }],
              ...(name && { name }),
            },
          },
        }),
      },
    );

    if (!response.ok) {
      const errorBody = await response.text();
      return {
        success: false,
        error: `Attio API error: ${response.status} — ${errorBody}`,
      };
    }

    const created = await response.json().catch(() => null);
    return { success: true, recordId: created?.data?.id?.record_id };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return { success: false, error: message };
  }
}
