'use client';
import { useState, useEffect, useRef, useId, Children, isValidElement, type ReactNode, type KeyboardEvent as ReactKeyboardEvent } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { DocPage } from '@/lib/docs';
import { docHref } from '@/lib/docs-paths';
import { SkyArrow } from '@/components/sky/arrow';

export function DocsSidebar({ pages }: {pages: Pick<DocPage,'slug'|'title'|'category'|'group'|'api'|'searchText'>[]}) {
 const pathname=usePathname();
 const [query,setQuery]=useState('');
 const input=useRef<HTMLInputElement>(null);
 const browse=useRef<HTMLButtonElement>(null);
 const navigation=useRef<HTMLDivElement>(null);
 const [open,setOpen]=useState(false);
 const current=pages.find(page=>docHref(page.slug)===pathname);
 const categories=[...new Set(pages.map(page=>page.category))];
 const normalized=query.trim().toLowerCase();
 const score=(page:typeof pages[number])=>page.title.toLowerCase()===normalized?100:page.title.toLowerCase().includes(normalized)?60:page.api?.path.toLowerCase().includes(normalized)?40:normalized.split(/\s+/).filter(word=>page.title.toLowerCase().includes(word)).length*10;
 const results=normalized ? pages.filter(page=>normalized.split(/\s+/).every(word=>page.searchText.toLowerCase().includes(word))).sort((a,b)=>score(b)-score(a)).slice(0,30) : [];
 useEffect(()=>{ const handle=(event:KeyboardEvent)=>{if((event.metaKey||event.ctrlKey)&&event.key==='k'){event.preventDefault();setOpen(true);input.current?.focus();} if(event.key==='Escape'){if(navigation.current?.contains(document.activeElement)){const target=browse.current?.getClientRects().length?browse.current:input.current;target?.focus();}setQuery('');setOpen(false);}};window.addEventListener('keydown',handle);return()=>window.removeEventListener('keydown',handle);},[]);
 function navigate() {setQuery('');setOpen(false);}
 return <aside className={`docs-sidebar${open?' docs-sidebar-open':''}`}>
  <div className="docs-sidebar-heading"><Link href="/docs" onClick={navigate}>Documentation</Link><button ref={browse} type="button" aria-expanded={open} aria-controls="docs-navigation" onClick={()=>setOpen(!open)}>{open?'Close':'Browse'}</button></div>
  <div className="docs-search"><svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="8.5" cy="8.5" r="5.5" stroke="currentColor" strokeWidth="1.5"/><path d="m13 13 4 4" stroke="currentColor" strokeWidth="1.5"/></svg><input ref={input} value={query} onChange={event=>{setQuery(event.target.value);setOpen(true);}} placeholder="Search docs" aria-label="Search documentation"/>{query?<button type="button" className="docs-search-clear" aria-label="Clear documentation search" onClick={()=>{setQuery('');input.current?.focus();}}>Clear</button>:<kbd>⌘ K</kbd>}</div>
  <div ref={navigation} id="docs-navigation" className="docs-navigation">
  {normalized ? <div className="docs-search-results"><p role="status">{results.length ? `${results.length}${results.length===30?'+':''} results`:'No matches. Try an endpoint, tool, or task.'}</p>{results.map(page=><Link key={page.slug} href={docHref(page.slug)} onClick={navigate}><strong>{page.title}</strong><span>{page.category}{page.api ? ` · ${page.api.method} ${page.api.path}`:''}</span></Link>)}</div> : <nav aria-label="Documentation"><Link className="docs-reference-link" href="/docs/api-reference" onClick={navigate} aria-current={pathname==='/docs/api-reference'?'page':undefined}>API overview <span aria-hidden="true"><SkyArrow /></span></Link>{categories.map(category=><details key={`${category}-${current?.category}`} open={category===current?.category || (!current && category==='Quickstart')}><summary>{category}<span aria-hidden="true">+</span></summary><div>{[...new Set(pages.filter(page=>page.category===category).map(page=>page.group))].map(group=><div className="docs-nav-group" key={group}>{group!==category && <p>{group}</p>}{pages.filter(page=>page.category===category && page.group===group).map(page=><Link key={page.slug} href={docHref(page.slug)} aria-current={docHref(page.slug)===pathname?'page':undefined} onClick={navigate}>{page.api && <span className={`docs-method docs-method-${page.api.method.toLowerCase()}`}>{page.api.method}</span>}<span>{page.title.replace('Recoup API Documentation','Introduction')}</span></Link>)}</div>)}</div></details>)}</nav>}
  </div><a className="docs-support" href="mailto:agent@recoupable.dev">Need a hand? Contact support <SkyArrow /></a>
 </aside>;
}
export function DocsCode({children,language='text',label}:{children:string;language?:string;label?:string}) {
 const [copied,setCopied]=useState(false);
 const [failed,setFailed]=useState(false);
 const code=useRef<HTMLElement>(null);
 const viewport=useRef<HTMLPreElement>(null);
 const [overflowing,setOverflowing]=useState(false);
 const hintId=useId();
 useEffect(()=>{
  const element=viewport.current;
  if(!element)return;
  let active=true;
  const measure=()=>{if(active)setOverflowing(element.scrollWidth>element.clientWidth+1);};
  measure();
  void document.fonts.ready.then(measure);
  if(typeof ResizeObserver==='undefined'){
   window.addEventListener('resize',measure);
   return()=>{active=false;window.removeEventListener('resize',measure);};
  }
  const observer=new ResizeObserver(measure);
  observer.observe(element);
  return()=>{active=false;observer.disconnect();};
 },[children]);
 const timeout=useRef<ReturnType<typeof setTimeout> | null>(null);
 useEffect(()=>()=>{if(timeout.current)clearTimeout(timeout.current);},[]);
 async function copy(){
  try{
   await navigator.clipboard.writeText(children);
   setCopied(true);setFailed(false);
   if(timeout.current)clearTimeout(timeout.current);
   timeout.current=setTimeout(()=>setCopied(false),1800);
  }catch{
   setCopied(false);setFailed(true);
   if(code.current){
    const range=document.createRange();range.selectNodeContents(code.current);
    const selection=window.getSelection();selection?.removeAllRanges();selection?.addRange(range);
   }
  }
 }
 return <div className="docs-code">
  <div className="docs-code-heading"><span>{label||language}</span><button type="button" onClick={copy} aria-label={`Copy ${label||language} code`}>{copied?'Copied':'Copy'}</button></div>
  <pre ref={viewport} tabIndex={0} role="region" aria-label={`${label||language} code sample`} aria-describedby={overflowing?hintId:undefined}><code ref={code} className={`language-${language}`}>{children}</code></pre>
  {overflowing&&<p id={hintId} className="docs-code-hint">Scroll sideways to see the full code</p>}
  <p className={failed?'docs-copy-feedback':'docs-sr-only'} role="status">{failed?'Copy wasn’t available. Select the code and use your device’s copy command.':copied?'Code copied.':''}</p>
 </div>;
}
export function DocsCodeGroup({children}:{children:ReactNode}) {
 const blocks=Children.toArray(children).filter(isValidElement);
 const [active,setActive]=useState(0);
 const id=useId();
 const tabs=useRef<(HTMLButtonElement|null)[]>([]);
 function navigate(event:ReactKeyboardEvent<HTMLButtonElement>,index:number){
  const next=event.key==='ArrowRight'?(index+1)%blocks.length
   :event.key==='ArrowLeft'?(index-1+blocks.length)%blocks.length
    :event.key==='Home'?0:event.key==='End'?blocks.length-1:undefined;
  if(next===undefined)return;
  event.preventDefault();setActive(next);tabs.current[next]?.focus();
 }
 return <div className="docs-code-group">
  <div className="docs-code-tabs" role="tablist" aria-label="Code language">{blocks.map((block,index)=>{
   const props=block.props as {language?:string;children?:{props?:{className?:string}}};
   const language=props.language || props.children?.props?.className?.replace('language-','') || `Example ${index+1}`;
   return <button key={index} id={`${id}-tab-${index}`} ref={element=>{tabs.current[index]=element;}} type="button" role="tab" aria-selected={index===active} aria-controls={`${id}-panel`} tabIndex={index===active?0:-1} onClick={()=>setActive(index)} onKeyDown={event=>navigate(event,index)}>{language}</button>;
  })}</div>
  <div key={active} id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${active}`}>{blocks[active]}</div>
 </div>;
}

export function DocsTable({children,label='Documentation table'}:{children:ReactNode;label?:string}) {
 const region=useRef<HTMLDivElement>(null);
 const [overflowing,setOverflowing]=useState(false);
 const hintId=useId();
 useEffect(()=>{
  const element=region.current;
  if(!element)return;
  const measure=()=>setOverflowing(element.scrollWidth>element.clientWidth);
  measure();
  if(typeof ResizeObserver==='undefined'){
   window.addEventListener('resize',measure);
   return()=>window.removeEventListener('resize',measure);
  }
  const observer=new ResizeObserver(measure);
  observer.observe(element);
  const table=element.querySelector('table');
  if(table)observer.observe(table);
  return()=>observer.disconnect();
 },[children]);
 return <div className="docs-table-container">
  <div ref={region} className="docs-table-scroll" tabIndex={0} role="region" aria-label={label} aria-describedby={overflowing?hintId:undefined}>{children}</div>
  {overflowing&&<p id={hintId} className="docs-table-hint">Scroll to see all columns</p>}
 </div>;
}
