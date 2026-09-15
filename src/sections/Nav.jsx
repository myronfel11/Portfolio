import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import LogoMark from '../components/LogoMark.jsx'
import { content } from '../data/content.js'
import { sections, scrollTo } from '../data/sections.js'
import { prefersReducedMotion } from '../lib/motion.js'

export default function Nav() {
  const ref = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) {
      gsap.set(ref.current, { opacity: 1 })
      return
    }
    const tween = gsap.fromTo(
      ref.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 1.4, ease: 'expo.out' },
    )
    return () => tween.kill()
  }, [])

  return (
    <header ref={ref} className="bar bar-top" style={{ opacity: 0 }}>
      <div className="container bar-inner">
        <a href="#top" className="bar-name" onClick={(e) => scrollTo(e, 'top')}>
          {content.name}
        </a>
        <nav className="nav-links">
          {sections
            .filter((s) => s.inNav)
            .map((s) => (
              <a key={s.id} href={`#${s.id}`} className="nav-link" onClick={(e) => scrollTo(e, s.id)}>
                {s.label}
              </a>
            ))}
        </nav>
        <a href="#top" className="bar-logo" onClick={(e) => scrollTo(e, 'top')}>
          <LogoMark size={40} />
        </a>
      </div>
    </header>
  )
}
