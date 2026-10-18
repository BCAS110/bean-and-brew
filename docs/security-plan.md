# Security Plan
## Threat model
All public GitHub Pages HTML, JavaScript, CSS and assets are publicly readable. Secrets cannot be hidden in frontend code. Phase 1 has no forms, analytics, external APIs, user accounts or application collection of personal information. Hosting infrastructure may maintain its own access logs.

## Dependencies
Exact direct versions are declared in package.json; a generated lockfile and npm ci are required before release. Review transitive dependencies, install lifecycle scripts, advisories and licenses. Do not equate npm audit with a complete security review. GSAP is reserved for later local delivery; no CDN or third-party script runs in Step 01. Do not disable certificate verification to work around installation failures.

## Browser policy
The foundation uses an early meta CSP: default-src 'none'; script-src 'self'; style-src 'self'; img-src 'self'; font-src 'self'; connect-src 'none'; object-src 'none'; base-uri 'none'; form-action 'none'.
No inline scripts or unsafe-eval. Future GSAP inline style mutations require browser verification against this policy; revise narrowly if necessary and document the tradeoff rather than adding blanket unsafe-inline.
GitHub Pages does not provide arbitrary repository-defined HTTP response headers. Meta CSP cannot provide frame-ancestors or CSP report-only coverage; clickjacking protection needs a header-capable host/proxy in a future authorized phase. Do not claim those controls are enforced here. Enforce HTTPS in Pages settings when deployment is authorized. A meta referrer policy is included.

## Safe content and assets
Use textContent for text. Never insert untrusted values into innerHTML, eval or Function. Future CMS output requires context-aware server escaping and URL validation. No external destination is added until verified and approved; new-tab links need rel=noopener noreferrer.
Record every third-party photo/font/icon and dependency license in the asset register before release. No photos or fonts have been acquired. Asset rights are not assumed from public availability.

## Repository controls
Ignore environment files, private keys, dependencies, build outputs and reports. Ignore rules are not secret detection; review staged diffs and history and enable GitHub secret scanning where available. If a secret leaks, revoke it before history cleanup.
No remote, credentials or deployment workflow is configured in Step 01. Future CI defaults to contents: read; isolate deployment with pages: write and id-token: write only in the deployment job. Pin actions to reviewed full commit SHAs; use a protected environment and minimal token scope. No workflow may run untrusted PR code with write credentials.

## Completed implementation update — 2026-10-18
The complete-implementation request supersedes foundation-only scope restrictions in this original planning document. See project-status.md for the current architecture, execution state and limitations, asset-register.md for actual imagery, and test-report.md for verification evidence. Earlier future-tense descriptions remain as planning history and are not current completion claims.
