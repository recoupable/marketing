"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import directions from "@/brand-studio/carousel-templates-manifest.json";
import story from "@/brand-studio/carousel-content.json";
import { studioUrl, studioDownloadUrl } from "@/lib/brand-studio/reviews";
import "./carousel-studio.css";
import { CarouselTitleStory, CarouselStoryRules } from "./CarouselStory";

export function CarouselStudio() {
  const params = useSearchParams();
  const router = useRouter();
  const selected = params.get("direction");
  const direction =
    directions.find((d) => d.id === `carousel-${selected}`) ?? directions[0];
  const key = direction.id.replace("carousel-", "");
  const [slide, setSlide] = useState(0);
  const [view, setView] = useState<"slides" | "overview" | "titles">(
    "overview",
  );
  const overview = view === "overview";
  const titlesOnly = view === "titles";
  const base = `assets/carousels/${key}/`;
  const number = String(slide + 1).padStart(2, "0");
  const move = (delta: number) =>
    setSlide((current) =>
      Math.max(0, Math.min(story.length - 1, current + delta)),
    );
  return (
    <main id="main" className="carousel-studio">
      <header className="carousel-topbar">
        <Link href="/brand?view=carousels">← Finals</Link>
        <span>RECOUP / SOCIAL CAROUSELS</span>
        <Link href="/brand/experiments">Experiments ↗</Link>
      </header>
      <div className="carousel-intro">
        <p className="carousel-eyebrow">
          {directions.length} DIRECTIONS · SIX SLIDES EACH
        </p>
        <h1>A story worth swiping.</h1>
        <p>
          Short ideas. Room to breathe. Illustrations that help tell the story.
        </p>
      </div>
      <nav className="carousel-directions" aria-label="Design directions">
        {directions.map((d, i) => (
          <button
            key={d.id}
            aria-pressed={d.id === direction.id}
            onClick={() => {
              router.replace(
                `/brand/carousels?direction=${d.id.replace("carousel-", "")}`,
                { scroll: false },
              );
              setSlide(0);
              setView("overview");
            }}
          >
            <span>{String(i + 1).padStart(2, "0")}</span>
            {d.title}
          </button>
        ))}
      </nav>
      <section className="carousel-workspace">
        <div
          className="carousel-canvas"
          role="group"
          tabIndex={0}
          aria-label={
            view === "slides"
              ? "Carousel preview. Use left and right arrow keys to change slides."
              : "Carousel story preview"
          }
          onKeyDown={(e) => {
            if (
              view === "slides" &&
              (e.key === "ArrowRight" || e.key === "ArrowLeft")
            ) {
              e.preventDefault();
              move(e.key === "ArrowRight" ? 1 : -1);
            }
          }}
        >
          {/* Native images preserve the exported artwork and do not require resizing services. */}
          {titlesOnly ? (
            <CarouselTitleStory />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              className={overview ? "carousel-overview" : "carousel-slide"}
              src={studioUrl(
                base + (overview ? "preview.jpg" : number + ".jpg"),
              )}
              alt={
                overview
                  ? `${direction.title}: all six slides`
                  : `${slide + 1}. ${story[slide].title} ${story[slide].body}`
              }
              width={overview ? 1392 : 1080}
              height={overview ? 1160 : 1350}
            />
          )}
          {view === "slides" && (
            <div className="carousel-controls">
              <button
                aria-label="Previous slide"
                disabled={slide === 0}
                onClick={() => move(-1)}
              >
                ←
              </button>
              <span aria-live="polite">{number} / 06</span>
              <button
                aria-label="Next slide"
                disabled={slide === 5}
                onClick={() => move(1)}
              >
                →
              </button>
            </div>
          )}
        </div>
        <aside className="carousel-notes">
          <p className="carousel-eyebrow">APPROVED TEMPLATE · SAMPLE STORY</p>
          <h2>{direction.title}</h2>
          <p>{direction.description}</p>
          <p className="carousel-story-rule">
            The titles should tell the complete story on their own.
          </p>
          <div className="carousel-view-switch">
            <button aria-pressed={titlesOnly} onClick={() => setView("titles")}>
              Titles only
            </button>
            <button
              aria-pressed={view === "slides"}
              onClick={() => setView("slides")}
            >
              Slide view
            </button>
            <button aria-pressed={overview} onClick={() => setView("overview")}>
              Whole story
            </button>
          </div>
          <ol className="carousel-outline">
            {story.map((s, i) => (
              <li key={s.step}>
                <button
                  aria-current={
                    slide === i && view === "slides" ? "step" : undefined
                  }
                  onClick={() => {
                    setSlide(i);
                    setView("slides");
                  }}
                >
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <span>{s.title}</span>
                </button>
              </li>
            ))}
          </ol>
          <div className="carousel-downloads">
            <a
              className="carousel-primary"
              href={studioDownloadUrl(base + key + ".pdf")}
            >
              LinkedIn PDF ↓
            </a>
            <a href={studioDownloadUrl(base + key + ".zip")}>
              Full template kit ↓
            </a>
            <a href={studioDownloadUrl(base + number + ".jpg")}>
              This slide · JPG ↓
            </a>
          </div>
          <small>
            The kit includes six JPGs, PNGs, vector SVGs and a PDF. This is
            original example copy demonstrating the template, not a client case
            study.
          </small>
        </aside>
      </section>
      <CarouselStoryRules />
      <section className="carousel-specs">
        <div>
          <p className="carousel-eyebrow">BUILT FOR BOTH</p>
          <h2>One design. Two ways to post.</h2>
        </div>
        <div>
          <h3>Instagram</h3>
          <p>
            1080 × 1350 px · 4:5 portrait. Upload the six numbered JPGs in
            order. Every slide uses the same dimensions.
          </p>
          <p>
            Our export target is under 2 MB per image. The supplied images are
            all under 200 KB.
          </p>
        </div>
        <div>
          <h3>LinkedIn</h3>
          <p>
            Upload the six-page PDF as a document post. These files are under 2
            MB, well below LinkedIn’s 100 MB / 300-page limits.
          </p>
          <p>4:5 is our shared design format, not a required LinkedIn size.</p>
        </div>
      </section>
      <details className="carousel-research">
        <summary>Format notes & sources</summary>
        <p>
          Checked September 14, 2026. Instagram also supports other ratios; 4:5
          is a practical shared canvas for this first set. Instagram’s help page
          was not directly retrievable during this check, so we have not
          represented its file-size limits as verified.
        </p>
        <p>
          <a
            href="https://www.linkedin.com/help/linkedin/answer/a523054/document-uploads-on-linkedin-faq?lang=en"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn document requirements ↗
          </a>{" "}
          ·{" "}
          <a
            href="https://help.instagram.com/1631821640426723"
            target="_blank"
            rel="noreferrer"
          >
            Instagram photo-resolution guidance ↗
          </a>{" "}
          ·{" "}
          <a
            href="https://socialmagnum.com/blog/instagram-post-size"
            target="_blank"
            rel="noreferrer"
          >
            Current Instagram size reference ↗
          </a>
        </p>
      </details>
    </main>
  );
}
