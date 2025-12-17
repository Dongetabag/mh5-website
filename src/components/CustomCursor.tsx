'use client'

import { useEffect, useState } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false)
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  const springConfig = { damping: 20, stiffness: 400, mass: 0.1 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)

      const target = e.target as HTMLElement
      const clickable = target.closest('button') ||
                        target.closest('a') ||
                        target.closest('[data-hover="true"]')
      setIsHovering(!!clickable)
    }

    window.addEventListener('mousemove', updateMousePosition, { passive: true })
    return () => window.removeEventListener('mousemove', updateMousePosition)
  }, [mouseX, mouseY])

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-exclusion hidden md:flex"
      style={{ x, y, translateX: '-50%', translateY: '-50%' }}
    >
      <motion.div
        className="relative flex items-center justify-center border-2 border-[var(--color-primary)]"
        animate={{
          width: isHovering ? 60 : 12,
          height: isHovering ? 60 : 12,
          backgroundColor: isHovering ? 'rgba(125, 249, 255, 0.1)' : 'transparent',
          rotate: isHovering ? 45 : 0
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {/* Crosshair lines when not hovering */}
        {!isHovering && (
           <>
             <div className="absolute w-[2px] h-[150%] bg-[var(--color-primary)]" />
             <div className="absolute h-[2px] w-[150%] bg-[var(--color-primary)]" />
           </>
        )}
      </motion.div>
    </motion.div>
  )
}

export default CustomCursor
