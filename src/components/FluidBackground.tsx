'use client'

import { motion } from 'framer-motion'

const GridOverlay = () => (
  <div
    className="absolute inset-0 z-0 pointer-events-none opacity-20"
    style={{
      backgroundImage: `linear-gradient(to right, #333 1px, transparent 1px),
                        linear-gradient(to bottom, #333 1px, transparent 1px)`,
      backgroundSize: '40px 40px'
    }}
  />
)

const FluidBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#050505]">

      <GridOverlay />

      {/* Blob 1: Dark Grey */}
      <motion.div
        className="absolute top-[-20%] left-[-10%] w-[80vw] h-[80vw] bg-[#1a1a1a] rounded-3xl mix-blend-overlay filter blur-[60px] opacity-60 will-change-transform"
        animate={{
          x: [0, 50, -25, 0],
          y: [0, -25, 25, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Blob 2: Ice Blue Accent */}
      <motion.div
        className="absolute top-[40%] right-[-10%] w-[60vw] h-[60vw] bg-[var(--color-primary)] rounded-3xl mix-blend-soft-light filter blur-[80px] opacity-10 will-change-transform"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.15, 0.05],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Blob 3: Deep Blue/Grey */}
      <motion.div
        className="absolute bottom-[-20%] left-[20%] w-[90vw] h-[90vw] bg-[#111] rounded-3xl mix-blend-normal filter blur-[50px] opacity-80 will-change-transform"
        animate={{
          x: [0, 30, -30, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Noise Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/50 to-[#050505] pointer-events-none" />
    </div>
  )
}

export default FluidBackground
