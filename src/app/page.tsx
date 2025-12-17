'use client'

/**
 * MH5 HOMEPAGE - Sales Funnel Architecture
 * =========================================
 * Mobile-first, vertical video optimized design
 * Story-driven conversion funnel
 * Elite Performance Style
 */

import { useEffect } from 'react'
import {
  FunnelHero,
  JourneySection,
  MediaShowcase,
  SimpleNewsletter,
} from '@/components/funnel'
import StatsTicker from '@/components/StatsTicker'

export default function Home() {
  useEffect(() => {
    // Log to help debug if page loads
    console.log('Home page mounted')
  }, [])

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
