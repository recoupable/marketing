# Recoup plugin — Starter subscription

## Offer

The unlisted `/label-in-a-box` page sells Recoup Starter at **$19 USD/month**, with the plugin download, setup guide, Recoup access, and ongoing skill updates while subscribed. There is no separate plugin purchase. Starter currently allocates $20 in monthly usage credits in API code; AI-client subscriptions and third-party services are separate. Public skills remain free.

The existing live Stripe Starter price is `price_1U9oWu00JObOnOb51BToZiq1`. Reuse that plan rather than creating another product. Live price existence was verified on October 8, 2026; deployed checkout and fulfillment have not been verified.

## Current implementation

The hero, receipt, FAQ, and native purchase dialog show the monthly offer. Checkout remains a preview: no charge or download is simulated. The approved hero and motion graphic are unchanged.

Only a fulfillment-ready Starter subscription Payment Link in `LABEL_KIT_STARTER_CHECKOUT_URL` can enable the existing hosted-link handoff. It must use HTTPS on `buy.stripe.com`; old `LABEL_KIT_CHECKOUT_URL` and `LABEL_KIT_PRICE_LABEL` settings are ignored to prevent routing monthly buyers to the former one-time offer. This URL check does not verify the Stripe price or fulfillment. Verify those before configuring it and rebuild afterward.

## Remaining checkout and delivery work

1. Curate public music skills from a pinned Skills commit. Never zip the repository wholesale: it includes unrelated and internal-audience skills. Include version, manifest, setup guide, templates, changelog, and licenses.
2. Verify advertised Claude and ChatGPT setup paths and a real workflow with Starter permissions and credits.
3. Reuse the API-owned Starter subscription checkout, webhook account linking, and authenticated subscription claim flow. Decide the final post-payment download route before activating payment. A dynamic API checkout must be integrated explicitly rather than storing an expiring Checkout Session URL in configuration.
4. Store the ZIP privately. Authorize initial and updated downloads using the existing account subscription status and a short-lived signed URL. Verify subscription/payment server-side; never trust success query parameters or browser flags.
5. Confirm cancellation and access behavior, usage limits, billing management, and how subscribers receive updated skills. Downloaded files cannot be revoked; connected Recoup usage and future updates depend on the subscription terms.
6. Test successful checkout, existing accounts, failed payment, webhook retries, unauthorized downloads, renewal, cancellation, and recovery in Stripe test mode. Then verify the deployed purchase-to-download flow before opening checkout and removing noindex.

No new Stripe product, price, payment link, webhook, or delivery service was created in this marketing change. Account creation and delivery remain implementation work, not verified customer behavior.
