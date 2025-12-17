'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { siteConfig } from '@/config/site.config'

/**
 * STATS FLIP 3D LAYOUT - Section Variant
 * =====================================
 * Stats display with 3D flip card animation
 *
 * Trophy-worthy: Cards flip to reveal stats in dramatic fashion
 */

interface FlipCardProps {
  value: number
  prefix?: string
  suffix?: string
  label: string
  description?: string
  delay: number
  isInView: boolean
}

const FlipCard = ({
  value,
  prefix,
  suffix,
  label,
  description,
  delay,
  isInView,
}: FlipCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false)

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setIsFlipped(true), delay * 1000)
      return () => clearTimeout(timer)
    }
  }, [isInView, delay])

  return (
    <div className="perspective-1000" style={{ perspective: '1000px' }}>
      <motion.div
        className="relative w-full h-64 cursor-pointer"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
      >
        {/* Front face */}
        <div
          className="absolute inset-0 rounded-2xl flex items-center justify-center border"
          style={{
            backfaceVisibility: 'hidden',
            backgroundColor: 'var(--color-bg-tertiary)',
            borderColor: 'var(--color-border-default)',
          }}
        >
          <div className="text-center">
            <div
              className="w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: 'var(--color-primary)' }}
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="var(--color-text-inverse)"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <p
              className="text-lg font-semibold"
              style={{ color: 'var(--color-text-primary)' }}
            >
              {label}
            </p>
          </div>
        </div>

        {/* Back face */}
        <div
          className="absolute inset-0 rounded-2xl flex items-center justify-center border"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: `linear-gradient(135deg, var(--color-bg-secondary), var(--color-bg-tertiary))`,
            borderColor: 'var(--color-primary)',
          }}
        >
          <div className="text-center px-6">
            <div
              className="text-5xl md:text-6xl font-bold mb-2"
              style={{ color: 'var(--color-primary)' }}
            >
              {prefix}
              {value}
              {suffix}
            </div>
            <p
              className="text-lg font-semibold"
              style={{ color: 'var(--color-text-primary)' }}
            >
              {label}
            </p>
            {description && (
              <p
                className="text-sm mt-2"
                style={{ color: 'var(--color-text-muted)' }}
              >
                {description}
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

const StatsFlip3D = () => {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const stats = siteConfig.stats.items

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32"
      style={{ backgroundColor: 'var(--color-bg-primary)' }}
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
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
            Flip to Reveal
          </h2>
          <p
            className="text-lg"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Tap to discover the numbers behind the success
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <FlipCard
              key={index}
              value={stat.value}
              prefix={stat.prefix}
              suffix={stat.suffix}
              label={stat.label}
              description={stat.description}
              delay={0.3 + index * 0.2}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsFlip3D
