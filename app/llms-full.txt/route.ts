import { getAgentContentIndex, readAgentContent } from '@/lib/agent-content';
import { discoveryHeaders, discoveryOptions, getLlmsFullText } from '@/lib/agent-discovery';

export const dynamic = 'force-static';
export async function GET() {
  const index = getAgentContentIndex();
  const summaries = await Promise.all(index.filter(item => item.type === 'page').map(async item => [item.id, (await readAgentContent({ id: item.id, maxLength: 12000 })).markdown]));
  return new Response(getLlmsFullText(index, Object.fromEntries(summaries)), { headers: discoveryHeaders('text/plain; charset=utf-8') });
}
export const OPTIONS = discoveryOptions;
