'use client'

/**
 * APEX STUDIO ELITE - Hero Layout Variants
 * ========================================
 * Central export and variant selector for hero sections
 */

import HeroAsymmetric from './HeroAsymmetric'
import HeroCinematic from './HeroCinematic'
import HeroEditorial from './HeroEditorial'

// Export all hero components
export { HeroAsymmetric, HeroCinematic, HeroEditorial }

// Variant type
export type HeroVariant = 'asymmetric' | 'fullscreen' | 'cinematic' | 'editorial'

// Variant map
const heroVariants = {
  asymmetric: HeroAsymmetric,
  fullscreen: HeroCinematic, // Fullscreen is an alias for Cinematic
  cinematic: HeroCinematic,
  editorial: HeroEditorial,
}

/**
 * Get the appropriate hero component based on variant name
 */
export function getHeroVariant(variant?: HeroVariant | string) {
  const key = (variant || 'asymmetric') as keyof typeof heroVariants
  return heroVariants[key] || HeroAsymmetric
}

// Default export
export default HeroAsymmetric

// Metadata for variant selection UI
export const heroVariantMetadata = {
  asymmetric: {
    name: 'Asymmetric Split',
    description: 'Diagonal divisions with kinetic text. Bold and modern.',
    preview: '/images/previews/hero-asymmetric.jpg',
    bestFor: ['Athletes', 'Tech brands', 'Modern personalities'],
  },
  cinematic: {
    name: 'Cinematic',
    description: 'Full-screen video background with particle effects. Dramatic.',
    preview: '/images/previews/hero-cinematic.jpg',
    bestFor: ['Musicians', 'Event promoters', 'Visual artists'],
  },
  editorial: {
    name: 'Editorial',
    description: 'Magazine-style typography. Minimal and sophisticated.',
    preview: '/images/previews/hero-editorial.jpg',
    bestFor: ['Fashion', 'Lifestyle', 'Luxury brands'],
  },
}
