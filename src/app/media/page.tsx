'use client'

/**
 * MH5 MEDIA PAGE
 * ==============
 * Media gallery with press coverage and social content
 */

import { useState, useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'

const pressFeatures = [
  {
    outlet: 'MassLive',
    title: 'Milan Harrison returns to Western Mass ranks on a mission',
    date: '2023',
    url: 'https://www.masslive.com/highschoolsports/article/milan-harrison-returns-to-the-western-mass-ranks-on-a-mission-with-no-2-putnam-boys-basketball-team-photos/',
  },
  {
    outlet: 'WWLP',
    title: 'Basketball recruit from Springfield gives back to his community',
    date: '2022',
    url: 'https://www.wwlp.com/news/local-news/hampden-county/basketball-recruit-from-springfield-gives-back-to-his-community/',
  },
  {
    outlet: 'The Report Magazine',
    title: 'Milan Harrison: Star Basketball Player Plans to Pursue Professional Career',
    date: '2023',
    url: 'https://www.therreportmag.com/milan-harrison-star-basketball-player-plans-to-pursue-professional-career/',
  },
  {
    outlet: 'Wooter Apparel',
    title: "Prodigy Prep's Julian Newman, Milan Harrison Shining in Wooter Apparel",
    date: '2020',
    url: 'https://wooterapparel.com/blog/tag/Milan+Harrison',
  },
]

const verticalVideos = [
  {
    src: '/videos/basketball/26e44d220245495a8a592c0002ace524.MOV',
    label: 'Highlights',
  },
  {
    src: '/videos/basketball/67df5ad85df7404a81f2d6e311e19d8c.MOV',
    label: 'Game Action',
  },
  {
    src: '/videos/basketball/6536a9824ab348f29c26ce57c181f307.MOV',
    label: 'Skills',
  },
  {
    src: '/videos/basketball/6f40c6f056194535a398d54f76c6f2da.MOV',
    label: 'Workout',
  },
  {
    src: '/videos/events/9f90e8aa68434121b10f738f483e53f2.MOV',
    label: 'Tournament',
  },
  {
    src: '/videos/events/5893e5fd7bfc44d6a422765f2277d665.MOV',
    label: 'Club Night',
  },
  {
    src: '/videos/events/d478bfa5726949438ca2f506c332a6bc.MOV',
    label: 'VIP Section',
  },
  {
    src: '/videos/events/5089b366326446a49925a5305985a148.MOV',
    label: 'Crowd Energy',
  },
  {
    src: '/videos/brand-campaigns/37f8ca3c904745f7a7c16d2da3e44b5c.MOV',
    label: 'Brand Shoot',
  },
  {
    src: '/videos/brand-campaigns/90d1467329ec4a3dac3a8658cba48dd8.MOV',
    label: 'Campaign',
  },
]

const photoGallery = [
  // Basketball photos
  { src: '/images/basketball/123_1.JPEG', alt: 'Game action' },
  { src: '/images/basketball/IMG_2493.JPG', alt: 'Jump shot' },
  { src: '/images/basketball/IMG_5504.JPG', alt: 'Training' },
  { src: '/images/basketball/09C7861A-0733-4818-B9AF-077EC300A440.JPG', alt: 'Skills' },
  { src: '/images/basketball/1DCFE9D5-F638-4842-A9D6-793DB9350066.JPG', alt: 'Action' },
  { src: '/images/basketball/2516F603-3659-4D99-A163-D276CFF02C2F.JPG', alt: 'Gameplay' },
  { src: '/images/basketball/278543FD-E8F1-48C4-B12D-F5014265F665.JPG', alt: 'Workout' },
  { src: '/images/basketball/342A3669-0A8F-4616-89F2-89B1C8B3DDF5.JPG', alt: 'Performance' },
  // Event photos
  { src: '/images/events/e0857ff9-f9da-4a3d-9d21-4f538c744511.JPG', alt: 'Tournament' },
  { src: '/images/events/IMG_3456.jpg', alt: 'Club hosting' },
  { src: '/images/events/IMG_4139.jpg', alt: 'VIP section' },
  { src: '/images/events/IMG_4501.jpg', alt: 'Event energy' },
  { src: '/images/events/IMG_1424.jpg', alt: 'Stage' },
  { src: '/images/events/IMG_2482.jpg', alt: 'Crowd' },
  { src: '/images/events/Sony-2666.JPG', alt: 'Showcase' },
  { src: '/images/events/C8593DE0-E4F4-4BBA-A145-B5318AB30E90.JPG', alt: 'Performance' },
  { src: '/images/events/BE564DC8-2241-4DC9-969F-8CA7F99D25AE.jpg', alt: 'Celebration' },
  { src: '/images/events/3AFC5E5E-A1FA-4E30-9D2B-6263B98B922C.JPG', alt: 'Event' },
  // Brand campaign photos
  { src: '/images/events/898f9a5d-4f08-4e70-b654-ae4cce89e350.JPG', alt: 'Brand shoot' },
  { src: '/images/brand-campaigns/A8A2681C-EE12-4329-B186-53D5C364CA5B.JPG', alt: 'Campaign' },
  { src: '/images/brand-campaigns/A1905360-DC17-4045-A863-A0E4BAFE6DD2.JPG', alt: 'Partnership' },
  { src: '/images/brand-campaigns/69F59DD8-E162-4731-B2C3-4FE2654F2948.JPEG', alt: 'Collaboration' },
]

export default function MediaPage() {
  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Video Feed */}
      <VideoFeedSection />

      {/* Photo Gallery */}
      <PhotoGallerySection />

      {/* Press Section */}
      <PressSection />

      {/* CTA Section */}
      <CTASection />
        </div>
  )
}

