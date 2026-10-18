import Link from "next/link";
import { homeHeroCopy } from "@/lib/copy/home-hero";
import { catalogDemo } from "@/lib/catalog-demo/catalogDemo";
import { formatRoyaltyExampleMoney, royaltyExample } from "@/lib/sky-royalty-example";
import { SkyArrow } from "@/components/sky/arrow";
import "./sky-hero-cards.css";

const cards = homeHeroCopy.cards;

function FileIcon({ grid = false }: { grid?: boolean }) {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9l-6-6Z" /><path d="M14 3v6h6" />{grid ? <path d="M8 13h8M8 17h8M12 13v4" /> : <path d="M8 13h5M8 17h8" />}</svg>;
}

function CheckIcon() {
  return <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m4 8 2.5 2.5L12 5" /></svg>;
}

function SkillsIcon() {
  return <svg width="44" height="44" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" aria-hidden="true"><path d="M24 3v42M3 24h42M9.15 9.15l29.7 29.7M9.15 38.85l29.7-29.7" /><circle cx="24" cy="24" r="5" fill="currentColor" stroke="none" /></svg>;
}

function AlbumArt({ index }: { index: number }) {
  return <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true" className={`sky-card-album sky-card-album-${index}`}>
    <rect width="36" height="36" rx="7" fill="currentColor" />
    {index === 0 ? <><circle cx="18" cy="18" r="13" fill="#148AB1" /><circle cx="18" cy="18" r="8" stroke="#91DFFF" strokeWidth=".7" /><circle cx="18" cy="18" r="3" fill="#07416B" /></> : index === 1 ? <><path d="M0 25 36 5v31H0Z" fill="#D27B2C" /><circle cx="21" cy="15" r="9" fill="#FFE0A0" /><path d="M0 29 36 9" stroke="#F9BC60" /></> : <><circle cx="12" cy="19" r="12" fill="#788D65" /><circle cx="22" cy="15" r="11" fill="#A8C38D" /><circle cx="23" cy="15" r="7" stroke="#E0EBD1" strokeWidth=".8" /></>}
  </svg>;
}

