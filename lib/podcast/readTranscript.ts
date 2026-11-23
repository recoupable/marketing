import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import type { EditionLang } from "./episodeEditions.ts";
import { transcriptSchema, type Transcript } from "./transcriptSchema.ts";

/**
 * The episode's transcript in one edition's language, or undefined when it has none yet: English from
 * content/podcast/transcripts/<slug>.json, other languages from content/podcast/transcripts/<lang>/<slug>.json.
 */
export function readTranscript(slug: string, lang: EditionLang = "en"): Transcript | undefined {
  const file = path.join(process.cwd(), "content/podcast/transcripts", ...(lang === "en" ? [] : [lang]), `${slug}.json`);
  if (!existsSync(file)) return undefined;
  return transcriptSchema.parse(JSON.parse(readFileSync(file, "utf8")));
}
