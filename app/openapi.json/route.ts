import { websiteOpenAPI } from '@/lib/agent-openapi';
export const dynamic = 'force-static';
export function GET() {
  return Response.json(websiteOpenAPI(), { headers: { 'Access-Control-Allow-Origin': '*', 'Link': '</agents>; rel="service-doc"' } });
}
