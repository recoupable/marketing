"use client";

import type { KeyboardEvent, RefObject } from "react";
import { ArrowUp } from "lucide-react";
import { ArtistChip } from "@/components/shared/ArtistChip";

type PickedArtist = { name: string; image?: string | null };

type ArtistSearchInputProps = {
  picked: PickedArtist | null;
  placeholder: string;
  disabled?: boolean;
  running?: boolean;
  progress?: string;
  query: string;
  inputRef: RefObject<HTMLInputElement>;
  onQueryChange: (value: string) => void;
  onKeyDown: (e: KeyboardEvent) => void;
  onFocus: () => void;
  onSubmit: () => void;
  onClear: () => void;
};

/** The island's input row: selected-artist chip + search input + send button. */
export function ArtistSearchInput(p: ArtistSearchInputProps) {
  return (
    <div className="flex w-full items-center gap-2 px-5 py-3">
      {p.picked && (
        <ArtistChip
          name={p.picked.name}
          image={p.picked.image}
          disabled={p.running}
          onRemove={p.onClear}
        />
      )}
      <input
        ref={p.inputRef}
        value={p.query}
        autoComplete="off"
        aria-label="Search for an artist"
        disabled={p.disabled || p.running}
        onChange={(e) => p.onQueryChange(e.target.value)}
        onKeyDown={p.onKeyDown}
        onFocus={p.onFocus}
        placeholder={
          p.running
            ? p.progress || "Measuring…"
            : p.picked
              ? "Search another artist…"
              : p.placeholder
        }
        className="w-full min-w-0 flex-1 bg-transparent font-ui text-[14px] text-(--foreground) outline-none placeholder:text-(--foreground)/30 disabled:opacity-60"
      />
      <button
        type="button"
        onClick={p.onSubmit}
        disabled={!p.picked || p.running}
        aria-label="Value my catalog"
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-(--foreground)/80 text-(--background) transition-all hover:bg-(--foreground) active:scale-95 disabled:opacity-20"
      >
        {p.running ? (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-(--background)/30 border-t-(--background)" />
        ) : (
          <ArrowUp size={15} />
        )}
      </button>
    </div>
  );
}
