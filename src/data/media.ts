/**
 * MH5 MEDIA LIBRARY
 * =================
 * Centralized media assets organized by category
 * All paths are relative to /public
 */

// ============================================
// IMAGES
// ============================================

export const basketballImages = [
  {
    src: '/images/basketball/IMG_2493.JPG',
    alt: 'Prodigy Prep game - driving to the basket',
    featured: true,
    orientation: 'portrait' as const,
  },
  {
    src: '/images/basketball/IMG_5504.JPG',
    alt: 'Jump shot at Breast Cancer Awareness Classic',
    featured: true,
    orientation: 'square' as const,
  },
  {
    src: '/images/basketball/1DCFE9D5-F638-4842-A9D6-793DB9350066.JPG',
    alt: 'Defensive stance in game action',
    featured: false,
    orientation: 'landscape' as const,
  },
  {
    src: '/images/basketball/09C7861A-0733-4818-B9AF-077EC300A440.JPG',
    alt: 'Professional action shot - crossover dribble',
    featured: true,
    orientation: 'portrait' as const,
  },
  {
    src: '/images/events/IMG_4847.jpg',
    alt: 'Skills Academy training session',
    featured: false,
    orientation: 'portrait' as const,
  },
  {
    src: '/images/basketball/278543FD-E8F1-48C4-B12D-F5014265F665.JPG',
    alt: 'Game action shot',
    featured: false,
    orientation: 'portrait' as const,
  },
  {
    src: '/images/basketball/342A3669-0A8F-4616-89F2-89B1C8B3DDF5.JPG',
    alt: 'Basketball highlight',
    featured: false,
    orientation: 'portrait' as const,
  },
  {
    src: '/images/basketball/2516F603-3659-4D99-A163-D276CFF02C2F.JPG',
    alt: 'Court action',
    featured: false,
    orientation: 'portrait' as const,
  },
]

export const clubHostingImages = [
  {
    src: '/images/events/IMG_4139.jpg',
    alt: 'VIP section with Dave East',
    featured: true,
    orientation: 'portrait' as const,
  },
  {
    src: '/images/events/C8593DE0-E4F4-4BBA-A145-B5318AB30E90.JPG',
    alt: 'Club VIP moment',
    featured: true,
    orientation: 'portrait' as const,
  },
  {
    src: '/images/events/BE564DC8-2241-4DC9-969F-8CA7F99D25AE.jpg',
    alt: 'Backstage networking',
    featured: false,
    orientation: 'portrait' as const,
  },
]

export const lifestyleImages = [
  {
    src: '/images/events/IMG_4501.jpg',
    alt: 'Rolling Loud festival',
    featured: true,
    orientation: 'portrait' as const,
  },
  {
    src: '/images/events/4430EAE3-2CD3-4285-9892-9494FA6EE94F.JPG',
    alt: 'Social networking moment',
    featured: false,
    orientation: 'portrait' as const,
  },
  {
    src: '/images/brand-campaigns/69F59DD8-E162-4731-B2C3-4FE2654F2948.JPEG',
    alt: 'House of Hoops community event',
    featured: true,
    orientation: 'portrait' as const,
  },
  {
    src: '/images/events/DBAEFDA8-FB32-499C-BF46-4B55DCAEC8C6.JPG',
    alt: 'Networking and connecting',
    featured: false,
    orientation: 'landscape' as const,
  },
  {
    src: '/images/events/3AFC5E5E-A1FA-4E30-9D2B-6263B98B922C.JPG',
    alt: 'Gym training session',
    featured: false,
    orientation: 'portrait' as const,
  },
  {
    src: '/images/events/3B027662-DE3B-4A1B-8441-8412D0215E16.JPG',
    alt: 'Lifestyle moment',
    featured: false,
    orientation: 'portrait' as const,
  },
]

export const brandImages = [
  {
    src: '/images/events/IMG_7437.jpg',
    alt: 'MH5 Logo',
    featured: true,
    orientation: 'square' as const,
  },
  {
    src: '/images/events/IMG_2482.jpg',
    alt: 'Pro Athlete booking flyer',
    featured: true,
    orientation: 'square' as const,
  },
  {
    src: '/images/media-flyers/mhf.jpg',
    alt: 'Baddie Brunch event flyer',
    featured: true,
    orientation: 'portrait' as const,
  },
]

export const heroImages = [
  {
    src: '/images/hero/hero-poster.jpg',
    alt: 'Hero background',
  },
  {
    src: '/images/hero/vertical-poster.jpg',
    alt: 'Vertical hero poster',
  },
]

// ============================================
// VIDEOS
// ============================================

export const basketballVideos = [
  {
    src: '/videos/basketball/26e44d220245495a8a592c0002ace524.MOV',
    poster: '/images/basketball/IMG_2493.JPG',
    label: 'Highlights',
    featured: true,
  },
  {
    src: '/videos/basketball/67df5ad85df7404a81f2d6e311e19d8c.MOV',
    poster: '/images/basketball/IMG_5504.JPG',
    label: 'Game Action',
    featured: true,
  },
  {
    src: '/videos/basketball/13f27e29c219419d852eac4f5ef134dd.MOV',
    poster: '/images/basketball/1DCFE9D5-F638-4842-A9D6-793DB9350066.JPG',
    label: 'Skills',
    featured: false,
  },
  {
    src: '/videos/basketball/6536a9824ab348f29c26ce57c181f307.MOV',
    poster: '/images/basketball/09C7861A-0733-4818-B9AF-077EC300A440.JPG',
    label: 'Training',
    featured: false,
  },
  {
    src: '/videos/basketball/6f40c6f056194535a398d54f76c6f2da.MOV',
    poster: '/images/basketball/342A3669-0A8F-4616-89F2-89B1C8B3DDF5.JPG',
    label: 'Workout',
    featured: false,
  },
  {
    src: '/videos/basketball/69722150427940f68a4a967b2ba80576.MOV',
    poster: '/images/basketball/2516F603-3659-4D99-A163-D276CFF02C2F.JPG',
    label: 'Practice',
    featured: false,
  },
]

