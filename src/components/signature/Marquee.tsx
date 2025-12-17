'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'

/**
 * MARQUEE - Signature Component
 * =============================
 * Infinite scrolling text or logo strip
 */

interface MarqueeProps {
  children: ReactNode
  speed?: number
  direction?: 'left' | 'right'
  pauseOnHover?: boolean
  className?: string
  gap?: number
}

const Marquee = ({
  children,
  speed = 30,
  direction = 'left',
  pauseOnHover = true,
  className = '',
  gap = 48,
}: MarqueeProps) => {
  const duration = 100 / speed

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
      }}
    >
      <motion.div
        className="flex"
        style={{ gap }}
        animate={{
          x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'],
        }}
        transition={{
          x: {
            duration,
            repeat: Infinity,
            ease: 'linear',
          },
        }}
        whileHover={pauseOnHover ? { animationPlayState: 'paused' } : undefined}
      >
        {/* Duplicate content for seamless loop */}
        <div className="flex shrink-0" style={{ gap }}>
          {children}
        </div>
        <div className="flex shrink-0" style={{ gap }}>
          {children}
        </div>
      </motion.div>
    </div>
  )
}

export default Marquee
