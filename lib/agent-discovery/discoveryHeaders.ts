import { absoluteUrl } from "../seo.ts";
import { discoveryPaths } from "./discoveryPaths.ts";

export function discoveryHeaders(contentType: string) {
  return {
    "Content-Type": contentType,
    "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
    "Access-Control-Expose-Headers": "Link",
    "X-Content-Type-Options": "nosniff",
    Link: `<${absoluteUrl(discoveryPaths.apiCatalog)}>; rel="api-catalog"; type="application/linkset+json", <${absoluteUrl(discoveryPaths.ard)}>; rel="ard"; type="application/json", <${absoluteUrl(discoveryPaths.openapi)}>; rel="service-desc"; type="application/json"`,
  };
}
