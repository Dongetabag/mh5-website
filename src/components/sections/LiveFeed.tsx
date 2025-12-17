'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { NewsArticle, TrendingTopic } from '@/services/googleAI'

/**
 * LIVE FEED - Real-time Basketball News Platform
 * ==============================================
 * AI-powered live news feed for young basketball enthusiasts
 * Features:
 * - Real-time news updates
 * - Trending topics
 * - Category filtering
 * - Engagement metrics
 * - Mobile-first design
 */

interface LiveFeedProps {
  initialNews?: NewsArticle[]
  initialTrends?: TrendingTopic[]
}

const categoryColors = {
  news: { bg: 'bg-[var(--color-primary)]/15', text: 'text-[var(--color-primary)]', border: 'border-[var(--color-primary)]/30' },
  analysis: { bg: 'bg-[var(--color-secondary)]/15', text: 'text-[var(--color-secondary)]', border: 'border-[var(--color-secondary)]/30' },
  exclusive: { bg: 'bg-red-500/15', text: 'text-red-400', border: 'border-red-500/30' },
  lifestyle: { bg: 'bg-emerald-500/15', text: 'text-emerald-400', border: 'border-emerald-500/30' },
  highlights: { bg: 'bg-purple-500/15', text: 'text-purple-400', border: 'border-purple-500/30' },
}

const categoryEmojis = {
  news: '📰',
  analysis: '📊',
  exclusive: '⭐',
  lifestyle: '🏀',
  highlights: '🎬',
}

