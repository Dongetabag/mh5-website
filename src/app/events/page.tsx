'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { IconBox, icons } from '@/components/ui/GlossIcon'
import VideoPlayer from '@/components/VideoPlayer'

// All event videos from events folder - 20 videos total
const eventHighlights = [
  '/videos/events/26b5dca7c1d348c0866fbb02e4f3d241.MOV',
  '/videos/events/37f8ca3c904745f7a7c16d2da3e44b5c.MOV',
  '/videos/events/4e14c7c11ff043afbd523f184c7a3999.MOV',
  '/videos/events/5089b366326446a49925a5305985a148.MOV',
  '/videos/events/5893e5fd7bfc44d6a422765f2277d665.MOV',
  '/videos/events/70965acdb9d5482c9035562525803230.MOV',
  '/videos/events/7efaf7eb3b9a4babb2b824c773d971b2.MOV',
  '/videos/events/8aa44a60cf7f4630996aa4d294ce9568.MOV',
  '/videos/events/9f90e8aa68434121b10f738f483e53f2.MOV',
  '/videos/events/90d1467329ec4a3dac3a8658cba48dd8.MOV',
  '/videos/events/F6401E28-2949-4092-BDFF-98C11CA5B439.MOV',
  '/videos/events/IMG_0680.MOV',
  '/videos/events/IMG_2421.mov',
  '/videos/events/a49c7a65cf3549fba727b57bcec1bddc.MOV',
  '/videos/events/c7ae7027582a43399c46595e1203d9a4.MOV',
  '/videos/events/cb31bf2b613042c197eb1e91563637a0.MOV',
  '/videos/events/d11f4e200d3d4174940ce130366e3698.MOV',
  '/videos/events/d478bfa5726949438ca2f506c332a6bc.MOV',
  '/videos/events/d9e745c8f9c848af8356513ac8b3daab.MOV',
  '/videos/events/ecdaf770de5641a49205034cc0bf0a66.MOV',
]

