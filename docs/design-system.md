# Design System — Approved White Reference
## Authority and verification
Single visual authority: [approved-white-design.png](references/approved-white-design.png), supplied as `Bean & Brew Coffee House Homepage.png`. This is the founder's reattached reference; the earlier requested filename included (1).
Verified PNG: 1024 x 1536px; 3,125,993 bytes.
SHA-256: 50078A8818E5377CA08600112FDC613840526537BF7666545DBFE2A245DD6DBB.
Visually inspected on 2026-10-18. This specification supersedes the initial generic proportions and component proposals. It does not grant final Step 01 approval or authorize Step 02.

## Composition and section structure
Coordinates below are approximate visual measurements in reference pixels, not fixed responsive CSS heights.
| Region | Approximate vertical extent | Reference composition |
| --- | --- | --- |
| Header | 0–53 | Translucent white band; leaf emblem and two-line wordmark left; centered Home, Our Story, Menu, Gallery, Visit Us; search icon and pill Order Now right |
| Hero | 53–407 | Left editorial copy; huge latte cup/saucer, splash and floating beans dominate center/right; blurred warm cafe depth; handwritten brown slogan upper right and circular establishment badge; bottom-left three small icon/benefit groups |
| Our Story | 407–643 | Left text fades into broad sunlit cafe photograph; narrow right column of two stacked sourcing/growing photographs |
| Signature Drinks | 643–845 | Left editorial introduction and pill CTA; four evenly spaced portrait cards with drink photograph, name, one-line description, price and circular plus control |
| Bean-to-Cup journey | 845–1018 | Bean sack/loose-bean photograph at far left; heading/copy/CTA next; four small rounded image stages joined by a fine dotted connector; circular 01–04 badges overlap upper left |
| Cafe Experience | 1018–1197 | Full-width sunlit cafe panorama; readable pale fade beneath left heading/copy/CTA; handwritten wall slogan right; two circular arrows bottom right |
| Testimonials | 1197–1304 | Left two-line heading; three compact horizontal testimonial cards with portrait, name and orange stars; next/previous arrows at right |
| Visit Us | 1304–1431 | Left heading/copy/CTA; three icon-led address/hours/phone groups; storefront photograph with soft fade on right |
| Footer | 1431–1536 | Brand left, repeated navigation center, social icons and handwritten slogan right; fine rule and small copyright/credit line below |

Do not replace this compact, photograph-led editorial sequence with tall generic sections, a dark theme, oversized empty spacing or a uniform grid. At the reference width, story/experience photography reaches the edges while text aligns near 68–79px from the left. Header brand starts near x=88; hero type near x=76; content generally finishes near x=950–990. Image bleed and text alignment are intentionally different.

## Color specification
The image has photographic gradients, antialiasing and many near-white values; there is no single flat color for every surface.
| Color | HEX | Evidence / intended role |
| --- | --- | --- |
| Warm near-white | #FCFBF9 | Exact sampled pixel at (20,700), also (30,1450) and (400,1500); primary surface candidate |
| Light warm surface | #FEFCFB | Exact sampled pixel at (100,650) |
| Neutral near-white | #F9F9F8 | Exact sampled pixel at (20,1200) |
| Near-black | #0A0A09 | Exact sampled dark heading pixel at (100,700); heading candidate |
| Burnt coffee | #8B4A25 | Visual approximation for hero accent and line icons; not an extracted source token |
| Brown button highlight | #A46436 | Visual approximation for left side of gradient |
| Brown button shadow | #623213 | Visual approximation for right side of gradient |
| Fine warm border | #E5DED6 | Visual approximation for card outline and separators |

Use near-black headings rather than making every heading espresso-brown. The hero accent line is brown. Recheck all sampled candidate colors over final surfaces for WCAG contrast. Do not infer invisible source design tokens from raster pixels. Existing src/styles/tokens.css remains the Step 01 foundation and has not been restyled by this documentation update.

## Typography and hierarchy
Large high-contrast editorial serif with compact leading; plain sans-serif body/UI; a separate expressive handwritten accent in photography/hero/footer. Exact font families cannot be established from a PNG. Georgia/Arial remain temporary development fallbacks, not a verified match. Identify licensed matching fonts before implementation; use self-hosted WOFF2 and avoid substituting generic script fonts without founder review.
At 1024px reference width: hero heading approximately 56–60px with tightly stacked three lines (Fresh / Moments / Brewed Daily), brown final line; main section headings approximately 32–38px; journey/experience headings approximately 28–32px; drink names approximately 13px serif; body approximately 10–13px; small letter-spaced uppercase eyebrows approximately 7–9px.
These are raster observations, not mandatory tiny CSS sizes. Responsive implementation must keep body at a practical 16px baseline and captions at least 14px where possible, preserve hierarchy, and allow sections to grow instead of shrinking readable text to fit the screenshot. Proposed hero scale: clamp(3rem, 5.8vw, 5.5rem); section scale: clamp(2rem, 3.5vw, 3.5rem). Verify final typography with font metrics and founder review.

