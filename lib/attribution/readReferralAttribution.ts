import { acquisitionStorageKey, type SessionStore } from "./acquisitionStorage.ts";
import { browserSessionStore } from "./browserSessionStore.ts";
import type { ReferralAttribution } from "./ReferralAttribution.ts";
import { sanitizeAcquisitionTags } from "./sanitizeAcquisitionTags.ts";

export function readReferralAttribution(storage: SessionStore | undefined = browserSessionStore()): ReferralAttribution {
  try {
    const serialized = storage?.getItem(acquisitionStorageKey);
    const value: unknown = serialized ? JSON.parse(serialized) : undefined;
    if (!value || typeof value !== "object" || Array.isArray(value)) return {};
    const saved = value as Record<string, unknown>;
    const first = sanitizeAcquisitionTags(saved.first);
    const current = sanitizeAcquisitionTags(saved.current);
    return { ...(first ? { first } : {}), ...(current ? { current } : {}) };
  } catch {
    return {};
  }
}
