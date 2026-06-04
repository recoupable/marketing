import type { ReactNode } from "react";

export function FilterTab({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`font-ui rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
        active
          ? "bg-(--foreground) text-(--background)"
          : "text-(--muted-foreground) hover:text-(--foreground)"
      }`}
      style={active ? undefined : { boxShadow: "0 0 0 1px var(--border)" }}
    >
      {children}
    </button>
  );
}
