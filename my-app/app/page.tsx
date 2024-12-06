'use client'
import Fixture from '@/components/Fixture'
import GameToday from '@/components/GameToday'

export default function Home() {
  return (
    <div>
      <GameToday />
      <Fixture />
    </div>
  )
}
