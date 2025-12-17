'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'

/**
 * MEDIA SHOWCASE - Curated Vertical Video Grid
 * ============================================
 * TikTok/Reels style media grid showcasing MH5 content
 * Mobile-first vertical video optimized display
 */

interface MediaItem {
  id: string
  type: 'video' | 'image'
  src: string
  title: string
  category: string
  views: string
  duration?: string
}

const mediaItems: MediaItem[] = [
  {
    id: '1',
    type: 'video',
    src: '/videos/basketball/67df5ad85df7404a81f2d6e311e19d8c.MOV',
    title: 'Full-Length Highlights',
    category: 'Highlights',
    views: '89K',
    duration: '0:32'
  },
  {
    id: '2',
    type: 'video',
    src: '/videos/basketball/6f40c6f056194535a398d54f76c6f2da.MOV',
    title: 'Intense Workout Session',
    category: 'Highlights',
    views: '67K',
    duration: '1:15'
  },
  {
    id: '3',
    type: 'video',
    src: '/videos/basketball/13f27e29c219419d852eac4f5ef134dd.MOV',
    title: 'Game Day Energy',
    category: 'Highlights',
    views: '125K',
    duration: '0:45'
  },
  {
    id: '4',
    type: 'video',
    src: '/videos/events/9f90e8aa68434121b10f738f483e53f2.MOV',
    title: 'MH5 Tournament Finals',
    category: 'Events',
    views: '203K',
    duration: '2:30'
  },
  {
    id: '5',
    type: 'video',
    src: '/videos/events/5893e5fd7bfc44d6a422765f2277d665.MOV',
    title: 'Club Night Experience',
    category: 'Events',
    views: '156K',
    duration: '3:45'
  },
  {
    id: '6',
    type: 'video',
    src: '/videos/events/1b1484eba7bd4bce88563e9525889552.MOV',
    title: 'Live Event Vibes',
    category: 'Events',
    views: '312K',
    duration: '4:20'
  },
  {
    id: '7',
    type: 'video',
    src: '/videos/events/d478bfa5726949438ca2f506c332a6bc.MOV',
    title: 'VIP Event Highlights',
    category: 'Events',
    views: '178K',
    duration: '2:15'
  },
  {
    id: '8',
    type: 'video',
    src: '/videos/brand-campaigns/37f8ca3c904745f7a7c16d2da3e44b5c.MOV',
    title: 'Brand Campaign',
    category: 'Brand',
    views: '245K',
    duration: '1:30'
  },
  {
    id: '9',
    type: 'video',
    src: '/videos/brand-campaigns/90d1467329ec4a3dac3a8658cba48dd8.MOV',
    title: 'Campaign Showcase',
    category: 'Brand',
    views: '198K',
    duration: '3:00'
  },
]

const categories = ['All', 'Highlights', 'Events', 'Brand']

function MediaCard({ item, index }: { item: MediaItem; index: number }) {
  const [isHovered, setIsHovered] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleMouseEnter = () => {
    setIsHovered(true)
    if (videoRef.current) {
      videoRef.current.play()
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative aspect-[9/16] rounded-lg overflow-hidden bg-[#111] cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Video/Image */}
      {item.type === 'video' ? (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={item.src} type="video/quicktime" />
          <source src={item.src} type="video/mp4" />
        </video>
      ) : (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${item.src})` }}
        />
      )}

      {/* Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 transition-opacity ${isHovered ? 'opacity-100' : 'opacity-80'}`} />

      {/* Play Button */}
      <div className={`absolute inset-0 flex items-center justify-center transition-opacity ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
        <div className="w-14 h-14 rounded-md bg-white/20 backdrop-blur-sm flex items-center justify-center">
          <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </div>
      </div>

      {/* Category Badge */}
      <div className="absolute top-3 left-3">
        <span className="px-2 py-1 bg-black/60 backdrop-blur-sm rounded-sm text-[10px] font-medium text-white uppercase tracking-wide" style={{ fontFamily: 'var(--font-heading)' }}>
          {item.category}
        </span>
      </div>

      {/* Duration */}
      {item.duration && (
        <div className="absolute top-3 right-3">
          <span className="px-2 py-0.5 bg-black/70 rounded text-[10px] text-white font-medium">
            {item.duration}
          </span>
        </div>
      )}

      {/* Bottom Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <h4 className="font-semibold text-white text-sm lg:text-base mb-2 line-clamp-2">
          {item.title}
        </h4>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
          </svg>
          <span>{item.views} views</span>
        </div>
      </div>

      {/* Hover Actions */}
      <div className={`absolute bottom-4 right-4 flex flex-col gap-2 transition-opacity ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        <button className="w-9 h-9 rounded-md bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        </button>
        <button className="w-9 h-9 rounded-md bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
          </svg>
        </button>
      </div>
    </motion.div>
  )
}

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
          <span className="inline-block px-4 py-2 bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 rounded-sm text-[var(--color-primary)] text-[11px] font-medium uppercase tracking-wide mb-5 sm:mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
            Featured Content
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-white mb-4 sm:mb-5 px-2">
            Watch <span className="text-[var(--color-primary)]">The Movement</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto px-2">
            Highlights, training sessions, behind-the-scenes, and more. Curated content from the MH5 journey.
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 sm:mb-10 lg:mb-14">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`h-10 sm:h-11 px-4 sm:px-5 rounded-lg text-[11px] sm:text-[12px] font-medium uppercase tracking-wide transition ${
                activeCategory === category
                  ? 'bg-[var(--color-primary)] text-black'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
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
            <MediaCard key={item.id} item={item} index={index} />
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
            className="inline-flex items-center justify-center gap-2 h-12 px-8 bg-white/5 hover:bg-white/10 text-white text-[13px] font-medium uppercase tracking-wide rounded-md transition group border border-white/10 hover:border-white/20"
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
