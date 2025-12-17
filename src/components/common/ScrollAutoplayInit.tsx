'use client'

import { useEffect } from 'react'
import { setupScrollAutoplay } from '@/utils/scrollAutoplay'

/**
 * SCROLL AUTOPLAY INITIALIZER
 * ===========================
 * Initializes scroll-based autoplay for videos on mount
 */
export default function ScrollAutoplayInit() {
  useEffect(() => {
    setupScrollAutoplay()
  }, [])

  return null
}



