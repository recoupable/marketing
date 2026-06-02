"use client";

import { useState, type ReactNode } from "react";
import { ContentCard } from "./ContentCard";
import {
  CONTENT_CATEGORY_ORDER,
  CONTENT_CATEGORY_TAB_LABELS,
  type ContentCategory,
  type ContentEntry,
} from "@/lib/content-types";

type Filter = ContentCategory | "all";

/** Narrow an unknown query value to a ContentCategory. */
function isCategory(value: string | undefined): value is ContentCategory {
  return (
    value === "essay" ||
    value === "guide" ||
    value === "tutorial" ||
    value === "update"
  );
}

/**
 * Interactive index for the unified /blog hub. Renders filter tabs (only for
 * categories that actually have entries) plus a responsive grid. The initial
 * filter can be deep-linked via ?type= (e.g. the nav "Research" link →
 * ?type=essay), then the reader can switch tabs client-side.
 */
export function ContentList({
  entries,
  initialType,
}: {
  entries: ContentEntry[];
  initialType?: string;
}) {
  // Only show tabs for categories that have at least one entry.
  const available = CONTENT_CATEGORY_ORDER.filter((category) =>
    entries.some((entry) => entry.category === category),
  );

  const initial: Filter =
    isCategory(initialType) && available.includes(initialType)
      ? initialType
      : "all";

  const [filter, setFilter] = useState<Filter>(initial);

  const visible =
    filter === "all"
      ? entries
      : entries.filter((entry) => entry.category === filter);

  return (
    <>
      <div className="mb-8 flex flex-wrap gap-2">
        <FilterTab active={filter === "all"} onClick={() => setFilter("all")}>
          All
        </FilterTab>
        {available.map((category) => (
          <FilterTab
            key={category}
            active={filter === category}
            onClick={() => setFilter(category)}
          >
            {CONTENT_CATEGORY_TAB_LABELS[category]}
          </FilterTab>
        ))}
      </div>

      {visible.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {visible.map((entry) => (
            <ContentCard key={entry.slug} entry={entry} />
          ))}
        </div>
      ) : (
        <p className="text-(--muted-foreground)">Nothing here yet.</p>
      )}
    </>
  );
}

function FilterTab({
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
