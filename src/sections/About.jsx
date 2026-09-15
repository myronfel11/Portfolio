import { useRef } from 'react'
import { content } from '../data/content.js'
import { useReveal } from '../hooks/useReveal.js'

export default function About() {
  const root = useRef(null)
  useReveal(root)

  return (
    <section ref={root} id="about" className="section about">
      <div className="container">
        <div className="about-head" data-reveal>
          <p className="eyebrow">About</p>
          <h2 className="h2">
            Authentic <em>by default.</em>
          </h2>
        </div>

        <div className="about-grid">
          <figure className="headshot" data-reveal>
            <div className="headshot-frame">
              {content.headshot ? (
                <img src={content.headshot} alt={`Portrait of ${content.name}`} />
              ) : (
                <div className="headshot-placeholder" aria-label="Headshot placeholder">
                  <span className="headshot-initials">{content.initials}</span>
                  <span className="headshot-hint">Headshot coming soon</span>
                </div>
              )}
            </div>
          </figure>

          <div className="about-bio" data-reveal="stagger">
            {content.bio.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
            <p className="about-location">{content.location}</p>
          </div>

          <ul className="about-words" data-reveal="stagger">
            {content.brandWords.map((b, i) => (
              <li key={b.word}>
                <span className="about-word-num">0{i + 1}</span>
                <span className="about-word">{b.word}</span>
                <span className="about-word-line">{b.line}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  )
}
