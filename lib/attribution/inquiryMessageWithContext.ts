import { describeAcquisitionTags } from "./describeAcquisitionTags.ts";
import type { ReferralAttribution } from "./ReferralAttribution.ts";
import { sanitizeAcquisitionTags } from "./sanitizeAcquisitionTags.ts";

// Keep CRM labels bounded with seven tags on each of two visits. Full values
// remain in session attribution; the brief is never truncated.
function boundedTags(value: unknown) {
  const tags = sanitizeAcquisitionTags(value);
  return (
    tags &&
    Object.fromEntries(
      Object.entries(tags).map(([key, value]) => [
        key,
        value.length > 40 ? `${value.slice(0, 39)}…` : value,
      ]),
    )
  );
}

export function inquiryMessageWithContext(
  brief: string,
  websitePath: string,
  attribution?: ReferralAttribution,
): string {
  const firstTags = sanitizeAcquisitionTags(attribution?.first);
  const currentTags = sanitizeAcquisitionTags(attribution?.current);
  const sameVisit =
    describeAcquisitionTags(firstTags) === describeAcquisitionTags(currentTags);
  const first = describeAcquisitionTags(boundedTags(firstTags));
  const current = describeAcquisitionTags(boundedTags(currentTags));
  const context: string[] = [];
  if (first) context.push(`First visit source: ${first}`);
  if (current && !sameVisit) context.push(`Latest visit source: ${current}`);
  // The form accepts 5,000 characters; this bounded context stays comfortably
  // within the existing 6,000-character API limit without cutting the brief.
  return `Website path: ${websitePath.slice(0, 80)}\n\n${brief}${context.length ? `\n\n${context.join("\n")}` : ""}`;
}
