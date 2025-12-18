'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import GradientText from '@/components/GradientText'

/**
 * FUNNEL HERO - Elite Performance Style
 * =====================================
 * Large bold typography with neon accents
 * Keeps the phone video showcase from MH5
 * Milan Harrison branding
 */

export default function FunnelHero() {
  const [isMuted, setIsMuted] = useState(true)
  const [isPlaying, setIsPlaying] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const verticalVideoRef = useRef<HTMLVideoElement>(null)
  const { scrollYProgress } = useScroll()
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

  const handleToggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleTogglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play().catch((error) => {
          console.warn('Video play failed:', error)
        })
      }
      setIsPlaying(!isPlaying)
    }
  }

  // Effect for background video error handling
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleVideoError = (e: Event) => {
      console.error("Hero background video error:", e, video.error)
      // Try to reload or switch source
      video.load()
    }

    const handleCanPlay = () => {
      if (video.paused && isPlaying) {
        video.play().catch(e => {
          console.warn("Autoplay prevented:", e)
        })
      }
    }

    video.addEventListener('error', handleVideoError)
    video.addEventListener('canplay', handleCanPlay)

    return () => {
      video.removeEventListener('error', handleVideoError)
      video.removeEventListener('canplay', handleCanPlay)
    }
  }, [isPlaying])

  // Effect for vertical video error handling
  useEffect(() => {
    const video = verticalVideoRef.current
    if (!video) return

    const handleVideoError = (e: Event) => {
      console.error("Vertical highlight video error:", e, video.error)
      video.load()
    }

    video.addEventListener('error', handleVideoError)
    return () => video.removeEventListener('error', handleVideoError)
  }, [])

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    })
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#050505]">
      {/* Background Video Layer (Desktop) */}
      <div className="absolute inset-0 hidden lg:block">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black z-10" />
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          preload="auto"
          className="w-full h-full object-cover opacity-40"
        >
          <source src="/videos/hero/hero-bg.mp4" type="video/mp4" />
          <source src="/videos/hero/hero-bg.MOV" type="video/quicktime" />
        </video>
      </div>

      {/* Main Content */}
      <motion.div
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative z-20 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-8 lg:py-0"
      >
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

          {/* Hero Text Content - Elite Performance Style */}
          <div className="flex-1 text-center lg:text-left order-2 lg:order-1">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-6"
            >
              <span className="inline-block bg-[var(--color-primary)] text-black px-4 py-1.5 text-xs md:text-sm font-bold uppercase tracking-[0.3em]">
                The Top 1% Protocol
              </span>
            </motion.div>

            {/* Main Headline - Large Bold Text with Glitch Effect */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <GradientText
                text="EXECUTE"
                as="h1"
                className="text-[18vw] md:text-[12vw] lg:text-[10vw] xl:text-[8vw] leading-[0.85]"
              />
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 md:gap-4 mt-[-1vw]">
                <GradientText
                  text="EVOLVE"
                  as="span"
                  className="text-[10vw] md:text-[7vw] lg:text-[5vw] xl:text-[4vw] leading-[0.9] opacity-50"
                />
                <GradientText
                  text="EXCEL"
                  as="span"
                  className="text-[10vw] md:text-[7vw] lg:text-[5vw] xl:text-[4vw] leading-[0.9] opacity-50"
                />
              </div>
            </motion.div>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-6 md:mt-8 text-sm md:text-base text-gray-400 max-w-xl uppercase tracking-widest leading-relaxed mx-auto lg:mx-0"
            >
              Stop Dreaming. Start Doing. Experience the journey of Milan Harrison from Springfield to the global stage.
            </motion.p>

            {/* CTA Buttons - Elite Performance Style */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link
                href="/events"
                className="h-12 sm:h-14 px-8 flex items-center justify-center bg-[var(--color-primary)] text-black font-bold uppercase tracking-widest text-sm hover:brightness-110 transition-all min-w-[200px] text-center"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Join The Movement
              </Link>
              <Link
                href="/legacy"
                className="h-12 sm:h-14 px-8 flex items-center justify-center border border-white/20 bg-white/5 text-white font-bold uppercase tracking-widest text-sm hover:bg-white/10 hover:border-white/30 transition-all min-w-[200px] text-center"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Watch The Story
              </Link>
            </motion.div>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap justify-center lg:justify-start gap-8 sm:gap-12 mt-10 md:mt-12"
            >
              <div className="text-center lg:text-left">
                <div className="text-3xl md:text-4xl font-heading font-bold text-white mb-1">4x</div>
                <div className="text-xs uppercase tracking-widest text-[var(--color-primary)]">Super 7</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl md:text-4xl font-heading font-bold text-white mb-1">500K+</div>
                <div className="text-xs uppercase tracking-widest text-[var(--color-primary)]">Community</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl md:text-4xl font-heading font-bold text-white mb-1">10+</div>
                <div className="text-xs uppercase tracking-widest text-[var(--color-primary)]">Events</div>
              </div>
            </motion.div>
          </div>

          {/* Vertical Video Showcase (Phone Frame) */}
          <div className="relative w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[360px] mx-auto lg:mx-0 order-1 lg:order-2">
            {/* Phone Frame */}
            <div className="relative">
              {/* Neon Glow Border */}
              <div className="absolute -inset-2 bg-gradient-to-b from-[var(--color-primary)] via-white/20 to-[var(--color-primary)] rounded-[3rem] opacity-60 blur-sm" />

              {/* Phone Container */}
              <div className="relative bg-black rounded-[2.5rem] p-3 shadow-2xl">
                {/* Screen */}
                <div className="relative aspect-[9/16] bg-[#111] rounded-[2rem] overflow-hidden">
                  {/* Vertical Video */}
                  <video
                    ref={verticalVideoRef}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    className="absolute inset-0 w-full h-full object-cover"
                  >
                    <source src="/videos/hero/vertical-highlight.mp4" type="video/mp4" />
                    <source src="/videos/hero/vertical-highlight.MOV" type="video/quicktime" />
                  </video>

                  {/* Video Overlay - TikTok Style */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

                  {/* Top Bar */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="text-white/80 text-xs font-medium">@therealmilan5</span>
                    <div className="flex items-center gap-1.5 px-2 py-0.5 bg-red-500/90 rounded text-[10px] text-white font-medium">
                      <span className="w-1.5 h-1.5 rounded-sm bg-white animate-pulse" />
                      LIVE
                    </div>
                  </div>

                  {/* Right Side Actions - TikTok Style */}
                  <div className="absolute right-3 bottom-24 flex flex-col items-center gap-5">
                    <button className="flex flex-col items-center gap-1">
                      <div className="w-10 h-10 bg-white/20 rounded-md flex items-center justify-center backdrop-blur-sm">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                      </div>
                      <span className="text-[10px] text-white font-medium">24.5K</span>
                    </button>
                    <button className="flex flex-col items-center gap-1">
                      <div className="w-10 h-10 bg-white/20 rounded-md flex items-center justify-center backdrop-blur-sm">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18z"/>
                        </svg>
                      </div>
                      <span className="text-[10px] text-white font-medium">1.2K</span>
                    </button>
                    <button className="flex flex-col items-center gap-1">
                      <div className="w-10 h-10 bg-white/20 rounded-md flex items-center justify-center backdrop-blur-sm">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/>
                        </svg>
                      </div>
                      <span className="text-[10px] text-white font-medium">Share</span>
                    </button>
                  </div>

                  {/* Bottom Content */}
                  <div className="absolute bottom-4 left-4 right-16">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-md bg-[var(--color-primary)] flex items-center justify-center text-xs font-bold text-black">
                        MH
                      </div>
                      <span className="text-white font-semibold text-sm">Milan Harrison</span>
                      <span className="px-2 py-0.5 bg-[var(--color-primary)] rounded text-[10px] font-medium text-black">Follow</span>
                    </div>
                    <p className="text-white text-xs leading-relaxed">
                      From Springfield to the World. The Movement Has 5ive.
                    </p>
                    <div className="flex items-center gap-1 mt-2">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                      </svg>
                      <span className="text-white/60 text-[10px]">Original Sound - MH5</span>
                    </div>
                  </div>
                </div>

                {/* Phone Notch */}
                <div className="absolute top-5 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-xl" />
              </div>
            </div>

            {/* Video Controls - Elite Performance Style */}
            <div className="flex justify-center gap-3 mt-6">
              <button
                onClick={handleTogglePlay}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/20 text-white text-xs uppercase tracking-widest font-bold hover:bg-white/10 hover:border-white/30 transition"
              >
                {isPlaying ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5"/>
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"/>
                  </svg>
                )}
                {isPlaying ? 'Pause' : 'Play'}
              </button>
              <button
                onClick={handleToggleMute}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/20 text-white text-xs uppercase tracking-widest font-bold hover:bg-white/10 hover:border-white/30 transition"
              >
                {isMuted ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"/>
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"/>
                  </svg>
                )}
                {isMuted ? 'Unmute' : 'Mute'}
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator - Elite Performance Style */}
      <motion.button
        onClick={scrollToContent}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 hover:text-white transition z-30"
      >
        <span className="text-[10px] uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-[1px] h-12 bg-gradient-to-b from-[var(--color-primary)] to-transparent"
        />
      </motion.button>
    </section>
  )
}
