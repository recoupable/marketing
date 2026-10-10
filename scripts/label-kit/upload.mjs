// Run only against a private Blob store, after reviewing the package.
// LABEL_KIT_BLOB_READ_WRITE_TOKEN must be supplied by the deployment's secret manager.
import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { put } from "@vercel/blob";
const [file, version] = process.argv.slice(2);
if (!file || !/^[a-zA-Z0-9][a-zA-Z0-9.-]*$/.test(version ?? "")) {
  throw new Error(
    "Usage: node scripts/label-kit/upload.mjs /private/plugin.zip VERSION",
  );
}
if (!process.env.LABEL_KIT_BLOB_READ_WRITE_TOKEN)
  throw new Error("Missing private-store token");
const release = JSON.parse(
  await readFile(
    new URL("../../content/label-kit/release.json", import.meta.url),
    "utf8",
  ),
);
const bytes = await readFile(file);
if (
  version !== release.bundleVersion ||
  createHash("sha256").update(bytes).digest("hex") !== release.bundleSha256
)
  throw new Error("Expected the pinned customer bundle and version");
const result = await put(`label-kit/${version}.zip`, bytes, {
  access: "private",
  token: process.env.LABEL_KIT_BLOB_READ_WRITE_TOKEN,
  contentType: "application/zip",
  addRandomSuffix: false,
  allowOverwrite: false,
});
console.log(
  `Set LABEL_KIT_BLOB_PATH=${result.pathname}. Checkout remains disabled until verified.`,
);
