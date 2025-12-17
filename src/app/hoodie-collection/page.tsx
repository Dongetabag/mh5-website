'use client'

import { useEffect, useState } from 'react'

interface HoodieDesign {
  image: string
  variant: string
  description: string
}

const hoodieData: HoodieDesign[] = [
  {
    image: '/images/hoodie-designs/designed-hoodies/Snow Wash Fleece Oversize Hoodie-gallery-1-classic-front.png',
    variant: 'Classic Front',
    description: 'Small logo centered on chest, clean and professional. Perfect for subtle branding.',
  },
  {
    image: '/images/hoodie-designs/designed-hoodies/Snow Wash Fleece Oversize Hoodie-gallery-1-classic-back.png',
    variant: 'Classic Back',
    description: 'Large bold logo on back center. Maximum brand visibility and impact.',
  },
  {
    image: '/images/hoodie-designs/designed-hoodies/Snow Wash Fleece Oversize Hoodie-gallery-1-minimal-corner.png',
    variant: 'Minimal Corner',
    description: 'Small logo on front left chest corner. Subtle, premium branding.',
  },
  {
    image: '/images/hoodie-designs/designed-hoodies/Snow Wash Fleece Oversize Hoodie-gallery-1-oversized-back.png',
    variant: 'Oversized Back',
    description: 'Dominant back design covering most of the area. Streetwear aesthetic.',
  },
  {
    image: '/images/hoodie-designs/designed-hoodies/Snow Wash Fleece Oversize Hoodie-gallery-10-classic-front.png',
    variant: 'Classic Front',
    description: 'Small logo centered on chest, clean and professional. Perfect for subtle branding.',
  },
  {
    image: '/images/hoodie-designs/designed-hoodies/Snow Wash Fleece Oversize Hoodie-gallery-10-classic-back.png',
    variant: 'Classic Back',
    description: 'Large bold logo on back center. Maximum brand visibility and impact.',
  },
  {
    image: '/images/hoodie-designs/designed-hoodies/Snow Wash Fleece Oversize Hoodie-gallery-10-minimal-corner.png',
    variant: 'Minimal Corner',
    description: 'Small logo on front left chest corner. Subtle, premium branding.',
  },
  {
    image: '/images/hoodie-designs/designed-hoodies/Snow Wash Fleece Oversize Hoodie-gallery-10-oversized-back.png',
    variant: 'Oversized Back',
    description: 'Dominant back design covering most of the area. Streetwear aesthetic.',
  },
  {
    image: '/images/hoodie-designs/designed-hoodies/Snow Wash Fleece Oversize Hoodie-gallery-11-classic-front.png',
    variant: 'Classic Front',
    description: 'Small logo centered on chest, clean and professional. Perfect for subtle branding.',
  },
  {
    image: '/images/hoodie-designs/designed-hoodies/Snow Wash Fleece Oversize Hoodie-gallery-11-classic-back.png',
    variant: 'Classic Back',
    description: 'Large bold logo on back center. Maximum brand visibility and impact.',
  },
  {
    image: '/images/hoodie-designs/designed-hoodies/Snow Wash Fleece Oversize Hoodie-gallery-11-oversized-back.png',
    variant: 'Oversized Back',
    description: 'Dominant back design covering most of the area. Streetwear aesthetic.',
  },
]

export default function HoodieCollectionPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const uniqueHoodies = new Set(
    hoodieData.map((h) => h.image.split('-').slice(0, -1).join('-'))
  ).size

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="text-[#7DF9FF] text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F5F5] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-[#7DF9FF] mb-4">
            🏀 MH5 HOODIE COLLECTION
          </h1>
          <p className="text-lg text-[#F5F5F5]/70">
            Premium Hoodie Designs - Neon Cyan Branding
          </p>
        </div>

        {/* Collection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {hoodieData.map((hoodie, index) => (
            <div
              key={index}
              className="bg-[#1A1A1A] rounded-xl overflow-hidden border-2 border-[#7DF9FF]/20 hover:border-[#7DF9FF] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(125,249,255,0.2)]"
            >
              <div className="aspect-square bg-[#2A2A2A] overflow-hidden">
                <img
                  src={hoodie.image}
                  alt={hoodie.variant}
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#7DF9FF] mb-2">
                  ✨ {hoodie.variant}
                </h3>
                <p className="text-sm text-[#F5F5F5]/70 leading-relaxed">
                  {hoodie.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="bg-[#1A1A1A] rounded-xl border-2 border-[#7DF9FF]/20 p-8 mb-16">
          <h2 className="text-2xl font-bold text-[#7DF9FF] text-center mb-8">
            Collection Stats
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#7DF9FF] mb-2">
                {hoodieData.length}
              </div>
              <div className="text-sm text-[#F5F5F5]/70">Total Designs</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#7DF9FF] mb-2">4</div>
              <div className="text-sm text-[#F5F5F5]/70">Design Variants</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#7DF9FF] mb-2">
                {uniqueHoodies}
              </div>
              <div className="text-sm text-[#F5F5F5]/70">Hoodie Images</div>
            </div>
          </div>
        </div>

        {/* Brand Info */}
        <div className="bg-gradient-to-br from-[#7DF9FF]/10 to-[#9DFBFF]/10 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-[#7DF9FF] mb-4">
            Design Details
          </h2>
          <p className="text-[#F5F5F5]/80 leading-relaxed max-w-3xl mx-auto">
            All designs feature the MH5 logo in Neon Cyan (#7DF9FF), carefully
            placed using AI-generated specifications. Each variant is optimized
            for maximum brand visibility while maintaining a premium aesthetic.
          </p>
        </div>
      </div>
    </div>
  )
}

