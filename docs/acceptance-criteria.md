# Acceptance Criteria
## Step 01 gate
- All eight requested Markdown files exist with consistent scope.
- Minimal semantic entry, reusable tokens, native module boundaries, local Tailwind build and automated foundation checks exist.
- Dependency versions are exact; successful install must produce a lockfile before reproducible CI is claimed.
- Build output contains no root-relative asset paths, CDN scripts, nonfunctional controls or fabricated business content.
- Git repository uses main, local line-ending configuration, suitable ignore rules and no remote.
- Record every executed check and limitation in project-status.md.
- No landing-page implementation, publication or Step 02 work occurs without founder authorization.

## Future release gate (not satisfied by this step)
| Area | Required evidence |
| --- | --- |
| Visual | Founder review against available approved reference images |
| Functional | All section anchors resolve, controls perform documented actions, no console errors or failed asset requests |
| Responsive | No horizontal overflow at 320/375/768/1024/1440px; portrait/landscape checks |
| Accessibility | WCAG 2.2 AA audit, keyboard-only navigation, logical reading/focus order, skip link, contrast, alt text, 200% text and 400% zoom checks |
| Motion | Reduced-motion at load and live preference changes, mobile static fallback, no scroll traps |
| Performance | Lighthouse mobile >=90, LCP <=2.5s, CLS <=0.1; INP <=200ms with suitable evidence |
| Security | Reviewed lockfile/advisories/licenses, secret scan, CSP browser checks and HTTPS |
| Hosting | Production build under repository subpath, internal navigation and nested module/assets checked |

Automated checks support but do not replace manual visual, assistive technology and security review. Node path-resolution tests are not browser or deployed-host tests. Any failing essential check blocks release. Outstanding Step 01 environment issues may produce PASS WITH WARNINGS only when clearly identified; they must be resolved before release.

## Reference-specific acceptance update
Compare future desktop output to docs/references/approved-white-design.png for section order, compact proportions, typography hierarchy, pale surfaces, gradient pill controls and image composition. Build semantic elements from individual licensed assets; never render the mockup as the website. Validate every reference control against the documented action contract. Reference testimonials, prices, address, phone, hours, establishment and sourcing claims are not verified facts. Mobile is an adaptation requiring review. Reference receipt does not grant final Step 01 approval.

## Completed implementation update — 2026-10-18
The complete-implementation request supersedes foundation-only scope restrictions in this original planning document. See project-status.md for the current architecture, execution state and limitations, asset-register.md for actual imagery, and test-report.md for verification evidence. Earlier future-tense descriptions remain as planning history and are not current completion claims.
