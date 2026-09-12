import { siteConfig } from "./config.ts";
import { effectiveAcquisitionTags } from "./attribution/effectiveAcquisitionTags.ts";
import type { ReferralAttribution } from "./attribution/ReferralAttribution.ts";

type AppLinkOptions = { path?: string; attribution?: ReferralAttribution };

/**
 * Every link that opens the app carries marketing attribution: the placement
 * becomes the medium, and a visitor's own campaign tags (from the shared
 * referral store) replace the defaults so the app sees the original source.
 */
export function appLink(placement: string, options: AppLinkOptions = {}): string {
  const params = new URLSearchParams({
    utm_source: "marketing",
    utm_medium: placement,
    utm_campaign: "sky",
    ...effectiveAcquisitionTags(options.attribution),
  });
  return `${siteConfig.appUrl}${options.path ?? "/"}?${params}`;
}
