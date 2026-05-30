"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";

/* ---------- types ---------- */

interface CmStatistics {
  sp_followers?: number;
  sp_monthly_listeners?: number;
  sp_popularity?: number;
  ins_followers?: number;
  tiktok_followers?: number;
  ycs_subscribers?: number;
  num_sp_editorial_playlists?: number;
  num_sp_playlists?: number;
  sp_playlist_total_reach?: number;
}

interface ProfileData {
  name?: string;
  artist_name?: string;
  genres?: string[];
  record_label?: string;
  cm_statistics?: CmStatistics;
  image_url?: string;
}

interface CityEntry {
  city_name?: string;
  country_name?: string;
  listeners?: number;
}

interface SimilarArtist {
  name?: string;
  sp_monthly_listeners?: number;
  career_stage?: string;
  recent_momentum?: string;
}

interface InsightEntry {
  text?: string;
  insight?: string;
}

interface DemoResult {
  profile: ProfileData | null;
  cities: CityEntry[] | { cities?: CityEntry[] } | null;
  similar: SimilarArtist[] | { similar?: SimilarArtist[] } | null;
  insights: InsightEntry[] | { insights?: InsightEntry[] } | null;
}

/* ---------- helpers ---------- */

function fmt(n: number | undefined): string {
  if (n == null) return "—";
  return n.toLocaleString("en-US");
}

function ratio(followers?: number, listeners?: number): string {
  if (!followers || !listeners || listeners === 0) return "";
  return `(${((followers / listeners) * 100).toFixed(1)}% conversion)`;
}

function extractArray<T>(
  data: T[] | { [k: string]: T[] | undefined } | null,
  key: string,
): T[] {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  if (typeof data === "object" && key in data) {
    const val = (data as Record<string, unknown>)[key];
    return Array.isArray(val) ? val : [];
  }
  return [];
}

/* ---------- sub-components ---------- */

function StatCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="border border-[var(--border)] rounded-lg p-4">
      <p className="text-xs text-[var(--muted-foreground)] uppercase tracking-wide mb-1">
        {label}
      </p>
      <p className="text-xl font-bold">{value}</p>
      {sub && (
        <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{sub}</p>
      )}
    </div>
  );
}

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-sm font-medium uppercase tracking-wider text-[var(--muted-foreground)] mb-3 mt-8">
      {children}
    </h3>
  );
}

function SkeletonBlock() {
  return (
    <div className="space-y-4 animate-pulse mt-8">
      <div className="h-6 w-48 bg-[var(--border)] rounded" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-20 bg-[var(--border)] rounded-lg" />
        ))}
      </div>
      <div className="h-4 w-64 bg-[var(--border)] rounded mt-6" />
      <div className="space-y-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-4 bg-[var(--border)] rounded w-full" />
        ))}
      </div>
    </div>
  );
}

/* ---------- main component ---------- */

