"""Freeze copyable docs examples for provider-free tests in the pinned API checkout."""
import argparse
import hashlib
import json
from pathlib import Path

parser = argparse.ArgumentParser()
parser.add_argument('--api', required=True)
parser.add_argument('--check', action='store_true')
args = parser.parse_args()
root = Path(__file__).resolve().parent.parent
source = root / 'content/docs/source/api-reference/openapi'
specs = {name: json.loads((source / name).read_text()) for name in ['accounts.json', 'content.json', 'research.json']}
content = specs['content.json']['components']['schemas']
research = specs['research.json']
record = {
    'evidence': 'Copyable syntax only. URLs are placeholders; no provider, payment or customer workflow is exercised.',
    'sourceHashes': {str((source / name).relative_to(root)): hashlib.sha256((source / name).read_bytes()).hexdigest() for name in specs},
    'examples': {
        'image': content['ContentCreateImageRequest']['example'],
        'video': content['ContentCreateVideoRequest']['example'],
        'lipsync': content['ContentCreateLipsyncRequest']['example'],
        'topup': specs['accounts.json']['components']['schemas']['CreateCreditsSessionRequest']['example'],
        'headless': research['components']['schemas']['ChatGenerateRequest']['example'],
        'trackStats': {p['name']: p['example'] for p in research['paths']['/api/research/track/stats']['get']['parameters'] if p['name'] in ['isrc', 'source']},
    },
}
serialized = json.dumps(record, indent=2) + '\n'
paths = [root / 'content/docs/contracts/example-cases.json', Path(args.api).resolve() / 'lib/contracts/fixtures/published-docs.json']
for path in paths:
    if args.check:
        if not path.is_file() or path.read_text() != serialized:
            raise SystemExit(f'Stale documentation example fixture: {path}. Refresh and test the coordinated API fixture.')
    else:
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(serialized)
print('Verified shared examples' if args.check else 'Updated shared examples; run API publishedDocs tests before committing')