export default function LiveFeed({ initialNews = [], initialTrends = [] }: LiveFeedProps) {
  const [news, setNews] = useState<NewsArticle[]>(initialNews)
  const [trends, setTrends] = useState<TrendingTopic[]>(initialTrends)
  const [activeFilter, setActiveFilter] = useState<string>('all')
  const [isLoading, setIsLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<string>('')
  const [isLive, setIsLive] = useState(true)

  // Fetch news from API
  const fetchNews = useCallback(async () => {
    try {
      const response = await fetch('/api/news')
      const data = await response.json()

      if (data.success) {
        setNews(data.data.news)
        setTrends(data.data.trends)
        setLastUpdated(new Date().toLocaleTimeString())
      }
    } catch (error) {
      console.error('Failed to fetch news:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Initial fetch and polling
  useEffect(() => {
    fetchNews()

    // Refresh every 5 minutes when live
    const interval = setInterval(() => {
      if (isLive) {
        fetchNews()
      }
    }, 300000)

    return () => clearInterval(interval)
  }, [fetchNews, isLive])

  // Filter news by category
  const filteredNews = activeFilter === 'all'
    ? news
    : news.filter(article => article.category === activeFilter)

  // Format engagement numbers
  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
  }

  const filters = [
    { id: 'all', label: 'For You', emoji: '🔥' },
    { id: 'news', label: 'News', emoji: '📰' },
    { id: 'highlights', label: 'Highlights', emoji: '🎬' },
    { id: 'exclusive', label: 'Exclusive', emoji: '⭐' },
    { id: 'lifestyle', label: 'Lifestyle', emoji: '🏀' },
  ]

  return (
    <section className="py-16 relative overflow-hidden" style={{ backgroundColor: 'var(--color-bg-primary)' }}>
      {/* Background Pattern */}
      <div className="absolute inset-0 court-pattern opacity-30" />

      {/* Basketball arc decoration */}
      <div className="absolute top-0 right-0 w-[400px] h-[200px] border-b-2 border-l-2 border-[var(--color-primary)]/10 rounded-bl-3xl" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[150px] border-t-2 border-r-2 border-[var(--color-primary)]/10 rounded-tr-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-3xl md:text-4xl font-black text-[var(--color-text-primary)]">
                The Feed
              </h2>
              {/* Live indicator */}
              <motion.div
                className="flex items-center gap-2 px-3 py-1 rounded-lg bg-red-500/20 border border-red-500/30"
                animate={{ opacity: isLive ? [1, 0.6, 1] : 1 }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-2 h-2 rounded-sm bg-red-500" />
                <span className="text-xs font-semibold text-red-400 uppercase tracking-wider">Live</span>
              </motion.div>
            </div>
            <p className="text-[var(--color-text-muted)]">
              Real-time basketball news curated for you
            </p>
          </div>

          {/* Last updated */}
          <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Updated {lastUpdated || 'just now'}</span>
            <button
              onClick={fetchNews}
              className="ml-2 p-1.5 rounded-md hover:bg-[var(--color-bg-secondary)] transition-colors"
              title="Refresh"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>
        </div>

        {/* Category Filters - Scrollable on mobile */}
        <div className="mb-8 -mx-4 px-4 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 min-w-max pb-2">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`
                  flex items-center gap-2 px-4 py-2.5 rounded-2xl font-medium text-sm
                  transition-all duration-300 whitespace-nowrap
                  ${activeFilter === filter.id
                    ? 'bg-[var(--color-primary)] text-[var(--color-text-inverse)] shadow-lg shadow-[var(--color-primary)]/25'
                    : 'bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)] border border-[var(--color-border-default)]'
                  }
                `}
              >
                <span>{filter.emoji}</span>
                <span>{filter.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Feed - 2 columns on large screens */}
          <div className="lg:col-span-2 space-y-4">
            {isLoading ? (
              // Loading skeletons
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="animate-pulse bg-[var(--color-bg-secondary)] rounded-2xl p-6">
                  <div className="h-4 bg-[var(--color-bg-tertiary)] rounded w-24 mb-4" />
                  <div className="h-6 bg-[var(--color-bg-tertiary)] rounded w-3/4 mb-3" />
                  <div className="h-4 bg-[var(--color-bg-tertiary)] rounded w-full mb-2" />
                  <div className="h-4 bg-[var(--color-bg-tertiary)] rounded w-2/3" />
                </div>
              ))
            ) : (
              <AnimatePresence mode="popLayout">
                {filteredNews.map((article, index) => (
                  <motion.article
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.05 }}
                    className="group relative bg-[var(--color-bg-secondary)] rounded-2xl p-6 border border-[var(--color-border-default)] hover:border-[var(--color-primary)]/50 transition-all duration-300 cursor-pointer"
                  >
                    {/* Trending badge */}
                    {article.trending && (
                      <motion.div
                        className="absolute -top-2 -right-2 px-3 py-1 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold shadow-lg"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        🔥 TRENDING
                      </motion.div>
                    )}

                    {/* Category & Time */}
                    <div className="flex items-center justify-between mb-3">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold ${categoryColors[article.category].bg} ${categoryColors[article.category].text} ${categoryColors[article.category].border} border`}>
                        <span>{categoryEmojis[article.category]}</span>
                        <span className="uppercase tracking-wider">{article.category}</span>
                      </span>
                      <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
                        <span>{article.timestamp}</span>
                        <span>•</span>
                        <span>{article.readTime}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-2 group-hover:text-[var(--color-primary)] transition-colors">
                      {article.title}
                    </h3>

                    {/* Summary */}
                    <p className="text-[var(--color-text-secondary)] mb-4 line-clamp-2">
                      {article.summary}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {article.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-1 rounded-lg bg-[var(--color-bg-tertiary)] text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors cursor-pointer"
                        >
                          #{tag.replace(/\s+/g, '')}
                        </span>
                      ))}
                    </div>

                    {/* Engagement */}
                    <div className="flex items-center gap-6 pt-4 border-t border-[var(--color-border-default)]">
                      <button className="flex items-center gap-2 text-[var(--color-text-muted)] hover:text-red-400 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <span className="text-sm font-medium">{formatNumber(article.engagement.likes)}</span>
                      </button>
                      <button className="flex items-center gap-2 text-[var(--color-text-muted)] hover:text-[var(--color-secondary)] transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <span className="text-sm font-medium">{formatNumber(article.engagement.comments)}</span>
                      </button>
                      <button className="flex items-center gap-2 text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                        </svg>
                        <span className="text-sm font-medium">{formatNumber(article.engagement.shares)}</span>
                      </button>
                      <button className="ml-auto flex items-center gap-2 text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                      </button>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            )}
          </div>

          {/* Sidebar - Trending & Quick Stats */}
          <div className="space-y-6">
            {/* Trending Topics */}
            <div className="bg-[var(--color-bg-secondary)] rounded-2xl p-6 border border-[var(--color-border-default)]">
              <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
                <span className="text-xl">🔥</span>
                Trending Now
              </h3>
              <div className="space-y-3">
                {trends.slice(0, 6).map((trend, index) => (
                  <motion.div
                    key={trend.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-[var(--color-text-muted)] w-5">
                        {index + 1}
                      </span>
                      <span className="text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition-colors font-medium">
                        {trend.topic}
                      </span>
                    </div>
                    {/* Heat indicator */}
                    <div className="flex items-center gap-1">
                      <div className="w-12 h-1.5 rounded-md bg-[var(--color-bg-tertiary)] overflow-hidden">
                        <motion.div
                          className="h-full rounded-md bg-gradient-to-r from-orange-500 to-red-500"
                          initial={{ width: 0 }}
                          animate={{ width: `${trend.heat}%` }}
                          transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Quick Action Card */}
            <div className="bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-secondary)]/20 rounded-2xl p-6 border border-[var(--color-primary)]/30">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)] flex items-center justify-center">
                  <svg className="w-6 h-6 text-[var(--color-text-inverse)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-[var(--color-text-primary)]">Stay Updated</h4>
                  <p className="text-sm text-[var(--color-text-muted)]">Never miss a story</p>
                </div>
              </div>
              <button className="w-full py-3 rounded-2xl bg-[var(--color-primary)] text-[var(--color-text-inverse)] font-semibold hover:brightness-110 transition-all">
                Enable Notifications
              </button>
            </div>

            {/* Community Stats */}
            <div className="bg-[var(--color-bg-secondary)] rounded-2xl p-6 border border-[var(--color-border-default)]">
              <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-4">
                Community Pulse
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-black text-[var(--color-primary)]">2.4K</div>
                  <div className="text-xs text-[var(--color-text-muted)]">Online Now</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-black text-[var(--color-secondary)]">156</div>
                  <div className="text-xs text-[var(--color-text-muted)]">New Posts</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-black text-emerald-400">89%</div>
                  <div className="text-xs text-[var(--color-text-muted)]">Engagement</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-black text-purple-400">47</div>
                  <div className="text-xs text-[var(--color-text-muted)]">Cities</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
