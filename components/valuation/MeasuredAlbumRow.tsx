import type { MeasuredAlbum, StartedAlbum } from "@/components/valuation/types";
import { formatUsd } from "@/lib/valuation/formatUsd";
import { formatCompact } from "@/lib/valuation/formatCompact";
import { proportionalShare } from "@/lib/valuation/proportionalShare";

type MeasuredAlbumRowProps = {
  album: MeasuredAlbum;
  meta: StartedAlbum | undefined;
  centralValue: number;
  totalStreams: number;
};

/**
 * One release in the "What we measured" breakdown: artwork, year, value, and
 * an expandable per-track list. Values are each item's proportional share of
 * the central estimate, so the parts sum back to the headline number.
 */
export function MeasuredAlbumRow(props: MeasuredAlbumRowProps) {
  const { album, meta, centralValue, totalStreams } = props;
  return (
    <li className="bg-(--foreground)/[0.02]">
      <details>
        <summary className="flex cursor-pointer list-none items-center gap-3.5 px-4 py-3 transition-colors duration-200 hover:bg-(--foreground)/[0.04] [&::-webkit-details-marker]:hidden">
          {meta?.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={meta.image} alt="" className="h-12 w-12 rounded-lg object-cover" />
          )}
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[14px] font-semibold text-(--foreground)">
              {meta?.name ?? album.id}
            </span>
            <span className="block text-[11px] text-(--foreground)/40">
              {meta?.releaseDate?.slice(0, 4)}
              {meta?.releaseDate ? " · " : ""}
              {album.tracks.length} {album.tracks.length === 1 ? "track" : "tracks"}
            </span>
          </span>
          <span className="text-right">
            <span className="block text-[13px] font-semibold tabular-nums text-(--foreground)">
              {formatUsd(proportionalShare(album.streams, totalStreams, centralValue))}
            </span>
            <span className="block text-[11px] tabular-nums text-(--foreground)/40">
              {formatCompact(album.streams)} streams
            </span>
          </span>
        </summary>
        <ul className="pb-2">
          {album.tracks.map((track, i) => (
            <li
              key={`${album.id}-${i}`}
              className="flex items-center gap-3.5 py-1.5 pr-4 pl-[4.375rem]"
            >
              <span className="min-w-0 flex-1 truncate text-[13px] text-(--foreground)/70">
                {track.name ?? "Untitled track"}
              </span>
              <span className="text-[12px] font-medium tabular-nums text-(--foreground)/70">
                {formatUsd(proportionalShare(track.streams, totalStreams, centralValue))}
              </span>
              <span className="w-20 text-right text-[11px] tabular-nums text-(--foreground)/40">
                {formatCompact(track.streams)}
              </span>
            </li>
          ))}
        </ul>
      </details>
    </li>
  );
}
