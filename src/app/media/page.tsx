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

// All available videos - including new additions
const verticalVideos = [
  // Basketball videos
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
    src: '/videos/basketball/69722150427940f68a4a967b2ba80576.MOV',
    label: 'Training',
  },
  {
    src: '/videos/basketball/13f27e29c219419d852eac4f5ef134dd.MOV',
    label: 'Performance',
  },
  {
    src: '/videos/basketball/88b0d1582ab545f8befd9ad80dabd80f.MOV',
    label: 'Highlights',
  },
  // Event videos - all available
  {
    src: '/videos/events/26b5dca7c1d348c0866fbb02e4f3d241.MOV',
    label: 'Event',
  },
  {
    src: '/videos/events/37f8ca3c904745f7a7c16d2da3e44b5c.MOV',
    label: 'Tournament',
  },
  {
    src: '/videos/events/4e14c7c11ff043afbd523f184c7a3999.MOV',
    label: 'Event',
  },
  {
    src: '/videos/events/5089b366326446a49925a5305985a148.MOV',
    label: 'Crowd Energy',
  },
  {
    src: '/videos/events/5893e5fd7bfc44d6a422765f2277d665.MOV',
    label: 'Club Night',
  },
  {
    src: '/videos/events/70965acdb9d5482c9035562525803230.MOV',
    label: 'Live Event',
  },
  {
    src: '/videos/events/74c0f77d-1a1a-478d-9184-c71c2c1a88db.MOV',
    label: 'Event',
  },
  {
    src: '/videos/events/7efaf7eb3b9a4babb2b824c773d971b2.MOV',
    label: 'Event',
  },
  {
    src: '/videos/events/8aa44a60cf7f4630996aa4d294ce9568.MOV',
    label: 'Event',
  },
  {
    src: '/videos/events/90d1467329ec4a3dac3a8658cba48dd8.MOV',
    label: 'Event',
  },
  {
    src: '/videos/events/964f999e6f0f4496b7593e267ba109d1.MOV',
    label: 'Event',
  },
  {
    src: '/videos/events/9f90e8aa68434121b10f738f483e53f2.MOV',
    label: 'Tournament',
  },
  {
    src: '/videos/events/F6401E28-2949-4092-BDFF-98C11CA5B439.MOV',
    label: 'Event',
  },
  {
    src: '/videos/events/IMG_0680.MOV',
    label: 'Event',
  },
  {
    src: '/videos/events/IMG_2421.mov',
    label: 'Event',
  },
  {
    src: '/videos/events/a49c7a65cf3549fba727b57bcec1bddc.MOV',
    label: 'Event',
  },
  {
    src: '/videos/events/c7ae7027582a43399c46595e1203d9a4.MOV',
    label: 'Event',
  },
  {
    src: '/videos/events/cb31bf2b613042c197eb1e91563637a0.MOV',
    label: 'Event',
  },
  {
    src: '/videos/events/d11f4e200d3d4174940ce130366e3698.MOV',
    label: 'Event',
  },
  {
    src: '/videos/events/d478bfa5726949438ca2f506c332a6bc.MOV',
    label: 'VIP Section',
  },
  {
    src: '/videos/events/d9e745c8f9c848af8356513ac8b3daab.MOV',
    label: 'Event',
  },
  {
    src: '/videos/events/ecdaf770de5641a49205034cc0bf0a66.MOV',
    label: 'Event',
  },
  // Brand campaign videos
  {
    src: '/videos/brand-campaigns/37f8ca3c904745f7a7c16d2da3e44b5c.MOV',
    label: 'Brand Shoot',
  },
  {
    src: '/videos/brand-campaigns/90d1467329ec4a3dac3a8658cba48dd8.MOV',
    label: 'Campaign',
  },
]

