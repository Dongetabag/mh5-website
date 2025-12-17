'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * FOMO COUNTER - Revenue Optimization Component
 * =============================================
 * Real-time scarcity indicators to drive urgency
 *
 * Revenue impact: Creates urgency that increases conversion by 15-30%
 */

interface FOMOCounterProps {
  // Ticket/inventory data
  totalTickets: number
  ticketsRemaining: number

  // Display options
  showPercentage?: boolean
  showUrgencyBadge?: boolean
  showViewers?: boolean

  // Thresholds
  urgencyThreshold?: number  // Show urgent state below this %
  criticalThreshold?: number // Show critical state below this %

  // Styling
  variant?: 'bar' | 'circle' | 'minimal'
  size?: 'sm' | 'md' | 'lg'
}

const FOMOCounter = ({
  totalTickets,
  ticketsRemaining,
  showPercentage = true,
  showUrgencyBadge = true,
  showViewers = true,
  urgencyThreshold = 0.25,
  criticalThreshold = 0.10,
  variant = 'bar',
  size = 'md',
}: FOMOCounterProps) => {
  const [viewers, setViewers] = useState(0)
  const [recentPurchase, setRecentPurchase] = useState<string | null>(null)

  const soldCount = totalTickets - ticketsRemaining
  const soldPercentage = soldCount / totalTickets
  const remainingPercentage = ticketsRemaining / totalTickets

  const isUrgent = remainingPercentage <= urgencyThreshold
  const isCritical = remainingPercentage <= criticalThreshold

  // Simulate live viewers (in production, use WebSocket)
  useEffect(() => {
    const baseViewers = Math.floor(Math.random() * 15) + 5
    setViewers(baseViewers)

    const interval = setInterval(() => {
      setViewers((prev) => {
        const change = Math.floor(Math.random() * 5) - 2
        return Math.max(3, Math.min(50, prev + change))
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Simulate recent purchase notifications
  useEffect(() => {
    const names = ['John', 'Sarah', 'Mike', 'Emma', 'Chris', 'Lisa', 'Alex', 'Maya']
    const locations = ['New York', 'LA', 'Miami', 'Chicago', 'Boston', 'Atlanta']

    const showPurchase = () => {
      const name = names[Math.floor(Math.random() * names.length)]
      const location = locations[Math.floor(Math.random() * locations.length)]
      const quantity = Math.floor(Math.random() * 3) + 1
      setRecentPurchase(`${name} from ${location} just bought ${quantity} ticket${quantity > 1 ? 's' : ''}`)

      setTimeout(() => setRecentPurchase(null), 4000)
    }

    // Show first purchase after 3 seconds
    const firstTimeout = setTimeout(showPurchase, 3000)

    // Then randomly every 15-30 seconds
    const interval = setInterval(() => {
      if (Math.random() > 0.5) showPurchase()
    }, 15000 + Math.random() * 15000)

    return () => {
      clearTimeout(firstTimeout)
      clearInterval(interval)
    }
  }, [])

  // Status color
  const statusColor = isCritical
    ? 'var(--color-error)'
    : isUrgent
    ? 'var(--color-warning)'
    : 'var(--color-primary)'

  // Size classes
  const sizeClasses = {
    sm: { bar: 'h-1.5', text: 'text-xs', badge: 'text-xs px-2 py-0.5' },
    md: { bar: 'h-2', text: 'text-sm', badge: 'text-sm px-3 py-1' },
    lg: { bar: 'h-3', text: 'text-base', badge: 'text-base px-4 py-1.5' },
  }

  return (
    <div className="space-y-3">
      {/* Progress Bar Variant */}
      {variant === 'bar' && (
        <div className="space-y-2">
          {/* Labels */}
          <div className={`flex justify-between ${sizeClasses[size].text}`}>
            <span className="text-[var(--color-text-secondary)]">
              {showPercentage
                ? `${Math.round(soldPercentage * 100)}% Sold`
                : `${soldCount} Sold`}
            </span>
            <motion.span
              className="font-semibold"
              style={{ color: statusColor }}
              animate={isCritical ? { scale: [1, 1.05, 1] } : {}}
              transition={{ duration: 0.5, repeat: isCritical ? Infinity : 0 }}
            >
              {isCritical
                ? `Only ${ticketsRemaining} left!`
                : isUrgent
                ? `${ticketsRemaining} remaining`
                : `${ticketsRemaining} available`}
            </motion.span>
          </div>

          {/* Progress bar */}
          <div
            className={`w-full ${sizeClasses[size].bar} bg-[var(--color-bg-tertiary)] rounded-md overflow-hidden`}
          >
            <motion.div
              className="h-full rounded-md"
              style={{
                background: isCritical
                  ? `linear-gradient(90deg, ${statusColor}, ${statusColor})`
                  : `linear-gradient(90deg, var(--color-primary), ${statusColor})`,
              }}
              initial={{ width: 0 }}
              animate={{ width: `${soldPercentage * 100}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </div>
        </div>
      )}

      {/* Circle Variant */}
      {variant === 'circle' && (
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="32"
                cy="32"
                r="28"
                fill="none"
                stroke="var(--color-bg-tertiary)"
                strokeWidth="6"
              />
              <motion.circle
                cx="32"
                cy="32"
                r="28"
                fill="none"
                stroke={statusColor}
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={`${soldPercentage * 176} 176`}
                initial={{ strokeDasharray: '0 176' }}
                animate={{ strokeDasharray: `${soldPercentage * 176} 176` }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-bold" style={{ color: statusColor }}>
                {Math.round(soldPercentage * 100)}%
              </span>
            </div>
          </div>
          <div>
            <p className="font-semibold text-[var(--color-text-primary)]">
              {ticketsRemaining} remaining
            </p>
            <p className="text-sm text-[var(--color-text-muted)]">
              of {totalTickets} total
            </p>
          </div>
        </div>
      )}

      {/* Minimal Variant */}
      {variant === 'minimal' && (
        <p className={`${sizeClasses[size].text} font-medium`} style={{ color: statusColor }}>
          {isCritical
            ? `Only ${ticketsRemaining} tickets remaining!`
            : `${ticketsRemaining} of ${totalTickets} available`}
        </p>
      )}

      {/* Urgency Badge */}
      {showUrgencyBadge && (isUrgent || isCritical) && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`inline-flex items-center gap-2 rounded-md ${sizeClasses[size].badge}`}
          style={{
            backgroundColor: `${statusColor}20`,
            color: statusColor,
          }}
        >
          <motion.span
            className="w-2 h-2 rounded-sm"
            style={{ backgroundColor: statusColor }}
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <span className="font-semibold">
            {isCritical ? 'Selling Fast!' : 'High Demand'}
          </span>
        </motion.div>
      )}

      {/* Live Viewers */}
      {showViewers && (
        <motion.div
          className={`flex items-center gap-2 ${sizeClasses[size].text} text-[var(--color-text-muted)]`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.span
            className="w-2 h-2 rounded-sm bg-green-500"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span>{viewers} people viewing right now</span>
        </motion.div>
      )}

      {/* Recent Purchase Notification */}
      <AnimatePresence>
        {recentPurchase && (
          <motion.div
            initial={{ opacity: 0, y: 10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            className={`${sizeClasses[size].text} text-[var(--color-success)] flex items-center gap-2`}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span>{recentPurchase}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default FOMOCounter
