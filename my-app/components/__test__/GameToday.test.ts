// import React from 'react'
// import { render, screen, waitFor } from '@testing-library/react'
// import '@testing-library/jest-dom'
// import GameToday from '../GameToday'
// global.fetch = jest.fn()

// describe('GameToday Component', () => {
//   afterEach(() => {
//     jest.clearAllMocks() // Reset mock after each test
//   })

//   it('displays game details if there is a game today', async () => {
//     // Mock a successful response with a game today
//     ;(fetch as jest.Mock).mockResolvedValueOnce({
//       ok: true,
//       json: async () => ({
//         gameToday: true,
//         gameInfo: {
//           homeTeam: 'Chelsea',
//           awayTeam: 'Arsenal',
//           isChelseaAtHome: true,
//           venue: 'Stamford Bridge',
//           kickoffTime: '15:00',
//           competition: 'Premier League',
//           clubCrestUrl: 'https://path/to/chelsea/crest.png',
//           matchDate: '2024-10-24',
//           broadcasterLogoUrl: 'https://path/to/broadcaster/logo.png',
//         },
//       }),
//     })

//     render(<GameToday />)

//     // Ensure the component fetches data and renders correctly
//     await waitFor(() => {
//       expect(screen.getByText('Game Today: 2024-10-24')).toBeInTheDocument()
//       expect(
//         screen.getByText('Premier League | Stamford Bridge'),
//       ).toBeInTheDocument()
//       expect(screen.getByText('Chelsea')).toBeInTheDocument()
//       expect(screen.getByText('Arsenal')).toBeInTheDocument()
//       expect(
//         screen.getByText(
//           "There's a game today! Avoid Fulham Broadway station.",
//         ),
//       ).toBeInTheDocument()
//     })
//   })

//   it('displays no game today if there is no game', async () => {
//     // Mock a successful response with no game today
//     ;(fetch as jest.Mock).mockResolvedValueOnce({
//       ok: true,
//       json: async () => ({
//         gameToday: false,
//         message: 'No game today.',
//       }),
//     })

//     render(<GameToday />)

//     // Ensure "No game today" message is displayed
//     await waitFor(() => {
//       expect(screen.getByText('No game today.')).toBeInTheDocument()
//     })
//   })

//   it('handles errors and shows error message', async () => {
//     // Mock a failed fetch request
//     ;(fetch as jest.Mock).mockRejectedValueOnce(new Error('Fetch failed'))

//     render(<GameToday />)

//     // Ensure the error message is displayed
//     await waitFor(() => {
//       expect(
//         screen.getByText('Failed to load data. Please try again later.'),
//       ).toBeInTheDocument()
//     })
//   })
// })
