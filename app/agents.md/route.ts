import { discoveryHeaders, discoveryOptions, getAgentsMarkdown } from '@/lib/agent-discovery';

export const dynamic = 'force-static';
export function GET() {
  return new Response(getAgentsMarkdown(), { headers: discoveryHeaders('text/markdown; charset=utf-8') });
}
export const OPTIONS = discoveryOptions;
