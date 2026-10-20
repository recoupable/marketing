import { markdownResponse } from "@/lib/agent-content/markdownResponse";
import { withAgentRateLimit } from "@/lib/agent-tools/withAgentRateLimit";
import { deprecationPolicyLink } from "@/lib/agent-api/deprecationPolicyLink";

export async function GET(request: Request) {
  const response = await withAgentRateLimit(request, () =>
    markdownResponse(request),
  );
  if (!response.headers.get("Link")?.includes(deprecationPolicyLink))
    response.headers.append("Link", deprecationPolicyLink);
  if (!response.headers.get("Access-Control-Expose-Headers")?.includes("Link"))
    response.headers.append("Access-Control-Expose-Headers", "Link");
  return response;
}
export { agentOptions as OPTIONS } from "@/lib/agent-http";
