'use client'

import { useEffect, useRef } from 'react'

/**
 * STARFIELD COMPONENT
 * Creates a subtle animated starfield background with tiny sparkles
 */
export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Star properties
    const stars: Array<{
      x: number
      y: number
      size: number
      baseOpacity: number
      opacity: number
      phase: number
      pulseLength: number
      twinkleSpeed: number
    }> = []

    // Create stars - very subtle, sparse sparkles (70% less)
    const baseDensity = (canvas.width * canvas.height) / 3000
    const starCount = Math.floor(baseDensity * 0.3) // 70% less stars (keep only 30%)
    for (let i = 0; i < starCount; i++) {
      const baseOpacity = Math.random() * 0.12 + 0.04 // Base opacity before 80% reduction
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: (Math.random() * 0.4 + 0.15) * 1.5, // Small glitter specks: 0.225-0.825px (50% larger)
        baseOpacity: baseOpacity * 0.2, // 80% less brightness
        opacity: baseOpacity * 0.2, // Initial opacity
        phase: Math.random() * Math.PI * 2, // Random starting phase for irregular pulses
        pulseLength: Math.random() * 4000 + 3000, // Longer pulses: 3-7 seconds
        twinkleSpeed: Math.random() * 0.003 + 0.001, // Slower, more irregular
      })
    }

    // Animation loop
    let animationFrame: number
    const animate = () => {
      ctx.fillStyle = 'transparent'
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      stars.forEach((star) => {
        // Longer, irregular pulse animation with small flashes
        const time = Date.now()
        const pulseProgress = ((time / star.pulseLength) + (star.phase / (Math.PI * 2))) % 1
        
        // Irregular pulse using a combination of sine waves for more natural variation
        const pulse1 = Math.sin(pulseProgress * Math.PI * 2)
        const pulse2 = Math.sin(pulseProgress * Math.PI * 5) * 0.4 // Faster, smaller wave for irregularity
        const pulse3 = Math.sin(pulseProgress * Math.PI * 0.7) * 0.2 // Slow wave for longer variation
        const combinedPulse = (pulse1 + pulse2 + pulse3) / 1.6
        
        // Glitter effect - sharper flashes with more pronounced peaks
        const minOpacity = star.baseOpacity * 0.3
        const maxOpacity = star.baseOpacity * 3.5 // Sharper glitter flashes
        // Use exponential curve for more dramatic glitter peaks
        const glitterIntensity = Math.pow((combinedPulse + 1) / 2, 0.7)
        star.opacity = minOpacity + glitterIntensity * (maxOpacity - minOpacity)
        star.opacity = Math.max(0.008, Math.min(0.1, star.opacity)) // Slightly higher cap for visible glitter

        // Draw glitter sparkle with subtle glow
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fill()
        
        // Add subtle glow for glitter effect on brighter flashes
        if (star.opacity > 0.03) {
          ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * 0.3})`
          ctx.beginPath()
          ctx.arc(star.x, star.y, star.size * 1.5, 0, Math.PI * 2)
          ctx.fill()
        }
      })

      animationFrame = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}
