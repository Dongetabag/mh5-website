'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { IconBox, icons } from '@/components/ui/GlossIcon'

export default function LegacyPage() {
  const timelineEvents: {
    year: string
    title: string
    description: string
    highlight: string
    icon: keyof typeof icons
  }[] = [
    {
      year: '2015',
      title: 'Springfield Origins',
      description: 'Born and raised in Springfield, Massachusetts. Started playing basketball on the neighborhood courts, showing early promise and passion for the game.',
      highlight: 'First steps on the court',
      icon: 'basketball',
    },
    {
      year: '2018',
      title: 'Putnam Vocational Dominance',
      description: 'Emerged as a standout player at Putnam Vocational High School. Named to the Western Mass ranks and began gaining regional recognition.',
      highlight: 'Western Mass recognition',
      icon: 'star',
    },
    {
      year: '2019',
      title: 'Super 7 Selection',
      description: 'First of four consecutive "Super 7" selections. Established as one of the elite players in the region.',
      highlight: 'Elite status confirmed',
      icon: 'seven',
    },
    {
      year: '2020',
      title: 'Prodigy Prep Era',
      description: 'Joined Prodigy Prep in Central Florida, playing alongside viral star Julian Newman under Coach Jamie Newman. Scored 65 points in first 2 games.',
      highlight: '65 points in debut weekend',
      icon: 'fire',
    },
    {
      year: '2021',
      title: 'National Spotlight',
      description: 'Featured in Wooter Apparel campaigns. Media coverage expanded with features in MassLive, WWLP, and The Report Magazine.',
      highlight: 'Brand partnerships begin',
      icon: 'tv',
    },
    {
      year: '2022',
      title: 'Steph Curry Connection',
      description: 'Drew inspiration from meaningful conversations with Stephen Curry dating back to 8th grade. Continued development with eyes on the professional level.',
      highlight: 'Mentorship and growth',
      icon: 'target',
    },
    {
      year: '2023',
      title: 'Pro Prospects',
      description: 'Began evaluating professional opportunities overseas while continuing to build platform. Received multiple offers and prepared for the next chapter.',
      highlight: 'Professional offers received',
      icon: 'globe',
    },
    {
      year: '2024',
      title: 'The Movement Has 5ive',
      description: 'Launched MH5 brand, combining basketball excellence with entertainment influence. Event hosting, tournament organization, and global partnership pursuit.',
      highlight: 'MH5 brand launch',
      icon: 'five',
    },
  ]

  // All basketball videos from basketball folder - 6 videos total
  const verticalVideos = [
    { src: '/videos/basketball/26e44d220245495a8a592c0002ace524.MOV', poster: '/images/basketball/IMG_2493.JPG', label: 'Highlights' },
    { src: '/videos/basketball/67df5ad85df7404a81f2d6e311e19d8c.MOV', poster: '/images/basketball/IMG_5504.JPG', label: 'Training' },
    { src: '/videos/basketball/13f27e29c219419d852eac4f5ef134dd.MOV', poster: '/images/basketball/IMG_8738.JPG', label: 'Game Day' },
    { src: '/videos/basketball/69722150427940f68a4a967b2ba80576.MOV', poster: '/images/basketball/342A3669-0A8F-4616-89F2-89B1C8B3DDF5.JPG', label: 'Skills' },
    { src: '/videos/basketball/6f40c6f056194535a398d54f76c6f2da.MOV', poster: '/images/basketball/2516F603-3659-4D99-A163-D276CFF02C2F.JPG', label: 'Showcase' },
    { src: '/videos/basketball/88b0d1582ab545f8befd9ad80dabd80f.MOV', poster: '/images/basketball/IMG_3072.jpg', label: 'Workout' },
  ]

  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      {/* Hero - Minimal, Impact-focused */}
      <section className="relative min-h-[60vh] sm:min-h-[70vh] flex items-center justify-center overflow-hidden pt-20 sm:pt-24">
        {/* Animated gradient background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[300px] sm:w-[400px] lg:w-[600px] h-[300px] sm:h-[400px] lg:h-[600px] bg-[var(--color-primary)]/10 rounded-3xl blur-[80px] sm:blur-[120px] animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-[250px] sm:w-[300px] lg:w-[400px] h-[250px] sm:h-[300px] lg:h-[400px] bg-[var(--color-primary)]/10 rounded-3xl blur-[60px] sm:blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-6 lg:px-8 text-center py-8 sm:py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-6"
            >
              <span className="inline-block bg-[var(--color-primary)] text-black px-4 py-1.5 text-xs md:text-sm font-bold uppercase tracking-[0.3em]" style={{ fontFamily: 'var(--font-heading)' }}>
                The Story Behind The Movement
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-8xl font-bold leading-[0.9] mb-5 sm:mb-6"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              <span className="text-white">FROM</span>
              <br />
              <span className="bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-secondary)] to-white bg-clip-text text-transparent">
                SPRINGFIELD
              </span>
              <br />
              <span className="text-white">TO STARDOM</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-sm md:text-base text-gray-400 max-w-2xl mx-auto uppercase tracking-widest leading-relaxed"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Every champion has an origin story. This is Milan Harrison&apos;s journey from
              the birthplace of basketball to the global stage.
            </motion.p>
          </motion.div>

          {/* Scroll indicator - hidden on mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="hidden sm:block absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="flex flex-col items-center gap-2 text-gray-500"
            >
              <span className="text-xs uppercase tracking-widest">Scroll</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Vertical Video Reel - Mobile-First */}
      <section className="py-12 sm:py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-10 lg:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              Watch The <span className="text-[var(--color-primary)]">Journey</span>
            </h2>
            <p className="text-gray-500 text-sm sm:text-base max-w-lg mx-auto px-2">
              Swipe through highlights from Springfield to the national stage
            </p>
          </motion.div>

          {/* Horizontal scroll video feed */}
          <div className="relative">
            <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-4 sm:pb-6 snap-x snap-mandatory scrollbar-hide -mx-5 sm:-mx-6 px-5 sm:px-6">
              {verticalVideos.map((video, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex-shrink-0 snap-center"
                >
                  <div className="relative w-[140px] sm:w-[180px] lg:w-[240px] aspect-[9/16] rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden bg-[#111] group">
                    <video
                      className="absolute inset-0 w-full h-full object-cover"
                      poster={video.poster}
                      loop
                      muted
                      playsInline
                      onMouseEnter={(e) => e.currentTarget.play()}
                      onMouseLeave={(e) => { e.currentTarget.pause(); e.currentTarget.currentTime = 0; }}
                    >
                      <source src={video.src} type="video/mp4" />
                    </video>

                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                    {/* Play indicator */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </div>

                    {/* Label */}
                    <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
                      <span className="px-2 sm:px-3 py-1 bg-[var(--color-primary)] text-black text-[10px] sm:text-xs font-bold rounded-lg">
                        {video.label}
                      </span>
                    </div>

                    {/* Social-style engagement - hidden on small screens */}
                    <div className="hidden sm:flex absolute right-3 bottom-14 sm:bottom-16 flex-col gap-3">
                      <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* View More Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="flex-shrink-0 snap-center"
              >
                <Link href="/media" className="block">
                  <div className="relative w-[140px] sm:w-[180px] lg:w-[240px] aspect-[9/16] rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-secondary)]/20 border border-white/10 flex items-center justify-center group hover:border-[var(--color-primary)]/50 transition-colors">
                    <div className="text-center p-4 sm:p-6">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 mx-auto mb-3 sm:mb-4 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-[var(--color-primary)]/10 transition-colors">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-[var(--color-primary)]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </div>
                      <p className="text-white font-semibold text-sm sm:text-base mb-1">View All</p>
                      <p className="text-gray-500 text-xs sm:text-sm">Media Gallery</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline - Modern Card Stack */}
      <section className="py-12 sm:py-16 lg:py-24 relative">
        {/* Section background */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--color-primary)]/5 to-transparent" />

        <div className="relative max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 sm:mb-12 lg:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-white mb-3 sm:mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              The <span className="text-[var(--color-primary)]">Timeline</span>
            </h2>
            <p className="text-gray-500 text-sm sm:text-base max-w-lg mx-auto px-2">
              From neighborhood courts to national headlines
            </p>
          </motion.div>

          {/* Modern Timeline Grid */}
          <div className="grid gap-3 sm:gap-4 lg:gap-6">
            {timelineEvents.map((event, index) => (
              <motion.div
                key={event.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="group relative bg-[#111]/80 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-white/10 hover:border-[var(--color-primary)]/30 transition-all duration-300 overflow-hidden">
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary)]/0 via-[var(--color-primary)]/5 to-[var(--color-primary)]/0 opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="relative p-4 sm:p-6 lg:p-8 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                    {/* Year badge with IconBox */}
                    <div className="flex-shrink-0 flex sm:flex-col items-center gap-3 sm:gap-2">
                      <IconBox icon={event.icon} size="md" />
                      <span className="text-[var(--color-primary)] font-bold text-xs sm:text-sm">{event.year}</span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2">
                        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                          {event.title}
                        </h3>
                        <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-[10px] sm:text-xs font-medium rounded-lg">
                          {event.highlight}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                        {event.description}
                      </p>
                    </div>

                    {/* Arrow indicator */}
                    <div className="hidden lg:flex flex-shrink-0 w-10 h-10 rounded-lg bg-white/5 items-center justify-center group-hover:bg-[var(--color-primary)]/10 transition-colors">
                      <svg className="w-5 h-5 text-gray-500 group-hover:text-[var(--color-primary)] transition-colors" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quotes - Modern Glassmorphism */}
      <section className="py-12 sm:py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-10 lg:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              In His <span className="text-[var(--color-primary)]">Words</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
            <motion.blockquote
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-xl sm:rounded-2xl lg:rounded-3xl p-5 sm:p-6 lg:p-10 border border-white/10 overflow-hidden group hover:border-[var(--color-primary)]/30 transition-colors"
            >
              {/* Quote mark decoration */}
              <div className="absolute top-4 sm:top-6 right-4 sm:right-6 text-4xl sm:text-5xl lg:text-6xl text-[var(--color-primary)]/10 font-serif">&ldquo;</div>

              <p className="text-lg sm:text-xl lg:text-2xl text-white/90 italic mb-4 sm:mb-6 leading-relaxed relative z-10">
                &ldquo;The next step is signing and working hard to go crazy to get to the NBA level.&rdquo;
              </p>
              <footer className="flex items-center gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[var(--color-primary)] flex items-center justify-center text-black font-bold text-xs sm:text-sm">
                  MH
                </div>
                <div>
                  <p className="text-white font-semibold text-sm sm:text-base">Milan Harrison</p>
                  <p className="text-gray-500 text-xs sm:text-sm">On his NBA goals</p>
                </div>
              </footer>
            </motion.blockquote>

            <motion.blockquote
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="relative bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-xl sm:rounded-2xl lg:rounded-3xl p-5 sm:p-6 lg:p-10 border border-white/10 overflow-hidden group hover:border-[var(--color-primary)]/30 transition-colors"
            >
              <div className="absolute top-4 sm:top-6 right-4 sm:right-6 text-4xl sm:text-5xl lg:text-6xl text-[var(--color-primary)]/10 font-serif">&ldquo;</div>

              <p className="text-lg sm:text-xl lg:text-2xl text-white/90 italic mb-4 sm:mb-6 leading-relaxed relative z-10">
                &ldquo;Being underrated was motivation. I knew I was among the top players in my class.&rdquo;
              </p>
              <footer className="flex items-center gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[var(--color-primary)] flex items-center justify-center text-black font-bold text-xs sm:text-sm">
                  MH
                </div>
                <div>
                  <p className="text-white font-semibold text-sm sm:text-base">Milan Harrison</p>
                  <p className="text-gray-500 text-xs sm:text-sm">On staying motivated</p>
                </div>
              </footer>
            </motion.blockquote>
          </div>
        </div>
      </section>

      {/* Community Impact - Split Layout */}
      <section className="py-12 sm:py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block bg-[var(--color-primary)] text-black px-4 py-1.5 text-xs md:text-sm font-bold uppercase tracking-[0.3em] mb-5 sm:mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                Springfield, MA
              </span>

              <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                Giving Back to<br />
                <span className="text-[var(--color-primary)]">The Community</span>
              </h2>

              <p className="text-gray-400 text-base sm:text-lg leading-relaxed mb-4 sm:mb-6">
                Milan has never forgotten his roots. From youth basketball clinics to
                community events, giving back to Springfield remains at the heart of
                his mission.
              </p>

              <p className="text-gray-400 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8">
                Featured in WWLP for his community initiatives, Milan continues to
                inspire the next generation of athletes from Western Massachusetts.
              </p>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 h-12 sm:h-14 px-8 bg-[var(--color-primary)] text-black font-bold text-sm uppercase tracking-widest hover:brightness-110 transition-all group"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Book Milan for Your Event
                <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden relative">
                <img
                  src="/images/basketball/IMG_1466.jpg"
                  alt="Community Event"
                  className="w-full h-full object-cover"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Stats overlay */}
                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
                  <div className="flex gap-3 sm:gap-4">
                    <div className="flex-1 bg-black/50 backdrop-blur-md rounded-lg sm:rounded-xl lg:rounded-2xl p-3 sm:p-4 text-center">
                      <div className="text-xl sm:text-2xl font-bold text-white">10+</div>
                      <div className="text-[10px] sm:text-xs text-gray-400">Community Events</div>
                    </div>
                    <div className="flex-1 bg-black/50 backdrop-blur-md rounded-lg sm:rounded-xl lg:rounded-2xl p-3 sm:p-4 text-center">
                      <div className="text-xl sm:text-2xl font-bold text-[var(--color-primary)]">500+</div>
                      <div className="text-[10px] sm:text-xs text-gray-400">Youth Inspired</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-16 sm:w-24 h-16 sm:h-24 bg-[var(--color-primary)]/20 rounded-xl blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-20 sm:w-32 h-20 sm:h-32 bg-[var(--color-primary)]/20 rounded-xl blur-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA - Full Width Gradient */}
      <section className="py-16 sm:py-20 lg:py-32 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-primary)]/10 via-[var(--color-primary)]/5 to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] sm:w-[600px] lg:w-[800px] h-[200px] sm:h-[300px] lg:h-[400px] bg-[var(--color-primary)]/20 rounded-3xl blur-[100px] sm:blur-[150px]" />

        <div className="relative max-w-4xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-4 sm:mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
              The Story<br />
              <span className="text-[var(--color-primary)]">Continues</span>
            </h2>

            <p className="text-base sm:text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto mb-8 sm:mb-10 px-2">
              Be part of the next chapter. Join the movement, attend an event,
              or explore partnership opportunities.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/events"
                className="inline-flex items-center justify-center h-12 sm:h-14 px-8 bg-[var(--color-primary)] text-black font-bold text-sm uppercase tracking-widest hover:brightness-110 transition-all"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Upcoming Events
              </Link>
              <Link
                href="/partners"
                className="inline-flex items-center justify-center h-12 sm:h-14 px-8 border border-white/20 bg-white/5 text-white font-bold text-sm uppercase tracking-widest hover:bg-white/10 hover:border-white/30 transition-all"
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
