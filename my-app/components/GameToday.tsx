/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'

type GameInfo = {
  homeTeam: string
  awayTeam: string
  isChelseaAtHome: boolean
  venue: string
  kickoffTime: string
  competition: string
  clubCrestUrl: string
  matchDate: string
  broadcasterLogoUrl: string
}

const GameToday = () => {
  const [gameToday, setGameToday] = useState<boolean>(false)
  const [gameInfo, setGameInfo] = useState<GameInfo | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/gameToday')
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }

        const data = await res.json()

        if (data.gameToday) {
          setGameToday(true)
          setGameInfo(data.gameInfo)
        } else {
          setGameToday(false)
        }
      } catch (error) {
        console.error('Error fetching game data:', error)
        setError('Failed to load data. Please try again later.')
      }
    }

    fetchData()
  }, [])

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  return (
    <div className="p-4 space-y-8 w-auto max-w-2xl m-auto">
      {gameToday && gameInfo ? (
        <div className="bg-white shadow-lg p-4 rounded-md">
          <div className="text-center text-lg font-semibold text-gray-800">
            Game Today: {gameInfo.matchDate}
          </div>
          <div className="text-center text-sm text-gray-600">
            {gameInfo.competition} | {gameInfo.venue}
          </div>

          <div className="flex items-center justify-between mt-4">
            {/* Home Team */}
            <div className="flex items-center space-x-2">
              <img
                src={gameInfo.clubCrestUrl}
                alt={`${gameInfo.homeTeam} logo`}
                className="w-10 h-10"
              />
              <span className="font-medium text-lg">{gameInfo.homeTeam}</span>
            </div>

            {/* Kickoff Time */}
            <div className="text-center font-bold text-xl text-gray-900">
              {gameInfo.kickoffTime}
            </div>

            {/* Away Team */}
            <div className="flex items-center space-x-2">
              <span className="font-medium text-lg">{gameInfo.awayTeam}</span>
              <img
                src={gameInfo.clubCrestUrl}
                alt={`${gameInfo.awayTeam} logo`}
                className="w-10 h-10"
              />
            </div>
          </div>

          {/* Avoid Fulham Broadway warning */}
          <div className="mt-6 text-center text-red-500 font-bold">
            Theres a game today! Avoid Fulham Broadway station.
          </div>
        </div>
      ) : (
        <div className="bg-lime-600 shadow-lg p-4 rounded-md text-center text-lg font-semibold text-gray-100">
          No game today.
        </div>
      )}
    </div>
  )
}

export default GameToday
