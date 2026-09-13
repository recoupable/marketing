import { getAgentContentIndex } from '@/lib/agent-content/getAgentContentIndex';
import { discoveryHeaders } from '@/lib/agent-discovery/discoveryHeaders';
import { discoveryOptions } from '@/lib/agent-discovery/discoveryOptions';
import { getAgentCatalog } from '@/lib/agent-discovery/getAgentCatalog';

export const dynamic = 'force-static';
export function GET() {
  return Response.json(getAgentCatalog(getAgentContentIndex()), { headers: discoveryHeaders('application/json; charset=utf-8') });
}
export const OPTIONS = discoveryOptions;
