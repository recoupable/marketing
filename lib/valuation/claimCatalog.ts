import { siteConfig } from "@/lib/config";

/**
 * Materializes the just-measured valuation run into an account-owned catalog by
 * calling `POST /api/catalogs { from: { snapshot_id } }` under the signed-in
 * user's Privy bearer. The owning account is derived from the bearer server-side
 * (never the body), and re-claiming the same snapshot is idempotent — so a
 * second click returns the same catalog rather than creating a duplicate.
 *
 * @param params.snapshotId - The playcount snapshot id from this run.
 * @param params.token - The Privy access token (bearer).
 * @param params.name - Optional catalog name (e.g. the artist's name).
 * @returns The created (or existing) catalog id.
 */
export async function claimCatalog(params: {
  snapshotId: string;
  token: string;
  name?: string;
}): Promise<string> {
  const res = await fetch(`${siteConfig.apiUrl}/catalogs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${params.token}`,
    },
    body: JSON.stringify({
      ...(params.name ? { name: params.name } : {}),
      from: { snapshot_id: params.snapshotId },
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error ?? `couldn't create your catalog (${res.status})`);
  }

  const data = await res.json().catch(() => null);
  const catalogId: string | undefined = data?.catalog?.id;
  if (!catalogId) {
    throw new Error("catalog created but no id was returned");
  }
  return catalogId;
}
