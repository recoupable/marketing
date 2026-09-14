import type { SegmentedContact } from "./segmentation.js";

type Result = { success: boolean; error?: string };

export async function syncContacts({
  contacts,
  apply = false,
  upsert,
  log = console.log,
  error = console.error,
}: {
  contacts: SegmentedContact[];
  apply?: boolean;
  upsert: (contact: SegmentedContact) => Promise<Result>;
  log?: (message: string) => void;
  error?: (message: string) => void;
}) {
  if (!apply) {
    log(`\n[PREVIEW] ${contacts.length} contacts would be submitted to Attio.`);
    for (const segment of ["new", "active", "dormant", "churned"] as const) {
      log(`  ${segment}: ${contacts.filter((contact) => contact.segment === segment).length}`);
    }
    log("No CRM writes made. Verify the legacy integration, then use --apply to request writes.");
    return { synced: 0, failed: 0 };
  }

  log(`\nSyncing ${contacts.length} contacts to Attio...`);
  let synced = 0;
  let failed = 0;
  for (const contact of contacts) {
    const result = await upsert(contact);
    if (result.success) synced++;
    else {
      failed++;
      error(`  Contact ${synced + failed} failed: ${result.error}`);
    }
    // Preserve a delay between batches; current service limits need verification.
    if ((synced + failed) % 10 === 0) await new Promise((resolve) => setTimeout(resolve, 1100));
  }
  log(`\nDone. Synced: ${synced}, Failed: ${failed}`);
  return { synced, failed };
}
