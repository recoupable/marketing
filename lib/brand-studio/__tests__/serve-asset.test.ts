import blobAssets from "@/brand-studio/blob-assets.json";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { mkdtemp, mkdir, writeFile, symlink, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { serveAsset } from "../serve-asset";

let root: string;
const get = (segments: string[], headers = {}, method = "GET") =>
  serveAsset(
    new Request("http://localhost/brand-studio/", { headers, method }),
    segments,
    root,
  );
beforeAll(async () => {
  root = await mkdtemp(path.join(tmpdir(), "studio-route-"));
  await mkdir(path.join(root, "assets"));
  await writeFile(path.join(root, "finals.html"), "<h1>Finals</h1>");
  await writeFile(path.join(root, "assets", "intro.mp4"), "0123456789");
  await writeFile(path.join(root, "assets", "kit.zip"), "ZIP");
  await writeFile(path.join(root, ".env"), "private");
  await symlink(path.dirname(root), path.join(root, "assets", "outside"));
});
afterAll(() => rm(root, { recursive: true, force: true }));
describe("Brand Studio assets", () => {
  it("serves HTML with noindex and correct content type", async () => {
    const r = await get(["finals.html"]);
    expect(r.status).toBe(200);
    expect(await r.text()).toBe("<h1>Finals</h1>");
    expect(r.headers.get("content-type")).toContain("text/html");
    expect(r.headers.get("x-robots-tag")).toBe("noindex, nofollow");
  });
  it("supports video seeks, suffix ranges, and unsatisfiable ranges", async () => {
    const r = await get(["assets", "intro.mp4"], { Range: "bytes=2-5" });
    expect(r.status).toBe(206);
    expect(r.headers.get("content-range")).toBe("bytes 2-5/10");
    expect(await r.text()).toBe("2345");
    expect(
      await (await get(["assets", "intro.mp4"], { Range: "bytes=-3" })).text(),
    ).toBe("789");
    expect(
      (await get(["assets", "intro.mp4"], { Range: "bytes=20-" })).status,
    ).toBe(416);
    expect(
      (await get(["assets", "intro.mp4"], { Range: "bytes=-0" })).status,
    ).toBe(416);
  });
  it("returns HEAD metadata without reading a body and downloads ZIPs", async () => {
    const r = await get(["assets", "kit.zip"], {}, "HEAD");
    expect(r.headers.get("content-length")).toBe("3");
    expect(await r.text()).toBe("");
    expect(r.headers.get("content-disposition")).toContain("attachment");
  });
  it("does not expose filesystem paths, hidden files, or scripts", async () => {
    for (const parts of [
      ["..", "package.json"],
      [".env"],
      ["assets/../.env"],
      ["scripts", "build.py"],
      ["assets", "outside", "package.json"],
      ["missing.png"],
    ]) {
      expect((await get(parts)).status).toBe(404);
    }
  });
});

describe("Hosted Brand Studio media", () => {
  it("delivers carousel PDFs from storage as document downloads", async () => {
    const key = "assets/carousels/blue-notes/blue-notes.pdf";
    const response = await serveAsset(
      new Request("https://example.com/brand/" + key + "?download=1"),
      key.split("/"),
      "/no-local-media",
    );
    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe(blobAssets[key].downloadUrl);
  });
  it("resolves a versioned media URL without requiring the original local file", async () => {
    const [key, media] = Object.entries(blobAssets)[0];
    const r = await serveAsset(
      new Request("https://example.com/brand/" + key),
      key.split("/"),
      "/nonexistent-originals",
    );
    expect(r.status).toBe(307);
    expect(r.headers.get("location")).toBe(media.url);
    const download = await serveAsset(
      new Request("https://example.com/brand/" + key + "?download=1"),
      key.split("/"),
      "/nonexistent-originals",
    );
    expect(download.headers.get("location")).toBe(media.downloadUrl);
  });
});
