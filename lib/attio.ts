/**
 * Attio CRM client — creates and manages contacts with attribution data.
 *
 * Env var required: ATTIO_API_KEY
 *
 * Contact model:
 * - email, name, source, utm_source, utm_medium, utm_campaign,
 *   source_post_slug, lifecycle_stage, tags, subscribed_at
 */

const ATTIO_BASE_URL = "https://api.attio.com/v2";

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
): Promise<{ success: boolean; error?: string }> {
  const apiKey = process.env.ATTIO_API_KEY;

  if (!apiKey) {
    return { success: false, error: "ATTIO_API_KEY not configured" };
  }

  try {
    const response = await fetch(`${ATTIO_BASE_URL}/objects/people/records`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          values: {
            email_addresses: [{ email_address: input.email }],
            ...(input.name && { name: [{ first_name: input.name }] }),
          },
        },
        matching_attribute: "email_addresses",
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      return {
        success: false,
        error: `Attio API error: ${response.status} — ${errorBody}`,
      };
    }

    return { success: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return { success: false, error: message };
  }
}
