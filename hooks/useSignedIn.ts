"use client";

import { usePrivy } from "@privy-io/react-auth";

/**
 * Whether the visitor has a resolved, authenticated Privy session.
 *
 * Only trust the auth state once Privy has resolved on the client. Until then
 * (and on the server) `ready` is false, so both first renders report signed
 * out — no hydration mismatch, then the UI swaps in place.
 *
 * Shared by every auth-dependent header surface so the guard is defined once.
 */
export function useSignedIn(): boolean {
  const { ready, authenticated } = usePrivy();
  return ready && authenticated;
}
