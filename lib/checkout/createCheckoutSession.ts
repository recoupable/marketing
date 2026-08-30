import { siteConfig } from "@/lib/config";
import type { PlanId } from "@/lib/pricing/entitlements";

/** The plans the sessions endpoint sells; Free never reaches checkout. */
export type CheckoutPlan = Exclude<PlanId, "free">;

/** Raw `POST /api/subscriptions/sessions` envelope. */
type CheckoutSessionResponse = {
  id?: string;
  url?: string;
  error?: string;
};

/**
 * Create a Stripe checkout session for a paid plan through the
 * bearer-authed recoup-api endpoint (`POST /api/subscriptions/sessions`,
 * handler api/app/api/subscriptions/sessions/route.ts). The endpoint resolves
 * the account from the Privy bearer (auto-provisioning brand-new users) and
 * returns the hosted checkout URL to redirect to. Mirrors the fetch pattern of
 * lib/valuation/runValuation.ts.
 *
 * @param successUrl - Where Stripe sends the buyer after paying.
 * @param token - Privy access token (the bearer).
 * @param plan - Which paid plan the session sells (`starter` or `pro`).
 * @returns The Stripe-hosted checkout URL.
 */
export async function createCheckoutSession(
  successUrl: string,
  token: string,
  plan: CheckoutPlan,
): Promise<string> {
  const res = await fetch(`${siteConfig.apiUrl}/subscriptions/sessions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ successUrl, plan }),
  });

  const data: CheckoutSessionResponse | null = await res.json().catch(() => null);
  if (!res.ok || !data?.url) {
    throw new Error(data?.error ?? `couldn't start checkout (${res.status})`);
  }
  return data.url;
}
