import type { PrivyUser } from "./recoupApi.js";
import { extractEmail, getLastActive } from "./recoupApi.js";

export type Segment = "new" | "active" | "dormant" | "churned";

export interface SegmentedContact {
  privy_id: string;
  email: string | null;
  signup_date: string;
  last_active: string | null;
  days_since_active: number | null;
  login_method: string;
  accepted_terms: boolean;
  is_guest: boolean;
  segment: Segment;
}

const DAY_MS = 24 * 60 * 60 * 1000;

/**
 * Segments a user based on signup recency and activity.
 *
 * - new:      signed up in the last 7 days
 * - active:   last active within 30 days
 * - dormant:  last active 30-90 days ago
 * - churned:  last active 90+ days ago (or never)
 */
function classifySegment(signupDate: Date, lastActive: Date | null): Segment {
  const now = Date.now();
  const daysSinceSignup = (now - signupDate.getTime()) / DAY_MS;

  if (daysSinceSignup <= 7) return "new";

  if (!lastActive) return "churned";

  const daysSinceActive = (now - lastActive.getTime()) / DAY_MS;

  if (daysSinceActive <= 30) return "active";
  if (daysSinceActive <= 90) return "dormant";
  return "churned";
}

/**
 * Determines the primary login method from linked accounts.
 */
function getPrimaryLoginMethod(user: PrivyUser): string {
  const types = user.linked_accounts.map((a) => a.type);

  if (types.includes("google_oauth")) return "google";
  if (types.includes("apple_oauth")) return "apple";
  if (types.includes("twitter_oauth")) return "twitter";
  if (types.includes("discord_oauth")) return "discord";
  if (types.includes("email")) return "email";
  if (types.includes("phone")) return "phone";
  if (types.includes("wallet")) return "wallet";
  return types[0] || "unknown";
}

/**
 * Transforms a raw Privy user into a segmented contact
 * with fields ready for CSV export or CRM sync.
 */
export function segmentUser(user: PrivyUser): SegmentedContact {
  const signupMs = user.created_at < 1e12 ? user.created_at * 1000 : user.created_at;
  const signupDate = new Date(signupMs);
  const lastActive = getLastActive(user);

  const daysSinceActive = lastActive
    ? Math.round((Date.now() - lastActive.getTime()) / DAY_MS)
    : null;

  return {
    privy_id: user.id,
    email: extractEmail(user),
    signup_date: signupDate.toISOString().split("T")[0],
    last_active: lastActive ? lastActive.toISOString().split("T")[0] : null,
    days_since_active: daysSinceActive,
    login_method: getPrimaryLoginMethod(user),
    accepted_terms: user.has_accepted_terms,
    is_guest: user.is_guest,
    segment: classifySegment(signupDate, lastActive),
  };
}

/**
 * Converts an array of segmented contacts to CSV format.
 */
export function contactsToCsv(contacts: SegmentedContact[]): string {
  const headers = [
    "privy_id",
    "email",
    "signup_date",
    "last_active",
    "days_since_active",
    "login_method",
    "accepted_terms",
    "is_guest",
    "segment",
  ];

  const rows = contacts.map((c) =>
    headers.map((h) => {
      const val = c[h as keyof SegmentedContact];
      if (val === null || val === undefined) return "";
      return String(val);
    }).join(","),
  );

  return [headers.join(","), ...rows].join("\n");
}
