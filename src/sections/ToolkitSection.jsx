import { useRef } from 'react'
import Toolkit from '../components/Toolkit.jsx'
import { useReveal } from '../hooks/useReveal.js'

export default function ToolkitSection() {
  const root = useRef(null)
  useReveal(root)

  return (
    <section ref={root} id="toolkit" className="section toolkit-section">
      <div className="container">
        <div data-reveal>
          <p className="eyebrow">Toolkit</p>
          <h2 className="h2">
            What I <em>build with.</em>
          </h2>
        </div>
        <div data-reveal>
          <Toolkit />
        </div>
      </div>
    </section>
  )
}
