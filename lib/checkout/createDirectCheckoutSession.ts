import { siteConfig } from "@/lib/config";
import type { PlanId } from "@/lib/pricing/entitlements";

/** The plans the checkout endpoint sells; Free never reaches checkout. */
export type CheckoutPlan = Exclude<PlanId, "free">;

/** Raw `POST /api/subscriptions/sessions` envelope. */
type CheckoutResponse = {
  id?: string;
  url?: string;
  error?: string;
};

/**
 * Create a Stripe checkout session for a paid plan through
 * `POST /api/subscriptions/sessions` (optional auth; app#2044). Signed-out
 * visitors go straight to Stripe and the webhook creates or links their
 * account from the billing email; a signed-in visitor's bearer attaches the
 * subscription to their account directly.
 *
 * @returns The Stripe-hosted checkout URL.
 */
export async function createDirectCheckoutSession({
  plan,
  successUrl,
  cancelUrl,
  token,
}: {
  plan: CheckoutPlan;
  successUrl: string;
  cancelUrl: string;
  /** Privy access token when the visitor is signed in; omitted otherwise. */
  token?: string;
}): Promise<string> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${siteConfig.apiUrl}/subscriptions/sessions`, {
    method: "POST",
    headers,
    body: JSON.stringify({ plan, successUrl, cancelUrl }),
  });

  const data: CheckoutResponse | null = await res.json().catch(() => null);
  if (!res.ok || !data?.url) {
    throw new Error(data?.error ?? `couldn't start checkout (${res.status})`);
  }
  return data.url;
}
