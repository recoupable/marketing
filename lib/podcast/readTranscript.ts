import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { transcriptSchema, type Transcript } from "./transcriptSchema.ts";

/** The episode's transcript from content/podcast/transcripts/<slug>.json, or undefined when it has none yet. */
export function readTranscript(slug: string): Transcript | undefined {
  const file = path.join(process.cwd(), "content/podcast/transcripts", `${slug}.json`);
  if (!existsSync(file)) return undefined;
  return transcriptSchema.parse(JSON.parse(readFileSync(file, "utf8")));
}
