import { drinks } from '../data/drinks.js';
export function filterDrinks(query, names) {
  const normalized = query.trim().toLowerCase();
  return names.map(name => name.toLowerCase().includes(normalized));
}
export function initMenu() {
  const search = document.querySelector('.menu-search');
  const input = document.querySelector('#drink-search');
  const cards = [...document.querySelectorAll('[data-drink]')];
  const update = () => {
    const visibility = filterDrinks(input.value, cards.map(card => card.dataset.drink));
    cards.forEach((card, index) => { card.hidden = !visibility[index]; });
    const count = visibility.filter(Boolean).length;
    document.querySelector('#search-status').textContent = count + (count === 1 ? ' drink found' : ' drinks found');
    document.querySelector('.no-results').hidden = count !== 0;
  };
  const showSearch = () => { search.hidden = false; document.querySelector('#signature-drinks').scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }); input.focus({ preventScroll: true }); update(); };
  document.querySelector('.search-toggle').addEventListener('click', showSearch);
  document.querySelector('#browse-menu').addEventListener('click', showSearch);
  search.addEventListener('submit', event => event.preventDefault());
  input.addEventListener('input', update);
  search.addEventListener('reset', () => { input.value = ''; update(); input.focus(); });
  const dialog = document.querySelector('#detail-dialog');
  document.querySelectorAll('[data-detail]').forEach(button => button.addEventListener('click', () => {
    const drink = drinks[button.dataset.detail];
    document.querySelector('#detail-title').textContent = drink.name;
    document.querySelector('#detail-description').textContent = drink.description;
    document.querySelector('#detail-ingredients').textContent = drink.ingredients;
    const image = document.querySelector('#detail-image');
    image.src = new URL('../../images/' + drink.image + '-800.webp', import.meta.url).href;
    image.alt = drink.name;
    dialog.showModal();
  }));
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) { const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); } });
}
