import type { Dispatch, KeyboardEvent, SetStateAction } from "react";
import type { SpotifyArtist } from "@/lib/spotify/types";

type SearchKeyContext = {
  query: string;
  results: SpotifyArtist[];
  selectedIdx: number;
  showDropdown: boolean;
  hasPicked: boolean;
  setSelectedIdx: Dispatch<SetStateAction<number>>;
  setShowDropdown: (v: boolean) => void;
  pick: (artist: SpotifyArtist) => void;
  clear: () => void;
  submit: () => void;
};

/**
 * Keyboard handler for the artist search island: arrow-key navigation + Enter to
 * pick within an open dropdown, Backspace to clear the chip, Enter to submit.
 */
export function createSearchKeyDown(ctx: SearchKeyContext) {
  return (e: KeyboardEvent) => {
    const nav = ctx.showDropdown && ctx.results.length > 0;
    if (nav && e.key === "ArrowDown") {
      e.preventDefault();
      ctx.setSelectedIdx((i) => Math.min(i + 1, ctx.results.length - 1));
    } else if (nav && e.key === "ArrowUp") {
      e.preventDefault();
      ctx.setSelectedIdx((i) => Math.max(i - 1, 0));
    } else if (nav && e.key === "Enter" && ctx.results[ctx.selectedIdx]) {
      e.preventDefault();
      ctx.pick(ctx.results[ctx.selectedIdx]);
    } else if (nav && e.key === "Escape") {
      ctx.setShowDropdown(false);
    } else if (e.key === "Backspace" && ctx.query === "" && ctx.hasPicked) {
      e.preventDefault();
      ctx.clear();
    } else if (e.key === "Enter" && ctx.hasPicked && !ctx.showDropdown) {
      e.preventDefault();
      ctx.submit();
    }
  };
}
