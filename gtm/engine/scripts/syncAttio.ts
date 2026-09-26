/**
 * Privy-to-Attio email-record sync. Preview is the default.
 * Only email is submitted; no company links or other CRM fields are sent.
 *
 * Usage:
 *   pnpm sync-attio                   # aggregate preview; no Attio writes
 *   pnpm sync-attio -- --segment new  # preview only "new" segment
 *   pnpm sync-attio -- --apply        # explicitly request Attio writes
 *
 * Reads require RECOUP_ADMIN_TOKEN; --apply also requires ATTIO_API_KEY.
 */

import { parseArguments, printHelp } from "../lib/cli.ts";
import { upsertAttioContact } from "../lib/upsertAttioContact.ts";

async function main() {
  const { help, segment: segmentFilter, apply } = parseArguments("sync-attio", process.argv.slice(2));
  if (help) return printHelp("sync-attio");
  const { fetchAllPrivyUsers } = await import("../lib/recoupApi.js");
  const { segmentUser } = await import("../lib/segmentation.js");
  const { requireEnv } = await import("../lib/config.js");
  const { syncContacts } = await import("../lib/syncContacts.js");
  const apiKey = apply ? requireEnv("attioApiKey") : null;

  const { readCrmImportExclusions } = await import("../lib/readCrmImportExclusions.ts");
  const excludedEmails = await readCrmImportExclusions(process.env.CRM_IMPORT_EXCLUSIONS_FILE || new URL("../exports/crm-import-exclusions.json", import.meta.url));

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
    excludedEmails,
    apply,
    upsert: (contact) => upsertAttioContact(apiKey!, contact),
  });
  if (failed > 0) process.exitCode = 1;
}

main().catch((err) => {
  console.error("Attio sync failed:", err);
  process.exit(1);
});
