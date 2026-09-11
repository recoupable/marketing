import { effectiveAcquisitionTags, type ReferralAttribution } from "./referral-attribution.ts";

export type SubscribeSource = "/resources" | "/playbook" | "/blog";
export type SubscribeInput = { email: string; name?: string; source: SubscribeSource; attribution?: ReferralAttribution };
export type SubscribeResult = { ok: true } | { ok: false; error: string };

const failureMessage = "We couldn’t confirm your signup. Your details are still here. Please try again.";

/** Reuses the public Recoup lead endpoint; a saved lead is distinct from an email delivery. */
export async function subscribeToRecoup(input: SubscribeInput, fetcher: typeof fetch = fetch): Promise<SubscribeResult> {
  const email = input.email.trim();
  const name = input.name?.trim();
  if (!email || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "Enter a valid email address." };
  }
  if (name && name.length > 100) return { ok: false, error: "Keep your name under 100 characters." };
  const acquisition = effectiveAcquisitionTags(input.attribution);
  const baseUrl = (process.env.NEXT_PUBLIC_RECOUP_API_URL || (process.env.NEXT_PUBLIC_VERCEL_ENV === "production" ? "https://recoup-api.vercel.app" : "https://test-recoup-api.vercel.app")).replace(/\/$/, "");
  try {
    const response = await fetcher(`${baseUrl}/api/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        kind: "subscribe",
        source: input.source,
        email,
        ...(name ? { name } : {}),
        ...(acquisition || {
          utm_source: "website",
          utm_medium: "newsletter",
          utm_campaign: input.source === "/playbook" ? "ai-playbook" : "ai-music-notes",
        }),
      }),
      signal: AbortSignal.timeout(15000),
    });
    const data: unknown = await response.json().catch(() => null);
    if (response.status !== 200 || !data || typeof data !== "object" || !("status" in data) || data.status !== "success") {
      return { ok: false, error: failureMessage };
    }
    return { ok: true };
  } catch {
    return { ok: false, error: failureMessage };
  }
}
