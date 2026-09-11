import { discoveryHeaders, discoveryOptions, getArdManifest } from '@/lib/agent-discovery';

export const dynamic = 'force-static';
export function GET() {
  return Response.json(getArdManifest(), { headers: discoveryHeaders('application/json; charset=utf-8') });
}
export const OPTIONS = discoveryOptions;
