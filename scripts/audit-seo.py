"""Audit the actual Next build output. Optionally read dynamic pages from a local server.

Run after next build: python3 scripts/audit-seo.py --base-url http://127.0.0.1:3000
This performs only GET requests to the explicitly supplied local origin.
"""
import argparse
import collections
from html.parser import HTMLParser
import json
from pathlib import Path
import sys
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
BUILD = ROOT / '.next/server/app'

class Page(HTMLParser):
    def __init__(self, source):
        super().__init__()
        self.meta = {}
        self.canonicals = []
        self.title = ''
        self.h1 = 0
        self.links = []
        self.ids = set()
        self.styles = []
        self.schemas = []
        self.missing_alt = 0
        self.in_title = False
        self.in_schema = False
        self.json_text = ''
        self.feed(source)
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if attrs.get('id'): self.ids.add(attrs['id'])
        if tag == 'meta': self.meta[attrs.get('name', attrs.get('property', ''))] = attrs.get('content', '')
        if tag == 'title': self.in_title = True
        if tag == 'h1': self.h1 += 1
        if tag == 'link' and attrs.get('rel') == 'canonical': self.canonicals.append(attrs.get('href', ''))
        if tag == 'link' and attrs.get('rel') == 'stylesheet': self.styles.append(attrs.get('href', ''))
        if tag == 'a' and attrs.get('href'): self.links.append(attrs['href'])
        if tag == 'img' and 'alt' not in attrs: self.missing_alt += 1
        if tag == 'script' and attrs.get('type') == 'application/ld+json': self.in_schema = True; self.json_text = ''
    def handle_data(self, data):
        if self.in_title: self.title += data
        if self.in_schema: self.json_text += data
    def handle_endtag(self, tag):
        if tag == 'title': self.in_title = False
        if tag == 'script' and self.in_schema:
            self.in_schema = False
            self.schemas.append(json.loads(self.json_text))

def normalize(url):
    p = urllib.parse.urlsplit(url)
    return urllib.parse.urlunsplit((p.scheme, p.netloc, p.path.rstrip('/'), '', ''))

def build_file(path, suffix):
    return BUILD / f"{path.strip('/') or 'index'}{suffix}"

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--base-url')
    parser.add_argument('--output', default='docs/seo/rendered-audit.json')
    args = parser.parse_args()
    if args.base_url and urllib.parse.urlsplit(args.base_url).hostname not in ('localhost', '127.0.0.1', '::1'):
        parser.error('Only a local test server is supported.')
    sitemap = ET.fromstring((BUILD / 'sitemap.xml.body').read_text())
    urls = [node.text for node in sitemap.findall('{*}url/{*}loc')]
    errors, warnings, pages, titles = [], [], {}, collections.defaultdict(list)
    if not urls: errors.append('Sitemap is empty. Check preview/indexability environment.')
    if len(urls) != len(set(urls)): errors.append('Sitemap includes duplicate URLs.')
    for url in urls:
        path = urllib.parse.urlsplit(url).path or '/'
        if path.startswith(('/designs', '/archive', '/api/')) or path == '/directions': errors.append(f'{path}: nonpublic URL in sitemap')
        file = build_file(path, '.html')
        source = file.read_text() if file.exists() else None
        if source is None and args.base_url:
            try:
                with urllib.request.urlopen(args.base_url.rstrip('/') + path, timeout=25) as response:
                    if response.status != 200: errors.append(f'{path}: HTTP {response.status}')
                    if 'noindex' in response.headers.get('X-Robots-Tag', ''): errors.append(f'{path}: noindex HTTP header')
                    source = response.read().decode()
            except Exception as error:
                errors.append(f'{path}: could not inspect local response: {error}')
        if source is None:
            warnings.append(f'{path}: dynamic page requires --base-url to inspect')
            continue
        meta_file = build_file(path, '.meta')
        if meta_file.exists() and json.loads(meta_file.read_text()).get('status', 200) != 200: errors.append(f'{path}: sitemap URL is a redirect/error')
        try: page = Page(source)
        except Exception as error:
            errors.append(f'{path}: invalid rendered HTML/schema: {error}')
            continue
        pages[path] = page
        titles[page.title].append(path)
        if not page.title.strip(): errors.append(f'{path}: missing title')
        if not page.meta.get('description', '').strip(): errors.append(f'{path}: missing description')
        if page.h1 != 1: errors.append(f'{path}: expected one h1, found {page.h1}')
        if len(page.canonicals) != 1 or normalize(page.canonicals[0]) != normalize(url): errors.append(f'{path}: canonical disagrees with sitemap: {page.canonicals}')
        if 'noindex' in page.meta.get('robots', ''): errors.append(f'{path}: indexable sitemap page has noindex')
        if normalize(page.meta.get('og:url', '')) != normalize(url): errors.append(f'{path}: missing/wrong social URL')
        for field in ['og:title', 'og:description', 'og:image', 'twitter:card', 'twitter:title', 'twitter:description', 'twitter:image']:
            if not page.meta.get(field): errors.append(f'{path}: missing {field}')
        if page.missing_alt: errors.append(f'{path}: {page.missing_alt} images missing alt attributes')
        if not page.schemas: errors.append(f'{path}: no structured data')
    for title, paths in titles.items():
        if len(paths) > 1: errors.append(f'Duplicate title {title!r}: {paths}')
    broken_fragments = set()
    for path, page in pages.items():
        for href in page.links:
            resolved = urllib.parse.urlsplit(urllib.parse.urljoin(urls[0].rstrip('/') + path, href))
            if resolved.netloc != urllib.parse.urlsplit(urls[0]).netloc: continue
            target = resolved.path.rstrip('/') or '/'
            if resolved.fragment and target in pages and urllib.parse.unquote(resolved.fragment) not in pages[target].ids:
                broken_fragments.add((path, href))
    for path, href in sorted(broken_fragments): warnings.append(f'{path}: missing fragment target {href}')
    styles = pages.get('/').styles if '/' in pages else []
    css_bytes = sum((ROOT / '.next' / href.removeprefix('/_next/')).stat().st_size for href in styles if (ROOT / '.next' / href.removeprefix('/_next/')).exists())
    report = {'sitemap_urls': len(urls), 'rendered_pages_checked': len(pages), 'homepage_css_bytes_uncompressed': css_bytes, 'errors': errors, 'warnings': warnings}
    output = ROOT / args.output
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(json.dumps(report, indent=2) + '\n')
    print(json.dumps(report, indent=2))
    return int(bool(errors))

if __name__ == '__main__': sys.exit(main())
