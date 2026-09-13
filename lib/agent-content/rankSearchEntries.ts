import { searchEntries } from "./searchEntries.ts";
import { tokens } from "./tokens.ts";
import type { AgentContentEntry, AgentSearchInput } from "./types.ts";

/** Scores every entry of the requested type for a query; entries matching too few words drop out. */
export function rankSearchEntries(
  query: string,
  type: AgentSearchInput["type"],
): AgentContentEntry[] {
  const words = tokens(query).filter(
    (word) => word !== "recoup" || tokens(query).length === 1,
  );
  const apiQuery = query.match(
    /^(?:(GET|POST|PUT|PATCH|DELETE|OPTIONS|HEAD)\s+)?(\/api\/[^\s?]+)$/i,
  );
  return searchEntries
    .filter(
      ({ entry }) => !type || type === "all" || entry.metadata.type === type,
    )
    .map(({ entry, title, description, keywords, body }) => {
      let score = 0;
      let matched = 0;
      for (const word of words) {
        const hit =
          title.has(word) ||
          description.has(word) ||
          keywords.has(word) ||
          body.has(word);
        if (hit) matched++;
        score +=
          Number(title.has(word)) * 12 +
          Number(description.has(word)) * 6 +
          Number(keywords.has(word)) * 8 +
          Number(body.has(word));
      }
      if (entry.metadata.title.toLowerCase() === query.toLowerCase())
        score += 100;
      if (
        apiQuery &&
        entry.metadata.api?.path.toLowerCase() === apiQuery[2].toLowerCase()
      )
        score +=
          300 +
          (apiQuery[1]?.toUpperCase() === entry.metadata.api.method ? 100 : 0);
      if (!matched || (words.length > 2 && matched / words.length < 0.5))
        return { entry, score: 0 };
      score += (matched / Math.max(words.length, 1)) * 20;
      return { entry, score };
    })
    .filter((item) => item.score > 0)
    .sort(
      (a, b) =>
        b.score - a.score ||
        a.entry.metadata.id.localeCompare(b.entry.metadata.id, "en"),
    )
    .map(({ entry }) => entry);
}
