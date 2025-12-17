'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { IconBox, icons } from '@/components/ui/GlossIcon'

const eventHighlights = [
  { src: '/videos/events/9f90e8aa68434121b10f738f483e53f2.MOV', poster: '/images/events/BE564DC8-2241-4DC9-969F-8CA7F99D25AE.jpg', label: 'Tournament' },
  { src: '/videos/events/5893e5fd7bfc44d6a422765f2277d665.MOV', poster: '/images/events/BE564DC8-2241-4DC9-969F-8CA7F99D25AE.jpg', label: 'Club Night' },
  { src: '/videos/events/5089b366326446a49925a5305985a148.MOV', poster: '/images/events/IMG_3735.jpg', label: 'Crowd' },
  { src: '/videos/events/d478bfa5726949438ca2f506c332a6bc.MOV', poster: '/images/events/IMG_4847.jpg', label: 'VIP' },
  { src: '/videos/events/26b5dca7c1d348c0866fbb02e4f3d241.MOV', poster: '/images/events/C8593DE0-E4F4-4BBA-A145-B5318AB30E90.JPG', label: 'Showcase' },
  { src: '/videos/events/4e14c7c11ff043afbd523f184c7a3999.MOV', poster: '/images/events/3AFC5E5E-A1FA-4E30-9D2B-6263B98B922C.JPG', label: 'Energy' },
  { src: '/videos/events/7efaf7eb3b9a4babb2b824c773d971b2.MOV', poster: '/images/events/IMG_3735.jpg', label: 'Performance' },
  { src: '/videos/events/964f999e6f0f4496b7593e267ba109d1.MOV', poster: '/images/events/4430EAE3-2CD3-4285-9892-9494FA6EE94F.JPG', label: 'Action' },
]

const pastEvents = [
  { title: 'Winter Showcase 2023', date: '2023-12-10', location: 'Springfield, MA', attendance: 450, image: '/images/events/IMG_4139.jpg' },
  { title: 'New Year\'s Eve Party', date: '2023-12-31', location: 'Miami, FL', attendance: 800, image: '/images/events/BE564DC8-2241-4DC9-969F-8CA7F99D25AE.jpg' },
  { title: 'Fall Tournament', date: '2023-10-20', location: 'Boston, MA', attendance: 600, image: '/images/events/IMG_4847.jpg' },
  { title: 'Summer Classic 2023', date: '2023-07-15', location: 'New York, NY', attendance: 720, image: '/images/events/IMG_5893.jpg' },
  { title: 'Spring Invitational', date: '2023-04-08', location: 'Hartford, CT', attendance: 380, image: '/images/events/BE564DC8-2241-4DC9-969F-8CA7F99D25AE.jpg' },
  { title: 'MH5 Launch Party', date: '2023-01-28', location: 'Springfield, MA', attendance: 550, image: '/images/events/MHF.jpg' },
]

