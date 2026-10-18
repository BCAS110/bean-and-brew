# Cinematic Animation Blueprint
Specification only. No full animation system is implemented in Step 01. Content must start visible and become animation-controlled only after successful initialization.

| Scene | Proposed behavior | Mobile / reduced-motion behavior |
| --- | --- | --- |
| Hero | Cup opacity and translateY entrance over 1s; headline lines reveal over 0.8s with 0.08s stagger; separate decorative layers create depth | Mobile: one entrance, no floating layers; reduced motion: immediate final state |
| Scroll storytelling | ScrollTrigger timeline maps cup translate and scale to section progress, scrub 0.6s; desktop scale range 0.85–1.1 | Mobile: static cup, no pin; reduced: static reading flow |
| Our Story | Image wrapper reveal with opacity/translate over 0.7s; image translateY up to 24px for parallax | Mobile: simple entrance; reduced: no reveal or parallax |
| Signature Drinks | Product opacity/crossfade and translate up to 8px; hover scale maximum 1.025 over 0.2s | Touch: no hover dependence; keyboard gets equivalent emphasis; reduced: immediate states |
| Bean-to-Cup | ScrollTrigger progress sequences existing visual stages and captions in semantic order | Mobile/reduced: stacked static stages; no information hidden |
| Cafe Experience | Photography crossfade/translate within fixed aspect boxes; no automatic carousel | Mobile: static photo sequence; reduced: no transitions |
| Navigation | Native anchors, optional CSS smooth scroll when motion is allowed; sticky offset via scroll-margin-top | All modes: keyboard anchors, visible focus; reduced: instant scroll |

## Lifecycle and constraints
Future implementation uses gsap.matchMedia for breakpoints and prefers-reduced-motion, with context revert on changes and cleanup of triggers. Changing the OS preference while the page is open must remove running scenes and restore all content. The current foundation only reads the initial preference; no animations run.
Measure geometry once during setup, refresh after required image/font loading or meaningful resize, and let ScrollTrigger manage scroll coordination. No custom per-scroll listener loops. Use transforms and opacity wherever practical; avoid animated width, height, top and left.
Pinning is a desktop-only candidate requiring founder approval and device testing. Reserve layout space and constrain transformed artwork inside its own visual wrapper to avoid horizontal overflow. Never clip reading content to hide layout errors.
Use will-change only during active motion and remove it afterward. No heavy blur, persistent full-screen compositing, flashing, autoplay video or scroll hijacking. Pause decorative loops offscreen and when the document is hidden. Layered hero art must not block content or pointer input.
All scenes must degrade gracefully if GSAP fails. The approved reference is now available; exact animation distances remain pending individual source assets and profiling.

## Approved-reference alignment — 2026-10-18
The static resting composition must match docs/references/approved-white-design.png. This is a tightly connected page, not a series of full-screen pinned scenes. Keep hero cup scale/movement inside the hero art region; do not carry it across the story or drink cards. Decompose cup, splash, beans and atmospheric background into licensed individual layers; the flattened mockup is not an animation asset.
Story reveals preserve the wide cafe photo and two stacked right-hand tiles. Signature Drinks retains four desktop cards; use transform-only image emphasis without shifting price or plus controls. Bean-to-Cup animates the four existing numbered image stages and connector in reading order, without replacing them with a new layout. Experience transitions preserve the panorama and left text fade; arrow controls must work with approved distinct photographs and announce changes. Testimonials must not animate or display invented endorsements; only use verified content. Visit and footer content remain stable and readable.
Use 180–240ms hover feedback, 600–900ms reveals and 900–1200ms hero entry as proposed timings. ScrollTrigger scrub 0.6s remains a tuning candidate. Do not pin reference sections by default. All final positions remain readable without JavaScript; reduced-motion removes scrub, parallax and floating layers and displays the static composition. No animation implementation is authorized by this update.
## Completed implementation update — 2026-10-18
The complete-implementation request supersedes foundation-only scope restrictions in this original planning document. See project-status.md for the current architecture, execution state and limitations, asset-register.md for actual imagery, and test-report.md for verification evidence. Earlier future-tense descriptions remain as planning history and are not current completion claims.
