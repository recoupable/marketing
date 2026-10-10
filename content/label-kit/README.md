# Customer plugin bundle

One download after subscribing. The private purchase link opens the download without another sign-in; the API verifies payment and an active Starter/Pro subscription. Checkout is tagged `fulfillment: recoup-plugin` so, after deploying the companion API PR #995, its verified payment webhook sends the download-page link and short instructions to the billing email. No app selector or terminal instructions on the website.

The deterministic builder verifies the official customer archive and overlays the official Claude/Cursor manifests from the same pinned source commit. All original customer files are retained under `recoup-plugin/`; `START HERE.html` sits beside that folder. No internal skills are included. The bundle includes installation options, not a claim that every host has been tested end to end. ChatGPT distribution is not an available option.

`release.json` pins input and output hashes. Any guide or manifest change requires rebuilding and reviewing the output hash. The upload helper verifies that exact bundle and requests private storage. A dedicated private Blob store is a deployment prerequisite; the helper does not verify store ownership.

Run:

```sh
python3 scripts/label-kit/build.py /private/recoup-customer-2026.1008.2.zip /private/recoup-plugin.zip
node scripts/label-kit/upload.mjs /private/recoup-plugin.zip 2026.1008.2-bundle.2
```

Never publish the bundle under `public/`. Plugin source and its AGPL license remain included. Account access and usage require the Recoup subscription. Installed-client, private hosting and payment-to-email-to-download verification remain launch gates.
