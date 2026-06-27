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

const specs = [
  { label: 'Dark Covenant', value: '2018' },
  { label: 'Peak Domain', value: 'Immortal 2' },
  { label: 'Vessel Role', value: 'Entry Fragger' },
  { label: 'Theater of War', value: 'Asia Pacific' },
  { label: 'Souls Claimed', value: totals.wins, animated: true },
  { label: 'Eons in Service', value: totals.playtime, suffix: 'h', animated: true },
]

export default function About() {
  return (
    <section aria-labelledby="about-heading" className="relative px-6 py-24 overflow-hidden">
      {/* Hellfire glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] pointer-events-none opacity-30" style={{
        background: 'radial-gradient(ellipse at center, rgba(180,60,20,0.3) 0%, transparent 70%)',
      }} />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-900/30 to-transparent" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="grid md:grid-cols-5 gap-12 md:gap-16">
          {/* Avatar column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="md:col-span-2"
          >
            <figure className="relative group">
              {/* Hellfire glow frame */}
              <div className="absolute -inset-1 bg-gradient-to-b from-red-800/40 via-orange-700/20 to-red-900/40 opacity-60 blur-sm group-hover:opacity-90 transition-opacity pointer-events-none" />

              <div className="relative border border-red-900/60 overflow-hidden bg-black">
                <div className="px-3 py-1.5 border-b border-red-900/40 flex items-center gap-2 bg-black/50">
                  <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse-dot shadow-[0_0_6px_rgba(220,38,38,0.6)]" />
                  <span className="text-red-500/80 text-[10px] font-sans tracking-wider uppercase">Hell Council &middot; File #001</span>
                </div>

                <div className="relative">
                  <img
                    src="https://picsum.photos/seed/helllord/600/600"
                    alt="Lord SniperKing"
                    className="w-full aspect-square object-cover brightness-75 contrast-125 saturate-150"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-red-950/20 to-transparent mix-blend-multiply pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 to-transparent mix-blend-overlay pointer-events-none" />
                  <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-red-600/20 to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Corner chains */}
              <div className="absolute -top-px -left-px w-3 h-3 border-t-2 border-l-2 border-red-700/60" />
              <div className="absolute -top-px -right-px w-3 h-3 border-t-2 border-r-2 border-red-700/60" />
              <div className="absolute -bottom-px -left-px w-3 h-3 border-b-2 border-l-2 border-red-700/60" />
              <div className="absolute -bottom-px -right-px w-3 h-3 border-b-2 border-r-2 border-red-700/60" />
            </figure>
          </motion.div>

          {/* Content column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="md:col-span-3"
          >
            <h2 id="about-heading" className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-5 leading-tight uppercase tracking-tight">
              Hell Council<br />
              <span className="text-red-500 drop-shadow-[0_0_8px_rgba(220,38,38,0.3)]">Lord SniperKing</span>
            </h2>

            <p className="font-sans text-text-secondary text-sm leading-relaxed mb-8 tracking-wide max-w-none">
              Forged in the crucible of competitive war. I do not play matches —
              I claim souls. Every 1v5 is a ritual, every clutch an offering.
              The dark covenant was sealed in 2018. The underworld does not
              retire its own.
            </p>

            {/* Specs grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {specs.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.2 + i * 0.06 }}
                  className="relative border border-red-900/40 p-3 bg-black/40 overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-700/40 to-transparent pointer-events-none" />
                  <dt className="text-red-500/60 text-[10px] tracking-wider uppercase font-sans mb-1">{s.label}</dt>
                  <dd className="font-display text-lg font-bold text-red-100">
                    {s.animated ? <AnimatedCounter end={s.value} suffix={s.suffix || ''} /> : s.value}
                  </dd>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
