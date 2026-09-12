import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
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
 assert.match(html,/<strong>Text files are returned verbatim\. Binary files \(<code>\.mp3<\/code>, <code>\.png<\/code>, <code>\.jpg<\/code>, <code>\.mp4<\/code>, <code>\.pdf<\/code>, etc\.\)/);
 assert.ok(!html.includes('`'));
 assert.ok(html.includes('href="/docs/api-reference/sandboxes/list"'));
});

test('credits descriptions decode escaped currency without changing monetary values or list labels',()=>{
 const html=render(description('accounts','/api/credits/sessions','post'));
 assert.ok(html.includes('<strong>Credits are integer micro-dollars (1,000,000 = $1.00'));
 for(const amount of ['$0.30','$103.30','$100.00','$3.30'])assert.ok(html.includes(amount),amount);
 assert.ok(!html.includes('\\$'));
 assert.ok(html.includes('- <strong>Auto-charged</strong>'));
 assert.ok(html.includes('- <strong>Checkout required</strong>'));
 assert.ok(html.includes('<code>{ paymentIntentId, creditsPurchased, totalCents }</code>'));
});

test('run-status descriptions render emphasis and preserve nested linked endpoint code',()=>{
 const html=render(description('research','/api/chat/runs/{runId}','get'));
 assert.ok(html.includes('poll <em>this</em> to know <strong>whether</strong>'));
 assert.ok(html.includes('<a href="/docs/api-reference/chat/runs"><code>POST /api/chat/runs</code></a>'));
 assert.ok(!html.includes('*this*'));
});

test('nested formatting remains semantic while code, escaped markers and raw HTML stay literal',()=>{
 const html=render('**Use `file.png` with *care* and [the `API`](/quickstart).** `**literal** and \\$1` \\*literal\\* <script>alert(1)</script>');
 assert.ok(html.includes('<strong>Use <code>file.png</code> with <em>care</em> and <a href="/docs/quickstart">the <code>API</code></a>.</strong>'));
 assert.ok(html.includes('<code>**literal** and \\$1</code>'));
 assert.ok(html.includes('*literal* &lt;script&gt;alert(1)&lt;/script&gt;'));
 assert.ok(!html.includes('<script>'));
});

test('unclosed formatting does not remove literal text',()=>{
 assert.equal(render('Use `unfinished and **unfinished'),'<p>Use `unfinished and **unfinished</p>');
});
