'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { siteConfig } from '@/config/site.config'

/**
 * HERO EDITORIAL VARIANT
 * ======================
 * Magazine-style type hierarchy with editorial aesthetics
 *
 * Signature features:
 * - Oversized typography with mixed weights
 * - Editorial grid layout
 * - Minimalist with strong type focus
 * - Subtle hover interactions
 */

const HeroEditorial = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.5], ['0%', '20%'])

  const { hero } = siteConfig

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const slideVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
        ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
      },
    },
  }

  const lineRevealVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: 1.5,
        ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
      },
    },
  }

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-[var(--color-bg-primary)]"
    >
      {/* Subtle background texture */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-12 py-24"
        style={{ opacity, y }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-12 gap-4 md:gap-8"
        >
          {/* Left column - Issue/Edition */}
          <motion.div
            variants={slideVariants}
            className="col-span-12 md:col-span-2 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <p className="text-[var(--color-text-muted)] text-xs uppercase tracking-[0.3em]">
                Established
              </p>
              <p className="text-[var(--color-text-primary)] text-sm font-light">
                Springfield, MA
              </p>
            </div>
            <div className="hidden md:block space-y-4 mt-auto">
              <p className="text-[var(--color-text-muted)] text-xs uppercase tracking-[0.3em]">
                Issue No.
              </p>
              <p className="text-[var(--color-primary)] text-4xl font-black">
                05
              </p>
            </div>
          </motion.div>

          {/* Center column - Main headline */}
          <div className="col-span-12 md:col-span-8">
            <motion.div variants={slideVariants}>
              {/* Top decoration line */}
              <motion.div
                variants={lineRevealVariants}
                className="h-px bg-[var(--color-border-default)] mb-12 origin-left"
              />

              {/* Headline */}
              <h1 className="relative">
                {/* Line 1 - Large outlined */}
                <div className="overflow-hidden">
                  <motion.div
                    variants={slideVariants}
                    className="text-[clamp(4rem,15vw,12rem)] font-black leading-[0.85] tracking-tight"
                    style={{
                      WebkitTextStroke: '2px var(--color-primary)',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {hero.headline.line1}
                  </motion.div>
                </div>

                {/* Line 2 - Solid fill */}
                {hero.headline.line2 && (
                  <div className="overflow-hidden -mt-4 md:-mt-8">
                    <motion.div
                      variants={slideVariants}
                      className="text-[clamp(4rem,15vw,12rem)] font-black leading-[0.85] tracking-tight text-[var(--color-text-primary)]"
                    >
                      {hero.headline.line2}
                    </motion.div>
                  </div>
                )}
              </h1>

              {/* Bottom decoration line */}
              <motion.div
                variants={lineRevealVariants}
                className="h-px bg-[var(--color-border-default)] mt-12 origin-right"
              />
            </motion.div>

            {/* Subheadline and CTAs */}
            <motion.div
              variants={slideVariants}
              className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-end"
            >
              {/* Subheadline */}
              <div>
                <p className="text-lg md:text-xl text-[var(--color-text-secondary)] font-light leading-relaxed max-w-md">
                  {hero.subheadline}
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 md:justify-end">
                {hero.ctas.map((cta, index) => (
                  <Link
                    key={index}
                    href={cta.href}
                    className={`
                      group relative inline-flex items-center justify-center
                      ${cta.variant === 'primary'
                        ? 'text-[var(--color-primary)]'
                        : 'text-[var(--color-text-secondary)]'
                      }
                    `}
                  >
                    <span className="text-sm uppercase tracking-[0.2em] font-medium">
                      {cta.label}
                    </span>
                    <span className="ml-4 w-12 h-px bg-current transform origin-left transition-transform group-hover:scale-x-150" />
                    <svg
                      className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right column - Social proof */}
          <motion.div
            variants={slideVariants}
            className="col-span-12 md:col-span-2 flex flex-col justify-between items-end text-right"
          >
            <div className="hidden md:block space-y-4">
              <p className="text-[var(--color-text-muted)] text-xs uppercase tracking-[0.3em]">
                Recognition
              </p>
              {hero.socialProof?.items.slice(0, 2).map((item, index) => (
                <p key={index} className="text-[var(--color-text-secondary)] text-sm font-light">
                  {item.text}
                </p>
              ))}
            </div>

            {/* Vertical text */}
            <div
              className="hidden md:block text-[var(--color-text-muted)] text-xs uppercase tracking-[0.3em]"
              style={{
                writingMode: 'vertical-rl',
                textOrientation: 'mixed',
              }}
            >
              Scroll to explore
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Corner accents */}
      <div className="absolute top-8 left-8 w-12 h-12 border-l-2 border-t-2 border-[var(--color-border-subtle)]" />
      <div className="absolute top-8 right-8 w-12 h-12 border-r-2 border-t-2 border-[var(--color-border-subtle)]" />
      <div className="absolute bottom-8 left-8 w-12 h-12 border-l-2 border-b-2 border-[var(--color-border-subtle)]" />
      <div className="absolute bottom-8 right-8 w-12 h-12 border-r-2 border-b-2 border-[var(--color-border-subtle)]" />

      {/* Scroll indicator */}
      {hero.scrollIndicator && (
        <motion.div
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <motion.div
            className="w-px h-16 bg-[var(--color-primary)]"
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ transformOrigin: 'top' }}
          />
        </motion.div>
      )}
    </section>
  )
}

export default HeroEditorial
