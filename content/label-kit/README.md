# Customer plugin bundle

One download after subscribing. The setup page authenticates the buyer; the download endpoint checks an active Starter/Pro subscription. Checkout is tagged `fulfillment: recoup-plugin` so the API's verified payment webhook sends the download-page link and short instructions to the billing email. No app selector or terminal instructions on the website.

The deterministic builder verifies the official customer archive and overlays the official Claude/Cursor manifests from the same pinned source commit. All original customer files are retained under `recoup-plugin/`; `START HERE.html` sits beside that folder. No internal skills are included. The bundle includes installation options, not a claim that every host has been tested end to end. ChatGPT distribution is not an available option.

`release.json` pins input and output hashes. Any guide or manifest change requires rebuilding and reviewing the output hash. The upload helper accepts only that exact bundle and a dedicated private Blob store.

Run:

```sh
python3 scripts/label-kit/build.py /private/recoup-customer-2026.1008.2.zip /private/recoup-plugin.zip
node scripts/label-kit/upload.mjs /private/recoup-plugin.zip 2026.1008.2-bundle.1
```

Never publish the bundle under `public/`. Plugin source and its AGPL license remain included. Account access and usage require the Recoup subscription. Installed-client, private hosting and payment-to-email-to-download verification remain launch gates.
