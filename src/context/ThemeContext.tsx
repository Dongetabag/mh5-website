'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { siteConfig } from '@/config/site.config'
import { getTheme, applyTheme, ThemeVariant, themes } from '@/config/themes'

/**
 * THEME CONTEXT - Runtime Theme Management
 * =======================================
 * Provides theme state and utilities throughout the app
 */

interface ThemeContextType {
  currentTheme: ThemeVariant
  setTheme: (theme: ThemeVariant) => void
  toggleTheme: () => void
  availableThemes: ThemeVariant[]
  isReducedMotion: boolean
  setReducedMotion: (value: boolean) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

interface ThemeProviderProps {
  children: ReactNode
  defaultTheme?: ThemeVariant
}

export function ThemeProvider({ children, defaultTheme }: ThemeProviderProps) {
  const [currentTheme, setCurrentTheme] = useState<ThemeVariant>(
    defaultTheme || (siteConfig.theme.variant as ThemeVariant) || 'luxury-dark'
  )
  const [isReducedMotion, setIsReducedMotion] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Apply theme on mount and changes
  useEffect(() => {
    setMounted(true)

    // Check for saved preference (only on client)
    if (typeof window !== 'undefined') {
      try {
        const savedTheme = localStorage.getItem('theme') as ThemeVariant | null
        if (savedTheme && savedTheme !== 'custom' && savedTheme in themes) {
          setCurrentTheme(savedTheme)
        }

        // Check for reduced motion preference
        const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
        setIsReducedMotion(motionQuery.matches)

        const handleMotionChange = (e: MediaQueryListEvent) => {
          setIsReducedMotion(e.matches)
        }

        motionQuery.addEventListener('change', handleMotionChange)
        return () => motionQuery.removeEventListener('change', handleMotionChange)
      } catch (error) {
        console.error('Theme initialization error:', error)
      }
    }
  }, [])

  // Apply theme CSS variables when theme changes
  useEffect(() => {
    if (!mounted || typeof window === 'undefined') return

    try {
      const theme = getTheme(currentTheme)
      applyTheme(theme)
      localStorage.setItem('theme', currentTheme)

      // Also set data attribute for potential CSS hooks
      document.documentElement.setAttribute('data-theme', currentTheme)
    } catch (error) {
      console.error('Theme application error:', error)
    }
  }, [currentTheme, mounted])

  // Apply reduced motion class
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    if (isReducedMotion) {
      document.documentElement.classList.add('reduce-motion')
    } else {
      document.documentElement.classList.remove('reduce-motion')
    }
  }, [isReducedMotion])

  const setTheme = (theme: ThemeVariant) => {
    if (theme === 'custom' || theme in themes) {
      setCurrentTheme(theme)
    }
  }

  const toggleTheme = () => {
    const themeList = Object.keys(themes) as ThemeVariant[]
    const currentIndex = themeList.indexOf(currentTheme)
    const nextIndex = (currentIndex + 1) % themeList.length
    setCurrentTheme(themeList[nextIndex])
  }

  const value: ThemeContextType = {
    currentTheme,
    setTheme,
    toggleTheme,
    availableThemes: Object.keys(themes) as ThemeVariant[],
    isReducedMotion,
    setReducedMotion: setIsReducedMotion,
  }

  // Prevent flash of wrong theme
  if (!mounted) {
    return null
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

// Hook for animation settings
export function useAnimationSettings() {
  const { isReducedMotion } = useTheme()

  return {
    isReducedMotion,
    shouldAnimate: !isReducedMotion && siteConfig.theme.animations?.enabled !== false,
    shouldUseParticles:
      !isReducedMotion && siteConfig.theme.animations?.particleEffects !== false,
    shouldUseParallax:
      !isReducedMotion && siteConfig.theme.animations?.parallaxEffects !== false,
    transitionDuration: isReducedMotion ? 0 : undefined,
  }
}
