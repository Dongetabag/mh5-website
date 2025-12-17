'use client'

/**
 * MH5 HOMEPAGE - Sales Funnel Architecture
 * =========================================
 * Mobile-first, vertical video optimized design
 * Story-driven conversion funnel
 * Elite Performance Style
 */

import {
  FunnelHero,
  JourneySection,
  MediaShowcase,
  SimpleNewsletter,
} from '@/components/funnel'
import StatsTicker from '@/components/StatsTicker'

export default function Home() {
  return (
    <>
      <FunnelHero />
      <StatsTicker />
      <JourneySection />
      <MediaShowcase />
      <SimpleNewsletter />
    </>
  )
}
