import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Hero() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  return (
    <header className="relative min-h-screen flex items-center justify-center overflow-hidden" role="banner">
      {/* Scanline overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]" aria-hidden="true" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(217,119,6,0.08) 2px, rgba(217,119,6,0.08) 4px)',
      }} />

      {/* Radial vignette */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{
        background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.8) 100%)',
      }} />

      {/* Radar sweep */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 rounded-full border border-border-amber/10" />
        <div className="absolute inset-[15%] rounded-full border border-border-amber/8" />
        <div className="absolute inset-[30%] rounded-full border border-border-amber/6" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-1/2 bg-gradient-to-b from-amber/15 to-transparent origin-bottom animate-radar" />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" aria-hidden="true" style={{
        backgroundImage: 'linear-gradient(rgba(217,119,6,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(217,119,6,0.1) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      <div className={`relative z-10 text-center px-6 max-w-4xl mx-auto transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* Top badge */}
        <div className="flex items-center justify-center gap-3 mb-8" style={{ opacity: mounted ? 1 : 0, transition: 'opacity 0.8s 0.2s' }}>
          <span className="w-2 h-2 rounded-full bg-amber animate-pulse-dot" aria-hidden="true" />
          <span className="text-amber-dim text-[10px] md:text-xs tracking-[0.25em] uppercase font-sans font-medium">
            Active Operator, Competitive Division
          </span>
          <span className="w-2 h-2 rounded-full bg-amber animate-pulse-dot" aria-hidden="true" />
        </div>

        {/* Callsign */}
        <h1 className="font-display text-7xl md:text-8xl lg:text-9xl font-black text-text-primary leading-[0.9] mb-4 tracking-tight uppercase">
          <span className="block text-5xl md:text-6xl lg:text-7xl font-light text-text-dim tracking-[0.3em] mb-2">Callsign</span>
          Sniper
          <span className="text-amber">King</span>
        </h1>

        {/* HUD divider */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-6 h-px bg-amber/40" aria-hidden="true" />
          <div className="w-2 h-2 bg-amber/20 rotate-45" aria-hidden="true" />
          <div className="w-6 h-px bg-amber/40" aria-hidden="true" />
        </div>

        {/* Status line */}
        <p className="font-sans text-sm md:text-base text-text-secondary tracking-wide max-w-xl mx-auto mb-10 leading-relaxed">
          <span className="text-amber font-medium">STATUS:</span> Active. Clutch operator. Tactical entry fragger. Chess puzzle solver.
        </p>

        <nav className="flex items-center justify-center gap-4" aria-label="Hero actions">
          <Link
            to="/stats"
            className="inline-flex items-center gap-3 px-6 py-3 bg-amber/10 border border-amber/40 text-amber text-xs tracking-[0.2em] uppercase font-sans font-semibold transition-all hover:bg-amber/15 hover:border-amber/60"
            aria-label="View deployment statistics"
          >
            <span className="w-4 h-px bg-amber/60" aria-hidden="true" />
            Deployment Stats
          </Link>
          <Link
            to="/about"
            className="inline-flex items-center gap-3 px-6 py-3 border border-border-subtle text-text-secondary text-xs tracking-[0.2em] uppercase font-sans transition-all hover:text-text-primary hover:border-border-active"
            aria-label="View operator dossier"
          >
            Operator Dossier
            <span className="w-4 h-px bg-text-dim" aria-hidden="true" />
          </Link>
        </nav>
      </div>

      {/* Bottom HUD bar */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border-amber to-transparent" aria-hidden="true" />
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 text-[10px] tracking-[0.2em] uppercase text-text-dim font-sans">
        <span>V 2.0</span>
        <span className="w-1 h-1 rounded-full bg-text-dim" aria-hidden="true" />
        <span>APAC, PC</span>
        <span className="w-1 h-1 rounded-full bg-text-dim" aria-hidden="true" />
        <span>{new Date().getFullYear()}</span>
      </div>
    </header>
  )
}
