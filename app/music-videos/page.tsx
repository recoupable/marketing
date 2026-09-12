import { musicVideosCopy as c } from "@/lib/copy/music-videos";
import { withPageMetadata } from "@/lib/seo";
import { OfferLink } from "@/components/music-videos/OfferLink";
import { VideoRequestForm } from "@/components/music-videos/VideoRequestForm";
import { SkyArrow } from "@/components/sky/arrow";
import { PageSection } from "@/components/sky/page-ui";
import "./music-videos.css";

export const metadata = withPageMetadata({ title: c.title, description: c.description, alternates: { canonical: "/music-videos" } });

function OfferActions({ placement }: { placement: "hero" | "skill" | "closing" }) {
  return <div className="mv-actions">
    <OfferLink className="sp-button" href={c.skill.downloadUrl} event="music_video_skill_download_clicked" placement={placement} download>{c.skill.cta}<span><SkyArrow direction="down" /></span></OfferLink>
    <OfferLink className="sp-button sp-button-secondary" href={c.appUrl} event="music_video_app_clicked" placement={placement}>{c.appCta}<span><SkyArrow /></span></OfferLink>
  </div>;
}

function PlayIcon() { return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="m9 5 11 7-11 7V5Z" /></svg>; }

export default function MusicVideosPage() {
  return <div className="sky-subpage mv-page">
    <section className="mv-hero">
      <div className="mv-hero-copy"><p className="sp-kicker">{c.eyebrow}</p><h1>{c.headline[0]}<br /><span>{c.headline[1]}</span></h1><p className="mv-intro">{c.intro}</p><OfferActions placement="hero" /><p className="mv-note">{c.ctaNote}</p><p className="mv-budget-note">{c.priceNote}</p><OfferLink className="mv-text-link" href="#request" event="music_video_cta" placement="hero">{c.serviceLink}<SkyArrow /></OfferLink></div>
      <OfferLink className="mv-hero-film" href={c.films[0].url} event="music_video_proof" film={c.films[0].id} placement="hero">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={c.films[0].image} alt={c.films[0].alt} fetchPriority="high" />
        <span className="mv-film-marker">{c.heroFilmNote}</span><span className="mv-play"><PlayIcon /></span>
        <span className="mv-hero-caption"><span>{c.films[0].artist}</span><strong>{c.films[0].title}</strong><span>{c.watch} <SkyArrow /></span></span>
      </OfferLink>
    </section>

    <PageSection eyebrow={c.filmsEyebrow} title={c.filmsTitle} description={c.filmsIntro} id="films">
      <div className="mv-films" data-reveal-group="">{c.films.map(film => <article className="mv-film" key={film.id}>
        <OfferLink className="mv-film-image" href={film.url} event="music_video_proof" film={film.id}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={film.image} alt={film.alt} loading="lazy" /><span className="mv-play"><PlayIcon /></span><span className="mv-film-duration">{film.format}</span>
        </OfferLink>
        <div className="mv-film-copy"><p className="sp-kicker">{film.artist}</p><h3>{film.title}</h3><p>{film.description}</p><OfferLink className="mv-text-link" href={film.url} event="music_video_proof" film={film.id}>{c.watch}<SkyArrow /></OfferLink></div>
      </article>)}</div>
    </PageSection>

    <section className="mv-skill" id="skill" data-reveal="">
      <div className="mv-skill-copy"><p className="sp-kicker">{c.skill.eyebrow}</p><h2>{c.skill.title}</h2><p>{c.skill.intro}</p><p>{c.skill.explanation}</p><OfferActions placement="skill" /><p className="mv-note">{c.skill.noEmail}</p><a className="mv-text-link" href={c.skill.sourceUrl}>{c.skill.sourceCta}<SkyArrow /></a></div>
      <div className="mv-skill-files"><div className="mv-file-top"><span>↓ .ZIP</span><span>{c.skill.badge}</span></div><h3>{c.skill.name}</h3><p>{c.skill.files}</p><ul>{c.skill.contents.map((item,i)=><li key={item}><span>0{i+1}</span>{item}</li>)}</ul></div>
    </section>

    <PageSection eyebrow={c.processEyebrow} title={c.processTitle} id="process">
      <div className="mv-steps" data-reveal-group="">{c.process.map((step,i)=><article key={step.title}><p className="sp-kicker">STEP 0{i+1}</p><h3>{step.title}</h3><p>{step.text}</p></article>)}</div>
      <aside className="mv-route-note"><strong>{c.routeNote.title}</strong><p>{c.routeNote.text} <OfferLink href="#request" event="music_video_cta">{c.routeNote.cta}</OfferLink>.</p></aside>
    </PageSection>

    <section className="mv-custom" data-reveal=""><div><p className="sp-kicker">{c.offerEyebrow}</p><h2>{c.offerTitle}</h2><p>{c.offerIntro}</p><OfferLink className="sp-button" href="#request" event="music_video_cta">{c.cta}<span><SkyArrow /></span></OfferLink><p className="mv-note">{c.offerNote}</p></div><div className="mv-deliverables"><p className="sp-kicker">WHAT WE DELIVER</p><ul>{c.deliverables.map(item=><li key={item}><span aria-hidden="true">✓</span>{item}</li>)}</ul></div></section>

    <section className="mv-request" id="request"><header><p className="sp-kicker">{c.form.eyebrow}</p><h2>{c.form.title}</h2><p>{c.form.intro}</p><p className="mv-note">{c.offerNote}</p></header><div className="mv-form-panel"><VideoRequestForm /></div></section>
    <PageSection eyebrow="QUESTIONS & ANSWERS" title={c.faqTitle}><div className="mv-faq">{c.faq.map(item=><details key={item.q}><summary>{item.q}<span aria-hidden="true">+</span></summary><p>{item.a}</p></details>)}</div></PageSection>
    <section className="mv-closing" data-reveal=""><p className="sp-kicker">THE MUSIC VIDEO SKILL</p><h2>{c.closing.title}</h2><p>{c.closing.intro}</p><OfferActions placement="closing" /></section>
  </div>;
}
