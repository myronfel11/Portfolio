import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ArrowIcon from '../components/ArrowIcon.jsx'
import { content } from '../data/content.js'
import { isTouch, prefersReducedMotion } from '../lib/motion.js'

gsap.registerPlugin(ScrollTrigger)

function WorkCard({ project, index }) {
  const card = useRef(null)
  const video = useRef(null)

  useEffect(() => {
    const el = card.current
    const vid = video.current
    const play = () => vid?.play().catch(() => {})
    const stop = () => {
      if (!vid) return
      vid.pause()
      vid.currentTime = 0
    }

    if (isTouch()) {
      // No hover on touch: play the clip while the card is mostly on screen
      el.classList.add('is-touch')
      if (!vid) return
      const io = new IntersectionObserver(([e]) => (e.isIntersecting ? play() : stop()), {
        threshold: 0.6,
      })
      io.observe(el)
      return () => io.disconnect()
    }

    if (prefersReducedMotion()) {
      el.classList.add('is-static')
      el.addEventListener('mouseenter', play)
      el.addEventListener('mouseleave', stop)
      return () => {
        el.removeEventListener('mouseenter', play)
        el.removeEventListener('mouseleave', stop)
      }
    }

    const q = gsap.utils.selector(el)
    const ringStart = Math.hypot(el.offsetWidth, el.offsetHeight) * 1.05
    gsap.set(q('.work-tint'), { yPercent: 101, opacity: 0.35 })

    const tl = gsap
      .timeline({
        paused: true,
        defaults: { ease: 'power3.inOut' },
        onReverseComplete: () => gsap.set(q('.work-pill'), { opacity: 0 }),
      })
      // 1. media + tint
      .to(q('.work-video'), { opacity: 1, duration: 0.6 }, 0)
      .fromTo(q('.work-tint'), { yPercent: 101 }, { yPercent: 0, duration: 0.7, ease: 'expo.inOut' }, 0)
      // 2. ring closes in on the text, text fades under it
      .fromTo(
        q('.work-ring'),
        { width: ringStart, height: ringStart, opacity: 0 },
        { opacity: 1, duration: 0.15 },
        0.05,
      )
      .to(q('.work-ring'), { width: 16, height: 16, duration: 0.75, ease: 'power3.in' }, 0.1)
      .to(q('.work-card-body'), { opacity: 0, scale: 0.94, duration: 0.55, ease: 'power2.in' }, 0.15)
      .to(q('.work-card-num, .work-card-arrow'), { opacity: 0, duration: 0.3 }, 0.2)
      // 3. the dot becomes the pill
      .set(q('.work-ring'), { opacity: 0 })
      .fromTo(
        q('.work-pill'),
        { width: 16, height: 16, paddingLeft: 0, paddingRight: 0, opacity: 1 },
        {
          width: 'auto',
          height: 52,
          paddingLeft: '1.6rem',
          paddingRight: '1.6rem',
          opacity: 1,
          duration: 0.55,
          ease: 'expo.out',
          immediateRender: false,
        },
      )
      .fromTo(
        q('.work-pill span'),
        { opacity: 0, y: 6 },
        { opacity: 1, y: 0, duration: 0.3, immediateRender: false },
        '-=0.3',
      )

    const enter = () => {
      play()
      tl.timeScale(1).play()
    }
    const leave = () => {
      tl.timeScale(1.6).reverse()
      stop()
    }
    el.addEventListener('mouseenter', enter)
    el.addEventListener('mouseleave', leave)
    return () => {
      el.removeEventListener('mouseenter', enter)
      el.removeEventListener('mouseleave', leave)
      tl.kill()
    }
  }, [])

  const external = project.href.startsWith('http')

  return (
    <a
      ref={card}
      href={project.href}
      className={`work-card tone-${project.tone}`}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
    >
      <div className="work-media" aria-hidden>
        {project.image && <img src={project.image} alt="" loading="lazy" />}
        {project.video && (
          <video ref={video} className="work-video" src={project.video} muted loop playsInline preload="metadata" />
        )}
        <span className="work-tint" />
        <span className="work-shade" />
      </div>

      <span className="work-card-num">{String(index + 1).padStart(2, '0')}</span>
      <span className="work-card-arrow">
        <ArrowIcon />
      </span>

      <div className="work-card-body">
        <span className="work-card-meta">
          {project.category} · {project.year}
        </span>
        <h3>{project.title}</h3>
        <p>{project.blurb}</p>
        <ul className="work-card-tags">
          {project.tags.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>

      <span className="work-ring" aria-hidden />
      <span className="work-pill" aria-hidden>
        <span>
          Visit me <ArrowIcon />
        </span>
      </span>
    </a>
  )
}

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
          <WorkCard key={p.title} project={p} index={i} />
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
