"""Build from committed, allowlisted source only; never read worktree skill files."""
import hashlib
import io
import json
from pathlib import Path, PurePosixPath
import subprocess
import sys
import zipfile

root = Path(__file__).resolve().parents[2]
release = json.loads((root / 'content/label-kit/release.json').read_text())
repo = Path(sys.argv[1]).resolve()
output = Path(sys.argv[2]).resolve()
if output == root / 'public' or root / 'public' in output.parents:
    raise SystemExit('Paid downloads must not be written to public/')
commit = release['sourceCommit']
def git(*args):
    return subprocess.check_output(['git', '-C', str(repo), *args])

def archive(files):
    buffer = io.BytesIO()
    with zipfile.ZipFile(buffer, 'w', zipfile.ZIP_DEFLATED) as z:
        for name, data in sorted(files.items()):
            info = zipfile.ZipInfo(name, date_time=(2026, 1, 1, 0, 0, 0))
            info.compress_type = zipfile.ZIP_DEFLATED
            info.external_attr = 0o100644 << 16
            z.writestr(info, data)
    return buffer.getvalue()

files = {}
for name in release['skills']:
    if not name.startswith('recoup-') or 'internal' in name or '/' in name:
        raise SystemExit('Invalid skill allowlist entry')
    entries = git('ls-tree', '-r', commit, '--', f'skills/{name}/').decode().splitlines()
    skill_files = {}
    for entry in entries:
        meta, path = entry.split('\t')
        mode, kind, oid = meta.split()
        if mode != '100644' and mode != '100755':
            raise SystemExit(f'Unsupported source entry: {path}')
        if '..' in PurePosixPath(path).parts or PurePosixPath(path).name.startswith('.env'):
            raise SystemExit(f'Unsafe source path: {path}')
        data = git('cat-file', 'blob', oid)
        files[f'recoup-plugin/{path}'] = data
        skill_files[path.removeprefix('skills/')] = data
    if f'{name}/SKILL.md' not in skill_files:
        raise SystemExit(f'Missing skill: {name}')
    files[f'claude-skills/{name}.zip'] = archive(skill_files)
files['recoup-plugin/agents/release-readiness-reviewer.md'] = git('show', f'{commit}:agents/release-readiness-reviewer.md')
files['LICENSE'] = git('show', f'{commit}:LICENSE')
files['README.md'] = (root / 'content/label-kit/README.md').read_bytes()
files['recoup-plugin/.claude-plugin/plugin.json'] = json.dumps({
    'name':'recoup-label-kit', 'version':'0.1.0',
    'description':'Music-business skills with Recoup Starter access',
    'license':'AGPL-3.0-only'
},indent=2).encode()
files['recoup-plugin/mcp.example.json'] = json.dumps({'mcpServers': {'recoup': {
    'type': 'http', 'url': 'https://api.recoupable.dev/mcp',
    'headers': {'Authorization': 'Bearer ${RECOUP_API_KEY}'}
}}}, indent=2).encode()
files['manifest.json'] = json.dumps({**release, 'files':{
    k:hashlib.sha256(v).hexdigest() for k,v in sorted(files.items())
}},indent=2).encode()
output.parent.mkdir(parents=True,exist_ok=True)
output.write_bytes(archive(files))
print(json.dumps({'path':str(output),'skills':len(release['skills']),'sha256':hashlib.sha256(output.read_bytes()).hexdigest(),'bytes':output.stat().st_size}))
