"""Build one deterministic customer bundle from verified official release inputs."""
import hashlib
import json
from pathlib import Path
import sys
import zipfile

root = Path(__file__).resolve().parents[2]
release = json.loads((root / 'content/label-kit/release.json').read_text())
source, output = (Path(p).resolve() for p in sys.argv[1:3])
if output == root / 'public' or root / 'public' in output.parents:
    raise SystemExit('Subscriber downloads must not be written to public/')
if source == output:
    raise SystemExit('Keep the original release archive separate')
if hashlib.sha256(source.read_bytes()).hexdigest() != release['sha256']:
    raise SystemExit('Checksum mismatch: expected the pinned official customer ZIP')
files = {}
with zipfile.ZipFile(source) as archive:
    for name in archive.namelist():
        if name.startswith('/') or 'recoup-internal-' in name or '..' in name.split('/'):
            raise SystemExit('Invalid customer package')
        if not name.endswith('/'):
            files['recoup-plugin/' + name] = archive.read(name)
for name, expected in release['manifests'].items():
    data = (root / 'content/label-kit/manifests' / name).read_bytes()
    if hashlib.sha256(data).hexdigest() != expected:
        raise SystemExit('Official manifest checksum mismatch')
    files['recoup-plugin/' + name] = data
files['START HERE.html'] = (root / 'content/label-kit/START HERE.html').read_bytes()
for manifest in ['.codex-plugin/plugin.json', '.claude-plugin/plugin.json', '.cursor-plugin/plugin.json']:
    plugin = json.loads(files['recoup-plugin/' + manifest])
    config = plugin['mcpServers'].removeprefix('./')
    mcp = json.loads(files['recoup-plugin/' + config])
    if mcp['mcpServers']['recoup']['url'] != 'https://api.recoupable.dev/mcp':
        raise SystemExit('Invalid MCP connection')
output.parent.mkdir(parents=True, exist_ok=True)
with zipfile.ZipFile(output, 'w', compression=zipfile.ZIP_DEFLATED) as archive:
    for name, data in sorted(files.items()):
        info = zipfile.ZipInfo(name, date_time=(2026, 10, 8, 0, 0, 0))
        info.compress_type = zipfile.ZIP_DEFLATED
        info.external_attr = 0o100644 << 16
        archive.writestr(info, data)
digest = hashlib.sha256(output.read_bytes()).hexdigest()
print(json.dumps({'path': str(output), 'version': release['bundleVersion'], 'sha256': digest}))
