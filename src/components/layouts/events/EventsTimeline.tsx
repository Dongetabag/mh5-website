'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { siteConfig } from '@/config/site.config'
import { MagneticButton } from '@/components/signature'

/**
 * EVENTS TIMELINE LAYOUT - Section Variant
 * =======================================
 * Events displayed on a vertical timeline
 *
 * Trophy-worthy: Elegant chronological display with scroll animations
 */

// Helper to render headline (can be string or object)
const renderHeadline = (headline: string | { prefix: string; highlight: string } | undefined, fallback: string) => {
  if (!headline) return fallback
  if (typeof headline === 'string') return headline
  return <>{headline.prefix} <span style={{ color: 'var(--color-primary)' }}>{headline.highlight}</span></>
}

const EventsTimeline = () => {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const events = siteConfig.events.items || []

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32"
      style={{ backgroundColor: 'var(--color-bg-primary)' }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span
            className="text-sm font-semibold tracking-widest uppercase mb-4 block"
            style={{ color: 'var(--color-primary)' }}
          >
            {siteConfig.events.sectionTitle || 'Upcoming Events'}
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold"
            style={{ color: 'var(--color-text-primary)' }}
          >
            {renderHeadline(siteConfig.events.headline, "Don't Miss Out")}
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px"
            style={{ backgroundColor: 'var(--color-border-default)' }}
          />

          {/* Events */}
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={`relative flex items-center mb-12 last:mb-0 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Timeline dot */}
              <div
                className="absolute left-4 md:left-1/2 w-4 h-4 rounded-sm -translate-x-1/2 z-10"
                style={{
                  backgroundColor: event.featured
                    ? 'var(--color-primary)'
                    : 'var(--color-bg-tertiary)',
                  border: `2px solid ${event.featured ? 'var(--color-primary)' : 'var(--color-border-default)'}`,
                }}
              />

              {/* Event card */}
              <div
                className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${
                  index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'
                }`}
              >
                <div
                  className="rounded-2xl p-6 border transition-all duration-300 hover:border-[var(--color-primary)]"
                  style={{
                    backgroundColor: 'var(--color-bg-secondary)',
                    borderColor: 'var(--color-border-default)',
                  }}
                >
                  {/* Date badge */}
                  <div
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-sm font-medium mb-4"
                    style={{
                      backgroundColor: 'var(--color-primary)',
                      color: 'var(--color-text-inverse)',
                    }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {new Date(event.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </div>

                  <h3
                    className="text-xl font-bold mb-2"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    {event.title}
                  </h3>

                  <div
                    className="flex items-center gap-2 text-sm mb-3"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {event.venue}, {event.location}
                  </div>

                  {event.description && (
                    <p
                      className="text-sm mb-4"
                      style={{ color: 'var(--color-text-muted)' }}
                    >
                      {event.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between">
                    <span
                      className="text-lg font-bold"
                      style={{ color: 'var(--color-primary)' }}
                    >
                      From ${event.price?.general || 0}
                    </span>
                    <MagneticButton
                      href={`/events/${event.id}`}
                      size="sm"
                      variant="outline"
                    >
                      Get Tickets
                    </MagneticButton>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default EventsTimeline
