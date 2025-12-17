/**
 * ABOUT SECTION VARIANTS - Layout System
 * =====================================
 * Multiple about/bio section designs for different aesthetics
 */

import AboutSplitReveal from './AboutSplitReveal'
import AboutParallax from './AboutParallax'
import AboutQuoteCarousel from './AboutQuoteCarousel'

export { AboutSplitReveal, AboutParallax, AboutQuoteCarousel }

// Variant metadata for documentation and selection
export const aboutVariants = {
  'split-reveal': {
    component: AboutSplitReveal,
    name: 'Split Reveal',
    description: 'Split screen with cinematic reveal animations',
    bestFor: ['Personal brands', 'Detailed bios', 'Achievement focus'],
  },
  parallax: {
    component: AboutParallax,
    name: 'Parallax Immersive',
    description: 'Full-width parallax scrolling experience',
    bestFor: ['Visual impact', 'Single message', 'Hero-style'],
  },
  'quote-carousel': {
    component: AboutQuoteCarousel,
    name: 'Quote Carousel',
    description: 'Rotating quotes with bio content',
    bestFor: ['Testimonials', 'Philosophy focus', 'Social proof'],
  },
} as const

export type AboutVariant = keyof typeof aboutVariants

// Dynamic variant selector
export function getAboutVariant(variant: AboutVariant) {
  return aboutVariants[variant]?.component || AboutSplitReveal
}
