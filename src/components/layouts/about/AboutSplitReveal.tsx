'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { siteConfig } from '@/config/site.config'
import { GradientText, MagneticButton } from '@/components/signature'

/**
 * ABOUT SPLIT REVEAL LAYOUT - Section Variant
 * ==========================================
 * Split screen with reveal animations
 *
 * Trophy-worthy: Content reveals as user scrolls with cinematic effect
 */

const AboutSplitReveal = () => {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1.2, 1])
  const imageOpacity = useTransform(scrollYProgress, [0, 0.3], [0.5, 1])

  const about = siteConfig.about
  const headline = about?.headline?.line1 && about?.headline?.line2
    ? `${about.headline.line1} ${about.headline.line2}`
    : about?.headline?.line1 || siteConfig.meta.siteName

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ backgroundColor: 'var(--color-bg-primary)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative aspect-[4/5] rounded-2xl overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: about?.image?.src
                  ? `url(${about.image.src})`
                  : 'linear-gradient(135deg, var(--color-bg-secondary), var(--color-bg-tertiary))',
                scale: imageScale,
                opacity: imageOpacity,
              }}
            />

            {/* Overlay gradient */}
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to top, var(--color-bg-primary), transparent 50%)`,
              }}
            />

            {/* Floating accent */}
            <motion.div
              className="absolute bottom-8 left-8 right-8 p-6 rounded-xl backdrop-blur-md"
              style={{
                backgroundColor: 'rgba(var(--color-bg-secondary-rgb), 0.8)',
                border: '1px solid var(--color-border-default)',
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <p
                className="text-lg font-semibold italic"
                style={{ color: 'var(--color-text-primary)' }}
              >
                &ldquo;Excellence is not a destination, it&apos;s a continuous journey.&rdquo;
              </p>
            </motion.div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span
              className="text-sm font-semibold tracking-widest uppercase mb-4 block"
              style={{ color: 'var(--color-primary)' }}
            >
              The Story
            </span>

            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <GradientText gradient="diamond" animate={false}>
                {headline}
              </GradientText>
            </h2>

            <div className="space-y-4 mb-8">
              {(about?.content || [
                'A story of dedication, passion, and relentless pursuit of excellence.',
                'From humble beginnings to the pinnacle of success, every step has been a testament to hard work and vision.',
              ]).map((paragraph, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="text-lg"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <MagneticButton
                href={about?.cta?.href || '/legacy'}
                variant="primary"
                size="lg"
              >
                {about?.cta?.label || 'Read Full Story'}
              </MagneticButton>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AboutSplitReveal
