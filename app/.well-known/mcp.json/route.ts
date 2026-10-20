import { discoveryHeaders } from "@/lib/agent-discovery/discoveryHeaders";
import { getMcpManifest } from "@/lib/agent-discovery/getMcpManifest";

export const dynamic = "force-static";

export function GET() {
  return Response.json(getMcpManifest(), { headers: discoveryHeaders("application/json") });
}

export { discoveryOptions as OPTIONS } from "@/lib/agent-discovery/discoveryOptions";
