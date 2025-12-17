'use client'

import { useRef, useState, ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

/**
 * ANIMATED CARD - Signature Component
 * ====================================
 * 3D tilt effect card with glow and hover animations
 */

interface AnimatedCardProps {
  children: ReactNode
  className?: string
  glowColor?: string
  tiltAmount?: number
  glowIntensity?: number
  scaleOnHover?: boolean
  onClick?: () => void
}

const AnimatedCard = ({
  children,
  className = '',
  glowColor = 'var(--color-primary)',
  tiltAmount = 10,
  glowIntensity = 0.3,
  scaleOnHover = true,
  onClick,
}: AnimatedCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  // Motion values for tilt
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth spring animation
  const springConfig = { damping: 20, stiffness: 300 }
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [tiltAmount, -tiltAmount]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-tiltAmount, tiltAmount]), springConfig)

  // Glow position
  const glowX = useSpring(useTransform(mouseX, [-0.5, 0.5], [0, 100]), springConfig)
  const glowY = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, 100]), springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5

    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      className={`relative ${className}`}
      style={{
        perspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileHover={scaleOnHover ? { scale: 1.02 } : undefined}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="relative w-full h-full"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${glowX}% ${glowY}%, ${glowColor}, transparent 50%)`,
            opacity: isHovered ? glowIntensity : 0,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Border glow */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            boxShadow: `0 0 30px ${glowColor}`,
            opacity: isHovered ? glowIntensity * 0.5 : 0,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Card content */}
        <div
          className="relative z-10 w-full h-full bg-[var(--color-bg-secondary)] rounded-2xl border border-[var(--color-border-default)] overflow-hidden"
          style={{
            transform: 'translateZ(20px)',
          }}
        >
          {children}
        </div>

        {/* Reflection/shine effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden"
          style={{
            background: `linear-gradient(
              105deg,
              transparent 40%,
              rgba(255, 255, 255, 0.1) 45%,
              rgba(255, 255, 255, 0.2) 50%,
              rgba(255, 255, 255, 0.1) 55%,
              transparent 60%
            )`,
            opacity: isHovered ? 1 : 0,
            transform: `translateX(${isHovered ? '100%' : '-100%'})`,
          }}
          transition={{ duration: 0.5 }}
        />
      </motion.div>
    </motion.div>
  )
}

export default AnimatedCard
