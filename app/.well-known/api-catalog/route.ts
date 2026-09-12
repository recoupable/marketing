import { apiCatalogMediaType, discoveryHeaders, discoveryOptions, getApiCatalog } from '@/lib/agent-discovery';

export const dynamic = 'force-static';
export function GET() {
  return new Response(JSON.stringify(getApiCatalog(), null, 2), { headers: discoveryHeaders(apiCatalogMediaType) });
}
export function HEAD() {
  return new Response(null, { headers: discoveryHeaders(apiCatalogMediaType) });
}
export const OPTIONS = discoveryOptions;
