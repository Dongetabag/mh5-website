'use client'

import { useState } from 'react'

const NewsletterCapture = () => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    // Simulate API call - in production, this would connect to ConvertKit/Mailchimp
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // For demo purposes, always succeed
    setStatus('success')
    setEmail('')
  }

  return (
    <div className="bg-midnight rounded-2xl p-8 md:p-12 border border-white/10 text-center">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-responsive-lg font-bold mb-4">
          <span className="text-offwhite">Join </span>
          <span className="text-gradient-diamond">The Movement</span>
        </h2>
        <p className="text-offwhite/70 mb-8">
          Get exclusive access to event pre-sales, behind-the-scenes content, and
          updates on Milan&apos;s journey. Be the first to know about upcoming events.
        </p>

        {status === 'success' ? (
          <div className="bg-gradient-to-r from-ice to-diamond/10 border border-ice/30 rounded-lg p-6">
            <svg
              className="w-12 h-12 mx-auto mb-4 text-ice"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-ice font-semibold text-lg">You&apos;re In!</p>
            <p className="text-offwhite/60 mt-2">
              Check your inbox for a welcome message.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 bg-smoke border border-white/10 rounded-2xl px-6 py-4 text-offwhite placeholder:text-offwhite/40 focus:outline-none focus:border-ice transition-colors duration-300"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="btn-diamond whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Joining...
                </span>
              ) : (
                'Join The Movement'
              )}
            </button>
          </form>
        )}

        <p className="text-offwhite/40 text-sm mt-4">
          No spam, ever. Unsubscribe anytime.
        </p>
      </div>
    </div>
  )
}

export default NewsletterCapture
