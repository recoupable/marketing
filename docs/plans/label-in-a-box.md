# Recoup Label Kit

## Current implementation

`/label-in-a-box` is an unlisted, noindex landing page with a one-time purchase offer. It leaves `/skills` and its open-source installation path intact. The visual reference is https://www.prodmgmt.world/: show the package, explain tangible workflows, and keep the purchase easy to find. All Recoup claims and illustrations are our own; no borrowed testimonials, counts, guarantees, or compatibility promises.

The purchase button opens an accessible native dialog while configuration is missing. It clearly says checkout and the download are not yet available. There is no charge, email capture, paid artifact, or fake successful purchase. Static generation reads configuration at build time; rebuild after configuring.

## Stripe payment and protected delivery

Use the existing Recoup Stripe account. The API repository already owns the Stripe client, checkout creation, and webhook handling; extend that owning service when fulfillment is implemented. This change only prepares the marketing frontend, not the payment or entitlement backend.

1. Curate an explicit allowlist of public music skills from a pinned Skills commit. Do not zip the repository wholesale: it includes internal consulting skills and unrelated material.
2. Assemble `recoup-label-kit-v1.zip`: README, curated skills, client-specific MCP setup examples without keys, artist/release templates, manifest with version and source commit, changelog, and required source licenses/attributions.
3. Test each advertised agent's install and one real music workflow. Confirm API requirements, final contents, price, license scope, and refund terms before enabling payment. Replace provisional FAQ copy and remove noindex when launch-ready.
4. Create a one-time Stripe Product/Price and Payment Link in the existing account. Set product/version metadata that the fulfillment service can validate. The payment link creates Checkout Sessions; do not persist a single expiring session URL as the offer URL.
5. In the API's Stripe webhook, verify the signature, require a paid session and the expected product/price, and grant a versioned entitlement idempotently by Checkout Session ID. Handle `checkout.session.completed` and `checkout.session.async_payment_succeeded`; an unpaid completion must not fulfill. Handle refunds/revocation without affecting unrelated platform subscriptions or credits.
6. Store the ZIP in private object storage. An authorized download endpoint checks entitlement and creates a short-lived signed URL. Deliver access by transactional email and provide a verified-email recovery path. Never place the archive in marketing `public/`, use a permanent public Blob link, or trust success-page query parameters as proof of payment.
7. Test in Stripe test mode: successful and delayed payment, decline, webhook replay, expired link, recovery, refund, and unauthorized download. Then set `LABEL_KIT_PRICE_LABEL` and `LABEL_KIT_CHECKOUT_URL` (HTTPS `buy.stripe.com` link) in the deployment. Both are required; either missing or an invalid destination leaves the preview active. Match the displayed price to Stripe. Rebuild and verify the deployed purchase-to-download path before directing customers to it.

No Stripe product, price, payment link, webhook, entitlement table, or file-delivery service has been created by this change. The frontend configuration does not verify backend readiness; complete the fulfillment steps before enabling payment.

## Later: subscription with ongoing updates

Create a separate recurring Stripe price and entitlement to the rolling latest release while the subscription is active. Keep one-time purchases pinned to their purchased version. Subscription lifecycle events and paid renewal events should update entitlement independently of the original purchase. Give subscribers billing-portal access for cancellation. Already downloaded files remain usable; future downloads depend on the terms and active entitlement. No subscription selection or lifetime-update promise is in the current purchase UI.

A ZIP can be access-controlled before download; it cannot prevent copying afterward. The commercial value is the curated package, setup, tested releases and future maintenance, while the existing public source remains available.

## Sources

- https://docs.stripe.com/payment-links — hosted checkout links.
- https://docs.stripe.com/checkout/fulfillment — verified, idempotent webhook fulfillment and delayed payment handling.
