import { acquisitionTagKeys, type AcquisitionTags } from "./AcquisitionTags.ts";

/**
 * `source=x; medium=y; campaign=z` for CRM notes. Attio renders notes as
 * markdown, where `utm_source` would lose its underscores, so the labels
 * carry none.
 */
export function describeAcquisitionTags(tags?: AcquisitionTags): string {
  if (!tags) return "";
  return acquisitionTagKeys
    .filter((key) => tags[key])
    .map((key) => `${key.replace("utm_", "")}=${tags[key]}`)
    .join("; ");
}
