"use client";

import { useArtistSearchBox } from "@/hooks/useArtistSearchBox";
import { ArtistSearchInput } from "@/components/shared/ArtistSearchInput";
import { ArtistSearchResults } from "@/components/shared/ArtistSearchResults";
import { ArtistSuggestionPills } from "@/components/shared/ArtistSuggestionPills";
import type { SpotifyArtist } from "@/lib/spotify/types";

const DEFAULT_SUGGESTIONS = [
  "Audit releases",
  "Research report",
  "Similar artists",
  "Campaign plan",
];

type PickedArtist = { name: string; image?: string | null };

type ArtistSearchBoxProps = {
  picked: PickedArtist | null;
  onSelect: (artist: SpotifyArtist) => void;
  onClear: () => void;
  onSubmit: () => void;
  placeholder?: string;
  disabled?: boolean;
  running?: boolean;
  progress?: string;
  suggestions?: string[];
};

/**
 * The shared artist search island (home-hero design, recoupable/chat#1814):
 * pill + chip + integrated dropdown + send + suggestion pills. State lives in
 * useArtistSearchBox; each piece is its own component (SRP).
 */
export function ArtistSearchBox({
  picked,
  onSelect,
  onClear,
  onSubmit,
  placeholder = "Search any artist…",
  disabled,
  running,
  progress,
  suggestions = DEFAULT_SUGGESTIONS,
}: ArtistSearchBoxProps) {
  const box = useArtistSearchBox({
    hasPicked: Boolean(picked),
    running,
    onSelect,
    onClear,
    onSubmit,
  });
  const open = box.isExpanded || box.showSuggestions;

  return (
    <div ref={box.containerRef} className="w-full">
      <div
        className="w-full bg-(--background)"
        style={{
          borderRadius: open ? "16px" : "9999px",
          boxShadow: box.isExpanded
            ? "0px 0px 0px 1px var(--border), 0px 4px 20px rgba(0,0,0,0.10)"
            : "0px 0px 0px 1px var(--border), 0px 2px 12px rgba(0,0,0,0.06)",
          transition: "box-shadow 400ms ease, border-radius 300ms ease",
          overflow: "hidden",
        }}
      >
        <ArtistSearchInput
          picked={picked}
          placeholder={placeholder}
          disabled={disabled}
          running={running}
          progress={progress}
          query={box.query}
          inputRef={box.inputRef}
          onQueryChange={box.handleQueryChange}
          onKeyDown={box.handleKeyDown}
          onFocus={box.handleFocus}
          onSubmit={box.submit}
          onClear={box.clear}
        />
        <ArtistSearchResults
          results={box.results}
          loading={box.loading}
          selectedIdx={box.selectedIdx}
          expanded={box.isExpanded}
          onPick={box.pick}
        />
        <ArtistSuggestionPills
          suggestions={suggestions}
          show={box.showSuggestions}
          onSelect={box.submit}
        />
      </div>
    </div>
  );
}
