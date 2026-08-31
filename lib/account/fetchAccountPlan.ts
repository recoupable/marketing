import { siteConfig } from "@/lib/config";
import type { PlanId } from "@/lib/pricing/entitlements";

const auth = (token: string) => ({ Authorization: `Bearer ${token}` });

/**
 * The signed-in visitor's plan: resolve the account behind the Privy bearer
 * (`GET /api/accounts/id`), then read `plan` from
 * `GET /api/accounts/{id}/credits` (app#2044 row 2). Falls back to `is_pro`
 * until the api ships the field. Null on any failure so the page keeps its
 * signed-out copy instead of guessing.
 */
export async function fetchAccountPlan(token: string): Promise<PlanId | null> {
  try {
    const idRes = await fetch(`${siteConfig.apiUrl}/accounts/id`, { headers: auth(token) });
    const id: { accountId?: string } | null = await idRes.json().catch(() => null);
    if (!idRes.ok || !id?.accountId) return null;

    const creditsRes = await fetch(`${siteConfig.apiUrl}/accounts/${id.accountId}/credits`, {
      headers: auth(token),
    });
    const credits: { plan?: PlanId; is_pro?: boolean } | null = await creditsRes
      .json()
      .catch(() => null);
    if (!creditsRes.ok || !credits) return null;

    return credits.plan ?? (credits.is_pro ? "pro" : "free");
  } catch {
    return null;
  }
}
