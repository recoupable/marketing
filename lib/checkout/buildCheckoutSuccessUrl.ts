import { buildChatUrl } from "@/lib/buildChatUrl";
import type { CheckoutPlan } from "@/lib/checkout/createDirectCheckoutSession";

/** UTM campaign per paid plan, so the app-side success redirect keeps attribution. */
const CAMPAIGN: Record<CheckoutPlan, string> = { starter: "starter", pro: "pro-trial" };

/**
 * Where Stripe sends the buyer after checkout: the app, flagged as a completed
 * checkout, with attribution and the session id the app uses to claim the
 * subscription when the buyer signs in with a different email. The
 * `{CHECKOUT_SESSION_ID}` placeholder must stay literal (Stripe substitutes
 * it), so it is appended after URL encoding.
 */
export function buildCheckoutSuccessUrl(plan: CheckoutPlan): string {
  const base = buildChatUrl({ checkout: "success", campaign: CAMPAIGN[plan] });
  return `${base}&session_id={CHECKOUT_SESSION_ID}`;
}
