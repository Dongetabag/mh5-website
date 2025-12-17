'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const EventSpotlight = () => {
  // Mock event data - would come from CMS in production
  const event = {
    id: 'spring-tournament-2024',
    title: 'MH5 Spring Tournament',
    date: '2024-03-15',
    time: '7:00 PM EST',
    venue: 'Springfield Arena',
    location: 'Springfield, MA',
    type: 'Tournament',
    ticketsRemaining: 47,
    totalTickets: 200,
    price: {
      general: 25,
      vip: 75,
      vvip: 150,
    },
    featured: true,
  }

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const eventDate = new Date(event.date + 'T19:00:00')

    const calculateTimeLeft = () => {
      const now = new Date()
      const difference = eventDate.getTime() - now.getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / (1000 * 60)) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [event.date])

  const soldPercentage = Math.round(
    ((event.totalTickets - event.ticketsRemaining) / event.totalTickets) * 100
  )

  return (
    <div className="bg-midnight rounded-2xl overflow-hidden border border-white/10 card-hover">
      <div className="grid lg:grid-cols-2">
        {/* Image Section */}
        <div className="relative aspect-video lg:aspect-auto lg:min-h-[400px] bg-smoke">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-offwhite/30">
              <svg
                className="w-16 h-16 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              <p>Event Image</p>
              <p className="text-sm">[PLACEHOLDER]</p>
            </div>
          </div>
          {/* Event Type Badge */}
          <div className="absolute top-4 left-4 bg-ice text-midnight px-4 py-1 rounded-lg text-sm font-semibold">
            {event.type}
          </div>
          {/* Featured Badge */}
          <div className="absolute top-4 right-4 bg-danger text-white px-4 py-1 rounded-lg text-sm font-semibold animate-pulse">
            Featured
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8 lg:p-10">
          <h3 className="text-2xl md:text-3xl font-bold text-offwhite mb-4">
            {event.title}
          </h3>

          <div className="space-y-3 mb-6">
            <div className="flex items-center text-offwhite/70">
              <svg
                className="w-5 h-5 mr-3 text-ice"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {new Date(event.date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
            <div className="flex items-center text-offwhite/70">
              <svg
                className="w-5 h-5 mr-3 text-ice"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {event.time}
            </div>
            <div className="flex items-center text-offwhite/70">
              <svg
                className="w-5 h-5 mr-3 text-ice"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              {event.venue}, {event.location}
            </div>
          </div>

          {/* Countdown */}
          <div className="mb-6">
            <p className="text-offwhite/50 text-sm mb-3 uppercase tracking-wider">
              Event Starts In
            </p>
            <div className="grid grid-cols-4 gap-3">
              {[
                { value: timeLeft.days, label: 'Days' },
                { value: timeLeft.hours, label: 'Hours' },
                { value: timeLeft.minutes, label: 'Mins' },
                { value: timeLeft.seconds, label: 'Secs' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-smoke rounded-lg p-3 text-center"
                >
                  <div className="text-2xl font-bold text-ice font-accent">
                    {item.value.toString().padStart(2, '0')}
                  </div>
                  <div className="text-xs text-offwhite/50">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Scarcity Indicator */}
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-offwhite/70">Tickets Sold</span>
              <span className="text-danger font-semibold">
                Only {event.ticketsRemaining} spots left!
              </span>
            </div>
            <div className="h-2 bg-smoke rounded-md overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-ice to-danger rounded-md transition-all duration-500"
                style={{ width: `${soldPercentage}%` }}
              />
            </div>
            <p className="text-right text-offwhite/50 text-xs mt-1">
              {soldPercentage}% Sold
            </p>
          </div>

          {/* Price Tiers */}
          <div className="flex flex-wrap gap-3 mb-6">
            <span className="bg-smoke px-4 py-2 rounded-lg text-sm">
              <span className="text-offwhite/50">General: </span>
              <span className="text-offwhite font-semibold">
                ${event.price.general}
              </span>
            </span>
            <span className="bg-smoke px-4 py-2 rounded-lg text-sm border border-ice/30">
              <span className="text-offwhite/50">VIP: </span>
              <span className="text-ice font-semibold">${event.price.vip}</span>
            </span>
            <span className="bg-smoke px-4 py-2 rounded-lg text-sm border border-electric/30">
              <span className="text-offwhite/50">VVIP: </span>
              <span className="text-electric font-semibold">
                ${event.price.vvip}
              </span>
            </span>
          </div>

          {/* CTA */}
          <Link
            href={`/events/${event.id}`}
            className="btn-diamond w-full text-center block text-lg"
          >
            Get Tickets Now
          </Link>
        </div>
      </div>
    </div>
  )
}

export default EventSpotlight
