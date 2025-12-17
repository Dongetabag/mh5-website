'use client'

import { useRef, useState, ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

/**
 * MAGNETIC BUTTON - Signature Component
 * =====================================
 * Button that follows cursor with magnetic effect
 *
 * Trophy-worthy feature: Creates a premium, interactive feel
 * that makes users want to click and explore.
 */

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  href?: string
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  magneticStrength?: number
  disabled?: boolean
  fullWidth?: boolean
}

const MagneticButton = ({
  children,
  className = '',
  onClick,
  href,
  variant = 'primary',
  size = 'md',
  magneticStrength = 0.3,
  disabled = false,
  fullWidth = false,
}: MagneticButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  // Motion values for magnetic effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth spring animation
  const springConfig = { damping: 15, stiffness: 150 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  // Background highlight position
  const highlightX = useTransform(x, (val) => `${50 + val * 0.5}%`)
  const highlightY = useTransform(y, (val) => `${50 + val * 0.5}%`)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current || disabled) return

    const rect = buttonRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const deltaX = (e.clientX - centerX) * magneticStrength
    const deltaY = (e.clientY - centerY) * magneticStrength

    mouseX.set(deltaX)
    mouseY.set(deltaY)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    mouseX.set(0)
    mouseY.set(0)
  }

  // Size classes
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  // Variant classes
  const variantClasses = {
    primary: `
      bg-[var(--color-primary)] text-[var(--color-text-inverse)]
      hover:brightness-110
    `,
    secondary: `
      bg-[var(--color-secondary)] text-[var(--color-text-inverse)]
      hover:brightness-110
    `,
    outline: `
      bg-transparent border-2 border-[var(--color-border-strong)]
      text-[var(--color-text-primary)]
      hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]
    `,
    ghost: `
      bg-transparent text-[var(--color-text-primary)]
      hover:bg-[var(--color-bg-tertiary)]
    `,
  }

  const Component = href ? motion.a : motion.button

  return (
    <Component
      ref={buttonRef as any}
      href={href}
      onClick={onClick}
      disabled={disabled}
      className={`
        relative inline-flex items-center justify-center
        font-semibold rounded-2xl overflow-hidden
        transition-all duration-300
        disabled:opacity-50 disabled:cursor-not-allowed
        ${fullWidth ? 'w-full' : ''}
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
      `}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.98 }}
    >
      {/* Gradient highlight on hover */}
      {variant === 'primary' && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${highlightX} ${highlightY}, rgba(255,255,255,0.3) 0%, transparent 50%)`,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          boxShadow: `0 0 30px var(--color-primary)`,
          opacity: isHovered && variant === 'primary' ? 0.5 : 0,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>

      {/* Border glow for outline variant */}
      {variant === 'outline' && isHovered && (
        <motion.div
          className="absolute inset-0 rounded-2xl"
          style={{
            boxShadow: `inset 0 0 20px var(--color-primary)`,
            opacity: 0.2,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
        />
      )}
    </Component>
  )
}

export default MagneticButton
