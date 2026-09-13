/** Joins the site api base (which ends in /api) with a spec path (which starts with /api) without doubling the segment. */
export function joinApiUrl(base: string, path: string): string {
  const root = base.replace(/\/+$/, "");
  const route = root.endsWith("/api") && /^\/api(\/|$)/.test(path) ? path.slice(4) : path;
  return root + route;
}
