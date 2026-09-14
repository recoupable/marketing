/**
 * Legacy Privy-to-Attio email-record sync. Preview is the default.
 * The old request shape and custom-field assumptions need verification.
 *
 * Usage:
 *   pnpm sync-attio                   # aggregate preview; no Attio writes
 *   pnpm sync-attio -- --segment new  # preview only "new" segment
 *   pnpm sync-attio -- --apply        # explicitly request Attio writes
 *
 * Reads require RECOUP_ADMIN_TOKEN; --apply also requires ATTIO_API_KEY.
 */

import type { SegmentedContact } from "../lib/segmentation.js";
import { parseArguments, printHelp } from "../lib/cli.ts";

const ATTIO_BASE_URL = "https://api.attio.com/v2";

interface AttioResult {
  success: boolean;
  error?: string;
}

async function upsertAttioContact(
  apiKey: string,
  contact: SegmentedContact,
): Promise<AttioResult> {
  if (!contact.email) {
    return { success: false, error: "No email" };
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
            email_addresses: [{ email_address: contact.email }],
            // Attio custom fields — create these in your Attio workspace
            // to capture signup date, segment, and login method
          },
        },
        matching_attribute: "email_addresses",
      }),
    });

    if (!response.ok) {
      return { success: false, error: `HTTP ${response.status}` };
    }

    return { success: true };
  } catch {
    return { success: false, error: "Request failed" };
  }
}

async function main() {
  const { help, segment: segmentFilter, apply } = parseArguments("sync-attio", process.argv.slice(2));
  if (help) return printHelp("sync-attio");
  const { fetchAllPrivyUsers } = await import("../lib/recoupApi.js");
  const { segmentUser } = await import("../lib/segmentation.js");
  const { requireEnv } = await import("../lib/config.js");
  const { syncContacts } = await import("../lib/syncContacts.js");
  const apiKey = apply ? requireEnv("attioApiKey") : null;

  console.log("Fetching all Privy users...");
  const { logins } = await fetchAllPrivyUsers();

  let contacts = logins.map(segmentUser).filter((c) => c.email !== null);
  console.log(`Users with email: ${contacts.length}`);

  if (segmentFilter) {
    contacts = contacts.filter((c) => c.segment === segmentFilter);
    console.log(`Filtered to segment "${segmentFilter}": ${contacts.length}`);
  }

  const { failed } = await syncContacts({
    contacts,
    apply,
    upsert: (contact) => upsertAttioContact(apiKey!, contact),
  });
  if (failed > 0) process.exitCode = 1;
}

main().catch((err) => {
  console.error("Attio sync failed:", err);
  process.exit(1);
});
