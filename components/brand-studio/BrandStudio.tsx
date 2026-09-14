"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  assetStage,
  choices,
  REVIEW_KEY,
  reviewExportSchema,
  reviewsSchema,
  reviewSummary,
  studioUrl,
  studioDownloadUrl,
  type Asset,
  type Choice,
  type Reviews,
} from "@/lib/brand-studio/reviews";
import "./brand-studio.css";

const groups = [
  ["all", "All assets"],
  ["blog", "Blog thumbnails"],
  ["podcast", "Podcast"],
  ["logos", "Logos & marks"],
  ["backgrounds", "Backgrounds"],
  ["illustrations", "Article illustrations"],
  ["social", "Social assets"],
  ["picks", "My picks"],
];
const storageHelp =
  "Page moves, choices, and notes save in this browser. Export a backup to carry them to another browser.";

export function BrandStudio({
  assets,
  library,
}: {
  assets: Asset[];
  library: "finals" | "experiments";
}) {
  const [reviews, setReviews] = useState<Reviews>({});
  const [ready, setReady] = useState(false);
  const [view, setView] = useState("all");
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [limit, setLimit] = useState(24);
  const [active, setActive] = useState<Asset | null>(null);
  const [note, setNote] = useState("");
  const [noteState, setNoteState] = useState("Notes stay with this asset.");
  const [storageNote, setStorageNote] = useState(storageHelp);
  const [toast, setToast] = useState("");
  const detailRef = useRef<HTMLDialogElement>(null);
  const summaryRef = useRef<HTMLDialogElement>(null);
  const noteRef = useRef<HTMLTextAreaElement>(null);
  const summaryTextRef = useRef<HTMLTextAreaElement>(null);
  const focusNote = useRef(false);
  const current = useRef<Reviews>({});
  const finals = library === "finals";
  const pageName = finals ? "Finals" : "Experiments";

  useEffect(() => {
    try {
      const saved = reviewsSchema.parse(
        JSON.parse(localStorage.getItem(REVIEW_KEY) || "{}"),
      );
      current.current = saved;
      setReviews(saved);
    } catch {
      setStorageNote(
        "Existing browser decisions could not be read. Export a backup before making new choices.",
      );
    }
    setReady(true);
    const initial = new URLSearchParams(location.search).get("view");
    if (groups.some(([id]) => id === initial)) setView(initial!);
    const sync = (e: StorageEvent) => {
      if (e.key !== REVIEW_KEY) return;
      try {
        const next = reviewsSchema.parse(JSON.parse(e.newValue || "{}"));
        current.current = next;
        setReviews(next);
      } catch {
        setToast("Could not read updated decisions from another tab.");
      }
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(""), 3500);
    return () => clearTimeout(timer);
  }, [toast]);
  useEffect(() => {
    if (active) {
      detailRef.current?.showModal();
      if (focusNote.current) noteRef.current?.focus();
    }
  }, [active]);

  function persist(next: Reviews) {
    current.current = next;
    setReviews(next);
    try {
      localStorage.setItem(REVIEW_KEY, JSON.stringify(next));
      return true;
    } catch {
      setStorageNote(
        "Browser storage is unavailable. Export a backup before closing; changes are kept for this session.",
      );
      return false;
    }
  }
  function update(id: string, patch: Partial<Reviews[string]>) {
    const previous = current.current[id] || {
      status: "proposed" as const,
      note: "",
    };
    return persist({
      ...current.current,
      [id]: {
        ...previous,
        ...patch,
        date: new Date().toISOString(),
        assetVersion: "1.0",
      },
    });
  }
  function changeChoice(a: Asset, choice: Choice) {
    const status =
      current.current[a.id]?.status === choice ? "proposed" : choice;
    const saved = update(a.id, { status });
    setToast(
      `${status === "proposed" ? "Decision cleared" : choices[status]} · ${saved ? "saved" : "session only"}`,
    );
  }
  function move(a: Asset) {
    const stage =
      assetStage(a, current.current) === "final" ? "experiment" : "final";
    const saved = update(a.id, { stage });
    setToast(
      `Moved to ${stage === "final" ? "Finals" : "Experiments"} · ${saved ? "saved" : "session only"}`,
    );
  }
  function saveNote() {
    if (!active) return;
    const saved = update(active.id, { note: note.trim() });
    setNoteState(
      saved
        ? "Note saved in this browser."
        : "Note kept for this session. Export a backup.",
    );
  }
  function closeDetail() {
    if (active && note.trim() !== (current.current[active.id]?.note || ""))
      saveNote();
    detailRef.current?.querySelector("video")?.pause();
    detailRef.current?.close();
    setActive(null);
  }
  function open(a: Asset, noteFocus = false) {
    focusNote.current = noteFocus;
    setNote(reviews[a.id]?.note || "");
    setNoteState("Notes stay with this asset.");
    setActive(a);
  }
  function changeView(next: string) {
    setView(next);
    setFilter("all");
    setQuery("");
    setLimit(24);
    const url = new URL(location.href);
    url.searchParams.delete("view");
    if (next !== "all") url.searchParams.set("view", next);
    history.replaceState(null, "", url);
  }
  function download(data: string, type: string, name: string) {
    const url = URL.createObjectURL(new Blob([data], { type }));
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  async function importReviews(file?: File) {
    if (!file) return;
    try {
      if (file.size > 1000000) throw Error("Too large");
      const data = reviewExportSchema.parse(JSON.parse(await file.text()));
      const saved = persist({ ...current.current, ...data.reviews });
      setToast(
        saved
          ? "Decisions imported and saved."
          : "Imported for this session. Export a backup.",
      );
    } catch {
      setToast("Choose a valid Recoup decisions JSON export under 1 MB.");
    }
  }
  function choiceButtons(a: Asset) {
    return (
      <div
        className="decisions"
        role="group"
        aria-label={`Decision for ${a.title}`}
      >
        {Object.entries(choices).map(([key, label]) => (
          <button
            key={key}
            disabled={!ready}
            data-choice={key}
            aria-pressed={reviews[a.id]?.status === key}
            onClick={() => changeChoice(a, key as Choice)}
          >
            {label}
          </button>
        ))}
      </div>
    );
  }
  function stageControl(a: Asset) {
    return (
      <div className="asset-stage">
        <span className="stage-label">
          {assetStage(a, reviews) === "final" ? "Final" : "Experiment"}
        </span>
        <button
          disabled={!ready}
          className="move-button"
          onClick={() => move(a)}
        >
          Move to{" "}
          {assetStage(a, reviews) === "final" ? "Experiments" : "Finals"} ↗
        </button>
      </div>
    );
  }
  const inGroup = (a: Asset, group: string) =>
    group === "all" ||
    (group === "picks"
      ? ["approved", "needs-changes"].includes(reviews[a.id]?.status)
      : a.group === group);
  const libraryAssets = assets.filter(
    (a) => assetStage(a, reviews) === (finals ? "final" : "experiment"),
  );
  const selected = libraryAssets.filter((a) => inGroup(a, view));
  const filtered = selected.filter(
    (a) =>
      (filter === "all" ||
        (reviews[a.id]?.status || "proposed") ===
          (filter === "unreviewed" ? "proposed" : filter)) &&
      `${a.title} ${a.code} ${a.collection}`
        .toLowerCase()
        .includes(query.toLowerCase().trim()),
  );
  const heading =
    view === "all" ? pageName : groups.find(([id]) => id === view)?.[1];
  const tabs =
    view === "picks"
      ? [
          ["all", "All picks"],
          ["approved", "Keep"],
          ["needs-changes", "Maybe"],
        ]
      : [
          ["all", "All"],
          ["unreviewed", "Unreviewed"],
          ...Object.entries(choices),
        ];
  const summary = reviewSummary(assets, reviews);

  return (
    <div className="brand-studio" data-library={library}>
      <a className="skip" href="#main">
        Skip to artwork
      </a>
      <aside className="sidebar">
        <Link className="brand" href="/brand" aria-label="Recoup Brand Studio">
          <img src="/brand/assets/logos/lockup-ink.svg" alt="Recoup" />
        </Link>
        <p className="studio-label">BRAND STUDIO</p>
        <nav className="library-pages" aria-label="Studio pages">
          <Link href="/brand" aria-current={finals ? "page" : undefined}>
            Finals{" "}
            <b>
              {assets.filter((a) => assetStage(a, reviews) === "final").length}
            </b>
          </Link>
          <Link
            href="/brand/experiments"
            aria-current={!finals ? "page" : undefined}
          >
            Experiments{" "}
            <b>
              {
                assets.filter((a) => assetStage(a, reviews) === "experiment")
                  .length
              }
            </b>
          </Link>
        </nav>
        <p className="studio-label category-label">ASSET TYPE</p>
        <nav aria-label="Asset groups">
          {groups
            .filter(
              ([id]) =>
                !finals ||
                id === "all" ||
                id === "picks" ||
                libraryAssets.some((a) => inGroup(a, id)),
            )
            .map(([id, label]) => (
              <button
                key={id}
                aria-current={view === id ? "page" : undefined}
                onClick={() => changeView(id)}
              >
                {label}
                <span>
                  {libraryAssets.filter((a) => inGroup(a, id)).length}
                </span>
              </button>
            ))}
        </nav>
        <details className="sidebar-tools">
          <summary>Tools & reference</summary>
          <div>
            <a href="/brand/social-banner-kit.html">Social banner kit ↗</a>
            <a href="/brand/podcast-kit-blue-sweep.html">
              Blue sweep podcast kit ↗
            </a>
            {!finals && (
              <>
                <a href="/brand/linkedin-banners.html">
                  LinkedIn banner options ↗
                </a>
                <a href="/brand/podcast-kit-daylight.html">
                  Daylight podcast kit ↗
                </a>
                <a href="/brand/daylight-blog.html">Daylight blog pair ↗</a>
                <a href="/brand/explore.html#browse">All earlier studies ↗</a>
              </>
            )}
            <a href="/brand/explore.html#learn">Brand guide ↗</a>
          </div>
        </details>
        <p className="sidebar-note">
          Move artwork between pages.
          <br />
          Nothing is deleted.
        </p>
      </aside>
      <main id="main">
        <header className="topbar">
          <span>YOUR BRAND / {pageName.toUpperCase()}</span>
          <div className="top-actions">
            <button
              disabled={!ready}
              onClick={() => summaryRef.current?.showModal()}
            >
              Copy picks
            </button>
            <details className="more">
              <summary>Export / import</summary>
              <div>
                <button
                  disabled={!ready}
                  onClick={() =>
                    download(
                      JSON.stringify(
                        {
                          schema: "recoup-brand-review-v1",
                          exportedAt: new Date().toISOString(),
                          reviews,
                        },
                        null,
                        2,
                      ),
                      "application/json",
                      "recoup-brand-decisions.json",
                    )
                  }
                >
                  Download decisions
                </button>
                <button
                  disabled={!ready}
                  onClick={() =>
                    download(summary, "text/plain", "recoup-brand-picks.txt")
                  }
                >
                  Download summary
                </button>
                <label className="file-button">
                  Import decisions
                  <input
                    type="file"
                    accept=".json,application/json"
                    disabled={!ready}
                    onChange={(e) => {
                      void importReviews(e.target.files?.[0]);
                      e.target.value = "";
                    }}
                  />
                </label>
              </div>
            </details>
          </div>
        </header>
        <section className="page-heading">
          <div>
            <p className="eyebrow">
              {pageName.toUpperCase()}
              {view !== "all" ? ` / ${heading?.toUpperCase()}` : ""}
            </p>
            <h1>{heading}.</h1>
            <p id="intro">
              {finals
                ? "Selected artwork and reusable templates. Download the version you need."
                : "Studies, alternatives, and ideas still in progress. Move an asset to Finals when you choose it."}
            </p>
          </div>
          <div id="progress" aria-live="polite">
            <strong>{selected.length}</strong>
            {finals ? "final assets" : "experiments"}
          </div>
        </section>
        <div className="library-note">
          {finals ? (
            <>
              <strong>Your selected direction.</strong>
              <span>
                Blue sweep banners, podcast templates, and the core identity.
                Earlier versions live in{" "}
                <Link href="/brand/experiments">Experiments ↗</Link>.
              </span>
            </>
          ) : (
            <>
              <strong>Room to explore.</strong>
              <span>
                Keep / Maybe / Pass builds your shortlist. <b>Move to Finals</b>{" "}
                makes an asset part of your final library.
              </span>
            </>
          )}
        </div>
        <div className="toolbar">
          <div
            className="status-tabs"
            role="group"
            aria-label="Decision filter"
            hidden={finals}
          >
            {tabs.map(([id, label]) => (
              <button
                key={id}
                aria-pressed={filter === id}
                onClick={() => {
                  setFilter(id);
                  setLimit(24);
                }}
              >
                {label}
              </button>
            ))}
          </div>
          <label className="search">
            <span className="sr-only">Search artwork</span>
            <input
              type="search"
              placeholder="Search by title or ID…"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setLimit(24);
              }}
            />
          </label>
        </div>
        <div className="results-line">
          <p role="status">
            {Math.min(limit, filtered.length)} of {filtered.length} assets
          </p>
          {!finals && (
            <p>
              Keep · Maybe · Pass <span>— click again to clear</span>
            </p>
          )}
        </div>
        <section className="grid" aria-label="Artwork to review">
          {filtered.slice(0, limit).map((a) => (
            <article className="asset" key={a.id}>
              <button
                className={`preview ${a.dark ? "dark" : ""}`}
                aria-label={`Preview ${a.code}: ${a.title}`}
                onClick={() => open(a)}
              >
                <img loading="lazy" src={studioUrl(a.preview)} alt={a.title} />
                {a.video && <span className="video-tag">▶ Motion</span>}
              </button>
              <div className="asset-meta">
                <b>{a.code}</b>
                <span>{a.collection}</span>
              </div>
              <h2>{a.title}</h2>
              <div className="asset-footer">
                {finals ? (
                  <a
                    className="download-primary"
                    href={studioDownloadUrl(a.files[0]?.path || a.preview)}
                    download
                  >
                    Download {a.files[0]?.label || "asset"} ↓
                  </a>
                ) : (
                  choiceButtons(a)
                )}
                <button className="note-button" onClick={() => open(a, true)}>
                  {reviews[a.id]?.note ? "Edit note" : "Add note"} ↗
                </button>
              </div>
              {stageControl(a)}
              {reviews[a.id]?.note && (
                <p className="note-excerpt">{reviews[a.id].note}</p>
              )}
            </article>
          ))}
          {!filtered.length && (
            <div className="empty">
              <h2>No matching artwork.</h2>
              <p>Try another category, search, or decision filter.</p>
              <button onClick={() => changeView("all")}>Clear filters</button>
            </div>
          )}
        </section>
        <div className="load-more">
          {limit < filtered.length && (
            <button onClick={() => setLimit(limit + 24)}>
              Show {Math.min(24, filtered.length - limit)} more
            </button>
          )}
        </div>
        <p className="storage-note">{storageNote}</p>
      </main>
      <dialog
        ref={detailRef}
        aria-labelledby="detail-title"
        onCancel={(e) => {
          e.preventDefault();
          closeDetail();
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            const r = e.currentTarget.getBoundingClientRect();
            if (
              e.clientX < r.left ||
              e.clientX > r.right ||
              e.clientY < r.top ||
              e.clientY > r.bottom
            )
              closeDetail();
          }
        }}
      >
        <button
          className="close"
          aria-label="Close preview"
          onClick={closeDetail}
        >
          ×
        </button>
        {active && (
          <div className="detail-layout">
            <div className={`detail-art ${active.dark ? "dark" : ""}`}>
              {active.video ? (
                <video
                  controls
                  playsInline
                  preload="metadata"
                  src={studioUrl(active.video)}
                  poster={studioUrl(active.preview)}
                />
              ) : (
                <img src={studioUrl(active.preview)} alt={active.title} />
              )}
            </div>
            <div className="detail-info">
              <p className="eyebrow">
                {active.code} / {active.collection}
              </p>
              <h2 id="detail-title">{active.title}</h2>
              {stageControl(active)}
              {choiceButtons(active)}
              <label htmlFor="note">What works? What should change?</label>
              <textarea
                id="note"
                ref={noteRef}
                maxLength={2000}
                value={note}
                onChange={(e) => {
                  setNote(e.target.value);
                  setNoteState("Unsaved note");
                }}
                placeholder="Keep the colors, change the type…"
              />
              <button className="primary" onClick={saveNote}>
                Save note
              </button>
              <p className="note-help">{noteState}</p>
              <div className="downloads">
                {active.files.map((f) => (
                  <a key={f.path} href={studioDownloadUrl(f.path)} download>
                    {f.label} ↓
                  </a>
                ))}
              </div>
              {active.tool && (
                <a className="tool-link" href={studioUrl(active.tool)}>
                  Open editor / source ↗
                </a>
              )}
            </div>
          </div>
        )}
      </dialog>
      <dialog ref={summaryRef} id="summary" aria-labelledby="summary-title">
        <button
          className="close"
          aria-label="Close summary"
          onClick={() => summaryRef.current?.close()}
        >
          ×
        </button>
        <p className="eyebrow">YOUR REVIEW</p>
        <h2 id="summary-title">Send me your picks.</h2>
        <p>Copy this summary into our conversation.</p>
        <textarea
          id="summary-text"
          ref={summaryTextRef}
          readOnly
          aria-label="Review summary"
          value={summary}
        />
        <button
          className="primary"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(summary);
              setToast("Copied. Paste the summary into our conversation.");
            } catch {
              summaryTextRef.current?.select();
              setToast("Copy the highlighted summary.");
            }
          }}
        >
          Copy summary
        </button>
      </dialog>
      {toast && (
        <div id="toast" role="status">
          {toast}
        </div>
      )}
    </div>
  );
}
