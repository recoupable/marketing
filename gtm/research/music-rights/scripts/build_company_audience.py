"""Export sourced companies to LinkedIn's company-list format; optional website discovery.

Only visits company websites. Never requests LinkedIn pages or uses credentials.
"""
import argparse
import csv
import json
from concurrent.futures import ThreadPoolExecutor
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse, unquote
from urllib.request import Request, urlopen

HEADERS = ['companyname', 'companywebsite', 'companyemaildomain',
           'linkedincompanypageurl', 'stocksymbol', 'industry', 'city',
           'state', 'companycountry', 'zipcode']
CORE_SEGMENTS = {'rightsholders', 'funds'}
SEGMENTS = CORE_SEGMENTS | {'operators', 'institutional'}

def selection(rows, audience):
    """Keep adjacent employers out of core ads; priority is a subset, never extra reach."""
    eligible = [r for r in rows if r['review_status'] == 'company_verified']
    if audience in ('combined', 'priority'):
        return [r for r in eligible if r['segment'] in CORE_SEGMENTS
                and (audience != 'priority' or r['priority'] == '1')]
    return [r for r in eligible if r['segment'] == audience]

class Links(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = set()

    def handle_starttag(self, tag, attrs):
        if tag != 'a':
            return
        href = dict(attrs).get('href') or ''
        parsed = urlparse(href)
        if parsed.hostname not in ('linkedin.com', 'www.linkedin.com'):
            return
        parts = parsed.path.strip('/').split('/')
        if len(parts) == 2 and parts[0] == 'company' and parts[1]:
            self.links.add('https://www.linkedin.com/company/' + unquote(parts[1]).strip('/') + '/')

def discover(row):
    if row['linkedincompanypageurl']:
        return row, 'previously verified'
    url = 'https://' + row['companywebsite']
    try:
        with urlopen(Request(url, headers={'User-Agent':'Mozilla/5.0'}), timeout=15) as response:
            raw = response.read(3_000_000).decode('utf-8', errors='replace')
            source = response.url
        parser = Links()
        parser.feed(raw)
        # A unique company link is useful identity evidence; multiple links require review.
        if len(parser.links) == 1:
            row['linkedincompanypageurl'] = next(iter(parser.links))
            row['linkedin_url_source'] = source
            return row, 'official website link'
        return row, 'no unique company link'
    except Exception as exc:
        return row, type(exc).__name__

def main():
    p=argparse.ArgumentParser()
    p.add_argument('evidence', type=Path)
    p.add_argument('--discover', action='store_true')
    args=p.parse_args()
    with args.evidence.open(newline='',encoding='utf-8') as f:
        reader=csv.DictReader(f); fields=reader.fieldnames; rows=list(reader)
    assert rows, 'No companies'
    assert len({r['companywebsite'] for r in rows}) == len(rows), 'Duplicate domain'
    assert all(r['source_url'].startswith('https://') and r['source_quote'] for r in rows)
    assert all(r['companywebsite'] and '/' not in r['companywebsite'] for r in rows)
    assert len({r['companyname'].casefold() for r in rows}) == len(rows), 'Duplicate name'
    assert all(r['segment'] in SEGMENTS for r in rows), 'Unknown segment'
    assert all(r['priority'] in ('1', '2', '3') for r in rows), 'Unknown priority'
    assert all(r['review_status'] in ('company_verified', 'hold') for r in rows)
    assert all(r['subtype'] and r['podcast_seed_episodes'] for r in rows)
    assert all(not r['linkedincompanypageurl'] or r['linkedin_url_source'] for r in rows)
    if args.discover:
        with ThreadPoolExecutor(max_workers=6) as pool:
            result=list(pool.map(discover, rows))
        rows=[row for row,status in result]
        for row,status in result:
            print(row['companyname'] + ': ' + status)
        with args.evidence.open('w',newline='',encoding='utf-8') as f:
            writer=csv.DictWriter(f,fieldnames=fields,lineterminator='\n'); writer.writeheader(); writer.writerows(rows)
    prefix=args.evidence.stem.removesuffix('-evidence')
    counts={}
    for segment in ['rightsholders','funds','combined','priority','operators','institutional']:
        selected=selection(rows, segment)
        destination=args.evidence.with_name(prefix+'-'+segment+'.csv')
        with destination.open('w',newline='',encoding='utf-8') as f:
            writer=csv.DictWriter(f,fieldnames=HEADERS,lineterminator='\n'); writer.writeheader()
            for row in selected:
                # Website domain is supported; don't infer email domains or location data.
                writer.writerow({k:row.get(k,'') for k in HEADERS})
        counts[segment]=len(selected)
    counts['linkedin_urls']=sum(bool(r['linkedincompanypageurl']) for r in rows)
    print(json.dumps(counts))

if __name__ == '__main__':
    main()
