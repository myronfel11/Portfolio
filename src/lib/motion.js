export const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const isTouch = () => window.matchMedia('(pointer: coarse)').matches
