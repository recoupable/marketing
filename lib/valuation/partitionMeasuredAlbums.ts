import type { MeasuredAlbum } from "@/components/valuation/types";

/**
 * Splits a valuation's releases into the ones with measured streams (sorted
 * biggest first, ready to render) and the zero-stream tail. A wall of
 * "$0 · 0 streams" rows right above the CTA reads as failure, so the UI
 * collapses the unmeasured group into a single count row instead.
 */
export function partitionMeasuredAlbums(albums: MeasuredAlbum[]): {
  measured: MeasuredAlbum[];
  unmeasured: MeasuredAlbum[];
} {
  const measured: MeasuredAlbum[] = [];
  const unmeasured: MeasuredAlbum[] = [];
  for (const album of albums) {
    (album.streams > 0 ? measured : unmeasured).push(album);
  }
  measured.sort((a, b) => b.streams - a.streams);
  return { measured, unmeasured };
}