// Comprehensive photo gallery - all available images
const photoGallery = [
  // Basketball photos
  { src: '/images/basketball/09C7861A-0733-4818-B9AF-077EC300A440.JPG', alt: 'Basketball action' },
  { src: '/images/basketball/1DCFE9D5-F638-4842-A9D6-793DB9350066.JPG', alt: 'Basketball skills' },
  { src: '/images/basketball/2516F603-3659-4D99-A163-D276CFF02C2F.JPG', alt: 'Gameplay' },
  { src: '/images/basketball/342A3669-0A8F-4616-89F2-89B1C8B3DDF5.JPG', alt: 'Performance' },
  { src: '/images/basketball/IMG_2493.JPG', alt: 'Jump shot' },
  { src: '/images/basketball/IMG_5504.JPG', alt: 'Training' },
  // Event photos - comprehensive list
  { src: '/images/events/240C9647-1DCD-4045-8070-C69CC4C00920.jpg', alt: 'Event moment' },
  { src: '/images/events/3ACAF232-CC27-4EB8-99DE-2322AC204F28.jpg', alt: 'Event moment' },
  { src: '/images/events/3AFC5E5E-A1FA-4E30-9D2B-6263B98B922C.JPG', alt: 'Event' },
  { src: '/images/events/3B027662-DE3B-4A1B-8441-8412D0215E16.JPG', alt: 'Event' },
  { src: '/images/events/4430EAE3-2CD3-4285-9892-9494FA6EE94F.JPG', alt: 'Event' },
  { src: '/images/events/44F18296-1548-499D-B085-A2B4998D80F9.jpg', alt: 'Event' },
  { src: '/images/events/856B54AD-FCA3-4477-B871-A9D03CB7B1F3.JPG', alt: 'Event' },
  { src: '/images/events/88BE14ED-B9D6-460B-BDA3-D892F086EDC4.JPG', alt: 'Event' },
  { src: '/images/events/898f9a5d-4f08-4e70-b654-ae4cce89e350.JPG', alt: 'Brand shoot' },
  { src: '/images/events/92C52557-B021-428B-A18B-476A08F37D37.JPG', alt: 'Event' },
  { src: '/images/events/95A0BBC3-F879-4FEC-AA09-B1683ECF65B2.JPG', alt: 'Event' },
  { src: '/images/events/A7407964.jpg', alt: 'Event' },
  { src: '/images/events/B6641C04-9563-44EC-B211-6810D47B15E2.jpg', alt: 'Event' },
  { src: '/images/events/BA2A6014.JPG', alt: 'Event' },
  { src: '/images/events/BE564DC8-2241-4DC9-969F-8CA7F99D25AE.jpg', alt: 'Celebration' },
  { src: '/images/events/C8593DE0-E4F4-4BBA-A145-B5318AB30E90.JPG', alt: 'Performance' },
  { src: '/images/events/D43A39C2-2C80-40FF-A41C-5C28E99F1DB2.JPG', alt: 'Event' },
  { src: '/images/events/DBAEFDA8-FB32-499C-BF46-4B55DCAEC8C6.JPG', alt: 'Event' },
  { src: '/images/events/F904A20E-75E9-4FE9-B441-CB9F32BC68EB.jpg', alt: 'Event' },
  { src: '/images/events/FullSizeRender.jpg', alt: 'Event' },
  { src: '/images/events/Hero image.jpg', alt: 'Hero moment' },
  { src: '/images/events/IMG_0176.jpg', alt: 'Event moment' },
  { src: '/images/events/IMG_0746.jpg', alt: 'Event moment' },
  { src: '/images/events/IMG_0813.JPG', alt: 'Event moment' },
  { src: '/images/events/IMG_0899.jpg', alt: 'Event moment' },
  { src: '/images/events/IMG_0979.jpg', alt: 'Event moment' },
  { src: '/images/events/IMG_1424.jpg', alt: 'Stage' },
  { src: '/images/events/IMG_1466.jpg', alt: 'Event moment' },
  { src: '/images/events/IMG_1754.JPG', alt: 'Event moment' },
  { src: '/images/events/IMG_1835.jpg', alt: 'Event moment' },
  { src: '/images/events/IMG_1836.jpg', alt: 'Event moment' },
  { src: '/images/events/IMG_2014.jpg', alt: 'Event moment' },
  { src: '/images/events/IMG_2095.jpg', alt: 'Event moment' },
  { src: '/images/events/IMG_2102.jpg', alt: 'Event moment' },
  { src: '/images/events/IMG_2428.jpg', alt: 'Event moment' },
  { src: '/images/events/IMG_2480.jpg', alt: 'Event moment' },
  { src: '/images/events/IMG_2482.jpg', alt: 'Crowd' },
  { src: '/images/events/IMG_3072.jpg', alt: 'Event moment' },
  { src: '/images/events/IMG_3307.jpg', alt: 'Event moment' },
  { src: '/images/events/IMG_3456.jpg', alt: 'Club hosting' },
  { src: '/images/events/IMG_3457.jpg', alt: 'Event moment' },
  { src: '/images/events/IMG_3606.jpg', alt: 'Event moment' },
  { src: '/images/events/IMG_3735.jpg', alt: 'Event moment' },
  { src: '/images/events/IMG_3820.JPG', alt: 'Event moment' },
  { src: '/images/events/IMG_4010.jpg', alt: 'Event moment' },
  { src: '/images/events/IMG_4129.jpg', alt: 'Event moment' },
  { src: '/images/events/IMG_4134.jpg', alt: 'Event moment' },
  { src: '/images/events/IMG_4139.jpg', alt: 'VIP section' },
  { src: '/images/events/IMG_4158.jpg', alt: 'Event moment' },
  { src: '/images/events/IMG_4169.jpg', alt: 'Event moment' },
  { src: '/images/events/IMG_4205.jpg', alt: 'Event moment' },
  { src: '/images/events/IMG_4495.jpg', alt: 'Event moment' },
  { src: '/images/events/IMG_4501.jpg', alt: 'Event energy' },
  { src: '/images/events/IMG_4508.jpg', alt: 'Event moment' },
  { src: '/images/events/IMG_4731.jpg', alt: 'Event moment' },
  { src: '/images/events/IMG_4847.jpg', alt: 'Event moment' },
  { src: '/images/events/IMG_4916.JPG', alt: 'Event moment' },
  { src: '/images/events/IMG_5062.jpg', alt: 'Event moment' },
  { src: '/images/events/IMG_5130.jpg', alt: 'Event moment' },
  { src: '/images/events/IMG_5432.jpg', alt: 'Event moment' },
  { src: '/images/events/IMG_5893.jpg', alt: 'Event moment' },
  { src: '/images/events/IMG_6577.jpg', alt: 'Event moment' },
  { src: '/images/events/IMG_7115.jpg', alt: 'Event moment' },
  { src: '/images/events/IMG_7437.jpg', alt: 'Event moment' },
  { src: '/images/events/IMG_8738.JPG', alt: 'Event moment' },
  { src: '/images/events/MHF.jpg', alt: 'MH5 brand' },
  { src: '/images/events/Sony-2666.JPG', alt: 'Showcase' },
  { src: '/images/events/e0857ff9-f9da-4a3d-9d21-4f538c744511.JPG', alt: 'Tournament' },
  // Brand campaign photos - all available
  { src: '/images/brand-campaigns/278543FD-E8F1-48C4-B12D-F5014265F665.JPG', alt: 'Brand campaign' },
  { src: '/images/brand-campaigns/A7407964.jpg', alt: 'Brand campaign' },
  { src: '/images/brand-campaigns/A8A2681C-EE12-4329-B186-53D5C364CA5B.JPG', alt: 'Campaign' },
  { src: '/images/brand-campaigns/B6641C04-9563-44EC-B211-6810D47B15E2.jpg', alt: 'Brand campaign' },
  { src: '/images/brand-campaigns/IMG_4508.jpg', alt: 'Brand campaign' },
  { src: '/images/brand-campaigns/IMG_5062.jpg', alt: 'Brand campaign' },
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
    <section ref={ref} className="py-8 sm:py-10 lg:py-12 px-5 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Press Coverage</h2>
          <p className="text-xs sm:text-sm text-gray-500">Media features and articles</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
          {pressFeatures.map((feature, index) => (
            <motion.a
              key={index}
              href={feature.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="block p-4 sm:p-6 bg-[#111] rounded-lg border border-[#222] hover:border-[var(--color-primary)] transition-colors group"
            >
              <div className="flex items-start justify-between gap-4 mb-2">
                <span className="text-xs font-bold text-[var(--color-primary)] uppercase tracking-wide">
                  {feature.outlet}
                </span>
                <span className="text-xs text-gray-500">{feature.date}</span>
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-white group-hover:text-[var(--color-primary)] transition-colors">
                {feature.title}
              </h3>
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
  return (
    <section className="py-12 sm:py-16 lg:py-20 px-5 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-4">
            Follow the Journey
          </h2>
          <p className="text-gray-400 text-base sm:text-lg mb-8 max-w-xl mx-auto">
            Stay connected with MH5 for the latest updates, events, and exclusive content.
          </p>
          <Link
            href="/events"
            className="inline-block px-8 py-4 bg-[var(--color-primary)] text-black font-bold uppercase tracking-widest rounded-lg hover:bg-[var(--color-secondary)] transition-colors"
          >
            View Upcoming Events
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
