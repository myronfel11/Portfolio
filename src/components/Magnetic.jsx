import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { isTouch, prefersReducedMotion } from '../lib/motion.js'

export default function Magnetic({ children, strength = 0.35, className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    if (isTouch() || prefersReducedMotion()) return
    const el = ref.current
    const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.4)' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.4)' })
    const move = (e) => {
      const r = el.getBoundingClientRect()
      xTo((e.clientX - (r.left + r.width / 2)) * strength)
      yTo((e.clientY - (r.top + r.height / 2)) * strength)
    }
    const leave = () => {
      xTo(0)
      yTo(0)
    }
    el.addEventListener('mousemove', move)
    el.addEventListener('mouseleave', leave)
    return () => {
      el.removeEventListener('mousemove', move)
      el.removeEventListener('mouseleave', leave)
    }
  }, [strength])

  return (
    <div ref={ref} className={`magnetic ${className}`}>
      {children}
    </div>
  )
}
