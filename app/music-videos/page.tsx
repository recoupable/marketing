import Image from "next/image";
import { buildPageMetadata } from "@/lib/seo";
import { musicVideosCopy as c } from "@/lib/copy/music-videos";
import { OfferLink } from "@/components/music-videos/OfferLink";
import { VideoOfferActions } from "@/components/music-videos/VideoOfferActions";
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
          <span className="mv-eyebrow">{c.eyebrow}</span>
          <h1>
            {c.headline[0]}
            <br />
            {c.headline[1]}
          </h1>
          <p>{c.intro}</p>
          <VideoOfferActions placement="hero" />
          <span className="mv-hint">{c.ctaNote}</span>
          <p className="mv-price-note">{c.priceNote}</p>
          <OfferLink
            href="#request"
            event="music_video_cta"
            className="mv-service-link"
          >
            {c.serviceLink} →
          </OfferLink>
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
            <span>
              {c.films[0].artist} · {c.heroFilmNote}
            </span>
            <strong>{c.films[0].title}</strong>
            <span>{c.watch} ↗</span>
          </span>
        </OfferLink>
      </section>

      <section
        className="mv-section mv-skill-section"
        id="skill"
        aria-labelledby="skill-title"
      >
        <div>
          <span className="mv-eyebrow">{c.skill.eyebrow}</span>
          <h2 id="skill-title">{c.skill.title}</h2>
          <p>{c.skill.intro}</p>
          <OfferLink
            href={c.skill.downloadUrl}
            event="music_video_skill_download_clicked"
            placement="skill"
            download
            className="mv-button"
          >
            {c.skill.cta} <span aria-hidden="true">↓</span>
          </OfferLink>
          <p className="mv-download-meta">{c.skill.explanation}</p>
        </div>
        <div className="mv-skill-file">
          <div className="mv-file-heading">
            <span className="mv-file-icon" aria-hidden="true">
              ↳
            </span>
            <div>
              <strong>{c.skill.name}</strong>
              <span>{c.skill.files}</span>
            </div>
            <span className="mv-free-label">{c.skill.badge}</span>
          </div>
          <ul className="mv-file-contents">
            {c.skill.contents.map((item) => (
              <li key={item}>
                <span aria-hidden="true">✓</span>
                {item}
              </li>
            ))}
          </ul>
          <div className="mv-file-footer">
            <a href={c.skill.sourceUrl}>{c.skill.sourceCta} ↗</a>
            <span>{c.skill.noEmail}</span>
          </div>
        </div>
      </section>

      <section className="mv-section" aria-labelledby="films-title">
        <span className="mv-eyebrow">{c.filmsEyebrow}</span>
        <h2 id="films-title">{c.filmsTitle}</h2>
        <p>{c.filmsIntro}</p>
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

      <section className="mv-section">
        <span className="mv-eyebrow">{c.processEyebrow}</span>
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
        <div className="mv-route-note">
          <strong>{c.routeNote.title}</strong>
          <p>
            {c.routeNote.text}{" "}
            <OfferLink href="#request" event="music_video_cta">
              {c.routeNote.cta}
            </OfferLink>
            .
          </p>
        </div>
      </section>
      <section className="mv-section mv-offer">
        <div>
          <span className="mv-eyebrow">{c.offerEyebrow}</span>
          <h2>{c.offerTitle}</h2>
          <p>{c.offerIntro}</p>
          <OfferLink
            href="#request"
            event="music_video_cta"
            className="mv-text-link"
          >
            {c.cta} →
          </OfferLink>
          <p className="mv-download-meta">{c.offerNote}</p>
        </div>
        <ul>
          {c.deliverables.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
      </section>
      <section className="mv-section mv-request" id="request">
        <div>
          <span className="mv-eyebrow">{c.form.eyebrow}</span>
          <h2>{c.form.title}</h2>
          <p>{c.form.intro}</p>
        </div>
        <VideoRequestForm />
      </section>
      <section className="mv-section mv-faq" aria-labelledby="faq-title">
        <h2 id="faq-title">{c.faqTitle}</h2>
        {c.faq.map((f) => (
          <details key={f.q}>
            <summary>{f.q}</summary>
            <p>{f.a}</p>
          </details>
        ))}
      </section>
      <section className="mv-closing">
        <h2>{c.closing.title}</h2>
        <p>{c.closing.intro}</p>
        <VideoOfferActions placement="closing" />
      </section>
    </div>
  );
}
