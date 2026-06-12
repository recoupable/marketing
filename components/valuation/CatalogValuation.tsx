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
    <div className="mt-12 w-full max-w-[560px] text-left">
      {phase !== "done" && (
        <>
          <div
            className="rounded-2xl p-1.5 transition-shadow"
            style={{
              boxShadow: "0 0 0 1px color-mix(in srgb, var(--foreground) 15%, transparent)",
            }}
          >
            <input
              value={query}
              onChange={e => onQueryChange(e.target.value)}
              placeholder="Search your artist name…"
              className="w-full rounded-xl bg-transparent px-5 py-4 text-[17px] text-(--foreground) placeholder:text-(--foreground)/35 focus:outline-none"
              disabled={phase === "running"}
            />
          </div>
          {!picked && artists.length > 0 && (
            <ul
              className="mt-3 overflow-hidden rounded-2xl"
              style={{
                boxShadow: "0 0 0 1px color-mix(in srgb, var(--foreground) 12%, transparent)",
              }}
            >
              {artists.map(a => (
                <li key={a.id}>
                  <button
                    className="flex w-full items-center gap-3.5 px-5 py-3.5 text-left transition-colors duration-200 hover:bg-(--foreground)/[0.04]"
                    onClick={() => {
                      setPicked(a);
                      setQuery(a.name);
                      setArtists([]);
                    }}
                  >
                    {a.image && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={a.image} alt="" className="h-11 w-11 rounded-full object-cover" />
                    )}
                    <span className="font-semibold text-[15px] text-(--foreground)">{a.name}</span>
                    {typeof a.followers === "number" && (
                      <span className="ml-auto text-[12px] font-pixel uppercase tracking-[0.1em] text-(--foreground)/40">
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
            className="cta-pulse mt-7 w-full font-ui font-semibold bg-(--foreground) text-(--background) px-9 py-4 rounded-full text-[15px] transition-all duration-300 hover:shadow-[0_0_40px_color-mix(in_srgb,var(--foreground)_12%,transparent)] hover:-translate-y-0.5 disabled:opacity-30 disabled:hover:translate-y-0 disabled:hover:shadow-none"
          >
            {phase === "running" ? (
              <span className="inline-flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-green-500/80 animate-pulse" />
                {progress}
              </span>
            ) : (
              "Value my catalog"
            )}
          </button>
          {phase === "error" && (
            <p className="mt-4 text-center text-[13px] text-red-500/90">{error}</p>
          )}
        </>
      )}

      {phase === "done" && result && (
        <div
          className="rounded-2xl p-8 sm:p-10"
          style={{
            boxShadow: "0 0 0 1px color-mix(in srgb, var(--foreground) 15%, transparent)",
          }}
        >
          <p className="text-[11px] font-pixel uppercase tracking-[0.16em] text-(--foreground)/45">
            Estimated catalog value
          </p>
          <p className="mt-3 font-pixel text-[clamp(3rem,8vw,4.5rem)] leading-[0.95] tracking-[-0.01em] text-(--foreground)">
            {usd(result.valueBand.central)}
          </p>
          <p className="mt-2 text-[14px] text-(--foreground)/55">
            range {usd(result.valueBand.low)} – {usd(result.valueBand.high)}
          </p>
          <dl
            className="mt-8 grid grid-cols-3 gap-px overflow-hidden rounded-xl"
            style={{
              boxShadow: "0 0 0 1px color-mix(in srgb, var(--foreground) 10%, transparent)",
            }}
          >
            {[
              {
                label: "Lifetime streams",
                value: Intl.NumberFormat("en", { notation: "compact" }).format(
                  result.totalStreams,
                ),
              },
              { label: "Tracks measured", value: String(result.trackCount) },
              { label: "Releases", value: String(result.albumCount) },
            ].map(s => (
              <div key={s.label} className="bg-(--foreground)/[0.03] px-4 py-4">
                <dt className="text-[10px] font-pixel uppercase tracking-[0.14em] text-(--foreground)/40">
                  {s.label}
                </dt>
                <dd className="mt-1.5 text-[19px] font-semibold text-(--foreground)">{s.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-7 text-[12px] leading-relaxed text-(--foreground)/45">
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
            className="cta-pulse mt-8 block w-full rounded-full bg-(--foreground) px-9 py-4 text-center font-ui text-[15px] font-semibold text-(--background) transition-all duration-300 hover:shadow-[0_0_40px_color-mix(in_srgb,var(--foreground)_12%,transparent)] hover:-translate-y-0.5"
          >
            Get the full report with Recoup →
          </a>
        </div>
      )}
    </div>
  );
}
