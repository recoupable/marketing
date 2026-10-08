# Recoup plugin — Starter subscription

## Offer and implementation

$19 USD/month includes Recoup Starter access ($20 monthly usage credits), plugin download and ongoing skill updates while subscribed. AI subscriptions and third-party services are separate. The public skills remain AGPL-3.0-only. Existing live Starter price: `price_1U9oWu00JObOnOb51BToZiq1` (verified October 8, 2026). No new Stripe product is needed.

- `/label-in-a-box`: offer and preview dialog until activated.
- `POST /api/label-kit/checkout`: same-origin request, fixed Starter plan and server-derived return URLs; calls the API-owned subscription session endpoint. No user-supplied price, plan or redirect. Only Stripe checkout URLs are returned.
- `/label-in-a-box/setup`: Privy email sign-in using the checkout email, download, client setup, first prompt, and billing/support links. No payment success claim based on query parameters.
- `GET /api/label-kit/download`: resolves the bearer token's account through `/accounts/id`, checks `/accounts/{id}/subscription`, then streams the configured private Blob. Only active Starter/Pro access qualifies; no free/trial/past-due/canceled access. Rechecks every download with no cache. No account ID or Blob path accepted from the browser.
- Anonymous checkout relies on the existing API webhook's billing-email account linking. We do not call the subscription claim endpoint or transfer ownership based on a session ID. Returning buyers must sign in with the same email. A pending webhook displays retry guidance.

## Build the preview package

From the marketing checkout:

```sh
python3 scripts/label-kit/build.py /path/to/recoupable/skills /private/output/recoup-plugin.zip
```

`content/label-kit/release.json` pins the source commit and explicit list of public skills. The builder reads Git objects (never dirty files), rejects symlinks and internal skills, includes license, setup README, file hashes, individual Claude-web skill archives, and the release-review agent. It refuses marketing `public/` output. The generated ZIP is not committed. The subscription does not remove source license rights; redistribution remains subject to AGPL.

## Activation (not completed)

1. Review the packaged skills and exercise the advertised workflows with Starter credits. Check Claude Code and Claude web authentication, network/tool permissions and prerequisites. ChatGPT custom MCP app authentication is not ready: the current Recoup MCP source only establishes bearer authentication, not a verified customer OAuth flow. Keep checkout disabled while the headline advertises unsupported setup paths.
2. The existing marketing Blob token was tested and belongs to a public store; private upload was rejected and no ZIP was published. Create/use a **private** Vercel Blob store and upload the reviewed immutable ZIP under `label-kit/<version>.zip`. Do not publish a public Blob or static download URL. Use a token for that private store. The helper `node scripts/label-kit/upload.mjs /private/plugin.zip VERSION` uploads privately and refuses to overwrite an existing version.
3. Set `LABEL_KIT_BLOB_PATH` and `LABEL_KIT_BLOB_READ_WRITE_TOKEN` server-side. Configure `NEXT_PUBLIC_PRIVY_APP_ID` for the same identity environment as `siteConfig.apiUrl`. The existing marketing config selects test API for local/preview and production API for production. Never test real payments through preview unintentionally.
4. In Stripe test mode, verify anonymous Starter checkout → webhook account linking → matching email sign-in → download. Verify existing subscribers, failed/duplicate events, renewal, cancellation and support recovery. Confirm the deployed API's Starter price/env, status contract and monthly credits. No completed test payment has been performed in this change.
5. Confirm billing management/cancellation and install compatibility. Only then set `LABEL_KIT_CHECKOUT_ENABLED=true`, rebuild and verify deployed behavior. Legacy `LABEL_KIT_CHECKOUT_URL`, `LABEL_KIT_PRICE_LABEL` and `LABEL_KIT_STARTER_CHECKOUT_URL` do not activate the new flow.

Updates: publish another reviewed immutable ZIP and change the configured path. Active subscribers return to setup to download and reinstall; automatic client updates and update-notification email are not implemented. Previously downloaded files cannot be revoked. Connected services and future downloads depend on the active subscription.

## Verification

`pnpm test lib/label-kit`, scoped ESLint, and `pnpm build`. Route tests cover account-derived access, rejected subscription states, private streaming, upstream/auth failures, cross-origin checkout, activation gates, fixed Starter selection and redirect validation. These checks are not a live purchase or installed-client verification.
