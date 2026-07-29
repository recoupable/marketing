"use client";

import { buildChatUrl } from "@/lib/buildChatUrl";
import { createCardOnFileSession } from "@/lib/checkout/createCardOnFileSession";
import { useGatedStripeRedirect } from "@/hooks/useGatedStripeRedirect";

export type CardOnFileState = {
  startCardSetup: () => Promise<void>;
  isPending: boolean;
  error: string;
};

/**
 * Drives the $0 card-on-file setup from the pricing page, behind the shared
 * Privy sign-in gate (useGatedStripeRedirect). Nothing is charged: the card is
 * saved so the credits auto-recharge path can top the account up later instead
 * of dead-ending it at zero.
 */
export function useCardOnFile(): CardOnFileState {
  const { start, isPending, error } = useGatedStripeRedirect((token) =>
    createCardOnFileSession(
      buildChatUrl({ checkout: "card-saved", campaign: "free" }),
      token,
    ),
  );

  return { startCardSetup: start, isPending, error };
}
