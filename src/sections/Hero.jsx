import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import SplitChars from '../components/SplitChars.jsx'
import Magnetic from '../components/Magnetic.jsx'
import { content } from '../data/content.js'
import { prefersReducedMotion } from '../lib/motion.js'

export default function Hero() {
  const root = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        gsap.set(['.char', '.hero-fade'], { opacity: 1 })
        return
      }
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
      tl.fromTo(
        '.char',
        { yPercent: 110, rotate: 8, opacity: 0 },
        { yPercent: 0, rotate: 0, opacity: 1, duration: 1.1, stagger: 0.03 },
        0.2,
      )
        .fromTo('.hero-eyebrow', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.9 }, 0.1)
        .fromTo('.hero-tagline', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1 }, '-=0.7')
        .fromTo('.hero-cta', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1 }, '-=0.8')
        .fromTo('.hero-scroll', { opacity: 0 }, { opacity: 1, duration: 1 }, '-=0.5')
    }, root)
    return () => ctx.revert()
  }, [])

  const go = (e, id) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section ref={root} id="top" className="hero container">
      <p className="eyebrow hero-eyebrow hero-fade">Hi, I'm {content.name}</p>
      <h1 className="hero-title">
        {content.titleLines.map((line) => (
          <span key={line} className="hero-line">
            <SplitChars text={line} />
          </span>
        ))}
      </h1>
      <p className="hero-tagline hero-fade">{content.tagline}</p>
      <div className="hero-cta hero-fade">
        <Magnetic>
          <a href="#work" className="btn" onClick={(e) => go(e, 'work')}>
            See the work
          </a>
        </Magnetic>
        <Magnetic strength={0.25}>
          <a href="#contact" className="btn ghost" onClick={(e) => go(e, 'contact')}>
            Get in touch
          </a>
        </Magnetic>
      </div>
      <div className="hero-scroll hero-fade" aria-hidden>
        <span>Scroll</span>
        <span className="hero-scroll-line" />
      </div>
    </section>
  )
}
