import { useEffect, useRef } from 'react'
import { isTouch, prefersReducedMotion } from '../lib/motion.js'

export default function ParticleField() {
  const canvas = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const c = canvas.current
    const ctx = c.getContext('2d')
    const mouse = { x: -9999, y: -9999 }
    const touch = isTouch()
    let w, h, raf
    let pts = []

    const build = () => {
      w = c.width = window.innerWidth
      h = c.height = window.innerHeight
      const n = Math.min(110, Math.round((w * h) / 14000))
      pts = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: 1.2 + Math.random() * 1.8,
        c: Math.random() > 0.65 ? '182,137,91' : '193,193,193',
      }))
    }
    build()

    const move = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    const leave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      const n = pts.length
      for (const p of pts) {
        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const d = Math.hypot(dx, dy)
        if (d < 150 && d > 0) {
          const f = (150 - d) / 150
          p.vx += (dx / d) * f * 0.5
          p.vy += (dy / d) * f * 0.5
        }
        p.vx *= 0.96
        p.vy *= 0.96
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > w) p.vx *= -1
        if (p.y < 0 || p.y > h) p.vy *= -1
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.c},0.75)`
        ctx.fill()
      }
      for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
          const a = pts[i]
          const b = pts[j]
          const d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < 115) {
            ctx.strokeStyle = `rgba(193,193,193,${(1 - d / 115) * 0.16})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }
      raf = requestAnimationFrame(draw)
    }
    draw()

    window.addEventListener('resize', build)
    if (!touch) {
      window.addEventListener('mousemove', move)
      document.addEventListener('mouseleave', leave)
    }
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', build)
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseleave', leave)
    }
  }, [])

  return <canvas ref={canvas} className="particles" aria-hidden />
}
