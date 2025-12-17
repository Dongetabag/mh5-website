'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface MediaItem {
  src: string
  poster?: string
  alt?: string
  label?: string
  featured?: boolean
  orientation?: 'portrait' | 'landscape' | 'square'
}

interface MediaGridProps {
  images?: MediaItem[]
  videos?: MediaItem[]
  columns?: 2 | 3 | 4
  gap?: 'sm' | 'md' | 'lg'
  showLabels?: boolean
  className?: string
}

export function MediaGrid({
  images = [],
  videos = [],
  columns = 2,
  gap = 'sm',
  showLabels = true,
  className = '',
}: MediaGridProps) {
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null)
  const [isVideo, setIsVideo] = useState(false)

  const gapClasses = {
    sm: 'gap-1',
    md: 'gap-2',
    lg: 'gap-3',
  }

  const columnClasses = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 sm:grid-cols-3',
    4: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4',
  }

  const openMedia = (item: MediaItem, video: boolean) => {
    setSelectedMedia(item)
    setIsVideo(video)
  }

  return (
    <>
      <div className={`grid ${columnClasses[columns]} ${gapClasses[gap]} ${className}`}>
        {/* Videos first for emphasis */}
        {videos.map((video, index) => (
          <VideoCard
            key={`video-${index}`}
            video={video}
            showLabel={showLabels}
            onClick={() => openMedia(video, true)}
            index={index}
          />
        ))}

        {/* Then images */}
        {images.map((image, index) => (
          <ImageCard
            key={`image-${index}`}
            image={image}
            showLabel={showLabels}
            onClick={() => openMedia(image, false)}
            index={index + videos.length}
          />
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedMedia && (
          <MediaLightbox
            media={selectedMedia}
            isVideo={isVideo}
            onClose={() => setSelectedMedia(null)}
          />
        )}
      </AnimatePresence>
    </>
  )
}

// Video Card Component
function VideoCard({
  video,
  showLabel,
  onClick,
  index,
}: {
  video: MediaItem
  showLabel: boolean
  onClick: () => void
  index: number
}) {
  const videoRef = useRef<HTMLVideoElement>(null)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="relative aspect-[9/16] rounded-xl overflow-hidden bg-black/20 cursor-pointer group"
      onClick={onClick}
    >
      <video
        ref={videoRef}
        src={video.src}
        poster={video.poster}
        className="absolute inset-0 w-full h-full object-cover"
        muted
        playsInline
        loop
        onMouseEnter={() => videoRef.current?.play()}
        onMouseLeave={() => {
          if (videoRef.current) {
            videoRef.current.pause()
            videoRef.current.currentTime = 0
          }
        }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />

      {/* Play icon */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
          <svg className="w-5 h-5 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </div>
      </div>

      {/* Label */}
      {showLabel && video.label && (
        <div className="absolute bottom-2 left-2 right-2">
          <span className="inline-block px-2 py-1 bg-[var(--color-primary)] text-black text-[10px] font-bold rounded-md uppercase tracking-wide">
            {video.label}
          </span>
        </div>
      )}
    </motion.div>
  )
}

// Image Card Component
function ImageCard({
  image,
  showLabel,
  onClick,
  index,
}: {
  image: MediaItem
  showLabel: boolean
  onClick: () => void
  index: number
}) {
  const aspectClass = image.orientation === 'landscape'
    ? 'aspect-video'
    : image.orientation === 'square'
      ? 'aspect-square'
      : 'aspect-[9/16]'

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className={`relative ${aspectClass} rounded-xl overflow-hidden bg-black/20 cursor-pointer group`}
      onClick={onClick}
    >
      <Image
        src={image.src}
        alt={image.alt || ''}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        className="object-cover group-hover:scale-105 transition-transform duration-500"
        unoptimized
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

      {/* Expand icon on hover */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
        </div>
      </div>

      {/* Label */}
      {showLabel && image.alt && (
        <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="inline-block px-2 py-1 bg-black/60 backdrop-blur-sm text-white text-[10px] font-medium rounded-md line-clamp-1">
            {image.alt}
          </span>
        </div>
      )}
    </motion.div>
  )
}

// Lightbox Component
function MediaLightbox({
  media,
  isVideo,
  onClose,
}: {
  media: MediaItem
  isVideo: boolean
  onClose: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        className="absolute top-4 right-4 w-10 h-10 rounded-md bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
        onClick={onClose}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Media content */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="max-w-4xl max-h-[90vh] w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {isVideo ? (
          <video
            src={media.src}
            poster={media.poster}
            className="w-full h-full max-h-[90vh] object-contain rounded-xl"
            controls
            autoPlay
            playsInline
          />
        ) : (
          <div className="relative w-full h-[90vh]">
            <Image
              src={media.src}
              alt={media.alt || ''}
              fill
              className="object-contain rounded-xl"
              unoptimized
            />
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

export default MediaGrid
