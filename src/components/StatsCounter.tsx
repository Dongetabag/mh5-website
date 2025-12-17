'use client'

import { useEffect, useState, useRef } from 'react'

interface Stat {
  value: number
  suffix: string
  label: string
}

const stats: Stat[] = [
  { value: 65, suffix: '', label: 'Points in First 2 Games' },
  { value: 27, suffix: '', label: 'Points in Program First Win' },
  { value: 4, suffix: '', label: 'Super 7 Selections' },
  { value: 100, suffix: 'K+', label: 'Social Reach' },
]

const StatsCounter = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [counts, setCounts] = useState(stats.map(() => 0))
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const duration = 2000
    const steps = 60
    const interval = duration / steps

    stats.forEach((stat, index) => {
      let current = 0
      const increment = stat.value / steps

      const timer = setInterval(() => {
        current += increment
        if (current >= stat.value) {
          current = stat.value
          clearInterval(timer)
        }
        setCounts((prev) => {
          const newCounts = [...prev]
          newCounts[index] = Math.floor(current)
          return newCounts
        })
      }, interval)
    })
  }, [isVisible])

  return (
    <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-8">
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className="text-center p-6 bg-smoke rounded-xl card-hover"
        >
          <div className="text-4xl md:text-5xl font-black text-gradient-diamond font-accent mb-2">
            {counts[index]}
            <span className="text-ice">{stat.suffix}</span>
          </div>
          <p className="text-offwhite/60 text-sm md:text-base">{stat.label}</p>
        </div>
      ))}
    </div>
  )
}

export default StatsCounter
