import { readFileSync } from 'node:fs';
import { test, expect } from 'vitest';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { renderDescriptionInline } from '../components/docs/description-inline.ts';
import { resolveDocsHref } from '../lib/docs-paths.ts';

function render(text:string){
 return renderToStaticMarkup(createElement('p',null,renderDescriptionInline(text,(href,children,key)=>createElement('a',{key,href:resolveDocsHref(href)},children))));
}
function description(spec:string,path:string,method:string){
 const source=JSON.parse(readFileSync(new URL(`../content/docs/source/api-reference/openapi/${spec}.json`,import.meta.url),'utf8'));
 return source.paths[path][method].description as string;
}

test('sandbox file descriptions render inline code inside strong text',()=>{
 const html=render(description('content','/api/sandboxes/file','get'));
 expect(html).toMatch(/<strong>Text files are returned verbatim\. Binary files \(<code>\.mp3<\/code>, <code>\.png<\/code>, <code>\.jpg<\/code>, <code>\.mp4<\/code>, <code>\.pdf<\/code>, etc\.\)/);
 expect(!html.includes('`')).toBeTruthy();
 expect(html.includes('href="/docs/api-reference/sandboxes/list"')).toBeTruthy();
});

test('credits descriptions decode escaped currency without changing monetary values or list labels',()=>{
 const html=render(description('accounts','/api/credits/sessions','post'));
 expect(html.includes('<strong>Credits are integer micro-dollars (1,000,000 = $1.00')).toBeTruthy();
 for(const amount of ['$0.30','$103.30','$100.00','$3.30'])expect(html.includes(amount), amount).toBeTruthy();
 expect(!html.includes('\\$')).toBeTruthy();
 expect(html.includes('- <strong>Auto-charged</strong>')).toBeTruthy();
 expect(html.includes('- <strong>Checkout required</strong>')).toBeTruthy();
 expect(html.includes('<code>{ paymentIntentId, creditsPurchased, totalCents }</code>')).toBeTruthy();
});

test('run-status descriptions render emphasis and preserve nested linked endpoint code',()=>{
 const html=render(description('research','/api/chat/runs/{runId}','get'));
 expect(html.includes('poll <em>this</em> to know <strong>whether</strong>')).toBeTruthy();
 expect(html.includes('<a href="/docs/api-reference/chat/runs"><code>POST /api/chat/runs</code></a>')).toBeTruthy();
 expect(!html.includes('*this*')).toBeTruthy();
});

test('nested formatting remains semantic while code, escaped markers and raw HTML stay literal',()=>{
 const html=render('**Use `file.png` with *care* and [the `API`](/quickstart).** `**literal** and \\$1` \\*literal\\* <script>alert(1)</script>');
 expect(html.includes('<strong>Use <code>file.png</code> with <em>care</em> and <a href="/docs/quickstart">the <code>API</code></a>.</strong>')).toBeTruthy();
 expect(html.includes('<code>**literal** and \\$1</code>')).toBeTruthy();
 expect(html.includes('*literal* &lt;script&gt;alert(1)&lt;/script&gt;')).toBeTruthy();
 expect(!html.includes('<script>')).toBeTruthy();
});

test('unclosed formatting does not remove literal text',()=>{
 expect(render('Use `unfinished and **unfinished')).toBe('<p>Use `unfinished and **unfinished</p>');
});
