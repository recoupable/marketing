import { cn } from "@/lib/utils";

export interface FigureLabelProps {
  /** Section figure id, e.g. "0.1", "0.2" */
  number: string;
  className?: string;
}

/**
 * Linear-style figure callout — parent controls layout (`relative` + offsets vs flow).
 */
export function FigureLabel({ number, className }: FigureLabelProps) {
  return (
    <span
      className={cn(
        "inline-block font-mono text-[10px] font-normal uppercase tracking-widest text-(--muted-foreground) opacity-50",
        className,
      )}
    >
      FIG {number}
    </span>
  );
}
