import { searchCache } from "@/lib/spotify/searchCache";

const LETTERS = "abcdefghijklmnopqrstuvwxyz".split("");

/**
 * Warm the search cache with single-letter results (once) so the autocomplete
 * dropdown has something to show on the first keystroke. Best-effort.
 */
export function prefetchLetters(): void {
  if (searchCache.size > 0) return;
  LETTERS.forEach((letter) => {
    fetch(`/api/spotify/search?q=${letter}&limit=10`)
      .then((r) => r.json())
      .then((data) => {
        searchCache.set(letter, data.artists ?? []);
      })
      .catch(() => {});
  });
}
