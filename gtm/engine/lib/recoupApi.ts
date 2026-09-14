import { getConfig, requireEnv } from "./config.js";

interface PrivyUser {
  id: string;
  created_at: number;
  has_accepted_terms: boolean;
  is_guest: boolean;
  linked_accounts: LinkedAccount[];
  mfa_methods: unknown[];
  [key: string]: unknown;
}

interface LinkedAccount {
  type: string;
  address?: string;
  latest_verified_at?: number;
  [key: string]: unknown;
}

interface PrivyLoginsResponse {
  status: string;
  total: number;
  total_new: number;
  total_active: number;
  logins: PrivyUser[];
}

/**
 * Fetches all Privy users via the admin endpoint.
 * Requires an admin Bearer token.
 */
export async function fetchAllPrivyUsers(): Promise<PrivyLoginsResponse> {
  const token = requireEnv("recoupAdminToken");

  const response = await fetch(
    `${getConfig().recoupApiUrl}/admins/privy?period=all`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );

  if (!response.ok) {
    throw new Error(`Admin API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Extracts the primary email address from a Privy user's linked accounts.
 */
export function extractEmail(user: PrivyUser): string | null {
  const emailAccount = user.linked_accounts.find(
    (a) => a.type === "email" && a.address,
  );
  return emailAccount?.address ?? null;
}

/**
 * Gets the latest verified timestamp across all linked accounts.
 */
export function getLastActive(user: PrivyUser): Date | null {
  let latest = 0;
  for (const account of user.linked_accounts) {
    const verified = account.latest_verified_at;
    if (typeof verified === "number" && verified > latest) {
      latest = verified;
    }
  }
  if (latest === 0) return null;

  // Privy timestamps can be seconds or ms — normalize
  const ms = latest < 1e12 ? latest * 1000 : latest;
  return new Date(ms);
}

export type { PrivyUser, LinkedAccount, PrivyLoginsResponse };
