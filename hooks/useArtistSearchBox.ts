"use client";

import { useEffect, useRef, useState } from "react";
import { useSpotifyArtistSearch } from "@/hooks/useSpotifyArtistSearch";
import { useClickOutside } from "@/hooks/useClickOutside";
import { createSearchKeyDown } from "@/lib/spotify/searchKeyDown";
import type { SpotifyArtist } from "@/lib/spotify/types";

type UseArtistSearchBoxParams = {
  /** Whether an artist is currently selected (drives the derived states). */
  hasPicked: boolean;
  running?: boolean;
  onSelect: (artist: SpotifyArtist) => void;
  onClear: () => void;
  onSubmit: () => void;
};

/**
 * State + handlers for the shared ArtistSearchBox (recoupable/chat#1814).
 * Dropdown visibility is intent-driven (typing/focus), never results-driven.
 */
export function useArtistSearchBox({
  hasPicked,
  running,
  onSelect,
  onClear,
  onSubmit,
}: UseArtistSearchBoxParams) {
  const { query, setQuery, results, loading } = useSpotifyArtistSearch();
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => setSelectedIdx(-1), [results]);
  useClickOutside(containerRef, () => setShowDropdown(false));

  function handleQueryChange(value: string) {
    setQuery(value);
    setShowDropdown(true);
    if (hasPicked) onClear();
  }

  function pick(artist: SpotifyArtist) {
    setQuery("");
    setShowDropdown(false);
    onSelect(artist);
  }

  function clear() {
    if (running) return;
    onClear();
    inputRef.current?.focus();
  }

  function submit() {
    if (!hasPicked || running) return;
    setShowDropdown(false);
    onSubmit();
  }

  function handleFocus() {
    if (results.length > 0) setShowDropdown(true);
  }

  const handleKeyDown = createSearchKeyDown({
    query,
    results,
    selectedIdx,
    showDropdown,
    hasPicked: hasPicked && !running,
    setSelectedIdx,
    setShowDropdown,
    pick,
    clear,
    submit,
  });

  const isExpanded =
    showDropdown && query.length >= 1 && (results.length > 0 || loading);
  const showSuggestions = hasPicked && !query && !showDropdown && !running;

  return {
    query,
    results,
    loading,
    selectedIdx,
    isExpanded,
    showSuggestions,
    containerRef,
    inputRef,
    handleQueryChange,
    handleKeyDown,
    handleFocus,
    pick,
    clear,
    submit,
  };
}
