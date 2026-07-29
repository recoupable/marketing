"use client";

import { useCardOnFile } from "@/hooks/useCardOnFile";

/**
 * The free plan CTA. Opens a Stripe card-setup screen (sign-in gated via Privy
 * inside useCardOnFile) so the visitor can register a card for later credit
 * top-ups without being charged. Styled by the caller so it stays visually
 * identical to the anchor CTAs on the other plan cards.
 */
export function CardOnFileButton({
  label,
  className,
}: {
  label: string;
  className: string;
}) {
  const { startCardSetup, isPending, error } = useCardOnFile();

  return (
    <div>
      <button
        type="button"
        onClick={() => void startCardSetup()}
        disabled={isPending}
        className={`${className} disabled:opacity-70 disabled:cursor-wait`}
      >
        {isPending ? "Opening card setup..." : label}
      </button>
      <p className="mt-2 text-xs text-[var(--muted-foreground)] text-center">
        No charge today. Your card is saved for credit top-ups.
      </p>
      {error && (
        <p role="alert" className="mt-2 text-xs text-red-300 text-center">
          {error}. Click the button to retry.
        </p>
      )}
    </div>
  );
}
