'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { IconBox, icons } from '@/components/ui/GlossIcon'

const inquiryTypes: {
  id: string
  label: string
  icon: keyof typeof icons
  email: string
}[] = [
  { id: 'sponsorship', label: 'Sponsorship', icon: 'diamond', email: 'sponsors@mh5.com' },
  { id: 'booking', label: 'Booking', icon: 'mic', email: 'booking@mh5.com' },
  { id: 'media', label: 'Press', icon: 'tv', email: 'press@mh5.com' },
  { id: 'general', label: 'General', icon: 'chat', email: 'info@mh5.com' },
]

const socialLinks = [
  {
    name: 'Instagram',
    handle: '@therealmilan5',
    href: 'https://www.instagram.com/therealmilan5/',
    color: 'from-purple-500 to-pink-500',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    )
  },
  {
    name: 'X (Twitter)',
    handle: '@MH5Official',
    href: '#',
    color: 'from-gray-600 to-gray-800',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    )
  },
  {
    name: 'YouTube',
    handle: 'Milan Harrison',
    href: 'https://www.youtube.com/watch?v=3aPDRabLDzg',
    color: 'from-red-500 to-red-600',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    )
  },
]

const faqs = [
  {
    q: 'How quickly do you respond?',
    a: 'We aim to respond to all inquiries within 48 hours during business days.',
  },
  {
    q: 'What is the typical sponsorship budget?',
    a: 'Packages start at $5,000 and range up to $25,000+ for platinum partnerships.',
  },
  {
    q: 'Is Milan available internationally?',
    a: 'Yes! Milan is available for appearances worldwide.',
  },
  {
    q: 'How do I get event tickets?',
    a: 'Visit our Events page to see upcoming events and purchase tickets.',
  },
]

