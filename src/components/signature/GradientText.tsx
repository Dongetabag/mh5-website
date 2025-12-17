'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

/**
 * GRADIENT TEXT - Signature Component
 * ===================================
 * Animated gradient text with shimmer effect
 *
 * Trophy-worthy feature: Headlines that shimmer and glow,
 * creating that luxury brand feel.
 */

interface GradientTextProps {
  children: string
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'
  gradient?: 'diamond' | 'ice' | 'frost' | 'electric' | 'fire' | 'ocean' | 'custom'
  customColors?: string[]
  animate?: boolean
  shimmer?: boolean
  delay?: number
}

const gradientPresets = {
  diamond: ['#7DF9FF', '#9DFBFF', '#FFFFFF', '#BDFCFF', '#7DF9FF'],
  ice: ['#7DF9FF', '#9DFBFF', '#FFFFFF', '#BDFCFF', '#7DF9FF'],
  frost: ['#FFFFFF', '#BDFCFF', '#9DFBFF'],
  electric: ['#00D4FF', '#00FFFF', '#0099FF', '#00D4FF'],
  fire: ['#FF4444', '#FF6B6B', '#FFD700', '#FF4444'],
  ocean: ['#0077B6', '#00B4D8', '#90E0EF', '#0077B6'],
  custom: [],
}

const GradientText = ({
  children,
  className = '',
  as: Component = 'span',
  gradient = 'diamond',
  customColors,
  animate = true,
  shimmer = true,
  delay = 0,
}: GradientTextProps) => {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const colors = gradient === 'custom' && customColors ? customColors : gradientPresets[gradient]
  const gradientString = `linear-gradient(90deg, ${colors.join(', ')})`

  // Letter animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: delay,
      },
    },
  }

  const letterVariants = {
    hidden: { y: 50, opacity: 0 },
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

  const MotionComponent = motion[Component as keyof typeof motion] as any

  if (animate) {
    // Animated version with letter-by-letter reveal
    return (
      <MotionComponent
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className={`relative inline-block ${className}`}
        style={{
          background: gradientString,
          backgroundSize: shimmer ? '200% 100%' : '100% 100%',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          animation: shimmer ? 'shimmer 3s linear infinite' : undefined,
        }}
      >
        {children.split('').map((char, index) => (
          <motion.span
            key={index}
            variants={letterVariants}
            style={{
              display: char === ' ' ? 'inline' : 'inline-block',
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </MotionComponent>
    )
  }

  // Static version (for performance)
  return (
    <Component
      ref={ref as any}
      className={`relative inline-block ${className}`}
      style={{
        background: gradientString,
        backgroundSize: shimmer ? '200% 100%' : '100% 100%',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        animation: shimmer ? 'shimmer 3s linear infinite' : undefined,
      }}
    >
      {children}

      {/* Add shimmer keyframes via style tag */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }
      `}</style>
    </Component>
  )
}

export default GradientText
