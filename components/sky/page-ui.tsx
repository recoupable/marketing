import type { ReactNode } from "react";
import Link from "next/link";
import { SkyArrow } from "@/components/sky/arrow";
export { PageMark } from "./brand";

export function PageButton({ href, children, secondary = false }: { href: string; children: ReactNode; secondary?: boolean }) {
  return <Link href={href} className={`sp-button${secondary ? " sp-button-secondary" : ""}`}>{children}<span><SkyArrow /></span></Link>;
}

export function PageHero({ eyebrow, title, description, children, visual, tone = "blue" }: { eyebrow: string; title: ReactNode; description: string; children?: ReactNode; visual?: ReactNode; tone?: "blue" | "light" }) {
  return <section className={`sp-hero sp-hero-${tone}${visual ? " sp-hero-split" : ""}`}>
    <div className="sp-hero-copy"><p className="sp-kicker"><span />{eyebrow}</p><h1>{title}</h1><p className="sp-hero-description">{description}</p>{children && <div className="sp-hero-actions">{children}</div>}</div>
    {visual && <div className="sp-hero-visual">{visual}</div>}
  </section>;
}

export function PageSection({ eyebrow, title, description, children, className = "", id }: { eyebrow?: string; title?: ReactNode; description?: string; children: ReactNode; className?: string; id?: string }) {
  return <section id={id} className={`sp-section ${className}`}>
    {(eyebrow || title || description) && <header className="sp-section-heading" data-reveal="">{eyebrow && <p className="sp-kicker">{eyebrow}</p>}{title && <h2>{title}</h2>}{description && <p>{description}</p>}</header>}
    {children}
  </section>;
}

export function PageCTA({ title, description, href = "/start-project", label = href.startsWith("/start-project") ? "Get a Free Audit" : "Discuss your project" }: { title: string; description: string; href?: string; label?: string }) {
  return <section className="sp-cta"><div data-reveal=""><p className="sp-kicker">LET’S PUT AI TO WORK</p><h2>{title}</h2><p>{description}</p><PageButton href={href}>{label}</PageButton></div></section>;
}
