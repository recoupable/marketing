import { createProcessor } from '@mdx-js/mdx';
import { createElement, Fragment, type ReactNode } from 'react';

const markdown = createProcessor({ format: 'md' });

type MarkdownNode = {
 type: string;
 value?: string;
 url?: string;
 children?: MarkdownNode[];
 position?: { start: { offset?: number }; end: { offset?: number } };
};
type RenderLink = (href: string, children: ReactNode, key: number) => ReactNode;

export function renderDescriptionInline(text: string, renderLink: RenderLink): ReactNode {
 function render(node: MarkdownNode, key: number): ReactNode {
  if(node.type==='text')return node.value;
  if(node.type==='inlineCode')return createElement('code',{key},node.value);
  if(node.type==='strong'||node.type==='emphasis')return createElement(node.type==='strong'?'strong':'em',{key},node.children?.map(render));
  if(node.type==='link')return renderLink(node.url||'',node.children?.map(render),key);
  if(node.type==='break')return createElement('br',{key});

  // Keep the existing paragraph/table layout and source punctuation for blocks.
  // Only inline nodes become elements; plain Markdown is parsed, never executed.
  if(node.children){
   const children:ReactNode[]=[];
   let offset=node.position?.start.offset??0;
   for(const [index,child] of node.children.entries()){
    const start=child.position?.start.offset??offset;
    children.push(text.slice(offset,start),render(child,index));
    offset=child.position?.end.offset??start;
   }
   children.push(text.slice(offset,node.position?.end.offset??offset));
   return createElement(Fragment,{key},children);
  }
  return text.slice(node.position?.start.offset??0,node.position?.end.offset??0);
 }
 return render(markdown.parse(text),0);
}
