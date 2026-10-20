import { getCompleteOpenAPI } from "@/lib/agent-discovery/getCompleteOpenAPI";

export const dynamic = "force-static";

export async function GET() {
  const spec = await getCompleteOpenAPI();
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
