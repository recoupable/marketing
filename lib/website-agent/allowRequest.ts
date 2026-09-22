import { createHash } from "node:crypto";
const local = new Map<string, { count: number; expires: number }>();
/** Production requires a shared Redis budget, not per-function memory. */
export async function allowRequest(ip: string) {
  const window = Math.floor(Date.now() / 3600000);
  const key = `website-agent:${window}:${createHash("sha256").update(ip).digest("hex").slice(0, 24)}`;
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (url && token) {
    try {
      const response = await fetch(`${url}/multi-exec`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          ["INCR", key],
          ["EXPIRE", key, 3600],
          ["INCR", `website-agent:global:${window}`],
          ["EXPIRE", `website-agent:global:${window}`, 3600],
        ]),
        cache: "no-store",
      });
      if (!response.ok) return false;
      const result = (await response.json()) as {
        result?: number;
        error?: string;
      }[];
      return (
        !result.some((x) => x.error) &&
        Number(result[0]?.result) <= 40 &&
        Number(result[2]?.result) <= 1000
      );
    } catch {
      return false;
    }
  }
  if (process.env.NODE_ENV === "production") return false;
  for (const [k, value] of local)
    if (value.expires < Date.now()) local.delete(k);
  const entry = local.get(key) ?? { count: 0, expires: Date.now() + 3600000 };
  entry.count++;
  local.set(key, entry);
  return entry.count <= 100;
}
