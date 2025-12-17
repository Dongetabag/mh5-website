'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

/**
 * FOR YOU SECTION - Personalized Content Hub
 * ==========================================
 * User-centric personalized content for young basketball fans
 * Features:
 * - Interest-based content
 * - Quick actions
 * - Community highlights
 * - Personalized recommendations
 */

interface Interest {
  id: string
  label: string
  emoji: string
  selected: boolean
}

export default function ForYouSection() {
  const [interests, setInterests] = useState<Interest[]>([
    { id: 'nba', label: 'NBA', emoji: '🏀', selected: true },
    { id: 'highschool', label: 'HS Hoops', emoji: '🎒', selected: false },
    { id: 'college', label: 'College', emoji: '🎓', selected: true },
    { id: 'streetball', label: 'Streetball', emoji: '🔥', selected: false },
    { id: 'training', label: 'Training', emoji: '💪', selected: true },
    { id: 'sneakers', label: 'Sneakers', emoji: '👟', selected: false },
    { id: 'draft', label: 'Draft', emoji: '📋', selected: false },
    { id: 'highlights', label: 'Highlights', emoji: '🎬', selected: true },
  ])

  const toggleInterest = (id: string) => {
    setInterests(prev =>
      prev.map(interest =>
        interest.id === id ? { ...interest, selected: !interest.selected } : interest
      )
    )
  }

  const quickActions = [
    { label: 'Watch Highlights', emoji: '🎬', href: '/media', color: 'from-purple-500 to-pink-500' },
    { label: 'Get Tickets', emoji: '🎫', href: '/events', color: 'from-[var(--color-primary)] to-orange-500' },
    { label: 'Join Community', emoji: '👥', href: '/contact', color: 'from-[var(--color-secondary)] to-blue-500' },
    { label: 'Shop Merch', emoji: '🛒', href: '/partners', color: 'from-emerald-500 to-teal-500' },
  ]

  const communityHighlights = [
    { type: 'post', user: 'HoopDreamer23', content: 'Just dropped 30 at the park 🔥 MH5 inspired', likes: 847, time: '2h ago' },
    { type: 'achievement', user: 'BucketSZN', content: 'Hit my first 360 dunk!', likes: 1203, time: '4h ago' },
    { type: 'question', user: 'RookieWatcher', content: 'Best guard in the 2025 class?', likes: 456, time: '6h ago' },
  ]

  const forYouContent = [
    {
      title: 'Your Weekly Recap',
      description: 'Based on what you\'ve been watching',
      items: ['Top 10 Dunks', 'Rising Stars Update', 'Training Tips'],
      gradient: 'from-[var(--color-primary)]/20 to-orange-500/20',
    },
    {
      title: 'Recommended For You',
      description: 'Content you might like',
      items: ['Ankle Breakers Vol. 12', 'Draft Stock Analysis', 'Streetball Legends'],
      gradient: 'from-purple-500/20 to-pink-500/20',
    },
  ]

  return (
    <section className="py-16 relative overflow-hidden" style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-[500px] h-[250px] border-b-2 border-r-2 border-[var(--color-primary)]/5 rounded-br-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[200px] border-t-2 border-l-2 border-[var(--color-secondary)]/5 rounded-tl-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-black text-[var(--color-text-primary)] mb-2"
          >
            Your Basketball Hub
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[var(--color-text-muted)]"
          >
            Personalized content curated just for you
          </motion.p>
        </div>

        {/* Interests Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <p className="text-sm text-[var(--color-text-muted)] mb-4 text-center">
            Customize your feed - tap to toggle
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {interests.map((interest) => (
              <button
                key={interest.id}
                onClick={() => toggleInterest(interest.id)}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-medium
                  transition-all duration-300 border
                  ${interest.selected
                    ? 'bg-[var(--color-primary)] text-[var(--color-text-inverse)] border-[var(--color-primary)] shadow-lg shadow-[var(--color-primary)]/25'
                    : 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] border-[var(--color-border-default)] hover:border-[var(--color-primary)]/50'
                  }
                `}
              >
                <span>{interest.emoji}</span>
                <span>{interest.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {quickActions.map((action, index) => (
            <motion.div
              key={action.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index }}
            >
              <Link
                href={action.href}
                className={`
                  block p-6 rounded-2xl bg-gradient-to-br ${action.color}
                  text-white text-center group hover:scale-105 transition-transform duration-300
                `}
              >
                <span className="text-3xl mb-2 block group-hover:scale-110 transition-transform">{action.emoji}</span>
                <span className="font-semibold text-sm">{action.label}</span>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* For You Content Sections */}
          <div className="space-y-6">
            {forYouContent.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                className={`p-6 rounded-2xl bg-gradient-to-br ${section.gradient} border border-[var(--color-border-default)]`}
              >
                <h3 className="font-bold text-[var(--color-text-primary)] mb-1">{section.title}</h3>
                <p className="text-sm text-[var(--color-text-muted)] mb-4">{section.description}</p>
                <div className="space-y-2">
                  {section.items.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 rounded-xl bg-[var(--color-bg-primary)]/50 hover:bg-[var(--color-bg-primary)] transition-colors cursor-pointer group"
                    >
                      <span className="text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors">
                        {item}
                      </span>
                      <svg className="w-4 h-4 text-[var(--color-text-muted)] group-hover:text-[var(--color-primary)] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Community Highlights */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[var(--color-bg-primary)] rounded-2xl p-6 border border-[var(--color-border-default)]"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-[var(--color-text-primary)] flex items-center gap-2">
                <span className="text-xl">👥</span>
                Community
              </h3>
              <span className="text-xs text-[var(--color-text-muted)] bg-[var(--color-bg-secondary)] px-3 py-1 rounded-lg">
                Live
              </span>
            </div>

            <div className="space-y-4">
              {communityHighlights.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                  className="p-4 rounded-xl bg-[var(--color-bg-secondary)] hover:bg-[var(--color-bg-tertiary)] transition-colors cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    {/* Avatar ring */}
                    <div className="w-10 h-10 rounded-md bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] p-[2px] flex-shrink-0">
                      <div className="w-full h-full rounded-md bg-[var(--color-bg-secondary)] flex items-center justify-center">
                        <span className="text-xs font-bold text-[var(--color-primary)]">
                          {item.user.charAt(0)}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-sm text-[var(--color-text-primary)]">
                          @{item.user}
                        </span>
                        <span className={`
                          text-xs px-2 py-0.5 rounded-lg
                          ${item.type === 'post' ? 'bg-[var(--color-primary)]/15 text-[var(--color-primary)]' : ''}
                          ${item.type === 'achievement' ? 'bg-purple-500/15 text-purple-400' : ''}
                          ${item.type === 'question' ? 'bg-[var(--color-secondary)]/15 text-[var(--color-secondary)]' : ''}
                        `}>
                          {item.type}
                        </span>
                      </div>
                      <p className="text-sm text-[var(--color-text-secondary)] mb-2">
                        {item.content}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-[var(--color-text-muted)]">
                        <span className="flex items-center gap-1">
                          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                          {item.likes}
                        </span>
                        <span>{item.time}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Join CTA */}
            <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-[var(--color-primary)]/10 to-[var(--color-secondary)]/10 border border-[var(--color-primary)]/20 text-center">
              <p className="text-sm text-[var(--color-text-secondary)] mb-3">
                Join 10K+ basketball fans in the community
              </p>
              <button className="px-6 py-2 rounded-2xl bg-[var(--color-primary)] text-[var(--color-text-inverse)] font-semibold text-sm hover:brightness-110 transition-all">
                Join Now
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
