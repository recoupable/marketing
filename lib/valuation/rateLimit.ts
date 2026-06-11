const WINDOW_MS = 60 * 60 * 1000;
const MAX_RUNS_PER_WINDOW = 3;

const runsByIp = new Map<string, number[]>();

/**
 * Best-effort per-IP limiter for the valuation entry route (3 runs/hour).
 * In-memory, so per serverless instance — a determined abuser can exceed it
 * across instances; the real spend backstop is the api-side per-org snapshot
 * cap. Good enough for a campaign page.
 *
 * @param ip - Caller IP
 * @returns true when the run is allowed
 */
export function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const recent = (runsByIp.get(ip) ?? []).filter(t => now - t < WINDOW_MS);
  if (recent.length >= MAX_RUNS_PER_WINDOW) {
    runsByIp.set(ip, recent);
    return false;
  }
  recent.push(now);
  runsByIp.set(ip, recent);
  return true;
}
