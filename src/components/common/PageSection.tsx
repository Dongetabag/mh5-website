'use client'

import { ReactNode } from 'react'

interface PageSectionProps {
  children: ReactNode
  className?: string
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  background?: 'midnight' | 'smoke' | 'transparent'
  container?: boolean
}

/**
 * PAGE SECTION WRAPPER
 * ====================
 * Consistent section spacing and padding across all pages
 * Mobile-first responsive design
 */
export default function PageSection({
  children,
  className = '',
  padding = 'lg',
  background = 'midnight',
  container = true,
}: PageSectionProps) {
  const paddingClasses = {
    none: '',
    sm: 'py-8 md:py-12',
    md: 'py-12 md:py-16',
    lg: 'py-16 md:py-24 lg:py-32',
    xl: 'py-20 md:py-28 lg:py-40',
    '2xl': 'py-24 md:py-32 lg:py-48',
  }

  const backgroundClasses = {
    midnight: 'bg-midnight',
    smoke: 'bg-smoke',
    transparent: 'bg-transparent',
  }

  const containerClass = container
    ? 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12'
    : ''

  return (
    <section
      className={`${paddingClasses[padding]} ${backgroundClasses[background]} ${className}`}
    >
      {container ? (
        <div className={containerClass}>{children}</div>
      ) : (
        children
      )}
    </section>
  )
}



