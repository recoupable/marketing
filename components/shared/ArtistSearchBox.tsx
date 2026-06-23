"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Search } from "lucide-react";
import { useSpotifyArtistSearch, type SpotifyArtist } from "@/components/shared/useSpotifyArtistSearch";

function formatFollowers(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return String(n);
}

type ArtistSearchBoxProps = {
  /** Fired when the user picks an artist from the dropdown. */
  onSelect: (artist: SpotifyArtist) => void;
  /** Fired whenever the query text changes — lets a parent clear a prior pick. */
  onQueryChange?: (query: string) => void;
  placeholder?: string;
  disabled?: boolean;
  autoFocus?: boolean;
};

/**
 * The shared artist search island: a rounded search input with a debounced,
 * cached autocomplete dropdown (avatar + genre + follower count). The home-page
 * design, extracted so the home page and the valuation page render the same
 * search UI (DRY, recoupable/chat#1814). Selection state lives with the parent
 * via `onSelect`; this component owns only the query + dropdown.
 */
export function ArtistSearchBox({
  onSelect,
  onQueryChange,
  placeholder = "Search any artist…",
  disabled,
  autoFocus,
}: ArtistSearchBoxProps) {
  const { query, setQuery, results, loading } = useSpotifyArtistSearch();
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setShowDropdown((results.length > 0 || loading) && query.length >= 1);
    setSelectedIdx(-1);
  }, [results, loading, query]);

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
    onQueryChange?.(value);
  }

  function pick(artist: SpotifyArtist) {
    setQuery(artist.name);
    setShowDropdown(false);
    onSelect(artist);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!showDropdown || results.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIdx(i => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIdx(i => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && selectedIdx >= 0 && results[selectedIdx]) {
      e.preventDefault();
      pick(results[selectedIdx]);
    } else if (e.key === "Escape") {
      setShowDropdown(false);
    }
  }

  return (
    <div ref={containerRef}>
      <div
        className="rounded-2xl p-1.5 transition-shadow"
        style={{ boxShadow: "0 0 0 1px color-mix(in srgb, var(--foreground) 15%, transparent)" }}
      >
        <input
          ref={inputRef}
          value={query}
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus={autoFocus}
          autoComplete="off"
          disabled={disabled}
          onChange={e => handleQueryChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (results.length > 0) setShowDropdown(true);
          }}
          placeholder={placeholder}
          className="w-full rounded-xl bg-transparent px-5 py-4 text-[17px] text-(--foreground) placeholder:text-(--foreground)/35 focus:outline-none disabled:opacity-40"
        />
      </div>

      {showDropdown && (
        <ul
          className="mt-3 max-h-[280px] overflow-y-auto overflow-x-hidden rounded-2xl"
          style={{ boxShadow: "0 0 0 1px color-mix(in srgb, var(--foreground) 12%, transparent)" }}
        >
          {loading && results.length === 0 && (
            <li className="flex items-center gap-2.5 px-5 py-3.5 text-[13px] text-(--foreground)/35">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-(--foreground)/10 border-t-(--foreground)/35" />
              Searching…
            </li>
          )}
          {results.map((artist, i) => (
            <li key={artist.id}>
              <button
                type="button"
                onClick={() => pick(artist)}
                className={`flex w-full items-center gap-3.5 px-5 py-3.5 text-left transition-colors duration-200 ${
                  i === selectedIdx ? "bg-(--foreground)/[0.06]" : "hover:bg-(--foreground)/[0.04]"
                }`}
              >
                {artist.image ? (
                  <Image
                    src={artist.image}
                    alt=""
                    width={44}
                    height={44}
                    className="h-11 w-11 shrink-0 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-(--foreground)/8">
                    <Search size={16} className="text-(--foreground)/30" />
                  </div>
                )}
                <span className="truncate font-semibold text-[15px] text-(--foreground)">{artist.name}</span>
                {artist.followers > 0 && (
                  <span className="ml-auto shrink-0 font-pixel text-[12px] uppercase tracking-[0.1em] text-(--foreground)/40">
                    {formatFollowers(artist.followers)} followers
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
