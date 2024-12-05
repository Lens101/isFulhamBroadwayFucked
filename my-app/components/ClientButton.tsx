'use client'

import { useState } from 'react'

export type TMatch = {
  game: string
  date: string
  time: string
  teams: string
  stadium: string
}

export type TMatchesResponse = {
  previous: TMatch[]
  upcoming: TMatch[]
}

type TProps = {
  fetchMatches: () => Promise<TMatch[]> // Ensure the function returns a Promise
}

export default function ClientButton({ fetchMatches }: TProps) {
  const [data, setData] = useState<TMatch[] | null>(null)

  const handleClick = async () => {
    try {
      const fetchedData = await fetchMatches() // Fetch the matches and set data
      setData(fetchedData)
    } catch (error) {
      console.error('CustomErr: Failed to fetch Chelsea data:', error)
    }
  }

  return (
    <div>
      <button
        style={{
          backgroundColor: 'white',
          color: 'black',
          border: '1px solid black',
          padding: '10px 20px',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
        onClick={handleClick}
      >
        Get Chelsea Data
      </button>
      {data && (
        <ul>
          {data.map((item, index) => (
            <li key={index}>
              {item.date} {item.time} - {item.teams} at {item.stadium}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
