import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { gameList, getGameStats } from '../data/games'
import StatCard from './StatCard'
import WeaponBar from './WeaponBar'
import { gameIcons } from './icons/GameIcons'

function Skeleton() {
  return (
    <div className="space-y-6 animate-skeleton p-6" aria-hidden="true">
      <div className="h-10 w-48 bg-bg-card" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-20 bg-bg-card" />)}
      </div>
    </div>
  )
}

export default function StatsPage() {
  const { gameId } = useParams()

  if (!gameList.length) {
    return (
      <section aria-labelledby="stats-heading" className="px-6 py-24">
        <div className="max-w-4xl mx-auto"><Skeleton /></div>
      </section>
    )
  }

  const selected = gameId || gameList[0]?.id
  const game = gameList.find(g => g.id === selected)
  const stats = getGameStats(selected)

  if (!game || !stats) {
    return (
      <section aria-labelledby="stats-heading" className="px-6 py-24 text-center">
        <h2 id="stats-heading" className="font-display text-2xl font-bold text-text-primary mb-4 uppercase tracking-wide">Game not found</h2>
        <Link to="/stats" className="text-amber hover:text-amber-pale transition-colors text-xs tracking-wider uppercase font-sans">View all deployments</Link>
      </section>
    )
  }

  const Icon = gameIcons[game.id]
  const weaponList = stats.weapons || []
  const totalKills = weaponList.reduce((s, w) => s + (w.kills || 0), 0)

  return (
    <section aria-labelledby="stats-heading" className="px-6 py-24">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center gap-5">
            <span className="p-2.5 border border-border-subtle shrink-0" style={{ color: game.color }} aria-hidden="true">
              {Icon ? <Icon size={22} color="currentColor" /> : <span className="text-lg" aria-hidden="true">{game.icon}</span>}
            </span>
            <div>
              <h2 id="stats-heading" className="font-display text-3xl md:text-4xl font-bold text-text-primary uppercase tracking-tight">
                {game.name}
              </h2>
              <p className="text-text-secondary text-xs font-sans mt-1 tracking-wider uppercase">{stats.matches || 0} deployments</p>
            </div>
          </div>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <StatCard label="Ops Won" value={stats.wins ?? 0} sub={`${stats.winRate}% success rate`} index={0} />
          <StatCard label="K/D Ratio" value={stats.kd} sub="Performance metric" index={1} />
          <StatCard label="Deployments" value={stats.matches} sub="Total missions" index={2} />
          <StatCard label="Peak Rank" value={stats.peakRank || '—'} sub={stats.tier || ''} index={3} />
        </div>

        {/* Weapon usage */}
        {weaponList.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="border border-border-subtle p-6 bg-bg-card"
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-display text-base font-bold text-text-primary uppercase tracking-wide">
                {selected === 'valorant' ? 'Agent Loadouts' : 'Weapon Loadouts'}
              </h3>
              <span className="text-text-dim text-[10px] font-sans tracking-wider uppercase">
                {totalKills} confirmed kills
              </span>
            </div>
            <div className="space-y-4">
              {weaponList.map((w, i) => (
                <WeaponBar key={w.name} weapon={w.name} kills={w.kills} percentage={w.percentage} index={i} />
              ))}
            </div>
          </motion.div>
        )}

        {/* Game switcher */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex gap-2 mt-10 justify-center flex-wrap"
          role="navigation"
          aria-label="Switch game stats"
        >
          {gameList.map(g => (
            <Link
              key={g.id}
              to={`/stats/${g.id}`}
              aria-current={g.id === selected ? 'page' : undefined}
              className={`px-4 py-2 text-[10px] tracking-[0.15em] uppercase transition-all font-sans ${
                g.id === selected
                  ? 'text-amber border border-amber/40 bg-amber/5'
                  : 'text-text-secondary border border-border-subtle hover:text-text-primary hover:border-border-active'
              }`}
            >
              {g.name}
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
