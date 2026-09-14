import blobAssets from "@/brand-studio/blob-assets.json";
import { createReadStream } from "node:fs";
import { realpath, stat } from "node:fs/promises";
import path from "node:path";
import { Readable } from "node:stream";

const types: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".ttf": "font/ttf",
  ".mp4": "video/mp4",
  ".mov": "video/quicktime",
  ".zip": "application/zip",
  ".md": "text/plain; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
};

/** Serve the portable Studio without importing its artwork into the application bundle. */
export async function serveAsset(
  request: Request,
  segments: string[],
  root = path.join(process.cwd(), "brand-studio"),
): Promise<Response> {
  const headers = new Headers({
    "X-Robots-Tag": "noindex, nofollow",
    "X-Content-Type-Options": "nosniff",
    "Cache-Control": "no-cache",
  });
  const missing = () => new Response(null, { status: 404, headers });
  if (
    !segments.length ||
    segments.some((s) => !s || s.startsWith(".") || /[\\/\0]/.test(s))
  )
    return missing();
  // Only the browser application and artwork are public; authoring scripts stay private.
  if (segments.length > 1 && segments[0] !== "assets") return missing();
  const contentType = types[path.extname(segments.at(-1)!).toLowerCase()];
  if (!contentType) return missing();
  // Stable /brand URLs resolve to immutable media in Blob; bytes bypass the app server.
  const remote = (
    blobAssets as Record<string, { url: string; downloadUrl: string }>
  )[segments.join("/")];
  if (remote) {
    headers.set(
      "Location",
      new URL(request.url).searchParams.get("download") === "1"
        ? remote.downloadUrl
        : remote.url,
    );
    return new Response(null, { status: 307, headers });
  }
  let file: string, size: number;
  try {
    const base = await realpath(root);
    file = await realpath(path.join(base, ...segments));
    if (
      !file.startsWith(base + path.sep) ||
      file !== path.join(base, ...segments)
    )
      return missing();
    const info = await stat(file);
    if (!info.isFile()) return missing();
    size = info.size;
    headers.set("Last-Modified", info.mtime.toUTCString());
  } catch (error) {
    if (
      ["ENOENT", "ENOTDIR"].includes(
        (error as NodeJS.ErrnoException).code ?? "",
      )
    )
      return missing();
    throw error;
  }
  headers.set("Content-Type", contentType);
  headers.set("Accept-Ranges", "bytes");
  if (contentType === "application/zip")
    headers.set(
      "Content-Disposition",
      `attachment; filename="${path.basename(file)}"`,
    );
  let start = 0,
    end = size - 1,
    status = 200;
  const range = request.headers.get("range");
  if (range && request.method === "GET") {
    const match = /^bytes=(\d*)-(\d*)$/.exec(range);
    if (match && (match[1] || match[2])) {
      if (!match[1]) start = Math.max(0, size - Number(match[2]));
      else {
        start = Number(match[1]);
        if (match[2]) end = Math.min(end, Number(match[2]));
      }
      if (
        !Number.isSafeInteger(start) ||
        !Number.isSafeInteger(end) ||
        start > end ||
        start >= size
      ) {
        headers.set("Content-Range", `bytes */${size}`);
        return new Response(null, { status: 416, headers });
      }
      status = 206;
      headers.set("Content-Range", `bytes ${start}-${end}/${size}`);
    }
  }
  headers.set("Content-Length", String(Math.max(0, end - start + 1)));
  if (request.method === "HEAD" || size === 0)
    return new Response(null, { status, headers });
  const body = Readable.toWeb(
    createReadStream(file, { start, end }),
  ) as ReadableStream<Uint8Array>;
  return new Response(body, { status, headers });
}
