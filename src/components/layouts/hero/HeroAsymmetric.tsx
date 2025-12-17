'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { siteConfig } from '@/config/site.config'

/**
 * HERO ASYMMETRIC VARIANT
 * =======================
 * Diagonal divisions with kinetic text animations
 *
 * Signature features:
 * - Asymmetric split layout (60/40 diagonal)
 * - Kinetic headline with staggered reveal
 * - Floating accent elements
 * - Parallax depth on scroll
 */

const HeroAsymmetric = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const { hero } = siteConfig

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const letterVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        damping: 12,
        stiffness: 100,
      },
    },
  }

  const slideUpVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
      },
    },
  }

  const splitWord = (word: string) => {
    return word.split('').map((char, index) => (
      <motion.span
        key={index}
        variants={letterVariants}
        className="inline-block"
        style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
      >
        {char === ' ' ? '\u00A0' : char}
      </motion.span>
    ))
  }

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Diagonal Background Split */}
      <div className="absolute inset-0">
        {/* Primary background */}
        <div className="absolute inset-0 bg-[var(--color-bg-primary)]" />

        {/* Diagonal accent section */}
        <div
          className="absolute inset-0 bg-[var(--color-bg-secondary)]"
          style={{
            clipPath: 'polygon(60% 0, 100% 0, 100% 100%, 40% 100%)',
          }}
        />

        {/* Image/Video background with parallax */}
        {hero.background.imageUrl && (
          <motion.div
            className="absolute inset-0"
            style={{
              y,
              clipPath: 'polygon(60% 0, 100% 0, 100% 100%, 40% 100%)',
            }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${hero.background.imageUrl})`,
                opacity: 1 - (hero.background.overlayOpacity || 0.7),
              }}
            />
          </motion.div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-bg-primary)] via-[var(--color-bg-primary)]/80 to-transparent" />

        {/* Decorative elements */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-96 h-96 rounded-3xl"
          style={{
            background: 'radial-gradient(circle, var(--color-primary) 0%, transparent 70%)',
            opacity: 0.1,
            filter: 'blur(60px)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <motion.div
          className="absolute bottom-1/4 left-1/3 w-64 h-64 rounded-3xl"
          style={{
            background: 'radial-gradient(circle, var(--color-secondary) 0%, transparent 70%)',
            opacity: 0.1,
            filter: 'blur(40px)',
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.12, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
        />

        {/* Basketball Court Lines - Decorative */}
        <div className="absolute bottom-0 left-0 w-full h-1/3 overflow-hidden opacity-[0.03] pointer-events-none">
          {/* Center Circle */}
          <div
            className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[600px] h-[300px] border-4 border-[var(--color-primary)] rounded-t-full"
          />
          {/* Free Throw Circle */}
          <div
            className="absolute left-1/4 bottom-0 -translate-x-1/2 w-[300px] h-[150px] border-2 border-[var(--color-primary)] rounded-t-full"
          />
          <div
            className="absolute right-1/4 bottom-0 translate-x-1/2 w-[300px] h-[150px] border-2 border-[var(--color-primary)] rounded-t-full"
          />
        </div>

        {/* Basketball Ring Accent */}
        <motion.div
          className="absolute top-20 right-20 w-24 h-24 rounded-xl border-4 border-[var(--color-primary)]/20"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-md border-2 border-[var(--color-primary)]/30" />
        </motion.div>
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full"
        style={{ opacity }}
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-2xl"
          >
            {/* Headline */}
            <h1 className="text-[clamp(3rem,8vw,6rem)] font-black leading-none mb-6">
              <motion.div className="overflow-hidden">
                <div className="text-[var(--color-primary)]" style={{ WebkitTextStroke: '0' }}>
                  {hero.headline.animated ? (
                    <motion.div variants={containerVariants}>
                      {splitWord(hero.headline.line1)}
                    </motion.div>
                  ) : (
                    hero.headline.line1
                  )}
                </div>
              </motion.div>
              {hero.headline.line2 && (
                <motion.div className="overflow-hidden mt-2">
                  <div className="text-[var(--color-text-primary)]">
                    {hero.headline.animated ? (
                      <motion.div variants={containerVariants}>
                        {splitWord(hero.headline.line2)}
                      </motion.div>
                    ) : (
                      hero.headline.line2
                    )}
                  </div>
                </motion.div>
              )}
            </h1>

            {/* Subheadline */}
            <motion.p
              variants={slideUpVariants}
              className="text-xl md:text-2xl text-[var(--color-text-secondary)] mb-8"
            >
              {hero.subheadline}
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={slideUpVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              {hero.ctas.map((cta, index) => (
                <Link
                  key={index}
                  href={cta.href}
                  className={`
                    inline-flex items-center justify-center px-8 py-4 text-lg font-semibold
                    rounded-lg transition-all duration-300 group
                    ${cta.variant === 'primary'
                      ? 'bg-[var(--color-primary)] text-[var(--color-text-inverse)] hover:brightness-110 hover:shadow-[var(--shadow-glow)]'
                      : 'border-2 border-[var(--color-border-strong)] text-[var(--color-text-primary)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]'
                    }
                  `}
                >
                  {cta.label}
                  <svg
                    className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1"
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
              ))}
            </motion.div>

            {/* Social Proof */}
            {hero.socialProof?.enabled && (
              <motion.div
                variants={slideUpVariants}
                className="mt-12 flex flex-wrap gap-6"
              >
                {hero.socialProof.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-[var(--color-text-muted)]"
                  >
                    <span className="w-2 h-2 rounded-sm bg-[var(--color-primary)]" />
                    <span className="text-sm">{item.text}</span>
                  </div>
                ))}
              </motion.div>
            )}
          </motion.div>

          {/* Right side - Basketball-inspired visual */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="hidden lg:flex items-center justify-center"
          >
            <div className="relative w-full max-w-lg aspect-square">
              {/* Outer ring - Basketball hoop inspired */}
              <motion.div
                className="absolute inset-0 rounded-xl border-4 border-[var(--color-primary)]/40"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              />

              {/* Second ring */}
              <motion.div
                className="absolute inset-4 rounded-xl border-2 border-[var(--color-primary)]/20"
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              />

              {/* Third ring */}
              <motion.div
                className="absolute inset-8 rounded-xl border-2 border-[var(--color-secondary)]/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              />

              {/* Main circular image/content area */}
              <div className="absolute inset-12 rounded-xl bg-[var(--color-bg-tertiary)] overflow-hidden border-4 border-[var(--color-primary)]/50 shadow-[0_0_60px_var(--color-primary)/20]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-[var(--color-text-muted)]">
                    {/* Basketball icon */}
                    <motion.svg
                      className="w-20 h-20 mx-auto mb-4 text-[var(--color-primary)]"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 2c1.85 0 3.55.63 4.9 1.69-1.79 1.59-2.9 3.73-2.9 6.06s1.11 4.47 2.9 6.06c-1.35 1.06-3.05 1.69-4.9 1.69-1.85 0-3.55-.63-4.9-1.69 1.79-1.59 2.9-3.73 2.9-6.06S8.89 7.28 7.1 5.69C8.45 4.63 10.15 4 12 4zm-6.18 3.22C7.05 8.49 8 9.93 8 11.75s-.95 3.26-2.18 4.53C4.63 15.05 4 13.57 4 12s.63-3.05 1.82-4.28zm12.36 0C19.37 8.95 20 10.43 20 12s-.63 3.05-1.82 4.28C17.05 15.01 16 13.57 16 11.75s.95-3.26 2.18-4.53z"/>
                    </motion.svg>
                    <p className="text-sm font-medium">MH5</p>
                  </div>
                </div>

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/10 via-transparent to-[var(--color-secondary)]/10" />
              </div>

              {/* Floating accent dots */}
              <motion.div
                className="absolute top-4 left-1/4 w-3 h-3 rounded-sm bg-[var(--color-primary)]"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className="absolute bottom-8 right-1/4 w-2 h-2 rounded-sm bg-[var(--color-secondary)]"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              />
              <motion.div
                className="absolute top-1/3 right-4 w-4 h-4 rounded-sm bg-[var(--color-primary)]/50"
                animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      {hero.scrollIndicator && (
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <svg
            className="w-6 h-6 text-[var(--color-primary)]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      )}
    </section>
  )
}

export default HeroAsymmetric
