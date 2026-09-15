import { effectiveAcquisitionTags } from "./attribution/effectiveAcquisitionTags.ts";
import type { ReferralAttribution } from "./attribution/ReferralAttribution.ts";
import { postLead } from "./leads/postLead.ts";

export type SubscribeSource = "/resources" | "/playbook" | "/blog" | "/footer" | "/podcast";
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
  const result = await postLead({
    kind: "subscribe",
    source: input.source,
    email,
    ...(name ? { name } : {}),
    ...(acquisition || {
      utm_source: "website",
      utm_medium: "newsletter",
      utm_campaign: input.source === "/playbook" ? "ai-playbook" : input.source === "/podcast" ? "podcast" : "ai-music-notes",
    }),
  }, fetcher);
  return result.ok ? { ok: true } : { ok: false, error: failureMessage };
}
