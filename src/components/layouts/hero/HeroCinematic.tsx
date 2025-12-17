'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { siteConfig } from '@/config/site.config'

/**
 * HERO CINEMATIC VARIANT
 * ======================
 * Full-screen video background with particle overlay
 *
 * Signature features:
 * - Fullscreen video/image background
 * - Animated particle overlay
 * - Dramatic text reveal
 * - Cinematic letterboxing option
 */

// Particle component for background effect
const Particle = ({ delay }: { delay: number }) => {
  const randomX = Math.random() * 100
  const randomDuration = 15 + Math.random() * 20

  return (
    <motion.div
      className="absolute w-1 h-1 rounded-sm bg-[var(--color-primary)]"
      initial={{ x: `${randomX}vw`, y: '110vh', opacity: 0 }}
      animate={{
        y: '-10vh',
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration: randomDuration,
        repeat: Infinity,
        delay,
        ease: 'linear',
      }}
      style={{
        boxShadow: '0 0 6px var(--color-primary)',
      }}
    />
  )
}

const HeroCinematic = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const textY = useTransform(scrollYProgress, [0, 0.5], ['0%', '50%'])

  const { hero } = siteConfig

  // Generate particles
  const particles = Array.from({ length: 30 }, (_, i) => (
    <Particle key={i} delay={i * 0.5} />
  ))

  // Video loaded handler
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener('loadeddata', () => {
        setIsVideoLoaded(true)
      })
    }
  }, [])

  // Text animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.5,
      },
    },
  }

  const lineVariants = {
    hidden: {
      y: '100%',
      opacity: 0,
    },
    visible: {
      y: '0%',
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
      },
    },
  }

  const fadeUpVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut' as const,
      },
    },
  }

  return (
    <section
      ref={containerRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Layer */}
      <motion.div className="absolute inset-0" style={{ scale }}>
        {/* Video Background */}
        {hero.background.type === 'video' && hero.background.videoUrl ? (
          <>
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              style={{ opacity: isVideoLoaded ? 1 : 0 }}
            >
              <source src={hero.background.videoUrl} type="video/mp4" />
            </video>
            {/* Fallback image while video loads */}
            {!isVideoLoaded && hero.background.imageUrl && (
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${hero.background.imageUrl})` }}
              />
            )}
          </>
        ) : (
          /* Image Background */
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: hero.background.imageUrl
                ? `url(${hero.background.imageUrl})`
                : undefined,
            }}
          />
        )}

        {/* Gradient overlay for depth */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at center, transparent 0%, var(--color-bg-primary) 100%),
              linear-gradient(to bottom, transparent 0%, var(--color-bg-primary) 100%)
            `,
            opacity: hero.background.overlayOpacity || 0.7,
          }}
        />
      </motion.div>

      {/* Particle Overlay */}
      {siteConfig.theme.animations.particleEffects && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles}
        </div>
      )}

      {/* Cinematic Letterbox (optional) */}
      <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black to-transparent pointer-events-none" />

      {/* Vignette effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: 'inset 0 0 200px rgba(0,0,0,0.8)',
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-4 max-w-5xl mx-auto"
        style={{ opacity, y: textY }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Headline */}
          <h1 className="text-[clamp(3.5rem,12vw,10rem)] font-black leading-[0.9] mb-8">
            <div className="overflow-hidden">
              <motion.div
                variants={lineVariants}
                className="text-[var(--color-primary)]"
                style={{
                  textShadow: '0 0 60px var(--color-primary)',
                }}
              >
                {hero.headline.line1}
              </motion.div>
            </div>
            {hero.headline.line2 && (
              <div className="overflow-hidden">
                <motion.div
                  variants={lineVariants}
                  className="text-[var(--color-text-primary)]"
                >
                  {hero.headline.line2}
                </motion.div>
              </div>
            )}
          </h1>

          {/* Subheadline */}
          <motion.p
            variants={fadeUpVariants}
            className="text-xl md:text-3xl text-[var(--color-text-secondary)] mb-10 tracking-widest uppercase"
          >
            {hero.subheadline}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUpVariants}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            {hero.ctas.map((cta, index) => (
              <Link
                key={index}
                href={cta.href}
                className={`
                  relative inline-flex items-center justify-center h-11 px-6 text-[15px] font-medium
                  uppercase tracking-wide overflow-hidden group rounded-[10px] transition-all duration-150
                  ${cta.variant === 'primary'
                    ? 'bg-[var(--color-primary)] text-[var(--color-text-inverse)] hover:brightness-105 hover:-translate-y-0.5'
                    : 'bg-transparent border border-white/20 text-[var(--color-text-primary)] hover:bg-white/10 hover:border-white/30 hover:-translate-y-0.5'
                  }
                `}
              >
                <span className="relative">{cta.label}</span>
              </Link>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      {hero.scrollIndicator && (
        <motion.div
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <span className="text-xs uppercase tracking-widest text-[var(--color-text-muted)]">
            Scroll
          </span>
          <motion.div
            className="w-6 h-10 border-2 border-[var(--color-text-muted)] rounded-xl flex justify-center pt-2"
            animate={{ borderColor: ['var(--color-text-muted)', 'var(--color-primary)', 'var(--color-text-muted)'] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1.5 h-3 bg-[var(--color-primary)] rounded-sm"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      )}

      {/* Sound indicator (for video) */}
      {hero.background.type === 'video' && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-12 right-12 w-10 h-10 rounded-xl border border-white/20 flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-white/10 hover:border-white/30 transition-all duration-150"
          onClick={() => {
            if (videoRef.current) {
              videoRef.current.muted = !videoRef.current.muted
            }
          }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
          </svg>
        </motion.button>
      )}
    </section>
  )
}

export default HeroCinematic
