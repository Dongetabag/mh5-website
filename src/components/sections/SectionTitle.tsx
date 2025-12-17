'use client'

import { ReactNode } from 'react'

interface SectionTitleProps {
  children: ReactNode
  subtitle?: ReactNode
  align?: 'left' | 'center' | 'right'
  className?: string
}

/**
 * SECTION TITLE WITH BORDER
 * =========================
 * Styled title with border decoration and optional subtitle overlay
 */
export default function SectionTitle({
  children,
  subtitle,
  align = 'center',
  className = '',
}: SectionTitleProps) {
  const alignClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  }

  return (
    <div className={`flex flex-col ${alignClasses[align]} ${className}`}>
      {/* Main Title with Border */}
      <div className="relative inline-block">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-normal text-offwhite mb-4 md:mb-6">
          {children}
        </h2>
        
        {/* Bottom Border */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ice to-transparent opacity-50" />
        
        {/* Corner Accents */}
        <div className="absolute -top-2 -left-2 w-3 h-3 border-t-2 border-l-2 border-ice opacity-30" />
        <div className="absolute -top-2 -right-2 w-3 h-3 border-t-2 border-r-2 border-ice opacity-30" />
        <div className="absolute -bottom-2 -left-2 w-3 h-3 border-b-2 border-l-2 border-ice opacity-30" />
        <div className="absolute -bottom-2 -right-2 w-3 h-3 border-b-2 border-r-2 border-ice opacity-30" />
      </div>

      {/* Subtitle Overlay */}
      {subtitle && (
        <div className="relative mt-4 md:mt-6 px-6 py-2 bg-smoke/60 backdrop-blur-sm border border-ice/20 rounded-lg inline-block">
          <p className="text-sm md:text-base text-offwhite/80 font-body">
            {subtitle}
          </p>
        </div>
      )}
    </div>
  )
}