// ============================================
// HERO SECTION
// ============================================
function HeroSection() {
  return (
    <section className="relative pt-20 sm:pt-24 lg:pt-32 pb-8 sm:pb-12 px-5 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-3 sm:mb-4">
            Media <span className="text-[var(--color-primary)]">Gallery</span>
          </h1>
          <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto px-2">
            Basketball highlights, events, and behind-the-scenes content from the MH5 journey.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

// ============================================
// VIDEO FEED SECTION
// ============================================
function VideoFeedSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section ref={ref} className="py-8 sm:py-10 lg:py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-between px-5 sm:px-6 lg:px-8 mb-4 sm:mb-5">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">Featured Videos</h2>
            <p className="text-xs sm:text-sm text-gray-500">Latest content</p>
          </div>
        </div>

        {/* Horizontal scroll video feed */}
        <div className="flex gap-3 sm:gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-5 sm:px-6 lg:px-8 pb-2">
          {verticalVideos.map((video, index) => (
            <VideoCard key={index} video={video} index={index} />
          ))}
        </div>
      </motion.div>
    </section>
  )
}

function VideoCard({ video, index }: { video: typeof verticalVideos[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="flex-shrink-0 snap-center w-[140px] sm:w-[160px] lg:w-[180px] aspect-[9/16] rounded-xl sm:rounded-2xl overflow-hidden bg-black/30 relative group"
    >
      <video
        src={video.src}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        playsInline
        loop
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 pointer-events-none" />

      {/* Label */}
      {video.label && (
        <div className="absolute bottom-2 left-2 right-2">
          <span className="inline-block px-2 py-1 bg-[var(--color-primary)] text-black text-[10px] font-bold rounded-lg uppercase tracking-wide">
            {video.label}
          </span>
        </div>
      )}
    </motion.div>
  )
}

// ============================================
// PHOTO GALLERY SECTION
// ============================================
function PhotoGallerySection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  return (
    <section ref={ref} className="py-8 sm:py-10 lg:py-12 px-5 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-4 sm:mb-5">
          <h2 className="text-xl sm:text-2xl font-bold text-white">Photo Gallery</h2>
          <p className="text-xs sm:text-sm text-gray-500">Highlights & moments</p>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
          {photoGallery.map((photo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              className="aspect-square rounded-lg sm:rounded-xl overflow-hidden cursor-pointer group"
              onClick={() => setSelectedImage(photo.src)}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition"
            onClick={() => setSelectedImage(null)}
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <img
            src={selectedImage}
            alt="Enlarged view"
            className="max-w-full max-h-[80vh] rounded-lg object-contain"
          />
        </div>
      )}
    </section>
  )
}

// ============================================
// PRESS SECTION
// ============================================
function PressSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section ref={ref} className="py-10 sm:py-12 lg:py-16 px-5 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto"
      >
        <div className="mb-5 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white">Press Coverage</h2>
          <p className="text-xs sm:text-sm text-gray-500">Featured in the media</p>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {pressFeatures.map((feature, index) => (
            <motion.a
              key={feature.outlet}
              href={feature.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              className="block bg-white/5 rounded-lg sm:rounded-xl p-4 sm:p-5 border border-white/10 hover:border-[var(--color-primary)]/30 transition-all group"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[var(--color-primary)] font-semibold text-xs sm:text-sm">
                      {feature.outlet}
                    </span>
                    <span className="text-gray-600">•</span>
                    <span className="text-gray-500 text-[10px] sm:text-xs">{feature.date}</span>
                  </div>
                  <h3 className="text-white text-sm sm:text-base font-medium line-clamp-2 group-hover:text-[var(--color-primary)] transition-colors">
                    {feature.title}
                  </h3>
                </div>
                <svg
                  className="w-4 h-4 text-gray-500 group-hover:text-[var(--color-primary)] transition-colors flex-shrink-0 mt-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                  />
                </svg>
              </div>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

// ============================================
// CTA SECTION
// ============================================
function CTASection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section ref={ref} className="py-16 sm:py-20 lg:py-24 px-5 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2 sm:mb-3">
          Media <span className="text-[var(--color-primary)]">Inquiries</span>
        </h2>
        <p className="text-gray-400 text-sm sm:text-base mb-5 sm:mb-6 max-w-md mx-auto px-2">
          For interview requests, press features, or additional media assets
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center h-11 sm:h-12 px-5 sm:px-6 bg-[var(--color-primary)] text-black font-bold text-[13px] sm:text-[14px] uppercase tracking-widest hover:brightness-105 transition-all hover:-translate-y-0.5"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Contact Media Team
        </Link>
      </motion.div>
    </section>
  )
}
