'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'

/**
 * INSIGHTS SECTION - Basketball News & Content Platform
 * =====================================================
 * Creates a browsable, platform-like experience with news,
 * analysis, and lifestyle content around basketball.
 */

interface InsightItem {
  id: string
  title: string
  excerpt: string
  category: 'news' | 'analysis' | 'exclusive' | 'lifestyle'
  image: string
  author: string
  date: string
  readTime: string
  featured?: boolean
}

// Sample insights data - in production this would come from CMS
const insightsData: InsightItem[] = [
  {
    id: '1',
    title: 'The Evolution of Point Guard Play in Modern Basketball',
    excerpt: 'How the position has transformed from pure playmaker to scoring threat, and what it means for the next generation.',
    category: 'analysis',
    image: '/images/insights/basketball-court.jpg',
    author: 'Milan Harrison',
    date: '2024-12-03',
    readTime: '5 min',
    featured: true,
  },
  {
    id: '2',
    title: 'Breaking: Top Prospects Shine at Winter Showcase',
    excerpt: 'Standout performances from the nations elite high school talent. Full breakdown inside.',
    category: 'news',
    image: '/images/insights/showcase.jpg',
    author: 'MH5 Team',
    date: '2024-12-02',
    readTime: '3 min',
  },
  {
    id: '3',
    title: 'Behind The Scenes: A Day in the Life',
    excerpt: 'From early morning workouts to late night film sessions - the dedication it takes to compete at the highest level.',
    category: 'exclusive',
    image: '/images/insights/training.jpg',
    author: 'Milan Harrison',
    date: '2024-12-01',
    readTime: '7 min',
  },
  {
    id: '4',
    title: 'Style & Sport: The Intersection of Fashion and Basketball',
    excerpt: 'How basketball culture continues to influence streetwear and high fashion.',
    category: 'lifestyle',
    image: '/images/insights/lifestyle.jpg',
    author: 'MH5 Team',
    date: '2024-11-30',
    readTime: '4 min',
  },
  {
    id: '5',
    title: 'Draft Stock Watch: Who is Rising?',
    excerpt: 'Breaking down the latest movement in prospect rankings and what scouts are looking for.',
    category: 'analysis',
    image: '/images/insights/draft.jpg',
    author: 'MH5 Team',
    date: '2024-11-29',
    readTime: '6 min',
  },
  {
    id: '6',
    title: 'Nutrition Secrets of Elite Athletes',
    excerpt: 'The diet strategies that fuel championship-level performance on and off the court.',
    category: 'lifestyle',
    image: '/images/insights/nutrition.jpg',
    author: 'Milan Harrison',
    date: '2024-11-28',
    readTime: '5 min',
  },
]

const categories = [
  { id: 'all', label: 'All' },
  { id: 'news', label: 'News' },
  { id: 'analysis', label: 'Analysis' },
  { id: 'exclusive', label: 'Exclusive' },
  { id: 'lifestyle', label: 'Lifestyle' },
]

