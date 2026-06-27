export function Crosshair({ size = 32, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <line x1="12" y1="3" x2="12" y2="7" />
      <line x1="12" y1="17" x2="12" y2="21" />
      <line x1="3" y1="12" x2="7" y2="12" />
      <line x1="17" y1="12" x2="21" y2="12" />
      <circle cx="12" cy="12" r="1.5" fill={color} />
    </svg>
  )
}

export function Dagger({ size = 32, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 4L9 10l-6 1.5L9 16l-2 5 5-3 5 3-2-5 6-4.5L15 10z" />
      <line x1="12" y1="4" x2="12" y2="10" />
    </svg>
  )
}

export function Flame({ size = 32, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3c-2 4-6 7-6 11a6 6 0 0012 0c0-4-4-7-6-11z" />
      <path d="M10 15a2 2 0 004 0c0-1.5-1-2.5-2-4-1 1.5-2 2.5-2 4z" />
    </svg>
  )
}

export function Ghost({ size = 32, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3C7 3 3 7 3 12v6l2-2 2 2 2-2 2 2 2-2 2 2 2-2 2 2v-6c0-5-4-9-9-9z" />
      <circle cx="9" cy="10" r="1" fill={color} />
      <circle cx="15" cy="10" r="1" fill={color} />
      <path d="M9 14c.7.7 1.7 1 3 1s2.3-.3 3-1" />
    </svg>
  )
}

export function ChessKnight({ size = 32, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10 3C8.5 5 7 7 7 9c0 1.5.5 3 2 4l-1 3h8l-1-3c1.5-1 2-2.5 2-4 0-2-1.5-4-3-6l-1 2z" />
      <path d="M6 17h12l-1 3H7z" />
      <circle cx="10" cy="9" r="1" fill={color} />
    </svg>
  )
}

export const gameIcons = {
  cod: Crosshair,
  valorant: Dagger,
  freefire: Flame,
  amongus: Ghost,
  chess: ChessKnight,
}
