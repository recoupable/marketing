import { discoveryHeaders } from '@/lib/agent-discovery/discoveryHeaders';
import { discoveryOptions } from '@/lib/agent-discovery/discoveryOptions';
import { getAgentsMarkdown } from '@/lib/agent-discovery/getAgentsMarkdown';

export const dynamic = 'force-static';
export function GET() {
  return new Response(getAgentsMarkdown(), { headers: discoveryHeaders('text/markdown; charset=utf-8') });
}
export const OPTIONS = discoveryOptions;
