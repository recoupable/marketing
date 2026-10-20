# Customer plugin delivery

One private download after subscribing. The API verifies the purchase and active
subscription on every download. This grants file access, not a Recoup account
login. The existing payment webhook emails the setup link; setup directs customers
to connect Recoup through their host’s OAuth UI using their checkout account.

Skills is the single authoring and packaging source. Marketing copies the official
`packages.buyer` ZIP without overlays, repacking or a second setup guide. That
archive contains `START HERE.html` and `recoup-plugin/`. Host adapters, skills and
release provenance are produced together. Host-specific ZIP checksums may differ;
the customer-content digest is shared across buyer, local, workspace and Claude
packages. Store review and approval remain separate from a published source release.

`release.json` pins the immutable official artifact URL, source commit, release,
archive SHA-256 and shared content digest. The build/upload helpers verify these
pins. The download route requires the matching private Blob pathname and verifies
the bytes before delivery, returning release and checksum headers. Checkout is
unavailable while the deployment pathname and source pin differ. Cut over the
source pin, private artifact and deployment configuration together.

```sh
python3 scripts/label-kit/build.py /private/recoup-buyer-VERSION.zip /private/recoup-plugin.zip
node scripts/label-kit/upload.mjs /private/recoup-plugin.zip VERSION
```

The version is visible on setup and in the archive’s `RELEASE.json`. ZIP updates
are manual: use the original purchase-email link to download the pinned release,
then replace the installed plugin through the host’s install flow. No reinstall
claims imply that a store listing has been updated. Never publish the private ZIP
under `public/`; the underlying open-source skills and AGPL license remain included.

First request: attach a song and ask “Create a release pack for this song.” The
skill collects essential creative context inline and preserves the brief through
connection. New releases, anniversaries, reissues, remixes and catalog rediscovery
use the same flow. Media generation requires exposed backend tools, usable audio
and an approved complete quote. A paid subscription is not a claim that every host
supports uploading a selected file or that a store review has passed.
