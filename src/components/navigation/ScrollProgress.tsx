'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

/**
 * SCROLL PROGRESS - Navigation Component
 * ======================================
 * Visual scroll indicator at top of page
 * Shows progress through the page content
 */

interface ScrollProgressProps {
  height?: number
  color?: string
  showOnTop?: boolean
  className?: string
}

const ScrollProgress = ({
  height = 3,
  color = 'var(--color-primary, #7DF9FF)',
  showOnTop = true,
  className = '',
}: ScrollProgressProps) => {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      className={`fixed ${showOnTop ? 'top-0' : 'bottom-0'} left-0 right-0 z-[100] origin-left ${className}`}
      style={{
        scaleX,
        height: `${height}px`,
      }}
    >
      <div
        className="h-full w-full"
        style={{
          backgroundColor: color,
          boxShadow: `0 0 10px ${color}, 0 0 20px ${color}`,
        }}
      />
    </motion.div>
  )
}

export default ScrollProgress

