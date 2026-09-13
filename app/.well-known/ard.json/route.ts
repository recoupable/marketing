import { discoveryHeaders } from '@/lib/agent-discovery/discoveryHeaders';
import { discoveryOptions } from '@/lib/agent-discovery/discoveryOptions';
import { getArdManifest } from '@/lib/agent-discovery/getArdManifest';

export const dynamic = 'force-static';
export function GET() {
  return Response.json(getArdManifest(), { headers: discoveryHeaders('application/json; charset=utf-8') });
}
export const OPTIONS = discoveryOptions;
