import { createHash } from "node:crypto";

const requests = new Map<string, { count: number; expires: number }>();
// Per-instance backstop. Configure a shared edge rate limit before enabling paid AI in production.
export function allowPlanRequest(request: Request): boolean {
  const now = Date.now();
  for (const [key, value] of requests)
    if (value.expires <= now) requests.delete(key);
  const key = createHash("sha256")
    .update(request.headers.get("x-vercel-forwarded-for") || "local")
    .digest("hex");
  const current = requests.get(key);
  if (current && current.count >= 12) return false;
  if (!current && requests.size >= 1000) return false;
  requests.set(key, {
    count: (current?.count || 0) + 1,
    expires: current?.expires || now + 3600000,
  });
  return true;
}
