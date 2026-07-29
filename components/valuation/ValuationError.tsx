"use client";

type ValuationErrorProps = {
  message: string;
  onRetry: () => void;
};

/**
 * Readable error state for a failed valuation run (chat#1902 M5): the friendly
 * message from runValuation plus a retry button that re-fires the same run.
 */
export function ValuationError({ message, onRetry }: ValuationErrorProps) {
  return (
    <div
      role="alert"
      className="mt-4 flex flex-col items-center gap-3 rounded-2xl px-5 py-4 text-center"
      style={{
        boxShadow:
          "0 0 0 1px color-mix(in srgb, var(--foreground) 12%, transparent)",
      }}
    >
      <p className="text-[13px] leading-relaxed text-red-500/90">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="rounded-full bg-(--foreground)/80 px-4 py-1.5 font-ui text-[13px] text-(--background) transition-colors duration-200 hover:bg-(--foreground) active:scale-95"
      >
        Try again
      </button>
    </div>
  );
}
