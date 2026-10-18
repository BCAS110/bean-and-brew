# Asset and License Register

Reviewed 2026-10-18. The approved reference remains unchanged in docs/references and is excluded from dist. The website uses independent assets, never crops of the reference interface.

## Production photography

Downloaded directly from images.unsplash.com, then resized/cropped with Sharp to 480, 800 and 1400 pixels wide, with a consistent 1.4 landscape ratio, encoded WebP at quality 78. Files: src/assets/images/NAME-WIDTH.webp. Image identifiers and original source URLs provide provenance; individual photographer names have not been independently resolved and are not invented.

| Name | Original image URL | Use |
| --- | --- | --- |
| cafe | https://images.unsplash.com/photo-1554118811-1e0d58224f24 | Story, background, visit illustration, gallery |
| beans | https://images.unsplash.com/photo-1447933601403-0c6688de566e | Bean texture, story and journey |
| espresso | https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd | Concept coffee, menu and gallery |
| latte | https://images.unsplash.com/photo-1517701604599-bb29b565090c | Illustrative milk coffee |
| matcha | https://images.unsplash.com/photo-1515823064-d6e0c04616a7 | Matcha menu photograph |
| coldbrew | https://images.unsplash.com/photo-1461023058943-07fcbe16d735 | Illustrative iced coffee |
| experience | https://images.unsplash.com/photo-1559925393-8be0ec4767c8 | Café street seating and gallery |
| pour | https://images.unsplash.com/photo-1442512595331-e89e73853f31 | Brewing photograph |

License: https://unsplash.com/license, checked from the official source. It permits downloading, modification, distribution and commercial use; attribution is appreciated but not required. The restrictions on reselling unmodified images and recreating a competing image service are outside this website's use. These photographs illustrate a fictional concept and do not assert ownership of the depicted premises, endorsement, or exact drink recipes.

## Generated hero

hero-cup-640.webp, hero-cup-800.webp, hero-cup-1000.webp, hero-cup-1500.webp: produced successfully with the built-in image generation tool on 2026-10-18, from an original prompt. Source PNG copied into workspace work/originals/hero-cup.png; confirmed 1536 × 1024, RGBA with alpha. Resized with alpha preserved, WebP quality 70, alpha quality 80. This is generated imagery, not a real business product photograph.

Prompt: “Use case: product-mockup. Create a photorealistic isolated premium coffee hero asset for a warm white editorial coffee website. A large cream speckled ceramic cappuccino cup with intricate leaf latte art, matching saucer, handle pointing right, viewed slightly from above at table level. Dynamic curved espresso splash behind the cup and a few floating roasted coffee beans. Warm morning side light, rich amber coffee, crisp ceramic texture. Entire cup saucer splash contained within landscape 3:2 framing, centered subject with transparent background and real alpha. No text, no lettering, no logo, no scenery. Save the generated image for use in the website.”

## Code, icons and fonts

Leaf emblem, line icons and CSS beans are project-native vectors/CSS. No third-party icon library. Arial/Georgia are local system fonts; no font binary is redistributed. They approximate the reference, not an exact font identification. Handwritten reference lettering is approximated with italic serif text.

Tailwind CSS and CLI 4.1.14: MIT, installed package notices retained in node_modules. GSAP and ScrollTrigger 3.13.0: GSAP Standard License, https://gsap.com/standard-license/ (official terms reviewed; static site use is permitted). Vendor copyright comments are retained and GSAP-NOTICE.txt is distributed. GSAP is not described as MIT.

## Visual differences

The generated cup differs in splash geometry and saucer from the reference. Photos replace the original café, cherries, hands and storefront; bean texture is reused for conceptual sourcing/roasting stages. Menu photography is illustrative rather than recipe-accurate. Readable copy increases section height. Gallery is an additional requested section. Editorial text replaces unsupported testimonials; visit details explicitly describe a demonstration. No original establishment year, certification, prices, contact details or testimonials are asserted.


## Final hero optimization

The hero also ships responsive 640/800/1000/1500px AVIF variants (quality 48, alpha preserved) selected through a picture source, with WebP fallback. Mobile replaces the decorative café background photograph with a warm CSS gradient to avoid delaying the principal image. This is a deliberate performance adaptation.