## Layout and responsive adaptation
Only a desktop-style reference is provided. Mobile/tablet layouts are reasoned adaptations, not supplied designs.
Use mobile-first 320–767px, tablet 768–1023px, desktop >=1024px, wide >=1440px. Proposed outer content max-width 1440px, with inner text/grid width approximately 88% and full-bleed photo bands. Do not stretch the 1024px raster to define arbitrary desktop measurements.
Use a 4px spacing scale: 4, 8, 12, 16, 24, 32, 48, 64px. In the reference, sections are closely adjacent and some are intentionally full bleed; the former blanket 64–128px section padding is superseded.
Desktop: retain all observed column relationships. Tablet: reduce drink columns to two and rebalance story collage without concealing content. Mobile: stack hero text and art while preserving prominence; stack story copy/photo/tiles; use two drink columns only if 320px readability allows, otherwise one; stack numbered journey stages; preserve experience image focal points; stack testimonial/visit groups. No mandatory horizontal slider or page overflow. Header becomes a keyboard-accessible disclosure navigation.

## Components and behavior contract
Buttons are rounded pills, brown horizontal gradients, white labels and right arrows. Reference visible height is about 28–30px, but interactive targets must be at least 44px high, with spacing to avoid overlapping targets. Cards have subtly rounded corners, very thin warm borders and pale photo backgrounds; they are not heavy shadow panels.
Navigation mappings: Home -> hero; Our Story -> our-story; Menu -> signature-drinks; Gallery -> cafe-experience; Visit Us -> visit-us. Footer repeats those destinations. Real sections must exist before anchors ship.
Explore Our Menu / View Full Menu scroll to signature-drinks; Our Story / Watch Our Story scroll to our-story unless an approved playable video is supplied; Our Process scrolls to bean-to-cup; Visit Our Cafe scrolls to visit-us.
Search must filter approved drink content with clear status/results and reset behavior if implemented. Order Now and plus buttons require an approved ordering destination or a meaningful accessible drink-details behavior with honest labeling; no simulated purchase. Gallery arrows require approved distinct photos and working previous/next state. Get Directions, telephone, messaging and social links require verified destinations. Do not ship dead controls.
Focus-visible ring: 3px high-contrast ring with 4px offset; inverse ring on dark imagery. Ensure logical focus order, menu Escape/focus return, native links for navigation and buttons for actions.

## Photography and asset decomposition
Never display the whole mockup as a background, crop whole interface sections into screenshots, or ship the reference as a production asset. Build real semantic text/cards/controls.
Obtain licensed standalone assets for: leaf wordmark/emblem; hero cup/saucer and splash/beans layers plus blurred cafe backdrop; story cafe, hands holding beans and coffee cherries; four individual drinks; bean sack; four process images; cafe panorama/gallery; verified guest portraits only with real testimony/consent; storefront. Separate decorative script artwork from real information where possible. A flattened PNG cannot supply clean occluded hero layers; original assets or approved licensed equivalents are needed.
Observed image ratios differ from initial proposals: drink card art near square; story central cafe landscape; story right tiles roughly 1.7:1; journey thumbnails roughly 1.3:1; experience panorama is a very wide band; visit storefront is landscape. Measure final crop boxes after real assets/font selection, preserve reference focal points, and use mobile-specific crops.
Provide 480/768/1200/1600px responsive variants as appropriate, AVIF/WebP, explicit dimensions, accurate sizes. Hero eager/high priority; below-fold imagery lazy. Decorative layers use empty alt; meaningful photos need descriptive alt.

## Content authenticity, accessibility and motion
The reference includes testimonials/portraits, prices, ethical/sustainable sourcing claims, an establishment year, contact/hours, social links, copyright year and a studio credit. None is verified merely by appearing in the design. Preserve intended visual slots in planning, but do not publish these as genuine without founder-provided facts, consent and destination verification. If unavailable, request an approved neutral treatment rather than fabricate endorsements.
Meet WCAG 2.2 AA: normal text contrast >=4.5:1, large text/nontext UI >=3:1, 200% text resizing and 400% zoom/reflow; no color-only state. Keep text independent from photographs. Reduced motion must retain the static reference composition. See animation-blueprint.md for GSAP/ScrollTrigger planning only.
