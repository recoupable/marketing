import { createHmac, timingSafeEqual } from "node:crypto";

export type AgentGrant = {
  purpose: "session" | "internal";
  principal: string;
  session?: string;
  path?: string;
  method?: string;
  expires: number;
};
function key() {
  const secret = process.env.WEBSITE_AGENT_SECRET;
  if (!secret || secret.length < 32)
    throw new Error("Website agent is not configured");
  return secret;
}
export function signGrant(grant: AgentGrant) {
  const body = Buffer.from(JSON.stringify(grant)).toString("base64url");
  return `${body}.${createHmac("sha256", key()).update(body).digest("base64url")}`;
}
export function readGrant(
  token: string | undefined,
  purpose: AgentGrant["purpose"],
): AgentGrant | null {
  if (!token || token.length > 4096) return null;
  try {
    const [body, signature, extra] = token.split(".");
    if (!body || !signature || extra) return null;
    const expected = createHmac("sha256", key()).update(body).digest();
    const actual = Buffer.from(signature, "base64url");
    if (actual.length !== expected.length || !timingSafeEqual(actual, expected))
      return null;
    const grant = JSON.parse(
      Buffer.from(body, "base64url").toString(),
    ) as AgentGrant;
    if (
      grant.purpose !== purpose ||
      typeof grant.principal !== "string" ||
      !Number.isFinite(grant.expires) ||
      grant.expires <= Date.now()
    )
      return null;
    return grant;
  } catch {
    return null;
  }
}
