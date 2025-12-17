/**
 * APEX STUDIO ELITE - Configuration Schema
 * =========================================
 * Zod validation schemas for site configuration
 *
 * This ensures config errors are caught at build time, not runtime.
 * Run: npm run validate-config to check before deployment.
 */

import { z } from 'zod'

// ═══════════════════════════════════════════════════════════════════════════════
// PRIMITIVE SCHEMAS
// ═══════════════════════════════════════════════════════════════════════════════

const HexColorSchema = z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Invalid hex color')
const RgbaColorSchema = z.string().regex(/^rgba?\([\d\s,%.]+\)$/, 'Invalid rgba color')
const ColorSchema = z.union([HexColorSchema, RgbaColorSchema, z.string()])

const UrlSchema = z.string().url().or(z.string().startsWith('/'))
const ImagePathSchema = z.string().regex(/\.(jpg|jpeg|png|gif|svg|webp|avif)$/i).or(z.string().startsWith('/'))

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENT SCHEMAS
// ═══════════════════════════════════════════════════════════════════════════════

const NavLinkSchema = z.object({
  label: z.string().min(1),
  href: z.string().startsWith('/'),
  enabled: z.boolean().default(true),
})

const CTASchema = z.object({
  label: z.string().min(1),
  href: z.string(),
  variant: z.enum(['primary', 'secondary', 'outline', 'ghost']).optional().default('primary'),
})

const SocialProofItemSchema = z.object({
  icon: z.enum(['location', 'school', 'star', 'verified', 'trophy', 'users', 'calendar']),
  text: z.string().min(1),
})

const StatItemSchema = z.object({
  value: z.number(),
  suffix: z.string().optional().default(''),
  prefix: z.string().optional().default(''),
  label: z.string().min(1),
  description: z.string().optional(),
})

const SponsorLogoSchema = z.object({
  name: z.string().min(1),
  src: z.string(),
  href: z.string().optional(),
})

const FooterColumnSchema = z.object({
  title: z.string().min(1),
  links: z.array(z.object({
    label: z.string().min(1),
    href: z.string(),
  })),
})

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION SCHEMAS
// ═══════════════════════════════════════════════════════════════════════════════

const MetaSchema = z.object({
  siteName: z.string().min(1),
  tagline: z.string(),
  description: z.string().max(160, 'Meta description should be under 160 characters'),
  keywords: z.array(z.string()),
  author: z.string(),
  siteUrl: z.string().url(),
  ogImage: z.string(),
  twitterHandle: z.string().optional(),
  locale: z.string().default('en_US'),
})

const LogoSchema = z.object({
  primary: z.string(),
  light: z.string().optional(),
  dark: z.string().optional(),
  icon: z.string().optional(),
})

const ColorsSchema = z.object({
  primary: ColorSchema,
  secondary: ColorSchema,
  accent: ColorSchema,
  background: z.object({
    primary: ColorSchema,
    secondary: ColorSchema,
    tertiary: ColorSchema.optional(),
  }),
  text: z.object({
    primary: ColorSchema,
    secondary: ColorSchema,
    muted: ColorSchema,
  }),
  success: ColorSchema.optional(),
  warning: ColorSchema.optional(),
  error: ColorSchema.optional(),
  info: ColorSchema.optional(),
})

const TypographySchema = z.object({
  fontFamily: z.object({
    heading: z.string(),
    body: z.string(),
    accent: z.string().optional(),
  }),
  scale: z.record(z.string(), z.string()),
})

const BrandSchema = z.object({
  name: z.string().min(1),
  fullName: z.string(),
  logo: LogoSchema,
  colors: ColorsSchema,
  typography: TypographySchema,
})

const AnimationsSchema = z.object({
  enabled: z.boolean().default(true),
  reducedMotion: z.boolean().default(false),
  pageTransitions: z.boolean().default(true),
  microInteractions: z.boolean().default(true),
  particleEffects: z.boolean().default(true),
  parallaxEffects: z.boolean().default(true),
  performanceMode: z.enum(['auto', 'high', 'low']).default('auto'),
})

const LayoutsSchema = z.object({
  hero: z.enum(['asymmetric', 'fullscreen', 'cinematic', 'editorial']),
  stats: z.enum(['particle', 'odometer', 'flip3d']),
  events: z.enum(['timeline', 'cardstack', 'immersive']),
  about: z.enum(['split-reveal', 'parallax', 'quote-carousel']),
})

