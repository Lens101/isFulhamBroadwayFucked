export type TMatch = {
  game: string
  date: string
  time: string
  teams: string
  stadium: string
}

export type TProps = {
  fetchMatches: () => Promise<TMatch[]>
}
