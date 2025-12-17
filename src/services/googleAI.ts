import { GoogleGenerativeAI } from '@google/generative-ai'

/**
 * GOOGLE AI SERVICE - Live News & Content Generation
 * ==================================================
 * Uses Gemini AI to generate and curate basketball content
 * tailored to our young basketball enthusiast demographic
 */

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_KEY || '')

export interface NewsArticle {
  id: string
  title: string
  summary: string
  category: 'news' | 'analysis' | 'exclusive' | 'lifestyle' | 'highlights'
  timestamp: string
  readTime: string
  trending: boolean
  engagement: {
    likes: number
    comments: number
    shares: number
  }
  tags: string[]
  imagePrompt?: string
}

export interface TrendingTopic {
  id: string
  topic: string
  heat: number // 1-100
  category: string
}

// Generate basketball news content using Gemini
export async function generateBasketballNews(): Promise<NewsArticle[]> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })

    const prompt = `You are a basketball news curator for a young, urban basketball community platform called MH5, focused on youth basketball culture, rising stars, and street basketball.

Generate 6 basketball news articles in JSON format. The content should appeal to:
- Young basketball players (15-25 years old)
- Street basketball enthusiasts
- People interested in basketball lifestyle and culture
- Fans following rising basketball talent

Each article should have:
- title: Catchy, engaging headline (use slang appropriately)
- summary: 2-3 sentence summary
- category: one of "news", "analysis", "exclusive", "lifestyle", "highlights"
- readTime: estimated read time (e.g., "3 min read")
- trending: boolean (true for 2 articles)
- tags: 2-3 relevant tags
- engagement: { likes: number, comments: number, shares: number }

Topics should include mix of:
- NBA/Basketball news
- Rising high school/college talent
- Basketball training tips
- Street basketball culture
- Basketball lifestyle/fashion
- Local basketball scenes

Return ONLY valid JSON array, no markdown or explanation.`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    // Parse the JSON response (strip markdown if present)
    const articles = JSON.parse(cleanJsonResponse(text))

    // Add IDs and timestamps
    return articles.map((article: Omit<NewsArticle, 'id' | 'timestamp'>, index: number) => ({
      ...article,
      id: `news-${Date.now()}-${index}`,
      timestamp: getRelativeTimestamp(index),
    }))
  } catch (error) {
    console.error('Error generating news:', error)
    return getFallbackNews()
  }
}

// Generate trending topics
export async function generateTrendingTopics(): Promise<TrendingTopic[]> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })

    const prompt = `Generate 8 trending basketball topics for a young basketball community platform.

Return JSON array with:
- topic: Short trending topic/hashtag
- heat: number 60-100 (popularity score)
- category: "player", "team", "culture", "viral", "local"

Focus on what young basketball fans care about NOW.
Return ONLY valid JSON array.`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    const topics = JSON.parse(cleanJsonResponse(text))
    return topics.map((topic: Omit<TrendingTopic, 'id'>, index: number) => ({
      ...topic,
      id: `trend-${Date.now()}-${index}`,
    }))
  } catch (error) {
    console.error('Error generating trends:', error)
    return getFallbackTrends()
  }
}

// Generate personalized content suggestions
export async function generateContentSuggestions(userInterests: string[]): Promise<string[]> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })

    const prompt = `Based on these basketball interests: ${userInterests.join(', ')}

Generate 5 personalized content suggestions for a young basketball fan.
Return ONLY a JSON array of strings with engaging suggestion titles.`

    const result = await model.generateContent(prompt)
    const response = await result.response
    return JSON.parse(cleanJsonResponse(response.text()))
  } catch (error) {
    console.error('Error generating suggestions:', error)
    return [
      'Top 10 Ankle Breakers This Week',
      'Rising Stars You Need to Watch',
      'Best Basketball Shoes of 2024',
      'Street Ball Legends: Where Are They Now?',
      'Training Tips from the Pros'
    ]
  }
}

// Helper: Strip markdown code blocks from response
function cleanJsonResponse(text: string): string {
  // Remove markdown code blocks
  let cleaned = text.trim()
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.slice(7)
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.slice(3)
  }
  if (cleaned.endsWith('```')) {
    cleaned = cleaned.slice(0, -3)
  }
  return cleaned.trim()
}

