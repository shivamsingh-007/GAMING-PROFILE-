import { useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'

export default function Lightbox({ images, currentIndex, onClose, onPrev, onNext }) {
  const closeRef = useRef(null)

  const handleKey = useCallback((e) => {
    switch (e.key) {
      case 'Escape': onClose(); break
      case 'ArrowLeft': onPrev(); break
      case 'ArrowRight': onNext(); break
    }
  }, [onClose, onPrev, onNext])

  useEffect(() => {
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [handleKey])

  const img = images[currentIndex]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
      role="dialog"
      aria-modal="true"
      aria-label={`Intel ${currentIndex + 1} of ${images.length}`}
      onClick={onClose}
    >
      <div className="relative max-w-5xl max-h-[90vh] mx-4 w-full" onClick={e => e.stopPropagation()}>
        {/* Top bar */}
        <div className="absolute -top-11 left-0 right-0 flex items-center justify-between">
          <span className="text-text-dim text-[11px] font-sans tracking-wider font-mono">
            {String(currentIndex + 1).padStart(2, '0')}/{String(images.length).padStart(2, '0')}
          </span>
          <button
            ref={closeRef}
            onClick={onClose}
            className="text-text-dim hover:text-text-primary p-2 transition-colors"
            aria-label="Close lightbox"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Image */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="relative border border-border-subtle overflow-hidden bg-black/60"
        >
          <img
            src={img.src}
            alt={img.caption || `Intel image ${currentIndex + 1}`}
            className="w-full max-h-[80vh] object-contain"
            draggable={false}
          />
          {img.caption && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 pt-12">
              <p className="text-text-primary text-sm font-sans tracking-wide">{img.caption}</p>
            </div>
          )}
        </motion.div>

        {/* Nav arrows */}
        <button
          onClick={onPrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 text-text-dim hover:text-amber p-3 transition-colors hidden md:block"
          aria-label="Previous intel"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <button
          onClick={onNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 text-text-dim hover:text-amber p-3 transition-colors hidden md:block"
          aria-label="Next intel"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>

      {/* Mobile nav */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex gap-4 md:hidden">
        <button onClick={onPrev} className="border border-border-subtle text-text-secondary p-3 hover:text-amber transition-colors" aria-label="Previous intel">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <button onClick={onNext} className="border border-border-subtle text-text-secondary p-3 hover:text-amber transition-colors" aria-label="Next intel">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>
    </motion.div>
  )
}
