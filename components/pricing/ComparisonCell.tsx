import { Check } from "lucide-react";

/**
 * One comparison cell — same vocabulary as the app `/plan` table
 * (`PlanTableCell`: literal text, check mark, or quiet dash).
 */
export function ComparisonCell({ value }: { value: string }) {
  if (value === "check") {
    return <Check className="mx-auto size-4" aria-label="Included" />;
  }
  if (value === "dash") {
    return (
      <span className="text-[var(--muted-foreground)]/60" aria-label="Not included">
        &ndash;
      </span>
    );
  }
  return <>{value}</>;
}
