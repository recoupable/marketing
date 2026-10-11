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
