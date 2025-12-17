'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { siteConfig } from '@/config/site.config'
import { GradientText, MagneticButton, ScrollReveal, ScrollRevealItem } from '@/components/signature'

/**
 * ABOUT PARALLAX LAYOUT - Section Variant
 * ======================================
 * Full-width parallax scrolling experience
 *
 * Trophy-worthy: Immersive depth effect as user scrolls through content
 */

const AboutParallax = () => {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-10%'])

  const about = siteConfig.about
  const headline = about?.headline?.line1 || 'The Journey'

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden">
      {/* Parallax background */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: about?.image?.src
            ? `url(${about.image.src})`
            : 'linear-gradient(135deg, var(--color-bg-secondary), var(--color-bg-primary))',
          y: bgY,
          scale: 1.2,
        }}
      />

      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to bottom, var(--color-bg-primary), transparent 20%, transparent 80%, var(--color-bg-primary))`,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: 'var(--color-bg-primary)',
          opacity: 0.7,
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 min-h-screen flex items-center py-24 md:py-32"
        style={{ y: textY }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <ScrollRevealItem effect="fade-up">
              <span
                className="text-sm font-semibold tracking-widest uppercase mb-6 block"
                style={{ color: 'var(--color-primary)' }}
              >
                About
              </span>
            </ScrollRevealItem>

            <ScrollRevealItem effect="fade-up" delay={0.1}>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8">
                <GradientText gradient="diamond" shimmer>
                  {headline}
                </GradientText>
              </h2>
            </ScrollRevealItem>

            <ScrollRevealItem effect="fade-up" delay={0.2}>
              <p
                className="text-xl md:text-2xl mb-12 leading-relaxed"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {about?.content?.[0] || 'A relentless pursuit of excellence that has defined a generation.'}
              </p>
            </ScrollRevealItem>

            <ScrollRevealItem effect="fade-up" delay={0.3}>
              <MagneticButton
                href={about?.cta?.href || '/legacy'}
                variant="primary"
                size="lg"
              >
                {about?.cta?.label || 'Discover More'}
              </MagneticButton>
            </ScrollRevealItem>
          </ScrollReveal>
        </div>
      </motion.div>
    </section>
  )
}

export default AboutParallax