// Helper: Get relative timestamp
function getRelativeTimestamp(index: number): string {
  const times = ['2 min ago', '15 min ago', '1 hour ago', '3 hours ago', '6 hours ago', 'Yesterday']
  return times[index] || times[times.length - 1]
}

// Fallback news if API fails
function getFallbackNews(): NewsArticle[] {
  return [
    {
      id: 'fallback-1',
      title: '🔥 Top Prospect Makes College Decision - And It\'s Not Where You Think',
      summary: 'The #1 ranked point guard in the class of 2025 just shocked everyone with his commitment announcement. Here\'s why his decision changes everything.',
      category: 'news',
      timestamp: 'Just now',
      readTime: '4 min read',
      trending: true,
      engagement: { likes: 2847, comments: 342, shares: 891 },
      tags: ['Recruiting', 'College Basketball', 'Breaking']
    },
    {
      id: 'fallback-2',
      title: 'This High School Junior Has NBA Scouts Going Crazy',
      summary: 'Standing at 6\'8" with guard skills, Marcus Thompson is already drawing comparisons to Kevin Durant. We got exclusive access to his training.',
      category: 'exclusive',
      timestamp: '30 min ago',
      readTime: '6 min read',
      trending: true,
      engagement: { likes: 5621, comments: 728, shares: 1203 },
      tags: ['Rising Stars', 'Exclusive', 'High School']
    },
    {
      id: 'fallback-3',
      title: 'The Workout That\'s Taking Over Basketball TikTok',
      summary: 'This 15-minute routine is helping players add inches to their vertical. Here\'s the science behind why it actually works.',
      category: 'lifestyle',
      timestamp: '2 hours ago',
      readTime: '3 min read',
      trending: false,
      engagement: { likes: 8932, comments: 1247, shares: 3421 },
      tags: ['Training', 'Fitness', 'Viral']
    },
    {
      id: 'fallback-4',
      title: 'Breaking Down the Most Unstoppable Move in Pickup Basketball',
      summary: 'Why the hesi pull-up jimbo is still cooking defenders in 2024, and how you can add it to your game tonight.',
      category: 'analysis',
      timestamp: '4 hours ago',
      readTime: '5 min read',
      trending: false,
      engagement: { likes: 3245, comments: 456, shares: 892 },
      tags: ['Skills', 'Analysis', 'Streetball']
    },
    {
      id: 'fallback-5',
      title: 'The Best Basketball Courts You\'ve Never Heard Of',
      summary: 'From hidden gems in LA to legendary parks in NYC, these are the courts where real hoopers go to prove themselves.',
      category: 'lifestyle',
      timestamp: '6 hours ago',
      readTime: '7 min read',
      trending: false,
      engagement: { likes: 4521, comments: 623, shares: 1567 },
      tags: ['Culture', 'Streetball', 'Travel']
    },
    {
      id: 'fallback-6',
      title: 'Last Night\'s Top 10 Plays Will Make Your Jaw Drop',
      summary: 'From a between-the-legs dunk to a full-court buzzer beater, these highlights are absolutely insane.',
      category: 'highlights',
      timestamp: 'Yesterday',
      readTime: '2 min read',
      trending: false,
      engagement: { likes: 12453, comments: 1892, shares: 4521 },
      tags: ['Highlights', 'NBA', 'Must Watch']
    }
  ]
}

// Fallback trends if API fails
function getFallbackTrends(): TrendingTopic[] {
  return [
    { id: 'trend-1', topic: '#RookieWatch', heat: 95, category: 'player' },
    { id: 'trend-2', topic: 'Ankle Breaker SZN', heat: 88, category: 'viral' },
    { id: 'trend-3', topic: '#HoopDreams', heat: 82, category: 'culture' },
    { id: 'trend-4', topic: 'Draft Stock Rising', heat: 79, category: 'player' },
    { id: 'trend-5', topic: '#StreetballKings', heat: 75, category: 'culture' },
    { id: 'trend-6', topic: 'Game Winner', heat: 71, category: 'viral' },
    { id: 'trend-7', topic: '#BucketSZN', heat: 68, category: 'culture' },
    { id: 'trend-8', topic: 'Next Up 🔥', heat: 65, category: 'player' }
  ]
}

export default {
  generateBasketballNews,
  generateTrendingTopics,
  generateContentSuggestions
}
