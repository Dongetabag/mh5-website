/**
 * APEX STUDIO ELITE - Master Site Configuration
 * =============================================
 * $100K Influencer Website Template System
 *
 * This configuration file controls ALL customizable aspects of the template.
 * Agency deployment target: <4 hours from config creation to live site.
 *
 * USAGE:
 * 1. Copy this file and rename for each client
 * 2. Update brand, content, and feature sections
 * 3. Run build validation: npm run validate-config
 * 4. Deploy: npm run deploy
 */

import { z } from 'zod'
import { SiteConfigSchema } from './schema'

// ═══════════════════════════════════════════════════════════════════════════════
// TYPE DEFINITIONS
// ═══════════════════════════════════════════════════════════════════════════════

export type SiteConfig = z.infer<typeof SiteConfigSchema>

export type ThemeVariant = 'luxury-dark' | 'clean-light' | 'bold-contrast' | 'custom'
export type HeroVariant = 'asymmetric' | 'fullscreen' | 'cinematic' | 'editorial'
export type StatsVariant = 'particle' | 'odometer' | 'flip3d'
export type EventsVariant = 'timeline' | 'cardstack' | 'immersive'
export type AboutVariant = 'split-reveal' | 'parallax' | 'quote-carousel'

// ═══════════════════════════════════════════════════════════════════════════════
// MASTER CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════════

