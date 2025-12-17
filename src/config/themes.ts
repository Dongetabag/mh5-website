/**
 * THEME SYSTEM - Color Tokens & Theme Variants
 * ============================================
 * Defines theme variants and their CSS custom property values
 */

export type ThemeVariant = 'luxury-dark' | 'clean-light' | 'bold-contrast' | 'custom'

export interface ThemeTokens {
  primary: string
  secondary: string
  accent: string
  background: {
    primary: string
    secondary: string
    tertiary: string
  }
  text: {
    primary: string
    secondary: string
    muted: string
    inverse: string
  }
  border: {
    default: string
    strong: string
    hover: string
  }
}

export const themes: Record<Exclude<ThemeVariant, 'custom'>, ThemeTokens> = {
  'luxury-dark': {
    primary: '#7DF9FF',
    secondary: '#9DFBFF',
    accent: '#BDFCFF',
    background: {
      primary: '#0A0A0A',
      secondary: '#111111',
      tertiary: '#1A1A1A',
    },
    text: {
      primary: '#F5F5F5',
      secondary: '#B0B0B0',
      muted: '#666666',
      inverse: '#0A0A0A',
    },
    border: {
      default: '#2A2A2A',
      strong: '#444444',
      hover: '#7DF9FF',
    },
  },
  'clean-light': {
    primary: '#2563EB',
    secondary: '#F8FAFC',
    accent: '#06B6D4',
    background: {
      primary: '#FFFFFF',
      secondary: '#F8FAFC',
      tertiary: '#F1F5F9',
    },
    text: {
      primary: '#0F172A',
      secondary: '#475569',
      muted: '#94A3B8',
      inverse: '#FFFFFF',
    },
    border: {
      default: '#E2E8F0',
      strong: '#CBD5E1',
      hover: '#2563EB',
    },
  },
  'bold-contrast': {
    primary: '#FF3366',
    secondary: '#0D0D0D',
    accent: '#00FF88',
    background: {
      primary: '#000000',
      secondary: '#0D0D0D',
      tertiary: '#1A1A1A',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#CCCCCC',
      muted: '#888888',
      inverse: '#000000',
    },
    border: {
      default: '#333333',
      strong: '#555555',
      hover: '#FF3366',
    },
  },
}

/**
 * Get theme tokens for a given variant
 */
export function getTheme(variant: ThemeVariant): ThemeTokens {
  if (variant === 'custom') {
    // Return luxury-dark as default for custom
    return themes['luxury-dark']
  }
  return themes[variant]
}

/**
 * Apply theme to document root as CSS custom properties
 */
export function applyTheme(theme: ThemeTokens): void {
  if (typeof document === 'undefined') return

  const root = document.documentElement

  root.style.setProperty('--color-primary', theme.primary)
  root.style.setProperty('--color-secondary', theme.secondary)
  root.style.setProperty('--color-accent', theme.accent)
  root.style.setProperty('--color-bg-primary', theme.background.primary)
  root.style.setProperty('--color-bg-secondary', theme.background.secondary)
  root.style.setProperty('--color-bg-tertiary', theme.background.tertiary)
  root.style.setProperty('--color-text-primary', theme.text.primary)
  root.style.setProperty('--color-text-secondary', theme.text.secondary)
  root.style.setProperty('--color-text-muted', theme.text.muted)
  root.style.setProperty('--color-text-inverse', theme.text.inverse)
  root.style.setProperty('--color-border-default', theme.border.default)
  root.style.setProperty('--color-border-strong', theme.border.strong)
  root.style.setProperty('--color-border-hover', theme.border.hover)
}
