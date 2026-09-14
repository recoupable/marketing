/**
 * Export & segment all Privy users into a CSV file.
 *
 * Usage:
 *   pnpm export-users                    # exports all users
 *   pnpm export-users -- --segment new   # exports only "new" users
 *   pnpm export-users -- --email-only    # exports only users with email addresses
 *
 * Output: exports/users-YYYY-MM-DD.csv
 */

import { parseArguments, printHelp } from "../lib/cli.ts";

async function main() {
  const { help, segment: segmentFilter, emailOnly } = parseArguments("export-users", process.argv.slice(2));
  if (help) return printHelp("export-users");
  const { mkdirSync, writeFileSync } = await import("node:fs");
  const { fetchAllPrivyUsers } = await import("../lib/recoupApi.js");
  const { segmentUser, contactsToCsv } = await import("../lib/segmentation.js");
  const { exportsDirectory } = await import("../lib/paths.js");
  console.log("Fetching all Privy users...");
  const { logins, total, total_new, total_active } = await fetchAllPrivyUsers();

  console.log(`Total Privy accounts: ${total}`);
  console.log(`New (in period): ${total_new}`);
  console.log(`Active (in period): ${total_active}`);
  console.log(`Users fetched: ${logins.length}`);

  let contacts = logins.map(segmentUser);

  if (emailOnly) {
    contacts = contacts.filter((c) => c.email !== null);
    console.log(`With email: ${contacts.length}`);
  }

  if (segmentFilter) {
    contacts = contacts.filter((c) => c.segment === segmentFilter);
    console.log(`In segment "${segmentFilter}": ${contacts.length}`);
  }

  // Print segment breakdown
  const segments = { new: 0, active: 0, dormant: 0, churned: 0 };
  for (const c of contacts) {
    segments[c.segment]++;
  }
  console.log("\nSegment breakdown:");
  console.log(`  New (≤7 days):        ${segments.new}`);
  console.log(`  Active (≤30 days):    ${segments.active}`);
  console.log(`  Dormant (30-90 days): ${segments.dormant}`);
  console.log(`  Churned (90+ days):   ${segments.churned}`);

  const csv = contactsToCsv(contacts);
  const date = new Date().toISOString().split("T")[0];
  const filename = segmentFilter
    ? `users-${segmentFilter}-${date}.csv`
    : `users-${date}.csv`;

  mkdirSync(exportsDirectory, { recursive: true });
  writeFileSync(new URL(filename, exportsDirectory), csv);

  console.log(`\nExported ${contacts.length} contacts → exports/${filename}`);
}

main().catch((err) => {
  console.error("Export failed:", err);
  process.exit(1);
});
