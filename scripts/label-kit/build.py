"""Verify and stage the official customer plugin unchanged; no repackaging."""
import hashlib
import json
from pathlib import Path
import shutil
import sys
import zipfile

root = Path(__file__).resolve().parents[2]
release = json.loads((root / 'content/label-kit/release.json').read_text())
source = Path(sys.argv[1]).resolve()
output = Path(sys.argv[2]).resolve()
if output == root / 'public' or root / 'public' in output.parents:
    raise SystemExit('Subscriber downloads must not be written to public/')
if hashlib.sha256(source.read_bytes()).hexdigest() != release['sha256']:
    raise SystemExit('Checksum mismatch: expected the pinned official customer ZIP')
with zipfile.ZipFile(source) as archive:
    names = archive.namelist()
    if any('recoup-internal-' in n or '..' in n.split('/') for n in names):
        raise SystemExit('Invalid customer package')
    plugin = json.loads(archive.read('.codex-plugin/plugin.json'))
    mcp = json.loads(archive.read('.mcp.json'))
    if plugin.get('mcpServers') != './.mcp.json' or mcp['mcpServers']['recoup']['url'] != 'https://api.recoupable.dev/mcp':
        raise SystemExit('Missing shipped MCP connection')
output.parent.mkdir(parents=True, exist_ok=True)
if source != output:
    shutil.copyfile(source, output)
print(json.dumps({'path': str(output), 'version': release['version'], 'sha256': release['sha256']}))
