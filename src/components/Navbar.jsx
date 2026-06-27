import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'Dossier' },
  { to: '/stats', label: 'Stats' },
  { to: '/gallery', label: 'Intel' },
]

function useTheme() {
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem('theme')
    if (stored) return stored
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])
  const toggle = () => setTheme(t => t === 'dark' ? 'light' : 'dark')
  return [theme, toggle]
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [theme, toggleTheme] = useTheme()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [location])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-bg-primary/90 backdrop-blur-xl border-b border-border-subtle' : 'bg-transparent'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-6xl mx-auto px-6 h-14 md:h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group" aria-label="SniperKing home">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber animate-pulse-dot" aria-hidden="true" />
            <span className="font-display text-sm md:text-base font-bold tracking-widest uppercase text-text-primary group-hover:text-amber transition-colors">
              SniperKing
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-1" role="menubar">
            {links.map(l => {
              const active = location.pathname === l.to
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  role="menuitem"
                  aria-current={active ? 'page' : undefined}
                  className={`relative px-4 py-2 text-xs tracking-[0.15em] uppercase transition-all font-sans ${
                    active
                      ? 'text-amber border border-border-amber'
                      : 'text-text-secondary hover:text-text-primary border border-transparent hover:border-border-active'
                  }`}
                >
                  {l.label}
                </Link>
              )
            })}
          </div>

          <button
            onClick={toggleTheme}
            className="ml-2 p-2 text-text-secondary hover:text-amber transition-colors border border-transparent hover:border-border-amber"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
              </svg>
            )}
          </button>

          <button
            onClick={() => setMobileOpen(v => !v)}
            className="md:hidden text-text-primary p-2 transition-colors"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              {mobileOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-bg-primary/95 backdrop-blur-xl border-t border-border-subtle" role="menu" aria-label="Mobile navigation">
          {links.map(l => (
            <Link
              key={l.to}
              to={l.to}
              role="menuitem"
              aria-current={location.pathname === l.to ? 'page' : undefined}
              className={`block px-6 py-4 text-xs tracking-[0.15em] uppercase transition-colors font-sans ${
                location.pathname === l.to
                  ? 'text-amber bg-amber/5 border-l-2 border-l-amber'
                  : 'text-text-secondary border-l-2 border-l-transparent hover:text-text-primary'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
