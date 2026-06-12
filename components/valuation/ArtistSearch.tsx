import type { Artist } from "@/components/valuation/useCatalogValuation";
import { formatCompact } from "@/lib/valuation/formatCompact";

type ArtistSearchProps = {
  query: string;
  artists: Artist[];
  picked: Artist | null;
  running: boolean;
  progress: string;
  error: string;
  onQueryChange: (q: string) => void;
  onPick: (artist: Artist) => void;
  onRun: () => void;
};

/**
 * Artist search input, debounced result dropdown, and the run CTA.
 */
export function ArtistSearch(props: ArtistSearchProps) {
  return (
    <>
      <div
        className="rounded-2xl p-1.5 transition-shadow"
        style={{
          boxShadow: "0 0 0 1px color-mix(in srgb, var(--foreground) 15%, transparent)",
        }}
      >
        <input
          value={props.query}
          onChange={e => props.onQueryChange(e.target.value)}
          placeholder="Search your artist name…"
          className="w-full rounded-xl bg-transparent px-5 py-4 text-[17px] text-(--foreground) placeholder:text-(--foreground)/35 focus:outline-none"
          disabled={props.running}
        />
      </div>
      {!props.picked && props.artists.length > 0 && (
        <ul
          className="mt-3 overflow-hidden rounded-2xl"
          style={{
            boxShadow: "0 0 0 1px color-mix(in srgb, var(--foreground) 12%, transparent)",
          }}
        >
          {props.artists.map(a => (
            <li key={a.id}>
              <button
                className="flex w-full items-center gap-3.5 px-5 py-3.5 text-left transition-colors duration-200 hover:bg-(--foreground)/[0.04]"
                onClick={() => props.onPick(a)}
              >
                {a.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={a.image} alt="" className="h-11 w-11 rounded-full object-cover" />
                )}
                <span className="font-semibold text-[15px] text-(--foreground)">{a.name}</span>
                {typeof a.followers === "number" && (
                  <span className="ml-auto text-[12px] font-pixel uppercase tracking-[0.1em] text-(--foreground)/40">
                    {formatCompact(a.followers)} followers
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
      <button
        onClick={props.onRun}
        disabled={!props.picked || props.running}
        className="cta-pulse mt-7 w-full font-ui font-semibold bg-(--foreground) text-(--background) px-9 py-4 rounded-full text-[15px] transition-all duration-300 hover:shadow-[0_0_40px_color-mix(in_srgb,var(--foreground)_12%,transparent)] hover:-translate-y-0.5 disabled:opacity-30 disabled:hover:translate-y-0 disabled:hover:shadow-none"
      >
        {props.running ? (
          <span className="inline-flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-green-500/80 animate-pulse" />
            {props.progress}
          </span>
        ) : (
          "Value my catalog"
        )}
      </button>
      {props.error && <p className="mt-4 text-center text-[13px] text-red-500/90">{props.error}</p>}
    </>
  );
}
