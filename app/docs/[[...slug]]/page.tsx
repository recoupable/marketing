import { SkyArrow } from '@/components/sky/arrow';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { docs, docHref, type DocPage } from '@/lib/docs';
import { documentationJsonLd, documentationMetadata } from '@/lib/editorial-seo';
import { siteConfig } from "@/lib/config";
import { DocsSidebar } from '@/components/docs/docs-interactive';
import { DocsContent } from '@/components/docs/docs-content';
import { ApiReference } from '@/components/docs/api-reference';
import { getDocSpec, resolveReference } from '@/lib/docs-server';
import '../docs.css';
import './docs-mobile-toc.css';

type Props={params:Promise<{slug?:string[]}>};
export const dynamicParams = false;
export function generateStaticParams(){return [{slug:[]},{slug:['api-reference']},...docs.filter(page=>page.slug).map(page=>({slug:page.slug.split('/')}))];}
export async function generateMetadata({params}:Props):Promise<Metadata>{const {slug=[]}=await params;const key=slug.join('/');const page=docs.find(item=>item.slug===key);if(!page&&key!=='api-reference')notFound();return documentationMetadata(page,key,siteConfig.url);}
type DocHeading={id:string;title:string};
const apiCategories=[...new Set(docs.filter(page=>page.api).map(page=>page.category))];
const categoryId=(category:string)=>category.toLowerCase().replace(/[^a-z]+/g,'-');
function MobileToc({headings}:{headings:DocHeading[]}) {
 if(!headings.length)return null;
 return <details className="docs-mobile-toc"><summary>On this page <SkyArrow direction="down" /></summary><nav aria-label="Page sections">{headings.map(heading=><a key={heading.id} href={`#${heading.id}`}>{heading.title}</a>)}</nav></details>;
}
function ApiOverview({headings}:{headings:DocHeading[]}){const categories=apiCategories;return <><header className="docs-article-header"><p className="docs-eyebrow">BUILD WITH RECOUP</p><h1>The Recoup API.</h1><p>Artist data, research, content creation, and the tools to connect them. Find the endpoint you need and start building.</p><div className="docs-overview-actions"><Link href="/docs/quickstart">Make your first request <span aria-hidden="true"><SkyArrow /></span></Link><Link href="/docs/authentication">Authentication</Link></div></header><MobileToc headings={headings}/><div className="docs-api-overview">{categories.map(category=><section key={category} id={categoryId(category)}><h2>{category}</h2><div>{docs.filter(page=>page.api&&page.category===category).map(page=><Link href={docHref(page.slug)} key={page.slug}><span className={`docs-method docs-method-${page.api!.method.toLowerCase()}`}>{page.api!.method}</span><strong>{page.title}</strong><code>{page.api!.path}</code><span aria-hidden="true"><SkyArrow /></span></Link>)}</div></section>)}</div></>;}
async function pageHeadings(page?:DocPage):Promise<DocHeading[]> {
 if(!page)return apiCategories.map(category=>({id:categoryId(category),title:category}));
 const headings=[...page.headings];
 if(page.api?.spec){
  const spec=await getDocSpec(page.api.spec);
  const pathItem=spec.paths[page.api.path]||{};
  const operation=pathItem[page.api.method.toLowerCase()];
  if(operation){
   const parameters=[...(pathItem.parameters||[]),...(operation.parameters||[])];
   const body=resolveReference(operation.requestBody,spec);
   headings.unshift(
    {id:'authentication',title:'Authentication'},
    {id:'request-example',title:'Request'},
    ...(parameters.length?[{id:'parameters',title:'Parameters'}]:[]),
    ...(body.content?[{id:'request-body',title:'Request body'}]:[]),
    {id:'responses',title:'Responses'},
    {id:'specification',title:'Full specification'},
   );
  }
 }
 return headings.filter((heading,index)=>headings.findIndex(item=>item.id===heading.id)===index);
}
function Toc({page,headings}:{page:DocPage;headings:DocHeading[]}) {
 return <aside className="docs-toc"><p>ON THIS PAGE</p><nav aria-label="On this page">{headings.map((heading,index)=><a key={`${heading.id}-${index}`} href={`#${heading.id}`}>{heading.title}</a>)}</nav><div className="docs-toc-help"><span>Building something?</span><Link href="https://chat.recoupable.dev/keys">Get an API key <SkyArrow /></Link><Link href={`/docs/raw/${page.slug||'index'}.md`}>Read as Markdown <SkyArrow /></Link></div></aside>;
}
export default async function Documentation({params}:Props){const {slug=[]}=await params;const key=slug.join('/');const page=docs.find(item=>item.slug===key);const overview=key==='api-reference';if(!page&&!overview)notFound();const index=page?docs.indexOf(page):-1;const previous=index>0?docs[index-1]:null;const next=index>=0?docs[index+1]:null;const headings=await pageHeadings(page);
 return <div className="docs-layout"><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(documentationJsonLd(page,key,siteConfig.url)).replace(/</g,"\\u003c")}}/><DocsSidebar pages={docs.map(({slug,title,category,group,api,searchText})=>({slug,title,category,group,api,searchText}))}/><div className="docs-reading-area"><article className="docs-article">{overview?<ApiOverview headings={headings}/>:page&&<><nav className="docs-breadcrumb" aria-label="Breadcrumb"><Link href="/docs">Docs</Link>{page.api&&<><span aria-hidden="true">/</span><Link href="/docs/api-reference">API reference</Link></>}{page.slug&&<><span aria-hidden="true">/</span><span aria-current="page">{page.title}</span></>}</nav><header className={`docs-article-header${!page.slug?' docs-article-intro':''}`}><p className="docs-eyebrow">{page.api?'API REFERENCE':page.group}</p><h1>{!page.slug?'Build with Recoup.':page.title}</h1><p>{!page.slug?'Connect your music, your tools, and your AI. Guides and API documentation to help you get started.':page.api?undefined:page.description}</p>{!page.slug&&<div className="docs-overview-actions"><Link href="/docs/quickstart">Start building <span aria-hidden="true"><SkyArrow /></span></Link><Link href="/docs/api-reference">Explore the API</Link></div>}</header><MobileToc headings={headings}/>{page.api&&<ApiReference page={page}/>} {page.compiled&&<DocsContent compiled={page.compiled}/>}<nav className="docs-pagination" aria-label="Documentation pages">{previous?<Link href={docHref(previous.slug)}><span className="docs-pagination-label"><SkyArrow direction="left" /> Previous</span><strong>{previous.title}</strong></Link>:<span/>}{next&&<Link href={docHref(next.slug)}><span className="docs-pagination-label">Next <SkyArrow direction="right" /></span><strong>{next.title}</strong></Link>}</nav></>}</article>{page&&<Toc page={page} headings={headings}/>}</div></div>;
}
