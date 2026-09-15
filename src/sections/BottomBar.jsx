import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import LogoMark from '../components/LogoMark.jsx'
import { content } from '../data/content.js'
import { scrollTo } from '../data/sections.js'
import { prefersReducedMotion } from '../lib/motion.js'

export default function BottomBar() {
  const ref = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) {
      gsap.set(ref.current, { opacity: 1 })
      return
    }
    const tween = gsap.fromTo(
      ref.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 1.5, ease: 'expo.out' },
    )
    return () => tween.kill()
  }, [])

  return (
    <div ref={ref} className="bar bar-bottom" style={{ opacity: 0 }}>
      <div className="container bar-inner">
        <a href="#top" className="bar-brand" onClick={(e) => scrollTo(e, 'top')}>
          <LogoMark size={32} />
          <span className="bar-brand-name">{content.name}</span>
        </a>
        <div className="bar-meta">
          <span>
            <b>Role</b> {content.roles.join(' · ')}
          </span>
          <span>
            <b>Based</b> {content.location}
          </span>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </div>
    </div>
  )
}
