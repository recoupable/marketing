import { getAgentContentIndex } from '@/lib/agent-content/getAgentContentIndex';
import { discoveryHeaders } from '@/lib/agent-discovery/discoveryHeaders';
import { discoveryOptions } from '@/lib/agent-discovery/discoveryOptions';
import { getLlmsText } from '@/lib/agent-discovery/getLlmsText';
import { docs } from '@/lib/docs';

export const dynamic = 'force-static';
export function GET() {
  return new Response(getLlmsText(getAgentContentIndex(), docs), { headers: discoveryHeaders('text/plain; charset=utf-8') });
}
export const OPTIONS = discoveryOptions;
