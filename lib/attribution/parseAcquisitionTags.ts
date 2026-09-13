import { acquisitionTagKeys, type AcquisitionTags } from "./AcquisitionTags.ts";
import { sanitizeAcquisitionTags } from "./sanitizeAcquisitionTags.ts";

export function parseAcquisitionTags(search: string): AcquisitionTags | undefined {
  const params = new URLSearchParams(search);
  return sanitizeAcquisitionTags(Object.fromEntries(acquisitionTagKeys.map((key) => [key, params.get(key)])));
}
