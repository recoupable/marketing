import { SkyArrow } from '@/components/sky/arrow';
import Link from 'next/link';
import { Children, isValidElement, type ReactNode, type ComponentProps } from 'react';
import { runSync } from '@mdx-js/mdx';
import * as runtime from 'react/jsx-runtime';
import { headingId, resolveDocsHref } from '@/lib/docs-paths';
import { DocsCode, DocsCodeGroup, DocsTable } from './docs-interactive';
import { renderDescriptionInline } from './description-inline';

function textContent(node: ReactNode): string {
 if(typeof node==='string'||typeof node==='number')return String(node);
 if(isValidElement<{children?:ReactNode}>(node))return textContent(node.props.children);
 return Children.toArray(node).map(textContent).join('');
}
function Callout({children,tone}:{children:ReactNode;tone:string}) {return <aside className={`docs-callout docs-callout-${tone.toLowerCase()}`}><span>{tone}</span><div>{children}</div></aside>;}
const components={
 h2:({children,id}:ComponentProps<'h2'>)=><h2 id={id||headingId(textContent(children))}>{children}</h2>,
 h3:({children,id}:ComponentProps<'h3'>)=><h3 id={id||headingId(textContent(children))}>{children}</h3>,
 a:({href,children,...props}:ComponentProps<'a'>)=><Link href={resolveDocsHref(href)} {...props}>{children}</Link>,
 pre:({children}:ComponentProps<'pre'>)=>{const child=isValidElement<{className?:string;children?:ReactNode}>(children)?children:null;return <DocsCode language={child?.props.className?.replace('language-','')||'text'}>{textContent(child?.props.children??children).replace(/\n$/,'')}</DocsCode>;},
 table:({children}:ComponentProps<'table'>)=><DocsTable><table>{children}</table></DocsTable>,
 Card:({title,href,children}:{title:string;href:string;children:ReactNode})=><div className="docs-card"><Link className="docs-card-title" href={resolveDocsHref(href)}><strong>{title}</strong><span aria-hidden="true"><SkyArrow /></span></Link><div>{children}</div></div>,
 CardGroup:({children}:{children:ReactNode})=><div className="docs-cards">{children}</div>,
 CodeGroup:DocsCodeGroup,
 Note:({children}:{children:ReactNode})=><Callout tone="Note">{children}</Callout>,
 Info:({children}:{children:ReactNode})=><Callout tone="Info">{children}</Callout>,
 Tip:({children}:{children:ReactNode})=><Callout tone="Tip">{children}</Callout>,
 Warning:({children}:{children:ReactNode})=><Callout tone="Warning">{children}</Callout>,
};
export function DocsContent({compiled}:{compiled:string}) {
 // Only source checked by build-docs.mjs is compiled: executable expressions and imports are rejected there.
 const {default:Content}=runSync(compiled,{...runtime,baseUrl:import.meta.url});
 return <div className="docs-prose"><Content components={components}/></div>;
}
function descriptionInline(text: string) {
 return renderDescriptionInline(text,(href,children,key)=><Link key={key} href={resolveDocsHref(href)}>{children}</Link>);
}

export function DocInlineDescription({text}:{text:string}) {
 return <>{descriptionInline(text)}</>;
}

export function DocDescription({text}:{text?:string}) {
 if(!text)return null;
 const lines=text.split('\n');
 const blocks:ReactNode[]=[];
 const cells=(line:string)=>line.trim().replace(/^\||\|$/g,'').split('|').map(cell=>cell.trim());
 const isTable=(index:number)=>lines[index]?.trim().startsWith('|') && lines[index+1]?.trim().startsWith('|') && cells(lines[index+1]).every(cell=>/^:?-{3,}:?$/.test(cell));
 for(let i=0;i<lines.length;){
  if(!lines[i].trim()){i++;continue;}
  const key=i;
  if(isTable(i)){
   const headings=cells(lines[i]);
   const rows:string[][]=[];
   i+=2;
   while(i<lines.length&&lines[i].trim().startsWith('|')){rows.push(cells(lines[i]));i++;}
   blocks.push(<DocsTable key={key} label="API reference table"><table><thead><tr>{headings.map((heading,index)=><th key={index} scope="col">{descriptionInline(heading)}</th>)}</tr></thead><tbody>{rows.map((row,index)=><tr key={index}>{row.map((cell,cellIndex)=><td key={cellIndex}>{descriptionInline(cell)}</td>)}</tr>)}</tbody></table></DocsTable>);
  }else{
   const paragraph=[lines[i++]];
   while(i<lines.length&&lines[i].trim()&&!isTable(i)){paragraph.push(lines[i++]);}
   blocks.push(<p key={key}>{descriptionInline(paragraph.join('\n'))}</p>);
  }
 }
 return <div className="docs-description">{blocks}</div>;
}
