'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'

/**
 * SOCIAL PROOF SECTION - Springfield/Hall of Fame Heritage
 * =========================================================
 * Establishes credibility through:
 * - Springfield basketball heritage
 * - Press mentions and features
 * - Partner logos
 * - Social media metrics
 */

const achievements = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
    title: 'Springfield, MA',
    description: 'Birthplace of Basketball (1891)'
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
      </svg>
    ),
    title: 'Featured Press',
    description: 'MassLive, WWLP, The Report'
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
    title: '4x Super 7',
    description: 'Elite Western Mass Recognition'
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
    title: 'Prodigy Prep',
    description: 'Alongside Julian Newman'
  },
]

export default function SocialProof() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section className="py-16 sm:py-20 lg:py-32 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

        {/* Springfield Heritage Banner */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ 
            duration: 0.8,
            ease: [0.21, 1.11, 0.81, 0.99]
          }}
          className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[var(--color-primary)]/20 via-[var(--color-primary)]/10 to-transparent border border-[var(--color-primary)]/30 p-5 sm:p-6 lg:p-10 mb-10 sm:mb-14 lg:mb-20"
        >
          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-5 sm:gap-6 lg:gap-8">
            {/* Basketball Hall of Fame Icon */}
            <div className="flex-shrink-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-28 lg:h-28 rounded-xl bg-[var(--color-primary)]/20 border-2 border-[var(--color-primary)] flex items-center justify-center">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 lg:w-14 lg:h-14 text-[var(--color-primary)]" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 2v20M2 12h20" stroke="black" strokeWidth="0.5" opacity="0.3"/>
                  <path d="M4.93 4.93c4.39 4.39 4.39 9.75 0 14.14M19.07 4.93c-4.39 4.39-4.39 9.75 0 14.14" stroke="black" strokeWidth="0.5" opacity="0.3"/>
                </svg>
              </div>
            </div>

            <div className="text-center lg:text-left flex-1">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-heading font-black text-white mb-2 sm:mb-3">
                From the <span className="text-[var(--color-primary)]">Birthplace of Basketball</span>
              </h3>
              <p className="text-gray-400 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl">
                Springfield, Massachusetts. Where Dr. James Naismith invented basketball in 1891.
                Home to the Basketball Hall of Fame. And home to the next generation of greatness.
              </p>
            </div>

            <div className="flex-shrink-0 text-center hidden sm:block">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-[var(--color-primary)]">1891</div>
              <div className="text-[10px] sm:text-xs uppercase tracking-wider text-gray-500">Year Invented</div>
            </div>
          </div>

          {/* Background Pattern */}
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-5">
            <svg viewBox="0 0 100 100" className="w-full h-full" fill="currentColor">
              <circle cx="50" cy="50" r="45" strokeWidth="2" stroke="currentColor" fill="none"/>
              <circle cx="50" cy="50" r="30" strokeWidth="1" stroke="currentColor" fill="none"/>
              <line x1="50" y1="5" x2="50" y2="95" strokeWidth="1" stroke="currentColor"/>
              <line x1="5" y1="50" x2="95" y2="50" strokeWidth="1" stroke="currentColor"/>
            </svg>
          </div>
        </motion.div>

        {/* Achievement Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-10 sm:mb-14 lg:mb-20">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ 
                delay: 0.1 * index,
                duration: 0.6,
                ease: [0.21, 1.11, 0.81, 0.99]
              }}
              whileHover={{ 
                y: -5, 
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
              className="bg-white/5 rounded-xl p-4 sm:p-5 lg:p-6 border border-white/10 hover:border-[var(--color-primary)]/50 transition-all duration-300 text-center cursor-pointer"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 mx-auto mb-3 sm:mb-4 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)]">
                {achievement.icon}
              </div>
              <h4 className="font-bold text-white text-xs sm:text-sm lg:text-base mb-1" style={{ fontFamily: 'var(--font-heading)' }}>{achievement.title}</h4>
              <p className="text-[10px] sm:text-xs text-gray-500 leading-relaxed">{achievement.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Join The Movement Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center"
        >
          <Link
            href="/events"
            className="inline-flex items-center justify-center h-12 px-8 bg-[var(--color-primary)] text-black text-[13px] font-medium uppercase tracking-wide rounded-md hover:brightness-110 transition"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Join The Movement
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
