import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ErrorBoundary from './components/ErrorBoundary'
import WarBackground from './components/WarBackground'
import Hero from './components/Hero'
import GameGrid from './components/GameGrid'
import StatsBar from './components/StatsBar'

const About = lazy(() => import('./components/About'))
const Stats = lazy(() => import('./components/Stats'))
const Gallery = lazy(() => import('./components/Gallery'))

function Fallback() {
  return (
    <div className="px-6 py-24">
      <div className="max-w-4xl mx-auto space-y-6 animate-skeleton" aria-label="Loading">
        <div className="h-10 w-48 bg-bg-card" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-20 bg-bg-card" />)}
        </div>
      </div>
    </div>
  )
}

function Home() {
  return (
    <>
      <Hero />
      <StatsBar />
      <GameGrid />
    </>
  )
}

function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  )
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <PageTransition key={location.pathname}>
        <Suspense fallback={<Fallback />}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/stats/:gameId" element={<Stats />} />
            <Route path="/gallery" element={<Gallery />} />
          </Routes>
        </Suspense>
      </PageTransition>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col">
          <WarBackground />
          <Navbar />
          <main id="main-content" className="flex-1" tabIndex={-1}>
            <AnimatedRoutes />
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  )
}
