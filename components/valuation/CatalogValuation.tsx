"use client";

import { useRef, useState } from "react";

type Artist = { id: string; name: string; image?: string; followers?: number };
type Band = { low: number; central: number; high: number };
type Result = {
  state: string;
  trackCount: number;
  albumCount: number;
  totalStreams: number;
  catalogAgeYears: number;
  valueBand: Band;
  annualNls: Band;
  assumptions: { runRateBasis: string; multiple: Band };
};

const usd = (n: number) =>
  n >= 1_000_000
    ? `$${(n / 1_000_000).toFixed(1)}M`
    : n >= 1_000
      ? `$${Math.round(n / 1_000)}K`
      : `$${Math.round(n)}`;

export function CatalogValuation() {
  const [query, setQuery] = useState("");
  const [artists, setArtists] = useState<Artist[]>([]);
  const [picked, setPicked] = useState<Artist | null>(null);
  const [phase, setPhase] = useState<"idle" | "running" | "done" | "error">("idle");
  const [progress, setProgress] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState("");
  const searchTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  function onQueryChange(q: string) {
    setQuery(q);
    setPicked(null);
    clearTimeout(searchTimer.current);
    if (q.length < 2) return setArtists([]);
    searchTimer.current = setTimeout(async () => {
      const res = await fetch(`/api/spotify/search?q=${encodeURIComponent(q)}&limit=5`);
      const data = await res.json().catch(() => ({ artists: [] }));
      setArtists(data.artists ?? []);
    }, 300);
  }

  async function run() {
    if (!picked) return;
    setPhase("running");
    setError("");
    setProgress("Finding your releases…");
    try {
      const startRes = await fetch("/api/valuation/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ artistId: picked.id }),
      });
      const started = await startRes.json();
      if (!startRes.ok) throw new Error(started.error ?? "start failed");

      setProgress(`Measuring play counts across ${started.albumCount} releases…`);

      // cheap probe poll on one album until captures land, then one full read
      const probeIds = started.albumIds.slice(0, 1);
      for (let attempt = 0; attempt < 40; attempt++) {
        await new Promise(r => setTimeout(r, 6000));
        const probe = await fetch("/api/valuation/result", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ albumIds: probeIds, probe: true }),
        }).then(r => r.json());
        if (probe.state === "captured") break;
        setProgress(
          `Measuring play counts across ${started.albumCount} releases… (still capturing)`,
        );
      }

      setProgress("Computing your valuation…");
      const final = await fetch("/api/valuation/result", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          albumIds: started.albumIds,
          earliestReleaseDate: started.earliestReleaseDate,
        }),
      }).then(r => r.json());
      if (final.state !== "done") throw new Error("capture incomplete — try again in a minute");

      setResult(final);
      setPhase("done");
    } catch (e) {
      setError(e instanceof Error ? e.message : "something went wrong");
      setPhase("error");
    }
  }

  return (
    <div className="mt-10">
      {phase !== "done" && (
        <>
          <input
            value={query}
            onChange={e => onQueryChange(e.target.value)}
            placeholder="Search your artist name…"
            className="w-full rounded-lg px-4 py-3 text-lg shadow-[0_0_0_1px_rgba(0,0,0,0.15)] focus:shadow-[0_0_0_2px_rgba(0,0,0,0.6)] focus:outline-none dark:bg-neutral-900 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.2)]"
            disabled={phase === "running"}
          />
          {!picked && artists.length > 0 && (
            <ul className="mt-2 overflow-hidden rounded-lg shadow-[0_0_0_1px_rgba(0,0,0,0.1)] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.15)]">
              {artists.map(a => (
                <li key={a.id}>
                  <button
                    className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    onClick={() => {
                      setPicked(a);
                      setQuery(a.name);
                      setArtists([]);
                    }}
                  >
                    {a.image && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={a.image} alt="" className="h-10 w-10 rounded-full object-cover" />
                    )}
                    <span className="font-medium">{a.name}</span>
                    {typeof a.followers === "number" && (
                      <span className="ml-auto text-sm text-neutral-500">
                        {Intl.NumberFormat("en", { notation: "compact" }).format(a.followers)}{" "}
                        followers
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}
          <button
            onClick={run}
            disabled={!picked || phase === "running"}
            className="mt-6 w-full rounded-lg bg-black px-6 py-4 text-lg font-semibold text-white disabled:opacity-40 dark:bg-white dark:text-black"
          >
            {phase === "running" ? progress : "Value my catalog"}
          </button>
          {phase === "error" && <p className="mt-3 text-sm text-red-600">{error}</p>}
        </>
      )}

      {phase === "done" && result && (
        <div className="rounded-xl p-8 shadow-[0_0_0_1px_rgba(0,0,0,0.15)] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.2)]">
          <p className="text-sm uppercase tracking-wide text-neutral-500">
            Estimated catalog value
          </p>
          <p className="mt-2 text-5xl font-bold tracking-tight">
            {usd(result.valueBand.central)}
          </p>
          <p className="mt-1 text-neutral-600 dark:text-neutral-400">
            range {usd(result.valueBand.low)} – {usd(result.valueBand.high)}
          </p>
          <dl className="mt-6 grid grid-cols-3 gap-4 text-sm">
            <div>
              <dt className="text-neutral-500">Lifetime streams</dt>
              <dd className="mt-1 text-lg font-semibold">
                {Intl.NumberFormat("en", { notation: "compact" }).format(result.totalStreams)}
              </dd>
            </div>
            <div>
              <dt className="text-neutral-500">Tracks measured</dt>
              <dd className="mt-1 text-lg font-semibold">{result.trackCount}</dd>
            </div>
            <div>
              <dt className="text-neutral-500">Releases</dt>
              <dd className="mt-1 text-lg font-semibold">{result.albumCount}</dd>
            </div>
          </dl>
          <p className="mt-6 text-xs leading-relaxed text-neutral-500">
            Directional model, not an appraisal: live platform-displayed Spotify
            play counts (measured today), other platforms approximated as a
            labeled share of Spotify, annual run-rate from your catalog&apos;s
            lifetime average over ~{result.catalogAgeYears} years, master-side
            NLS × an {result.assumptions.multiple.low}–
            {result.assumptions.multiple.high}× market multiple. Real statements
            collapse the range.
          </p>
          <a
            href="https://chat.recoupable.com"
            className="mt-6 block w-full rounded-lg bg-black px-6 py-4 text-center text-lg font-semibold text-white dark:bg-white dark:text-black"
          >
            Get the full report with Recoup →
          </a>
        </div>
      )}
    </div>
  );
}
