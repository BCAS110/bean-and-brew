export function initNavigation() {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#primary-navigation');
  const close = () => { toggle.setAttribute('aria-expanded', 'false'); nav.classList.remove('is-open'); };
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
  });
  nav.addEventListener('click', event => { if (event.target.closest('a')) close(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { close(); toggle.focus(); } });
  document.addEventListener('click', event => { if (!event.target.closest('.site-header')) close(); });
  const breakpoint = window.matchMedia('(min-width: 768px)');
  breakpoint.addEventListener('change', close);
  const links = [...nav.querySelectorAll('a')];
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) {
        links.forEach(link => {
          if (link.hash === '#' + entry.target.id) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      }
    }, { rootMargin: '-15% 0px -55% 0px' });
    links.forEach(link => { const section = document.querySelector(link.hash); if (section) observer.observe(section); });
  }
}