export default function EventsPage() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubmitted(true)
      setEmail('')
    }
  }

  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      {/* Hero - Coming Soon */}
      <section className="relative min-h-[70vh] sm:min-h-[80vh] flex items-center justify-center overflow-hidden pt-20 sm:pt-24">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-[var(--color-primary)]/15 rounded-3xl blur-[80px] sm:blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[200px] sm:w-[400px] h-[200px] sm:h-[400px] bg-purple-500/10 rounded-3xl blur-[60px] sm:blur-[100px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-[var(--color-primary)]/5 rounded-3xl blur-[100px] sm:blur-[150px]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Coming Soon Badge */}
            <div className="flex items-center justify-center gap-2 mb-8 sm:mb-10">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-sm bg-[var(--color-primary)] opacity-75"></span>
                <span className="relative inline-flex rounded-sm h-3 w-3 bg-[var(--color-primary)]"></span>
              </span>
              <span className="text-[var(--color-primary)] text-sm sm:text-base font-medium">Coming Soon</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-semibold leading-[0.9] mb-6 sm:mb-8" style={{ fontFamily: 'var(--font-heading)' }}>
              <span className="text-white">Events</span>
            </h1>

            <p className="text-lg sm:text-xl lg:text-2xl text-gray-400 max-w-2xl mx-auto mb-8 sm:mb-10 px-2 leading-relaxed">
              Tournaments. Club nights. VIP experiences.<br className="hidden sm:block" />
              Something big is on the way.
            </p>

            {/* Coming Soon Visual */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="relative bg-gradient-to-br from-[var(--color-primary)]/10 via-[var(--color-primary)]/5 to-transparent rounded-3xl p-8 sm:p-12 mb-8 sm:mb-10 max-w-xl mx-auto overflow-hidden"
            >
              {/* Animated Background Pattern */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-6 left-6 w-24 h-24 border border-[var(--color-primary)]/30 rounded-xl" />
                <div className="absolute bottom-6 right-6 w-36 h-36 border border-[var(--color-primary)]/20 rounded-xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-[var(--color-primary)]/10 rounded-xl" />
              </div>

              <div className="relative text-center">
                <div className="text-6xl sm:text-7xl lg:text-8xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                  2026
                </div>
                <div className="text-[var(--color-primary)] text-base sm:text-lg font-medium tracking-wider">
                  LAUNCHING SOON
                </div>
              </div>
            </motion.div>

            {/* Email Signup */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="max-w-md mx-auto"
            >
              {isSubmitted ? (
                <div className="flex items-center justify-center gap-2 py-4 px-6 bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/30 rounded-xl">
                  <svg className="w-5 h-5 text-[var(--color-primary)] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[var(--color-primary)] font-medium">You&apos;ll be first to know!</span>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email for early access"
                    className="flex-1 h-14 px-5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-[var(--color-primary)]/50 text-base"
                    required
                  />
                  <button
                    type="submit"
                    className="h-14 px-8 bg-[var(--color-primary)] text-black font-bold uppercase tracking-widest hover:brightness-110 transition whitespace-nowrap"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    Notify Me
                  </button>
                </form>
              )}
              <p className="text-gray-500 text-sm mt-4">
                Be the first to know when tickets go on sale
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Event Highlights - Vertical Video Reel */}
      <section className="py-12 sm:py-16 lg:py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-6 sm:mb-8"
          >
            <div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                Event Highlights
              </h2>
              <p className="text-gray-500 text-sm sm:text-base">Moments from past events</p>
            </div>
          </motion.div>

          {/* Horizontal scroll video feed */}
          <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-5 sm:-mx-6 px-5 sm:px-6">
            {eventHighlights.map((video, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex-shrink-0 snap-center"
              >
                <div className="relative w-[140px] sm:w-[180px] lg:w-[220px] aspect-[9/16] rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden bg-[#111] group cursor-pointer">
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
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>

                  {/* Label */}
                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
                    <span className="px-2 sm:px-3 py-1 sm:py-1.5 bg-[var(--color-primary)] text-black text-[10px] sm:text-xs font-bold rounded-lg">
                      {video.label}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What to Expect Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white mb-3 sm:mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              What to <span className="text-[var(--color-primary)]">Expect</span>
            </h2>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
              From intimate VIP experiences to full-scale tournaments
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
            {[
              { icon: 'basketball' as keyof typeof icons, title: 'Tournaments', description: 'Elite basketball tournaments featuring top talent' },
              { icon: 'ticket' as keyof typeof icons, title: 'Club Nights', description: 'Exclusive parties and entertainment events' },
              { icon: 'diamond' as keyof typeof icons, title: 'VIP Experiences', description: 'Intimate meet & greets and premium access' },
              { icon: 'camera' as keyof typeof icons, title: 'Fan Events', description: 'Community gatherings and fan meetups' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#111] rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-white/5 hover:border-[var(--color-primary)]/30 transition-all duration-300"
              >
                <div className="mb-4">
                  <IconBox icon={item.icon} size="md" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm sm:text-base">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Events - Compact Grid */}
      <section className="py-12 sm:py-16 lg:py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 sm:gap-6 mb-8 sm:mb-10">
            <div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-1 sm:mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                Past <span className="text-[var(--color-primary)]">Events</span>
              </h2>
              <p className="text-gray-500 text-sm sm:text-base">See what you might have missed</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
            {pastEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden"
              >
                <img
                  src={event.image}
                  alt={event.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                    {event.title}
                  </h3>
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-gray-400">{event.location}</span>
                    <span className="text-[var(--color-primary)] font-medium">{event.attendance} attended</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Private Events CTA */}
      <section className="py-16 sm:py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--color-primary)]/5 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[400px] lg:w-[600px] h-[300px] sm:h-[400px] lg:h-[600px] bg-[var(--color-primary)]/10 rounded-3xl blur-[100px] sm:blur-[150px]" />

        <div className="relative max-w-3xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white mb-4 sm:mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
              Host a <span className="text-[var(--color-primary)]">Private Event</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-400 mb-8 sm:mb-10 px-2">
              Looking for Milan to host your private event, corporate function, or
              exclusive gathering? Let&apos;s make it happen.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center h-12 sm:h-14 px-6 sm:px-8 bg-[var(--color-primary)] text-black font-bold uppercase tracking-widest hover:brightness-110 transition hover:-translate-y-0.5"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Inquire About Booking
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
