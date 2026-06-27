import { motion } from 'framer-motion'

export default function StatCard({ label, value, sub, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
      className="border border-border-subtle p-4 bg-bg-card"
    >
      <div className="text-text-dim text-[10px] tracking-wider uppercase font-sans mb-1">{label}</div>
      <div className="font-display text-2xl font-bold text-amber">{value}</div>
      {sub && <div className="text-text-secondary text-[11px] mt-1 font-sans">{sub}</div>}
    </motion.div>
  )
}
