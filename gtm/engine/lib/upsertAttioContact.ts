import type { SegmentedContact } from "./segmentation.js";

/** Email-only assertion: never replay company IDs from historical exports. */
export async function upsertAttioContact(
  apiKey: string,
  contact: SegmentedContact,
  request: typeof fetch = fetch,
): Promise<{ success: boolean; error?: string }> {
  const email = contact.email?.trim().toLowerCase();
  if (!email) return { success: false, error: "No email" };
  try {
    const response = await request(
      "https://api.attio.com/v2/objects/people/records?matching_attribute=email_addresses",
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: { values: { email_addresses: [{ email_address: email }] } },
        }),
        signal: AbortSignal.timeout(30_000),
      },
    );
    if (!response.ok)
      return { success: false, error: `HTTP ${response.status}` };
    const result = await response.json();
    if (
      typeof result?.data?.id?.record_id !== "string" ||
      !result.data.id.record_id
    ) {
      return { success: false, error: "Missing record ID in response" };
    }
    return { success: true };
  } catch {
    // Never retry an uncertain write or leak response bodies/contact details.
    return {
      success: false,
      error: "Request failed; verify record before retrying",
    };
  }
}
