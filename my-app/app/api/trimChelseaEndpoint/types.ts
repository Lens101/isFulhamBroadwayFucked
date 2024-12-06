type MatchUp = {
  home: {
    clubName: string
    clubCrestUrl: string
    score: number
  }
  away: {
    clubName: string
    clubCrestUrl: string
    score: number
  }
  status: string
  isResult: boolean
  isLive: boolean
  isHomeFixture: boolean
  kickoffTime: string
  tbc: boolean
  postponed: boolean
}

export type Game = {
  id: string
  optaId: string
  isResult: boolean
  matchUp: MatchUp
  venue: string
  competition: string
  kickoffDate: string
  kickoffTime: string
  broadcasterLogo: {
    file: {
      url: string
    }
  }
}

export type ApiResponse = {
  items: {
    id: string
    month: number
    year: number
    monthName: string
    items: Game[]
  }[]
}
