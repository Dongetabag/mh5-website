'use client'

import { useRef, useState } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'
import Image from 'next/image'

/**
 * IMAGE REVEAL - Media Component
 * ==============================
 * Scroll-triggered image reveal animation
 * Progressive loading with lazy loading support
 */

interface ImageRevealProps {
  src: string
  alt: string
  width?: number
  height?: number
  revealDirection?: 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale'
  delay?: number
  duration?: number
  className?: string
  priority?: boolean
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
  onRevealComplete?: () => void
}

const ImageReveal = ({
  src,
  alt,
  width,
  height,
  revealDirection = 'up',
  delay = 0,
  duration = 0.6,
  className = '',
  priority = false,
  objectFit = 'cover',
  onRevealComplete,
}: ImageRevealProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const controls = useAnimation()
  const [imageLoaded, setImageLoaded] = useState(false)

  // Animation variants based on reveal direction
  const getInitialState = () => {
    switch (revealDirection) {
      case 'up':
        return { y: 50, opacity: 0 }
      case 'down':
        return { y: -50, opacity: 0 }
      case 'left':
        return { x: 50, opacity: 0 }
      case 'right':
        return { x: -50, opacity: 0 }
      case 'fade':
        return { opacity: 0 }
      case 'scale':
        return { scale: 0.8, opacity: 0 }
      default:
        return { y: 50, opacity: 0 }
    }
  }

  const variants = {
    hidden: getInitialState(),
    visible: {
      x: 0,
      y: 0,
      scale: 1,
      opacity: 1,
    },
  }

  // Trigger animation when in view
  if (isInView) {
    controls.start('visible')
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
        onComplete: onRevealComplete,
      }}
      className={`overflow-hidden ${className}`}
    >
      <div className="relative w-full h-full">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={`transition-opacity duration-500 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ objectFit }}
          priority={priority}
          onLoad={() => setImageLoaded(true)}
          loading={priority ? undefined : 'lazy'}
          unoptimized
        />
        {!imageLoaded && (
          <div className="absolute inset-0 bg-[var(--color-bg-secondary)] animate-pulse" />
        )}
      </div>
    </motion.div>
  )
}

export default ImageReveal

