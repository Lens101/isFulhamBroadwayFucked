'use client'
import ClientButton from '@/components/ClientButton'
import { useState, useEffect } from 'react'
import { TMatch } from '@/components/ClientButton'
import Fixture from '@/components/Fixture'
import GameToday from '@/components/GameToday'

export default function Home() {
  const [matches, setMatches] = useState<TMatch[]>([])
  const [gameToday, setGameToday] = useState(false)

  // Check if today has a match
  useEffect(() => {
    const today = new Date()
    const todayDateString = today.toISOString().split('T')[0]

    const hasGameToday = matches?.some((match) => {
      const matchDate = match.date.split(' ')[0] // Get the date part
      return matchDate === todayDateString // Compare dates
    })

    setGameToday(hasGameToday) // Update gameToday state
  }, [matches]) // Dependency on matches to recalculate when matches change

  return (
    <div>
      <GameToday />
      <Fixture />
    </div>
  )
}
