'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import VideoPlayer from '@/components/VideoPlayer'

/**
 * MEDIA SHOWCASE - Curated Vertical Video Grid
 * ============================================
 * TikTok/Reels style media grid showcasing MH5 content
 * Mobile-first vertical video optimized display
 */

interface MediaItem {
  id: string
  src: string
  title: string
  category: string
}

const mediaItems: MediaItem[] = [
  {
    id: '1',
    src: '/videos/basketball/67df5ad85df7404a81f2d6e311e19d8c.MOV',
    title: 'Full-Length Highlights',
    category: 'Highlights',
  },
  {
    id: '2',
    src: '/videos/basketball/6f40c6f056194535a398d54f76c6f2da.MOV',
    title: 'Intense Workout Session',
    category: 'Highlights',
  },
  {
    id: '3',
    src: '/videos/basketball/13f27e29c219419d852eac4f5ef134dd.MOV',
    title: 'Game Day Energy',
    category: 'Highlights',
  },
  {
    id: '4',
    src: '/videos/events/9f90e8aa68434121b10f738f483e53f2.MOV',
    title: 'MH5 Tournament Finals',
    category: 'Events',
  },
  {
    id: '5',
    src: '/videos/events/5893e5fd7bfc44d6a422765f2277d665.MOV',
    title: 'Club Night Experience',
    category: 'Events',
  },
  {
    id: '6',
    src: '/videos/events/70965acdb9d5482c9035562525803230.MOV',
    title: 'Live Event Vibes',
    category: 'Events',
  },
  {
    id: '7',
    src: '/videos/events/d478bfa5726949438ca2f506c332a6bc.MOV',
    title: 'VIP Event Highlights',
    category: 'Events',
  },
  {
    id: '8',
    src: '/videos/brand-campaigns/37f8ca3c904745f7a7c16d2da3e44b5c.MOV',
    title: 'Brand Campaign',
    category: 'Brand',
  },
  {
    id: '9',
    src: '/videos/brand-campaigns/90d1467329ec4a3dac3a8658cba48dd8.MOV',
    title: 'Campaign Showcase',
    category: 'Brand',
  },
]

const categories = ['All', 'Highlights', 'Events', 'Brand']

export default function MediaShowcase() {
  const [activeCategory, setActiveCategory] = useState('All')
  const headerRef = useRef<HTMLDivElement>(null)
  const isHeaderInView = useInView(headerRef, { once: true })

  const filteredMedia = activeCategory === 'All'
    ? mediaItems
    : mediaItems.filter(item => item.category === activeCategory)

  return (
    <section className="py-16 sm:py-20 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-8 sm:mb-10 lg:mb-12"
        >
          <span className="inline-block bg-[var(--color-primary)] text-black px-4 py-1.5 text-xs md:text-sm font-bold uppercase tracking-[0.3em] mb-5 sm:mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
            Featured Content
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-5 px-2" style={{ fontFamily: 'var(--font-heading)' }}>
            Watch <span className="text-[var(--color-primary)]">The Movement</span>
          </h2>
          <p className="text-gray-400 text-sm md:text-base uppercase tracking-widest leading-relaxed max-w-2xl mx-auto px-2" style={{ fontFamily: 'var(--font-heading)' }}>
            Highlights, training sessions, behind-the-scenes, and more. Curated content from the MH5 journey.
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-8 sm:mb-10 lg:mb-14">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`h-12 sm:h-14 px-8 rounded-sm text-sm font-bold uppercase tracking-widest transition ${
                activeCategory === category
                  ? 'bg-[var(--color-primary)] text-black'
                  : 'bg-white/5 text-white hover:bg-white/10 border border-white/20 hover:border-white/30'
              }`}
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Media Grid - Mobile: 2 cols, Desktop: 3 cols */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 lg:gap-8">
          {filteredMedia.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: Math.min(index * 0.1, 0.5) }}
            >
              <VideoPlayer
                src={item.src}
                className="rounded-lg"
                aspectRatio="aspect-[9/16]"
              />
            </motion.div>
          ))}
        </div>

        {/* View More CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-14"
        >
          <Link
            href="/media"
            className="inline-flex items-center justify-center gap-2 h-12 sm:h-14 px-8 border border-white/20 bg-white/5 text-white font-bold uppercase tracking-widest text-sm hover:bg-white/10 hover:border-white/30 transition-all group"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            View Full Gallery
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
