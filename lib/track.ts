/**
 * Plausible custom-event helper (W-37).
 *
 * The default Plausible script (loaded in app/layout.tsx) exposes
 * `window.plausible` for custom events. Goals must also be registered in the
 * Plausible dashboard (Settings → Goals) to appear in reports — this helper
 * only sends them. Safe to call anywhere: no-ops on the server and when the
 * script is blocked.
 */

type PlausibleFn = (
  event: string,
  options?: { props?: Record<string, string | number | boolean> },
) => void;

declare global {
  interface Window {
    plausible?: PlausibleFn;
  }
}

/** Conversion events the dashboard should register as goals. */
export type TrackedEvent =
  | "Contact Form Submitted"
  | "Newsletter Subscribed"
  | "Audit Completed"
  | "Skills Install Clicked";

export function track(
  event: TrackedEvent,
  props?: Record<string, string | number | boolean>,
): void {
  if (typeof window === "undefined" || typeof window.plausible !== "function") {
    return;
  }
  window.plausible(event, props ? { props } : undefined);
}
