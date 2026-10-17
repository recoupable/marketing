import { entryForPath } from "./entryForPath.ts";

/** One complete document, using the same published registry as search and read. */
export async function markdownResponse(request: Request) {
  const params = new URL(request.url).searchParams;
  const entry =
    params.getAll("path").length === 1 &&
    [...params.keys()].every((key) => key === "path")
      ? entryForPath(params.get("path")!)
      : undefined;
  const headers = {
    "Content-Type": "text/markdown; charset=utf-8",
    "Cache-Control": "no-store",
    "Access-Control-Allow-Origin": "*",
    "X-Content-Type-Options": "nosniff",
    "X-Robots-Tag": "noindex, follow",
    Vary: "Accept",
  };
  if (!entry)
    return new Response(
      "# Not found\n\nNo published page exists at this path.\n",
      { status: 404, headers },
    );
  return new Response(await entry.markdown(), {
    headers: { ...headers, Link: `<${entry.metadata.url}>; rel="canonical"` },
  });
}
