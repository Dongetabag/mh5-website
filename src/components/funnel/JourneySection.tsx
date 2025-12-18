'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'

/**
 * JOURNEY SECTION - Story-Driven Content Blocks
 * =============================================
 * Tells the MH5 story through immersive, scroll-triggered sections
 * Each block guides the user deeper into the narrative funnel
 */

interface JourneyBlock {
  id: string
  label: string
  title: string
  description: string
  media: {
    type: 'video' | 'image'
    src: string
    poster?: string
  }
  stats?: { value: string; label: string }[]
  cta?: { label: string; href: string }
  align: 'left' | 'right'
}

const journeyBlocks: JourneyBlock[] = [
  {
    id: 'origins',
    label: 'The Beginning',
    title: 'Springfield Roots',
    description: "Born in Springfield, Massachusetts - the birthplace of basketball. From the neighborhood courts to Western Mass legend status, the journey started where the game itself began over 130 years ago.",
    media: {
      type: 'video',
      src: '/videos/basketball/88b0d1582ab545f8befd9ad80dabd80f.MOV',
    },
    stats: [
      { value: 'Springfield, MA', label: 'Hometown' },
      { value: '1891', label: 'Basketball Born Here' },
    ],
    align: 'left'
  },
  {
    id: 'rise',
    label: 'The Rise',
    title: 'Super 7 Dominance',
    description: "Four consecutive years as a Super 7 selection. Every season, proving to be among the elite in Western Massachusetts. The numbers speak, but the game speaks louder.",
    media: {
      type: 'video',
      src: '/videos/basketball/6f40c6f056194535a398d54f76c6f2da.MOV',
    },
    stats: [
      { value: '4x', label: 'Super 7 Selections' },
      { value: '#1', label: 'Western Mass Guard' },
    ],
    align: 'right'
  },
  {
    id: 'prodigy',
    label: 'The Leap',
    title: 'Prodigy Prep Era',
    description: "Joining forces with Julian Newman at Prodigy Prep in Florida. Making an immediate impact with 65 points in the first two games. Leading the program to its historic first win with 27 points.",
    media: {
      type: 'video',
      src: '/videos/basketball/26e44d220245495a8a592c0002ace524.MOV',
    },
    stats: [
      { value: '65', label: 'Points First Weekend' },
      { value: '27', label: 'Points in Historic Win' },
    ],
    cta: { label: 'Watch Highlights', href: '/media' },
    align: 'left'
  },
  {
    id: 'brand',
    label: 'The Movement',
    title: 'MH5 Is Born',
    description: "More than basketball. The Movement Has 5ive represents excellence, entertainment, and elevation. From hosting tournaments to nightlife events, MH5 is a lifestyle brand built on authenticity.",
    media: {
      type: 'video',
      src: '/videos/events/c7ae7027582a43399c46595e1203d9a4.MOV',
    },
    stats: [
      { value: '500K+', label: 'Followers' },
      { value: '10+', label: 'Events Hosted' },
    ],
    cta: { label: 'See Upcoming Events', href: '/events' },
    align: 'right'
  },
]

function JourneyBlock({ block, index }: { block: JourneyBlock; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <div
      ref={ref}
      className={`relative flex flex-col lg:flex-row items-center gap-6 sm:gap-8 lg:gap-16 ${
        block.align === 'right' ? 'lg:flex-row-reverse' : ''
      }`}
    >
      {/* Media Container */}
      <motion.div
        initial={{ opacity: 0, x: block.align === 'left' ? -50 : 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full lg:w-1/2"
      >
        <div className="relative aspect-[4/5] lg:aspect-[3/4] rounded-2xl overflow-hidden bg-[#111]">
          {/* Video/Image */}
          {block.media.type === 'video' ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => {
                console.error('Video error:', block.media.src, e)
              }}
            >
              <source src={block.media.src} type={block.media.src.toLowerCase().endsWith('.mov') ? 'video/quicktime' : 'video/mp4'} />
            </video>
          ) : (
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${block.media.src})` }}
            />
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

          {/* Label Badge - Clean rectangle */}
          <div className="absolute top-6 left-6">
            <span className="px-3 py-1.5 bg-[var(--color-primary)] text-black text-[11px] font-medium uppercase tracking-wide rounded-sm" style={{ fontFamily: 'var(--font-heading)' }}>
              {block.label}
            </span>
          </div>

          {/* Stats Overlay (Mobile) */}
          {block.stats && (
            <div className="absolute bottom-6 left-6 right-6 lg:hidden">
              <div className="flex gap-4">
                {block.stats.map((stat) => (
                  <div key={stat.label} className="flex-1 text-center bg-black/50 backdrop-blur-sm rounded-lg py-3">
                    <div className="text-2xl font-heading font-black text-[var(--color-primary)]">{stat.value}</div>
                    <div className="text-[10px] text-gray-400 uppercase tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="w-full lg:w-1/2"
      >
        {/* Step Number */}
        <div className="flex items-center gap-4 mb-6">
          <span className="w-12 h-12 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-lg font-bold text-[var(--color-primary)]">
            {String(index + 1).padStart(2, '0')}
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
        </div>

        {/* Title */}
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-3 sm:mb-4">
          {block.title}
        </h3>

        {/* Description */}
        <p className="text-gray-400 text-base sm:text-lg lg:text-xl leading-relaxed mb-5 sm:mb-6">
          {block.description}
        </p>

        {/* Stats (Desktop) */}
        {block.stats && (
          <div className="hidden lg:flex gap-8 mb-6">
            {block.stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl lg:text-4xl font-heading font-black text-[var(--color-primary)]">{stat.value}</div>
                <div className="text-xs sm:text-sm text-gray-500 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* CTA - Clean rectangle button */}
        {block.cta && (
          <Link
            href={block.cta.href}
            className="inline-flex items-center gap-2 h-11 sm:h-12 px-5 sm:px-6 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white text-[12px] sm:text-[13px] font-bold uppercase tracking-widest transition group"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {block.cta.label}
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
        )}
      </motion.div>
    </div>
  )
}

export default function JourneySection() {
  const headerRef = useRef<HTMLDivElement>(null)
  const isHeaderInView = useInView(headerRef, { once: true })

  return (
    <section className="py-16 sm:py-20 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <span className="inline-block px-4 py-2 bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 rounded-sm text-[var(--color-primary)] text-[11px] font-medium uppercase tracking-wide mb-5 sm:mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
            The Story
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 sm:mb-5 px-2">
            From Springfield to <span className="text-[var(--color-primary)]">Stardom</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto px-2">
            Every great journey has its chapters. Follow the path that built the movement.
          </p>
        </motion.div>

        {/* Journey Blocks */}
        <div className="space-y-16 sm:space-y-20 lg:space-y-32">
          {journeyBlocks.map((block, index) => (
            <JourneyBlock key={block.id} block={block} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
