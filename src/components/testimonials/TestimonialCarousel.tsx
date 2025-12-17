'use client'

import { useState, useEffect, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

/**
 * TESTIMONIAL CAROUSEL - Testimonials Component
 * ============================================
 * Auto-rotating carousel for social proof
 * Smooth transitions with navigation controls
 * Responsive touch support
 */

interface Testimonial {
  id: string
  content: string
  author: string
  role?: string
  avatar?: string
  rating?: number
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[]
  autoRotate?: boolean
  rotateInterval?: number
  showDots?: boolean
  showArrows?: boolean
  className?: string
}

const TestimonialCarousel = ({
  testimonials,
  autoRotate = true,
  rotateInterval = 5000,
  showDots = true,
  showArrows = true,
  className = '',
}: TestimonialCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Auto-rotate functionality
  useEffect(() => {
    if (!autoRotate || testimonials.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, rotateInterval)

    return () => clearInterval(interval)
  }, [autoRotate, rotateInterval, testimonials.length])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const currentTestimonial = testimonials[currentIndex]

  if (!currentTestimonial) return null

  return (
    <div className={`relative w-full ${className}`}>
      {/* Main Carousel */}
      <div className="relative overflow-hidden rounded-lg">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="p-8 md:p-12"
          >
            {/* Rating Stars */}
            {currentTestimonial.rating && (
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${
                      i < currentTestimonial.rating!
                        ? 'text-[var(--color-primary)] fill-current'
                        : 'text-gray-600'
                    }`}
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
            )}

            {/* Testimonial Content */}
            <blockquote className="text-xl md:text-2xl font-medium text-[var(--color-text-primary)] mb-6 italic">
              "{currentTestimonial.content}"
            </blockquote>

            {/* Author Info */}
            <div className="flex items-center gap-4">
              {currentTestimonial.avatar && (
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-[var(--color-bg-secondary)]">
                  <Image
                    src={currentTestimonial.avatar}
                    alt={currentTestimonial.author}
                    fill
                    sizes="48px"
                    className="object-cover"
                    unoptimized
                  />
                </div>
              )}
              <div>
                <div className="font-bold text-[var(--color-text-primary)]">
                  {currentTestimonial.author}
                </div>
                {currentTestimonial.role && (
                  <div className="text-sm text-[var(--color-text-secondary)]">
                    {currentTestimonial.role}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      {showArrows && testimonials.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[var(--color-bg-secondary)]/80 backdrop-blur-sm border border-[var(--color-border-default)] flex items-center justify-center text-[var(--color-text-primary)] hover:bg-[var(--color-primary)] hover:text-black transition-colors z-10"
            aria-label="Previous testimonial"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[var(--color-bg-secondary)]/80 backdrop-blur-sm border border-[var(--color-border-default)] flex items-center justify-center text-[var(--color-text-primary)] hover:bg-[var(--color-primary)] hover:text-black transition-colors z-10"
            aria-label="Next testimonial"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {showDots && testimonials.length > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-[var(--color-primary)] w-8'
                  : 'bg-[var(--color-text-muted)] hover:bg-[var(--color-text-secondary)]'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default TestimonialCarousel

