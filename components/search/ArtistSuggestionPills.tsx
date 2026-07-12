"use client";

type ArtistSuggestionPillsProps = {
  suggestions: readonly string[];
  show: boolean;
  onSelect: (suggestion: string) => void;
};

/**
 * Suggestion pills under the island, revealed once an artist is selected.
 * Collapses with a grid-rows transition; `inert` while collapsed so the pills
 * aren't focusable / announced when hidden (no invisible tab stops).
 */
export function ArtistSuggestionPills({
  suggestions,
  show,
  onSelect,
}: ArtistSuggestionPillsProps) {
  return (
    <div
      className="grid"
      style={{
        gridTemplateRows: show ? "1fr" : "0fr",
        transition: "grid-template-rows 250ms cubic-bezier(0.25, 1, 0.5, 1)",
      }}
    >
      <div className="min-h-0 overflow-hidden" inert={!show}>
        <div className="flex items-center justify-center gap-1 px-4 pb-3 pt-1 font-ui text-[11px] text-(--foreground)/30">
          {suggestions.map((s, i) => (
            <span key={s}>
              {i > 0 && (
                <span className="mx-0.5 text-(--foreground)/15">·</span>
              )}
              <button
                type="button"
                onClick={() => onSelect(s)}
                className="transition-colors hover:text-(--foreground)/60"
              >
                {s}
              </button>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
