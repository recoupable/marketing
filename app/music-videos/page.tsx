import Image from "next/image";
import { buildPageMetadata } from "@/lib/seo";
import { musicVideosCopy as c } from "@/lib/copy/music-videos";
import { OfferLink } from "@/components/music-videos/OfferLink";
import { VideoRequestForm } from "@/components/music-videos/VideoRequestForm";
import "./music-videos.css";

export const metadata = buildPageMetadata({
  title: c.title,
  description: c.description,
  path: "/music-videos",
});

export default function MusicVideosPage() {
  return (
    <div className="mv-page">
      <section className="mv-hero">
        <div className="mv-hero-copy">
          <h1>{c.headline}</h1>
          <p>{c.intro}</p>
          <OfferLink
            href="#request"
            event="music_video_cta"
            className="mv-button"
          >
            {c.cta}
          </OfferLink>
          <span className="mv-hint">{c.ctaNote}</span>
        </div>
        <OfferLink
          href={c.films[0].url}
          event="music_video_proof"
          film={c.films[0].id}
          className="mv-hero-film"
        >
          <Image
            src={c.films[0].image}
            alt={c.films[0].alt}
            fill
            sizes="(max-width: 760px) 90vw, 440px"
            priority
          />
          <span className="mv-film-overlay">
            <span>{c.films[0].artist}</span>
            <strong>{c.films[0].title}</strong>
            <span>{c.watch} ↗</span>
          </span>
        </OfferLink>
      </section>

      <section className="mv-section" aria-labelledby="films-title">
        <h2 id="films-title">{c.filmsTitle}</h2>
        <div className="mv-films">
          {c.films.map((f) => (
            <article key={f.id} className="mv-film">
              <OfferLink
                href={f.url}
                event="music_video_proof"
                film={f.id}
                className="mv-poster"
              >
                <Image
                  src={f.image}
                  alt={f.alt}
                  fill
                  sizes="(max-width: 760px) 90vw, 520px"
                />
              </OfferLink>
              <p className="mv-hint">
                {f.artist} · {f.format}
              </p>
              <h3>{f.title}</h3>
              <p>{f.description}</p>
              <OfferLink
                href={f.url}
                event="music_video_proof"
                film={f.id}
                className="mv-text-link"
              >
                {c.watch} ↗
              </OfferLink>
            </article>
          ))}
        </div>
      </section>

      <section className="mv-section mv-offer">
        <div>
          <h2>{c.offerTitle}</h2>
          <p>{c.offerIntro}</p>
          <OfferLink
            href="#request"
            event="music_video_cta"
            className="mv-text-link"
          >
            {c.cta} →
          </OfferLink>
        </div>
        <ul>
          {c.deliverables.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
      </section>
      <section className="mv-section">
        <h2>{c.processTitle}</h2>
        <ol className="mv-process">
          {c.process.map((p, i) => (
            <li key={p.title}>
              <span aria-hidden="true">{i + 1}</span>
              <div>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
      <section className="mv-section mv-request" id="request">
        <div>
          <h2>{c.form.title}</h2>
          <p>{c.form.intro}</p>
        </div>
        <VideoRequestForm />
      </section>
      <section className="mv-section mv-faq" aria-label="Music video questions">
        {c.faq.map((f) => (
          <details key={f.q}>
            <summary>{f.q}</summary>
            <p>{f.a}</p>
          </details>
        ))}
      </section>
    </div>
  );
}
