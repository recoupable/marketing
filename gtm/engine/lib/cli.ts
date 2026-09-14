import type { Segment } from "./segmentation.js";

type Command = "export-users" | "sync-attio" | "dashboard";

export function parseArguments(command: Command, rawArgs: string[]) {
  const args = rawArgs.filter((arg) => arg !== "--");
  const options = { help: false, apply: false, emailOnly: false, segment: null as Segment | null };
  if (args.includes("--help") || args.includes("-h")) return { ...options, help: true };
  for (let index = 0; index < args.length; index++) {
    const arg = args[index];
    if (arg === "--segment" && command !== "dashboard") {
      const value = args[++index];
      if (!["new", "active", "dormant", "churned"].includes(value)) {
        throw new Error("--segment requires new, active, dormant, or churned");
      }
      options.segment = value as Segment;
    } else if (arg === "--email-only" && command === "export-users") {
      options.emailOnly = true;
    } else if (arg === "--apply" && command === "sync-attio") {
      options.apply = true;
    } else if (arg !== "--dry-run" || command !== "sync-attio") {
      throw new Error(`Unknown option for ${command}: ${arg}`);
    }
  }
  if (options.apply && args.includes("--dry-run")) {
    throw new Error("Use either --apply or --dry-run, not both");
  }
  return options;
}

export function printHelp(command: Command) {
  const usage = {
    "export-users": "[--segment new|active|dormant|churned] [--email-only]",
    "sync-attio": "[--segment new|active|dormant|churned] [--dry-run | --apply]",
    dashboard: "",
  };
  console.log(`Usage: pnpm ${command} -- ${usage[command]}\n\n--help displays this message without credentials or network requests.`);
  console.log(command === "sync-attio"
    ? "Default: read live Recoup accounts and show aggregate counts only. --apply explicitly requests live Attio writes. Verify the legacy integration before applying."
    : "Running without --help reads live Recoup account data and writes an ignored local export.");
}
