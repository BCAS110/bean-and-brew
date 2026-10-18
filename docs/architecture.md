# Architecture
## Scope and layout
A static, progressively enhanced, single-page document will remain useful without JavaScript. Step 01 supplies only its buildable foundation.
- src/index.html: semantic entry point and early CSP.
- src/styles/app.css: Tailwind entry and reusable base styles.
- src/styles/tokens.css: shared colors and typography.
- src/js/app.js: initialization only.
- src/js/animations/: future GSAP/ScrollTrigger scene modules.
- src/js/interactions/: navigation and interaction behavior.
- src/js/accessibility/: motion preference and future focus utilities.
- src/assets/images/ and fonts/: locally licensed optimized assets.
- scripts/build.mjs: deterministic output assembly and CSS compilation.
- tests/: automated foundation checks.
- docs/: engineering specifications; dist/: generated output, ignored by Git.

## Build and hosting contract
The build cleans only the fixed project dist directory, copies HTML, native modules and approved assets, compiles minified Tailwind CSS, and creates .nojekyll. No arbitrary user input enters the build command. No bundler is necessary at this step. Use relative HTML URLs and relative module imports; resolve future dynamic assets with new URL(relativePath, import.meta.url). CSS image URLs resolve relative to output CSS, not source CSS.

Serve dist at both / and /repository-name/ when verifying deployment readiness. Future GSAP ESM distribution files must be locally copied with their relative dependency graph intact or bundled using separately reviewed tooling. Bare npm imports cannot run directly in a browser. No GSAP files ship yet.

## Future page contract
Planned section IDs: hero, our-story, signature-drinks, bean-to-cup, cafe-experience. Add navigation only when its destinations exist. Content order remains the reading order. Only approved business information is displayed.

## Future PHP/MySQL migration
Keep semantic section templates, content fields, asset paths and stable DOM animation hooks independent of storage. PHP can later render the same markup and CSS using escaped CMS values. Define future drink fields as name, description, image, alt text, price and currency; story and experience use heading, body, image and alt text. No schema, endpoint, CMS or PHP runtime is created now. Authorization, validation, database access and uploads will be server responsibilities in a later phase. GitHub Pages cannot execute PHP.

## References
- https://tailwindcss.com/docs/installation/tailwind-cli
- https://gsap.com/docs/v3/Installation/
- https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages

## Reference alignment update
The approved visual reference is docs/references/approved-white-design.png. Preserve hero, our-story, signature-drinks, bean-to-cup, cafe-experience, testimonials (verified content only), visit-us and footer in that order. The previous five IDs were an incomplete preliminary list. Reference documents and the master PNG stay outside src and must not be copied into production. See design-system.md for observed layout and meaningful control contracts.

## Completed implementation update — 2026-10-18
The complete-implementation request supersedes foundation-only scope restrictions in this original planning document. See project-status.md for the current architecture, execution state and limitations, asset-register.md for actual imagery, and test-report.md for verification evidence. Earlier future-tense descriptions remain as planning history and are not current completion claims.
