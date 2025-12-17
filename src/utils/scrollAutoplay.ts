/**
 * SCROLL AUTOPLAY UTILITY
 * =======================
 * Intersection Observer-based autoplay for videos when they enter viewport
 * Optimized for mobile and vertical video content
 */

export interface AutoplayOptions {
  threshold?: number
  rootMargin?: string
  once?: boolean
  muted?: boolean
}

/**
 * Initialize scroll autoplay for videos
 */
export function initScrollAutoplay(
  selector: string = 'video[data-autoplay]',
  options: AutoplayOptions = {}
) {
  const {
    threshold = 0.5,
    rootMargin = '0px',
    once = true,
    muted = true,
  } = options

  if (typeof window === 'undefined') return

  const videos = document.querySelectorAll<HTMLVideoElement>(selector)

  if (videos.length === 0) return

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const video = entry.target as HTMLVideoElement

        if (entry.isIntersecting) {
          // Ensure video is muted for autoplay
          if (muted) {
            video.muted = true
          }

          // Play video
          video.play().catch((error) => {
            console.warn('Video autoplay failed:', error)
          })

          // If once is true, stop observing after first play
          if (once) {
            observer.unobserve(video)
          }
        } else {
          // Pause video when out of viewport
          video.pause()
        }
      })
    },
    {
      threshold,
      rootMargin,
    }
  )

  videos.forEach((video) => {
    observer.observe(video)
    
    // Set video attributes for mobile optimization
    video.setAttribute('playsinline', 'true')
    video.setAttribute('webkit-playsinline', 'true')
    
    // Preload for better performance
    video.setAttribute('preload', 'metadata')
  })

  return () => {
    videos.forEach((video) => observer.unobserve(video))
  }
}

/**
 * Initialize autoplay on page load
 */
export function setupScrollAutoplay() {
  if (typeof window === 'undefined') return

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initScrollAutoplay()
    })
  } else {
    initScrollAutoplay()
  }
}