export function ArtistIntelligenceDemo() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<DemoResult | null>(null);

  async function handleSearch(e: FormEvent) {
    e.preventDefault();
    const name = query.trim();
    if (!name) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch(
        `/api/demo/research?artist=${encodeURIComponent(name)}`,
      );
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setError(
          (body as { error?: string }).error ?? "Something went wrong",
        );
        return;
      }
      setResult(await res.json());
    } catch {
      setError("Network error — please try again");
    } finally {
      setLoading(false);
    }
  }

  const profile = result?.profile;
  const stats = profile?.cm_statistics;
  const cities = extractArray<CityEntry>(result?.cities ?? null, "cities");
  const similar = extractArray<SimilarArtist>(result?.similar ?? null, "similar");
  const insights = extractArray<InsightEntry>(result?.insights ?? null, "insights");

  return (
    <>
      {/* Header */}
      <header className="mb-12">
        <Link
          href="/learn/demos"
          className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] mb-4 inline-block"
        >
          ← Demos
        </Link>
        <h1
          className="text-4xl font-bold tracking-tight text-[var(--foreground)] mb-3"
          style={{ fontFamily: "var(--font-bitmap), monospace" }}
        >
          Artist Intelligence
        </h1>
        <p className="text-[var(--muted-foreground)] text-lg">
          See what Recoup knows about any artist. Type a name below.
        </p>
      </header>

      {/* Search */}
      <form onSubmit={handleSearch} className="flex gap-3 mb-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. Joy Crookes, Drake, Billie Eilish…"
          className="flex-1 rounded-lg border border-[var(--border)] bg-transparent px-4 py-3 text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-1 focus:ring-[var(--foreground)]"
        />
        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="rounded-lg bg-[var(--foreground)] text-[var(--background)] px-6 py-3 text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-40"
        >
          {loading ? "Searching…" : "Research"}
        </button>
      </form>
      <p className="text-xs text-[var(--muted-foreground)] mb-8">
        Powered by the Recoup Research API — the same intelligence your agents use.
      </p>

      {/* Error */}
      {error && (
        <div className="border border-red-500/30 bg-red-500/5 rounded-lg p-4 text-sm text-red-400 mt-6">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading && <SkeletonBlock />}

      {/* Results */}
      {result && profile && (
        <div className="mt-8">
          {/* Artist header */}
          <div className="flex items-center gap-4 mb-6">
            {profile.image_url && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={profile.image_url}
                alt={profile.name ?? ""}
                className="w-16 h-16 rounded-full object-cover border border-[var(--border)]"
              />
            )}
            <div>
              <h2 className="text-2xl font-bold">
                {profile.name ?? profile.artist_name ?? query}
              </h2>
              <p className="text-sm text-[var(--muted-foreground)]">
                {[
                  ...(profile.genres?.slice(0, 3) ?? []),
                  profile.record_label ? `· ${profile.record_label}` : "",
                ]
                  .filter(Boolean)
                  .join(", ")}
              </p>
            </div>
          </div>

          {/* Streaming snapshot */}
          <SectionHeader>Streaming Snapshot</SectionHeader>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard
              label="Spotify Listeners"
              value={fmt(stats?.sp_monthly_listeners)}
              sub={
                stats?.sp_followers
                  ? `${fmt(stats.sp_followers)} followers ${ratio(stats.sp_followers, stats.sp_monthly_listeners)}`
                  : undefined
              }
            />
            <StatCard
              label="Instagram"
              value={fmt(stats?.ins_followers)}
              sub="followers"
            />
            <StatCard
              label="TikTok"
              value={fmt(stats?.tiktok_followers)}
              sub="followers"
            />
            <StatCard
              label="YouTube"
              value={fmt(stats?.ycs_subscribers)}
              sub="subscribers"
            />
          </div>

          {/* Playlist position */}
          {(stats?.num_sp_editorial_playlists || stats?.sp_playlist_total_reach) && (
            <>
              <SectionHeader>Playlist Position</SectionHeader>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <StatCard
                  label="Editorial Playlists"
                  value={fmt(stats?.num_sp_editorial_playlists)}
                />
                <StatCard
                  label="Total Playlists"
                  value={fmt(stats?.num_sp_playlists)}
                />
                <StatCard
                  label="Total Playlist Reach"
                  value={fmt(stats?.sp_playlist_total_reach)}
                />
              </div>
            </>
          )}

          {/* Top cities */}
          {cities.length > 0 && (
            <>
              <SectionHeader>Top Listener Cities</SectionHeader>
              <div className="border border-[var(--border)] rounded-lg divide-y divide-[var(--border)]">
                {cities.slice(0, 5).map((c, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between px-4 py-3 text-sm"
                  >
                    <span>
                      {c.city_name}
                      {c.country_name ? `, ${c.country_name}` : ""}
                    </span>
                    {c.listeners != null && (
                      <span className="text-[var(--muted-foreground)]">
                        {fmt(c.listeners)} listeners
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Similar artists */}
          {similar.length > 0 && (
            <>
              <SectionHeader>Competitive Landscape</SectionHeader>
              <div className="border border-[var(--border)] rounded-lg divide-y divide-[var(--border)]">
                {similar.slice(0, 5).map((s, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between px-4 py-3 text-sm"
                  >
                    <span className="font-medium">{s.name}</span>
                    <span className="text-[var(--muted-foreground)]">
                      {s.sp_monthly_listeners
                        ? `${fmt(s.sp_monthly_listeners)} listeners`
                        : ""}
                      {s.career_stage ? ` · ${s.career_stage}` : ""}
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* AI Insights */}
          {insights.length > 0 && (
            <>
              <SectionHeader>AI-Powered Insights</SectionHeader>
              <ul className="space-y-2">
                {insights.slice(0, 6).map((ins, i) => (
                  <li
                    key={i}
                    className="text-sm text-[var(--muted-foreground)] leading-relaxed pl-4 border-l-2 border-[var(--border)]"
                  >
                    {ins.text ?? ins.insight ?? JSON.stringify(ins)}
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* CTA */}
          <div className="mt-12 pt-8 border-t border-[var(--border)] text-center">
            <p className="text-[var(--muted-foreground)] mb-4">
              This is one artist. Imagine this running across your entire roster — automatically.
            </p>
            <Link
              href="/pricing"
              className="inline-block bg-[var(--foreground)] text-[var(--background)] px-8 py-3 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
            >
              See Pricing →
            </Link>
          </div>
        </div>
      )}

      {/* Empty state — before any search */}
      {!result && !loading && !error && (
        <div className="mt-12 border border-[var(--border)] border-dashed rounded-lg p-8 text-center">
          <p className="text-[var(--muted-foreground)] text-sm">
            Search for any artist to see their streaming analytics, audience
            intelligence, competitive positioning, and AI-powered insights.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {["Joy Crookes", "Drake", "Billie Eilish", "Tyler the Creator"].map(
              (name) => (
                <button
                  key={name}
                  onClick={() => {
                    setQuery(name);
                    // auto-submit
                    setTimeout(() => {
                      document
                        .querySelector<HTMLFormElement>("form")
                        ?.requestSubmit();
                    }, 50);
                  }}
                  className="text-xs border border-[var(--border)] rounded-full px-3 py-1.5 text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:border-[var(--foreground)] transition-colors"
                >
                  {name}
                </button>
              ),
            )}
          </div>
        </div>
      )}
    </>
  );
}
