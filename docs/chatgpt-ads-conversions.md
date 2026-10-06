# ChatGPT Ads inquiry conversions

The root layout installs the OpenAI Measurement Pixel once using Next Script's
`beforeInteractive` bootstrap; the remote SDK loads asynchronously. Collection is
restricted to `recoupable.dev` and `www.recoupable.dev`, and skipped for browsers
that expose Global Privacy Control or Do Not Track. Localhost and preview hosts
do not load the SDK. Production debug logging is off.

`useInquirySubmit` sends `lead_created` with `{ type: "customer_action" } only
after `readInquiryReceipt` validates a successful server receipt. This covers the
shared inquiry forms on contact, start-project, acquisitions/contact and
operations/contact. Clicks, failed submissions, email fallbacks and newsletter
subscriptions do not fire this event.

The event ID is `inquiry_<submissionId>` so repeated receipts share a deduplication
key. No revenue is invented. No form values are explicitly passed to OpenAI, and
`opt_out: true` opts these events out of future user-level personalization. The
SDK can independently use automatic advanced matching when enabled in the pixel
configuration; omitting an explicit user object does not disable that feature.
The site currently has no consent-management interface. The SDK honors stored
consent denial; a future consent manager must call `oaiq("consent", false)` before
initialization and grant consent only after the visitor's choice. Newsletter
consent must never be reused as measurement consent.

## Ads Manager

- Data source: the existing pixel supplied for this setup.
- Conversion name: **Project inquiry submitted**.
- Base event: **Lead created** (`lead_created`).
- Attach the event to the existing campaign for reporting.
- Campaign objective and budget are separate from conversion measurement.

## Verification

`pnpm test` exercises the bootstrap, host/privacy restrictions, event payload,
stable event IDs, missing/blocked SDKs and successful versus failed form receipts.
Tests do not send real leads or measurement events.

After deployment, verify the single SDK loader on the live site. A real,
successfully submitted inquiry should appear as `lead_created` in the pixel's
Event Stream. A received event alone is not proof of an attributed conversion:
attribution also requires an eligible ad interaction within the configured window.
Do not submit fabricated inquiries to the production CRM just to test tracking.

References: [Measurement Pixel](https://developers.openai.com/ads/measurement-pixel)
and [Conversion Measurement](https://help.openai.com/en/articles/20001409-conversion-measurement).
