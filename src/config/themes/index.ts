/**
 * APEX STUDIO ELITE - Theme System Index
 * ======================================
 * Central export for all theme variants
 */

import { ThemeTokens } from './tokens'
import { luxuryDarkTheme, luxuryDarkCSSVars } from './luxury-dark'
import { cleanLightTheme, cleanLightCSSVars } from './clean-light'
import { boldContrastTheme, boldContrastCSSVars } from './bold-contrast'

// Re-export tokens
export * from './tokens'

// Re-export themes
export { luxuryDarkTheme, luxuryDarkCSSVars } from './luxury-dark'
export { cleanLightTheme, cleanLightCSSVars } from './clean-light'
export { boldContrastTheme, boldContrastCSSVars } from './bold-contrast'

// Theme variant type
export type ThemeVariant = 'luxury-dark' | 'clean-light' | 'bold-contrast' | 'custom'

// Theme registry
export const themes: Record<Exclude<ThemeVariant, 'custom'>, ThemeTokens> = {
  'luxury-dark': luxuryDarkTheme,
  'clean-light': cleanLightTheme,
  'bold-contrast': boldContrastTheme,
}

// CSS vars registry
export const themeCSSVars: Record<Exclude<ThemeVariant, 'custom'>, Record<string, string>> = {
  'luxury-dark': luxuryDarkCSSVars,
  'clean-light': cleanLightCSSVars,
  'bold-contrast': boldContrastCSSVars,
}

// ═══════════════════════════════════════════════════════════════════════════════
// THEME UTILITIES
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Get a theme by variant name
 */
export function getTheme(variant: ThemeVariant): ThemeTokens {
  if (variant === 'custom') {
    throw new Error('Custom themes must be provided directly')
  }
  return themes[variant]
}

/**
 * Get CSS variables for a theme
 */
export function getThemeCSSVars(variant: ThemeVariant): Record<string, string> {
  if (variant === 'custom') {
    throw new Error('Custom themes must provide their own CSS variables')
  }
  return themeCSSVars[variant]
}

/**
 * Apply theme CSS variables to an element
 */
export function applyTheme(element: HTMLElement, variant: ThemeVariant): void {
  const cssVars = getThemeCSSVars(variant)
  Object.entries(cssVars).forEach(([key, value]) => {
    element.style.setProperty(key, value)
  })
}

/**
 * Generate CSS string from theme CSS variables
 */
export function generateThemeCSS(variant: ThemeVariant, selector: string = ':root'): string {
  const cssVars = getThemeCSSVars(variant)
  const declarations = Object.entries(cssVars)
    .map(([key, value]) => `  ${key}: ${value};`)
    .join('\n')

  return `${selector} {\n${declarations}\n}`
}

/**
 * Create a custom theme by merging with a base theme
 */
export function createCustomTheme(
  baseVariant: Exclude<ThemeVariant, 'custom'>,
  overrides: Partial<ThemeTokens>
): ThemeTokens {
  const base = getTheme(baseVariant)

  return {
    colors: {
      ...base.colors,
      ...overrides.colors,
      background: {
        ...base.colors.background,
        ...overrides.colors?.background,
      },
      text: {
        ...base.colors.text,
        ...overrides.colors?.text,
      },
      border: {
        ...base.colors.border,
        ...overrides.colors?.border,
      },
      semantic: {
        ...base.colors.semantic,
        ...overrides.colors?.semantic,
      },
      gradients: {
        ...base.colors.gradients,
        ...overrides.colors?.gradients,
      },
    },
    typography: {
      ...base.typography,
      ...overrides.typography,
      fontFamily: {
        ...base.typography.fontFamily,
        ...overrides.typography?.fontFamily,
      },
    },
    spacing: {
      ...base.spacing,
      ...overrides.spacing,
    },
    animation: {
      ...base.animation,
      ...overrides.animation,
    },
    shadows: {
      ...base.shadows,
      ...overrides.shadows,
    },
    borderRadius: {
      ...base.borderRadius,
      ...overrides.borderRadius,
    },
  }
}

/**
 * Theme metadata for UI selectors
 */
export const themeMetadata: Record<Exclude<ThemeVariant, 'custom'>, {
  name: string
  description: string
  preview: {
    primary: string
    secondary: string
    background: string
  }
}> = {
  'luxury-dark': {
    name: 'Luxury Dark',
    description: 'Premium dark theme with gold accents. Perfect for athletes, luxury brands, and exclusive events.',
    preview: {
      primary: '#D4AF37',
      secondary: '#00D4FF',
      background: '#0A0A0A',
    },
  },
  'clean-light': {
    name: 'Clean Light',
    description: 'Minimalist light theme with subtle accents. Perfect for lifestyle influencers and wellness brands.',
    preview: {
      primary: '#1A1A1A',
      secondary: '#6366F1',
      background: '#FFFFFF',
    },
  },
  'bold-contrast': {
    name: 'Bold Contrast',
    description: 'High-contrast theme with vibrant accents. Perfect for musicians, artists, and bold personalities.',
    preview: {
      primary: '#FF3366',
      secondary: '#00FF88',
      background: '#000000',
    },
  },
}
