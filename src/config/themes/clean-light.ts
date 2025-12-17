/**
 * APEX STUDIO ELITE - Clean Light Theme
 * =====================================
 * Minimalist light theme with subtle accents
 *
 * Perfect for: Lifestyle influencers, wellness brands, clean aesthetics
 * Mood: Fresh, modern, approachable, professional
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

export const cleanLightTheme: ThemeTokens = {
  colors: {
    // Brand colors
    primary: '#1A1A1A',      // Sophisticated Black
    secondary: '#6366F1',    // Indigo
    accent: '#EC4899',       // Pink

    // Background system
    background: {
      primary: '#FFFFFF',    // Pure white
      secondary: '#F8FAFC',  // Off-white
      tertiary: '#F1F5F9',   // Light gray
      elevated: '#FFFFFF',   // Cards
      overlay: 'rgba(0, 0, 0, 0.5)',
    },

    // Text system
    text: {
      primary: '#0F172A',    // Near black
      secondary: '#475569',  // Slate
      muted: '#94A3B8',      // Light slate
      inverse: '#FFFFFF',
      accent: '#6366F1',
    },

    // Border system
    border: {
      default: '#E2E8F0',
      subtle: '#F1F5F9',
      strong: '#CBD5E1',
      focus: '#6366F1',
    },

    // Semantic colors
    semantic: {
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
      info: '#3B82F6',
    },

    // Gradient definitions
    gradients: {
      primary: createGradient(['#1A1A1A', '#374151'], 'to right'),
      secondary: createGradient(['#6366F1', '#8B5CF6'], 'to right'),
      hero: createGradient(['#F8FAFC', '#FFFFFF', '#F1F5F9'], 'to bottom'),
      cta: createGradient(['#1A1A1A', '#374151', '#1A1A1A'], '135deg'),
    },
  },

  typography: {
    ...baseTypography,
    fontFamily: {
      ...baseTypography.fontFamily,
      heading: '"Plus Jakarta Sans", "Inter", sans-serif',
      body: '"Inter", "Helvetica Neue", sans-serif',
      accent: '"Space Grotesk", "Helvetica Neue", sans-serif',
    },
  },

  spacing: baseSpacing,
  animation: baseAnimation,

  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px rgba(0, 0, 0, 0.05)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.1)',
    glow: `0 0 20px ${hexToRgba('#6366F1', 0.2)}, 0 0 40px ${hexToRgba('#6366F1', 0.1)}`,
    inner: 'inset 0 2px 4px rgba(0, 0, 0, 0.05)',
  },

  borderRadius: baseBorderRadius,
}

// CSS Custom Properties for this theme
export const cleanLightCSSVars = {
  // Colors
  '--color-primary': cleanLightTheme.colors.primary,
  '--color-secondary': cleanLightTheme.colors.secondary,
  '--color-accent': cleanLightTheme.colors.accent,

  '--color-bg-primary': cleanLightTheme.colors.background.primary,
  '--color-bg-secondary': cleanLightTheme.colors.background.secondary,
  '--color-bg-tertiary': cleanLightTheme.colors.background.tertiary,
  '--color-bg-elevated': cleanLightTheme.colors.background.elevated,
  '--color-bg-overlay': cleanLightTheme.colors.background.overlay,

  '--color-text-primary': cleanLightTheme.colors.text.primary,
  '--color-text-secondary': cleanLightTheme.colors.text.secondary,
  '--color-text-muted': cleanLightTheme.colors.text.muted,
  '--color-text-inverse': cleanLightTheme.colors.text.inverse,
  '--color-text-accent': cleanLightTheme.colors.text.accent,

  '--color-border-default': cleanLightTheme.colors.border.default,
  '--color-border-subtle': cleanLightTheme.colors.border.subtle,
  '--color-border-strong': cleanLightTheme.colors.border.strong,
  '--color-border-focus': cleanLightTheme.colors.border.focus,

  '--color-success': cleanLightTheme.colors.semantic.success,
  '--color-warning': cleanLightTheme.colors.semantic.warning,
  '--color-error': cleanLightTheme.colors.semantic.error,
  '--color-info': cleanLightTheme.colors.semantic.info,

  '--gradient-primary': cleanLightTheme.colors.gradients.primary,
  '--gradient-secondary': cleanLightTheme.colors.gradients.secondary,
  '--gradient-hero': cleanLightTheme.colors.gradients.hero,
  '--gradient-cta': cleanLightTheme.colors.gradients.cta,

  // Shadows
  '--shadow-sm': cleanLightTheme.shadows.sm,
  '--shadow-md': cleanLightTheme.shadows.md,
  '--shadow-lg': cleanLightTheme.shadows.lg,
  '--shadow-xl': cleanLightTheme.shadows.xl,
  '--shadow-glow': cleanLightTheme.shadows.glow,
  '--shadow-inner': cleanLightTheme.shadows.inner,
}

export default cleanLightTheme
