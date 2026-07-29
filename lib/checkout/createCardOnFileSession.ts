import { siteConfig } from "@/lib/config";

/** Raw `POST /api/subscriptions/card-on-file` envelope. */
type CardOnFileSessionResponse = {
  id?: string;
  url?: string;
  error?: string;
};

/**
 * Create a Stripe **setup-mode** checkout session, which saves a card without
 * charging anything (`POST /api/subscriptions/card-on-file`, backed by
 * api/lib/stripe/createCardOnFileSession.ts). The saved card is what lets the
 * credits auto-recharge path top an account up instead of dead-ending it at
 * zero. Contrast with createCheckoutSession, which starts the paid Pro
 * subscription. The endpoint resolves the account from the Privy bearer and
 * auto-provisions brand-new accounts.
 *
 * @param successUrl - Where Stripe sends the visitor after the card is saved.
 * @param token - Privy access token (the bearer).
 * @returns The Stripe-hosted card-setup URL.
 */
export async function createCardOnFileSession(
  successUrl: string,
  token: string,
): Promise<string> {
  const res = await fetch(`${siteConfig.apiUrl}/subscriptions/card-on-file`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ successUrl }),
  });

  const data: CardOnFileSessionResponse | null = await res.json().catch(() => null);
  if (!res.ok || !data?.url) {
    throw new Error(data?.error ?? `couldn't start card setup (${res.status})`);
  }
  return data.url;
}
