import { websiteOpenAPI } from "@/lib/agent-openapi";

export const dynamic = "force-static";

export function GET() {
  const spec = websiteOpenAPI();
  const markdown = [
    `# ${spec.info.title}`,
    "",
    spec.info.description,
    "",
    "[JSON specification](/openapi.json)",
    "",
    "```json",
    JSON.stringify(spec, null, 2),
    "```",
    "",
  ].join("\n");

  return new Response(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      Link: '</openapi.json>; rel="canonical", </openapi.json>; rel="alternate"; type="application/json"',
    },
  });
}
