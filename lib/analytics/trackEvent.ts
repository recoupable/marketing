import { track } from "@vercel/analytics";

/** Values Vercel Web Analytics accepts as custom-event props. */
export type TrackEventProps = Record<
  string,
  string | number | boolean | null | undefined
>;

/**
 * Fire a custom Web Analytics event. Thin wrapper over `@vercel/analytics`
 * `track` that swallows errors — analytics must never break the page. No PII
 * in props: public artist names are fine, visitor emails never.
 */
export function trackEvent(name: string, props?: TrackEventProps): void {
  try {
    track(name, props);
  } catch {
    // Analytics is best-effort; a blocked or failed beacon is not an error.
  }
}
