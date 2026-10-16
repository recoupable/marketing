import { negotiateDocsMarkdown } from "./docs/negotiateDocsMarkdown.ts";

/** Reuse docs media-type preferences without importing the content corpus into Proxy. */
export function negotiatePageMarkdown(pathname: string, accept: string | null) {
  if (
    pathname === "/agents.md" ||
    /^\/(?:api|agent-api|_next|brand\/assets)(?:\/|$)/.test(pathname)
  )
    return null;
  const explicit = pathname.endsWith(".md");
  const path =
    (explicit ? pathname.slice(0, -3) : pathname).replace(/\/+$/, "") || "/";
  if (!/^\/(?:[a-z0-9-]+(?:\/[a-z0-9-]+)*)?$/.test(path)) return null;
  // Keep existing docs downloads/specifications and the playbook asset intact.
  if (
    /^\/docs(?:\/|$)/.test(path) &&
    !["/docs", "/docs/api-reference"].includes(path)
  )
    return null;
  if (path === "/playbook/recoup-ai-music-playbook") return null;
  if (!explicit && !negotiateDocsMarkdown("/docs/index", accept)) return null;
  const sourcePath =
    explicit && path === "/index"
      ? "/"
      : explicit && path === "/agents/index"
        ? "/agents"
        : path;
  return `/agent-api/v1/markdown?${new URLSearchParams({ path: sourcePath })}`;
}
