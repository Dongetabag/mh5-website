'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { siteConfig } from '@/config/site.config'
import { MagneticButton, CountdownTimer, AnimatedCard } from '@/components/signature'
import FOMOCounter from '@/components/conversion/FOMOCounter'

/**
 * EVENTS CARDSTACK LAYOUT - Section Variant
 * ========================================
 * Events displayed as interactive stacked cards
 *
 * Trophy-worthy: Cards stack and expand with rich interactions
 */

// Helper to render headline (can be string or object)
const renderHeadline = (headline: string | { prefix: string; highlight: string } | undefined, fallback: string) => {
  if (!headline) return fallback
  if (typeof headline === 'string') return headline
  return <>{headline.prefix} <span style={{ color: 'var(--color-primary)' }}>{headline.highlight}</span></>
}

const EventsCardstack = () => {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null)

  const events = (siteConfig.events.items || []).slice(0, 4) // Show max 4

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ backgroundColor: 'var(--color-bg-secondary)' }}
    >
      {/* Background gradient */}
      <div
        className="absolute top-0 left-0 right-0 h-96 opacity-30"
        style={{
          background: `radial-gradient(ellipse at top, var(--color-primary), transparent 70%)`,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
            {siteConfig.events.sectionTitle || 'Live Events'}
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: 'var(--color-text-primary)' }}
          >
            {renderHeadline(siteConfig.events.headline, 'Experience It Live')}
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {siteConfig.events.subheadline || 'Join exclusive events and create unforgettable memories'}
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <AnimatedCard
                className="h-full"
                glowColor="var(--color-primary)"
                tiltAmount={5}
              >
                <div
                  className="p-6 md:p-8 h-full flex flex-col rounded-2xl border"
                  style={{
                    backgroundColor: 'var(--color-bg-tertiary)',
                    borderColor: event.featured
                      ? 'var(--color-primary)'
                      : 'var(--color-border-default)',
                  }}
                >
                  {/* Featured badge */}
                  {event.featured && (
                    <div
                      className="absolute top-4 right-4 px-3 py-1 rounded-md text-xs font-bold"
                      style={{
                        backgroundColor: 'var(--color-primary)',
                        color: 'var(--color-text-inverse)',
                      }}
                    >
                      FEATURED
                    </div>
                  )}

                  {/* Event type & date */}
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className="px-3 py-1 rounded-md text-xs font-semibold"
                      style={{
                        backgroundColor: 'var(--color-bg-secondary)',
                        color: 'var(--color-text-secondary)',
                      }}
                    >
                      {event.type}
                    </span>
                    <span
                      className="text-sm"
                      style={{ color: 'var(--color-text-muted)' }}
                    >
                      {new Date(event.date).toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className="text-2xl font-bold mb-2"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    {event.title}
                  </h3>

                  {/* Location */}
                  <div
                    className="flex items-center gap-2 text-sm mb-4"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{event.venue} • {event.location}</span>
                  </div>

                  {/* Countdown */}
                  <div className="mb-6">
                    <CountdownTimer
                      targetDate={new Date(event.date)}
                      variant="minimal"
                      showLabels={false}
                    />
                  </div>

                  {/* FOMO Counter */}
                  {event.ticketsRemaining && event.totalTickets && (
                    <div className="mb-6">
                      <FOMOCounter
                        totalTickets={event.totalTickets}
                        ticketsRemaining={event.ticketsRemaining}
                        variant="bar"
                        size="sm"
                        showViewers={false}
                      />
                    </div>
                  )}

                  {/* Pricing tiers */}
                  {event.price && (
                    <div className="flex gap-4 mb-6">
                      {event.price.general && (
                        <div className="text-center">
                          <p
                            className="text-xs uppercase tracking-wider mb-1"
                            style={{ color: 'var(--color-text-muted)' }}
                          >
                            General
                          </p>
                          <p
                            className="text-lg font-bold"
                            style={{ color: 'var(--color-text-primary)' }}
                          >
                            ${event.price.general}
                          </p>
                        </div>
                      )}
                      {event.price.vip && (
                        <div className="text-center">
                          <p
                            className="text-xs uppercase tracking-wider mb-1"
                            style={{ color: 'var(--color-text-muted)' }}
                          >
                            VIP
                          </p>
                          <p
                            className="text-lg font-bold"
                            style={{ color: 'var(--color-primary)' }}
                          >
                            ${event.price.vip}
                          </p>
                        </div>
                      )}
                      {event.price.vvip && (
                        <div className="text-center">
                          <p
                            className="text-xs uppercase tracking-wider mb-1"
                            style={{ color: 'var(--color-text-muted)' }}
                          >
                            VVIP
                          </p>
                          <p
                            className="text-lg font-bold"
                            style={{ color: 'var(--color-primary)' }}
                          >
                            ${event.price.vvip}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* CTA */}
                  <div className="mt-auto">
                    <MagneticButton
                      href={`/events/${event.id}`}
                      size="md"
                      variant="primary"
                      fullWidth
                    >
                      Get Tickets
                    </MagneticButton>
                  </div>
                </div>
              </AnimatedCard>
            </motion.div>
          ))}
        </div>

        {/* View all link */}
        {(siteConfig.events.items?.length || 0) > 4 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mt-12"
          >
            <MagneticButton href="/events" variant="outline" size="lg">
              View All Events
            </MagneticButton>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default EventsCardstack
