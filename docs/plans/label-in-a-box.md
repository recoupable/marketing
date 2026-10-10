# Recoup plugin — Starter subscription

## Offer and implementation

$19 USD/month includes Recoup Starter access ($20 monthly usage credits), plugin download and ongoing skill updates while subscribed. AI subscriptions and third-party services are separate. The public skills remain AGPL-3.0-only. Existing live Starter price: `price_1U9oWu00JObOnOb51BToZiq1` (verified October 8, 2026). No new Stripe product is needed.

- `/label-in-a-box`: offer and preview dialog until activated.
- `POST /api/label-kit/checkout`: same-origin request, fixed Starter plan and server-derived return URLs; calls the API-owned subscription session endpoint. No user-supplied price, plan or redirect. Only Stripe checkout URLs are returned.
- `/label-in-a-box/setup`: Privy email sign-in using the checkout email, download, client setup, first prompt, and billing/support links. No payment success claim based on query parameters.
- `GET /api/label-kit/download`: resolves the bearer token's account through `/accounts/id`, checks `/accounts/{id}/subscription`, then streams the configured private Blob. Only active Starter/Pro access qualifies; no free/trial/past-due/canceled access. Rechecks every download with no cache. No account ID or Blob path accepted from the browser.
- Anonymous checkout relies on the existing API webhook's billing-email account linking. We do not call the subscription claim endpoint or transfer ownership based on a session ID. Returning buyers must sign in with the same email. A pending webhook displays retry guidance.

## Stage the shipped plugin

`content/label-kit/release.json` pins the official customer asset, source commit, release tag and published SHA-256. Current release: `plugin-v2026.1008.2`, 34 customer skills, Codex manifest and bundled MCP. The full/staff archive is not used.

Download the pinned customer asset from its recorded GitHub release URL, then:

```sh
python3 scripts/label-kit/build.py /private/recoup-customer-2026.1008.2.zip /private/output/recoup-plugin.zip
```

Despite the legacy script name, this now verifies and copies the upstream ZIP unchanged. It rejects checksum mismatches, internal skill paths, unsafe paths and missing MCP configuration. There is no local skills allowlist, generated plugin manifest, per-skill ZIP, or example MCP config. License and source contents remain upstream-owned.

Setup follows the shipped README: Claude Code marketplace install + `/mcp` OAuth sign-in; Codex uses the customer ZIP/local-plugin flow; Cursor uses the source repository's plugin manifest. The release's `openai_status` is `upload_and_review_required`; do not advertise an available ChatGPT listing. REST-only workflows can still require separate credentials.

## Activation (not completed)

1. Review the packaged skills and exercise the advertised workflows with Starter credits. Check Claude Code, Codex and Cursor authentication, network/tool permissions and prerequisites. The shipped plugin now configures OAuth MCP. ChatGPT distribution still requires submission and review; this is separate from the included MCP connection. Keep checkout disabled while the headline advertises unsupported setup paths.
2. The existing marketing Blob token was tested and belongs to a public store; private upload was rejected and no ZIP was published. Create/use a **private** Vercel Blob store and upload the reviewed immutable ZIP under `label-kit/<version>.zip`. Do not publish a public Blob or static download URL. Use a token for that private store. The helper `node scripts/label-kit/upload.mjs /private/plugin.zip VERSION` uploads privately and refuses to overwrite an existing version.
3. Set `LABEL_KIT_BLOB_PATH` and `LABEL_KIT_BLOB_READ_WRITE_TOKEN` server-side. Configure `NEXT_PUBLIC_PRIVY_APP_ID` for the same identity environment as `siteConfig.apiUrl`. The existing marketing config selects test API for local/preview and production API for production. Never test real payments through preview unintentionally.
4. In Stripe test mode, verify anonymous Starter checkout → webhook account linking → matching email sign-in → download. Verify existing subscribers, failed/duplicate events, renewal, cancellation and support recovery. Confirm the deployed API's Starter price/env, status contract and monthly credits. No completed test payment has been performed in this change.
5. Confirm billing management/cancellation and installed-client compatibility. Only then set `LABEL_KIT_CHECKOUT_ENABLED=true`, rebuild and verify deployed behavior. Legacy `LABEL_KIT_CHECKOUT_URL`, `LABEL_KIT_PRICE_LABEL` and `LABEL_KIT_STARTER_CHECKOUT_URL` do not activate the new flow.

Updates: publish another reviewed immutable ZIP and change the configured path. Active subscribers return to setup to download and reinstall; automatic client updates and update-notification email are not implemented. Previously downloaded files cannot be revoked. Connected services and future downloads depend on the active subscription.

## Verification

`pnpm test lib/label-kit`, scoped ESLint, and `pnpm build`. Route tests cover account-derived access, rejected subscription states, private streaming, upstream/auth failures, cross-origin checkout, activation gates, fixed Starter selection and redirect validation. These checks are not a live purchase or installed-client verification.
