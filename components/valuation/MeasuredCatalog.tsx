import type { MeasuredAlbum, StartedAlbum } from "@/components/valuation/useCatalogValuation";
import { MeasuredAlbumRow } from "@/components/valuation/MeasuredAlbumRow";

type MeasuredCatalogProps = {
  albums: MeasuredAlbum[];
  catalogAlbums: StartedAlbum[];
  centralValue: number;
  totalStreams: number;
};

/**
 * The "What we measured" breakdown: every captured release, biggest first.
 */
export function MeasuredCatalog(props: MeasuredCatalogProps) {
  if (props.albums.length === 0) return null;
  return (
    <div className="mt-9">
      <p className="text-[11px] font-pixel uppercase tracking-[0.16em] text-(--foreground)/45">
        What we measured
      </p>
      <ul
        className="mt-4 overflow-hidden rounded-xl"
        style={{
          boxShadow: "0 0 0 1px color-mix(in srgb, var(--foreground) 10%, transparent)",
        }}
      >
        {[...props.albums]
          .sort((a, b) => b.streams - a.streams)
          .map(album => (
            <MeasuredAlbumRow
              key={album.id}
              album={album}
              meta={props.catalogAlbums.find(a => a.id === album.id)}
              centralValue={props.centralValue}
              totalStreams={props.totalStreams}
            />
          ))}
      </ul>
    </div>
  );
}
