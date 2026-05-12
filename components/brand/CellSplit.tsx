/**
 * The cell-split motif — two rounded squares pulling apart like a dividing cell.
 * Mirrors the Recoup logo shape at different scales and animation states.
 */

const SIZES = {
  xs: { cell: 8, radius: 2 },
  sm: { cell: 16, radius: 4 },
  md: { cell: 32, radius: 8 },
  lg: { cell: 56, radius: 14 },
  xl: { cell: 80, radius: 20 },
} as const;

type Props = {
  size?: keyof typeof SIZES;
  animate?: "split" | "breathe" | "none";
  gap?: number;
  className?: string;
  inverted?: boolean;
};

export function CellSplit({
  size = "md",
  animate = "none",
  gap = 0.3,
  className = "",
  inverted = false,
}: Props) {
  const { cell, radius } = SIZES[size];
  const offset = cell * gap;
  const bg = inverted ? "var(--background)" : "var(--foreground)";

  const animClass =
    animate === "split"
      ? { left: "cell-split-left", right: "cell-split-right" }
      : animate === "breathe"
        ? { left: "cell-breathe", right: "cell-breathe" }
        : { left: "", right: "" };

  return (
    <div
      className={`relative inline-flex shrink-0 ${className}`}
      style={{
        width: cell * 2 + offset,
        height: cell * 2 + offset,
      }}
      aria-hidden="true"
    >
      {/* Top-right cell */}
      <div
        className={animClass.right}
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: cell,
          height: cell,
          borderRadius: radius,
          backgroundColor: bg,
        }}
      />
      {/* Bottom-left cell */}
      <div
        className={animClass.left}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: cell,
          height: cell,
          borderRadius: radius,
          backgroundColor: bg,
        }}
      />
    </div>
  );
}