export function SkyHeroCards() {
  return (
    <div className="sky-float-gallery" aria-label={cards.title}>
      <div className="sky-panel-stage" data-reveal-group="">
        <div className="sky-flight sky-flight-data">
          <a href={cards.data.href} className="sky-float-panel sky-card-data" aria-label="Explore custom systems that connect your files and data">
            <span className="sky-card-title">{cards.data.title[0]}<br />{cards.data.title[1]}</span>
            <svg className="sky-card-connections" viewBox="0 0 210 278" fill="none" aria-hidden="true"><path d="M231 21C162 38 171 90 111 116S27 175 35 217M246 57C192 88 196 117 145 159S115 236 81 283M263 100C225 115 221 164 178 198S178 271 166 299" stroke="white" strokeOpacity=".7" strokeWidth="1" /></svg>
            <span className="sky-card-file sky-card-file-first"><span className="sky-card-file-icon"><FileIcon grid /></span><span>{cards.data.files[0]}</span><span className="sky-card-file-check"><CheckIcon /></span></span>
            <span className="sky-card-data-hub" aria-hidden="true"><svg width="19" height="22" viewBox="48 41 127 141" fill="currentColor"><path d="M118.106 41C112.845 41 108.581 45.2558 108.581 50.5056V88.3242C108.581 93.9241 106.846 99.3868 103.613 103.964C98.5169 111.179 90.2239 115.471 81.3785 115.471H57.525C52.2645 115.471 48 119.727 48 124.977V172.304C48 177.554 52.2645 181.81 57.525 181.81H104.894C110.155 181.81 114.419 177.554 114.419 172.304V139.968C114.419 133.432 116.445 127.056 120.218 121.714L120.885 120.77C126.833 112.348 136.512 107.339 146.836 107.339H165.475C170.736 107.339 175 103.083 175 97.833V50.5056C175 45.2558 170.736 41 165.475 41H118.106Z" /></svg></span>
            <span className="sky-card-file sky-card-file-second"><span className="sky-card-file-icon"><FileIcon /></span><span>{cards.data.files[1]}</span><span className="sky-card-file-check"><CheckIcon /></span></span>
            <span className="sky-card-data-caption">{cards.data.caption}</span>
          </a>
        </div>

        <div className="sky-flight sky-flight-report">
          <a href={cards.royalty.href} className="sky-float-panel sky-card-report" aria-label="Explore royalty reporting">
            <span className="sky-card-report-header"><span>{cards.royalty.title}<small>{cards.royalty.period}</small></span><SkyArrow /></span>
            <strong className="sky-card-report-total">{formatRoyaltyExampleMoney(royaltyExample.statementCents)}</strong>
            <span className="sky-card-report-total-label">{cards.royalty.total}</span>
            <span className="sky-card-report-pair"><span>{cards.royalty.statements}</span><b>{formatRoyaltyExampleMoney(royaltyExample.statementCents)}</b></span>
            <span className="sky-card-report-bar" aria-hidden="true"><span /></span>
            <span className="sky-card-report-pair"><span>{cards.royalty.receipts}</span><b>{formatRoyaltyExampleMoney(royaltyExample.receiptCents)}</b></span>
            <span className="sky-card-report-bar sky-card-report-bar-receipts" aria-hidden="true"><span /></span>
            <span className="sky-card-report-alert"><span>{royaltyExample.exceptionCount}</span> {cards.royalty.differences} <SkyArrow direction="right" /></span>
          </a>
        </div>

        <div className="sky-flight sky-flight-build">
          <a href={cards.build.href} className="sky-float-panel sky-card-build" aria-label="See Recoup's AI strategy, custom systems, and team training">
            <span className="sky-card-build-plus" aria-hidden="true"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M12 4v16M4 12h16" /></svg></span>
            <strong>{cards.build.title[0]}<br />{cards.build.title[1]}</strong>
            <span className="sky-card-build-caption">{cards.build.caption}</span>
            <span className="sky-card-build-tags">{cards.build.tags.map(tag => <span key={tag}>{tag}</span>)}</span>
          </a>
        </div>

        <div className="sky-flight sky-flight-review">
          <a href={cards.investment.href} className="sky-float-panel sky-card-review" aria-label="Explore investment review">
            <span className="sky-card-heading">{cards.investment.title} <SkyArrow /></span>
            <span className="sky-card-review-model"><small>{cards.investment.assumption}</small><strong>{cards.investment.share}<span>%</span></strong><span>{cards.investment.shareLabel}</span></span>
            <span className="sky-card-review-files"><span><FileIcon grid />{cards.investment.files[0]}<CheckIcon /></span><span><FileIcon />{cards.investment.files[1]}<span className="sky-card-review-status" /></span></span>
            <span className="sky-card-review-question">{cards.investment.question}</span>
          </a>
        </div>

        <div className="sky-flight sky-flight-skills">
          <Link href={cards.skills.href} className="sky-float-panel sky-card-skills">
            <span className="sky-card-heading">{cards.skills.label} <SkyArrow /></span>
            <span className="sky-card-skills-symbol"><SkillsIcon /></span>
            <strong>{cards.skills.title[0]}<br /><span>{cards.skills.title[1]}</span></strong>
            <span className="sky-card-skills-caption">{cards.skills.caption}</span>
            <span className="sky-card-skills-tags">{cards.skills.tags.map(tag => <span key={tag}>{tag}</span>)}</span>
          </Link>
        </div>

        <div className="sky-flight sky-flight-catalog">
          <a href={cards.catalog.href} className="sky-float-panel sky-card-catalog" aria-label="Explore tools for your artists and catalog">
            <span className="sky-card-heading">{cards.catalog.title} <SkyArrow /></span>
            <span className="sky-card-catalog-search"><svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true"><circle cx="8" cy="8" r="5" /><path d="m12 12 5 5" /></svg>{cards.catalog.search}</span>
            <span className="sky-card-track-list">{catalogDemo.catalog.slice(0, 3).map((track, index) => <span key={track.entryId} className="sky-card-track"><AlbumArt index={index} /><span><strong>{track.title}</strong><small>{track.artist}</small></span></span>)}</span>
            <span className="sky-card-catalog-caption">{cards.catalog.caption}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
