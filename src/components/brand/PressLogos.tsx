'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

/**
 * PRESS LOGOS - Brand Component
 * =============================
 * Animated infinite scrolling press mention bar
 * Preserves brand colors with hover effects
 */

interface PressLogo {
  id: string
  name: string
  logo: string
  url?: string
  alt?: string
}

interface PressLogosProps {
  logos: PressLogo[]
  speed?: number
  direction?: 'left' | 'right'
  pauseOnHover?: boolean
  className?: string
  logoClassName?: string
}

const PressLogos = ({
  logos,
  speed = 50,
  direction = 'left',
  pauseOnHover = true,
  className = '',
  logoClassName = '',
}: PressLogosProps) => {
  // Duplicate logos for seamless infinite scroll
  const duplicatedLogos = [...logos, ...logos]

  return (
    <div className={`overflow-hidden py-8 ${className}`}>
      <motion.div
        className="flex gap-12 items-center"
        animate={{
          x: direction === 'left' ? [0, -50 * logos.length + '%'] : [0, 50 * logos.length + '%'],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: speed,
            ease: 'linear',
          },
        }}
        style={{
          width: 'max-content',
        }}
      >
        {duplicatedLogos.map((logo, index) => (
          <motion.div
            key={`${logo.id}-${index}`}
            className={`flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity ${logoClassName}`}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            {logo.url ? (
              <a
                href={logo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative h-8 md:h-12 w-24 md:w-32"
              >
                <Image
                  src={logo.logo}
                  alt={logo.alt || logo.name}
                  fill
                  sizes="128px"
                  className="object-contain filter brightness-0 invert hover:brightness-100 hover:invert-0 transition-all"
                  style={{
                    filter: 'brightness(0) invert(1)',
                  }}
                  unoptimized
                />
              </a>
            ) : (
              <div className="relative h-8 md:h-12 w-24 md:w-32">
                <Image
                  src={logo.logo}
                  alt={logo.alt || logo.name}
                  fill
                  sizes="128px"
                  className="object-contain filter brightness-0 invert"
                  unoptimized
                />
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default PressLogos

