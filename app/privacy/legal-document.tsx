import type { ReactNode } from "react";
import Link from "next/link";
import "./legal.css";

export function LegalDocument({ title, updated, sections, children }: {
  title: string;
  updated?: string;
  sections: readonly { id: string; title: string }[];
  children: ReactNode;
}) {
  return <div className="sky-legal">
    <header className="sky-legal-heading">
      <p className="sky-legal-eyebrow">RECOUP / LEGAL</p>
      <h1>{title}</h1>
      {updated && <p className="sky-legal-date">Last updated: {updated}</p>}
      <nav aria-label="Legal pages"><Link href="/privacy" aria-current={title === "Privacy Policy" ? "page" : undefined}>Privacy Policy</Link><Link href="/terms" aria-current={title === "Terms of Use" ? "page" : undefined}>Terms of Use</Link></nav>
    </header>
    <div className="sky-legal-layout">
      <aside className="sky-legal-index"><p>ON THIS PAGE</p><nav aria-label="On this page">{sections.map(({ id, title: sectionTitle }) => <a href={`#${id}`} key={id}>{sectionTitle}</a>)}</nav></aside>
      <details className="sky-legal-mobile-index"><summary>On this page</summary><nav aria-label="On this page">{sections.map(({ id, title: sectionTitle }) => <a href={`#${id}`} key={id}>{sectionTitle}</a>)}</nav></details>
      <article className="sky-legal-prose">{children}</article>
    </div>
  </div>;
}
