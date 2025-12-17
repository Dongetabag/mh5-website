/**
 * APEX STUDIO ELITE - Luxury Dark Theme
 * =====================================
 * Premium dark theme with gold accents
 *
 * Perfect for: Athletes, luxury brands, nightlife, exclusive events
 * Mood: Sophisticated, premium, exclusive, powerful
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

export const luxuryDarkTheme: ThemeTokens = {
  colors: {
    // Brand colors
    primary: '#D4AF37',      // Championship Gold
    secondary: '#00D4FF',    // Electric Blue
    accent: '#FF4444',       // Danger/Urgency Red

    // Background system
    background: {
      primary: '#0A0A0A',    // Midnight - deepest black
      secondary: '#1A1A1A',  // Smoke - elevated surfaces
      tertiary: '#2A2A2A',   // Elevated - cards, modals
      elevated: '#333333',   // Highest elevation
      overlay: 'rgba(0, 0, 0, 0.8)',
    },

    // Text system
    text: {
      primary: '#F5F5F5',    // Off-white
      secondary: 'rgba(245, 245, 245, 0.7)',
      muted: 'rgba(245, 245, 245, 0.4)',
      inverse: '#0A0A0A',
      accent: '#D4AF37',
    },

    // Border system
    border: {
      default: 'rgba(255, 255, 255, 0.1)',
      subtle: 'rgba(255, 255, 255, 0.05)',
      strong: 'rgba(255, 255, 255, 0.2)',
      focus: '#D4AF37',
    },

    // Semantic colors
    semantic: {
      success: '#22C55E',
      warning: '#F59E0B',
      error: '#EF4444',
      info: '#3B82F6',
    },

    // Gradient definitions
    gradients: {
      primary: createGradient(['#D4AF37', '#B8962E'], 'to right'),
      secondary: createGradient(['#00D4FF', '#0099CC'], 'to right'),
      hero: createGradient(['#0A0A0A', '#1A1A1A', '#0A0A0A'], 'to bottom right'),
      cta: createGradient(['#D4AF37', '#F5D76E', '#D4AF37'], '135deg'),
    },
  },

  typography: {
    ...baseTypography,
    fontFamily: {
      ...baseTypography.fontFamily,
      heading: '"Inter", "Helvetica Neue", sans-serif',
      body: '"Inter", "Helvetica Neue", sans-serif',
      accent: '"Space Grotesk", "Helvetica Neue", sans-serif',
    },
  },

  spacing: baseSpacing,
  animation: baseAnimation,

  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.5)',
    md: '0 4px 6px rgba(0, 0, 0, 0.5)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.5)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.5)',
    glow: `0 0 20px ${hexToRgba('#D4AF37', 0.3)}, 0 0 40px ${hexToRgba('#D4AF37', 0.1)}`,
    inner: 'inset 0 2px 4px rgba(0, 0, 0, 0.5)',
  },

  borderRadius: baseBorderRadius,
}

// CSS Custom Properties for this theme
export const luxuryDarkCSSVars = {
  // Colors
  '--color-primary': luxuryDarkTheme.colors.primary,
  '--color-secondary': luxuryDarkTheme.colors.secondary,
  '--color-accent': luxuryDarkTheme.colors.accent,

  '--color-bg-primary': luxuryDarkTheme.colors.background.primary,
  '--color-bg-secondary': luxuryDarkTheme.colors.background.secondary,
  '--color-bg-tertiary': luxuryDarkTheme.colors.background.tertiary,
  '--color-bg-elevated': luxuryDarkTheme.colors.background.elevated,
  '--color-bg-overlay': luxuryDarkTheme.colors.background.overlay,

  '--color-text-primary': luxuryDarkTheme.colors.text.primary,
  '--color-text-secondary': luxuryDarkTheme.colors.text.secondary,
  '--color-text-muted': luxuryDarkTheme.colors.text.muted,
  '--color-text-inverse': luxuryDarkTheme.colors.text.inverse,
  '--color-text-accent': luxuryDarkTheme.colors.text.accent,

  '--color-border-default': luxuryDarkTheme.colors.border.default,
  '--color-border-subtle': luxuryDarkTheme.colors.border.subtle,
  '--color-border-strong': luxuryDarkTheme.colors.border.strong,
  '--color-border-focus': luxuryDarkTheme.colors.border.focus,

  '--color-success': luxuryDarkTheme.colors.semantic.success,
  '--color-warning': luxuryDarkTheme.colors.semantic.warning,
  '--color-error': luxuryDarkTheme.colors.semantic.error,
  '--color-info': luxuryDarkTheme.colors.semantic.info,

  '--gradient-primary': luxuryDarkTheme.colors.gradients.primary,
  '--gradient-secondary': luxuryDarkTheme.colors.gradients.secondary,
  '--gradient-hero': luxuryDarkTheme.colors.gradients.hero,
  '--gradient-cta': luxuryDarkTheme.colors.gradients.cta,

  // Shadows
  '--shadow-sm': luxuryDarkTheme.shadows.sm,
  '--shadow-md': luxuryDarkTheme.shadows.md,
  '--shadow-lg': luxuryDarkTheme.shadows.lg,
  '--shadow-xl': luxuryDarkTheme.shadows.xl,
  '--shadow-glow': luxuryDarkTheme.shadows.glow,
  '--shadow-inner': luxuryDarkTheme.shadows.inner,
}

export default luxuryDarkTheme
