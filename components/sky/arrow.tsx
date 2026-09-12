type ArrowDirection = "up-right" | "right" | "left" | "down" | "down-right";

const paths: Record<ArrowDirection, string> = {
  "up-right": "M7 17 17 7M7 7h10v10",
  right: "M5 12h14m-6-6 6 6-6 6",
  left: "M19 12H5m6-6-6 6 6 6",
  down: "M12 5v14m-6-6 6 6 6-6",
  "down-right": "M7 7 17 17M7 17h10V7",
};

export function SkyArrow({ direction = "up-right" }: { direction?: ArrowDirection }) {
  return (
    <svg className="sky-arrow-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d={paths[direction]} />
    </svg>
  );
}