export const clubHostingVideos = [
  {
    src: '/videos/events/5893e5fd7bfc44d6a422765f2277d665.MOV',
    poster: '/images/events/IMG_3457.jpg',
    label: 'Club Night',
    featured: true,
  },
  {
    src: '/videos/events/d478bfa5726949438ca2f506c332a6bc.MOV',
    poster: '/images/events/C8593DE0-E4F4-4BBA-A145-B5318AB30E90.JPG',
    label: 'VIP Section',
    featured: true,
  },
  {
    src: '/videos/events/9f90e8aa68434121b10f738f483e53f2.MOV',
    poster: '/images/events/BE564DC8-2241-4DC9-969F-8CA7F99D25AE.jpg',
    label: 'Hosting',
    featured: false,
  },
  {
    src: '/videos/events/5089b366326446a49925a5305985a148.MOV',
    poster: '/images/events/IMG_3735.jpg',
    label: 'Event',
    featured: false,
  },
]

export const brandVideos = [
  {
    src: '/videos/events/37f8ca3c904745f7a7c16d2da3e44b5c.MOV',
    poster: '/images/brand-campaigns/A1905360-DC17-4045-A863-A0E4BAFE6DD2.JPG',
    label: 'Brand Shoot',
    featured: true,
  },
  {
    src: '/videos/events/90d1467329ec4a3dac3a8658cba48dd8.MOV',
    poster: '/images/brand-campaigns/69F59DD8-E162-4731-B2C3-4FE2654F2948.JPEG',
    label: 'Collab',
    featured: true,
  },
  {
    src: '/videos/events/74c0f77d-1a1a-478d-9184-c71c2c1a88db.MOV',
    poster: '/images/events/IMG_2482.jpg',
    label: 'Promo',
    featured: false,
  },
  {
    src: '/videos/events/F6401E28-2949-4092-BDFF-98C11CA5B439.MOV',
    poster: '/images/events/4430EAE3-2CD3-4285-9892-9494FA6EE94F.JPG',
    label: 'Content',
    featured: false,
  },
]

export const socialVideos = [
  {
    src: '/videos/social/filtered-2F916CF0-0B8F-42E2-839A-B21C7B0D264C.MOV',
    poster: '/images/media-flyers/mhf.jpg',
    label: 'Social',
    featured: true,
  },
  {
    src: '/videos/social/filtered-5A24BB8F-BE3D-4C29-8EBA-4571FA6DBF86.MOV',
    poster: '/images/events/DBAEFDA8-FB32-499C-BF46-4B55DCAEC8C6.JPG',
    label: 'BTS',
    featured: false,
  },
]

export const heroVideos = [
  {
    src: '/videos/hero/hero-bg.mp4',
    poster: '/images/hero/hero-poster.jpg',
    label: 'Hero',
  },
  {
    src: '/videos/hero/vertical-highlight.mp4',
    poster: '/images/hero/vertical-poster.jpg',
    label: 'Vertical',
  },
]

// ============================================
// COMBINED EXPORTS FOR EASY ACCESS
// ============================================

export const allImages = {
  basketball: basketballImages,
  clubHosting: clubHostingImages,
  lifestyle: lifestyleImages,
  brand: brandImages,
  hero: heroImages,
}

export const allVideos = {
  basketball: basketballVideos,
  clubHosting: clubHostingVideos,
  brand: brandVideos,
  social: socialVideos,
  hero: heroVideos,
}

// Featured content for homepage
export const featuredMedia = {
  images: [
    ...basketballImages.filter(i => i.featured),
    ...clubHostingImages.filter(i => i.featured),
    ...lifestyleImages.filter(i => i.featured),
  ],
  videos: [
    ...basketballVideos.filter(v => v.featured),
    ...clubHostingVideos.filter(v => v.featured),
    ...brandVideos.filter(v => v.featured),
  ],
}

// Category definitions for navigation
export const mediaCategories = [
  {
    id: 'basketball',
    label: 'Basketball',
    description: 'On-court action and highlights',
    icon: 'basketball' as const,
    imageCount: basketballImages.length,
    videoCount: basketballVideos.length,
  },
  {
    id: 'hosting',
    label: 'Club Hosting',
    description: 'VIP events and nightlife',
    icon: 'mic' as const,
    imageCount: clubHostingImages.length,
    videoCount: clubHostingVideos.length,
  },
  {
    id: 'lifestyle',
    label: 'Lifestyle',
    description: 'Behind the scenes and daily life',
    icon: 'star' as const,
    imageCount: lifestyleImages.length,
    videoCount: socialVideos.length,
  },
  {
    id: 'brand',
    label: 'Brand Work',
    description: 'Campaigns and collaborations',
    icon: 'diamond' as const,
    imageCount: brandImages.length,
    videoCount: brandVideos.length,
  },
]
