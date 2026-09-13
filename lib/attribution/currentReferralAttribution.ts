import { captureReferralAttribution } from "./captureReferralAttribution.ts";
import type { ReferralAttribution } from "./ReferralAttribution.ts";

export function currentReferralAttribution(): ReferralAttribution {
  if (typeof window === "undefined") return {};
  // Capture at submission too, including query-only changes or fast submits
  // before the route effect ran. The query itself is never persisted.
  return captureReferralAttribution(window.location.search);
}
