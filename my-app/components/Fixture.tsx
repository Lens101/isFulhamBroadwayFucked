import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import type { Fixture } from './validation/fixture_validation'

const Fixture = () => {
  const [fixtures, setFixtures] = useState<Fixture[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isPreviousOpen, setIsPreviousOpen] = useState(false) // State for collapsible section

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

  const currentDate = new Date()

  const previousFixtures = fixtures.filter(
    (fixture) => new Date(fixture.matchDate) < currentDate,
  )
  const upcomingFixtures = fixtures.filter(
    (fixture) => new Date(fixture.matchDate) >= currentDate,
  )

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  return (
    <div className="p-4 space-y-8 w-auto max-w-2xl m-auto">
      {/* Previous Fixtures */}
      {previousFixtures.length > 0 && (
        <div>
          <div
            className="flex items-center justify-between cursor-pointer text-lg font-bold text-white border-b border-gray-300 pb-2 mb-4"
            onClick={() => setIsPreviousOpen((prev) => !prev)} // Toggle state on click
          >
            Previous Games
            <span>
              {isPreviousOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 15l7-7 7 7"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              )}
            </span>
          </div>
          {isPreviousOpen && (
            <div>
              {previousFixtures.map((fixture, index) => (
                <div
                  key={index}
                  className="bg-white shadow-lg p-4 rounded-md mb-4"
                >
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
          )}
        </div>
      )}

      {/* Upcoming Fixtures */}
      {upcomingFixtures.length > 0 && (
        <div>
          <div className="text-lg font-bold text-white border-b border-gray-300 pb-2 mb-4">
            Upcoming Games
          </div>
          {upcomingFixtures.map((fixture, index) => (
            <div key={index} className="bg-white shadow-lg p-4 rounded-md mb-4">
              <div className="text-center text-lg font-semibold text-gray-800">
                {fixture.matchDate}
              </div>
              <div className="text-center text-sm text-gray-600">
                {fixture.competition} | {fixture.venue}
              </div>
              <div className="flex items-center mt-4 justify-between">
                {/* Home Team */}
                <div className="flex items-center space-x-2">
                  <Image
                    src={fixture.homeCrestUrl}
                    alt="home logo"
                    className="w-10 h-10"
                    width={40}
                    height={40}
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
                  <Image
                    src={fixture.awayCrestUrl}
                    alt="away logo"
                    className="w-10 h-10"
                    width={40}
                    height={40}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Fixture
