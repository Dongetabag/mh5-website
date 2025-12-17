/**
 * APEX STUDIO ELITE - Design Token System
 * =======================================
 * Base token definitions for the theme system
 *
 * Tokens are the atomic building blocks of the design system.
 * They're referenced by themes and components for consistency.
 */

// ═══════════════════════════════════════════════════════════════════════════════
// TYPE DEFINITIONS
// ═══════════════════════════════════════════════════════════════════════════════

export interface ColorTokens {
  // Brand colors
  primary: string
  secondary: string
  accent: string

  // Background system
  background: {
    primary: string
    secondary: string
    tertiary: string
    elevated: string
    overlay: string
  }

  // Text system
  text: {
    primary: string
    secondary: string
    muted: string
    inverse: string
    accent: string
  }

  // Border system
  border: {
    default: string
    subtle: string
    strong: string
    focus: string
  }

  // Semantic colors
  semantic: {
    success: string
    warning: string
    error: string
    info: string
  }

  // Gradient definitions
  gradients: {
    primary: string
    secondary: string
    hero: string
    cta: string
  }
}

export interface TypographyTokens {
  fontFamily: {
    heading: string
    body: string
    accent: string
    mono: string
  }
  fontSize: Record<string, string>
  fontWeight: Record<string, number>
  lineHeight: Record<string, string | number>
  letterSpacing: Record<string, string>
}

export interface SpacingTokens {
  base: number
  scale: Record<string, string>
  section: Record<string, string>
  container: Record<string, string>
}

export interface AnimationTokens {
  duration: Record<string, string>
  easing: Record<string, string>
  transition: Record<string, string>
}

export interface ShadowTokens {
  sm: string
  md: string
  lg: string
  xl: string
  glow: string
  inner: string
}

export interface BorderRadiusTokens {
  none: string
  sm: string
  md: string
  lg: string
  xl: string
  '2xl': string
  full: string
}

export interface ThemeTokens {
  colors: ColorTokens
  typography: TypographyTokens
  spacing: SpacingTokens
  animation: AnimationTokens
  shadows: ShadowTokens
  borderRadius: BorderRadiusTokens
}

// ═══════════════════════════════════════════════════════════════════════════════
// BASE TOKENS (Shared across all themes)
// ═══════════════════════════════════════════════════════════════════════════════

export const baseTypography: TypographyTokens = {
  fontFamily: {
    heading: 'var(--font-heading, "Inter", "Helvetica Neue", sans-serif)',
    body: 'var(--font-body, "Inter", "Helvetica Neue", sans-serif)',
    accent: 'var(--font-accent, "Space Grotesk", "Helvetica Neue", sans-serif)',
    mono: 'var(--font-mono, "JetBrains Mono", "Fira Code", monospace)',
  },
  fontSize: {
    xs: 'clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)',
    sm: 'clamp(0.875rem, 0.8rem + 0.375vw, 1rem)',
    base: 'clamp(1rem, 0.9rem + 0.5vw, 1.125rem)',
    lg: 'clamp(1.125rem, 1rem + 0.625vw, 1.25rem)',
    xl: 'clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem)',
    '2xl': 'clamp(1.5rem, 1.25rem + 1.25vw, 2rem)',
    '3xl': 'clamp(2rem, 1.5rem + 2.5vw, 3rem)',
    '4xl': 'clamp(2.5rem, 1.75rem + 3.75vw, 4rem)',
    '5xl': 'clamp(3rem, 2rem + 5vw, 5rem)',
    '6xl': 'clamp(3.5rem, 2.25rem + 6.25vw, 6rem)',
    hero: 'clamp(3.5rem, 2rem + 7.5vw, 8rem)',
  },
  fontWeight: {
    thin: 100,
    extralight: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },
  lineHeight: {
    none: 1,
    tight: 1.1,
    snug: 1.25,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
}

export const baseSpacing: SpacingTokens = {
  base: 4, // 4px base unit
  scale: {
    px: '1px',
    '0': '0',
    '0.5': '0.125rem',
    '1': '0.25rem',
    '1.5': '0.375rem',
    '2': '0.5rem',
    '2.5': '0.625rem',
    '3': '0.75rem',
    '3.5': '0.875rem',
    '4': '1rem',
    '5': '1.25rem',
    '6': '1.5rem',
    '7': '1.75rem',
    '8': '2rem',
    '9': '2.25rem',
    '10': '2.5rem',
    '11': '2.75rem',
    '12': '3rem',
    '14': '3.5rem',
    '16': '4rem',
    '20': '5rem',
    '24': '6rem',
    '28': '7rem',
    '32': '8rem',
    '36': '9rem',
    '40': '10rem',
    '44': '11rem',
    '48': '12rem',
    '52': '13rem',
    '56': '14rem',
    '60': '15rem',
    '64': '16rem',
    '72': '18rem',
    '80': '20rem',
    '96': '24rem',
  },
  section: {
    sm: 'clamp(2rem, 1.5rem + 2.5vw, 4rem)',
    md: 'clamp(4rem, 3rem + 5vw, 8rem)',
    lg: 'clamp(6rem, 4rem + 10vw, 12rem)',
    xl: 'clamp(8rem, 5rem + 15vw, 16rem)',
  },
  container: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
    full: '100%',
  },
}

export const baseAnimation: AnimationTokens = {
  duration: {
    instant: '0ms',
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
    slower: '700ms',
    slowest: '1000ms',
  },
  easing: {
    linear: 'linear',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    smooth: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
  },
  transition: {
    fast: '150ms ease-out',
    normal: '300ms ease-out',
    slow: '500ms ease-out',
    spring: '500ms cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    colors: 'color 200ms ease, background-color 200ms ease, border-color 200ms ease',
    transform: 'transform 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    all: 'all 300ms ease-out',
  },
}

export const baseBorderRadius: BorderRadiusTokens = {
  none: '0',
  sm: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  full: '9999px',
}

// ═══════════════════════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

export function createColorScale(baseColor: string, steps: number = 9): Record<string, string> {
  // Creates a color scale from a base color
  // In production, use a proper color manipulation library
  return {
    50: baseColor,
    100: baseColor,
    200: baseColor,
    300: baseColor,
    400: baseColor,
    500: baseColor,
    600: baseColor,
    700: baseColor,
    800: baseColor,
    900: baseColor,
  }
}

export function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

export function createGradient(colors: string[], direction: string = 'to right'): string {
  return `linear-gradient(${direction}, ${colors.join(', ')})`
}