const ThemeSchema = z.object({
  variant: z.enum(['luxury-dark', 'clean-light', 'bold-contrast', 'custom']),
  layouts: LayoutsSchema,
  animations: AnimationsSchema,
  spacing: z.object({
    section: z.string(),
    container: z.string(),
    gutter: z.string(),
  }),
  borderRadius: z.record(z.string(), z.string()),
})

const NavigationSchema = z.object({
  mainNav: z.array(NavLinkSchema),
  ctaButton: CTASchema,
  showSocialLinks: z.boolean().default(true),
  sticky: z.boolean().default(true),
  transparent: z.boolean().default(true),
})

const SocialSchema = z.object({
  instagram: z.string().optional(),
  twitter: z.string().optional(),
  youtube: z.string().optional(),
  tiktok: z.string().optional(),
  facebook: z.string().optional(),
  linkedin: z.string().optional(),
  spotify: z.string().optional(),
  appleMusic: z.string().optional(),
})

const HeroBackgroundSchema = z.object({
  type: z.enum(['video', 'image', 'gradient', 'particles']),
  videoUrl: z.string().optional(),
  imageUrl: z.string().optional(),
  overlayOpacity: z.number().min(0).max(1).default(0.7),
  parallax: z.boolean().default(true),
})

const HeroSchema = z.object({
  headline: z.object({
    line1: z.string(),
    line2: z.string().optional(),
    animated: z.boolean().default(true),
    gradientText: z.boolean().default(true),
  }),
  subheadline: z.string(),
  ctas: z.array(CTASchema),
  background: HeroBackgroundSchema,
  scrollIndicator: z.boolean().default(true),
  socialProof: z.object({
    enabled: z.boolean().default(true),
    items: z.array(SocialProofItemSchema),
  }).optional(),
})

const StatsSchema = z.object({
  enabled: z.boolean().default(true),
  headline: z.string(),
  subheadline: z.string().optional(),
  items: z.array(StatItemSchema).min(1).max(6),
  animateOnScroll: z.boolean().default(true),
  particleEffect: z.boolean().default(true),
})

const FOMOSchema = z.object({
  enabled: z.boolean().default(true),
  showViewers: z.boolean().default(true),
  showRecentPurchases: z.boolean().default(true),
  scarcityThreshold: z.number().min(0).max(1).default(0.25),
})

const EventItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  date: z.string(),
  time: z.string().optional(),
  venue: z.string(),
  location: z.string(),
  type: z.string(),
  ticketsRemaining: z.number().optional(),
  totalTickets: z.number().optional(),
  price: z.object({
    general: z.number().optional(),
    vip: z.number().optional(),
    vvip: z.number().optional(),
  }).optional(),
  featured: z.boolean().default(false),
  description: z.string().optional(),
  image: z.string().optional(),
})

const EventsSchema = z.object({
  enabled: z.boolean().default(true),
  sectionTitle: z.string().optional(),
  headline: z.union([
    z.string(),
    z.object({
      prefix: z.string(),
      highlight: z.string(),
    }),
  ]),
  subheadline: z.string(),
  showFeaturedOnly: z.boolean().default(true),
  showCountdown: z.boolean().default(true),
  showScarcity: z.boolean().default(true),
  showPricing: z.boolean().default(true),
  items: z.array(EventItemSchema).optional(),
  fomo: FOMOSchema,
})

const AboutSchema = z.object({
  enabled: z.boolean().default(true),
  headline: z.object({
    line1: z.string(),
    line2: z.string().optional(),
  }),
  content: z.array(z.string()),
  cta: CTASchema.optional(),
  image: z.object({
    src: z.string(),
    alt: z.string(),
  }).optional(),
})

const SponsorsSchema = z.object({
  enabled: z.boolean().default(true),
  headline: z.string(),
  logos: z.array(SponsorLogoSchema),
  style: z.enum(['carousel', 'grid', 'marquee']).default('carousel'),
  grayscale: z.boolean().default(true),
})

const PressSchema = z.object({
  enabled: z.boolean().default(true),
  headline: z.string(),
  outlets: z.array(z.object({
    name: z.string(),
    logo: z.string().optional(),
  })),
})

const ExitIntentSchema = z.object({
  enabled: z.boolean().default(true),
  delay: z.number().default(3000),
  headline: z.string(),
  offer: z.string().optional(),
})

const ScrollTriggerSchema = z.object({
  enabled: z.boolean().default(true),
  threshold: z.number().min(0).max(1).default(0.5),
})

