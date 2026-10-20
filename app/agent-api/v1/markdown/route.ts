import { markdownResponse } from "@/lib/agent-content/markdownResponse";
import { withAgentRateLimit } from "@/lib/agent-tools/withAgentRateLimit";

export function GET(request: Request) {
  return withAgentRateLimit(request, () => markdownResponse(request));
}
export { agentOptions as OPTIONS } from "@/lib/agent-http";
