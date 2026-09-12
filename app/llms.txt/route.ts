import { getAgentContentIndex } from '@/lib/agent-content';
import { discoveryHeaders, discoveryOptions, getLlmsText } from '@/lib/agent-discovery';

export const dynamic = 'force-static';
export function GET() {
  return new Response(getLlmsText(getAgentContentIndex()), { headers: discoveryHeaders('text/plain; charset=utf-8') });
}
export const OPTIONS = discoveryOptions;
