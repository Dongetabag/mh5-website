'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { IconBox, icons } from '@/components/ui/GlossIcon'

interface MediaCategoryCardProps {
  id: string
  label: string
  description: string
  icon: keyof typeof icons
  previewImage: string
  previewVideo?: string
  imageCount: number
  videoCount: number
  href: string
  index?: number
}

export function MediaCategoryCard({
  id,
  label,
  description,
  icon,
  previewImage,
  previewVideo,
  imageCount,
  videoCount,
  href,
  index = 0,
}: MediaCategoryCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <Link
        href={href}
        className="group block relative aspect-[4/5] rounded-2xl overflow-hidden bg-black/30"
        onMouseEnter={() => videoRef.current?.play()}
        onMouseLeave={() => {
          if (videoRef.current) {
            videoRef.current.pause()
            videoRef.current.currentTime = 0
          }
        }}
      >
        {/* Background image */}
        <Image
          src={previewImage}
          alt={label}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          unoptimized
        />

        {/* Video overlay on hover */}
        {previewVideo && (
          <video
            ref={videoRef}
            src={previewVideo}
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            muted
            playsInline
            loop
          />
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

        {/* Content */}
        <div className="absolute inset-0 p-5 flex flex-col justify-end">
          {/* Icon */}
          <div className="mb-3">
            <IconBox icon={icon} size="md" />
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[var(--color-primary)] transition-colors">
            {label}
          </h3>

          {/* Description */}
          <p className="text-gray-400 text-sm mb-3 line-clamp-2">
            {description}
          </p>

          {/* Stats */}
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {imageCount} Photos
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              {videoCount} Videos
            </span>
          </div>

          {/* Arrow indicator */}
          <div className="absolute top-4 right-4 w-8 h-8 rounded-md bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default MediaCategoryCard
