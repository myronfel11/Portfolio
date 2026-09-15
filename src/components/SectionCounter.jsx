import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { sections } from '../data/sections.js'
import { prefersReducedMotion } from '../lib/motion.js'

gsap.registerPlugin(ScrollTrigger)

const pad = (n) => String(n + 1).padStart(2, '0')

export default function SectionCounter() {
  const [index, setIndex] = useState(0)
  const wrap = useRef(null)
  const num = useRef(null)
  const shown = useRef(0)

  useEffect(() => {
    // Only section *starts* are used: ScrollTrigger offsets them correctly below the pinned Work
    // section, whereas end/endTrigger positions ignore the pin distance.
    const triggers = sections.map((s, i) =>
      ScrollTrigger.create({
        trigger: `#${s.id}`,
        start: 'top 50%',
        end: '+=1',
        onEnter: () => setIndex(i),
        onLeaveBack: () => setIndex(Math.max(0, i - 1)),
      }),
    )
    const intro = gsap.fromTo(
      wrap.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, delay: 1.6, ease: 'expo.out' },
    )
    return () => {
      triggers.forEach((t) => t.kill())
      intro.kill()
    }
  }, [])

  useEffect(() => {
    if (index === shown.current) return
    const el = num.current
    if (prefersReducedMotion()) {
      el.textContent = pad(index)
      shown.current = index
      return
    }
    const goingDown = index > shown.current
    const dir = goingDown ? -1 : 1
    gsap
      .timeline()
      .to(el, { yPercent: dir * 100, opacity: 0, duration: 0.3, ease: 'power3.in' })
      .add(() => {
        el.textContent = pad(index)
        shown.current = index
      })
      .fromTo(
        el,
        { yPercent: -dir * 100, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.55, ease: 'expo.out' },
      )
  }, [index])

  return (
    <div ref={wrap} className="section-counter" aria-live="polite" style={{ opacity: 0 }}>
      <span ref={num} className="section-counter-num">
        01
      </span>
    </div>
  )
}
