/** The embeddable player URL for a youtube.com/watch?v= or youtu.be link, or undefined when no video id can be read. */
export function youtubeEmbedUrl(url: string | undefined): string | undefined {
  if (!url) return undefined;
  const parsed = new URL(url);
  const id = parsed.hostname === "youtu.be" ? parsed.pathname.slice(1) : parsed.searchParams.get("v");
  return id && /^[\w-]{11}$/.test(id) ? `https://www.youtube.com/embed/${id}?rel=0` : undefined;
}