export const siteConfig: SiteConfig = {
  // ─────────────────────────────────────────────────────────────────────────────
  // META & SEO
  // ─────────────────────────────────────────────────────────────────────────────
  meta: {
    siteName: 'MH5',
    tagline: 'The Movement Has 5ive',
    description: 'Basketball influencer, event host, and rising star. Tournaments, club nights, exclusive experiences.',
    keywords: ['basketball', 'influencer', 'events', 'entertainment', 'sports'],
    author: 'Milan Harrison',
    siteUrl: 'https://mh5.com',
    ogImage: '/images/og-default.jpg',
    twitterHandle: '@therealmilan5',
    locale: 'en_US',
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BRAND IDENTITY
  // ─────────────────────────────────────────────────────────────────────────────
  brand: {
    name: 'MH5',
    fullName: 'Milan Harrison',
    logo: {
      primary: '/images/logo.svg',
      light: '/images/logo-light.svg',
      dark: '/images/logo-dark.svg',
      icon: '/images/icon.svg',
    },
    colors: {
      // Primary brand colors - Neon Cyan Elite Theme
      primary: '#7DF9FF',      // Neon Cyan
      secondary: '#9DFBFF',    // Frost
      accent: '#BDFCFF',       // Diamond

      // Background system
      background: {
        primary: '#0A0A0A',    // Midnight
        secondary: '#1A1A1A',  // Smoke
        tertiary: '#2A2A2A',   // Elevated
      },

      // Text system
      text: {
        primary: '#F5F5F5',    // Off-white
        secondary: 'rgba(245, 245, 245, 0.7)',
        muted: 'rgba(245, 245, 245, 0.4)',
      },

      // Semantic colors
      success: '#22C55E',
      warning: '#F59E0B',
      error: '#EF4444',
      info: '#3B82F6',
    },
    typography: {
      fontFamily: {
        heading: 'var(--font-heading, "Oswald", sans-serif)',
        body: 'var(--font-body, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif)',
        accent: 'var(--font-accent, "Oswald", sans-serif)',
      },
      scale: {
        // Responsive type scale (clamp values)
        xs: 'clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)',
        sm: 'clamp(0.875rem, 0.8rem + 0.375vw, 1rem)',
        base: 'clamp(1rem, 0.9rem + 0.5vw, 1.125rem)',
        lg: 'clamp(1.125rem, 1rem + 0.625vw, 1.25rem)',
        xl: 'clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem)',
        '2xl': 'clamp(1.5rem, 1.25rem + 1.25vw, 2rem)',
        '3xl': 'clamp(2rem, 1.5rem + 2.5vw, 3rem)',
        '4xl': 'clamp(2.5rem, 1.75rem + 3.75vw, 4rem)',
        '5xl': 'clamp(3rem, 2rem + 5vw, 5rem)',
        'hero': 'clamp(3.5rem, 2rem + 7.5vw, 8rem)',
      },
    },
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // THEME & LAYOUT SELECTION
  // ─────────────────────────────────────────────────────────────────────────────
  theme: {
    variant: 'luxury-dark' as ThemeVariant,

    // Layout variants per section
    layouts: {
      hero: 'asymmetric' as HeroVariant,
      stats: 'particle' as StatsVariant,
      events: 'cardstack' as EventsVariant,
      about: 'split-reveal' as AboutVariant,
    },

    // Animation preferences
    animations: {
      enabled: true,
      reducedMotion: false,       // Respect prefers-reduced-motion
      pageTransitions: true,
      microInteractions: true,
      particleEffects: true,
      parallaxEffects: true,
      performanceMode: 'auto',    // 'auto' | 'high' | 'low'
    },

    // Spacing scale
    spacing: {
      section: 'clamp(4rem, 3rem + 5vw, 8rem)',
      container: '7rem',
      gutter: '1.5rem',
    },

    // Border radius system
    borderRadius: {
      sm: '0.375rem',
      md: '0.5rem',
      lg: '1rem',
      xl: '1.5rem',
      '2xl': '2rem',
      full: '9999px',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // NAVIGATION
  // ─────────────────────────────────────────────────────────────────────────────
  navigation: {
    mainNav: [
      { label: 'Home', href: '/', enabled: true },
      { label: 'Legacy', href: '/legacy', enabled: true },
      { label: 'Events', href: '/events', enabled: true },
      { label: 'Media', href: '/media', enabled: true },
      { label: 'Partners', href: '/partners', enabled: true },
      { label: 'Contact', href: '/contact', enabled: true },
    ],
    ctaButton: {
      label: 'Get Tickets',
      href: '/events',
      variant: 'primary', // 'primary' | 'secondary' | 'outline'
    },
    showSocialLinks: true,
    sticky: true,
    transparent: true,    // Transparent on hero, solid on scroll
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // SOCIAL LINKS
  // ─────────────────────────────────────────────────────────────────────────────
  social: {
    instagram: 'https://www.instagram.com/therealmilan5/',
    twitter: 'https://twitter.com/therealmilan5',
    youtube: 'https://www.youtube.com/watch?v=3aPDRabLDzg',
    tiktok: '',
    facebook: '',
    linkedin: '',
    spotify: '',
    appleMusic: '',
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // HERO SECTION
  // ─────────────────────────────────────────────────────────────────────────────
  hero: {
    headline: {
      line1: 'THE MOVEMENT',
      line2: 'HAS 5IVE',
      animated: true,
      gradientText: true,
    },
    subheadline: 'Basketball • Events • Lifestyle',
    ctas: [
      {
        label: 'Upcoming Events',
        href: '/events',
        variant: 'primary',
      },
      {
        label: 'Partner With MH5',
        href: '/partners',
        variant: 'outline',
      },
    ],
    background: {
      type: 'video', // 'video' | 'image' | 'gradient' | 'particles'
      videoUrl: '/videos/hero-bg.mp4',
      imageUrl: '/images/hero-placeholder.jpg',
      overlayOpacity: 0.7,
      parallax: true,
    },
    scrollIndicator: true,
    socialProof: {
      enabled: true,
      items: [
        { icon: 'location', text: 'Springfield, MA' },
        { icon: 'school', text: 'Prodigy Prep Alumni' },
        { icon: 'star', text: 'Super 7 All Years' },
        { icon: 'verified', text: 'Pro Prospect' },
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // STATS SECTION
  // ─────────────────────────────────────────────────────────────────────────────
  stats: {
    enabled: true,
    headline: 'By The Numbers',
    subheadline: 'From Springfield courts to the professional stage',
    items: [
      {
        value: 4,
        prefix: '',
        suffix: '',
        label: 'Super 7 Selections',
        description: 'Consecutive years of elite recognition',
      },
      {
        value: 65,
        prefix: '',
        suffix: '',
        label: 'Points First Weekend',
        description: 'Prodigy Prep debut dominance',
      },
      {
        value: 500,
        prefix: '',
        suffix: 'K+',
        label: 'Social Followers',
        description: 'Across all platforms',
      },
      {
        value: 10,
        prefix: '',
        suffix: '+',
        label: 'Brand Partnerships',
        description: 'Premium collaborations',
      },
    ],
    animateOnScroll: true,
    particleEffect: true,
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // EVENTS SECTION
  // ─────────────────────────────────────────────────────────────────────────────
  events: {
    enabled: true,
    sectionTitle: 'Live Events',
    headline: 'Experience It Live',
    subheadline: "Don't miss out on the next experience",
    showFeaturedOnly: true,
    showCountdown: true,
    showScarcity: true,
    showPricing: true,

    // Event items
    items: [
      {
        id: 'mh5-tournament-2024',
        title: 'MH5 Summer Tournament',
        date: '2024-07-15',
        time: '7:00 PM EST',
        venue: 'Springfield Arena',
        location: 'Springfield, MA',
        type: 'Tournament',
        ticketsRemaining: 47,
        totalTickets: 200,
        price: { general: 25, vip: 75, vvip: 150 },
        featured: true,
        description: 'The biggest basketball tournament of the summer.',
        image: '/images/events/tournament.jpg',
      },
      {
        id: 'mh5-club-night',
        title: 'MH5 Club Night',
        date: '2024-08-20',
        time: '10:00 PM EST',
        venue: 'Club Luxe',
        location: 'Boston, MA',
        type: 'Club Night',
        ticketsRemaining: 120,
        totalTickets: 300,
        price: { general: 50, vip: 150 },
        featured: false,
        description: 'An exclusive night with MH5.',
        image: '/images/events/club.jpg',
      },
      {
        id: 'mh5-vip-experience',
        title: 'VIP Meet & Greet',
        date: '2024-09-10',
        time: '5:00 PM EST',
        venue: 'Private Venue',
        location: 'New York, NY',
        type: 'VIP Experience',
        ticketsRemaining: 15,
        totalTickets: 50,
        price: { vvip: 500 },
        featured: true,
        description: 'An intimate experience with limited spots.',
        image: '/images/events/vip.jpg',
      },
    ],

    // FOMO settings
    fomo: {
      enabled: true,
      showViewers: true,
      showRecentPurchases: true,
      scarcityThreshold: 0.25,
    },
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // ABOUT/LEGACY SECTION
  // ─────────────────────────────────────────────────────────────────────────────
  about: {
    enabled: true,
    headline: {
      line1: 'From Springfield',
      line2: 'To The World',
    },
    content: [
      "Milan Harrison's journey from the courts of Western Massachusetts to the national spotlight is a testament to dedication, skill, and an unwavering commitment to excellence.",
      'As a "Super 7" selection every year of high school, a standout at Prodigy Prep alongside Julian Newman, and now pursuing professional opportunities—Milan represents the next generation of basketball talent and entertainment influence.',
    ],
    cta: {
      label: 'Read The Full Story',
      href: '/legacy',
      variant: 'primary',
    },
    image: {
      src: '/images/about-portrait.jpg',
      alt: 'Milan Harrison Portrait',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // SPONSORS/PARTNERS SECTION
  // ─────────────────────────────────────────────────────────────────────────────
  sponsors: {
    enabled: true,
    headline: 'Proudly Partnered With',
    logos: [
      { name: 'Wooter Apparel', src: '/images/sponsors/wooter.svg', href: '#' },
      { name: 'Partner 2', src: '/images/sponsors/partner2.svg', href: '#' },
      { name: 'Partner 3', src: '/images/sponsors/partner3.svg', href: '#' },
      { name: 'Partner 4', src: '/images/sponsors/partner4.svg', href: '#' },
    ],
    style: 'carousel', // 'carousel' | 'grid' | 'marquee'
    grayscale: true,    // Grayscale until hover
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // PRESS/MEDIA MENTIONS
  // ─────────────────────────────────────────────────────────────────────────────
  press: {
    enabled: true,
    headline: 'As Seen In',
    outlets: [
      { name: 'MassLive', logo: '/images/press/masslive.svg' },
      { name: 'WWLP', logo: '/images/press/wwlp.svg' },
      { name: 'The Report Mag', logo: '/images/press/report.svg' },
      { name: 'Wooter Apparel', logo: '/images/press/wooter.svg' },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // NEWSLETTER/EMAIL CAPTURE
  // ─────────────────────────────────────────────────────────────────────────────
  newsletter: {
    enabled: true,
    headline: 'Join The Movement',
    subheadline: 'Get exclusive access to events, drops, and behind-the-scenes content.',
    placeholder: 'Enter your email',
    buttonText: 'Subscribe',
    successMessage: "You're in! Check your inbox for confirmation.",
    provider: 'convertkit', // 'convertkit' | 'mailchimp' | 'custom'
    formId: '', // Provider-specific form ID

    // Additional capture points
    exitIntent: {
      enabled: true,
      delay: 3000,           // ms before showing on exit
      headline: 'Wait! Before you go...',
      offer: 'Get 10% off your first event ticket',
    },
    scrollTrigger: {
      enabled: true,
      threshold: 0.5,        // Show after 50% scroll
    },
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // FOOTER
  // ─────────────────────────────────────────────────────────────────────────────
  footer: {
    tagline: 'The Movement Has 5ive. Basketball influencer, event host, and rising star from Springfield, Massachusetts.',
    columns: [
      {
        title: 'Navigate',
        links: [
          { label: 'Home', href: '/' },
          { label: 'Legacy', href: '/legacy' },
          { label: 'Events', href: '/events' },
          { label: 'Media', href: '/media' },
        ],
      },
      {
        title: 'Business',
        links: [
          { label: 'Partnerships', href: '/partners' },
          { label: 'Contact', href: '/contact' },
          { label: 'Media Kit', href: '/media#kit' },
        ],
      },
      {
        title: 'Legal',
        links: [
          { label: 'Terms of Service', href: '/terms' },
          { label: 'Privacy Policy', href: '/privacy' },
          { label: 'Event Terms', href: '/event-terms' },
        ],
      },
    ],
    showSocial: true,
    copyright: '© {year} MH5 / Milan Harrison. All rights reserved.',
    location: 'Springfield, MA • Global',
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // FEATURE FLAGS
  // ─────────────────────────────────────────────────────────────────────────────
  features: {
    // Page-level toggles
    pages: {
      legacy: true,
      events: true,
      media: true,
      partners: true,
      contact: true,
      blog: false,
      shop: false,
    },

    // Component-level toggles
    components: {
      statsSection: true,
      eventsSpotlight: true,
      sponsorBar: true,
      pressBar: true,
      newsletter: true,
      socialProof: true,
      testimonials: false,
    },

    // Functionality toggles
    functionality: {
      ticketSales: true,
      ecommerce: false,
      memberArea: false,
      blog: false,
      analytics: true,
      chatWidget: false,
    },
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // INTEGRATIONS
  // ─────────────────────────────────────────────────────────────────────────────
  integrations: {
    analytics: {
      googleAnalytics: '',       // GA4 Measurement ID
      facebookPixel: '',
      hotjar: '',
    },
    payments: {
      stripe: {
        publishableKey: '',
        webhookSecret: '',
      },
    },
    email: {
      provider: 'convertkit',
      apiKey: '',
    },
    cms: {
      provider: 'none', // 'sanity' | 'contentful' | 'strapi' | 'none'
      projectId: '',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // PERFORMANCE & OPTIMIZATION
  // ─────────────────────────────────────────────────────────────────────────────
  performance: {
    lazyLoadImages: true,
    preloadCritical: true,
    enableServiceWorker: false,
    imageOptimization: {
      quality: 80,
      formats: ['webp', 'avif'],
    },
  },
}

export default siteConfig
