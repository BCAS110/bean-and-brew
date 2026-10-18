import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import fs from 'node:fs/promises';
const require = createRequire(import.meta.url);
const modules = process.env.QA_MODULES || '../../work/qa-tools/node_modules';
const { chromium } = require(modules + '/playwright');
const { AxeBuilder } = require(modules + '/@axe-core/playwright');
const target = 'https://bcas110.github.io/bean-and-brew/';
const site = process.env.SITE_URL || 'http://127.0.0.1:4173/bean-and-brew/';
assert.ok([target, 'http://127.0.0.1:4173/bean-and-brew/'].includes(site), 'Unexpected test destination');
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const results = { testedURL: site, live: site === target, viewports: [] };
await fs.mkdir('docs/qa', { recursive: true });
async function open(page) {
  const response = await page.goto(site);
  assert.equal(response.status(), 200, 'Website did not return HTTP 200');
  assert.equal(new URL(page.url()).origin, new URL(site).origin, 'Unexpected redirect');
  await page.waitForFunction(() => document.documentElement.dataset.appReady === 'true');
  assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'), target);
  assert.equal(await page.locator('meta[property="og:url"]').getAttribute('content'), target);
  assert.equal(await page.locator('meta[property="og:image"]').getAttribute('content'), target + 'assets/images/hero-cup-1500.webp');
}
try {
  for (const width of [320, 390, 768, 1024, 1440]) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
    await open(page);
    await page.evaluate(async () => {
      for (const image of document.images) image.loading = 'eager';
      await Promise.all([...document.images].map(image => image.decode().catch(() => {})));
    });
    const state = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth > innerWidth,
      broken: [...document.images].filter(image => image.getAttribute('src') && !image.naturalWidth).map(image => image.src),
      motion: document.documentElement.dataset.motion,
      links: [...document.querySelectorAll('a[href^="#"]')].filter(link => !document.getElementById(link.hash.slice(1))).map(link => link.hash)
    }));
    const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
    const accessibility = axe.violations.map(violation => ({ id: violation.id, impact: violation.impact, nodes: violation.nodes.map(node => node.target) }));
    assert.equal(state.overflow, false, 'Horizontal overflow at ' + width);
    assert.deepEqual(state.broken, [], 'Broken images at ' + width);
    assert.deepEqual(state.links, [], 'Invalid section links at ' + width);
    assert.equal(state.motion, 'reduced');
    assert.deepEqual(errors, [], 'Runtime errors at ' + width);
    assert.deepEqual(accessibility, [], 'Accessibility violations at ' + width);
    if (width === 390 || width === 1440) await page.screenshot({ path: 'docs/qa/' + (site === target ? 'live-' : '') + width + '.png', fullPage: true });
    for (const id of ['hero', 'our-story', 'signature-drinks', 'coffee-gallery', 'visit-us']) {
      if (width < 768) await page.locator('.menu-toggle').click();
      await page.locator('#primary-navigation a[href="#' + id + '"]').click();
      assert.equal(new URL(page.url()).hash, '#' + id);
    }
    results.viewports.push({ width, ...state, errors, accessibility, navigation: 'PASS' });
    await context.close();
  }
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await open(page);
  await page.locator('.menu-toggle').click();
  await page.locator('#primary-navigation a[href="#our-story"]').click();
  assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'), 'false');
  await page.locator('.search-toggle').click();
  await page.locator('#drink-search').fill('matcha');
  assert.equal(await page.locator('.drink-card:visible').count(), 1);
  await page.locator('[type="reset"]').click();
  assert.equal(await page.locator('.drink-card:visible').count(), 4);
  await page.locator('[data-detail="espresso"]').first().click();
  assert.equal(await page.locator('#detail-dialog').evaluate(dialog => dialog.open), true);
  await page.keyboard.press('Escape');
  assert.equal(await page.evaluate(() => document.activeElement.dataset.detail), 'espresso');
  await page.locator('[data-gallery="0"]').click();
  await page.locator('#gallery-previous').click();
  assert.ok((await page.locator('#gallery-caption').innerText()).startsWith('4 / 4'));
  await page.keyboard.press('Escape');
  results.interactions = { menuClosed: true, filtered: true, reset: true, detail: true, wrap: true, dialogFocusReturned: true };
  results.mobileMotion = await page.evaluate(() => ({ mode: document.documentElement.dataset.motion, triggers: window.ScrollTrigger.getAll().length }));
  assert.equal(results.mobileMotion.mode, 'active');
  assert.ok(results.mobileMotion.triggers > 0);
  await page.close();
  const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await open(desktop);
  const before = await desktop.locator('.hero-cup-motion').evaluate(element => getComputedStyle(element).transform);
  await desktop.evaluate(() => scrollTo({ top: 400, behavior: 'instant' }));
  await desktop.waitForTimeout(1000);
  const moved = before !== await desktop.locator('.hero-cup-motion').evaluate(element => getComputedStyle(element).transform);
  assert.equal(moved, true, 'Desktop cup did not move on scroll');
  const triggers = await desktop.evaluate(() => window.ScrollTrigger.getAll().length);
  await desktop.emulateMedia({ reducedMotion: 'reduce' });
  await desktop.waitForFunction(() => document.documentElement.dataset.motion === 'reduced');
  assert.equal(await desktop.evaluate(() => window.ScrollTrigger.getAll().length), 0);
  results.desktopMotion = { moved, triggers, reducedMotionTriggers: 0 };
  if (site === target) {
    const image = await desktop.request.get(target + 'assets/images/hero-cup-1500.webp');
    assert.equal(image.status(), 200);
    assert.ok(image.headers()['content-type'].includes('image/'));
    results.https = 'PASS: default certificate validation enabled';
  }
  results.status = 'PASS';
  console.log(JSON.stringify(results, null, 2));
} finally {
  await browser.close();
  await fs.writeFile('docs/qa/' + (site === target ? 'live-browser-results.json' : 'browser-results.json'), JSON.stringify(results, null, 2));
}
