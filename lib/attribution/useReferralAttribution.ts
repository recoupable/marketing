"use client";

import { useMemo, useSyncExternalStore } from "react";
import { readReferralAttribution } from "./readReferralAttribution.ts";
import type { ReferralAttribution } from "./ReferralAttribution.ts";
import { referralAttributionListeners } from "./referralAttributionListeners.ts";

function subscribe(onChange: () => void) {
  referralAttributionListeners.add(onChange);
  return () => { referralAttributionListeners.delete(onChange); };
}
// A pure read: capturing the query is ReferralCapture's job, and it notifies
// this hook through the listener set once the store has changed.
const readClient = () => JSON.stringify(readReferralAttribution());
const readServer = () => "{}";

/**
 * The visitor's stored campaign tags, hydration-safe: the server and the first
 * client render agree on an untagged visit, then the stored tags apply.
 */
export function useReferralAttribution(): ReferralAttribution {
  const serialized = useSyncExternalStore(subscribe, readClient, readServer);
  return useMemo(() => JSON.parse(serialized) as ReferralAttribution, [serialized]);
}
