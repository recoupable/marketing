import type { MeasuredAlbum, StartedAlbum } from "@/components/valuation/types";
import { MeasuredAlbumRow } from "@/components/valuation/MeasuredAlbumRow";
import { UnmeasuredReleasesRow } from "@/components/valuation/UnmeasuredReleasesRow";
import { partitionMeasuredAlbums } from "@/lib/valuation/partitionMeasuredAlbums";

type MeasuredCatalogProps = {
  albums: MeasuredAlbum[];
  catalogAlbums: StartedAlbum[];
  centralValue: number;
  totalStreams: number;
};

/**
 * The "What we measured" breakdown: every captured release, biggest first.
 * Zero-stream releases collapse into a single count row at the end so the
 * list never trails off in "$0" rows right above the CTA.
 */
export function MeasuredCatalog(props: MeasuredCatalogProps) {
  if (props.albums.length === 0) return null;
  const { measured, unmeasured } = partitionMeasuredAlbums(props.albums);
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
        {measured.map(album => (
          <MeasuredAlbumRow
            key={album.id}
            album={album}
            meta={props.catalogAlbums.find(a => a.id === album.id)}
            centralValue={props.centralValue}
            totalStreams={props.totalStreams}
          />
        ))}
        <UnmeasuredReleasesRow
          albums={unmeasured}
          catalogAlbums={props.catalogAlbums}
        />
      </ul>
    </div>
  );
}
