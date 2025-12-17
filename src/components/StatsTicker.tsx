'use client'

import { motion } from 'framer-motion'

/**
 * STATS TICKER - Elite Performance Style
 * ======================================
 * Scrolling neon cyan ticker with stats
 */

const StatsTicker = () => {
  return (
    <div className="bg-[var(--color-primary)] py-4 overflow-hidden relative z-20">
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: "-50%" }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {[...Array(10)].map((_, i) => (
          <div key={i} className="flex items-center gap-12 text-black font-heading font-bold text-xl md:text-2xl uppercase">
            <span>500K+ Community</span>
            <span className="text-white">///</span>
            <span>4x Super 7 Selection</span>
            <span className="text-white">///</span>
            <span>Global Reach</span>
            <span className="text-white">///</span>
            <span>Springfield Legend</span>
            <span className="text-white">///</span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default StatsTicker
