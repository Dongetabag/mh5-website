/**
 * EVENTS SECTION VARIANTS - Layout System
 * ======================================
 * Multiple events section designs for different aesthetics
 */

import EventsTimeline from './EventsTimeline'
import EventsCardstack from './EventsCardstack'
import EventsImmersive from './EventsImmersive'

export { EventsTimeline, EventsCardstack, EventsImmersive }

// Variant metadata for documentation and selection
export const eventsVariants = {
  timeline: {
    component: EventsTimeline,
    name: 'Vertical Timeline',
    description: 'Events displayed on an elegant chronological timeline',
    bestFor: ['Multiple events', 'Historical feel', 'Clean organization'],
  },
  cardstack: {
    component: EventsCardstack,
    name: 'Interactive Cards',
    description: 'Rich event cards with FOMO indicators and countdowns',
    bestFor: ['Conversion focus', 'Few featured events', 'E-commerce'],
  },
  immersive: {
    component: EventsImmersive,
    name: 'Immersive Showcase',
    description: 'Full-screen cinematic event presentation',
    bestFor: ['Hero events', 'Visual impact', 'Premium feel'],
  },
} as const

export type EventsVariant = keyof typeof eventsVariants

// Dynamic variant selector
export function getEventsVariant(variant: EventsVariant) {
  return eventsVariants[variant]?.component || EventsCardstack
}
