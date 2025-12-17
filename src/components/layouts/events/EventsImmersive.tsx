'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { siteConfig } from '@/config/site.config'
import { MagneticButton, CountdownTimer, GradientText } from '@/components/signature'

/**
 * EVENTS IMMERSIVE LAYOUT - Section Variant
 * ========================================
 * Full-screen immersive event showcase
 *
 * Trophy-worthy: Cinema-quality event presentation with dramatic reveals
 */

const EventsImmersive = () => {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [activeIndex, setActiveIndex] = useState(0)

  const events = (siteConfig.events.items || []).slice(0, 4)
  const activeEvent = events[activeIndex]

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center py-24 md:py-32"
      style={{ backgroundColor: 'var(--color-bg-primary)' }}
    >
      {/* Background image/gradient for active event */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          {activeEvent?.image ? (
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${activeEvent.image})` }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(to right, var(--color-bg-primary) 0%, var(--color-bg-primary) 40%, transparent 100%)`,
                }}
              />
            </div>
          ) : (
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(circle at 70% 50%, var(--color-primary), var(--color-bg-primary) 60%)`,
                opacity: 0.3,
              }}
            />
          )}
        </motion.div>
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: Active event details */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span
              className="text-sm font-semibold tracking-widest uppercase mb-4 block"
              style={{ color: 'var(--color-primary)' }}
            >
              {siteConfig.events.sectionTitle || 'Featured Event'}
            </span>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                {/* Event type */}
                <span
                  className="inline-block px-4 py-1 rounded-lg text-sm font-semibold mb-6"
                  style={{
                    backgroundColor: 'var(--color-primary)',
                    color: 'var(--color-text-inverse)',
                  }}
                >
                  {activeEvent?.type}
                </span>

                {/* Title */}
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  <GradientText gradient="diamond" animate={false} shimmer>
                    {activeEvent?.title || 'Event Title'}
                  </GradientText>
                </h2>

                {/* Date & Location */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <div
                    className="flex items-center gap-2"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-lg">
                      {activeEvent && new Date(activeEvent.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  <div
                    className="flex items-center gap-2"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-lg">
                      {activeEvent?.venue}, {activeEvent?.location}
                    </span>
                  </div>
                </div>

                {/* Description */}
                {activeEvent?.description && (
                  <p
                    className="text-lg mb-8 max-w-lg"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    {activeEvent.description}
                  </p>
                )}

                {/* Countdown */}
                {activeEvent && (
                  <div className="mb-8">
                    <p
                      className="text-sm uppercase tracking-wider mb-3"
                      style={{ color: 'var(--color-text-muted)' }}
                    >
                      Event Starts In
                    </p>
                    <CountdownTimer
                      targetDate={new Date(activeEvent.date)}
                      variant="dramatic"
                    />
                  </div>
                )}

                {/* CTA */}
                <MagneticButton
                  href={activeEvent ? `/events/${activeEvent.id}` : '/events'}
                  size="lg"
                  variant="primary"
                >
                  Get Tickets — From ${activeEvent?.price?.general || 0}
                </MagneticButton>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Right: Event selector */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <p
              className="text-sm font-semibold tracking-widest uppercase mb-6"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Upcoming Events
            </p>

            <div className="space-y-4">
              {events.map((event, index) => (
                <motion.button
                  key={event.id}
                  onClick={() => setActiveIndex(index)}
                  className={`w-full text-left p-6 rounded-2xl border transition-all duration-300 ${
                    activeIndex === index
                      ? 'border-[var(--color-primary)]'
                      : 'border-transparent hover:border-[var(--color-border-hover)]'
                  }`}
                  style={{
                    backgroundColor:
                      activeIndex === index
                        ? 'var(--color-bg-secondary)'
                        : 'var(--color-bg-tertiary)',
                  }}
                  whileHover={{ x: activeIndex === index ? 0 : 10 }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p
                        className="text-lg font-semibold mb-1"
                        style={{
                          color:
                            activeIndex === index
                              ? 'var(--color-primary)'
                              : 'var(--color-text-primary)',
                        }}
                      >
                        {event.title}
                      </p>
                      <p
                        className="text-sm"
                        style={{ color: 'var(--color-text-muted)' }}
                      >
                        {new Date(event.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })} • {event.venue}
                      </p>
                    </div>
                    <motion.div
                      animate={{ rotate: activeIndex === index ? 0 : -90 }}
                      style={{ color: 'var(--color-primary)' }}
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </motion.div>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* View all link */}
            <div className="mt-8">
              <MagneticButton href="/events" variant="ghost" size="sm">
                View All Events →
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default EventsImmersive
