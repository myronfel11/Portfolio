import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { isTouch, prefersReducedMotion } from '../lib/motion.js'

export default function Cursor() {
  const dot = useRef(null)
  const ring = useRef(null)

  useEffect(() => {
    if (isTouch() || prefersReducedMotion()) return

    const xDot = gsap.quickTo(dot.current, 'x', { duration: 0.12, ease: 'power3' })
    const yDot = gsap.quickTo(dot.current, 'y', { duration: 0.12, ease: 'power3' })
    const xRing = gsap.quickTo(ring.current, 'x', { duration: 0.45, ease: 'power3' })
    const yRing = gsap.quickTo(ring.current, 'y', { duration: 0.45, ease: 'power3' })

    const move = (e) => {
      xDot(e.clientX)
      yDot(e.clientY)
      xRing(e.clientX)
      yRing(e.clientY)
    }
    const over = (e) => {
      const hot = e.target.closest('a, button, [data-hover]')
      gsap.to(ring.current, { scale: hot ? 2.4 : 1, duration: 0.4, ease: 'power3.out' })
    }

    window.addEventListener('mousemove', move)
    document.addEventListener('mouseover', over)
    document.body.classList.add('has-custom-cursor')
    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', over)
      document.body.classList.remove('has-custom-cursor')
    }
  }, [])

  return (
    <>
      <div ref={dot} className="cursor cursor-dot" />
      <div ref={ring} className="cursor cursor-ring" />
    </>
  )
}
