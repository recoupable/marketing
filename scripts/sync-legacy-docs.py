"""Publish a pinned copy to the retained Docs checkout; preserve host branding."""
import argparse
import hashlib
import json
from pathlib import Path
import subprocess

parser = argparse.ArgumentParser()
parser.add_argument('--target', required=True, help='Existing recoupable/docs checkout')
args = parser.parse_args()
root = Path(__file__).resolve().parent.parent
source = root / 'content/docs/source'
target = Path(args.target).resolve()
if not (target / 'docs.json').is_file():
    raise SystemExit('Target must be an existing Docs checkout with docs.json')
dirty = subprocess.check_output(
    ['git', '-C', str(root), 'status', '--porcelain', '--', 'content/docs/source'], text=True
)
if dirty:
    raise SystemExit('Commit the maintained documentation source before publishing its copy')
commit = subprocess.check_output(['git', '-C', str(root), 'rev-parse', 'HEAD'], text=True).strip()
managed = {str(p.relative_to(source)) for p in source.rglob('*') if p.is_file() and p.name != 'docs.json'}
old_pin_path = target / 'SOURCE-PROVENANCE.json'
previous = {entry['path'] for entry in json.loads(old_pin_path.read_text())['files']} if old_pin_path.exists() else set()
published = {str(p.relative_to(target)) for p in target.rglob('*') if p.is_file() and (p.suffix == '.mdx' or str(p.relative_to(target)).startswith('api-reference/openapi/')) and not any(part.startswith('.') or part == 'node_modules' for part in p.relative_to(target).parts)}
extras = (published | {p for p in previous if (target / p).exists()}) - managed
if extras:
    raise SystemExit('Review and remove stale publication files before syncing: ' + ', '.join(sorted(extras)))
files = []
for path in sorted(source.rglob('*')):
    if not path.is_file() or path.name == 'docs.json':
        continue
    relative = path.relative_to(source)
    data = path.read_bytes()
    destination = target / relative
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_bytes(data)
    files.append({
        'path': str(relative),
        'sourcePath': str(path.relative_to(root)),
        'sha256': hashlib.sha256(data).hexdigest(),
    })
navigation = json.loads((source / 'docs.json').read_text())['navigation']
host = json.loads((target / 'docs.json').read_text())
host['navigation'] = navigation
(target / 'docs.json').write_text(json.dumps(host, indent=2) + '\n')
pin = {
    'repository': 'recoupable/marketing',
    'commit': commit,
    'sourceDirectory': 'content/docs/source',
    'files': files,
    'navigationSha256': hashlib.sha256(json.dumps(navigation, sort_keys=True).encode()).hexdigest(),
    'hostSpecific': ['docs.json theme, colors, navbar, footer, logo and host settings'],
    'releaseNote': 'This prepares content only. Host cutover and archival remain separate.',
}
(target / 'SOURCE-PROVENANCE.json').write_text(json.dumps(pin, indent=2) + '\n')
print(f'Copied {len(files)} maintained files from Marketing {commit}')
