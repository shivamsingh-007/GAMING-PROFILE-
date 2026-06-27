import { useState, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import galleryData from '../data/gallery.json'
import Lightbox from './Lightbox'

const categories = ['all', ...new Set(galleryData.map(img => img.game || 'general'))]

function preload(src) {
  const img = new Image()
  img.src = src
}

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const [filter, setFilter] = useState('all')
  const [loaded, setLoaded] = useState({})

  const images = useMemo(() => {
    return filter === 'all'
      ? galleryData
      : galleryData.filter(img => (img.game || 'general') === filter)
  }, [filter])

  const openLightbox = useCallback((i) => setLightboxIndex(i), [])
  const closeLightbox = useCallback(() => setLightboxIndex(null), [])
  const onPrev = useCallback(() => setLightboxIndex(i => (i > 0 ? i - 1 : images.length - 1)), [images.length])
  const onNext = useCallback(() => setLightboxIndex(i => (i < images.length - 1 ? i + 1 : 0)), [images.length])

  return (
    <section aria-labelledby="gallery-heading" className="px-6 py-24">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14"
        >
          <h2 id="gallery-heading" className="font-display text-3xl md:text-4xl font-bold text-text-primary text-center uppercase tracking-tight">
            Field Reports
          </h2>
          <p className="text-text-secondary text-xs text-center mt-3 font-sans tracking-wider uppercase">Moments from the theater</p>
        </motion.div>

        <div className="flex items-center justify-center gap-2 mb-10 flex-wrap" role="tablist" aria-label="Filter intel by theater">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              role="tab"
              aria-selected={filter === cat}
              className={`px-4 py-2 text-[10px] tracking-[0.15em] uppercase transition-all font-sans ${
                filter === cat
                  ? 'text-amber border border-amber/40 bg-amber/5'
                  : 'text-text-secondary border border-border-subtle hover:text-text-primary hover:border-border-active'
              }`}
            >
              {cat === 'all' ? 'All Intel' : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {images.length === 0 ? (
          <div className="text-center py-12"><p className="text-text-secondary text-xs font-sans tracking-wider uppercase">No intel in this category.</p></div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
              role="list"
              aria-label="Gallery images"
            >
              {images.map((img, i) => (
                <motion.div
                  key={`${img.game}-${i}`}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  role="listitem"
                  className="relative aspect-video bg-bg-card border border-border-subtle overflow-hidden group cursor-pointer"
                  onMouseEnter={() => preload(images[(i + 1) % images.length]?.src)}
                >
                  {!loaded[i] && <div className="absolute inset-0 animate-skeleton" aria-hidden="true" />}
                  <button
                    onClick={() => openLightbox(i)}
                    className="w-full h-full focus-visible:outline-2 focus-visible:outline-amber"
                    aria-label={`Open ${img.caption || 'intel image'} in lightbox`}
                  >
                    <img
                      src={img.src}
                      alt={img.caption || `Intel image ${i + 1}`}
                      loading="lazy"
                      onLoad={() => setLoaded(p => ({ ...p, [i]: true }))}
                      className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
                        loaded[i] ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                    <div className="absolute top-0 left-0 right-0 h-px bg-amber/0 group-hover:bg-amber/40 transition-colors duration-300" aria-hidden="true" />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-white/70 text-[11px] font-sans">{img.caption || 'View intel'}</span>
                    </div>
                  </button>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {lightboxIndex !== null && (
          <Lightbox images={images} currentIndex={lightboxIndex} onClose={closeLightbox} onPrev={onPrev} onNext={onNext} />
        )}
      </div>
    </section>
  )
}
