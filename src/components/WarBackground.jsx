import { useEffect, useRef } from 'react'

function randomBetween(a, b) { return a + Math.random() * (b - a) }

export default function WarBackground() {
  const canvasRef = useRef(null)
  const scrollRef = useRef(0)
  const particlesRef = useRef([])
  const flashesRef = useRef([])

  useEffect(() => {
    const onScroll = () => { scrollRef.current = window.scrollY }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let w, h, raf

    function resize() {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const embers = Array.from({ length: 60 }, () => ({
      x: randomBetween(0, 1),
      y: randomBetween(0, 1),
      size: randomBetween(1, 3.5),
      speed: randomBetween(0.002, 0.008),
      drift: randomBetween(-0.3, 0.3),
      alpha: randomBetween(0.3, 0.9),
      life: randomBetween(0, 1),
    }))

    const smoke = Array.from({ length: 25 }, () => ({
      x: randomBetween(0, 1),
      y: randomBetween(0, 1),
      size: randomBetween(40, 120),
      speed: randomBetween(0.0003, 0.001),
      drift: randomBetween(-0.15, 0.15),
      alpha: randomBetween(0.02, 0.07),
    }))

    const groundDebris = Array.from({ length: 30 }, () => ({
      x: randomBetween(0, 1),
      y: randomBetween(0.92, 1),
      size: randomBetween(1, 2.5),
      speed: randomBetween(0.001, 0.004),
      alpha: randomBetween(0.1, 0.3),
    }))

    let lastFlash = 0

    function draw() {
      ctx.clearRect(0, 0, w, h)
      const scrollFactor = Math.min(scrollRef.current / 800, 1)

      // Smoke layers
      for (const s of smoke) {
        s.y -= s.speed * (1 + scrollFactor * 0.5)
        s.x += s.drift * 0.005
        if (s.y < -0.1) { s.y = 1.1; s.x = randomBetween(0, 1) }
        const grad = ctx.createRadialGradient(s.x * w, s.y * h, 0, s.x * w, s.y * h, s.size)
        grad.addColorStop(0, `rgba(100,80,60,${s.alpha})`)
        grad.addColorStop(0.5, `rgba(80,60,40,${s.alpha * 0.5})`)
        grad.addColorStop(1, 'rgba(80,60,40,0)')
        ctx.fillStyle = grad
        ctx.fillRect(s.x * w - s.size, s.y * h - s.size, s.size * 2, s.size * 2)
      }

      // Embers
      for (const e of embers) {
        e.y -= e.speed * (1 + scrollFactor * 0.8)
        e.x += e.drift * 0.003 * (1 + scrollFactor * 0.3)
        e.life += 0.003 * (1 + scrollFactor * 0.5)
        if (e.life > 1 || e.y < -0.05) {
          e.y = randomBetween(0.6, 1)
          e.x = randomBetween(0, 1)
          e.life = 0
          e.alpha = randomBetween(0.3, 0.9)
          e.size = randomBetween(1, 3.5)
        }
        const flicker = 0.6 + 0.4 * Math.sin(e.life * Math.PI * 6 + e.x * 100)
        ctx.beginPath()
        ctx.arc(e.x * w, e.y * h, e.size * flicker, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,${140 + Math.floor(60 * flicker)},${40 + Math.floor(40 * flicker)},${e.alpha * (1 - e.life) * flicker})`
        ctx.fill()
        if (e.size > 2) {
          ctx.beginPath()
          ctx.arc(e.x * w, e.y * h, e.size * 2 * flicker, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255,180,80,${(e.alpha * (1 - e.life) * flicker) * 0.3})`
          ctx.fill()
        }
      }

      // Ground debris
      for (const d of groundDebris) {
        d.x -= d.speed * (1 + scrollFactor * 0.5)
        if (d.x < -0.05) { d.x = 1.05; d.y = randomBetween(0.92, 1) }
        ctx.fillStyle = `rgba(60,50,40,${d.alpha})`
        ctx.fillRect(d.x * w, d.y * h, d.size, d.size * 0.5)
      }

      // Occasional flashes
      const now = Date.now()
      const flashInterval = Math.max(2000 - scrollFactor * 1000, 600)
      if (now - lastFlash > flashInterval + randomBetween(0, 1500)) {
        lastFlash = now
        const fx = randomBetween(0.1, 0.9)
        const fy = randomBetween(0.1, 0.5)
        const fw = randomBetween(30, 100)
        const grad = ctx.createRadialGradient(fx * w, fy * h, 0, fx * w, fy * h, fw)
        grad.addColorStop(0, `rgba(255,255,200,${randomBetween(0.15, 0.35)})`)
        grad.addColorStop(0.5, `rgba(255,200,100,${randomBetween(0.05, 0.12)})`)
        grad.addColorStop(1, 'rgba(255,200,100,0)')
        ctx.fillStyle = grad
        ctx.fillRect(0, 0, w, h)
        flashesRef.current.push({ x: fx, y: fy, alpha: 0.8, life: 1 })
      }

      // Render active flashes
      flashesRef.current = flashesRef.current.filter(f => {
        f.life -= 0.03
        f.alpha *= 0.96
        if (f.life <= 0) return false
        const grad = ctx.createRadialGradient(f.x * w, f.y * h, 0, f.x * w, f.y * h, 80)
        grad.addColorStop(0, `rgba(255,255,200,${f.alpha * 0.2})`)
        grad.addColorStop(1, 'rgba(255,200,100,0)')
        ctx.fillStyle = grad
        ctx.fillRect(0, 0, w, h)
        return true
      })

      // Vignette
      const vig = ctx.createRadialGradient(w / 2, h / 2, h * 0.25, w / 2, h / 2, h * 0.8)
      vig.addColorStop(0, 'rgba(0,0,0,0)')
      vig.addColorStop(1, `rgba(0,0,0,${0.2 + scrollFactor * 0.15})`)
      ctx.fillStyle = vig
      ctx.fillRect(0, 0, w, h)

      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
      {/* Base smoke layer */}
      <div className="absolute inset-0 opacity-40" style={{
        background: 'radial-gradient(ellipse at 30% 50%, rgba(60,40,30,0.3) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(40,30,20,0.4) 0%, transparent 50%)',
      }} />

      {/* Canvas for embers, smoke, flashes */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Scanline overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)',
        pointerEvents: 'none',
      }} />

      {/* Top ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] opacity-20" style={{
        background: 'radial-gradient(ellipse at center, rgba(150,80,30,0.3) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
    </div>
  )
}
