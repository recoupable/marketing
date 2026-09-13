import { getAgentContentIndex } from '@/lib/agent-content/getAgentContentIndex';
import { readAgentContent } from '@/lib/agent-content/readAgentContent';
import { discoveryHeaders } from '@/lib/agent-discovery/discoveryHeaders';
import { discoveryOptions } from '@/lib/agent-discovery/discoveryOptions';
import { getLlmsFullText } from '@/lib/agent-discovery/getLlmsFullText';

export const dynamic = 'force-static';
export async function GET() {
  const index = getAgentContentIndex();
  const summaries = await Promise.all(index.filter(item => item.type === 'page').map(async item => [item.id, (await readAgentContent({ id: item.id, maxLength: 12000 })).markdown]));
  return new Response(getLlmsFullText(index, Object.fromEntries(summaries)), { headers: discoveryHeaders('text/plain; charset=utf-8') });
}
export const OPTIONS = discoveryOptions;
