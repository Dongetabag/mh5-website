'use client'

import { motion } from 'framer-motion'

// Gradient definitions for SVG icons
export const GradientDefs = () => (
  <svg width="0" height="0" className="absolute">
    <defs>
      {/* Primary neon cyan gradient */}
      <linearGradient id="icon-gradient-primary" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#7DF9FF" />
        <stop offset="50%" stopColor="#9DFBFF" />
        <stop offset="100%" stopColor="#BDFCFF" />
      </linearGradient>

      {/* Gloss overlay gradient */}
      <linearGradient id="icon-gloss" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="white" stopOpacity="0.4" />
        <stop offset="50%" stopColor="white" stopOpacity="0.1" />
        <stop offset="100%" stopColor="white" stopOpacity="0" />
      </linearGradient>

      {/* Diamond shimmer gradient */}
      <linearGradient id="icon-gradient-diamond" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#BDFCFF" />
        <stop offset="30%" stopColor="#FFFFFF" />
        <stop offset="70%" stopColor="#9DFBFF" />
        <stop offset="100%" stopColor="#7DF9FF" />
      </linearGradient>

      {/* Gold/warm gradient */}
      <linearGradient id="icon-gradient-gold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFD700" />
        <stop offset="50%" stopColor="#FFA500" />
        <stop offset="100%" stopColor="#FF8C00" />
      </linearGradient>

      {/* Purple gradient */}
      <linearGradient id="icon-gradient-purple" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#C084FC" />
        <stop offset="100%" stopColor="#8B5CF6" />
      </linearGradient>

      {/* Success green gradient */}
      <linearGradient id="icon-gradient-green" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4ADE80" />
        <stop offset="100%" stopColor="#22C55E" />
      </linearGradient>

      {/* Red/danger gradient */}
      <linearGradient id="icon-gradient-red" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F87171" />
        <stop offset="100%" stopColor="#EF4444" />
      </linearGradient>
    </defs>
  </svg>
)

interface GlossIconProps {
  icon: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'primary' | 'diamond' | 'gold' | 'purple' | 'green' | 'red'
  className?: string
  animate?: boolean
}

// Apple-style icon sizing (smaller, refined proportions)
const sizeClasses = {
  sm: 'w-6 h-6',     // 24px - small inline icons
  md: 'w-8 h-8',     // 32px - standard icons
  lg: 'w-10 h-10',   // 40px - featured icons
  xl: 'w-12 h-12',   // 48px - hero icons
}

const iconSizeClasses = {
  sm: 'w-3 h-3',     // 12px icon inside 24px container
  md: 'w-4 h-4',     // 16px icon inside 32px container
  lg: 'w-5 h-5',     // 20px icon inside 40px container
  xl: 'w-6 h-6',     // 24px icon inside 48px container
}

export function GlossIcon({
  icon,
  size = 'md',
  variant = 'primary',
  className = '',
  animate = false
}: GlossIconProps) {
  const baseClassName = `relative ${sizeClasses[size]} rounded-xl overflow-hidden ${className}`
  const baseStyle = {
    background: `linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 50%, var(--color-accent) 100%)`,
  }

  const content = (
    <>
      {/* Gloss overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%)',
        }}
      />

      {/* Icon container */}
      <div className={`absolute inset-0 flex items-center justify-center text-black ${iconSizeClasses[size]}`}>
        {icon}
      </div>
    </>
  )

  if (animate) {
    return (
      <motion.div
        className={baseClassName}
        style={baseStyle}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        transition={{ type: 'spring' as const, stiffness: 300 }}
      >
        {content}
      </motion.div>
    )
  }

  return (
    <div className={baseClassName} style={baseStyle}>
      {content}
    </div>
  )
}

