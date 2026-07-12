import { searchCache } from "@/lib/spotify/searchCache";

const LETTERS = "abcdefghijklmnopqrstuvwxyz".split("");
let prefetchStarted = false;

/**
 * Warm the search cache with single-letter results (once) so the autocomplete
 * dropdown has something to show on the first keystroke. Best-effort. The
 * in-flight latch stops concurrent mounts from each firing all 26 requests
 * before the first responses land.
 */
export function prefetchLetters(): void {
  if (prefetchStarted || searchCache.size > 0) return;
  prefetchStarted = true;
  LETTERS.forEach((letter) => {
    fetch(`/api/spotify/search?q=${letter}&limit=10`)
      .then((r) => r.json())
      .then((data) => {
        searchCache.set(letter, data.artists ?? []);
      })
      .catch(() => {});
  });
}
