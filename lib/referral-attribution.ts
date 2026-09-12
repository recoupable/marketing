export type AcquisitionTags = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
};

export type ReferralAttribution = { first?: AcquisitionTags; current?: AcquisitionTags };
type SessionStore = Pick<Storage, "getItem" | "setItem">;

const storageKey = "recoup:acquisition:v1";
const tagKeys = ["utm_source", "utm_medium", "utm_campaign"] as const;

function tag(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const text = value.trim();
  // Campaign labels only: no email addresses, URLs, query strings, control
  // characters, click IDs, or arbitrary objects. Reject rather than truncate.
  if (!text || text.length > 64 || !/^[a-z0-9][a-z0-9 ._-]*$/i.test(text)) return undefined;
  return text;
}

export function sanitizeAcquisitionTags(value: unknown): AcquisitionTags | undefined {
  if (!value || typeof value !== "object" || Array.isArray(value)) return undefined;
  const input = value as Record<string, unknown>;
  const tags: AcquisitionTags = {};
  for (const key of tagKeys) {
    const safe = tag(input[key]);
    if (safe) tags[key] = safe;
  }
  return Object.keys(tags).length ? tags : undefined;
}

export function parseAcquisitionTags(search: string): AcquisitionTags | undefined {
  const params = new URLSearchParams(search);
  return sanitizeAcquisitionTags(Object.fromEntries(tagKeys.map(key => [key, params.get(key)])));
}

function browserStore(): SessionStore | undefined {
  try { return typeof window === "undefined" ? undefined : window.sessionStorage; }
  catch { return undefined; }
}

export function readReferralAttribution(storage: SessionStore | undefined = browserStore()): ReferralAttribution {
  try {
    const serialized = storage?.getItem(storageKey);
    const value: unknown = serialized ? JSON.parse(serialized) : undefined;
    if (!value || typeof value !== "object" || Array.isArray(value)) return {};
    const saved = value as Record<string, unknown>;
    const first = sanitizeAcquisitionTags(saved.first);
    const current = sanitizeAcquisitionTags(saved.current);
    return { ...(first ? { first } : {}), ...(current ? { current } : {}) };
  } catch { return {}; }
}

export function captureReferralAttribution(search: string, storage: SessionStore | undefined = browserStore()): ReferralAttribution {
  const saved = readReferralAttribution(storage);
  const explicit = parseAcquisitionTags(search);
  if (!explicit) return saved;
  const next = { first: saved.first || explicit, current: explicit };
  try { storage?.setItem(storageKey, JSON.stringify(next)); } catch { /* Forms still work when session storage is unavailable. */ }
  return next;
}

export function currentReferralAttribution(): ReferralAttribution {
  if (typeof window === "undefined") return {};
  // Capture at submission too, including query-only changes or fast submits
  // before the route effect ran. The query itself is never persisted.
  return captureReferralAttribution(window.location.search);
}

export function effectiveAcquisitionTags(attribution?: ReferralAttribution): AcquisitionTags | undefined {
  return sanitizeAcquisitionTags(attribution?.current) || sanitizeAcquisitionTags(attribution?.first);
}

export function inquiryMessageWithContext(brief: string, websitePath: string, attribution?: ReferralAttribution): string {
  const first = sanitizeAcquisitionTags(attribution?.first);
  const current = sanitizeAcquisitionTags(attribution?.current);
  const describe = (tags: AcquisitionTags) => tagKeys.filter(key => tags[key]).map(key => `${key}=${tags[key]}`).join("; ");
  const context: string[] = [];
  if (first) context.push(`First visit source: ${describe(first)}`);
  if (current && (!first || describe(first) !== describe(current))) context.push(`Latest visit source: ${describe(current)}`);
  // The form accepts 5,000 characters; this bounded context stays comfortably
  // within the existing 6,000-character API limit without cutting the brief.
  return `Website path: ${websitePath.slice(0, 80)}\n\n${brief}${context.length ? `\n\n${context.join("\n")}` : ""}`;
}
