import type { AcquisitionTags } from "./AcquisitionTags.ts";

/** First and latest tagged visits in this tab; the query itself is never stored. */
export type ReferralAttribution = { first?: AcquisitionTags; current?: AcquisitionTags };
