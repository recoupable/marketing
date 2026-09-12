import type { AcquisitionTags } from "./AcquisitionTags.ts";
import type { ReferralAttribution } from "./ReferralAttribution.ts";
import { sanitizeAcquisitionTags } from "./sanitizeAcquisitionTags.ts";

/** The latest tagged visit wins; the first one is the fallback. */
export function effectiveAcquisitionTags(attribution?: ReferralAttribution): AcquisitionTags | undefined {
  return sanitizeAcquisitionTags(attribution?.current) || sanitizeAcquisitionTags(attribution?.first);
}
