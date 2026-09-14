import { createReadStream } from "node:fs";
import { readFile, readdir, writeFile, rename, stat } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";
import { loadEnvFile } from "node:process";
import { put, head, BlobNotFoundError } from "@vercel/blob";
try {
  loadEnvFile(".env.local");
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}
if (!process.env.BLOB_READ_WRITE_TOKEN)
  throw Error(
    "Connect the marketing Blob store and pull its environment before publishing.",
  );
const root = path.resolve("brand-studio");
const destination = path.join(root, "blob-assets.json");
let manifest = {};
try {
  manifest = JSON.parse(await readFile(destination, "utf8"));
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}
async function walk(dir) {
  const result = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".")) continue;
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) result.push(...(await walk(file)));
    else if (entry.isFile()) result.push(file);
  }
  return result;
}
const files = await walk(path.join(root, "assets"));
const media = files.filter(
  (file) => ![".html", ".js", ".mjs", ".css"].includes(path.extname(file)),
);
let index = 0,
  completed = 0,
  uploaded = 0;
let checkpoint = Promise.resolve();
function save() {
  const snapshot =
    JSON.stringify(
      Object.fromEntries(Object.entries(manifest).sort()),
      null,
      2,
    ) + "\n";
  checkpoint = checkpoint.then(async () => {
    await writeFile(destination + ".tmp", snapshot);
    await rename(destination + ".tmp", destination);
  });
  return checkpoint;
}
async function worker() {
  for (;;) {
    const file = media[index++];
    if (!file) return;
    const relative = path.relative(root, file).split(path.sep).join("/");
    const size = (await stat(file)).size;
    const hash = createHash("sha256");
    for await (const chunk of createReadStream(file)) hash.update(chunk);
    const sha256 = hash.digest("hex");
    if (manifest[relative]?.sha256 !== sha256) {
      const remotePath = `brand/${sha256.slice(0, 20)}/${relative}`;
      let blob;
      try {
        blob = await head(remotePath);
      } catch (error) {
        if (!(error instanceof BlobNotFoundError)) throw error;
        await put(remotePath, createReadStream(file), {
          access: "public",
          addRandomSuffix: false,
          allowOverwrite: false,
          multipart: size > 8 * 1024 * 1024,
          cacheControlMaxAge: 31536000,
        });
        blob = await head(remotePath);
      }
      if (blob.size !== size)
        throw Error("Uploaded asset size mismatch: " + relative);
      manifest[relative] = {
        url: blob.url,
        downloadUrl: blob.downloadUrl,
        size,
        sha256,
      };
      uploaded++;
      await save();
    }
    completed++;
    if (completed % 50 === 0 || completed === media.length)
      console.log(
        `${completed}/${media.length} assets ready (${uploaded} uploaded)`,
      );
  }
}
await Promise.all(Array.from({ length: 4 }, worker));
await checkpoint;
console.log(
  `Published manifest: ${Object.keys(manifest).length} files, ${Object.values(manifest).reduce((sum, f) => sum + f.size, 0)} bytes.`,
);

// Keep release uploads small when new assets are added to the local library.
await writeFile(
  ".vercelignore",
  "# Local scratch files and Blob-hosted media. Originals stay on disk.\n.gen/\n.env*\n.git/\n.next/\n.vercel/\nnode_modules/\n*.pem\nbrand-studio/**/__pycache__/\nbrand-studio/.venv/\n" +
    media
      .map((file) =>
        path.relative(process.cwd(), file).split(path.sep).join("/"),
      )
      .sort()
      .join("\n") +
    "\n",
);
