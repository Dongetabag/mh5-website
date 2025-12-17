import { NextResponse } from 'next/server'
import { generateBasketballNews, generateTrendingTopics } from '@/services/googleAI'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  try {
    // Fetch news and trends in parallel
    const [news, trends] = await Promise.all([
      generateBasketballNews(),
      generateTrendingTopics()
    ])

    return NextResponse.json({
      success: true,
      data: {
        news,
        trends,
        lastUpdated: new Date().toISOString()
      }
    })
  } catch (error) {
    console.error('News API Error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch news' },
      { status: 500 }
    )
  }
}
