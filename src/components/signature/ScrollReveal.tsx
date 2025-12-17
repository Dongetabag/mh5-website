'use client'

import { useRef, ReactNode } from 'react'
import { motion, useInView, Variants } from 'framer-motion'

/**
 * SCROLL REVEAL - Signature Component
 * ====================================
 * Animated reveal effects triggered on scroll
 */

type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'none'
type RevealEffect = 'fade' | 'slide' | 'scale' | 'blur' | 'flip'

interface ScrollRevealProps {
  children: ReactNode
  direction?: RevealDirection
  effect?: RevealEffect
  delay?: number
  duration?: number
  distance?: number
  once?: boolean
  threshold?: number
  className?: string
  stagger?: boolean
  staggerDelay?: number
}

const ScrollReveal = ({
  children,
  direction = 'up',
  effect = 'slide',
  delay = 0,
  duration = 0.6,
  distance = 50,
  once = true,
  threshold = 0.1,
  className = '',
  stagger = false,
  staggerDelay = 0.1,
}: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null)
  // Use a simplified margin calculation - threshold 0.1 = "-10px"
  const marginPx = Math.round(threshold * 100)
  const isInView = useInView(ref, {
    once,
    amount: threshold, // Use amount instead of margin for percentage-based triggering
  })

  // Calculate initial position based on direction
  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { y: distance }
      case 'down':
        return { y: -distance }
      case 'left':
        return { x: distance }
      case 'right':
        return { x: -distance }
      default:
        return {}
    }
  }

  // Build variants based on effect type
  const getVariants = (): Variants => {
    const baseHidden: any = {
      opacity: 0,
      ...getInitialPosition(),
    }

    const baseVisible: any = {
      opacity: 1,
      x: 0,
      y: 0,
    }

    switch (effect) {
      case 'fade':
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        }

      case 'scale':
        return {
          hidden: { ...baseHidden, scale: 0.8 },
          visible: { ...baseVisible, scale: 1 },
        }

      case 'blur':
        return {
          hidden: { ...baseHidden, filter: 'blur(10px)' },
          visible: { ...baseVisible, filter: 'blur(0px)' },
        }

      case 'flip':
        return {
          hidden: {
            ...baseHidden,
            rotateX: direction === 'up' || direction === 'down' ? 90 : 0,
            rotateY: direction === 'left' || direction === 'right' ? 90 : 0,
          },
          visible: {
            ...baseVisible,
            rotateX: 0,
            rotateY: 0,
          },
        }

      case 'slide':
      default:
        return {
          hidden: baseHidden,
          visible: baseVisible,
        }
    }
  }

  const variants = getVariants()

  // Container variants for stagger effect
  const containerVariants: Variants = stagger
    ? {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: delay,
          },
        },
      }
    : {}

  const itemVariants: Variants = {
    hidden: variants.hidden,
    visible: {
      ...variants.visible,
      transition: {
        duration,
        delay: stagger ? 0 : delay,
        ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
      },
    },
  }

  if (stagger) {
    return (
      <motion.div
        ref={ref}
        className={className}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={itemVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {children}
    </motion.div>
  )
}

// Child component for stagger animations
interface ScrollRevealItemProps {
  children: ReactNode
  className?: string
  effect?: 'fade' | 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'scale' | 'blur'
  delay?: number
  duration?: number
}

export const ScrollRevealItem = ({
  children,
  className = '',
  effect = 'fade-up',
  delay = 0,
  duration = 0.5,
}: ScrollRevealItemProps) => {
  const getVariants = (): Variants => {
    switch (effect) {
      case 'fade':
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        }
      case 'fade-down':
        return {
          hidden: { opacity: 0, y: -30 },
          visible: { opacity: 1, y: 0 },
        }
      case 'fade-left':
        return {
          hidden: { opacity: 0, x: 30 },
          visible: { opacity: 1, x: 0 },
        }
      case 'fade-right':
        return {
          hidden: { opacity: 0, x: -30 },
          visible: { opacity: 1, x: 0 },
        }
      case 'scale':
        return {
          hidden: { opacity: 0, scale: 0.8 },
          visible: { opacity: 1, scale: 1 },
        }
      case 'blur':
        return {
          hidden: { opacity: 0, filter: 'blur(10px)' },
          visible: { opacity: 1, filter: 'blur(0px)' },
        }
      case 'fade-up':
      default:
        return {
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0 },
        }
    }
  }

  const variants = getVariants()

  const itemVariants: Variants = {
    hidden: variants.hidden,
    visible: {
      ...variants.visible,
      transition: {
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
      },
    },
  }

  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  )
}

export default ScrollReveal
