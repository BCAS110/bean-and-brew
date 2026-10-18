const photographs = [
  { image: 'cafe', caption: 'Morning light, slower moments' },
  { image: 'espresso', caption: 'The beauty of a simple cup' },
  { image: 'beans', caption: 'Where the journey begins' },
  { image: 'experience', caption: 'A place to pause' }
];
export function wrapIndex(index, length) { return ((index % length) + length) % length; }
export function initGallery() {
  const dialog = document.querySelector('#gallery-dialog');
  let current = 0;
  const render = () => {
    const photo = photographs[current];
    const image = document.querySelector('#gallery-image');
    image.src = new URL('../../images/' + photo.image + '-1400.webp', import.meta.url).href;
    image.alt = photo.caption;
    document.querySelector('#gallery-caption').textContent = (current + 1) + ' / ' + photographs.length + ' · ' + photo.caption;
  };
  const move = direction => { current = wrapIndex(current + direction, photographs.length); render(); };
  document.querySelectorAll('[data-gallery]').forEach(button => button.addEventListener('click', () => { current = Number(button.dataset.gallery); render(); dialog.showModal(); }));
  document.querySelector('#gallery-previous').addEventListener('click', () => move(-1));
  document.querySelector('#gallery-next').addEventListener('click', () => move(1));
  dialog.addEventListener('keydown', event => { if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1); } if (event.key === 'ArrowRight') { event.preventDefault(); move(1); } });
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
}
