/**
 * Tells a visitor their details were not saved, without taking away the result
 * they came for.
 *
 * Rendering a result and persisting a lead are independent concerns — the audit
 * and the ROI calculator previously traded the second for the first and dropped
 * the lead in silence (recoupable/chat#1800).
 */
export function CaptureErrorNotice({ message }: { message: string }) {
  return (
    <div
      role="alert"
      className="rounded-xl border border-amber-500/40 bg-amber-500/10 p-4 mb-6 text-left"
    >
      <p className="text-sm font-medium mb-1">We could not save your details</p>
      <p className="text-sm text-[var(--muted-foreground)]">
        {message} Your results below are still accurate — please email{" "}
        <a href="mailto:agent@recoupable.dev" className="underline">
          agent@recoupable.dev
        </a>{" "}
        so we can follow up.
      </p>
    </div>
  );
}
