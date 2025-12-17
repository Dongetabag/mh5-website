'use client'

import { ReactNode } from 'react'

interface SubtitleOverlayProps {
  children: ReactNode
  variant?: 'default' | 'gradient' | 'glass'
  className?: string
}

/**
 * SUBTITLE OVERLAY
 * ================
 * Custom overlay component for subtitles with various styles
 */
export default function SubtitleOverlay({
  children,
  variant = 'glass',
  className = '',
}: SubtitleOverlayProps) {
  const variants = {
    default: 'bg-smoke/80 border border-white/10',
    gradient: 'bg-gradient-to-r from-ice/10 to-diamond/10 border border-ice/30',
    glass: 'bg-smoke/60 backdrop-blur-md border border-ice/20',
  }

  return (
    <div
      className={`inline-block px-4 md:px-6 py-2 md:py-3 rounded-lg ${variants[variant]} ${className}`}
    >
      <p className="text-xs md:text-sm lg:text-base text-offwhite/90 font-body leading-relaxed">
        {children}
      </p>
    </div>
  )
}