// Pre-built icon components with gradient fills
export const icons = {
  // Sports & Basketball
  basketball: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.94-.49-7-3.86-7-7.93s3.05-7.44 7-7.93v15.86zm2-15.86c1.03.13 2 .45 2.87.93H13v-.93zM13 7h5.24c.25.31.48.65.68 1H13V7zm0 3h6.74c.08.33.15.66.19 1H13v-1zm0 3h6.93c-.04.34-.11.67-.19 1H13v-1zm0 3h5.92c-.2.35-.43.69-.68 1H13v-1zm0 3h2.87c-.87.48-1.84.8-2.87.93V19z"/>
    </svg>
  ),

  star: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
    </svg>
  ),

  trophy: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H8v2h8v-2h-3v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z"/>
    </svg>
  ),

  fire: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 23c-4.97 0-9-4.03-9-9 0-3.53 2.04-6.58 5-8.03V4c0-.83.67-1.5 1.5-1.5S11 3.17 11 4v2.05C11.33 6.02 11.66 6 12 6s.67.02 1 .05V4c0-.83.67-1.5 1.5-1.5S16 3.17 16 4v1.97c2.96 1.45 5 4.5 5 8.03 0 4.97-4.03 9-9 9zm0-16c-3.86 0-7 3.14-7 7s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7z"/>
      <circle cx="12" cy="14" r="3"/>
    </svg>
  ),

  target: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
    </svg>
  ),

  globe: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
    </svg>
  ),

  // Media & Content
  video: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
    </svg>
  ),

  camera: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="3.2"/>
      <path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/>
    </svg>
  ),

  image: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
    </svg>
  ),

  mic: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/>
    </svg>
  ),

  // Business & Partnership
  handshake: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.22 19.85c-.18.18-.5.21-.71 0L3 11.41V7.59l7.22 7.22c.39.39 1.02.39 1.41 0l5.66-5.66c.39-.39.39-1.02 0-1.41L12 2.41 9.17 5.24 2.59 5.24V3.83L9.17 3.83 12 1l5.66 5.66c.78.78.78 2.05 0 2.83l-5.44 5.44zM21 11.41l-4.64 4.64-.71-.71 4.64-4.64.71.71zm-7.78 8.44l.71.71-4.64 4.64-.71-.71 4.64-4.64z"/>
    </svg>
  ),

  diamond: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3H5L2 9l10 12L22 9l-3-6zm-7 14.27L5.16 9h13.68L12 17.27z"/>
    </svg>
  ),

  chart: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z"/>
    </svg>
  ),

  users: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
    </svg>
  ),

  building: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>
    </svg>
  ),

  // Communication
  chat: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
    </svg>
  ),

  mail: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
    </svg>
  ),

  phone: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
    </svg>
  ),

  // Location & Navigation
  location: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
  ),

  // Documents & Files
  document: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
    </svg>
  ),

  download: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
    </svg>
  ),

  // UI Elements
  check: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
    </svg>
  ),

  calendar: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z"/>
    </svg>
  ),

  clock: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
    </svg>
  ),

  gift: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z"/>
    </svg>
  ),

  ticket: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 10V6c0-1.11-.9-2-2-2H4c-1.1 0-1.99.89-1.99 2v4c1.1 0 1.99.9 1.99 2s-.89 2-2 2v4c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-4c-1.1 0-2-.9-2-2s.9-2 2-2zm-2-1.46c-1.19.69-2 1.99-2 3.46s.81 2.77 2 3.46V18H4v-2.54c1.19-.69 2-1.99 2-3.46 0-1.48-.8-2.77-1.99-3.46L4 6h16v2.54z"/>
    </svg>
  ),

  crown: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z"/>
    </svg>
  ),

  spark: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 3v18M3 12h18M5.636 5.636l12.728 12.728M18.364 5.636L5.636 18.364" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
    </svg>
  ),

  five: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4 14h-4c-1.1 0-2-.9-2-2v-2c0-1.1.9-2 2-2h2V9H9V7h6v4h-4v2h2c1.1 0 2 .9 2 2v2c0 1.1-.9 2-2 2z"/>
    </svg>
  ),

  seven: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4 14h-2l4-10H9V5h8v2l-4 10z"/>
    </svg>
  ),

  tv: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.1-.9-2-2-2zm0 14H3V5h18v12z"/>
    </svg>
  ),

  rocket: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.5c0 0-4 3.5-4 9.5c0 2.62.72 4.5 1.67 5.85L6 22l3.67-1.33C10.94 21.35 11.56 22 12 22c.44 0 1.06-.65 2.33-1.33L18 22l-3.67-4.15C15.28 16.5 16 14.62 16 12c0-6-4-9.5-4-9.5zm0 11c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
    </svg>
  ),

  flash: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M7 2v11h3v9l7-12h-4l4-8z"/>
    </svg>
  ),

  medal: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C9.24 2 7 4.24 7 7s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3zm-7 8l3-3h8l3 3v4H5v-4zm7-5l-4 4h8l-4-4z"/>
    </svg>
  ),

  megaphone: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 11v2h4v-2h-4zm-2 6.61c.96.71 2.21 1.65 3.2 2.39.4-.53.8-1.07 1.2-1.6-.99-.74-2.24-1.68-3.2-2.4-.4.54-.8 1.08-1.2 1.61zM20.4 5.6c-.4-.53-.8-1.07-1.2-1.6-.99.74-2.24 1.68-3.2 2.4.4.53.8 1.07 1.2 1.6.96-.72 2.21-1.65 3.2-2.4zM4 9c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h1v4h2v-4h1l5 3V6L8 9H4zm5.03 1.71L11 9.53v4.94l-1.97-1.18-.48-.29H4v-2h4.55l.48-.29zM15.5 12c0-1.33-.58-2.53-1.5-3.35v6.69c.92-.81 1.5-2.01 1.5-3.34z"/>
    </svg>
  ),

  play: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z"/>
    </svg>
  ),
}

// Icon wrapper with gradient background
interface IconBoxProps {
  icon: keyof typeof icons
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

// Apple-style border radius mapping
const borderRadiusClasses = {
  sm: 'rounded-md',   // 6px
  md: 'rounded-lg',   // 8px
  lg: 'rounded-xl',   // 12px
  xl: 'rounded-2xl',  // 16px
}

export function IconBox({ icon, size = 'md', className = '' }: IconBoxProps) {
  return (
    <div
      className={`relative ${sizeClasses[size]} ${borderRadiusClasses[size]} overflow-hidden flex items-center justify-center ${className}`}
      style={{
        background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 50%, var(--color-accent) 100%)',
      }}
    >
      {/* Gloss overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.2) 40%, rgba(255,255,255,0) 100%)',
          borderRadius: 'inherit',
        }}
      />

      {/* Icon */}
      <div className={`relative z-10 text-black ${iconSizeClasses[size]}`}>
        {icons[icon]}
      </div>
    </div>
  )
}

export default GlossIcon