const NewsletterSchema = z.object({
  enabled: z.boolean().default(true),
  headline: z.string(),
  subheadline: z.string().optional(),
  placeholder: z.string().default('Enter your email'),
  buttonText: z.string().default('Subscribe'),
  successMessage: z.string(),
  provider: z.enum(['convertkit', 'mailchimp', 'custom']),
  formId: z.string().optional(),
  exitIntent: ExitIntentSchema.optional(),
  scrollTrigger: ScrollTriggerSchema.optional(),
})

const FooterSchema = z.object({
  tagline: z.string(),
  columns: z.array(FooterColumnSchema),
  showSocial: z.boolean().default(true),
  copyright: z.string(),
  location: z.string().optional(),
})

const FeaturesSchema = z.object({
  pages: z.object({
    legacy: z.boolean().default(true),
    events: z.boolean().default(true),
    media: z.boolean().default(true),
    partners: z.boolean().default(true),
    contact: z.boolean().default(true),
    blog: z.boolean().default(false),
    shop: z.boolean().default(false),
  }),
  components: z.object({
    statsSection: z.boolean().default(true),
    eventsSpotlight: z.boolean().default(true),
    sponsorBar: z.boolean().default(true),
    pressBar: z.boolean().default(true),
    newsletter: z.boolean().default(true),
    socialProof: z.boolean().default(true),
    testimonials: z.boolean().default(false),
  }),
  functionality: z.object({
    ticketSales: z.boolean().default(true),
    ecommerce: z.boolean().default(false),
    memberArea: z.boolean().default(false),
    blog: z.boolean().default(false),
    analytics: z.boolean().default(true),
    chatWidget: z.boolean().default(false),
  }),
})

const IntegrationsSchema = z.object({
  analytics: z.object({
    googleAnalytics: z.string().optional(),
    facebookPixel: z.string().optional(),
    hotjar: z.string().optional(),
  }),
  payments: z.object({
    stripe: z.object({
      publishableKey: z.string().optional(),
      webhookSecret: z.string().optional(),
    }).optional(),
  }),
  email: z.object({
    provider: z.enum(['convertkit', 'mailchimp', 'custom']),
    apiKey: z.string().optional(),
  }),
  cms: z.object({
    provider: z.enum(['sanity', 'contentful', 'strapi', 'none']),
    projectId: z.string().optional(),
  }),
})

const PerformanceSchema = z.object({
  lazyLoadImages: z.boolean().default(true),
  preloadCritical: z.boolean().default(true),
  enableServiceWorker: z.boolean().default(false),
  imageOptimization: z.object({
    quality: z.number().min(1).max(100).default(80),
    formats: z.array(z.enum(['webp', 'avif', 'jpg', 'png'])),
  }),
})

// ═══════════════════════════════════════════════════════════════════════════════
// MASTER SCHEMA
// ═══════════════════════════════════════════════════════════════════════════════

export const SiteConfigSchema = z.object({
  meta: MetaSchema,
  brand: BrandSchema,
  theme: ThemeSchema,
  navigation: NavigationSchema,
  social: SocialSchema,
  hero: HeroSchema,
  stats: StatsSchema,
  events: EventsSchema,
  about: AboutSchema,
  sponsors: SponsorsSchema,
  press: PressSchema,
  newsletter: NewsletterSchema,
  footer: FooterSchema,
  features: FeaturesSchema,
  integrations: IntegrationsSchema,
  performance: PerformanceSchema,
})

// ═══════════════════════════════════════════════════════════════════════════════
// VALIDATION UTILITIES
// ═══════════════════════════════════════════════════════════════════════════════

export function validateConfig(config: unknown) {
  const result = SiteConfigSchema.safeParse(config)

  if (!result.success) {
    console.error('Configuration validation failed:')
    result.error.issues.forEach((issue) => {
      console.error(`  - ${issue.path.join('.')}: ${issue.message}`)
    })
    throw new Error('Invalid site configuration')
  }

  return result.data
}

export function validatePartialConfig(config: unknown) {
  const PartialSchema = SiteConfigSchema.partial()
  return PartialSchema.safeParse(config)
}

// Type exports
export type MetaConfig = z.infer<typeof MetaSchema>
export type BrandConfig = z.infer<typeof BrandSchema>
export type ThemeConfig = z.infer<typeof ThemeSchema>
export type NavigationConfig = z.infer<typeof NavigationSchema>
export type HeroConfig = z.infer<typeof HeroSchema>
export type StatsConfig = z.infer<typeof StatsSchema>
export type EventsConfig = z.infer<typeof EventsSchema>
export type NewsletterConfig = z.infer<typeof NewsletterSchema>
export type FeaturesConfig = z.infer<typeof FeaturesSchema>
