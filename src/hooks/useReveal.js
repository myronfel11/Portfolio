import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '../lib/motion.js'

gsap.registerPlugin(ScrollTrigger)

// Animates every [data-reveal] inside `ref` when it scrolls into view.
// data-reveal="stagger" animates the element's direct children in sequence instead.
export function useReveal(ref) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray('[data-reveal]')
      if (prefersReducedMotion()) {
        gsap.set(items, { opacity: 1 })
        return
      }
      items.forEach((el) => {
        const stagger = el.dataset.reveal === 'stagger'
        const targets = stagger ? Array.from(el.children) : el
        if (stagger) gsap.set(el, { opacity: 1 })
        gsap.fromTo(
          targets,
          { opacity: 0, y: 48 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: 'expo.out',
            stagger: stagger ? 0.09 : 0,
            scrollTrigger: { trigger: el, start: 'top 86%' },
          },
        )
      })
    }, ref)
    return () => ctx.revert()
  }, [ref])
}
