'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

/**
 * COUNTDOWN TIMER - Signature Component
 * =====================================
 * Animated countdown to event date with urgency styling
 */

interface CountdownTimerProps {
  targetDate: string | Date
  onComplete?: () => void
  variant?: 'default' | 'minimal' | 'dramatic'
  showLabels?: boolean
  showSeconds?: boolean
  className?: string
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

const CountdownTimer = ({
  targetDate,
  onComplete,
  variant = 'default',
  showLabels = true,
  showSeconds = true,
  className = '',
}: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const target = new Date(targetDate).getTime()

    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const difference = target - now

      if (difference <= 0) {
        setIsComplete(true)
        onComplete?.()
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        }
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    }

    setTimeLeft(calculateTimeLeft())
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate, onComplete])

  const formatNumber = (num: number) => num.toString().padStart(2, '0')

  const timeUnits = [
    { value: timeLeft.days, label: 'Days', short: 'D' },
    { value: timeLeft.hours, label: 'Hours', short: 'H' },
    { value: timeLeft.minutes, label: 'Mins', short: 'M' },
    ...(showSeconds ? [{ value: timeLeft.seconds, label: 'Secs', short: 'S' }] : []),
  ]

  if (isComplete) {
    return (
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={`text-center ${className}`}
      >
        <span className="text-2xl font-bold text-[var(--color-primary)]">
          Event Started!
        </span>
      </motion.div>
    )
  }

  // Default variant
  if (variant === 'default') {
    return (
      <div className={`grid grid-cols-${showSeconds ? '4' : '3'} gap-3 ${className}`}>
        {timeUnits.map((unit, index) => (
          <motion.div
            key={unit.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-[var(--color-bg-secondary)] rounded-xl p-4 text-center border border-[var(--color-border-default)]"
          >
            <motion.div
              key={unit.value}
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-3xl md:text-4xl font-black text-[var(--color-primary)] tabular-nums"
            >
              {formatNumber(unit.value)}
            </motion.div>
            {showLabels && (
              <div className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mt-1">
                {unit.label}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    )
  }

  // Minimal variant
  if (variant === 'minimal') {
    return (
      <div className={`flex items-center gap-2 font-mono ${className}`}>
        {timeUnits.map((unit, index) => (
          <span key={unit.label} className="flex items-center">
            <span className="text-[var(--color-text-primary)] font-bold">
              {formatNumber(unit.value)}
            </span>
            <span className="text-[var(--color-text-muted)] text-sm ml-0.5">
              {unit.short}
            </span>
            {index < timeUnits.length - 1 && (
              <span className="text-[var(--color-text-muted)] mx-1">:</span>
            )}
          </span>
        ))}
      </div>
    )
  }

  // Dramatic variant
  return (
    <div className={`relative ${className}`}>
      <div className="flex items-center justify-center gap-4 md:gap-8">
        {timeUnits.map((unit, index) => (
          <motion.div
            key={unit.label}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, type: 'spring' as const }}
            className="relative"
          >
            <div className="relative">
              <motion.div
                key={unit.value}
                initial={{ rotateX: -90 }}
                animate={{ rotateX: 0 }}
                transition={{ type: 'spring' as const, stiffness: 200 }}
                className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[var(--color-primary)] to-[var(--color-primary)]/50 tabular-nums"
                style={{ textShadow: '0 0 40px var(--color-primary)' }}
              >
                {formatNumber(unit.value)}
              </motion.div>
              {/* Glow effect */}
              <div className="absolute inset-0 blur-xl bg-[var(--color-primary)]/20 -z-10" />
            </div>
            {showLabels && (
              <div className="text-center text-xs text-[var(--color-text-muted)] uppercase tracking-widest mt-2">
                {unit.label}
              </div>
            )}
            {/* Separator */}
            {index < timeUnits.length - 1 && (
              <motion.div
                className="absolute -right-2 md:-right-4 top-1/2 -translate-y-1/2 text-[var(--color-primary)]/50 text-4xl font-light"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                :
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default CountdownTimer
