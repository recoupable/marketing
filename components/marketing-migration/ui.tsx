import Link from "next/link";
import type { ReactNode } from "react";
import { PageButton, PageCTA, PageHero, PageSection } from "@/components/sky/page-ui";
import { SkyArrow } from "@/components/sky/arrow";
import "./marketing.css";

export { PageButton, PageCTA, PageHero, PageSection };

export function MarketingPage({ children }: { children: ReactNode }) {
  return <div className="sky-subpage marketing-page">{children}</div>;
}

export function WorkCard({ number, title, description, items, href, label }: { number: string; title: string; description: string; items?: readonly string[]; href?: string; label?: string }) {
  return <article className="sp-card mm-work-card"><span className="mm-number">{number}</span><h3>{title}</h3><p>{description}</p>{items && <ul className="mm-checklist">{items.map(item => <li key={item}>{item}</li>)}</ul>}{href && <Link className="sp-text-link" href={href}>{label ?? "Explore"}<SkyArrow /></Link>}</article>;
}

export function BriefVisual({ label, title, items, footnote }: { label: string; title: ReactNode; items: readonly string[]; footnote: string }) {
  return <div className="mm-brief-scene" aria-hidden="true"><div className="mm-brief-shadow" /><div className="mm-brief-sheet"><span className="sp-kicker">{label}</span><strong>{title}</strong><ul>{items.map((item,index) => <li key={item}><span>0{index+1}</span>{item}</li>)}</ul><div className="mm-brief-footnote"><span />{footnote}</div></div></div>;
}

export function MarketingFAQ({ items }: { items: readonly { question: string; answer: string }[] }) {
  return <div className="faq-list mm-faq">{items.map(item => <details key={item.question}><summary>{item.question}<span aria-hidden="true">+</span></summary><p>{item.answer}</p></details>)}<Link className="sp-text-link" href="/ask">Have another question? Ask Recoup <SkyArrow /></Link></div>;
}
