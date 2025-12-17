/**
 * APEX STUDIO ELITE - Bold Contrast Theme
 * =======================================
 * High-contrast theme with vibrant accents
 *
 * Perfect for: Musicians, artists, streetwear brands, bold personalities
 * Mood: Edgy, bold, energetic, rebellious
 */

import {
  ThemeTokens,
  baseTypography,
  baseSpacing,
  baseAnimation,
  baseBorderRadius,
  hexToRgba,
  createGradient,
} from './tokens'

export const boldContrastTheme: ThemeTokens = {
  colors: {
    // Brand colors
    primary: '#FF3366',      // Hot Pink/Red
    secondary: '#00FF88',    // Neon Green
    accent: '#FFD700',       // Gold

    // Background system
    background: {
      primary: '#000000',    // Pure black
      secondary: '#111111',  // Near black
      tertiary: '#1C1C1C',   // Dark gray
      elevated: '#222222',   // Elevated
      overlay: 'rgba(0, 0, 0, 0.9)',
    },

    // Text system
    text: {
      primary: '#FFFFFF',    // Pure white
      secondary: 'rgba(255, 255, 255, 0.8)',
      muted: 'rgba(255, 255, 255, 0.5)',
      inverse: '#000000',
      accent: '#FF3366',
    },

    // Border system
    border: {
      default: 'rgba(255, 255, 255, 0.15)',
      subtle: 'rgba(255, 255, 255, 0.08)',
      strong: 'rgba(255, 255, 255, 0.3)',
      focus: '#FF3366',
    },

    // Semantic colors
    semantic: {
      success: '#00FF88',
      warning: '#FFD700',
      error: '#FF3366',
      info: '#00D4FF',
    },

    // Gradient definitions
    gradients: {
      primary: createGradient(['#FF3366', '#FF6B6B'], 'to right'),
      secondary: createGradient(['#00FF88', '#00D4FF'], 'to right'),
      hero: createGradient(['#000000', '#111111', '#000000'], '135deg'),
      cta: createGradient(['#FF3366', '#FF6B6B', '#FF3366'], '135deg'),
    },
  },

  typography: {
    ...baseTypography,
    fontFamily: {
      ...baseTypography.fontFamily,
      heading: '"Bebas Neue", "Oswald", sans-serif',
      body: '"Inter", "Helvetica Neue", sans-serif',
      accent: '"Space Grotesk", "Helvetica Neue", sans-serif',
    },
  },

  spacing: baseSpacing,
  animation: baseAnimation,

  shadows: {
    sm: '0 1px 2px rgba(255, 51, 102, 0.1)',
    md: '0 4px 6px rgba(255, 51, 102, 0.15)',
    lg: '0 10px 15px rgba(255, 51, 102, 0.2)',
    xl: '0 20px 25px rgba(255, 51, 102, 0.25)',
    glow: `0 0 30px ${hexToRgba('#FF3366', 0.5)}, 0 0 60px ${hexToRgba('#FF3366', 0.3)}`,
    inner: 'inset 0 2px 4px rgba(0, 0, 0, 0.8)',
  },

  borderRadius: {
    ...baseBorderRadius,
    // More angular for bold theme
    sm: '0.125rem',
    md: '0.25rem',
    lg: '0.375rem',
    xl: '0.5rem',
    '2xl': '0.75rem',
  },
}

// CSS Custom Properties for this theme
export const boldContrastCSSVars = {
  // Colors
  '--color-primary': boldContrastTheme.colors.primary,
  '--color-secondary': boldContrastTheme.colors.secondary,
  '--color-accent': boldContrastTheme.colors.accent,

  '--color-bg-primary': boldContrastTheme.colors.background.primary,
  '--color-bg-secondary': boldContrastTheme.colors.background.secondary,
  '--color-bg-tertiary': boldContrastTheme.colors.background.tertiary,
  '--color-bg-elevated': boldContrastTheme.colors.background.elevated,
  '--color-bg-overlay': boldContrastTheme.colors.background.overlay,

  '--color-text-primary': boldContrastTheme.colors.text.primary,
  '--color-text-secondary': boldContrastTheme.colors.text.secondary,
  '--color-text-muted': boldContrastTheme.colors.text.muted,
  '--color-text-inverse': boldContrastTheme.colors.text.inverse,
  '--color-text-accent': boldContrastTheme.colors.text.accent,

  '--color-border-default': boldContrastTheme.colors.border.default,
  '--color-border-subtle': boldContrastTheme.colors.border.subtle,
  '--color-border-strong': boldContrastTheme.colors.border.strong,
  '--color-border-focus': boldContrastTheme.colors.border.focus,

  '--color-success': boldContrastTheme.colors.semantic.success,
  '--color-warning': boldContrastTheme.colors.semantic.warning,
  '--color-error': boldContrastTheme.colors.semantic.error,
  '--color-info': boldContrastTheme.colors.semantic.info,

  '--gradient-primary': boldContrastTheme.colors.gradients.primary,
  '--gradient-secondary': boldContrastTheme.colors.gradients.secondary,
  '--gradient-hero': boldContrastTheme.colors.gradients.hero,
  '--gradient-cta': boldContrastTheme.colors.gradients.cta,

  // Shadows
  '--shadow-sm': boldContrastTheme.shadows.sm,
  '--shadow-md': boldContrastTheme.shadows.md,
  '--shadow-lg': boldContrastTheme.shadows.lg,
  '--shadow-xl': boldContrastTheme.shadows.xl,
  '--shadow-glow': boldContrastTheme.shadows.glow,
  '--shadow-inner': boldContrastTheme.shadows.inner,
}

export default boldContrastTheme
