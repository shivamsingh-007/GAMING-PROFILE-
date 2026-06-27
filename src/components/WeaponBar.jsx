import { motion } from 'framer-motion'

export default function WeaponBar({ weapon, kills, percentage, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="space-y-1.5"
    >
      <div className="flex justify-between items-center">
        <span className="font-sans text-xs tracking-wide text-text-primary uppercase">{weapon}</span>
        <span className="font-sans text-text-dim text-[11px]">{kills} kills / {percentage}%</span>
      </div>
      <div
        className="w-full bg-bg-elevated h-px overflow-hidden"
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${weapon} usage: ${percentage}%`}
      >
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 + index * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
          className="h-px bg-amber"
        />
      </div>
    </motion.div>
  )
}
