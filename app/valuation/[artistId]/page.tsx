import type { Metadata } from "next";
import { fetchArtistServer } from "@/lib/spotify/fetchArtistServer";
import { CatalogValuation } from "@/components/valuation/CatalogValuation";

type Props = {
  params: Promise<{ artistId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { artistId } = await params;
  const artist = await fetchArtistServer(artistId);
  const name = artist?.name ?? "this artist";

  return {
    title: `What's ${name}'s Catalog Worth? | Recoup`,
    description: `Get a directional valuation of ${name}'s recorded catalog from live Spotify play counts — measured, not guessed.`,
    openGraph: {
      title: `What's ${name}'s Catalog Worth?`,
      description: `Run a live catalog valuation for ${name} — one click, no uploads, no statements.`,
      ...(artist?.image ? { images: [{ url: artist.image, width: 640, height: 640 }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: `What's ${name}'s Catalog Worth?`,
      description: `Run a live catalog valuation for ${name} — one click, no uploads, no statements.`,
    },
  };
}

export default async function ArtistValuationPage({ params }: Props) {
  const { artistId } = await params;

  return (
    <main className="relative pt-36 sm:pt-44 pb-24 min-h-screen">
      <div className="mx-auto max-w-[800px] px-6 flex flex-col items-center text-center">
        <span
          className="inline-flex items-center gap-2.5 mb-5 px-4 py-2 rounded-full text-[12px] uppercase tracking-[0.16em] font-pixel text-(--foreground)/50"
          style={{
            boxShadow:
              "0 0 0 1px color-mix(in srgb, var(--foreground) 15%, transparent)",
          }}
        >
          <span className="w-2 h-2 rounded-full bg-green-500/70 animate-pulse" />
          Live catalog valuation
        </span>
        <h1 className="font-pixel text-[clamp(2.5rem,7vw,4.5rem)] text-(--foreground) leading-[0.95] tracking-[-0.01em] mb-5">
          What&apos;s your catalog worth?
        </h1>
        <p className="text-[clamp(1.0625rem,1.6vw,1.25rem)] text-(--foreground)/60 max-w-[560px] leading-relaxed">
          Pick your artist. We measure live play counts across your entire
          catalog and turn them into a valuation band — one click, no uploads,
          no statements.
        </p>
        <CatalogValuation initialArtistId={artistId} />
      </div>
    </main>
  );
}
