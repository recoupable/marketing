import { getCompleteOpenAPI } from "@/lib/agent-discovery/getCompleteOpenAPI";
export const dynamic = "force-static";
export async function GET() {
  return Response.json(await getCompleteOpenAPI(), {
    headers: {
      "Access-Control-Allow-Origin": "*",
      Link: '</agents>; rel="service-doc", </openapi.json.md>; rel="alternate"; type="text/markdown"',
    },
  });
}
