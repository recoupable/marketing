"use client";

import { useProCheckout } from "@/hooks/useProCheckout";

/**
 * The Pro plan CTA. Starts Stripe checkout directly from the pricing page
 * (sign-in gated via Privy inside useProCheckout) instead of deep-linking into
 * the chat app. Styled by the caller so it stays visually identical to the
 * anchor CTAs on the other plan cards.
 */
export function ProCheckoutButton({
  label,
  className,
}: {
  label: string;
  className: string;
}) {
  const { startCheckout, isPending, error } = useProCheckout();

  return (
    <div>
      <button
        type="button"
        onClick={() => void startCheckout()}
        disabled={isPending}
        className={`${className} disabled:opacity-70 disabled:cursor-wait`}
      >
        {isPending ? "Starting checkout..." : label}
      </button>
      {error && (
        <p role="alert" className="mt-2 text-xs text-red-300 text-center">
          {error}. Click the button to retry.
        </p>
      )}
    </div>
  );
}
