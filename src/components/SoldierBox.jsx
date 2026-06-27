import { useEffect, useRef } from 'react'
import { motion, useAnimation } from 'framer-motion'

const FACING_LEFT = -1
const FACING_RIGHT = 1

function seeded(seed) {
  let s = seed * 16807 + 1
  return () => { s = (s * 16807 + 0) % 2147483647; return (s - 1) / 2147483646 }
}

function Helmet({ color, dir }) {
  return (
    <svg width="36" height="22" viewBox="0 0 36 22" fill="none" className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
      <path d="M6,14 Q6,2 18,2 Q30,2 30,14 Q30,16 28,17 L8,17 Q6,16 6,14Z" fill={color} opacity="0.85" />
      <rect x={dir === FACING_LEFT ? 10 : 4} y="15" width="22" height="3" rx="1.5" fill={color} opacity="0.65" />
      <rect x="13" y="12" width="10" height="3" rx="1" fill="#111" opacity="0.4" />
    </svg>
  )
}

function Arms({ color, dir }) {
  const flip = dir === FACING_LEFT
  return (
    <div className="absolute top-[30%] left-0 right-0 z-10 pointer-events-none" style={{ perspective: '400px' }}>
      {/* Front arm (holding gun) */}
      <div className="absolute" style={{ [flip ? 'right' : 'left']: '-32px', top: 0 }}>
        <svg width={36} height={40} viewBox="0 0 36 40" fill="none" style={{ transform: `scaleX(${dir})` }}>
          <rect x="6" y="6" width="8" height="16" rx="3" fill={color} opacity="0.8" />
          <rect x="2" y="10" width="22" height="5" rx="2" fill="#444" />
          <rect x="0" y="8" width="6" height="9" rx="1.5" fill="#333" />
        </svg>
      </div>
      {/* Back arm */}
      <div className="absolute" style={{ [flip ? 'left' : 'right']: '-28px', top: '4px' }}>
        <svg width={28} height={30} viewBox="0 0 28 30" fill="none" style={{ transform: `scaleX(${dir * -1})` }}>
          <rect x="4" y="4" width="6" height="14" rx="3" fill={color} opacity="0.6" />
          <rect x="2" y="16" width="18" height="4" rx="2" fill="#444" opacity="0.6" />
        </svg>
      </div>
    </div>
  )
}

function Legs({ color }) {
  return (
    <div className="absolute -bottom-9 left-1/2 -translate-x-1/2 z-10 flex gap-2 pointer-events-none">
      <motion.svg width="12" height="20" viewBox="0 0 12 20" fill="none"
        animate={{ rotate: [0, 8, 0, -6, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <rect x="2" y="0" width="8" height="12" rx="3" fill={color} opacity="0.8" />
        <path d="M0,12 L12,12 L10,18 Q8,20 6,20 Q4,20 2,18 Z" fill="#333" />
      </motion.svg>
      <motion.svg width="12" height="20" viewBox="0 0 12 20" fill="none"
        animate={{ rotate: [0, -6, 0, 8, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <rect x="2" y="0" width="8" height="12" rx="3" fill={color} opacity="0.8" />
        <path d="M0,12 L12,12 L10,18 Q8,20 6,20 Q4,20 2,18 Z" fill="#333" />
      </motion.svg>
    </div>
  )
}

export default function SoldierBox({ children, color = '#d97706', index = 0, total = 5 }) {
  const bodyCtrls = useAnimation()
  const helmetCtrls = useAnimation()
  const flashCtrls = useAnimation()
  const timeoutRef = useRef(null)
  const rnd = useRef(seeded(index * 9973 + 137)).current

  const dir = index < total / 2 ? FACING_RIGHT : FACING_LEFT

  useEffect(() => {
    let active = true

    async function loop() {
      while (active) {
        await new Promise(r => { timeoutRef.current = setTimeout(r, rnd() * 2500 + 800) })
        if (!active) return

        const action = rnd()
        const body = { transition: { type: 'spring', stiffness: 300, damping: 12 } }

        if (action < 0.2) {
          // Aim & shoot
          const recoilX = dir * (rnd() * 12 + 6)
          await bodyCtrls.start({ x: recoilX * 0.3, rotate: dir * 2, transition: { duration: 0.1 } })
          flashCtrls.start({ scale: [0, 1.5, 0], opacity: [0, 1, 0], transition: { duration: 0.2 } })
          await bodyCtrls.start({ x: recoilX, rotate: dir * (rnd() * 3 + 2), scaleY: 0.93, ...body })
          await bodyCtrls.start({ x: 0, rotate: 0, scaleY: 1, ...body })
        } else if (action < 0.35) {
          // Jump
          const h = -(rnd() * 18 + 10)
          await bodyCtrls.start({ y: h, scaleY: 0.88, transition: { duration: 0.15, ease: 'easeOut' } })
          await helmetCtrls.start({ y: h * 0.5, transition: { duration: 0.15 } })
          await bodyCtrls.start({ y: 0, scaleY: 1.06, transition: { duration: 0.2, ease: 'easeIn' } })
          await bodyCtrls.start({ scaleY: 1, transition: { duration: 0.1 } })
          await helmetCtrls.start({ y: 0, transition: { duration: 0.1 } })
        } else if (action < 0.5) {
          // Crouch/crawl
          await bodyCtrls.start({ scaleY: 0.7, y: 12, transition: { duration: 0.2 } })
          await bodyCtrls.start({ x: dir * (rnd() * 8 + 4), transition: { duration: 0.4 } })
          await bodyCtrls.start({ scaleY: 1, y: 0, x: 0, transition: { duration: 0.2 } })
        } else if (action < 0.65) {
          // Take hit / flinch
          const hitDir = dir * -1
          await bodyCtrls.start({ x: hitDir * 10, rotate: hitDir * 4, scaleX: 0.9, transition: { duration: 0.08 } })
          await bodyCtrls.start({ x: 0, rotate: 0, scaleX: 1, transition: { duration: 0.3 } })
        } else {
          // Idle sway
          await bodyCtrls.start({
            x: [0, dir * 3, 0, dir * -2, 0],
            rotate: [0, dir, 0, -dir, 0],
            transition: { duration: rnd() * 2 + 1.5, ease: 'easeInOut' }
          })
        }
      }
    }

    loop()
    return () => { active = false; clearTimeout(timeoutRef.current) }
  }, [])

  return (
    <div className="relative" style={{ perspective: '600px' }}>
      {/* Legs */}
      <Legs color={color} />

      {/* Helmet */}
      <motion.div className="absolute -top-5 left-1/2 -translate-x-1/2 z-20 pointer-events-none" animate={helmetCtrls}>
        <Helmet color={color} dir={dir} />
      </motion.div>

      {/* Arms */}
      <Arms color={color} dir={dir} />

      {/* Muzzle flash */}
      <motion.div
        className="absolute pointer-events-none z-20"
        style={{ top: '35%', [dir === 1 ? 'right' : 'left']: '-30px' }}
        animate={flashCtrls}
      >
        <div className="w-5 h-5 bg-yellow-300 rounded-full blur-md" />
      </motion.div>

      {/* Body */}
      <motion.div
        animate={bodyCtrls}
        style={{ transformOrigin: 'center bottom' }}
      >
        {children}
      </motion.div>
    </div>
  )
}
