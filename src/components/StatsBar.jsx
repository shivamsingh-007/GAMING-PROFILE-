import { motion } from 'framer-motion'
import AnimatedCounter from './AnimatedCounter'
import { gameList } from '../data/games'

const totals = gameList.reduce(
  (acc, g) => ({
    wins: acc.wins + (g.wins || 0),
    matches: acc.matches + (g.matches || 0),
    playtime: acc.playtime + (g.hoursPlayed || 0),
  }),
  { wins: 0, matches: 0, playtime: 0 }
)

const items = [
  { label: 'Ops Won', end: totals.wins, suffix: '' },
  { label: 'Deployments', end: totals.matches, suffix: '+' },
  { label: 'Hours in Field', end: totals.playtime, suffix: 'h' },
]

export default function StatsBar() {
  return (
    <section aria-label="Career statistics overview" className="relative px-6 -mt-12 z-10 pb-16">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative border border-border-subtle bg-bg-card"
        >
          {/* HUD corner accents */}
          <div className="absolute top-0 left-0 w-3 h-px bg-amber/40" aria-hidden="true" />
          <div className="absolute top-0 left-0 w-px h-3 bg-amber/40" aria-hidden="true" />
          <div className="absolute top-0 right-0 w-3 h-px bg-amber/40" aria-hidden="true" />
          <div className="absolute top-0 right-0 w-px h-3 bg-amber/40" aria-hidden="true" />
          <div className="absolute bottom-0 left-0 w-3 h-px bg-amber/40" aria-hidden="true" />
          <div className="absolute bottom-0 left-0 w-px h-3 bg-amber/40" aria-hidden="true" />
          <div className="absolute bottom-0 right-0 w-3 h-px bg-amber/40" aria-hidden="true" />
          <div className="absolute bottom-0 right-0 w-px h-3 bg-amber/40" aria-hidden="true" />

          <div className="grid grid-cols-3 divide-x divide-border-subtle">
            {items.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                className="text-center py-7 px-3"
              >
                <div className="font-display text-2xl md:text-3xl font-bold text-amber">
                  <AnimatedCounter end={item.end} suffix={item.suffix} />
                </div>
                <div className="text-text-dim text-[10px] tracking-wider mt-1.5 font-sans uppercase">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
