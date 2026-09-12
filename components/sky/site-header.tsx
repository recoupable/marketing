"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { SkyArrow } from "@/components/sky/arrow";
import { PageMark } from "./brand";
import { NavigationIcon } from "./navigation-icon";

const tools = [{name:"Skills",href:"/skills",note:"Music playbooks for your AI."},{name:"Platform",href:"/platform",note:"Your artists and work in one place."},{name:"Developers",href:"/developers",note:"API, MCP, and CLI."}];
export function SkySiteHeader({ tone = "paper" }: { tone?: "paper" | "sky" }) {
  const pathname = usePathname();
  const header = useRef<HTMLElement>(null);
  function close() { header.current?.querySelectorAll<HTMLDetailsElement>("details[open]").forEach(menu=>{menu.open=false;}); }
  useEffect(()=>{
    function dismiss(event: PointerEvent | KeyboardEvent) {
      if (event instanceof KeyboardEvent && event.key !== "Escape") return;
      for (const menu of header.current?.querySelectorAll<HTMLDetailsElement>("details[open]") ?? []) {
        if (event instanceof PointerEvent && event.target instanceof Node && menu.contains(event.target)) continue;
        menu.open=false;
        if (event instanceof KeyboardEvent) menu.querySelector("summary")?.focus();
      }
    }
    document.addEventListener("pointerdown",dismiss); document.addEventListener("keydown",dismiss);
    return ()=>{document.removeEventListener("pointerdown",dismiss);document.removeEventListener("keydown",dismiss);};
  },[]);
  return <header ref={header} className="ss-header" data-tone={tone}>
    <details className="ss-mobile-menu"><summary aria-label="Navigation"><NavigationIcon /></summary><nav aria-label="Mobile navigation" onClick={close}><Link href="/services">Services</Link><Link href="/case-studies" aria-current={pathname.startsWith('/case-studies')?'page':undefined}>Work</Link><Link href="/pricing" aria-current={pathname==='/pricing'?'page':undefined}>Pricing</Link>{tools.map(item=><Link key={item.href} href={item.href} aria-current={pathname===item.href?'page':undefined}>{item.name}</Link>)}<Link href="/docs">Docs</Link><Link href="/about">About</Link><Link href="/blog">Blog</Link><Link href="/resources">Resources</Link><Link href="/lab">Lab</Link><Link href="/start-project">Get a Free Audit <SkyArrow /></Link></nav></details>
    <Link href="/" className="ss-wordmark" aria-label="Recoup home"><PageMark /><span>Recoup</span></Link>
    <nav className="ss-desktop-nav" aria-label="Main navigation">
      <Link href="/services" aria-current={pathname==='/services'?'page':undefined}>Services</Link>
      <Link href="/case-studies" aria-current={pathname.startsWith('/case-studies')?'page':undefined}>Work</Link>
      <Link href="/pricing" aria-current={pathname==='/pricing'?'page':undefined}>Pricing</Link>
      <details className="ss-tool-menu"><summary>Tools <svg className="ss-tool-chevron" width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m3 6 5 5 5-5" /></svg></summary><div onClick={close}>{tools.map(item=><Link key={item.href} href={item.href} aria-current={pathname===item.href?'page':undefined}><strong>{item.name}</strong><span>{item.note}</span></Link>)}</div></details>
      <Link href="/docs" aria-current={pathname.startsWith('/docs')?'page':undefined}>Docs</Link>
      <Link href="/about" aria-current={pathname==='/about'?'page':undefined}>About</Link>
      <Link href="/blog" aria-current={pathname.startsWith('/blog')?'page':undefined}>Blog</Link>
    </nav>
    <Link href="/start-project" className="ss-contact"><span className="nav-cta-desktop">Get a Free Audit</span><span className="nav-cta-mobile">Free Audit</span><SkyArrow /></Link>

  </header>;
}
