import assert from 'node:assert/strict';
import { readFile, readdir, lstat, access } from 'node:fs/promises';
import { dirname, extname, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { drinks } from '../src/js/data/drinks.js';

const project = fileURLToPath(new URL('../', import.meta.url));
const root = resolve(project, 'dist');
const site = new URL('https://bcas110.github.io/bean-and-brew/');
const files = [];
async function walk(directory) {
  for (const name of await readdir(directory)) {
    const path = resolve(directory, name);
    const info = await lstat(path);
    assert.ok(!info.isSymbolicLink(), 'Production artifact contains a symbolic link');
    if (info.isDirectory()) {
      assert.ok(!['.git', 'node_modules', 'docs', 'src'].includes(name), 'Development directory in production artifact');
      await walk(path);
    } else files.push(path);
  }
}
await walk(root);
const html = await readFile(resolve(root, 'index.html'), 'utf8');
const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]));
async function checkReference(value, origin) {
  if (value.startsWith('#')) {
    assert.ok(ids.has(value.slice(1)), 'Missing section target: ' + value);
    return;
  }
  const originURL = new URL(relative(root, origin).split(sep).join('/'), site);
  const url = new URL(value, originURL);
  if (url.origin !== site.origin) {
    assert.equal(url.href, 'https://www.blackcatartiststudio.com/', 'Unexpected external reference');
    return;
  }
  assert.ok(url.pathname.startsWith(site.pathname), 'Reference escapes project subpath: ' + value);
  const suffix = decodeURIComponent(url.pathname.slice(site.pathname.length));
  const target = resolve(root, suffix || 'index.html');
  assert.ok(target.startsWith(root + sep), 'Reference escapes artifact');
  await access(target);
}
for (const match of html.matchAll(/(?:src|href)="([^"]+)"/g)) await checkReference(match[1], resolve(root, 'index.html'));
for (const match of html.matchAll(/srcset="([^"]+)"/g)) {
  for (const variant of match[1].split(',')) await checkReference(variant.trim().split(/\s+/)[0], resolve(root, 'index.html'));
}
assert.ok(html.includes('<link rel="canonical" href="' + site.href + '">'), 'Canonical target mismatch');
assert.ok(html.includes('<meta property="og:url" content="' + site.href + '">'), 'Open Graph target mismatch');
const imageURL = html.match(/<meta property="og:image" content="([^"]+)"/)?.[1];
assert.ok(imageURL, 'Missing social image');
await checkReference(imageURL, resolve(root, 'index.html'));
assert.match(html, /portfolio demonstration/i);
assert.match(html, /No physical location/);
assert.match(html, /No orders or reservations/);
assert.doesNotMatch(html, /<address\b|href="tel:|href="mailto:|application\/ld\+json/);
const signatures = [
  ['private key', /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/],
  ['AWS access key', /(?:AKIA|ASIA)[A-Z0-9]{16}/],
  ['GitHub token', /(?:gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{30,})/],
  ['OpenAI key', /\bsk-(?:proj-)?[A-Za-z0-9_-]{32,}/],
  ['literal credential', /\b(?:api[_-]?key|client[_-]?secret|password)\s*[:=]\s*["'][^"'\s]{12,}["']/i]
];
const manifest = [];
for (const path of files.sort()) {
  const name = relative(root, path).split(sep).join('/');
  assert.ok(!/\.map$|(^|\/)\.env(?:\.|$)|\.(?:pem|key|p12|pfx)$/i.test(name), 'Forbidden production file: ' + name);
  const bytes = await readFile(path);
  if (['.html', '.css', '.js', '.svg', '.txt'].includes(extname(path))) {
    const text = bytes.toString('utf8');
    assert.doesNotMatch(text, /sourceMappingURL\s*=/, 'Source map directive: ' + name);
    for (const [label, pattern] of signatures) assert.ok(!pattern.test(text), 'Potential ' + label + ' in ' + name);
    if (extname(path) === '.css') for (const match of text.matchAll(/url\(["']?([^"')]+)["']?\)/g)) await checkReference(match[1], path);
    if (extname(path) === '.js') for (const match of text.matchAll(/\bfrom\s*['"]([^'"]+)['"]/g)) {
      assert.ok(match[1].startsWith('.'), 'Bare JavaScript import in ' + name);
      await access(resolve(dirname(path), match[1]));
    }
  }
  manifest.push({ path: name, bytes: bytes.length, sha256: createHash('sha256').update(bytes).digest('hex') });
}
for (const drink of Object.values(drinks)) await access(resolve(root, 'assets/images', drink.image + '-800.webp'));
const gallery = await readFile(resolve(root, 'assets/js/interactions/gallery.js'), 'utf8');
for (const match of gallery.matchAll(/image: '([^']+)'/g)) await access(resolve(root, 'assets/images', match[1] + '-1400.webp'));
await access(resolve(root, '.nojekyll'));
console.log(JSON.stringify({ status: 'PASS', artifact: 'dist/', target: site.href, files: manifest.length, totalBytes: manifest.reduce((sum, item) => sum + item.bytes, 0), manifest }, null, 2));