// All event photos from events folder - 34 photos for Past Events grid
const pastEvents = [
  { title: 'VIP Night', date: '2024-11-15', location: 'Miami, FL', attendance: 850, image: '/images/events/240C9647-1DCD-4045-8070-C69CC4C00920.jpg' },
  { title: 'MH5 Experience', date: '2024-10-28', location: 'New York, NY', attendance: 920, image: '/images/events/3ACAF232-CC27-4EB8-99DE-2322AC204F28.jpg' },
  { title: 'Elite Tournament', date: '2024-09-20', location: 'Boston, MA', attendance: 680, image: '/images/events/3AFC5E5E-A1FA-4E30-9D2B-6263B98B922C.JPG' },
  { title: 'Summer Classic', date: '2024-08-15', location: 'Hartford, CT', attendance: 750, image: '/images/events/4430EAE3-2CD3-4285-9892-9494FA6EE94F.JPG' },
  { title: 'Championship Night', date: '2024-07-22', location: 'Springfield, MA', attendance: 620, image: '/images/events/88BE14ED-B9D6-460B-BDA3-D892F086EDC4.JPG' },
  { title: 'Club Takeover', date: '2024-06-30', location: 'Miami, FL', attendance: 980, image: '/images/events/95A0BBC3-F879-4FEC-AA09-B1683ECF65B2.JPG' },
  { title: 'Fan Meetup', date: '2024-06-10', location: 'New York, NY', attendance: 450, image: '/images/events/B6641C04-9563-44EC-B211-6810D47B15E2.jpg' },
  { title: 'Spring Showcase', date: '2024-05-18', location: 'Boston, MA', attendance: 580, image: '/images/events/BA2A6014.JPG.jpg' },
  { title: 'All-Star Weekend', date: '2024-04-28', location: 'Hartford, CT', attendance: 870, image: '/images/events/BE564DC8-2241-4DC9-969F-8CA7F99D25AE.jpg' },
  { title: 'Exclusive Gathering', date: '2024-04-12', location: 'Miami, FL', attendance: 320, image: '/images/events/D43A39C2-2C80-40FF-A41C-5C28E99F1DB2.JPG.jpg' },
  { title: 'Community Day', date: '2024-03-25', location: 'Springfield, MA', attendance: 720, image: '/images/events/DBAEFDA8-FB32-499C-BF46-4B55DCAEC8C6.JPG' },
  { title: 'Private Event', date: '2024-03-08', location: 'New York, NY', attendance: 280, image: '/images/events/F904A20E-75E9-4FE9-B441-CB9F32BC68EB.jpg' },
  { title: 'Winter Tournament', date: '2024-02-20', location: 'Boston, MA', attendance: 650, image: '/images/events/FullSizeRender.jpg' },
  { title: 'New Year Kickoff', date: '2024-01-15', location: 'Hartford, CT', attendance: 890, image: '/images/events/IMG_0176.jpg' },
  { title: 'Holiday Special', date: '2023-12-22', location: 'Miami, FL', attendance: 780, image: '/images/events/IMG_0979.jpg' },
  { title: 'Finals Night', date: '2023-11-30', location: 'Springfield, MA', attendance: 920, image: '/images/events/IMG_3606.jpg' },
  { title: 'Thanksgiving Classic', date: '2023-11-18', location: 'New York, NY', attendance: 680, image: '/images/events/IMG_3735.jpg' },
  { title: 'Fall Showcase', date: '2023-10-28', location: 'Boston, MA', attendance: 590, image: '/images/events/IMG_3820.JPG' },
  { title: 'Halloween Bash', date: '2023-10-14', location: 'Hartford, CT', attendance: 850, image: '/images/events/IMG_4010.jpg' },
  { title: 'Season Opener', date: '2023-09-25', location: 'Miami, FL', attendance: 720, image: '/images/events/IMG_4129.jpg' },
  { title: 'Labor Day Event', date: '2023-09-02', location: 'Springfield, MA', attendance: 680, image: '/images/events/IMG_4134.jpg' },
  { title: 'Summer Finale', date: '2023-08-20', location: 'New York, NY', attendance: 890, image: '/images/events/IMG_4139.jpg' },
  { title: 'Beach Bash', date: '2023-08-05', location: 'Boston, MA', attendance: 750, image: '/images/events/IMG_4158.jpg' },
  { title: 'July 4th Celebration', date: '2023-07-04', location: 'Hartford, CT', attendance: 920, image: '/images/events/IMG_4169.jpg' },
  { title: 'Summer Kickoff', date: '2023-06-15', location: 'Miami, FL', attendance: 680, image: '/images/events/IMG_4205.jpg' },
  { title: 'Memorial Day Classic', date: '2023-05-27', location: 'Springfield, MA', attendance: 720, image: '/images/events/IMG_4847.jpg' },
  { title: 'Spring Tournament', date: '2023-05-10', location: 'New York, NY', attendance: 650, image: '/images/events/IMG_5062.jpg' },
  { title: 'Easter Special', date: '2023-04-08', location: 'Boston, MA', attendance: 480, image: '/images/events/IMG_5130.jpg' },
  { title: 'March Madness', date: '2023-03-18', location: 'Hartford, CT', attendance: 870, image: '/images/events/IMG_5893.jpg' },
  { title: "St. Patrick's Party", date: '2023-03-04', location: 'Miami, FL', attendance: 780, image: '/images/events/IMG_6577.jpg' },
  { title: 'Winter Showcase', date: '2023-02-18', location: 'Springfield, MA', attendance: 580, image: '/images/events/IMG_7437.jpg' },
  { title: "Valentine's Event", date: '2023-02-04', location: 'New York, NY', attendance: 420, image: '/images/events/MHF.jpg' },
  { title: 'New Year Party', date: '2023-01-14', location: 'Boston, MA', attendance: 920, image: '/images/events/Sony-2666.JPG' },
  { title: 'Championship Finals', date: '2022-12-28', location: 'Hartford, CT', attendance: 880, image: '/images/events/BA2A6014.JPG.jpg' },
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
              className="max-w-lg mx-auto"
            >
              {isSubmitted ? (
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex items-center justify-center gap-3 py-5 px-6 bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/30 rounded-2xl backdrop-blur-sm"
                >
                  <svg className="w-6 h-6 text-[var(--color-primary)] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[var(--color-primary)] font-semibold text-base sm:text-lg">You&apos;ll be first to know!</span>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                  <div className="relative group flex-1">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full h-14 sm:h-16 px-6 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50 focus:border-[var(--color-primary)]/50 text-base sm:text-lg transition-all duration-300 backdrop-blur-sm"
                      required
                      aria-label="Email address for early access notifications"
                      aria-describedby="email-help"
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[var(--color-primary)]/0 via-[var(--color-primary)]/0 to-[var(--color-primary)]/0 group-focus-within:via-[var(--color-primary)]/10 group-focus-within:to-[var(--color-primary)]/5 pointer-events-none transition-all duration-300" />
                  </div>
                  <button
                    type="submit"
                    className="h-14 sm:h-16 px-8 sm:px-12 bg-[var(--color-primary)] text-black font-bold uppercase tracking-wider hover:brightness-110 active:scale-[0.98] transition-all duration-200 rounded-2xl shadow-lg shadow-[var(--color-primary)]/20 hover:shadow-[var(--color-primary)]/30 text-base sm:text-lg whitespace-nowrap"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    Notify Me
                  </button>
                </form>
              )}
              <p id="email-help" className="text-gray-400 text-sm sm:text-base mt-4 text-center">
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
            {eventHighlights.map((videoSrc, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(index * 0.05, 0.5) }}
                className="flex-shrink-0 snap-center w-[140px] sm:w-[180px] lg:w-[220px]"
              >
                <VideoPlayer
                  src={videoSrc}
                  className="rounded-xl sm:rounded-2xl lg:rounded-3xl"
                  aspectRatio="aspect-[9/16]"
                />
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
