import { acquisitionStorageKey, type SessionStore } from "./acquisitionStorage.ts";
import { browserSessionStore } from "./browserSessionStore.ts";
import { parseAcquisitionTags } from "./parseAcquisitionTags.ts";
import { readReferralAttribution } from "./readReferralAttribution.ts";
import type { ReferralAttribution } from "./ReferralAttribution.ts";

export function captureReferralAttribution(search: string, storage: SessionStore | undefined = browserSessionStore()): ReferralAttribution {
  const saved = readReferralAttribution(storage);
  const explicit = parseAcquisitionTags(search);
  if (!explicit) return saved;
  const next = { first: saved.first || explicit, current: explicit };
  try {
    storage?.setItem(acquisitionStorageKey, JSON.stringify(next));
  } catch {
    /* Forms still work when session storage is unavailable. */
  }
  return next;
}
