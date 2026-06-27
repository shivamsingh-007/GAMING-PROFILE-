import { motion } from 'framer-motion'
import GameCard from './GameCard'
import SoldierBox from './SoldierBox'
import { gameList } from '../data/games'

export default function GameGrid() {
  return (
    <section aria-labelledby="games-heading" className="px-6 py-24">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-4 mb-5"
          >
            <div className="h-px flex-1 bg-border-subtle" aria-hidden="true" />
            <span className="text-amber-dim text-[10px] tracking-[0.25em] uppercase font-sans font-medium">Loadout</span>
            <div className="h-px flex-1 bg-border-subtle" aria-hidden="true" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            id="games-heading"
            className="font-display text-3xl md:text-4xl font-bold text-text-primary text-center uppercase tracking-tight"
          >
            Active Deployments
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-text-secondary text-xs text-center mt-3 font-sans tracking-wider uppercase"
          >
            Five theaters, one operator
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4" role="list" aria-label="Game cards">
          {gameList.map((game, i) => (
            <SoldierBox key={game.id} color={game.color} index={i} total={gameList.length}>
              <GameCard game={game} index={i} />
            </SoldierBox>
          ))}
        </div>
      </div>
    </section>
  )
}
