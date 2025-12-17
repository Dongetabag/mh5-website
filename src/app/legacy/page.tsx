'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState } from 'react'

/**
 * LEGACY PAGE - Visual Storytelling
 * ==================================
 * An immersive journey through Milan Harrison's basketball career
 * Featuring videos, photos, and timeline in a rich visual narrative
 */

export default function LegacyPage() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null)

  // Basketball videos for the vertical video reel
  const basketballVideos = [
    { src: '/videos/basketball/26e44d220245495a8a592c0002ace524.MOV', label: 'Highlights', era: 'Prodigy Prep' },
    { src: '/videos/basketball/67df5ad85df7404a81f2d6e311e19d8c.MOV', label: 'Game Day', era: 'Western Mass' },
    { src: '/videos/basketball/13f27e29c219419d852eac4f5ef134dd.MOV', label: 'Training', era: 'Development' },
    { src: '/videos/basketball/69722150427940f68a4a967b2ba80576.MOV', label: 'Skills', era: 'Fundamentals' },
    { src: '/videos/basketball/6f40c6f056194535a398d54f76c6f2da.MOV', label: 'Showcase', era: 'Elite Level' },
    { src: '/videos/basketball/88b0d1582ab545f8befd9ad80dabd80f.MOV', label: 'Workout', era: 'Daily Grind' },
  ]

  // Timeline with associated photos for each era
  const timelineEras = [
    {
      year: '2015-2017',
      title: 'Springfield Origins',
      subtitle: 'Where It All Began',
      description: 'Born and raised in Springfield, Massachusetts - the birthplace of basketball. From the neighborhood courts of the City of Homes, a future star was developing his craft.',
      photos: [
        '/images/basketball/IMG_2493.JPG',
        '/images/basketball/IMG_5504.JPG',
        '/images/basketball/342A3669-0A8F-4616-89F2-89B1C8B3DDF5.JPG',
      ],
      stats: [
        { value: 'Springfield', label: 'Birthplace of Basketball' },
        { value: '1891', label: 'Year Basketball Was Invented Here' },
      ],
      color: 'from-blue-500/20',
    },
    {
      year: '2018-2019',
      title: 'Putnam Vocational Era',
      subtitle: 'Rising Through The Ranks',
      description: 'Emerged as a dominant force at Putnam Vocational High School. Named to Western Mass ranks and began gaining regional recognition as one of the elite guards in the area.',
      photos: [
        '/images/basketball/IMG_1466.jpg',
        '/images/basketball/IMG_3072.jpg',
        '/images/basketball/IMG_0899.jpg',
      ],
      stats: [
        { value: '1x', label: 'Super 7 Selection' },
        { value: 'Top', label: 'Western Mass Guard' },
      ],
      color: 'from-green-500/20',
    },
    {
      year: '2019-2022',
      title: 'Super 7 Dominance',
      subtitle: 'Four Consecutive Years',
      description: 'Four consecutive years as a Super 7 selection - establishing dominance as one of the elite players in Western Massachusetts. The numbers spoke, but the game spoke louder.',
      photos: [
        '/images/basketball/IMG_8738.JPG',
        '/images/basketball/856B54AD-FCA3-4477-B871-A9D03CB7B1F3.JPG',
        '/images/basketball/Hero image.jpg',
      ],
      stats: [
        { value: '4x', label: 'Super 7 Selections' },
        { value: '#1', label: 'Western Mass Guard' },
      ],
      color: 'from-yellow-500/20',
    },
    {
      year: '2020',
      title: 'Prodigy Prep Era',
      subtitle: 'The Florida Chapter',
      description: 'Joined Prodigy Prep in Central Florida, playing alongside viral sensation Julian Newman. Made an immediate impact with 65 points in the first two games and led the program to its historic first win with 27 points.',
      photos: [
        '/images/basketball/2516F603-3659-4D99-A163-D276CFF02C2F.JPG',
        '/images/basketball/09C7861A-0733-4818-B9AF-077EC300A440.JPG',
        '/images/basketball/3B027662-DE3B-4A1B-8441-8412D0215E16.JPG',
      ],
      stats: [
        { value: '65', label: 'Points in First 2 Games' },
        { value: '27', label: 'Points in Historic Win' },
      ],
      color: 'from-orange-500/20',
    },
    {
      year: '2021-2023',
      title: 'National Spotlight',
      subtitle: 'Brand Building & Recognition',
      description: 'Featured in Wooter Apparel campaigns and media coverage expanded with features in MassLive, WWLP, and The Report Magazine. Drew inspiration from meaningful conversations with Stephen Curry dating back to 8th grade.',
      photos: [
        '/images/basketball/IMG_4495.jpg',
        '/images/basketball/IMG_4501.jpg',
        '/images/basketball/IMG_4508.jpg',
      ],
      stats: [
        { value: '500K+', label: 'Social Following' },
        { value: 'Steph', label: 'Curry Connection' },
      ],
      color: 'from-purple-500/20',
    },
    {
      year: '2024',
      title: 'The Movement Has 5ive',
      subtitle: 'MH5 Brand Launch',
      description: 'Launched the MH5 brand - combining basketball excellence with entertainment influence. Event hosting, tournament organization, and global partnership pursuit. The movement is just beginning.',
      photos: [
        '/images/basketball/IMG_7115.jpg',
        '/images/basketball/IMG_4731.jpg',
        '/images/basketball/IMG_4916.JPG.jpg',
      ],
      stats: [
        { value: '10+', label: 'Events Hosted' },
        { value: 'Global', label: 'Partnership Pursuit' },
      ],
      color: 'from-[var(--color-primary)]/20',
    },
  ]

  // Photo gallery grid for visual impact
  const galleryPhotos = [
    '/images/basketball/IMG_1424.jpg',
    '/images/basketball/IMG_1835.jpg',
    '/images/basketball/IMG_1836.jpg',
    '/images/basketball/IMG_2014.jpg',
    '/images/basketball/IMG_2095.jpg',
    '/images/basketball/IMG_2102.jpg',
    '/images/basketball/240C9647-1DCD-4045-8070-C69CC4C00920.jpg',
    '/images/basketball/e0857ff9-f9da-4a3d-9d21-4f538c744511.JPG',
    '/images/basketball/92C52557-B021-428B-A18B-476A08F37D37.JPG',
    '/images/basketball/IMG_0746.jpg',
    '/images/basketball/1DCFE9D5-F638-4842-A9D6-793DB9350066.JPG',
    '/images/basketball/IMG_0813.JPG',
  ]

  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      {/* Hero - Cinematic Opening */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background video */}
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          >
            <source src="/videos/basketball/26e44d220245495a8a592c0002ace524.MOV" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#0a0a0a]" />
        </div>

        {/* Animated gradient orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[var(--color-primary)]/10 rounded-full blur-[150px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[var(--color-secondary)]/10 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 text-center py-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="inline-block bg-[var(--color-primary)] text-black px-6 py-2 text-xs md:text-sm font-bold uppercase tracking-[0.4em] mb-8"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              The Story Behind The Movement
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-5xl sm:text-7xl lg:text-9xl font-bold leading-[0.85] mb-6"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              <span className="text-white block">FROM</span>
              <span className="bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-secondary)] to-white bg-clip-text text-transparent block">
                SPRINGFIELD
              </span>
              <span className="text-white block">TO STARDOM</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-sm md:text-lg text-gray-400 max-w-2xl mx-auto uppercase tracking-widest"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Every champion has an origin story. This is Milan Harrison&apos;s.
            </motion.p>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="flex flex-col items-center gap-3 text-gray-500"
            >
              <span className="text-xs uppercase tracking-[0.3em]">Explore The Journey</span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Vertical Video Reel Section */}
      <section className="py-16 sm:py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[var(--color-primary)]/5 to-[#0a0a0a]" />

        <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 lg:mb-16"
          >
            <span className="inline-block bg-white/10 text-[var(--color-primary)] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.3em] mb-6 border border-white/10" style={{ fontFamily: 'var(--font-heading)' }}>
              On The Court
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              Watch The <span className="text-[var(--color-primary)]">Action</span>
            </h2>
            <p className="text-gray-500 text-base sm:text-lg max-w-xl mx-auto">
              From training sessions to game day highlights - experience the journey through video
            </p>
          </motion.div>

          {/* Video Grid - 3x2 on desktop, horizontal scroll on mobile */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-6">
            {basketballVideos.map((video, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
                onClick={() => setActiveVideo(activeVideo === video.src ? null : video.src)}
              >
                <div className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-[#111] border border-white/10 hover:border-[var(--color-primary)]/50 transition-all duration-300">
                  <video
                    className="absolute inset-0 w-full h-full object-cover"
                    loop
                    muted
                    playsInline
                    autoPlay={activeVideo === video.src}
                    onMouseEnter={(e) => e.currentTarget.play()}
                    onMouseLeave={(e) => { if (activeVideo !== video.src) { e.currentTarget.pause(); e.currentTarget.currentTime = 0; }}}
                  >
                    <source src={video.src} type="video/mp4" />
                  </video>

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40" />

                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-300 ${activeVideo === video.src ? 'opacity-0' : 'opacity-100 group-hover:scale-110 group-hover:bg-[var(--color-primary)]/30'}`}>
                      <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>

                  {/* Labels */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 bg-[var(--color-primary)] text-black text-xs font-bold uppercase tracking-wider rounded-lg">
                      {video.label}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white font-semibold text-sm mb-1">{video.era}</p>
                    <p className="text-gray-400 text-xs uppercase tracking-wider">Milan Harrison</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile horizontal scroll */}
          <div className="lg:hidden">
            <div className="flex gap-4 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide -mx-5 px-5">
              {basketballVideos.map((video, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex-shrink-0 snap-center"
                >
                  <div className="relative w-[200px] sm:w-[240px] aspect-[9/16] rounded-2xl overflow-hidden bg-[#111] border border-white/10">
                    <video
                      className="absolute inset-0 w-full h-full object-cover"
                      loop
                      muted
                      playsInline
                      onTouchStart={(e) => e.currentTarget.play()}
                      onTouchEnd={(e) => { e.currentTarget.pause(); e.currentTarget.currentTime = 0; }}
                    >
                      <source src={video.src} type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 bg-[var(--color-primary)] text-black text-[10px] font-bold uppercase rounded">
                        {video.label}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3">
                      <p className="text-white font-semibold text-xs">{video.era}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Visual Timeline - Photo Story Blocks */}
      <section className="py-16 sm:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 lg:mb-24"
          >
            <span className="inline-block bg-white/10 text-[var(--color-primary)] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.3em] mb-6 border border-white/10" style={{ fontFamily: 'var(--font-heading)' }}>
              The Timeline
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              Chapter By <span className="text-[var(--color-primary)]">Chapter</span>
            </h2>
            <p className="text-gray-500 text-base sm:text-lg max-w-xl mx-auto">
              From neighborhood courts to national headlines - every era told through photos
            </p>
          </motion.div>

          {/* Timeline Blocks */}
          <div className="space-y-24 lg:space-y-32">
            {timelineEras.map((era, index) => (
              <motion.div
                key={era.year}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`relative flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-16 items-center`}
              >
                {/* Photo Collage Side */}
                <div className="w-full lg:w-1/2">
                  <div className="relative">
                    {/* Main large photo */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      className="relative aspect-[4/5] rounded-2xl lg:rounded-3xl overflow-hidden"
                    >
                      <img
                        src={era.photos[0]}
                        alt={era.title}
                        className="w-full h-full object-cover"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${era.color} to-transparent opacity-60`} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                      {/* Year badge on photo */}
                      <div className="absolute top-6 left-6">
                        <span className="px-4 py-2 bg-black/50 backdrop-blur-md text-[var(--color-primary)] text-sm font-bold rounded-lg border border-white/10">
                          {era.year}
                        </span>
                      </div>
                    </motion.div>

                    {/* Smaller photos overlay */}
                    <motion.div
                      initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                      className={`absolute -bottom-8 ${index % 2 === 0 ? '-right-4 lg:-right-8' : '-left-4 lg:-left-8'} flex gap-3`}
                    >
                      {era.photos.slice(1).map((photo, photoIndex) => (
                        <div
                          key={photoIndex}
                          className="w-20 h-28 sm:w-24 sm:h-32 lg:w-28 lg:h-36 rounded-xl overflow-hidden border-2 border-[#0a0a0a] shadow-2xl"
                        >
                          <img
                            src={photo}
                            alt={`${era.title} ${photoIndex + 2}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </motion.div>
                  </div>
                </div>

                {/* Content Side */}
                <div className="w-full lg:w-1/2 pt-12 lg:pt-0">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    {/* Chapter number */}
                    <div className="flex items-center gap-4 mb-6">
                      <span className="w-14 h-14 rounded-xl bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 flex items-center justify-center text-[var(--color-primary)] font-bold text-lg">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
                    </div>

                    <span className="inline-block text-[var(--color-primary)] text-xs font-bold uppercase tracking-[0.3em] mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                      {era.subtitle}
                    </span>

                    <h3 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-white mb-4 lg:mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                      {era.title}
                    </h3>

                    <p className="text-gray-400 text-base sm:text-lg leading-relaxed mb-8">
                      {era.description}
                    </p>

                    {/* Stats */}
                    <div className="flex gap-8">
                      {era.stats.map((stat, statIndex) => (
                        <div key={statIndex}>
                          <div className="text-3xl lg:text-4xl font-bold text-white mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                            {stat.value}
                          </div>
                          <div className="text-xs text-gray-500 uppercase tracking-wider">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery Grid */}
      <section className="py-16 sm:py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--color-primary)]/5 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 lg:mb-16"
          >
            <span className="inline-block bg-white/10 text-[var(--color-primary)] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.3em] mb-6 border border-white/10" style={{ fontFamily: 'var(--font-heading)' }}>
              Gallery
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              Through The <span className="text-[var(--color-primary)]">Lens</span>
            </h2>
          </motion.div>

          {/* Masonry-style grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {galleryPhotos.map((photo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`relative overflow-hidden rounded-xl lg:rounded-2xl group cursor-pointer ${
                  index % 5 === 0 ? 'row-span-2' : ''
                }`}
              >
                <div className={`${index % 5 === 0 ? 'aspect-[3/4]' : 'aspect-square'} w-full`}>
                  <img
                    src={photo}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* View full gallery CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              href="/media"
              className="inline-flex items-center gap-3 h-14 px-10 bg-white/5 border border-white/20 text-white font-bold text-sm uppercase tracking-widest hover:bg-white/10 hover:border-[var(--color-primary)]/50 transition-all group"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              View Full Gallery
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Quotes Section */}
      <section className="py-16 sm:py-24 lg:py-32">
        <div className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              In His <span className="text-[var(--color-primary)]">Words</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.blockquote
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-2xl lg:rounded-3xl p-8 lg:p-10 border border-white/10 overflow-hidden group hover:border-[var(--color-primary)]/30 transition-colors"
            >
              <div className="absolute top-6 right-6 text-6xl text-[var(--color-primary)]/10 font-serif">&ldquo;</div>
              <p className="text-xl lg:text-2xl text-white/90 italic mb-6 leading-relaxed relative z-10">
                &ldquo;The next step is signing and working hard to go crazy to get to the NBA level.&rdquo;
              </p>
              <footer className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[var(--color-primary)] flex items-center justify-center text-black font-bold text-sm">
                  MH
                </div>
                <div>
                  <p className="text-white font-semibold">Milan Harrison</p>
                  <p className="text-gray-500 text-sm">On his NBA goals</p>
                </div>
              </footer>
            </motion.blockquote>

            <motion.blockquote
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="relative bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-2xl lg:rounded-3xl p-8 lg:p-10 border border-white/10 overflow-hidden group hover:border-[var(--color-primary)]/30 transition-colors"
            >
              <div className="absolute top-6 right-6 text-6xl text-[var(--color-primary)]/10 font-serif">&ldquo;</div>
              <p className="text-xl lg:text-2xl text-white/90 italic mb-6 leading-relaxed relative z-10">
                &ldquo;Being underrated was motivation. I knew I was among the top players in my class.&rdquo;
              </p>
              <footer className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[var(--color-primary)] flex items-center justify-center text-black font-bold text-sm">
                  MH
                </div>
                <div>
                  <p className="text-white font-semibold">Milan Harrison</p>
                  <p className="text-gray-500 text-sm">On staying motivated</p>
                </div>
              </footer>
            </motion.blockquote>
          </div>
        </div>
      </section>

      {/* CTA - Continue The Story */}
      <section className="py-20 sm:py-28 lg:py-40 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[var(--color-primary)]/10 to-[#0a0a0a]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[var(--color-primary)]/20 rounded-full blur-[200px]" />

        <div className="relative max-w-4xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
              The Story<br />
              <span className="text-[var(--color-primary)]">Continues</span>
            </h2>

            <p className="text-sm md:text-base text-gray-400 max-w-2xl mx-auto mb-10 uppercase tracking-widest leading-relaxed" style={{ fontFamily: 'var(--font-heading)' }}>
              Be part of the next chapter. Join the movement, attend an event,
              or explore partnership opportunities.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/events"
                className="h-12 sm:h-14 px-8 flex items-center justify-center bg-[var(--color-primary)] text-black font-bold uppercase tracking-widest text-sm hover:brightness-110 transition-all min-w-[200px] text-center"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Upcoming Events
              </Link>
              <Link
                href="/partners"
                className="h-12 sm:h-14 px-8 flex items-center justify-center border border-white/20 bg-white/5 text-white font-bold uppercase tracking-widest text-sm hover:bg-white/10 hover:border-white/30 transition-all min-w-[200px] text-center"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Partner With MH5
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
