export function getMotionPreference() {
  return window.matchMedia('(prefers-reduced-motion: reduce)');
}
