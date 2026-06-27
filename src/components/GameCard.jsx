import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { gameIcons } from './icons/GameIcons'

export default function GameCard({ game, index = 0 }) {
  const Icon = gameIcons[game.id]
  const accent = game.color || '#d97706'

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <Link
        to={`/stats/${game.id}`}
        className="group relative block border border-border-subtle p-5 transition-all duration-300 hover:bg-bg-card-hover"
        aria-label={`View ${game.name} stats`}
      >
        {/* Hover accent top */}
        <div
          className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
          aria-hidden="true"
        />

        {/* HUD corner */}
        <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-transparent group-hover:border-amber/30 transition-colors" aria-hidden="true" />

        {/* Game tag number */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-text-dim text-[10px] font-sans tracking-wider font-mono">{String(index + 1).padStart(2, '0')}</span>
          <div className="h-px flex-1 bg-border-subtle" aria-hidden="true" />
        </div>

        <div className="flex items-start gap-3 mb-4">
          <span className="shrink-0 p-2 border border-border-subtle group-hover:border-amber/30 transition-colors" style={{ color: accent }} aria-hidden="true">
            {Icon ? <Icon size={18} color={accent} /> : <span className="text-base" aria-hidden="true">{game.icon}</span>}
          </span>
          <div className="flex-1 min-w-0">
            <h3 className="font-display text-sm font-bold text-text-primary group-hover:text-amber transition-colors uppercase tracking-wide">
              {game.name}
            </h3>
            <p className="text-text-dim text-[10px] mt-0.5 font-sans tracking-wider uppercase">
              {game.hoursPlayed}h fielded &middot; {game.rank}
            </p>
          </div>
        </div>

        <div className="space-y-1.5 text-xs border-t border-border-subtle pt-3">
          <div className="flex justify-between items-center">
            <span className="text-text-dim text-[10px] tracking-wider uppercase font-sans">Win Rate</span>
            <span className="font-sans font-semibold text-sm text-text-primary">{game.winRate}%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-text-dim text-[10px] tracking-wider uppercase font-sans">K/D Ratio</span>
            <span className="font-sans font-semibold text-sm text-text-primary">{game.kd !== '—' ? game.kd : '—'}</span>
          </div>
        </div>

        <div className="mt-3 w-full h-px bg-bg-elevated overflow-hidden">
          <div
            className="h-px transition-all duration-700"
            style={{ width: `${game.winRate}%`, background: accent }}
          />
        </div>
      </Link>
    </motion.div>
  )
}