const InsightsSection = () => {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredInsights = activeCategory === 'all'
    ? insightsData
    : insightsData.filter(item => item.category === activeCategory)

  const featuredItem = insightsData.find(item => item.featured)
  const regularItems = filteredInsights.filter(item => !item.featured || activeCategory !== 'all')

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  return (
    <section
      ref={ref}
      className="relative py-20 md:py-28 overflow-hidden court-pattern"
      style={{ backgroundColor: 'var(--color-bg-primary)' }}
    >
      {/* Decorative Corner Arcs */}
      <div className="corner-arc top-left" />
      <div className="corner-arc top-right" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-12 h-[2px] bg-gradient-to-r from-transparent to-[var(--color-primary)]" />
            <span
              className="text-sm font-semibold tracking-widest uppercase"
              style={{ color: 'var(--color-primary)' }}
            >
              The Platform
            </span>
            <span className="w-12 h-[2px] bg-gradient-to-l from-transparent to-[var(--color-primary)]" />
          </div>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
            style={{ color: 'var(--color-text-primary)' }}
          >
            Basketball <span className="arc-underline" style={{ color: 'var(--color-primary)' }}>Insights</span>
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            News, analysis, and exclusive content from the world of basketball
          </p>
        </motion.div>

        {/* Category Filter Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex justify-center gap-2 mb-12 flex-wrap"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`nav-pill ${activeCategory === cat.id ? 'active' : ''}`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Featured Article - Only show when 'all' is selected */}
        {activeCategory === 'all' && featuredItem && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <Link href={`/insights/${featuredItem.id}`} className="block">
              <div className="insight-card group">
                <div className="grid md:grid-cols-2 gap-0">
                  {/* Image Side */}
                  <div className="relative aspect-[16/10] md:aspect-auto md:h-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] opacity-20" />
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${featuredItem.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-primary)] via-transparent to-transparent md:bg-gradient-to-r" />
                    <div className="absolute top-4 left-4">
                      <span className={`tag-pill ${featuredItem.category}`}>
                        {featuredItem.category}
                      </span>
                    </div>
                  </div>

                  {/* Content Side */}
                  <div className="p-6 md:p-10 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                      <span
                        className="px-3 py-1 rounded-lg text-xs font-bold"
                        style={{
                          backgroundColor: 'var(--color-primary)',
                          color: 'var(--color-text-inverse)',
                        }}
                      >
                        FEATURED
                      </span>
                      <span style={{ color: 'var(--color-text-muted)' }} className="text-sm">
                        {formatDate(featuredItem.date)} · {featuredItem.readTime} read
                      </span>
                    </div>
                    <h3
                      className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-[var(--color-primary)] transition-colors"
                      style={{ color: 'var(--color-text-primary)' }}
                    >
                      {featuredItem.title}
                    </h3>
                    <p
                      className="text-base mb-6"
                      style={{ color: 'var(--color-text-secondary)' }}
                    >
                      {featuredItem.excerpt}
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="avatar-ring w-10 h-10">
                        <div className="w-full h-full bg-[var(--color-bg-tertiary)]" />
                      </div>
                      <span style={{ color: 'var(--color-text-primary)' }} className="font-medium">
                        {featuredItem.author}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Regular Articles Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {regularItems.slice(0, 6).map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <Link href={`/insights/${item.id}`} className="block h-full">
                <article className="insight-card h-full flex flex-col">
                  {/* Image */}
                  <div className="relative aspect-[16/10] m-3 image-wrapper">
                    <div
                      className="absolute inset-0 bg-cover bg-center rounded-lg transition-transform duration-500"
                      style={{ backgroundImage: `url(${item.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-lg" />
                    <div className="absolute bottom-3 left-3">
                      <span className={`tag-pill ${item.category}`}>
                        {item.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 pt-2 flex-1 flex flex-col">
                    <div
                      className="text-xs mb-2"
                      style={{ color: 'var(--color-text-muted)' }}
                    >
                      {formatDate(item.date)} · {item.readTime} read
                    </div>
                    <h3
                      className="text-lg font-bold mb-2 line-clamp-2 group-hover:text-[var(--color-primary)] transition-colors"
                      style={{ color: 'var(--color-text-primary)' }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="text-sm line-clamp-2 flex-1"
                      style={{ color: 'var(--color-text-secondary)' }}
                    >
                      {item.excerpt}
                    </p>
                    <div className="flex items-center gap-2 mt-4 pt-4 border-t border-[var(--color-border-default)]">
                      <div className="avatar-ring w-7 h-7">
                        <div className="w-full h-full bg-[var(--color-bg-tertiary)]" />
                      </div>
                      <span
                        style={{ color: 'var(--color-text-secondary)' }}
                        className="text-sm"
                      >
                        {item.author}
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold transition-all hover:gap-4"
            style={{
              backgroundColor: 'var(--color-bg-secondary)',
              color: 'var(--color-text-primary)',
              border: '1px solid var(--color-border-default)',
            }}
          >
            Explore All Insights
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </motion.div>

        {/* Circular Divider */}
        <div className="divider-circles mt-16">
          <span className="dot" />
          <span className="dot" style={{ opacity: 0.6 }} />
          <span className="dot" style={{ opacity: 0.3 }} />
        </div>
      </div>
    </section>
  )
}

export default InsightsSection
