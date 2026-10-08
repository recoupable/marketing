// Run only against a private Blob store, after reviewing the package.
// LABEL_KIT_BLOB_READ_WRITE_TOKEN must be supplied by the deployment's secret manager.
import { readFile } from "node:fs/promises";
import { put } from "@vercel/blob";
const [file, version] = process.argv.slice(2);
if (!file || !/^[a-zA-Z0-9][a-zA-Z0-9.-]*$/.test(version ?? "")) {
  throw new Error(
    "Usage: node scripts/label-kit/upload.mjs /private/plugin.zip VERSION",
  );
}
if (!process.env.LABEL_KIT_BLOB_READ_WRITE_TOKEN)
  throw new Error("Missing private-store token");
const result = await put(`label-kit/${version}.zip`, await readFile(file), {
  access: "private",
  token: process.env.LABEL_KIT_BLOB_READ_WRITE_TOKEN,
  contentType: "application/zip",
  addRandomSuffix: false,
  allowOverwrite: false,
});
console.log(
  `Set LABEL_KIT_BLOB_PATH=${result.pathname}. Checkout remains disabled until verified.`,
);
