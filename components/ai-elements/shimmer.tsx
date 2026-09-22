import type { ComponentProps } from "react";

export function Shimmer({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      className={["ai-shimmer", className].filter(Boolean).join(" ")}
      {...props}
    />
  );
}
