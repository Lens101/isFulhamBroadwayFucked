import puppeteer from 'puppeteer'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Launch Puppeteer in headless mode (ideal for server environments)
    const browser = await puppeteer.launch({
      headless: true, // Set to false only for local debugging
      // slowMo: 100,
    })

    const page = await browser.newPage()
    await page.setDefaultNavigationTimeout(6000)

    //todo: This ONLY does PL games.
    //https://www.chelseafc.com/en/matches/mens-fixtures-and-results

    // Seems like they have this API endpoint for fixtures

    //www.chelseafc.com/en/api/fixtures/upcoming?pageId=30EGwHPO9uwBCc75RQY6kg
    //This is better, but it's a bit more complex to scrape.

    https: await page.goto(
      'https://statorium.com/component/joomsport/team/60-english-premier-league-2024-25/113-chelsea-fc?Itemid=153',
    )

    // Click the "Matches" tab
    await page.click('a[data-bs-toggle="tab"][href="#stab_matches"]')

    // Wait for 200ms
    await new Promise((resolve) => setTimeout(resolve, 200))

    // Extract match dates for "Stamford Bridge"
    const datesAtStamfordBridge = await page.evaluate(() => {
      const elements = Array.from(document.querySelectorAll('*'))
      const matchData: {
        game: string
        date: string
        time: string
        teams: string
        stadium: string
      }[] = []

      // Regular expression to match date formats "dd-mm-yyyy hh:mm"
      const dateRegex = /^\d{2}-\d{2}-\d{4} \d{2}:\d{2}/

      elements.forEach((element) => {
        const dateText = element.textContent?.trim() || ''

        if (dateRegex.test(dateText) && dateText.endsWith('Stamford Bridge')) {
          // Extract components from the match string
          const matchParts = dateText.match(dateRegex)
          if (matchParts) {
            const dateTime = matchParts[0]
            const teamsAndStadium = dateText.slice(dateTime.length).trim()

            // Split teams and stadium
            const [teams, stadium] = teamsAndStadium
              .split('Stamford Bridge')
              .map((part) => part.trim())

            // Create a structured object
            matchData.push({
              game: dateText,
              date: dateTime.split(' ')[0], // Only date part
              time: dateTime.split(' ')[1], // Only time part
              teams: teams || 'Unknown Teams',
              stadium: 'Stamford Bridge',
            })
          }
        }
      })

      return matchData
    })

    await browser.close()

    // Return the data as JSON
    return NextResponse.json({ matches: datesAtStamfordBridge })
  } catch (error) {
    console.error('Error scraping Chelsea data:', error)
    return NextResponse.json(
      { error: 'Failed to scrape data' },
      { status: 500 },
    )
  }
}
