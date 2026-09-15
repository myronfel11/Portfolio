import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { content } from '../data/content.js'
import { prefersReducedMotion } from '../lib/motion.js'

gsap.registerPlugin(ScrollTrigger)

export default function Work() {
  const root = useRef(null)
  const track = useRef(null)
  const progress = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const mm = gsap.matchMedia()
    mm.add('(min-width: 768px)', () => {
      const distance = () => track.current.scrollWidth - window.innerWidth
      gsap.to(track.current, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => gsap.set(progress.current, { scaleX: self.progress }),
        },
      })
    })
    return () => mm.revert()
  }, [])

  return (
    <section ref={root} id="work" className="work">
      <div className="container work-head">
        <div>
          <p className="eyebrow">Selected work</p>
          <h2 className="h2">
            Scroll <em>sideways</em> <span className="work-arrow">→</span>
          </h2>
        </div>
        <div className="work-progress" aria-hidden>
          <span ref={progress} className="work-progress-bar" />
        </div>
      </div>

      <div ref={track} className="work-track">
        {content.projects.map((p, i) => (
          <a
            key={p.title}
            href={p.href}
            className={`work-card tone-${p.tone}`}
            target={p.href.startsWith('http') ? '_blank' : undefined}
            rel={p.href.startsWith('http') ? 'noreferrer' : undefined}
          >
            <span className="work-card-fill" aria-hidden />
            <span className="work-card-num">{String(i + 1).padStart(2, '0')}</span>
            <span className="work-card-arrow" aria-hidden>
              ↗
            </span>
            <div className="work-card-body">
              <span className="work-card-meta">
                {p.category} · {p.year}
              </span>
              <h3>{p.title}</h3>
              <p>{p.blurb}</p>
              <ul className="work-card-tags">
                {p.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          </a>
        ))}
        <div className="work-card work-card-end">
          <p className="work-end-text">
            More on the way.
            <br />
            <span>Want to see something specific?</span>
          </p>
          <a href={`mailto:${content.email}`} className="btn ghost">
            Ask me
          </a>
        </div>
      </div>
    </section>
  )
}
