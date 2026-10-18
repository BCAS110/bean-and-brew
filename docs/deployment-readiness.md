# Deployment Readiness — 2026-10-18

**Local preparation: PASS WITH WARNINGS. Remote deployment: BLOCKED by unavailable GitHub authentication.**

Target: https://bcas110.github.io/bean-and-brew/
Repository: BCAS110/bean-and-brew
No remote repository, settings or deployments were changed. No source redesign or dependency changes were made.

## Verified repository state

The project root is C:/Users/ALi/Documents/Codex/2026-10-18/new-chat/bean-and-brew. It is an initialized Git repository on main with no commits and no remote. Project files are untracked, including the new .github workflow. Existing Git author configuration is present. GitHub CLI was not found on PATH or its standard checked installation paths; GH_TOKEN, GITHUB_TOKEN and GITHUB_PAT were absent. Git Credential Manager returned no usable GitHub credential with prompting disabled. Credential values were never displayed or persisted.

Unauthenticated GitHub repository lookup returns 404, which can mean absent or private/inaccessible. The actual target URL was fetched over HTTPS with certificate validation enabled and also returned 404. Therefore no live-site functionality or successful deployment is claimed. See qa/deployment-environment.json for response and pinned-action evidence.

## Changes limited to release preparation

- src/index.html: canonical, og:url, absolute og:image/secure URL, image type/dimensions and descriptive demo image alt text. Existing hero asset reused; page composition unchanged.
- .github/workflows/pages.yml: five official actions pinned to full commit hashes; separate build and deploy jobs; only dist uploaded.
- scripts/verify-production.mjs: artifact allowlist boundaries, path and module resolution checks, dynamic drink/gallery asset checks, demo assertions, source map exclusion, common credential-pattern scan and SHA-256 inventory.
- tests/foundation.test.mjs: existing six tests retained; URL allowance updated for the declared canonical; two release/workflow tests added.
- scripts/browser-qa.mjs: assertions now fail on errors and accept SITE_URL for the exact live target, verifying metadata, navigation, mobile and desktop motion, search/gallery and focus. Local and live result files are distinguished.
- README.md, docs/deployment.md and docs/project-status.md: current release state and exact authentication/publication instructions. docs/qa contains actual results and artifact inventory.

## Executed verification

| Check | Result |
| --- | --- |
| Clean dependency installation | PASS: npm ci; pinned lockfile unchanged; 34 packages installed |
| Workflow-compatible runtime | PASS: clean install and npm run check executed using bundled Node 24.19.0; earlier check also passed on supported Node 25.8.2 |
| Production build | PASS: existing npm run build via npm run check; local Tailwind CLI and existing asset/vendor copy strategy |
| Automated test suite | PASS: 8 tests, 0 failures |
| npm audit | PASS: 0 known vulnerabilities; qa/deployment-npm-audit.json |
| Production references | PASS: HTML resources/srcset, CSS URLs, static module imports, dynamic drink/gallery images and section anchors resolve within /bean-and-brew/ |
| Production artifact | PASS: 48 files, approximately 2.35 MB uncompressed; manifest and SHA-256 values in qa/deployment-artifact.json |
| Secrets/source maps | PASS: no .env, credential/private-key files, .map files or sourceMappingURL directives; no matches for scanned credential signatures. Pattern scanning cannot prove absence of every possible secret |
| Content authenticity | PASS: portfolio disclosures, fictional café, no physical location, no orders/reservations; no fictional prices, reviews or genuine-business contact/schema claims |
| Mobile/browser QA | PASS: 320, 390, 768, 1024 and 1440px; all primary navigation destinations clicked successfully; no overflow, broken loaded images, console/page errors or automated axe violations |
| Interactions | PASS: disclosure closure, drink search/reset/detail, gallery wrapping, dialog focus return |
| GSAP and reduced motion | PASS: desktop cup moves on scroll with 15 triggers; mobile initializes 4 lightweight triggers; live reduced-motion preference removes all triggers |
| Metadata | PASS: target canonical and og:url; absolute same-site social image exists with declared 1500 × 1000 dimensions |
| Action provenance | PASS: official GitHub action commit SHAs verified with GitHub API; evidence saved |
| Workflow static policy checks | PASS: empty global permissions, exact commit pins, build/deploy dependency, dist-only upload, no persisted checkout credentials, no contents write or custom secrets |
| Git diff check | PASS: git diff --check; limitation: there is no tracked baseline because the repository has no initial commit |
| GitHub runner execution | NOT RUN: requires authenticated publication and Pages configuration |
| Live navigation/images/JS/animations/mobile | BLOCKED: actual target returns 404 |

The workflow uses ubuntu-24.04 and Node 24. Build permissions are only contents:read; deploy permissions are only pages:write and id-token:write. Deploy runs no npm or repository source scripts and depends on the verified build. No privileged pull-request trigger or secret-bearing deployment token is introduced. GitHub Pages must be set to the GitHub Actions source before successful deployment; configure-pages intentionally does not auto-enable Pages.

## Known warnings preserved from the verified website

Previous local Lighthouse: Performance 93, Accessibility 100, Best Practices 100, SEO 92; LCP 3.1 seconds, CLS 0 and TBT 50ms. This task did not rerun Lighthouse because no layout/runtime code changed. The 2.5-second LCP target remains unmet; real-user INP is unmeasured. Original-versus-replacement photography/font differences and manual accessibility limits remain documented in asset-register.md and test-report.md. No production-readiness guarantee is inferred from automated checks.

## Complete publication path

Follow deployment.md: install GitHub CLI; authenticate through its browser flow as an authorized account; inspect/create the exact repository; review and commit only the project source/docs/workflow; verify any existing remote history; push without force; choose Settings → Pages → GitHub Actions; run/watch pages.yml; then execute the provided live browser checks using SITE_URL and verify the actual HTTPS URL. New public repository creation exposes source/docs and is explicitly identified in those instructions. This task stopped before all remote mutations as requested when authentication is unavailable.
