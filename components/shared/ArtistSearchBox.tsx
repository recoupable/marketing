"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUp, Search } from "lucide-react";
import { useSpotifyArtistSearch, type SpotifyArtist } from "@/components/shared/useSpotifyArtistSearch";

const DEFAULT_SUGGESTIONS = ["Audit releases", "Research report", "Similar artists", "Campaign plan"];

function formatFollowers(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return String(n);
}

type PickedArtist = { name: string; image?: string | null };

type ArtistSearchBoxProps = {
  /** The currently selected artist, shown as a chip inside the island. */
  picked: PickedArtist | null;
  /** Fired when the user picks an artist from the dropdown. */
  onSelect: (artist: SpotifyArtist) => void;
  /** Fired when the user clears the selected-artist chip. */
  onClear: () => void;
  /** Fired by the send arrow / Enter / a suggestion pill when an artist is selected. */
  onSubmit: () => void;
  placeholder?: string;
  disabled?: boolean;
  /** Whether a submit is in flight — disables input and shows progress text. */
  running?: boolean;
  /** Progress text shown in place of the placeholder while running. */
  progress?: string;
  /** Suggestion pills shown under the island once an artist is selected. */
  suggestions?: string[];
};

/**
 * The shared artist search island — a faithful port of the home hero's design
 * (recoupable/chat#1814): a pill-shaped container with a selected-artist chip,
 * an integrated in-island autocomplete dropdown, a send button, and suggestion
 * pills. The home page and the valuation page render the same island; the
 * `onSubmit` action differs per page.
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
  const { query, setQuery, results, loading } = useSpotifyArtistSearch();
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Reset the keyboard highlight whenever the result set changes. Dropdown
  // visibility is intent-driven (typing/focus), not results-driven, so picking
  // an artist doesn't re-open the dropdown.
  useEffect(() => {
    setSelectedIdx(-1);
  }, [results]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleQueryChange(value: string) {
    setQuery(value);
    setShowDropdown(true);
    if (picked) onClear();
  }

  function pick(artist: SpotifyArtist) {
    setQuery("");
    setShowDropdown(false);
    onSelect(artist);
  }

  function submit() {
    if (!picked || running) return;
    setShowDropdown(false);
    onSubmit();
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (showDropdown && results.length > 0) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIdx(i => Math.min(i + 1, results.length - 1));
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIdx(i => Math.max(i - 1, 0));
        return;
      }
      if (e.key === "Enter" && selectedIdx >= 0 && results[selectedIdx]) {
        e.preventDefault();
        pick(results[selectedIdx]);
        return;
      }
      if (e.key === "Escape") {
        setShowDropdown(false);
        return;
      }
    }
    if (e.key === "Backspace" && query === "" && picked) {
      e.preventDefault();
      onClear();
      return;
    }
    if (e.key === "Enter" && picked && !showDropdown) {
      e.preventDefault();
      submit();
    }
  }

  const isExpanded = showDropdown && query.length >= 1 && (results.length > 0 || loading);
  const showSuggestions = Boolean(picked) && !query && !showDropdown && !running && suggestions.length > 0;

  return (
    <div ref={containerRef} className="w-full">
      <div
        className="w-full bg-(--background)"
        style={{
          borderRadius: isExpanded || showSuggestions ? "16px" : "9999px",
          boxShadow: isExpanded
            ? "0px 0px 0px 1px var(--border), 0px 4px 20px rgba(0,0,0,0.10)"
            : "0px 0px 0px 1px var(--border), 0px 2px 12px rgba(0,0,0,0.06)",
          transition: "box-shadow 400ms ease, border-radius 300ms ease",
          overflow: "hidden",
        }}
      >
        {/* Input row */}
        <div className="flex w-full items-center gap-2 px-5 py-3">
          {picked && (
            <div className="flex shrink-0 items-center gap-1.5 rounded-full bg-(--foreground)/8 py-1 pl-1 pr-1">
              {picked.image ? (
                <Image
                  src={picked.image}
                  alt={picked.name}
                  width={20}
                  height={20}
                  className="h-5 w-5 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-(--muted)">
                  <span className="text-[8px] text-(--foreground)/30">♪</span>
                </div>
              )}
              <span className="pr-1 text-[13px] font-medium text-(--foreground)">{picked.name}</span>
              <button
                type="button"
                onClick={() => {
                  onClear();
                  inputRef.current?.focus();
                }}
                aria-label={`Remove ${picked.name}`}
                className="flex h-4 w-4 items-center justify-center rounded-full text-(--foreground)/30 transition-colors hover:bg-(--foreground)/8 hover:text-(--foreground)/70"
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
          )}
          <input
            ref={inputRef}
            value={query}
            autoComplete="off"
            disabled={disabled || running}
            onChange={e => handleQueryChange(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              if (results.length > 0) setShowDropdown(true);
            }}
            placeholder={running ? progress || "Measuring…" : picked ? "Search another artist…" : placeholder}
            className="w-full min-w-0 flex-1 bg-transparent font-ui text-[14px] text-(--foreground) outline-none placeholder:text-(--foreground)/30 disabled:opacity-60"
          />
          <button
            type="button"
            onClick={submit}
            disabled={!picked || running}
            aria-label="Value my catalog"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-(--foreground)/80 text-(--background) transition-all hover:bg-(--foreground) active:scale-95 disabled:opacity-20"
          >
            {running ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-(--background)/30 border-t-(--background)" />
            ) : (
              <ArrowUp size={15} />
            )}
          </button>
        </div>

        {/* Integrated autocomplete dropdown */}
        <div
          className="grid"
          style={{
            gridTemplateRows: isExpanded ? "1fr" : "0fr",
            transition: "grid-template-rows 300ms cubic-bezier(0.25, 1, 0.5, 1)",
          }}
        >
          <div className="min-h-0 overflow-hidden">
            <div className="mx-4 h-px" style={{ background: "var(--border)" }} />
            <div className="max-h-[232px] overflow-y-auto py-1">
              {loading && results.length === 0 && (
                <div className="flex items-center gap-2.5 px-5 py-3 text-[13px] text-(--foreground)/30">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-(--foreground)/10 border-t-(--foreground)/30" />
                  Searching…
                </div>
              )}
              {results.map((artist, i) => (
                <button
                  key={artist.id}
                  type="button"
                  onClick={() => pick(artist)}
                  className={`flex w-full items-center gap-3 px-5 py-2.5 text-left transition-colors ${
                    i === selectedIdx ? "bg-(--muted)" : "hover:bg-(--muted)/60"
                  }`}
                >
                  {artist.image ? (
                    <Image
                      src={artist.image}
                      alt=""
                      width={36}
                      height={36}
                      className="h-9 w-9 shrink-0 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-(--muted)">
                      <Search size={14} className="text-(--foreground)/30" />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] font-medium text-(--foreground)">{artist.name}</p>
                    <p className="truncate text-[11px] text-(--foreground)/40">
                      {artist.genre && <span className="capitalize">{artist.genre}</span>}
                      {artist.genre && artist.followers > 0 && " · "}
                      {artist.followers > 0 && `${formatFollowers(artist.followers)} followers`}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Suggestion pills — shown once an artist is selected */}
        <div
          className="grid"
          style={{
            gridTemplateRows: showSuggestions ? "1fr" : "0fr",
            transition: "grid-template-rows 250ms cubic-bezier(0.25, 1, 0.5, 1)",
          }}
        >
          <div className="min-h-0 overflow-hidden">
            <div className="flex items-center justify-center gap-1 px-4 pb-3 pt-1 font-ui text-[11px] text-(--foreground)/30">
              {suggestions.map((s, i) => (
                <span key={s}>
                  {i > 0 && <span className="mx-0.5 text-(--foreground)/15">·</span>}
                  <button type="button" onClick={submit} className="transition-colors hover:text-(--foreground)/60">
                    {s}
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
