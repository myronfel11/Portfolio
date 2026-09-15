import { useEffect } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Cursor from './components/Cursor.jsx'
import ParticleField from './components/ParticleField.jsx'
import SectionCounter from './components/SectionCounter.jsx'
import Nav from './sections/Nav.jsx'
import BottomBar from './sections/BottomBar.jsx'
import Hero from './sections/Hero.jsx'
import Work from './sections/Work.jsx'
import About from './sections/About.jsx'
import ToolkitSection from './sections/ToolkitSection.jsx'
import Contact from './sections/Contact.jsx'
import './styles/site.css'

export default function App() {
  useEffect(() => {
    // Web fonts change layout height; recalculate scroll positions once they land
    document.fonts?.ready.then(() => ScrollTrigger.refresh())
  }, [])

  return (
    <>
      <Cursor />
      <ParticleField />
      <Nav />
      <main>
        <Hero />
        <Work />
        <About />
        <ToolkitSection />
        <Contact />
      </main>
      <BottomBar />
      <SectionCounter />
    </>
  )
}
