'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import { motion, useInView, useSpring, useTransform } from 'framer-motion'

/**
 * PARTICLE COUNTER - Signature Component
 * ======================================
 * Animated number counter with particle burst effect
 *
 * Trophy-worthy feature: Numbers count up with explosive particle
 * effects that make stats feel impactful and memorable.
 */

interface ParticleCounterProps {
  value: number
  prefix?: string
  suffix?: string
  label: string
  description?: string
  duration?: number
  delay?: number
  particleCount?: number
}

// Individual particle component
const Particle = ({
  color,
  delay,
  size,
}: {
  color: string
  delay: number
  size: number
}) => {
  const angle = Math.random() * Math.PI * 2
  const distance = 50 + Math.random() * 100
  const x = Math.cos(angle) * distance
  const y = Math.sin(angle) * distance

  return (
    <motion.div
      className="absolute rounded-sm pointer-events-none"
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        boxShadow: `0 0 ${size * 2}px ${color}`,
      }}
      initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
      animate={{
        x,
        y,
        scale: 0,
        opacity: 0,
      }}
      transition={{
        duration: 0.8 + Math.random() * 0.4,
        delay,
        ease: 'easeOut',
      }}
    />
  )
}

const ParticleCounter = ({
  value,
  prefix = '',
  suffix = '',
  label,
  description,
  duration = 2,
  delay = 0,
  particleCount = 20,
}: ParticleCounterProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })
  const [hasAnimated, setHasAnimated] = useState(false)
  const [showParticles, setShowParticles] = useState(false)

  // Spring animation for the number
  const springValue = useSpring(0, {
    duration: duration * 1000,
    bounce: 0.1,
  })

  const displayValue = useTransform(springValue, (latest) => Math.round(latest))

  // Start animation when in view
  useEffect(() => {
    if (isInView && !hasAnimated) {
      const timer = setTimeout(() => {
        springValue.set(value)
        setHasAnimated(true)
        // Trigger particles at peak moment
        setTimeout(() => setShowParticles(true), duration * 600)
      }, delay * 1000)

      return () => clearTimeout(timer)
    }
  }, [isInView, hasAnimated, value, springValue, delay, duration])

  // Generate particles
  const particles = showParticles
    ? Array.from({ length: particleCount }, (_, i) => (
        <Particle
          key={i}
          color={`hsl(${45 + Math.random() * 15}, 100%, 50%)`} // Gold variations
          delay={Math.random() * 0.2}
          size={3 + Math.random() * 5}
        />
      ))
    : null

  return (
    <motion.div
      ref={containerRef}
      className="relative text-center group"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
    >
      {/* Background glow on hover */}
      <div className="absolute inset-0 rounded-2xl bg-[var(--color-primary)]/0 group-hover:bg-[var(--color-primary)]/5 transition-colors duration-500" />

      {/* Particle container */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        {particles}
      </div>

      {/* Value */}
      <div className="relative">
        <div className="flex items-baseline justify-center">
          {prefix && (
            <span className="text-2xl md:text-3xl font-bold text-[var(--color-primary)] mr-1">
              {prefix}
            </span>
          )}
          <motion.span
            className="text-5xl md:text-7xl font-black text-[var(--color-text-primary)] tabular-nums"
            style={{
              textShadow: showParticles ? '0 0 30px var(--color-primary)' : 'none',
            }}
          >
            {displayValue}
          </motion.span>
          {suffix && (
            <span className="text-2xl md:text-3xl font-bold text-[var(--color-primary)] ml-1">
              {suffix}
            </span>
          )}
        </div>
      </div>

      {/* Label */}
      <motion.p
        className="mt-4 text-lg font-semibold text-[var(--color-text-primary)]"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: delay + 0.3 }}
      >
        {label}
      </motion.p>

      {/* Description */}
      {description && (
        <motion.p
          className="mt-2 text-sm text-[var(--color-text-muted)]"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: delay + 0.5 }}
        >
          {description}
        </motion.p>
      )}

      {/* Decorative line */}
      <motion.div
        className="absolute -bottom-4 left-1/2 -translate-x-1/2 h-1 bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent"
        initial={{ width: 0 }}
        animate={isInView ? { width: '60%' } : {}}
        transition={{ duration: 0.8, delay: delay + 0.7 }}
      />
    </motion.div>
  )
}

export default ParticleCounter
