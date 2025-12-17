'use client'

import { motion } from 'framer-motion'

interface GradientTextProps {
  text: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  className?: string
}

const GradientText = ({ text, as: Component = 'span', className = '' }: GradientTextProps) => {
  return (
    <Component className={`relative inline-block font-black tracking-tighter uppercase ${className}`}>
      {/* Main Text */}
      <span className="relative z-10 block text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400">
        {text}
      </span>

      {/* Glitch Layer 1 */}
      <motion.span
        className="absolute top-0 left-0 z-0 text-[var(--color-primary)] opacity-50 mix-blend-screen"
        animate={{
          x: [-2, 2, -1, 0],
          y: [1, -1, 0],
          opacity: [0.5, 0],
        }}
        transition={{
          duration: 0.2,
          repeat: Infinity,
          repeatDelay: 3,
        }}
        aria-hidden="true"
      >
        {text}
      </motion.span>
    </Component>
  )
}

export default GradientText
