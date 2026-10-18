# Bean & Brew

A complete static coffee house portfolio demonstration by Black Cat Artist Studio. Built from the approved white editorial reference with HTML5, Tailwind CSS 4.1.14, vanilla JavaScript and locally delivered GSAP / ScrollTrigger 3.13.0. No backend, purchasing, reservations or personal data collection.

## Local development

Use Node.js 24 LTS (supported: 24–25) and npm:

```sh
npm ci
npm run check
```

Serve `dist/` using any local static HTTP server. Do not open index.html through file://, because native JavaScript modules require HTTP. After editing `src/`, run `npm run build` again. Production files are in `dist/`; all asset URLs are relative to support GitHub Pages repository subpaths.

If a trusted corporate certificate is installed in the operating system and npm reports a certificate error, enable Node's system certificate store with NODE_USE_SYSTEM_CA=1. Do not disable TLS verification.

## Features

Responsive disclosure navigation; semantic section anchors; drink search with reset and live result count; keyboard accessible native drink and gallery dialogs; previous/next and arrow-key gallery navigation; scroll-controlled cup and image depth; floating beans; text reveals and progressive journey animation. Reduced motion disables animations. Mobile skips the desktop parallax and continuous floating beans. Photography is responsive WebP and self-hosted. System typography avoids font requests and redistribution.

## Build and deployment

`npm run build` compiles Tailwind locally and copies only the production page, ES modules, images and GSAP scripts. It does not need a browser import resolver or CDN. `npm test` runs six unit/integration/security checks against the production build. Run the build before tests.

See [GitHub Pages deployment](docs/deployment.md), [test report](docs/test-report.md), [asset register](docs/asset-register.md), and [current project state](docs/project-status.md). No remote deployment has been performed. Preserve the GSAP notices in the vendor scripts and the distributed notice file.

## Honest demonstration content

The café, menu and visit information are fictional and explicitly labeled. Editorial brand notes replace unsupported testimonials. Drink images illustrate the concept and do not guarantee exact recipes. The approved reference is retained only in docs; it is never shipped as a page background or production asset. Licensed stock replacements and generated hero artwork differ from the reference; see the asset register and visual QA notes. No real business address, phone number, opening times, sourcing certifications, prices or reviews are asserted.

## Optional browser verification

Run `npm run preview` and open http://127.0.0.1:4173/bean-and-brew/. The preview server binds only to loopback and serves the dist directory. Stop it with Ctrl+C.

The delivered `scripts/browser-qa.mjs` uses Playwright and @axe-core/playwright from a separate QA tool installation, keeping production dependencies unchanged. Install those packages in a separate directory, set QA_MODULES to its absolute node_modules path, and CHROME_PATH to a local Chrome executable, then run `npm run test:browser` with the preview server running. By default it uses the sibling work/qa-tools installation used for this delivery. Screenshots and JSON results are written to docs/qa. Lighthouse is an optional separate QA dependency; its HTML/JSON report is included. Automated accessibility results require manual keyboard, assistive technology and zoom review before any conformance claim.

## GitHub Pages release configuration — 2026-10-18

The target is now https://bcas110.github.io/bean-and-brew/. Canonical and Open Graph URL/image metadata are configured. The pinned Actions workflow in .github/workflows/pages.yml runs npm ci, npm run check, npm audit and scripts/verify-production.mjs, then uploads only dist/ and deploys using a separate restricted job. See [deployment instructions](docs/deployment.md) and [readiness report](docs/deployment-readiness.md). Authentication was unavailable during preparation, so nothing was pushed or deployed. The current automated suite contains eight tests; earlier six-test results remain historical.
