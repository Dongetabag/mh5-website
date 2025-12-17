'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

/**
 * ELITE PERFORMANCE NAVIGATION
 * ============================
 * Bold, minimal navigation with neon accents
 * Mix-blend-difference style from elite-performance
 */

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const mainNav = [
    { href: '/legacy', label: 'Story', id: 'legacy' },
    { href: '/events', label: 'Events', id: 'events' },
    { href: '/media', label: 'Media', id: 'media' },
    { href: '/partners', label: 'Partners', id: 'partners' },
    { href: '/contact', label: 'Contact', id: 'contact' },
  ]

  return (
    <>
      {/* Main Navigation Bar - Elite Performance Style */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-6 transition-all duration-300 ${
          isScrolled
            ? 'bg-black/90 backdrop-blur-sm'
            : 'bg-gradient-to-b from-black/80 to-transparent'
        }`}
      >
        {/* Logo - Elite Performance Style */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-white flex items-center justify-center font-heading font-bold text-black text-xl">
            M
          </div>
          <span className="font-heading text-2xl font-bold tracking-tighter text-white">MH5</span>
        </Link>

        {/* Desktop Menu - Elite Performance Style */}
        <div className="hidden md:flex items-center gap-12">
          {mainNav.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="text-sm font-bold uppercase tracking-widest text-white hover:text-[var(--color-primary)] transition-colors relative group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[var(--color-primary)] transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
          <Link
            href="/events"
            className="bg-white text-black px-6 py-2 text-xs font-bold uppercase tracking-widest hover:bg-[var(--color-primary)] transition-colors"
          >
            Start Now
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile Menu - Elite Performance Style */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black flex flex-col items-center justify-center gap-8 md:hidden">
          {mainNav.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600 uppercase"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/events"
            className="mt-8 bg-[var(--color-primary)] text-black px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-white transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Start Now
          </Link>
        </div>
      )}
    </>
  )
}

export default Navigation
