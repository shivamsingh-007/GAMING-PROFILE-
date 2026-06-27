import index from './games/index.json'
import cod from './games/cod.json'
import valorant from './games/valorant.json'
import freefire from './games/freefire.json'
import amongus from './games/amongus.json'
import chess from './games/chess.json'

const rawStats = { cod, valorant, freefire, amongus, chess }

function getSummary(id, s) {
  const idx = index.find(g => g.id === id)
  if (!idx) return null
  const st = s?.stats
  if (!st) return { ...idx, hoursPlayed: 0, winRate: 0, kd: '—', rank: '—', wins: 0, matches: 0 }

  if (id === 'amongus') {
    return {
      ...idx,
      wins: (st.crewWins || 0) + (st.impostorWins || 0),
      matches: st.totalGames || 0,
      hoursPlayed: Math.round(st.totalGames * 0.15),
      winRate: st.totalGames ? Math.round(((st.crewWins || 0) + (st.impostorWins || 0)) / st.totalGames * 100) : 0,
      kd: '—',
      rank: 'Crewmate',
    }
  }
  if (id === 'chess') {
    return {
      ...idx,
      wins: st.wins || 0,
      matches: st.totalGames || 0,
      hoursPlayed: Math.round(st.totalGames * 0.1),
      winRate: st.winRate || 0,
      kd: `${st.elo}`,
      rank: `${st.peakElo || st.elo} ELO`,
    }
  }
  return {
    ...idx,
    wins: st.wins || 0,
    matches: st.matchesPlayed || 0,
    hoursPlayed: Math.round((st.matchesPlayed || 0) * 0.3),
    winRate: st.winRate || 0,
    kd: st.kd || '—',
    rank: st.currentRank || '—',
  }
}

export const gameList = index.map(g => getSummary(g.id, rawStats[g.id]))

export function getGameStats(id) {
  const raw = rawStats[id]
  if (!raw) return null
  const idx = index.find(g => g.id === id)
  const st = raw.stats
  if (!st) return { id, name: idx?.name || id, stats: null }

  if (id === 'amongus') {
    return {
      id, name: idx?.name || id, color: idx?.color || '#22ff88',
      wins: (st.crewWins || 0) + (st.impostorWins || 0),
      matches: st.totalGames || 0,
      winRate: st.totalGames ? Math.round(((st.crewWins || 0) + (st.impostorWins || 0)) / st.totalGames * 100) : 0,
      crewWinRate: st.crewWinRate,
      impostorWinRate: st.impostorWinRate,
      kd: '—',
      tier: st.playstyle || '',
      weapons: [],
    }
  }
  if (id === 'chess') {
    return {
      id, name: idx?.name || id, color: idx?.color || '#00d4ff',
      wins: st.wins || 0,
      matches: st.totalGames || 0,
      winRate: st.winRate || 0,
      kd: `${st.elo}`,
      peakRank: `${st.peakElo || st.elo} ELO`,
      tier: st.playingStyle || '',
      weapons: [],
    }
  }
  return {
    id, name: idx?.name || id, color: idx?.color || '#00d4ff',
    wins: st.wins || 0,
    matches: st.matchesPlayed || 0,
    winRate: st.winRate || 0,
    kd: st.kd || '—',
    peakRank: st.topRank || st.currentRank || '—',
    tier: st.currentRank || '',
    weapons: (st.mostUsedWeapons || st.mostUsedAgents || []).map(w => ({
      name: w.name,
      kills: w.kills || 0,
      percentage: w.usagePercent || 0,
    })),
  }
}
