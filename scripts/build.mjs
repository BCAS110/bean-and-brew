import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

process.chdir(fileURLToPath(new URL('../', import.meta.url)));
await rm('dist', { recursive: true, force: true });
await mkdir('dist/assets/css', { recursive: true });
await cp('src/index.html', 'dist/index.html');
await cp('src/js', 'dist/assets/js', { recursive: true });
await cp('src/assets', 'dist/assets', { recursive: true, filter: (path) => !path.endsWith('.gitkeep') });
const result = spawnSync(process.execPath, ['node_modules/@tailwindcss/cli/dist/index.mjs', '-i', 'src/styles/app.css', '-o', 'dist/assets/css/app.css', '--minify'], { stdio: 'inherit' });
if (result.error) throw result.error;
if (result.status !== 0) process.exit(result.status ?? 1);
await mkdir('dist/assets/vendor', { recursive: true });
for (const name of ['gsap.min.js', 'ScrollTrigger.min.js']) await cp('node_modules/gsap/dist/' + name, 'dist/assets/vendor/' + name);
await cp('docs/GSAP-NOTICE.txt', 'dist/assets/vendor/GSAP-LICENSE.txt');
await writeFile('dist/.nojekyll', '');

await cp('src/robots.txt', 'dist/robots.txt');
await cp('src/styles/nojs.css', 'dist/assets/css/nojs.css');
