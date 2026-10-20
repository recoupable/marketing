import { siteConfig } from "@/lib/config";
import { docs } from "@/lib/docs";
import { docsLlmsLinks } from "@/lib/docs/docsLlmsLinks";
import { discoveryHeaders } from "@/lib/agent-discovery/discoveryHeaders";

export const dynamic = "force-static";

export function GET() {
  return new Response(
    `# Recoup documentation\n\nEvery platform guide and API operation. Full page contents are available in [the complete documentation](${siteConfig.url}/llms-full.txt).\n\n${docsLlmsLinks(docs, false)}`,
    {
      headers: discoveryHeaders("text/plain; charset=utf-8"),
    },
  );
}

export { discoveryOptions as OPTIONS } from "@/lib/agent-discovery/discoveryOptions";
