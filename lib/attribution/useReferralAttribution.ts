"use client";

import { useMemo, useSyncExternalStore } from "react";
import { currentReferralAttribution } from "./currentReferralAttribution.ts";
import type { ReferralAttribution } from "./ReferralAttribution.ts";

const subscribe = () => () => {};
const readClient = () => JSON.stringify(currentReferralAttribution());
const readServer = () => "{}";

/**
 * The visitor's stored campaign tags, hydration-safe: the server and the first
 * client render agree on an untagged visit, then the stored tags apply.
 */
export function useReferralAttribution(): ReferralAttribution {
  const serialized = useSyncExternalStore(subscribe, readClient, readServer);
  return useMemo(() => JSON.parse(serialized) as ReferralAttribution, [serialized]);
}
