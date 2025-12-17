'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'

/**
 * QUICK LINKS SECTION - Platform Navigation Hub
 * ==============================================
 * Creates browsable category cards for platform navigation,
 * with basketball-inspired circular design elements.
 */

interface QuickLinkItem {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  href: string
  color: string
  stat?: string
  statLabel?: string
}

const quickLinks: QuickLinkItem[] = [
  {
    id: 'events',
    title: 'Live Events',
    description: 'Upcoming games, camps, and exclusive experiences',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    href: '/events',
    color: 'var(--color-primary)',
    stat: '4',
    statLabel: 'Upcoming',
  },
  {
    id: 'media',
    title: 'Media Gallery',
    description: 'Photos, videos, and highlights from the court',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    href: '/media',
    color: 'var(--color-secondary)',
    stat: '200+',
    statLabel: 'Clips',
  },
  {
    id: 'legacy',
    title: 'The Legacy',
    description: 'The journey from Springfield to the world stage',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    href: '/legacy',
    color: '#7DF9FF',
    stat: '4x',
    statLabel: 'Super 7',
  },
  {
    id: 'partners',
    title: 'Partners',
    description: 'Brands and collaborations shaping the future',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    href: '/partners',
    color: 'var(--color-success)',
    stat: '10+',
    statLabel: 'Brands',
  },
]

const QuickLinksSection = () => {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section
      ref={ref}
      className="relative py-16 md:py-24 overflow-hidden"
      style={{ backgroundColor: 'var(--color-bg-secondary)' }}
    >
      {/* Basketball-inspired arc decoration */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] aspect-[4/1] rounded-[50%] -translate-y-1/2"
        style={{
          border: '1px solid var(--color-border-default)',
          opacity: 0.5,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2
            className="text-3xl md:text-4xl font-bold mb-3"
            style={{ color: 'var(--color-text-primary)' }}
          >
            Explore The Platform
          </h2>
          <p style={{ color: 'var(--color-text-secondary)' }}>
            Your gateway to exclusive content and experiences
          </p>
        </motion.div>

        {/* Quick Links Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickLinks.map((link, index) => (
            <motion.div
              key={link.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <Link href={link.href} className="block h-full group">
                <div
                  className="card-circular h-full p-6 hover-circle relative"
                  style={{
                    background: 'var(--color-bg-tertiary)',
                  }}
                >
                  {/* Icon with ring */}
                  <div
                    className="w-16 h-16 rounded-xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110"
                    style={{
                      backgroundColor: `${link.color}15`,
                      border: `2px solid ${link.color}`,
                      color: link.color,
                    }}
                  >
                    {link.icon}
                  </div>

                  {/* Content */}
                  <h3
                    className="text-xl font-bold mb-2 group-hover:text-[var(--color-primary)] transition-colors"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    {link.title}
                  </h3>
                  <p
                    className="text-sm mb-4"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    {link.description}
                  </p>

                  {/* Stat badge */}
                  {link.stat && (
                    <div className="flex items-center gap-2">
                      <span
                        className="badge-circle text-xs"
                        style={{ backgroundColor: link.color }}
                      >
                        {link.stat}
                      </span>
                      <span
                        className="text-xs"
                        style={{ color: 'var(--color-text-muted)' }}
                      >
                        {link.statLabel}
                      </span>
                    </div>
                  )}

                  {/* Arrow indicator */}
                  <div
                    className="absolute bottom-6 right-6 w-10 h-10 rounded-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      backgroundColor: 'var(--color-primary)',
                      color: 'var(--color-text-inverse)',
                    }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default QuickLinksSection
