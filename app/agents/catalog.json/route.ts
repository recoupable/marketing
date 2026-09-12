import { getAgentContentIndex } from '@/lib/agent-content';
import { discoveryHeaders, discoveryOptions, getAgentCatalog } from '@/lib/agent-discovery';

export const dynamic = 'force-static';
export function GET() {
  return Response.json(getAgentCatalog(getAgentContentIndex()), { headers: discoveryHeaders('application/json; charset=utf-8') });
}
export const OPTIONS = discoveryOptions;
