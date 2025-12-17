'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

/**
 * SIMPLE NEWSLETTER SECTION
 * =========================
 * Clean, minimal newsletter signup - "Join The 1% List"
 * Placed after MediaShowcase section
 */

export default function SimpleNewsletter() {
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
    <section className="py-20 sm:py-24 md:py-32 px-6 relative z-10 overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative">
        {/* Glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[var(--color-primary)] rounded-full filter blur-[100px] opacity-10 pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Heading */}
          <h2
            className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 uppercase text-white"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Join The <span className="text-[var(--color-primary)]">1%</span> List
          </h2>

          {/* Subtext */}
          <p className="text-gray-400 mb-10 max-w-lg mx-auto text-sm md:text-base uppercase tracking-widest leading-relaxed" style={{ fontFamily: 'var(--font-heading)' }}>
            Get daily intelligence briefs, workout tips, and early access to drops. No spam, only value.
          </p>

          {/* Form */}
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center gap-3 py-5 px-6 max-w-lg mx-auto bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/30 rounded-2xl backdrop-blur-sm"
            >
              <svg className="w-6 h-6 text-[var(--color-primary)] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-[var(--color-primary)] font-semibold text-base sm:text-lg" style={{ fontFamily: 'var(--font-heading)' }}>You're on the list!</span>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <div className="relative group flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full h-12 sm:h-14 px-6 bg-white/5 border border-white/20 rounded-sm text-white placeholder:text-gray-400 text-sm focus:outline-none focus:border-[var(--color-primary)]/50 transition-all duration-300"
                  required
                  aria-label="Email address for newsletter subscription"
                  style={{ fontFamily: 'var(--font-heading)' }}
                />
              </div>
              <button
                type="submit"
                className="h-12 sm:h-14 px-8 bg-[var(--color-primary)] text-black font-bold uppercase tracking-widest text-sm hover:brightness-110 transition-all whitespace-nowrap"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Subscribe
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
