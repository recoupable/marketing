/**
 * An item's proportional slice of the central estimate, so per-album and
 * per-track values visibly sum back to the headline number.
 *
 * @param streams - The item's stream count
 * @param totalStreams - The whole catalog's deduped stream count
 * @param centralValue - The central valuation estimate in USD
 */
export function proportionalShare(
  streams: number,
  totalStreams: number,
  centralValue: number,
): number {
  return totalStreams > 0 ? centralValue * (streams / totalStreams) : 0;
}
