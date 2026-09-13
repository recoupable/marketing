import { apiCatalogMediaType } from '@/lib/agent-discovery/apiCatalogMediaType';
import { discoveryHeaders } from '@/lib/agent-discovery/discoveryHeaders';
import { discoveryOptions } from '@/lib/agent-discovery/discoveryOptions';
import { getApiCatalog } from '@/lib/agent-discovery/getApiCatalog';

export const dynamic = 'force-static';
export function GET() {
  return new Response(JSON.stringify(getApiCatalog(), null, 2), { headers: discoveryHeaders(apiCatalogMediaType) });
}
export function HEAD() {
  return new Response(null, { headers: discoveryHeaders(apiCatalogMediaType) });
}
export const OPTIONS = discoveryOptions;
