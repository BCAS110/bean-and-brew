export function initAnimations() {
  const { gsap, ScrollTrigger } = window;
  if (!gsap || !ScrollTrigger) { document.documentElement.dataset.motion = 'unavailable'; return; }
  gsap.registerPlugin(ScrollTrigger);
  const media = gsap.matchMedia();
  media.add({ desktop: '(min-width: 768px)', mobile: '(max-width: 767px)', reduce: '(prefers-reduced-motion: reduce)' }, context => {
    const { desktop, reduce } = context.conditions;
    document.documentElement.dataset.motion = reduce ? 'reduced' : 'active';
    if (reduce) return;
    if (desktop) gsap.from('.hero-copy h1 span', { y: 22, opacity: 0, duration: .9, stagger: .11, ease: 'power2.out', clearProps: 'all' });
    if (desktop) gsap.from('.hero-cup', { y: 35, scale: .94, opacity: 0, duration: 1.15, ease: 'power2.out', clearProps: 'opacity' });
    gsap.utils.toArray('[data-reveal]').forEach(element => {
      gsap.from(element, { y: 16, duration: .7, ease: 'power2.out', scrollTrigger: { trigger: element, start: 'top 94%', once: true }, clearProps: 'all' });
    });
    gsap.utils.toArray('.journey-step').forEach((element, index) => {
      gsap.from(element, { y: 18, duration: .6, delay: index * .06, scrollTrigger: { trigger: element, start: 'top 94%', once: true }, clearProps: 'all' });
    });
    gsap.fromTo('.journey-progress', { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: '#bean-to-cup', start: 'top 85%', end: 'bottom 45%', scrub: .3 } });
    if (desktop) {
      gsap.to('.hero-cup-motion', { y: 65, scale: 1.055, ease: 'none', scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: .6 } });
      gsap.to('.hero-atmosphere', { y: 25, ease: 'none', scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: .6 } });
      gsap.to('.experience-image', { yPercent: -8, ease: 'none', scrollTrigger: { trigger: '#cafe-experience', start: 'top bottom', end: 'bottom top', scrub: .7 } });
      const floats = gsap.utils.toArray('.floating-bean').map((bean, index) => gsap.to(bean, { y: -13 - index * 4, rotation: 12, duration: 2.8 + index * .6, yoyo: true, repeat: -1, ease: 'sine.inOut' }));
      let heroVisible = true;
      const observer = new IntersectionObserver(entries => { heroVisible = entries[0].isIntersecting; floats.forEach(tween => heroVisible && !document.hidden ? tween.play() : tween.pause()); });
      observer.observe(document.querySelector('#hero'));
      const visibility = () => floats.forEach(tween => document.hidden || !heroVisible ? tween.pause() : tween.play());
      document.addEventListener('visibilitychange', visibility);
      return () => { observer.disconnect(); document.removeEventListener('visibilitychange', visibility); };
    }
  });
  window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
}



