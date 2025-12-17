# APEX STUDIO ELITE — Agency Deployment Playbook

## $100K Influencer Website Template System
### 4-Hour Deployment Guarantee

---

## Table of Contents

1. [Quick Start Checklist](#quick-start-checklist)
2. [Pre-Deployment Preparation](#pre-deployment-preparation)
3. [Configuration Guide](#configuration-guide)
4. [Theme Customization](#theme-customization)
5. [Content Population](#content-population)
6. [Testing Protocol](#testing-protocol)
7. [Deployment Steps](#deployment-steps)
8. [Client Handoff](#client-handoff)
9. [Troubleshooting](#troubleshooting)
10. [Support Escalation](#support-escalation)

---

## Quick Start Checklist

**Estimated Time: 4 Hours**

### Hour 1: Setup & Configuration (60 min)
- [ ] Clone template repository
- [ ] Install dependencies: `npm install`
- [ ] Copy and rename `site.config.ts` for client
- [ ] Update all brand values (name, colors, fonts)
- [ ] Configure navigation structure
- [ ] Set up social links

### Hour 2: Content & Assets (60 min)
- [ ] Add client logo files (SVG preferred)
- [ ] Upload hero images/video
- [ ] Populate stats/metrics
- [ ] Add event data (if applicable)
- [ ] Import testimonials/press mentions
- [ ] Configure email provider integration

### Hour 3: Customization & Testing (60 min)
- [ ] Select theme variant
- [ ] Choose layout variants for each section
- [ ] Enable/disable features via config
- [ ] Run local development server
- [ ] Test all pages and interactions
- [ ] Mobile responsiveness check
- [ ] Performance audit (Lighthouse)

### Hour 4: Deploy & Handoff (60 min)
- [ ] Build production bundle: `npm run build`
- [ ] Deploy to hosting (Vercel recommended)
- [ ] Configure custom domain
- [ ] SSL certificate verification
- [ ] Final live testing
- [ ] Create client documentation
- [ ] Schedule handoff call

---

## Pre-Deployment Preparation

### Required Client Assets

Before starting deployment, collect the following from the client:

#### Brand Assets
| Asset | Format | Notes |
|-------|--------|-------|
| Logo (Primary) | SVG or PNG (transparent) | Min 500px width |
| Logo (Light version) | SVG or PNG | For dark backgrounds |
| Logo (Icon/Favicon) | SVG, ICO, or PNG | Square, 512x512px |
| Brand colors | Hex codes | Primary, secondary, accent |
| Brand fonts | Google Fonts or files | Heading and body fonts |

#### Content Assets
| Asset | Format | Notes |
|-------|--------|-------|
| Hero image/video | JPG/MP4 | Min 1920x1080, <10MB video |
| Profile photos | JPG/PNG | Min 800x800, square or 4:5 |
| Event images | JPG/PNG | Min 1200x800, 16:9 ratio |
| Sponsor logos | SVG preferred | Grayscale-friendly |

#### Content Copy
| Section | Required Fields |
|---------|----------------|
| Meta | Site name, tagline, description (160 chars) |
| Hero | Headline (2 lines), subheadline, CTA text |
| About | 2-3 paragraphs, key achievements |
| Stats | 4-6 metrics with values and labels |
| Events | Event name, date, venue, pricing tiers |
| Social | All active platform URLs |

---

## Configuration Guide

### Master Configuration File

The `src/config/site.config.ts` file controls all site customizations.

#### 1. Meta & SEO Settings

```typescript
meta: {
  siteName: 'CLIENT NAME',           // Used in <title> tags
  tagline: 'Their catchphrase',       // Appears in hero
  description: 'SEO description...',  // Max 160 characters
  keywords: ['keyword1', 'keyword2'], // For meta tags
  author: 'Client Full Name',
  siteUrl: 'https://clientsite.com',  // Production URL
  ogImage: '/images/og-default.jpg',  // 1200x630px
  twitterHandle: '@handle',
  locale: 'en_US',
}
```

#### 2. Brand Colors

```typescript
brand: {
  colors: {
    primary: '#D4AF37',      // Main brand color (CTAs, accents)
    secondary: '#00D4FF',    // Secondary accent
    accent: '#FF4444',       // Urgency/alerts

    background: {
      primary: '#0A0A0A',    // Main background
      secondary: '#1A1A1A',  // Card backgrounds
      tertiary: '#2A2A2A',   // Elevated elements
    },

    text: {
      primary: '#F5F5F5',    // Main text
      secondary: 'rgba(245, 245, 245, 0.7)',
      muted: 'rgba(245, 245, 245, 0.4)',
    },
  }
}
```

**Color Selection Tips:**
- Primary should be brand's signature color
- Ensure 4.5:1 contrast ratio with backgrounds
- Test colors against all background variants

#### 3. Theme Selection

```typescript
theme: {
  variant: 'luxury-dark',  // Options: 'luxury-dark' | 'clean-light' | 'bold-contrast'

  layouts: {
    hero: 'asymmetric',     // Options: 'asymmetric' | 'cinematic' | 'editorial'
    stats: 'particle',      // Options: 'particle' | 'odometer' | 'flip3d'
    events: 'cardstack',    // Options: 'timeline' | 'cardstack' | 'immersive'
    about: 'split-reveal',  // Options: 'split-reveal' | 'parallax' | 'quote-carousel'
  },

  animations: {
    enabled: true,
    reducedMotion: false,    // Honor user preference
    pageTransitions: true,
    microInteractions: true,
    particleEffects: true,
    parallaxEffects: true,
    performanceMode: 'auto', // 'auto' | 'high' | 'low'
  },
}
```

#### 4. Feature Flags

Enable or disable entire sections:

```typescript
features: {
  pages: {
    legacy: true,       // About/biography page
    events: true,       // Events listing
    media: true,        // Media gallery
    partners: true,     // Partnership info
    contact: true,      // Contact form
    blog: false,        // Blog (if needed)
    shop: false,        // E-commerce (if needed)
  },

  components: {
    statsSection: true,
    eventsSpotlight: true,
    sponsorBar: true,
    pressBar: true,
    newsletter: true,
    socialProof: true,
    testimonials: false,
  },

  functionality: {
    ticketSales: true,
    ecommerce: false,
    memberArea: false,
    analytics: true,
    chatWidget: false,
  },
}
```

---

## Theme Customization

### Available Theme Variants

#### 1. Luxury Dark (Default)
- **Best for:** Athletes, luxury brands, nightlife, exclusive events
- **Mood:** Sophisticated, premium, exclusive
- **Colors:** Dark backgrounds, gold accents
- **Typography:** Clean, bold, high contrast

#### 2. Clean Light
- **Best for:** Lifestyle influencers, wellness, fashion
- **Mood:** Fresh, modern, approachable
- **Colors:** White backgrounds, subtle accents
- **Typography:** Light weights, elegant spacing

#### 3. Bold Contrast
- **Best for:** Musicians, artists, streetwear
- **Mood:** Edgy, energetic, rebellious
- **Colors:** Pure black, neon accents
- **Typography:** Bold, angular, impactful

### Custom Theme Creation

To create a custom theme beyond the presets:

```typescript
// In site.config.ts
theme: {
  variant: 'custom',
  customTheme: {
    colors: {
      primary: '#YOUR_COLOR',
      // ... override any color token
    },
    typography: {
      fontFamily: {
        heading: '"Custom Font", sans-serif',
        body: '"Body Font", sans-serif',
      },
    },
  },
}
```

---

## Content Population

### Stats Section

```typescript
stats: {
  items: [
    {
      value: 4,           // Number value
      suffix: '',         // e.g., 'K', 'M', '+'
      prefix: '',         // e.g., '$', '#'
      label: 'Super 7 Selections',
      description: 'Consecutive years of elite recognition',
    },
    // Add 3-5 more stats
  ],
}
```

**Best Practices:**
- Use 4-6 stats for optimal visual balance
- Lead with most impressive metric
- Include both career and social metrics
- Add context with descriptions

### Events Section

Events can be managed in `src/data/events.ts` or through a CMS:

```typescript
const events = [
  {
    id: 'unique-event-id',
    title: 'Event Name',
    date: '2024-06-15',
    time: '7:00 PM EST',
    venue: 'Venue Name',
    location: 'City, State',
    type: 'Tournament',        // Tournament | Club Night | VIP Experience
    ticketsRemaining: 47,
    totalTickets: 200,
    price: {
      general: 25,
      vip: 75,
      vvip: 150,
    },
    featured: true,
    description: 'Event description...',
    image: '/images/events/event-name.jpg',
  },
]
```

---

## Testing Protocol

### Pre-Launch Checklist

#### Visual Testing
- [ ] All pages load without errors
- [ ] Images display correctly (no broken images)
- [ ] Videos play (if applicable)
- [ ] Animations trigger on scroll
- [ ] Hover states work on all interactive elements
- [ ] Mobile menu opens/closes correctly

#### Responsive Testing
- [ ] Mobile (320px - 480px)
- [ ] Tablet (768px - 1024px)
- [ ] Desktop (1024px - 1440px)
- [ ] Large screens (1440px+)

#### Functionality Testing
- [ ] All links work correctly
- [ ] Forms submit successfully
- [ ] Newsletter signup works
- [ ] Social links open in new tabs
- [ ] CTAs navigate to correct pages

#### Performance Testing
Run Lighthouse audit and ensure:
- [ ] Performance score > 90
- [ ] Accessibility score > 90
- [ ] Best Practices score > 90
- [ ] SEO score > 90

#### Cross-Browser Testing
- [ ] Chrome (latest)
- [ ] Safari (latest)
- [ ] Firefox (latest)
- [ ] Edge (latest)

---

## Deployment Steps

### Recommended: Vercel Deployment

1. **Connect Repository**
   ```bash
   # Push to GitHub
   git add .
   git commit -m "Initial client deployment"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to vercel.com
   - Click "Add New Project"
   - Import from GitHub
   - Select repository

3. **Configure Build Settings**
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`

4. **Environment Variables**
   Add any required environment variables:
   ```
   NEXT_PUBLIC_SITE_URL=https://clientsite.com
   CONVERTKIT_API_KEY=xxx (if using)
   STRIPE_PUBLISHABLE_KEY=xxx (if using)
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Verify preview URL

### Custom Domain Setup

1. In Vercel dashboard, go to Settings > Domains
2. Add custom domain
3. Configure DNS:
   - **A Record:** 76.76.21.21
   - **CNAME:** cname.vercel-dns.com
4. Wait for SSL certificate (automatic)

---

## Client Handoff

### Handoff Package

Provide the client with:

1. **Access Credentials**
   - Vercel dashboard access (viewer or editor)
   - GitHub repository access (if needed)
   - CMS access credentials (if using)

2. **Documentation**
   - This playbook (PDF version)
   - Quick reference card for common updates
   - Contact info for support

3. **Training Session** (30 min)
   - Overview of admin interfaces
   - How to update content
   - How to request changes

### Client Training Agenda

1. **Dashboard Overview** (5 min)
   - Where to access site analytics
   - Understanding visitor metrics

2. **Content Updates** (15 min)
   - Updating events
   - Changing images
   - Modifying text content

3. **Support Process** (10 min)
   - How to request changes
   - Response time expectations
   - Emergency contact info

---

## Troubleshooting

### Common Issues

#### Build Fails
**Error:** Module not found
**Solution:** Run `npm install` to ensure all dependencies are installed

#### Images Not Loading
**Checklist:**
1. Verify file exists in `/public/images/`
2. Check file path matches config (case-sensitive)
3. Ensure image format is supported (jpg, png, svg, webp)

#### Animations Laggy
**Solutions:**
1. Set `performanceMode: 'low'` in config
2. Disable particle effects: `particleEffects: false`
3. Reduce image file sizes

#### Newsletter Not Working
**Checklist:**
1. Verify provider is set correctly
2. Check API key is valid
3. Confirm form ID matches provider

#### Styles Not Updating
**Solution:** Clear `.next` cache and rebuild:
```bash
rm -rf .next
npm run build
```

---

## Support Escalation

### Tier 1: Self-Service (0-4 hours)
- Consult this playbook
- Check troubleshooting section
- Review configuration documentation

### Tier 2: Peer Support (4-8 hours)
- Slack channel: #apex-template-support
- Post issue with:
  - Error message/screenshot
  - Steps to reproduce
  - Config file (redacted)

### Tier 3: Senior Dev (8-24 hours)
- Email: support@apexstudio.com
- Include:
  - Client name and site URL
  - Complete error logs
  - Screenshots/recordings
  - Attempted solutions

### Emergency (Production Down)
- Call: [Emergency Number]
- Available: 24/7
- SLA: 2-hour response

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | Dec 2024 | Initial release |

---

**APEX STUDIO ELITE**
*$100K Influencer Website Template System*
*4-Hour Deployment Guarantee*
