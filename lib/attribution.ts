import {
  emptyAttribution,
  mergeAttributionTouch,
  parseAttributionUrl,
} from "@vizuh/clicktrail";

export const ATTRIBUTION_COOKIE_NAME = "rcp_attr";
export const ATTRIBUTION_COOKIE_MAX_AGE = 90 * 24 * 60 * 60;

export type FirstTouchAttribution = {
  source: string;
  medium: string;
  campaign: string;
  landing: string;
  ts: string;
};

const UTM_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;
const MAX_FIELD_LENGTH = 200;

function bounded(value: unknown): string {
  return typeof value === "string" ? value.slice(0, MAX_FIELD_LENGTH) : "";
}

function hasExplicitCampaignSignal(
  url: URL,
  clickIds: Record<string, string>,
): boolean {
  const hasUtm = Array.from(url.searchParams.keys()).some((key) =>
    UTM_PARAMS.includes(key.toLowerCase() as (typeof UTM_PARAMS)[number]),
  );
  return hasUtm || Object.keys(clickIds).length > 0;
}

function normalizeCookieValue(value: unknown): FirstTouchAttribution | null {
  if (!value || typeof value !== "object") return null;
  const candidate = value as Record<string, unknown>;
  const normalized = {
    source: bounded(candidate.source),
    medium: bounded(candidate.medium),
    campaign: bounded(candidate.campaign),
    landing: bounded(candidate.landing),
    ts: bounded(candidate.ts),
  };

  return normalized.source || normalized.medium || normalized.campaign
    ? normalized
    : null;
}

/** Parse an explicit campaign signal without inferring attribution from referrers. */
export function getFirstTouchAttribution(
  url: string,
  now: string,
  referrer?: string,
  cookieString?: string,
): FirstTouchAttribution | null {
  if (cookieString && readAttributionCookie(cookieString)) return null;

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(url);
  } catch {
    return null;
  }

  const result = parseAttributionUrl({
    url,
    referrer,
    currentHost: parsedUrl.host,
    now,
  });
  if (
    result.kind !== "touch" ||
    !hasExplicitCampaignSignal(parsedUrl, result.touch.clickIds)
  ) {
    return null;
  }

  const payload = mergeAttributionTouch(emptyAttribution(), result.touch);
  return normalizeCookieValue({
    source: payload.ft_source,
    medium: payload.ft_medium,
    campaign: payload.ft_campaign,
    landing: new URL(result.touch.landingPage).pathname,
    ts: payload.ft_touch_timestamp,
  });
}

export function readAttributionCookie(
  cookieString: string,
): FirstTouchAttribution | null {
  const prefix = `${ATTRIBUTION_COOKIE_NAME}=`;
  const pair = cookieString
    .split(";")
    .find((part) => part.trim().startsWith(prefix));
  if (!pair) return null;

  try {
    return normalizeCookieValue(
      JSON.parse(decodeURIComponent(pair.trim().slice(prefix.length))),
    );
  } catch {
    return null;
  }
}

export function serializeAttributionCookie(
  attribution: FirstTouchAttribution,
  secure: boolean,
): string {
  const value = encodeURIComponent(
    JSON.stringify(normalizeCookieValue(attribution)),
  );
  return `${ATTRIBUTION_COOKIE_NAME}=${value}; Domain=.recoupable.dev; Max-Age=${ATTRIBUTION_COOKIE_MAX_AGE}; Path=/; SameSite=Lax${secure ? "; Secure" : ""}`;
}
