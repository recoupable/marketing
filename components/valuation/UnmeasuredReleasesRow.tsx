import type { MeasuredAlbum, StartedAlbum } from "@/components/valuation/types";

type UnmeasuredReleasesRowProps = {
  albums: MeasuredAlbum[];
  catalogAlbums: StartedAlbum[];
};

/**
 * Collapses the zero-stream tail of the "What we measured" list into one row
 * ("+N releases with no measurable streams"), expandable to the release names.
 * Rendering each as its own "$0 · 0 streams" row read as failure right above
 * the CTA (chat#1850).
 */
export function UnmeasuredReleasesRow(props: UnmeasuredReleasesRowProps) {
  if (props.albums.length === 0) return null;
  const count = props.albums.length;
  return (
    <li className="bg-(--foreground)/[0.02]">
      <details>
        <summary className="flex cursor-pointer list-none items-center gap-3.5 px-4 py-3 transition-colors duration-200 hover:bg-(--foreground)/[0.04] [&::-webkit-details-marker]:hidden">
          <span className="min-w-0 flex-1 text-[13px] text-(--foreground)/50">
            +{count} {count === 1 ? "release" : "releases"} with no measurable
            streams
          </span>
          <span className="text-[11px] text-(--foreground)/35">
            not counted in the estimate
          </span>
        </summary>
        <ul className="pb-2">
          {props.albums.map(album => {
            const meta = props.catalogAlbums.find(a => a.id === album.id);
            return (
              <li key={album.id} className="flex items-center gap-3.5 py-1.5 pr-4 pl-4">
                <span className="min-w-0 flex-1 truncate text-[13px] text-(--foreground)/50">
                  {meta?.name ?? album.id}
                </span>
                <span className="text-[11px] tabular-nums text-(--foreground)/35">
                  {meta?.releaseDate?.slice(0, 4)}
                </span>
              </li>
            );
          })}
        </ul>
      </details>
    </li>
  );
}
