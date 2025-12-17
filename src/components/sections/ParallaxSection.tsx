'use client'

import { useRef, ReactNode } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

/**
 * PARALLAX SECTION - Section Component
 * ====================================
 * Creates depth layering with parallax scrolling effect
 * Multiple layers scroll at different speeds for depth
 */

interface ParallaxSectionProps {
  children: ReactNode
  speed?: number
  className?: string
  offset?: ['start start' | 'start end' | 'end start' | 'end end', 'start start' | 'start end' | 'end start' | 'end end']
}

interface ParallaxLayerProps {
  children: ReactNode
  speed: number
  className?: string
}

const ParallaxLayer = ({ children, speed, className = '' }: ParallaxLayerProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, -100 * speed])

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const ParallaxSection = ({
  children,
  speed = 0.5,
  className = '',
  offset = ['start end', 'end start'],
}: ParallaxSectionProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, -100 * speed])

  return (
    <motion.section
      ref={ref}
      style={{ y }}
      className={className}
    >
      {children}
    </motion.section>
  )
}

// Export both components
ParallaxSection.Layer = ParallaxLayer

export default ParallaxSection

