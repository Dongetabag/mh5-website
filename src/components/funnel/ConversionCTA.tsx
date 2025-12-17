'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'

/**
 * CONVERSION CTA SECTION - The Ultimate Funnel Close
 * ===================================================
 * Dual-path conversion:
 * 1. Events Coming Soon (B2C)
 * 2. Partnership/Booking (B2B)
 *
 * Features:
 * - Coming soon announcement
 * - Email capture for notifications
 * - Partnership opportunities
 */

export default function ConversionCTA() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [notifyEmail, setNotifyEmail] = useState('')
  const [isNotifySubmitted, setIsNotifySubmitted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubmitted(true)
      setEmail('')
    }
  }

  const handleNotifySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (notifyEmail) {
      setIsNotifySubmitted(true)
      setNotifyEmail('')
    }
  }

  return (
    <section className="relative py-16 sm:py-20 lg:py-32 overflow-hidden" ref={ref}>
      {/* Background - Semi-transparent overlay to let galaxy show through */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--color-primary)]/50 to-transparent" />
      <div className="absolute top-1/4 -left-24 w-96 h-96 bg-[var(--color-primary)]/5 rounded-3xl blur-3xl" />
      <div className="absolute bottom-1/4 -right-24 w-96 h-96 bg-[var(--color-primary)]/5 rounded-3xl blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Main CTA Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.8,
            ease: [0.21, 1.11, 0.81, 0.99]
          }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <span className="inline-block px-4 py-2 bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 text-[var(--color-primary)] text-xs font-medium tracking-wide rounded-lg mb-6">
            Join The Movement
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            Be Part of <span className="text-[var(--color-primary)]">The Story</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto px-2">
            Whether you&apos;re coming to an event or looking to partner, the movement is waiting for you.
          </p>
        </motion.div>

        {/* Dual Path CTAs */}
        <div className="grid lg:grid-cols-2 gap-5 sm:gap-6 lg:gap-8 mb-12 sm:mb-16 lg:mb-20">
          {/* Path 1: Events Coming Soon */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              delay: 0.2,
              duration: 0.6,
            }}
            className="relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-[var(--color-primary)] to-diamond rounded-2xl blur opacity-20 group-hover:opacity-40 transition" />
            <div className="relative bg-[#111] rounded-2xl p-6 sm:p-8 lg:p-10 border border-white/10">
              {/* Coming Soon Badge */}
              <div className="flex items-center gap-2 mb-6 sm:mb-8">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-sm bg-[var(--color-primary)] opacity-75"></span>
                  <span className="relative inline-flex rounded-sm h-3 w-3 bg-[var(--color-primary)]"></span>
                </span>
                <span className="text-[var(--color-primary)] text-sm font-medium">Coming Soon</span>
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                Events &amp; Tickets
              </h3>
              <p className="text-gray-400 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8">
                Tournaments, club nights, VIP experiences, and exclusive meet &amp; greets. Something big is coming.
              </p>

              {/* Coming Soon Visual */}
              <div className="relative bg-gradient-to-br from-[var(--color-primary)]/10 via-[var(--color-primary)]/5 to-transparent rounded-xl p-6 sm:p-8 mb-6 sm:mb-8 overflow-hidden">
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute top-4 left-4 w-20 h-20 border border-[var(--color-primary)]/30 rounded-xl" />
                  <div className="absolute bottom-4 right-4 w-32 h-32 border border-[var(--color-primary)]/20 rounded-xl" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-[var(--color-primary)]/10 rounded-xl" />
                </div>

                <div className="relative text-center">
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ delay: 0.4, duration: 0.6 }}
                  >
                    <div className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                      2025
                    </div>
                    <div className="text-[var(--color-primary)] text-sm sm:text-base font-medium tracking-wider">
                      LAUNCHING SOON
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Notify Me Form */}
              {isNotifySubmitted ? (
                <div className="flex items-center justify-center gap-2 py-4 px-4 bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/30 rounded-xl">
                  <svg className="w-5 h-5 text-[var(--color-primary)] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[var(--color-primary)] font-medium text-sm sm:text-base">You&apos;ll be first to know!</span>
                </div>
              ) : (
                <form onSubmit={handleNotifySubmit} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={notifyEmail}
                    onChange={(e) => setNotifyEmail(e.target.value)}
                    placeholder="Enter email for early access"
                    className="flex-1 h-12 sm:h-14 px-4 sm:px-5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-[var(--color-primary)]/50 text-sm sm:text-base"
                    required
                  />
                  <button
                    type="submit"
                    className="h-12 sm:h-14 px-6 sm:px-8 bg-[var(--color-primary)] text-black text-sm font-bold uppercase tracking-widest hover:brightness-110 transition whitespace-nowrap"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    Notify Me
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Path 2: Partnership */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              delay: 0.3,
              duration: 0.6,
            }}
            className="relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-white/20 to-white/5 rounded-2xl blur opacity-20 group-hover:opacity-40 transition" />
            <div className="relative bg-[#111] rounded-2xl p-6 sm:p-8 lg:p-10 border border-white/10">
              {/* Badge */}
              <div className="flex items-center gap-2 mb-6 sm:mb-8">
                <span className="w-3 h-3 rounded-sm bg-[var(--color-primary)]" />
                <span className="text-[var(--color-primary)] text-sm font-medium">Accepting Inquiries</span>
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                Partner With MH5
              </h3>
              <p className="text-gray-400 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8">
                Brand partnerships, event hosting, sponsorships. Align with the movement and reach 500K+ followers.
              </p>

              {/* Partnership Benefits */}
              <div className="space-y-4 mb-6 sm:mb-8">
                {[
                  'Access to 500K+ engaged followers',
                  'Event hosting & appearances',
                  'Content creation & promotion',
                  'Brand ambassador opportunities',
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3 text-base text-gray-300">
                    <svg className="w-5 h-5 flex-shrink-0 text-[var(--color-primary)]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/partners"
                className="flex items-center justify-center w-full h-12 sm:h-14 bg-white/5 text-white text-sm font-bold uppercase tracking-widest hover:bg-white/10 transition border border-white/15 hover:border-white/25"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Explore Partnership
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Newsletter Capture */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="max-w-xl mx-auto text-center"
        >
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-white mb-3 sm:mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            Stay in the Loop
          </h3>
          <p className="text-gray-400 text-base sm:text-lg mb-6 sm:mb-8 px-2">
            Get exclusive access to events, drops, and behind-the-scenes content.
          </p>

          {isSubmitted ? (
            <div className="flex items-center justify-center gap-2 py-4 px-4 sm:px-6 bg-green-500/10 border border-green-500/30 rounded-xl">
              <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-green-400 font-medium text-sm sm:text-base">You&apos;re in! Check your inbox.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 h-12 sm:h-14 px-4 sm:px-5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-[var(--color-primary)]/50 text-sm sm:text-base"
                required
              />
              <button
                type="submit"
                className="h-12 sm:h-14 px-6 sm:px-8 bg-[var(--color-primary)] text-black text-sm font-bold uppercase tracking-widest hover:brightness-110 transition whitespace-nowrap"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Subscribe
              </button>
            </form>
          )}

          <p className="text-gray-600 text-xs sm:text-sm mt-4 sm:mt-5 px-2">
            No spam. Unsubscribe anytime. By subscribing, you agree to our Privacy Policy.
          </p>
        </motion.div>

        {/* Social Follow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="flex justify-center gap-3 sm:gap-4 mt-10 sm:mt-12"
        >
          {[
            { name: 'Instagram', href: 'https://www.instagram.com/therealmilan5/', icon: (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="18" cy="6" r="1.5" fill="currentColor" stroke="none" />
              </svg>
            )},
            { name: 'YouTube', href: 'https://www.youtube.com/watch?v=3aPDRabLDzg', icon: (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <rect x="2" y="4" width="20" height="16" rx="4" />
                <path d="M10 9l5 3-5 3V9z" fill="currentColor" stroke="none" />
              </svg>
            )},
            { name: 'TikTok', href: '#', icon: (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path d="M9 12a4 4 0 104 4V4c1 2 3 3 5 3" />
              </svg>
            )},
          ].map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition"
              aria-label={social.name}
            >
              {social.icon}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
