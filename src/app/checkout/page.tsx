'use client'

/**
 * CHECKOUT PAGE
 * Complete checkout flow with shipping information and payment
 */

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useCart } from '@/context/CartContext'
import Link from 'next/link'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotal, clearCart } = useCart()
  const [loading, setLoading] = useState(false)
  const [processingPayment, setProcessingPayment] = useState(false)

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'US',
    phone: '',
  })

  const subtotal = getTotal()
  const shipping = subtotal >= 50 ? 0 : 10
  const tax = subtotal * 0.08 // 8% tax
  const total = subtotal + shipping + tax

  useEffect(() => {
    if (items.length === 0) {
      router.push('/shop')
    }
  }, [items, router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setProcessingPayment(true)

    try {
      // Create payment intent
      const response = await fetch('/api/stripe/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: total,
          currency: 'usd',
          metadata: {
            items: JSON.stringify(items),
            shipping: JSON.stringify(formData),
          },
        }),
      })

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.error || 'Failed to create payment intent')
      }

      // TODO: Redirect to Stripe Checkout or handle payment
      // For now, simulate successful order
      alert('Checkout functionality will be integrated with Stripe. Order total: $' + total.toFixed(2))
      
      // Clear cart after successful order
      clearCart()
      router.push('/shop?order=success')
    } catch (error: any) {
      console.error('Checkout error:', error)
      alert('Payment failed: ' + error.message)
    } finally {
      setProcessingPayment(false)
    }
  }

  if (items.length === 0) {
    return null
  }

  return (
    <div className="bg-[#0a0a0a] min-h-screen pt-20 sm:pt-24 lg:pt-32">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/shop"
            className="text-gray-400 hover:text-[var(--color-primary)] transition-colors mb-4 inline-flex items-center gap-2 text-sm"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Shop
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
            Checkout
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Contact Information */}
              <div className="bg-[#1a1a1a] rounded-xl p-6 border border-white/10">
                <h2 className="text-xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                  Contact Information
                </h2>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full h-12 sm:h-14 px-6 bg-white/5 border border-white/20 rounded-sm text-white text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50 focus:border-[var(--color-primary)]/50"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-[#1a1a1a] rounded-xl p-6 border border-white/10">
                <h2 className="text-xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                  Shipping Address
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full h-12 sm:h-14 px-6 bg-white/5 border border-white/20 rounded-sm text-white text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50 focus:border-[var(--color-primary)]/50"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full h-12 sm:h-14 px-6 bg-white/5 border border-white/20 rounded-sm text-white text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50 focus:border-[var(--color-primary)]/50"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-gray-400 text-sm mb-2">Address</label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full h-12 sm:h-14 px-6 bg-white/5 border border-white/20 rounded-sm text-white text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50 focus:border-[var(--color-primary)]/50"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">City</label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full h-12 sm:h-14 px-6 bg-white/5 border border-white/20 rounded-sm text-white text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50 focus:border-[var(--color-primary)]/50"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">State</label>
                    <input
                      type="text"
                      name="state"
                      required
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full h-12 sm:h-14 px-6 bg-white/5 border border-white/20 rounded-sm text-white text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50 focus:border-[var(--color-primary)]/50"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">ZIP Code</label>
                    <input
                      type="text"
                      name="zip"
                      required
                      value={formData.zip}
                      onChange={handleInputChange}
                      className="w-full h-12 sm:h-14 px-6 bg-white/5 border border-white/20 rounded-sm text-white text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50 focus:border-[var(--color-primary)]/50"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-gray-400 text-sm mb-2">Phone (Optional)</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full h-12 sm:h-14 px-6 bg-white/5 border border-white/20 rounded-sm text-white text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50 focus:border-[var(--color-primary)]/50"
                  />
                </div>
              </div>

              {/* Payment Section */}
              <div className="bg-[#1a1a1a] rounded-xl p-6 border border-white/10">
                <h2 className="text-xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                  Payment
                </h2>
                <div className="p-4 bg-[#0a0a0a] rounded-lg border border-white/10">
                  <p className="text-gray-400 text-sm mb-2">
                    Payment will be processed securely through Stripe
                  </p>
                  <p className="text-gray-500 text-xs">
                    Card details will be collected on the next step
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={processingPayment}
                className={`w-full h-14 px-8 bg-[var(--color-primary)] text-black font-bold uppercase tracking-widest text-sm hover:brightness-110 active:scale-[0.98] transition-all duration-200 ${
                  processingPayment ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {processingPayment ? 'PROCESSING...' : `PAY $${total.toFixed(2)}`}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-[#1a1a1a] rounded-xl p-6 border border-white/10 sticky top-24">
              <h2 className="text-xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                Order Summary
              </h2>

              {/* Items */}
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-[#0a0a0a] flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-semibold truncate">{item.name}</p>
                      <p className="text-gray-400 text-xs">
                        {item.size}
                        {item.color && ` • ${item.color}`}
                      </p>
                      <p className="text-gray-400 text-xs mt-1">
                        Qty: {item.quantity} × ${item.price.toFixed(2)}
                      </p>
                    </div>
                    <p className="text-[var(--color-primary)] font-bold text-sm">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-3 pt-6 border-t border-white/10">
                <div className="flex justify-between text-gray-400 text-sm">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400 text-sm">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-gray-400 text-sm">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-white text-lg font-bold pt-3 border-t border-white/10">
                  <span>Total</span>
                  <span className="text-[var(--color-primary)]">${total.toFixed(2)}</span>
                </div>
              </div>

              {subtotal < 50 && (
                <div className="mt-4 p-3 bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/30 rounded-lg">
                  <p className="text-[var(--color-primary)] text-xs font-semibold text-center">
                    Add ${(50 - subtotal).toFixed(2)} more for FREE shipping!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

