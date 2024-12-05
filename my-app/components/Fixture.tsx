/* eslint-disable @next/next/no-img-element */
// /components/Fixture.tsx
import React, { useEffect, useState } from 'react'

type Fixture = {
  homeTeam: string
  awayTeam: string
  isChelseaAtHome: boolean
  venue: string
  kickoffTime: string
  competition: string
  clubCrestUrl: string
  matchDate: string
  broadcasterLogoUrl: string
  homeCrestUrl: string
  awayCrestUrl: string
}

const Fixture = () => {
  const [fixtures, setFixtures] = useState<Fixture[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/trimChelseaEndpoint')
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }

        const data: Fixture[] = await res.json()
        setFixtures(data)
      } catch (error) {
        console.error('Error fetching fixtures:', error)
        setError('Failed to load fixtures. Please try again later.')
      }
    }

    fetchData()
  }, [])

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  return (
    <div className="p-4 space-y-8 w-auto max-w-2xl m-auto">
      {fixtures.map((fixture, index) => (
        <div key={index} className="bg-white shadow-lg p-4 rounded-md">
          <div className="text-center text-lg font-semibold text-gray-800">
            {fixture.matchDate}
          </div>
          <div className="text-center text-sm text-gray-600">
            {fixture.competition} | {fixture.venue}
          </div>

          <div className="flex items-center mt-4 justify-between">
            {/* Home Team */}
            <div className="flex items-center space-x-2">
              <img
                src={fixture.homeCrestUrl}
                alt="home logo"
                className="w-10 h-10"
              />
              <span className="font-medium text-md text-gray-900">
                {fixture.homeTeam}
              </span>
            </div>

            {/* Kickoff Time */}
            <div className="text-center font-bold text-xl text-gray-900 absolute left-1/2 transform -translate-x-1/2">
              {fixture.kickoffTime}
            </div>

            {/* Away Team */}
            <div className="flex items-center space-x-2">
              <span className="font-medium text-md text-gray-900">
                {fixture.awayTeam}
              </span>
              <img
                src={fixture.awayCrestUrl}
                alt="away logo"
                className="w-10 h-10"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Fixture