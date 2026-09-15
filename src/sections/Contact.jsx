import { useCallback, useRef, useState } from 'react'
import Magnetic from '../components/Magnetic.jsx'
import ContactModal from '../components/ContactModal.jsx'
import { content } from '../data/content.js'
import { useReveal } from '../hooks/useReveal.js'

export default function Contact() {
  const root = useRef(null)
  const [open, setOpen] = useState(false)
  const close = useCallback(() => setOpen(false), [])
  useReveal(root)

  return (
    <section ref={root} id="contact" className="section contact">
      <div className="container">
        <p className="eyebrow" data-reveal>
          Contact
        </p>
        <h2 className="h2 contact-title" data-reveal>
          Let's make something <em>real.</em>
        </h2>
        <p className="contact-sub" data-reveal>
          Open to freelance projects, collaborations and full-time roles.
        </p>

        <div className="contact-actions" data-reveal>
          <Magnetic strength={0.4}>
            <button type="button" className="btn big" onClick={() => setOpen(true)}>
              {content.email}
            </button>
          </Magnetic>
          <Magnetic strength={0.3}>
            <a href={content.resumeUrl} className="btn ghost" target="_blank" rel="noreferrer">
              Resume
            </a>
          </Magnetic>
        </div>

        <ul className="socials" data-reveal="stagger">
          {content.socials.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noreferrer" className="social-link">
                {s.label} <span aria-hidden>↗</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <ContactModal open={open} onClose={close} />
    </section>
  )
}
