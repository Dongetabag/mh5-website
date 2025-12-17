'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState, useRef } from 'react'

/**
 * PARTNERS PAGE - Full Featured Layout
 * =====================================
 * Complete partnership page with tiers, video carousel, and detailed form
 */

const stats = [
  { value: '500K+', label: 'Followers' },
  { value: '18-35', label: 'Age Range' },
  { value: '10M+', label: 'Monthly Views' },
  { value: '65%', label: 'Engagement Rate' },
]

const partnershipTiers = [
  {
    name: 'Brand Ambassador',
    description: 'Perfect for emerging brands looking to connect with basketball culture',
    features: [
      'Social media mentions',
      'Product placement in content',
      'Event appearances (2/year)',
      'Brand logo on website',
    ],
    highlight: false,
  },
  {
    name: 'Official Partner',
    description: 'Comprehensive partnership for established brands seeking deep engagement',
    features: [
      'All Ambassador benefits',
      'Dedicated content creation',
      'Social media takeovers',
      'Event hosting opportunities',
      'Exclusive product launches',
      'Custom campaigns',
    ],
    highlight: true,
  },
  {
    name: 'Title Sponsor',
    description: 'Premium partnership for brands wanting maximum visibility and impact',
    features: [
      'All Partner benefits',
      'Naming rights opportunities',
      'Documentary features',
      'Year-round campaigns',
      'VIP event access',
      'First-look at all content',
      'Custom merchandise line',
    ],
    highlight: false,
  },
]

// Elegant SVG Icon Components with Gradient
const SportsIcon = () => (
  <svg className="w-14 h-14" fill="none" viewBox="0 0 24 24">
    <defs>
      <linearGradient id="sportsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="var(--color-primary)" />
        <stop offset="100%" stopColor="var(--color-secondary)" />
      </linearGradient>
    </defs>
    <circle cx="12" cy="12" r="9" stroke="url(#sportsGrad)" strokeWidth="1.2" fill="none" opacity="0.25" />
    <circle cx="12" cy="12" r="9" stroke="url(#sportsGrad)" strokeWidth="1.5" fill="none" />
    <path d="M8 12h8M12 8v8" stroke="url(#sportsGrad)" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="12" cy="12" r="1.5" fill="url(#sportsGrad)" />
  </svg>
)

