# Recoup plugin — Starter subscription

## Offer and implementation

$19 USD/month includes Recoup Starter access ($20 monthly usage credits), plugin download and ongoing skill updates while subscribed. AI subscriptions and third-party services are separate. The public skills remain AGPL-3.0-only. Existing live Starter price: `price_1U9oWu00JObOnOb51BToZiq1` (verified October 8, 2026). No new Stripe product is needed.

- `/label-in-a-box`: offer and preview dialog until activated.
- `POST /api/label-kit/checkout`: same-origin request, fixed Starter plan and server-derived return URLs; calls the API-owned subscription session endpoint. No user-supplied price, plan or redirect. Only Stripe checkout URLs are returned.
- `/label-in-a-box/setup`: one download button, installation instructions inside the ZIP. Checkout and the purchase email include `#purchase=<session ID>`; the fragment is not sent in ordinary page requests.
- `GET /api/label-kit/download`: sends the private capability to API `POST /plugin/download-access`, which retrieves the Stripe session and subscription. Only completed, paid, plugin-tagged sessions with active Starter/Pro subscriptions qualify. No account login, customer data, account transfer or browser-supplied file path. Every download is reverified and streamed privately with no cache.
- The purchase link grants file access only. Keep it private; recipients can download while the subscription remains active. Account linking still happens in the webhook; authentication for connected tools happens inside the buyer's AI.

## Stage the shipped plugin

`content/label-kit/release.json` pins the official customer asset, source commit, release tag and published SHA-256. Current release: `plugin-v2026.1008.2`, 34 customer skills, Codex manifest and bundled MCP. The full/staff archive is not used.

Download the pinned customer asset from its recorded GitHub release URL, then:

```sh
python3 scripts/label-kit/build.py /private/recoup-customer-2026.1008.2.zip /private/output/recoup-plugin.zip
```

The builder verifies the original archive, retains its customer files under recoup-plugin/, adds pinned official Claude and Cursor manifests from the same source commit, and includes START HERE.html. The resulting deterministic bundle has its own version and SHA-256. It rejects checksum mismatches, internal skill paths, unsafe paths and missing MCP configuration. There is no local skills allowlist, generated plugin manifest, per-skill ZIP, or example MCP config. License and source contents remain upstream-owned.

Setup follows the shipped README: Claude Code marketplace install + `/mcp` OAuth sign-in; Codex uses the customer ZIP/local-plugin flow; Cursor uses the source repository's plugin manifest. The release's `openaiStatus` is `upload_and_review_required`; do not advertise an available ChatGPT listing. REST-only workflows can still require separate credentials.

## Purchase email

Deploy the companion API change before activating checkout: session requests now include `fulfillment: recoup-plugin`. The verified completed/async-payment-succeeded webhook sends through Resend after payment and account linking, with a private first-party setup link and unzip/open START HERE instructions. It uses a per-session Resend idempotency key plus a persistent Stripe delivery marker. No browser query claims payment or email success. The email uses the billing email and the generic account welcome is suppressed for these checkouts. No real email has been sent by this implementation task.

## Activation (not completed)

1. Review the packaged skills and exercise the advertised workflows with Starter credits. Check Claude Code, Codex and Cursor authentication, network/tool permissions and prerequisites. The shipped plugin now configures OAuth MCP. ChatGPT distribution still requires submission and review; this is separate from the included MCP connection. Keep checkout disabled while the headline advertises unsupported setup paths.
2. The existing marketing Blob token was tested and belongs to a public store; private upload was rejected and no ZIP was published. Create/use a **private** Vercel Blob store and upload the reviewed immutable ZIP under `label-kit/<version>.zip`. Do not publish a public Blob or static download URL. Use a token for that private store. The helper `node scripts/label-kit/upload.mjs /private/plugin.zip VERSION` uploads privately and refuses to overwrite an existing version.
3. Set `LABEL_KIT_BLOB_PATH` and `LABEL_KIT_BLOB_READ_WRITE_TOKEN` server-side. The existing marketing config selects test API for local/preview and production API for production. Never test real payments through preview unintentionally.
4. In Stripe test mode, verify anonymous Starter checkout → webhook account linking → plugin delivery email → private purchase link → download without another sign-in. Verify existing subscribers, failed/duplicate events, renewal, cancellation and support recovery. Confirm the deployed API's Starter price/env, status contract and monthly credits. No completed test payment has been performed in this change.
5. Confirm billing management/cancellation and installed-client compatibility. Only then set `LABEL_KIT_CHECKOUT_ENABLED=true`, rebuild and verify deployed behavior. Legacy `LABEL_KIT_CHECKOUT_URL`, `LABEL_KIT_PRICE_LABEL` and `LABEL_KIT_STARTER_CHECKOUT_URL` do not activate the new flow.

Updates: publish another reviewed immutable ZIP and change the configured path. Active subscribers reuse their private purchase link to download and reinstall; automatic client updates and update-notification email are not implemented. Previously downloaded files cannot be revoked. Connected services and future downloads depend on the active subscription.

## Verification

`pnpm test lib/label-kit`, scoped ESLint, and `pnpm build`. Route tests cover purchase verification, rejected purchase proof, private streaming, upstream failures, cross-origin checkout, activation gates, fixed Starter selection and redirect validation. These checks are not a live purchase or installed-client verification.
