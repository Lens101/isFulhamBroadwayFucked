import { NextResponse } from 'next/server'

// Define types for MatchUp and Game
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
  kickoffDate: string // This will be used for date comparison
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
    // Fetch upcoming games data
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

    // Get today's date in the format used by the API (assuming YYYY-MM-DD)
    const today = new Date().toISOString().split('T')[0]

    // Find any game that has a kickoffDate matching today
    const gameToday = data?.items
      ?.flatMap((month) => month.items)
      .find((game: Game) => game.kickoffDate === today)

    // Check if there is a game today
    if (gameToday) {
      const isChelseaAtHome = gameToday.matchUp.home.clubName === 'Chelsea'
      const homeTeam = gameToday.matchUp.home.clubName
      const awayTeam = gameToday.matchUp.away.clubName

      const gameInfo = {
        homeTeam,
        awayTeam,
        isChelseaAtHome,
        venue: gameToday.venue,
        kickoffTime: gameToday.kickoffTime,
        competition: gameToday.competition,
        clubCrestUrl: isChelseaAtHome
          ? gameToday.matchUp.home.clubCrestUrl
          : gameToday.matchUp.away.clubCrestUrl,
        matchDate: gameToday.kickoffDate,
        broadcasterLogoUrl: gameToday?.broadcasterLogo?.file?.url || '',
      }

      return NextResponse.json({ gameToday: true, gameInfo })
    }

    return NextResponse.json({ gameToday: false, message: 'No game today.' })
  } catch (error) {
    console.error('Failed to fetch data:', error)
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 })
  }
}