const LifestyleIcon = () => (
  <svg className="w-14 h-14" fill="none" viewBox="0 0 24 24">
    <defs>
      <linearGradient id="lifestyleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="var(--color-primary)" />
        <stop offset="100%" stopColor="var(--color-secondary)" />
      </linearGradient>
    </defs>
    <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" stroke="url(#lifestyleGrad)" strokeWidth="1.5" fill="url(#lifestyleGrad)" fillOpacity="0.15" />
    <circle cx="12" cy="10" r="1.5" fill="url(#lifestyleGrad)" />
    <circle cx="8" cy="6" r="0.8" fill="url(#lifestyleGrad)" fillOpacity="0.5" />
    <circle cx="16" cy="6" r="0.8" fill="url(#lifestyleGrad)" fillOpacity="0.5" />
    <circle cx="8" cy="14" r="0.8" fill="url(#lifestyleGrad)" fillOpacity="0.5" />
    <circle cx="16" cy="14" r="0.8" fill="url(#lifestyleGrad)" fillOpacity="0.5" />
  </svg>
)

const MediaIcon = () => (
  <svg className="w-14 h-14" fill="none" viewBox="0 0 24 24">
    <defs>
      <linearGradient id="mediaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="var(--color-primary)" />
        <stop offset="100%" stopColor="var(--color-secondary)" />
      </linearGradient>
    </defs>
    <rect x="4" y="6" width="14" height="12" rx="2" stroke="url(#mediaGrad)" strokeWidth="1.5" fill="none" />
    <path d="M18 8L20 9L18 10V8Z" fill="url(#mediaGrad)" />
    <circle cx="11" cy="12" r="2.5" stroke="url(#mediaGrad)" strokeWidth="1.2" fill="none" opacity="0.2" />
    <circle cx="11" cy="12" r="1" fill="url(#mediaGrad)" />
    <path d="M8 6V4M16 6V4" stroke="url(#mediaGrad)" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

const FinanceIcon = () => (
  <svg className="w-14 h-14" fill="none" viewBox="0 0 24 24">
    <defs>
      <linearGradient id="financeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="var(--color-primary)" />
        <stop offset="100%" stopColor="var(--color-secondary)" />
      </linearGradient>
    </defs>
    <rect x="6" y="4" width="12" height="16" rx="2" stroke="url(#financeGrad)" strokeWidth="1.5" fill="none" />
    <path d="M10 8H14M10 12H14M10 16H14" stroke="url(#financeGrad)" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M8 6V4C8 3.44772 8.44772 3 9 3H15C15.5523 3 16 3.44772 16 4V6" stroke="url(#financeGrad)" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="12" cy="10" r="0.5" fill="url(#financeGrad)" />
  </svg>
)

const brandCategories = [
  {
    name: 'Sports & Fitness',
    brands: ['Athletic wear', 'Training equipment', 'Nutrition', 'Recovery'],
    icon: <SportsIcon />,
  },
  {
    name: 'Lifestyle',
    brands: ['Fashion', 'Accessories', 'Automotive', 'Technology'],
    icon: <LifestyleIcon />,
  },
  {
    name: 'Media & Entertainment',
    brands: ['Streaming', 'Gaming', 'Music', 'Content platforms'],
    icon: <MediaIcon />,
  },
  {
    name: 'Finance & Business',
    brands: ['Fintech', 'Investment', 'Real estate', 'Professional services'],
    icon: <FinanceIcon />,
  },
]

const campaignVideos = [
  {
    id: 1,
    title: 'Brand Campaign',
    thumbnail: '/images/brand-campaigns/278543FD-E8F1-48C4-B12D-F5014265F665.JPG',
    views: '2.5M',
    engagement: '12%',
  },
  {
    id: 2,
    title: 'Summer Training Series',
    thumbnail: '/images/brand-campaigns/A8A2681C-EE12-4329-B186-53D5C364CA5B.JPG',
    views: '1.8M',
    engagement: '15%',
  },
  {
    id: 3,
    title: 'Campaign Highlight',
    thumbnail: '/images/brand-campaigns/A7407964.jpg',
    views: '3.2M',
    engagement: '18%',
  },
  {
    id: 4,
    title: 'Brand Partnership',
    thumbnail: '/images/brand-campaigns/B6641C04-9563-44EC-B211-6810D47B15E2.jpg',
    views: '1.5M',
    engagement: '10%',
  },
  {
    id: 5,
    title: 'Campaign Shoot',
    thumbnail: '/images/brand-campaigns/IMG_4508.jpg',
    views: '2.1M',
    engagement: '14%',
  },
  {
    id: 6,
    title: 'Brand Collaboration',
    thumbnail: '/images/brand-campaigns/IMG_5062.jpg',
    views: '1.9M',
    engagement: '16%',
  },
]

export default function PartnersPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    budget: '',
    message: '',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [activeVideo, setActiveVideo] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 320
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.email && formData.company) {
      setIsSubmitted(true)
      setFormData({ name: '', email: '', company: '', budget: '', message: '' })
    }
  }

  return (
    <div className="bg-black min-h-screen">
      {/* Hero Section */}
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
            <source src="/videos/brand-campaigns/37f8ca3c904745f7a7c16d2da3e44b5c.MOV" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#0a0a0a]" />
        </div>

        {/* Animated gradient orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[var(--color-primary)]/10 rounded-full blur-[150px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[var(--color-secondary)]/10 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <div className="flex items-center justify-center gap-2 mb-8">
              <span className="w-2 h-2 bg-[var(--color-primary)]" />
              <span className="text-[var(--color-primary)] text-sm font-medium uppercase tracking-widest">
                Partnership Opportunities
              </span>
            </div>

            {/* Main Heading */}
            <h1
              className="text-5xl sm:text-6xl md:text-8xl font-bold uppercase mb-6 text-white"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Partner With{' '}
              <span className="text-[var(--color-primary)]">MH5</span>
            </h1>

            {/* Subtitle */}
            <p className="text-gray-400 text-lg sm:text-xl max-w-3xl mx-auto mb-12">
              Align your brand with authenticity. Reach the next generation of basketball culture
              through strategic partnerships that deliver real engagement and lasting impact.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#inquiry"
                className="h-14 px-10 bg-[var(--color-primary)] text-black font-bold uppercase tracking-widest hover:bg-white transition-colors inline-flex items-center justify-center"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Start Partnership
              </Link>
              <Link
                href="#tiers"
                className="h-14 px-10 border border-white/20 text-white font-bold uppercase tracking-widest hover:bg-white/5 transition-colors inline-flex items-center justify-center"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                View Packages
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/30 to-transparent" />
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-t border-[#222]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div
                  className="text-4xl sm:text-5xl font-bold text-[var(--color-primary)] mb-2"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {stat.value}
                </div>
                <div className="text-gray-500 text-sm uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Carousel Section */}
      <section className="py-24 md:py-32 border-t border-[#222]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 uppercase"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Campaign <span className="text-[var(--color-primary)]">Highlights</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              See how we've helped brands connect with millions through authentic content
            </p>
          </motion.div>

          {/* Carousel */}
          <div className="relative">
            {/* Navigation Buttons */}
            <button
              onClick={() => scrollCarousel('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black/80 border border-[#333] flex items-center justify-center text-white hover:border-[var(--color-primary)] transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => scrollCarousel('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black/80 border border-[#333] flex items-center justify-center text-white hover:border-[var(--color-primary)] transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Carousel Container */}
            <div
              ref={carouselRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide px-8 snap-x snap-mandatory"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {campaignVideos.map((video, index) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex-shrink-0 w-[300px] snap-center group cursor-pointer"
                  onClick={() => setActiveVideo(index)}
                >
                  <div className={`relative aspect-[9/16] bg-[#111] overflow-hidden ${activeVideo === index ? 'ring-2 ring-[var(--color-primary)]' : ''}`}>
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      fill
                      sizes="300px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      unoptimized
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                    {/* Stats */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white font-bold mb-2">{video.title}</h3>
                      <div className="flex gap-4 text-sm">
                        <span className="text-[var(--color-primary)]">{video.views} views</span>
                        <span className="text-gray-400">{video.engagement} engagement</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Tiers */}
      <section id="tiers" className="py-24 md:py-32 border-t border-[#222]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 uppercase"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Partnership <span className="text-[var(--color-primary)]">Tiers</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Choose the partnership level that aligns with your brand goals
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {partnershipTiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className={`relative p-8 ${tier.highlight ? 'bg-[#111] border-2 border-[var(--color-primary)]' : 'bg-[#0a0a0a] border border-[#222]'}`}
              >
                {tier.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[var(--color-primary)] text-black px-4 py-1 text-xs font-bold uppercase tracking-wider">
                    Most Popular
                  </div>
                )}
                <h3
                  className="text-2xl font-bold text-white mb-3 uppercase"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {tier.name}
                </h3>
                <p className="text-gray-400 text-sm mb-6">{tier.description}</p>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-[var(--color-primary)] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="#inquiry"
                  className={`w-full h-12 font-bold uppercase tracking-widest transition-colors inline-flex items-center justify-center ${
                    tier.highlight
                      ? 'bg-[var(--color-primary)] text-black hover:bg-white'
                      : 'border border-white/20 text-white hover:bg-white/5'
                  }`}
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Get Started
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Categories */}
      <section className="py-24 md:py-32 border-t border-[#222]">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 uppercase"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Industries We <span className="text-[var(--color-primary)]">Partner</span> With
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              We work with brands across multiple industries to create authentic connections
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {brandCategories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#111] border border-[#222] p-6 hover:border-[var(--color-primary)]/50 transition-colors group"
              >
                <div className="mb-6 flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                  <div className="relative">
                    {category.icon}
                    <div className="absolute inset-0 blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300" style={{ background: 'var(--color-primary)', borderRadius: '50%' }} />
                  </div>
                </div>
                <h3
                  className="text-xl font-bold text-white mb-3 uppercase group-hover:text-[var(--color-primary)] transition-colors"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {category.name}
                </h3>
                <ul className="space-y-1">
                  {category.brands.map((brand, i) => (
                    <li key={i} className="text-gray-400 text-sm">{brand}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section id="inquiry" className="py-24 md:py-32 border-t border-[#222]">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Glow Effect */}
            <div className="absolute left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[var(--color-primary)] rounded-full filter blur-[200px] opacity-5 pointer-events-none" />

            <div className="text-center mb-12 relative">
              <h2
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 uppercase"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Start Your <span className="text-[var(--color-primary)]">Partnership</span>
              </h2>
              <p className="text-gray-400 text-lg">
                Fill out the form below and our team will reach out within 48 hours
              </p>
            </div>

            {/* Form */}
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center gap-4 py-12 px-8 bg-[#111] border border-[var(--color-primary)]/30"
              >
                <svg className="w-16 h-16 text-[var(--color-primary)]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <h3 className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                  Thank You!
                </h3>
                <p className="text-[var(--color-primary)] text-lg">
                  We'll be in touch within 48 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-[#111] border border-[#222] p-8 md:p-12 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-400 text-sm uppercase tracking-wider mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-black border border-[#333] py-4 px-5 text-white placeholder-gray-600 focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                      placeholder="John Smith"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm uppercase tracking-wider mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-black border border-[#333] py-4 px-5 text-white placeholder-gray-600 focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                      placeholder="john@company.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-400 text-sm uppercase tracking-wider mb-2">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full bg-black border border-[#333] py-4 px-5 text-white placeholder-gray-600 focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                      placeholder="Your Company"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm uppercase tracking-wider mb-2">
                      Budget Range
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full bg-black border border-[#333] py-4 px-5 text-white focus:outline-none focus:border-[var(--color-primary)] transition-colors appearance-none cursor-pointer"
                    >
                      <option value="">Select a range</option>
                      <option value="10k-25k">$10,000 - $25,000</option>
                      <option value="25k-50k">$25,000 - $50,000</option>
                      <option value="50k-100k">$50,000 - $100,000</option>
                      <option value="100k+">$100,000+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm uppercase tracking-wider mb-2">
                    Tell Us About Your Goals
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    className="w-full bg-black border border-[#333] py-4 px-5 text-white placeholder-gray-600 focus:outline-none focus:border-[var(--color-primary)] transition-colors resize-none"
                    placeholder="What are you looking to achieve with this partnership?"
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full md:w-auto h-14 px-12 bg-[var(--color-primary)] text-black font-bold uppercase tracking-widest hover:bg-white transition-colors"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    Submit Inquiry
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 border-t border-[#222]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-gray-500 text-sm uppercase tracking-widest mb-4">
            Ready to reach the next generation?
          </p>
          <Link
            href="/contact"
            className="text-[var(--color-primary)] hover:text-white transition-colors text-lg font-medium"
          >
            Contact Us Directly →
          </Link>
        </div>
      </section>
    </div>
  )
}
