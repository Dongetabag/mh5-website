/**
 * STATS SECTION VARIANTS - Layout System
 * ======================================
 * Multiple stats section designs for different aesthetics
 */

import StatsParticle from './StatsParticle'
import StatsOdometer from './StatsOdometer'
import StatsFlip3D from './StatsFlip3D'

export { StatsParticle, StatsOdometer, StatsFlip3D }

// Variant metadata for documentation and selection
export const statsVariants = {
  particle: {
    component: StatsParticle,
    name: 'Particle Burst',
    description: 'Numbers explode into view with particle effects',
    bestFor: ['Athletes', 'High-energy brands', 'Tech influencers'],
  },
  odometer: {
    component: StatsOdometer,
    name: 'Rolling Odometer',
    description: 'Numbers roll like a luxury car odometer',
    bestFor: ['Luxury brands', 'Finance influencers', 'Achievement-focused'],
  },
  flip3d: {
    component: StatsFlip3D,
    name: '3D Flip Cards',
    description: 'Cards flip to reveal stats in dramatic fashion',
    bestFor: ['Interactive experiences', 'Engagement-focused', 'Playful brands'],
  },
} as const

export type StatsVariant = keyof typeof statsVariants

// Dynamic variant selector
export function getStatsVariant(variant: StatsVariant) {
  return statsVariants[variant]?.component || StatsParticle
}
