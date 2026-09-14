import { createRequire } from 'node:module';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const require = createRequire(import.meta.url);
const nextRequire = createRequire(require.resolve('next/package.json'));
const sharp = nextRequire('sharp');
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
for (const direction of JSON.parse(await readFile(path.join(root, 'carousel-templates-manifest.json'), 'utf8'))) {
 const dir = path.join(root, 'assets/carousels', direction.id.replace('carousel-', ''));
 for (const file of (await readdir(dir)).filter(f => /^\d\d\.svg$/.test(f))) {
  await sharp(path.join(dir,file)).png().toFile(path.join(dir,file.replace('.svg','.png')));
  await sharp(path.join(dir,file)).jpeg({quality:92,mozjpeg:true}).toFile(path.join(dir,file.replace('.svg','.jpg')));
 }
 console.log('Rendered', direction.title);
}
