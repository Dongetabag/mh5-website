'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * EXIT INTENT POPUP - Revenue Optimization Component
 * ==================================================
 * Captures leaving visitors with compelling offers
 *
 * Revenue impact: Recovers 5-15% of abandoning visitors
 */

interface ExitIntentProps {
  // Content
  headline?: string
  subheadline?: string
  offer?: string
  ctaText?: string
  ctaHref?: string

  // Settings
  delay?: number           // ms before exit intent is active
  cookieDays?: number      // Days before showing again
  cookieName?: string      // Cookie name for tracking

  // Callbacks
  onShow?: () => void
  onClose?: () => void
  onConvert?: () => void

  // Styling
  variant?: 'modal' | 'banner' | 'corner'
}

const ExitIntent = ({
  headline = 'Wait! Before you go...',
  subheadline = "Don't miss out on exclusive access",
  offer = 'Get 10% off your first event ticket',
  ctaText = 'Claim My Discount',
  ctaHref = '#newsletter',
  delay = 3000,
  cookieDays = 7,
  cookieName = 'exit_intent_shown',
  onShow,
  onClose,
  onConvert,
  variant = 'modal',
}: ExitIntentProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isEnabled, setIsEnabled] = useState(false)
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Check if popup was already shown
  const checkCookie = useCallback(() => {
    if (typeof window === 'undefined') return true
    const cookies = document.cookie.split(';')
    return cookies.some((c) => c.trim().startsWith(`${cookieName}=`))
  }, [cookieName])

  // Set cookie
  const setCookie = useCallback(() => {
    if (typeof window === 'undefined') return
    const expires = new Date()
    expires.setDate(expires.getDate() + cookieDays)
    document.cookie = `${cookieName}=true; expires=${expires.toUTCString()}; path=/`
  }, [cookieName, cookieDays])

  // Enable exit intent after delay
  useEffect(() => {
    if (checkCookie()) return

    const timer = setTimeout(() => {
      setIsEnabled(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay, checkCookie])

  // Listen for exit intent
  useEffect(() => {
    if (!isEnabled) return

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger when mouse leaves through top of viewport
      if (e.clientY <= 0 && !isVisible) {
        setIsVisible(true)
        setCookie()
        onShow?.()
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [isEnabled, isVisible, setCookie, onShow])

  const handleClose = () => {
    setIsVisible(false)
    onClose?.()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubmitting(true)

    // Simulate API call (replace with actual newsletter signup)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitting(false)
    setIsSubmitted(true)
    onConvert?.()

    // Close after success
    setTimeout(handleClose, 2000)
  }

  // Modal variant
  if (variant === 'modal') {
    return (
      <AnimatePresence>
        {isVisible && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 z-50"
              onClick={handleClose}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md"
            >
              <div className="bg-[var(--color-bg-secondary)] rounded-2xl overflow-hidden border border-[var(--color-border-default)]">
                {/* Close button */}
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Content */}
                <div className="p-8">
                  {/* Icon/decoration */}
                  <div className="w-16 h-16 mx-auto mb-6 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center">
                    <svg className="w-8 h-8 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                    </svg>
                  </div>

                  <h2 className="text-2xl font-bold text-[var(--color-text-primary)] text-center mb-2">
                    {headline}
                  </h2>
                  <p className="text-[var(--color-text-secondary)] text-center mb-4">
                    {subheadline}
                  </p>

                  {/* Offer badge */}
                  {offer && (
                    <div className="bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/30 rounded-lg px-4 py-3 mb-6">
                      <p className="text-[var(--color-primary)] text-center font-semibold">
                        {offer}
                      </p>
                    </div>
                  )}

                  {/* Form or success */}
                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center"
                    >
                      <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-[var(--color-success)]/10 flex items-center justify-center">
                        <svg className="w-6 h-6 text-[var(--color-success)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-[var(--color-success)] font-semibold">
                        Check your inbox for your discount code!
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                        className="w-full px-4 py-3 rounded-lg bg-[var(--color-bg-primary)] border border-[var(--color-border-default)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)] focus:outline-none transition-colors"
                      />
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full px-6 py-3 bg-[var(--color-primary)] text-[var(--color-text-inverse)] font-bold uppercase tracking-widest hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? 'Claiming...' : ctaText}
                      </button>
                    </form>
                  )}

                  {/* No thanks link */}
                  {!isSubmitted && (
                    <button
                      onClick={handleClose}
                      className="w-full mt-4 text-[var(--color-text-muted)] text-sm hover:text-[var(--color-text-secondary)] transition-colors"
                    >
                      No thanks, I&apos;ll pay full price
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    )
  }

  // Banner variant (top of screen)
  if (variant === 'banner') {
    return (
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            className="fixed top-0 left-0 right-0 z-50 bg-[var(--color-primary)] text-[var(--color-text-inverse)]"
          >
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="font-semibold">{headline}</span>
                <span className="hidden md:block">{offer}</span>
              </div>
              <div className="flex items-center gap-4">
                <a
                  href={ctaHref}
                  className="px-4 py-1.5 bg-white text-[var(--color-primary)] font-bold uppercase tracking-widest text-sm hover:bg-opacity-90 transition-colors"
                  onClick={() => onConvert?.()}
                >
                  {ctaText}
                </a>
                <button onClick={handleClose} className="hover:opacity-70 transition-opacity">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    )
  }

  // Corner variant (bottom right)
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 400, opacity: 0 }}
          className="fixed bottom-4 right-4 z-50 w-80 bg-[var(--color-bg-secondary)] rounded-xl border border-[var(--color-border-default)] shadow-2xl overflow-hidden"
        >
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="p-5">
            <p className="font-bold text-[var(--color-text-primary)] mb-1">{headline}</p>
            <p className="text-sm text-[var(--color-text-secondary)] mb-3">{offer}</p>
            <a
              href={ctaHref}
              className="block w-full px-4 py-2 bg-[var(--color-primary)] text-[var(--color-text-inverse)] font-bold uppercase tracking-widest text-center hover:brightness-110 transition-all"
              onClick={() => onConvert?.()}
            >
              {ctaText}
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ExitIntent
