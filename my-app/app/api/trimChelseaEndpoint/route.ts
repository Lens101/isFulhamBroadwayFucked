import { NextResponse } from 'next/server'

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

type Game = {
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

type ApiResponse = {
  items: {
    id: string
    month: number
    year: number
    monthName: string
    items: Game[]
  }[]
}

export async function GET() {
  try {
    const response = await fetch(
      'https://www.chelseafc.com/en/api/fixtures/upcoming?pageId=30EGwHPO9uwBCc75RQY6kg',
    )

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch data' },
        { status: response.status },
      )
    }

    const data: ApiResponse = await response.json()

    // Iterate through all months and collect games
    const trimmedResponse =
      data?.items?.flatMap((month) =>
        month.items.map((game: Game) => {
          const isChelseaAtHome = game.matchUp.home.clubName === 'Chelsea'
          const homeTeam = game.matchUp.home.clubName
          const awayTeam = game.matchUp.away.clubName
          const homeCrestUrl = game.matchUp.home.clubCrestUrl
          const awayCrestUrl = game.matchUp.away.clubCrestUrl

          return {
            homeTeam,
            awayTeam,
            isChelseaAtHome,
            venue: game.venue,
            kickoffTime: game.kickoffTime,
            competition: game.competition,
            clubCrestUrl: isChelseaAtHome ? homeCrestUrl : awayCrestUrl,
            matchDate: game.kickoffDate,
            broadcasterLogoUrl: game?.broadcasterLogo?.file?.url || '',
            homeCrestUrl,
            awayCrestUrl,
          }
        }),
      ) || []

    return NextResponse.json(trimmedResponse)
  } catch (error) {
    console.error('Failed to fetch data:', error)
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 })
  }
}
