import { describeAcquisitionTags } from "./describeAcquisitionTags.ts";
import type { ReferralAttribution } from "./ReferralAttribution.ts";
import { sanitizeAcquisitionTags } from "./sanitizeAcquisitionTags.ts";

export function inquiryMessageWithContext(brief: string, websitePath: string, attribution?: ReferralAttribution): string {
  const first = describeAcquisitionTags(sanitizeAcquisitionTags(attribution?.first));
  const current = describeAcquisitionTags(sanitizeAcquisitionTags(attribution?.current));
  const context: string[] = [];
  if (first) context.push(`First visit source: ${first}`);
  if (current && current !== first) context.push(`Latest visit source: ${current}`);
  // The form accepts 5,000 characters; this bounded context stays comfortably
  // within the existing 6,000-character API limit without cutting the brief.
  return `Website path: ${websitePath.slice(0, 80)}\n\n${brief}${context.length ? `\n\n${context.join("\n")}` : ""}`;
}