export default function ContactPage() {
  const [selectedType, setSelectedType] = useState('general')
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormStatus('loading')
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setFormStatus('success')
  }

  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      {/* Hero - Compact */}
      <section className="relative min-h-[40vh] sm:min-h-[50vh] flex items-center justify-center overflow-hidden pt-20 sm:pt-24">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[300px] sm:w-[400px] lg:w-[500px] h-[300px] sm:h-[400px] lg:h-[500px] bg-[var(--color-primary)]/10 rounded-3xl blur-[80px] sm:blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-6 lg:px-8 text-center py-12 sm:py-16 lg:py-24">
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
                Available for inquiries
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-[0.9] mb-5 sm:mb-6"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              <span className="text-white">GET IN</span>
              <br />
              <span className="text-[var(--color-primary)]">TOUCH</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-sm md:text-base text-gray-400 max-w-xl mx-auto uppercase tracking-widest leading-relaxed"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Sponsorships, bookings, media inquiries, or just want to connect?
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Inquiry Type Selector */}
      <section className="py-4 sm:py-6 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
            {inquiryTypes.map((type) => (
              <motion.button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative p-3 sm:p-4 text-center transition-all duration-300 overflow-hidden ${
                  selectedType === type.id
                    ? 'bg-[var(--color-primary)] text-black'
                    : 'bg-[#111] text-gray-400 hover:text-white border border-white/5 hover:border-white/20'
                }`}
              >
                <div className="flex justify-center mb-1.5 sm:mb-2">
                  <IconBox icon={type.icon} size="md" />
                </div>
                <span className="font-semibold text-xs sm:text-sm">{type.label}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 sm:py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-12">
            {/* Form - 3 columns */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <div className="bg-[#111] rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-10 border border-white/5">
                {formStatus === 'success' ? (
                  <div className="text-center py-8 sm:py-12">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-16 h-16 sm:w-20 sm:h-20 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-4 sm:mb-6"
                    >
                      <svg className="w-8 h-8 sm:w-10 sm:h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3" style={{ fontFamily: 'var(--font-heading)' }}>Message Sent!</h3>
                    <p className="text-sm sm:text-base text-gray-400 mb-6 sm:mb-8">
                      We&apos;ll get back to you within 48 hours.
                    </p>
                    <button
                      onClick={() => setFormStatus('idle')}
                      className="h-12 sm:h-14 px-8 border border-white/20 bg-white/5 text-white font-bold uppercase tracking-widest text-sm hover:bg-white/10 hover:border-white/30 transition-all"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-8">
                      <IconBox icon={inquiryTypes.find((t) => t.id === selectedType)?.icon || 'chat'} size="lg" />
                      <div>
                        <h2 className="text-lg sm:text-xl font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                          {inquiryTypes.find((t) => t.id === selectedType)?.label} Inquiry
                        </h2>
                        <p className="text-gray-500 text-xs sm:text-sm">
                          We&apos;ll get back to you shortly
                        </p>
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                      <div className="grid md:grid-cols-2 gap-3 sm:gap-4">
                        <div>
                          <label className="block text-gray-400 text-xs sm:text-sm mb-1.5 sm:mb-2">Name *</label>
                          <input
                            type="text"
                            required
                            className="w-full h-12 sm:h-14 px-6 bg-white/5 border border-white/20 rounded-sm text-white placeholder:text-gray-400 text-sm focus:outline-none focus:border-[var(--color-primary)]/50 transition-all duration-300"
                            placeholder="Your name"
                            style={{ fontFamily: 'var(--font-heading)' }}
                          />
                        </div>
                        <div>
                          <label className="block text-gray-400 text-xs sm:text-sm mb-1.5 sm:mb-2">Email *</label>
                          <input
                            type="email"
                            required
                            className="w-full h-12 sm:h-14 px-6 bg-white/5 border border-white/20 rounded-sm text-white placeholder:text-gray-400 text-sm focus:outline-none focus:border-[var(--color-primary)]/50 transition-all duration-300"
                            placeholder="your@email.com"
                            style={{ fontFamily: 'var(--font-heading)' }}
                          />
                        </div>
                      </div>

                      {selectedType === 'sponsorship' && (
                        <div className="grid md:grid-cols-2 gap-3 sm:gap-4">
                          <div>
                            <label className="block text-gray-400 text-xs sm:text-sm mb-1.5 sm:mb-2">Company *</label>
                            <input
                              type="text"
                              required
                              className="w-full bg-black/30 border border-white/10 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white placeholder:text-gray-500 focus:outline-none focus:border-[var(--color-primary)]/50 transition-colors"
                              placeholder="Your company"
                            />
                          </div>
                          <div>
                            <label className="block text-gray-400 text-xs sm:text-sm mb-1.5 sm:mb-2">Budget Range *</label>
                            <select
                              required
                              className="w-full h-12 sm:h-14 px-6 bg-white/5 border border-white/20 rounded-sm text-white text-sm focus:outline-none focus:border-[var(--color-primary)]/50 transition-all duration-300"
                              style={{ fontFamily: 'var(--font-heading)' }}
                            >
                              <option value="">Select range</option>
                              <option value="5000-15000">$5K - $15K</option>
                              <option value="15000-25000">$15K - $25K</option>
                              <option value="25000+">$25K+</option>
                            </select>
                          </div>
                        </div>
                      )}

                      {selectedType === 'booking' && (
                        <div className="grid md:grid-cols-2 gap-3 sm:gap-4">
                          <div>
                            <label className="block text-gray-400 text-xs sm:text-sm mb-1.5 sm:mb-2">Event Type *</label>
                            <select
                              required
                              className="w-full h-12 sm:h-14 px-6 bg-white/5 border border-white/20 rounded-sm text-white text-sm focus:outline-none focus:border-[var(--color-primary)]/50 transition-all duration-300"
                              style={{ fontFamily: 'var(--font-heading)' }}
                            >
                              <option value="">Select type</option>
                              <option value="appearance">Appearance</option>
                              <option value="hosting">Event Hosting</option>
                              <option value="speaking">Speaking</option>
                              <option value="tournament">Tournament</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-gray-400 text-xs sm:text-sm mb-1.5 sm:mb-2">Event Date *</label>
                            <input
                              type="date"
                              required
                              className="w-full bg-black/30 border border-white/10 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white focus:outline-none focus:border-[var(--color-primary)]/50 transition-colors"
                            />
                          </div>
                        </div>
                      )}

                      {selectedType === 'media' && (
                        <div>
                          <label className="block text-gray-400 text-xs sm:text-sm mb-1.5 sm:mb-2">Media Outlet *</label>
                          <input
                            type="text"
                            required
                            className="w-full bg-black/30 border border-white/10 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white placeholder:text-gray-500 focus:outline-none focus:border-[var(--color-primary)]/50 transition-colors"
                            placeholder="Publication / Channel name"
                          />
                        </div>
                      )}

                      <div>
                        <label className="block text-gray-400 text-xs sm:text-sm mb-1.5 sm:mb-2">Subject *</label>
                        <input
                          type="text"
                          required
                          className="w-full bg-black/30 border border-white/10 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white placeholder:text-gray-500 focus:outline-none focus:border-[var(--color-primary)]/50 transition-colors"
                          placeholder="What is this regarding?"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-400 text-xs sm:text-sm mb-1.5 sm:mb-2">Message *</label>
                        <textarea
                          required
                          rows={4}
                          className="w-full px-6 py-4 bg-white/5 border border-white/20 rounded-sm text-white placeholder:text-gray-400 text-sm focus:outline-none focus:border-[var(--color-primary)]/50 transition-all duration-300 resize-none"
                          placeholder="Tell us more..."
                          style={{ fontFamily: 'var(--font-heading)' }}
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={formStatus === 'loading'}
                        className="w-full h-12 sm:h-14 px-8 bg-[var(--color-primary)] text-black font-bold uppercase tracking-widest text-sm hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        {formStatus === 'loading' ? (
                          <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Sending...
                          </span>
                        ) : (
                          'Send Message'
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </motion.div>

            {/* Sidebar - 2 columns */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              {/* Direct Emails */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-[#111] rounded-xl sm:rounded-2xl lg:rounded-3xl p-4 sm:p-5 lg:p-6 border border-white/5"
              >
                <h3 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Direct Emails</h3>
                <div className="space-y-2 sm:space-y-3">
                  {inquiryTypes.map((type) => (
                    <div key={type.id} className="flex items-center justify-between py-1.5 sm:py-2">
                      <span className="text-gray-400 text-xs sm:text-sm">{type.label}</span>
                      <a
                        href={`mailto:${type.email}`}
                        className="text-[var(--color-primary)] text-xs sm:text-sm hover:underline"
                      >
                        {type.email}
                      </a>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-[#111] rounded-xl sm:rounded-2xl lg:rounded-3xl p-4 sm:p-5 lg:p-6 border border-white/5"
              >
                <h3 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Connect</h3>
                <div className="space-y-2 sm:space-y-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between py-1.5 sm:py-2 group"
                    >
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-md bg-gradient-to-r ${social.color} flex items-center justify-center text-white`}>
                          {social.icon}
                        </div>
                        <span className="text-gray-400 text-xs sm:text-sm group-hover:text-white transition-colors">
                          {social.name}
                        </span>
                      </div>
                      <span className="text-[var(--color-primary)] text-xs sm:text-sm">
                        {social.handle}
                      </span>
                    </a>
                  ))}
                </div>
              </motion.div>

              {/* Location */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-[var(--color-primary)]/10 to-transparent rounded-xl sm:rounded-2xl lg:rounded-3xl p-4 sm:p-5 lg:p-6 border border-[var(--color-primary)]/20"
              >
                <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[var(--color-primary)]/20 flex items-center justify-center">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--color-primary)]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>Based In</h3>
                    <p className="text-gray-400 text-xs sm:text-sm">Springfield, MA</p>
                  </div>
                </div>
                <p className="text-[var(--color-primary)] text-xs sm:text-sm font-medium">
                  Available Worldwide
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 lg:py-24 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              Quick <span className="text-[var(--color-primary)]">Answers</span>
            </h2>
          </motion.div>

          <div className="space-y-2 sm:space-y-3">
            {faqs.map((faq, index) => (
              <motion.details
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-[#111] rounded-xl sm:rounded-2xl border border-white/5 overflow-hidden"
              >
                <summary className="px-4 sm:px-6 py-4 sm:py-5 cursor-pointer text-sm sm:text-base text-white font-medium flex justify-between items-center hover:bg-white/5 transition-colors">
                  {faq.q}
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 group-open:rotate-180 transition-transform flex-shrink-0 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-4 sm:px-6 pb-4 sm:pb-5 text-sm sm:text-base text-gray-400">
                  {faq.a}
                </div>
              </motion.details>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
