'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ParticleCounter } from '@/components/signature'
import { siteConfig } from '@/config/site.config'

/**
 * STATS PARTICLE LAYOUT - Section Variant
 * =======================================
 * Stats display with particle burst animations
 *
 * Trophy-worthy: Numbers explode into view with particle effects
 */

const StatsParticle = () => {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const stats = siteConfig.stats.items

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        damping: 15,
        stiffness: 100,
      },
    },
  }

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ backgroundColor: 'var(--color-bg-secondary)' }}
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at 50% 50%, var(--color-primary), transparent 70%)`,
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
          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: 'var(--color-text-primary)' }}
          >
            By The Numbers
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            A track record of excellence that speaks for itself
          </p>
        </motion.div>

        {/* Stats grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="text-center"
            >
              <ParticleCounter
                value={stat.value}
                suffix={stat.suffix}
                prefix={stat.prefix}
                label={stat.label}
                description={stat.description}
                duration={2}
                particleCount={20}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default StatsParticle
