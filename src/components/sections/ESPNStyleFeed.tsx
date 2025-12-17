'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

/**
 * ESPN-STYLE FEED - Professional Sports Media Layout
 * ===================================================
 * Clean, dense layout matching ESPN's professional sports platform
 * Features:
 * - 16:9 video/image ratios
 * - Multi-column grid layout
 * - Compact article cards
 * - Right sidebar
 * - Proper content density
 */

interface Article {
  id: string
  title: string
  category: string
  timestamp: string
  image?: string
  isVideo?: boolean
  duration?: string
  isLive?: boolean
  author?: string
}

interface LiveGame {
  id: string
  team1: string
  team2: string
  score1: number
  score2: number
  quarter: string
  time: string
}

export default function ESPNStyleFeed() {
  const [activeTab, setActiveTab] = useState('top')

  // Featured/Hero content
  const featuredArticle: Article = {
    id: 'featured-1',
    title: 'Rising Star Alert: This 17-Year-Old Is Rewriting the Recruiting Playbook',
    category: 'BASKETBALL',
    timestamp: '2h',
    image: '/images/featured-basketball.jpg',
    isVideo: true,
    duration: '3:42',
    author: 'MH5 Staff'
  }

  // Main feed articles
  const mainArticles: Article[] = [
    {
      id: '1',
      title: 'Top 10 Plays of the Week: Ankle Breakers Edition',
      category: 'HIGHLIGHTS',
      timestamp: '4m',
      isVideo: true,
      duration: '2:15'
    },
    {
      id: '2',
      title: 'Draft Stock Watch: Who\'s Rising, Who\'s Falling',
      category: 'ANALYSIS',
      timestamp: '28m',
    },
    {
      id: '3',
      title: 'The Training Routine That\'s Taking Over Basketball TikTok',
      category: 'LIFESTYLE',
      timestamp: '1h',
      isVideo: true,
      duration: '5:30'
    },
    {
      id: '4',
      title: 'Exclusive: Inside Look at Elite Basketball Camp',
      category: 'EXCLUSIVE',
      timestamp: '2h',
    },
    {
      id: '5',
      title: 'College Commitments: Latest Recruiting News',
      category: 'RECRUITING',
      timestamp: '3h',
    },
    {
      id: '6',
      title: 'Best Basketball Shoes for Guards in 2024',
      category: 'GEAR',
      timestamp: '4h',
    },
  ]

  // Sidebar trending
  const trendingArticles: Article[] = [
    { id: 't1', title: '#1 Ranked PG Makes Shocking Decision', category: 'BREAKING', timestamp: '12m' },
    { id: 't2', title: 'This Workout Adds 6 Inches to Your Vertical', category: 'TRAINING', timestamp: '45m' },
    { id: 't3', title: 'Streetball Legend Returns to Rucker Park', category: 'CULTURE', timestamp: '1h' },
    { id: 't4', title: 'Best Crossover Moves to Learn This Week', category: 'SKILLS', timestamp: '2h' },
    { id: 't5', title: 'High School Phenom Drops 50 Points', category: 'NEWS', timestamp: '3h' },
  ]

  // Live scores mock
  const liveGames: LiveGame[] = [
    { id: 'g1', team1: 'Lakers', team2: 'Celtics', score1: 87, score2: 92, quarter: 'Q3', time: '4:32' },
    { id: 'g2', team1: 'Heat', team2: 'Bucks', score1: 78, score2: 81, quarter: 'Q4', time: '8:15' },
  ]

  const tabs = [
    { id: 'top', label: 'Top Stories' },
    { id: 'highlights', label: 'Highlights' },
    { id: 'recruiting', label: 'Recruiting' },
    { id: 'lifestyle', label: 'Lifestyle' },
  ]

  return (
    <section className="bg-[#0a0a0a] min-h-screen">
      {/* Sub Navigation */}
      <div className="border-b border-white/10 bg-[#111]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide py-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  px-4 py-2 text-sm font-medium whitespace-nowrap rounded transition-colors
                  ${activeTab === tab.id
                    ? 'bg-[var(--color-primary)] text-white'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-[1fr_320px] gap-6">
          {/* Main Content Area */}
          <div className="space-y-6">
            {/* Featured Article - Large 16:9 */}
            <article className="group cursor-pointer">
              <div className="relative aspect-video bg-[#1a1a1a] rounded-lg overflow-hidden">
                {/* Placeholder for featured image */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                {/* Video badge */}
                {featuredArticle.isVideo && (
                  <div className="absolute top-4 left-4 flex items-center gap-2 px-2 py-1 bg-black/70 rounded text-xs">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                    <span>{featuredArticle.duration}</span>
                  </div>
                )}

                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="text-[var(--color-primary)] text-xs font-bold tracking-wider">
                    {featuredArticle.category}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mt-2 group-hover:text-[var(--color-primary)] transition-colors leading-tight">
                    {featuredArticle.title}
                  </h2>
                  <div className="flex items-center gap-3 mt-3 text-sm text-gray-400">
                    <span>{featuredArticle.author}</span>
                    <span>•</span>
                    <span>{featuredArticle.timestamp}</span>
                  </div>
                </div>
              </div>
            </article>

            {/* Article Grid - 2 column on larger screens */}
            <div className="grid md:grid-cols-2 gap-4">
              {mainArticles.slice(0, 4).map((article) => (
                <article
                  key={article.id}
                  className="group flex gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                >
                  {/* Thumbnail - 16:9 ratio */}
                  <div className="relative w-32 h-20 flex-shrink-0 bg-[#1a1a1a] rounded overflow-hidden">
                    {article.isVideo && (
                      <>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-8 h-8 rounded-md bg-black/60 flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z"/>
                            </svg>
                          </div>
                        </div>
                        <div className="absolute bottom-1 right-1 px-1 py-0.5 bg-black/80 rounded text-[10px] text-white">
                          {article.duration}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold text-[var(--color-primary)] tracking-wider">
                      {article.category}
                    </span>
                    <h3 className="text-sm font-semibold text-white mt-1 line-clamp-2 group-hover:text-[var(--color-primary)] transition-colors">
                      {article.title}
                    </h3>
                    <span className="text-xs text-gray-500 mt-1 block">{article.timestamp}</span>
                  </div>
                </article>
              ))}
            </div>

            {/* Horizontal Divider */}
            <div className="border-t border-white/10" />

            {/* More Stories - List format */}
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">More Stories</h3>
              <div className="space-y-1">
                {mainArticles.slice(4).map((article, index) => (
                  <article
                    key={article.id}
                    className="flex items-center gap-4 py-3 border-b border-white/5 last:border-0 hover:bg-white/5 px-2 -mx-2 rounded cursor-pointer group"
                  >
                    <span className="text-2xl font-black text-gray-700 w-8">{index + 1}</span>
                    <div className="flex-1">
                      <span className="text-[10px] font-bold text-[var(--color-primary)] tracking-wider">
                        {article.category}
                      </span>
                      <h4 className="text-sm font-medium text-white group-hover:text-[var(--color-primary)] transition-colors">
                        {article.title}
                      </h4>
                    </div>
                    <span className="text-xs text-gray-500">{article.timestamp}</span>
                  </article>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <aside className="space-y-6">
            {/* Live Scores Widget */}
            <div className="bg-[#111] rounded-lg overflow-hidden">
              <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Live Scores</h3>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-sm bg-red-500 animate-pulse" />
                  <span className="text-xs text-red-400 font-medium">LIVE</span>
                </div>
              </div>
              <div className="divide-y divide-white/5">
                {liveGames.map((game) => (
                  <div key={game.id} className="px-4 py-3 hover:bg-white/5 cursor-pointer">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white font-medium">{game.team1}</span>
                      <span className="text-white font-bold">{game.score1}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm mt-1">
                      <span className="text-white font-medium">{game.team2}</span>
                      <span className="text-white font-bold">{game.score2}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-2">
                      {game.quarter} • {game.time}
                    </div>
                  </div>
                ))}
              </div>
              <Link
                href="/events"
                className="block text-center py-3 text-xs font-medium text-[var(--color-primary)] hover:bg-white/5 border-t border-white/10"
              >
                View All Scores →
              </Link>
            </div>

            {/* Trending */}
            <div className="bg-[#111] rounded-lg overflow-hidden">
              <div className="px-4 py-3 border-b border-white/10">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Trending Now</h3>
              </div>
              <div className="divide-y divide-white/5">
                {trendingArticles.map((article, index) => (
                  <article
                    key={article.id}
                    className="px-4 py-3 hover:bg-white/5 cursor-pointer group"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-lg font-black text-gray-600">{index + 1}</span>
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-bold text-[var(--color-primary)] tracking-wider">
                          {article.category}
                        </span>
                        <h4 className="text-sm text-white group-hover:text-[var(--color-primary)] transition-colors line-clamp-2">
                          {article.title}
                        </h4>
                        <span className="text-xs text-gray-500 mt-1 block">{article.timestamp}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-[#111] rounded-lg overflow-hidden">
              <div className="px-4 py-3 border-b border-white/10">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Quick Links</h3>
              </div>
              <div className="p-4 grid grid-cols-2 gap-2">
                {[
                  { label: 'Events', href: '/events', emoji: '🎫' },
                  { label: 'Media', href: '/media', emoji: '📸' },
                  { label: 'Legacy', href: '/legacy', emoji: '🏆' },
                  { label: 'Partners', href: '/partners', emoji: '🤝' },
                ].map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="flex items-center gap-2 px-3 py-2 rounded bg-white/5 hover:bg-[var(--color-primary)]/20 text-sm text-white transition-colors"
                  >
                    <span>{link.emoji}</span>
                    <span>{link.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Newsletter CTA */}
            <div className="bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-secondary)]/20 rounded-lg p-4 border border-[var(--color-primary)]/30">
              <h4 className="font-bold text-white text-sm">Stay in the Game</h4>
              <p className="text-xs text-gray-400 mt-1">Get the latest updates delivered to your inbox</p>
              <button className="w-full mt-3 py-2 rounded bg-[var(--color-primary)] text-white text-sm font-medium hover:brightness-110 transition">
                Subscribe
              </button>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
