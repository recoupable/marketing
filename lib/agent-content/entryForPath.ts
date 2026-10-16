import { entries } from "./entries.ts";

const byPath = new Map(
  entries
    .filter((entry) => !new URL(entry.metadata.url).hash)
    .map((entry) => [new URL(entry.metadata.url).pathname, entry]),
);
const aliases: Record<string, string> = {
  "/privacy-policy": "/privacy",
  "/terms-of-use": "/terms",
};

/** Resolve published paths only; never fetch a visitor-provided URL or file. */
export function entryForPath(pathname: string) {
  if (!/^\/(?:[a-z0-9-]+(?:\/[a-z0-9-]+)*)?\/?$/.test(pathname))
    return undefined;
  const path = pathname.replace(/\/+$/, "") || "/";
  return byPath.get(aliases[path] ?? path);
}
