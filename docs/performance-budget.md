# Performance Budget
These are acceptance targets, not measured results. The foundation notice cannot establish the eventual landing page's performance.

| Measure | Target |
| --- | --- |
| Lighthouse mobile Performance | >=90 |
| LCP | <=2.5s |
| CLS | <=0.1 |
| INP (field, 75th percentile) | <=200ms |
| Initial compressed transfer | <=700 KiB |
| Total page image transfer at mobile viewport | <=1.5 MiB |
| Mobile hero image | <=250 KiB |
| Individual below-fold image | <=180 KiB |
| Production CSS compressed | <=25 KiB |
| First-party JS plus GSAP/ScrollTrigger compressed | <=80 KiB |
| Initial font transfer | 0 with system fonts; <=100 KiB if later approved |

## Delivery strategy
Self-host all runtime assets. Compile only used Tailwind classes; no CDN runtime or production Node server. Do not copy unused package trees into dist. Step 01 ships no GSAP. Later split scene loading only when it improves measured performance without delaying essential interactions.
Use responsive AVIF/WebP with explicit dimensions and accurate sizes. Hero LCP image loads eagerly with fetchpriority=high; preload only if discovery measurements justify it. Lazy-load below-fold images, use decoding=async where appropriate, and reserve layout space. Avoid loading desktop crops on mobile.
Keep content independent of animation completion. Use transform/opacity, bounded layer counts, and cleanup. Test JS execution costs on a mid-range mobile CPU rather than assuming small source files guarantee smoothness.

## Measurement plan
After actual content exists, serve the production build at a repository subpath. Run Lighthouse mobile at least three times on a defined browser/version and throttling profile, report the median and individual results. Inspect LCP discovery, layout shifts and long tasks. Lighthouse lab diagnostics do not establish field INP; use interaction tracing in the lab and field data when available, subject to later privacy authorization.
Verify 320, 375, 768, 1024 and 1440px widths, high zoom, reduced motion and keyboard input. Record environment, commit, asset sizes and regressions. A byte-budget breach requires an explicit optimization or founder decision, not an undocumented target change.

## Completed implementation update — 2026-10-18
The complete-implementation request supersedes foundation-only scope restrictions in this original planning document. See project-status.md for the current architecture, execution state and limitations, asset-register.md for actual imagery, and test-report.md for verification evidence. Earlier future-tense descriptions remain as planning history and are not current completion claims.
