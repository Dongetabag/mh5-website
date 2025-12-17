'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { siteConfig } from '@/config/site.config'
import { GradientText, MagneticButton } from '@/components/signature'

/**
 * ABOUT QUOTE CAROUSEL LAYOUT - Section Variant
 * ============================================
 * Rotating quotes with bio content
 *
 * Trophy-worthy: Auto-rotating testimonials/quotes with elegant transitions
 */

const AboutQuoteCarousel = () => {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [activeQuote, setActiveQuote] = useState(0)

  const about = siteConfig.about
  const headline = about?.headline?.line1 && about?.headline?.line2
    ? `${about.headline.line1} ${about.headline.line2}`
    : about?.headline?.line1 || siteConfig.meta.siteName

  const quotes = [
    {
      quote: 'Excellence is not a destination, it\'s a continuous journey of improvement.',
      author: siteConfig.meta.siteName,
      role: 'Personal Philosophy',
    },
    {
      quote: 'Every setback is a setup for an even greater comeback.',
      author: siteConfig.meta.siteName,
      role: 'Life Mantra',
    },
    {
      quote: 'Success is built on the foundation of discipline, dedication, and dreams.',
      author: siteConfig.meta.siteName,
      role: 'Guiding Principle',
    },
  ]

  // Auto-rotate quotes
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveQuote((prev) => (prev + 1) % quotes.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [quotes.length])

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ backgroundColor: 'var(--color-bg-secondary)' }}
    >
      {/* Decorative elements */}
      <div
        className="absolute top-0 left-0 w-96 h-96 rounded-3xl opacity-10 blur-3xl"
        style={{ backgroundColor: 'var(--color-primary)' }}
      />
      <div
        className="absolute bottom-0 right-0 w-96 h-96 rounded-3xl opacity-10 blur-3xl"
        style={{ backgroundColor: 'var(--color-secondary)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Bio content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span
              className="text-sm font-semibold tracking-widest uppercase mb-4 block"
              style={{ color: 'var(--color-primary)' }}
            >
              Get To Know
            </span>

            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <GradientText gradient="diamond" animate={false}>
                {headline}
              </GradientText>
            </h2>

            <div className="space-y-4 mb-8">
              {(about?.content || [
                'From the very beginning, the path was clear. A vision of greatness, fueled by unwavering determination.',
                'Today, that vision has become reality, inspiring millions to pursue their own dreams.',
              ]).map((paragraph, index) => (
                <p
                  key={index}
                  className="text-lg"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <MagneticButton
              href={about?.cta?.href || '/legacy'}
              variant="outline"
              size="lg"
            >
              {about?.cta?.label || 'Full Biography'}
            </MagneticButton>
          </motion.div>

          {/* Right: Quote carousel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Quote card */}
            <div
              className="relative rounded-2xl p-8 md:p-12 border"
              style={{
                backgroundColor: 'var(--color-bg-tertiary)',
                borderColor: 'var(--color-border-default)',
              }}
            >
              {/* Quote icon */}
              <div
                className="absolute -top-6 left-8 w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: 'var(--color-primary)' }}
              >
                <svg
                  className="w-6 h-6"
                  fill="var(--color-text-inverse)"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              {/* Quote content */}
              <div className="min-h-[200px] flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeQuote}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <blockquote
                      className="text-2xl md:text-3xl font-medium italic mb-6"
                      style={{ color: 'var(--color-text-primary)' }}
                    >
                      &ldquo;{quotes[activeQuote].quote}&rdquo;
                    </blockquote>
                    <div>
                      <p
                        className="font-semibold"
                        style={{ color: 'var(--color-primary)' }}
                      >
                        {quotes[activeQuote].author}
                      </p>
                      <p
                        className="text-sm"
                        style={{ color: 'var(--color-text-muted)' }}
                      >
                        {quotes[activeQuote].role}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation dots */}
              <div className="flex gap-2 mt-8">
                {quotes.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveQuote(index)}
                    className="w-3 h-3 rounded-sm transition-all duration-300"
                    style={{
                      backgroundColor:
                        index === activeQuote
                          ? 'var(--color-primary)'
                          : 'var(--color-bg-primary)',
                      transform: index === activeQuote ? 'scale(1.2)' : 'scale(1)',
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Decorative accent */}
            <div
              className="absolute -bottom-4 -right-4 w-full h-full rounded-2xl -z-10"
              style={{
                border: '1px solid var(--color-primary)',
                opacity: 0.3,
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AboutQuoteCarousel
