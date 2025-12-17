'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView, useSpring, useTransform } from 'framer-motion'
import { siteConfig } from '@/config/site.config'

/**
 * STATS ODOMETER LAYOUT - Section Variant
 * =======================================
 * Stats display with rolling odometer animation
 *
 * Trophy-worthy: Numbers roll like a luxury car odometer
 */

interface OdometerDigitProps {
  digit: number
  delay: number
}

const OdometerDigit = ({ digit, delay }: OdometerDigitProps) => {
  const spring = useSpring(0, { stiffness: 30, damping: 15 })

  useEffect(() => {
    const timer = setTimeout(() => {
      spring.set(digit)
    }, delay * 1000)
    return () => clearTimeout(timer)
  }, [digit, spring, delay])

  const transform = useTransform(spring, (value) => {
    return `translateY(${-value * 10}%)`
  })

  return (
    <div
      className="relative h-[1.2em] w-[0.65em] overflow-hidden"
      style={{ color: 'var(--color-primary)' }}
    >
      <motion.div style={{ transform }} className="absolute">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <div key={num} className="h-[1.2em] flex items-center justify-center">
            {num}
          </div>
        ))}
      </motion.div>
    </div>
  )
}

interface OdometerNumberProps {
  value: number
  prefix?: string
  suffix?: string
  isInView: boolean
}

const OdometerNumber = ({ value, prefix, suffix, isInView }: OdometerNumberProps) => {
  const [digits, setDigits] = useState<number[]>([])

  useEffect(() => {
    if (isInView) {
      const numStr = value.toString()
      setDigits(numStr.split('').map(Number))
    }
  }, [value, isInView])

  return (
    <div className="flex items-baseline justify-center text-5xl md:text-6xl lg:text-7xl font-bold">
      {prefix && (
        <span style={{ color: 'var(--color-primary)' }}>{prefix}</span>
      )}
      <div className="flex">
        {digits.map((digit, index) => (
          <OdometerDigit key={index} digit={digit} delay={index * 0.1} />
        ))}
      </div>
      {suffix && (
        <span
          className="text-3xl md:text-4xl ml-1"
          style={{ color: 'var(--color-primary)' }}
        >
          {suffix}
        </span>
      )}
    </div>
  )
}

const StatsOdometer = () => {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const stats = siteConfig.stats.items

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32"
      style={{ backgroundColor: 'var(--color-bg-primary)' }}
    >
      {/* Decorative lines */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute h-px w-full"
            style={{
              top: `${20 + i * 15}%`,
              background: `linear-gradient(90deg, transparent, var(--color-border-default), transparent)`,
              opacity: 0.3,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span
            className="text-sm font-semibold tracking-widest uppercase mb-4 block"
            style={{ color: 'var(--color-primary)' }}
          >
            Career Highlights
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold"
            style={{ color: 'var(--color-text-primary)' }}
          >
            The Stats Don&apos;t Lie
          </h2>
        </motion.div>

        {/* Stats row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div
                className="rounded-2xl p-8 border"
                style={{
                  backgroundColor: 'var(--color-bg-secondary)',
                  borderColor: 'var(--color-border-default)',
                }}
              >
                <OdometerNumber
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  isInView={isInView}
                />
                <p
                  className="text-lg font-semibold mt-4"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  {stat.label}
                </p>
                {stat.description && (
                  <p
                    className="text-sm mt-2"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    {stat.description}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsOdometer
