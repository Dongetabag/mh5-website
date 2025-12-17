'use client'

/**
 * PRODUCT DETAIL PAGE
 * Individual product page with easy size and design picker
 */

import { useState, useEffect, useMemo } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { getProductById, type Product } from '@/data/products'

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const productId = parseInt(params.id as string)
  
  const [product, setProduct] = useState<Product | null>(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedDesign, setSelectedDesign] = useState<string | null>(null)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const productData = getProductById(productId)
    if (productData) {
      setProduct(productData)
      // Extract unique designs and sizes from variants
      const designs = new Set(productData.variants.map(v => {
        // Extract design name (e.g., "Classic Front" from "Classic Front - Small")
        const parts = v.name.split(' - ')
        return parts[0]
      }))
      const sizes = new Set(productData.variants.map(v => v.size).filter(Boolean))
      
      // Set defaults
      setSelectedDesign(Array.from(designs)[0] as string || null)
      setSelectedSize(Array.from(sizes)[0] as string || null)
      setLoading(false)
    } else {
      setLoading(false)
    }
  }, [productId])

  // Get available designs
  const availableDesigns = useMemo(() => {
    if (!product) return []
    const designs = new Set<string>()
    product.variants.forEach(v => {
      const parts = v.name.split(' - ')
      if (parts[0]) designs.add(parts[0])
    })
    return Array.from(designs)
  }, [product])

  // Get available sizes
  const availableSizes = useMemo(() => {
    if (!product || !selectedDesign) return []
    const sizes = new Set<string>()
    product.variants.forEach(v => {
      const parts = v.name.split(' - ')
      if (parts[0] === selectedDesign && v.size) {
        sizes.add(v.size)
      }
    })
    return Array.from(sizes).sort((a, b) => {
      const sizeOrder = ['S', 'M', 'L', 'XL', 'XXL']
      return sizeOrder.indexOf(a) - sizeOrder.indexOf(b)
    })
  }, [product, selectedDesign])

  // Get current variant based on selected design and size
  const currentVariant = useMemo(() => {
    if (!product || !selectedDesign || !selectedSize) return null
    return product.variants.find(v => {
      const parts = v.name.split(' - ')
      return parts[0] === selectedDesign && v.size === selectedSize && v.available !== false
    })
  }, [product, selectedDesign, selectedSize])

  // Update image when design changes
  useEffect(() => {
    if (selectedDesign && product) {
      const designIndex = availableDesigns.indexOf(selectedDesign)
      if (designIndex >= 0 && designIndex < product.images.length) {
        setSelectedImage(designIndex)
      }
    }
  }, [selectedDesign, product, availableDesigns])

  if (loading) {
    return (
      <div className="bg-[#0a0a0a] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-primary)]"></div>
          <p className="text-gray-400 mt-4">Loading product...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="bg-[#0a0a0a] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 mb-4">Product not found</p>
          <Link
            href="/shop"
            className="px-6 py-3 bg-[var(--color-primary)] text-black font-bold uppercase tracking-widest text-sm hover:brightness-110 transition"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Back to Shop
          </Link>
        </div>
      </div>
    )
  }

  const price = currentVariant?.retail_price || currentVariant?.price || '0'
  const color = currentVariant?.color || 'Snow Wash'

  return (
    <div className="bg-[#0a0a0a] min-h-screen pt-20 sm:pt-24 lg:pt-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="text-gray-400 hover:text-[var(--color-primary)] transition-colors mb-8 flex items-center gap-2 text-sm"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Shop
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Product Images */}
          <div className="sticky top-24 self-start">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative aspect-square rounded-2xl overflow-hidden bg-[#111] border border-white/10 mb-4"
            >
              {product.images[selectedImage] && (
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              )}
            </motion.div>

            {/* Thumbnail Gallery */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? 'border-[var(--color-primary)] ring-2 ring-[var(--color-primary)]/30'
                        : 'border-white/10 hover:border-white/30'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {/* Title */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                {product.name}
              </h1>

              {/* Price - Large and Prominent */}
              <div className="mb-6">
                <p className="text-4xl sm:text-5xl font-bold text-[var(--color-primary)]">
                  ${parseFloat(price).toFixed(2)}
                </p>
                {color && (
                  <p className="text-gray-400 text-sm mt-2 uppercase tracking-wider">
                    {color}
                  </p>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-400 text-base sm:text-lg mb-8 leading-relaxed">
                {product.description}
              </p>

              {/* Design Picker */}
              {availableDesigns.length > 0 && (
                <div className="mb-6">
                  <label className="block text-white font-semibold mb-3 text-sm uppercase tracking-wider" style={{ fontFamily: 'var(--font-heading)' }}>
                    Select Design
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {availableDesigns.map((design) => {
                      const isSelected = selectedDesign === design
                      const designImageIndex = availableDesigns.indexOf(design)
                      
                      return (
                        <button
                          key={design}
                          onClick={() => setSelectedDesign(design)}
                          className={`relative group aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                            isSelected
                              ? 'border-[var(--color-primary)] ring-2 ring-[var(--color-primary)]/30'
                              : 'border-white/10 hover:border-white/30'
                          }`}
                        >
                          {product.images[designImageIndex] && (
                            <img
                              src={product.images[designImageIndex]}
                              alt={design}
                              className="w-full h-full object-cover"
                            />
                          )}
                          <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-3 ${
                            isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 transition-opacity'
                          }`}>
                            <span className={`text-xs font-bold uppercase tracking-wider ${
                              isSelected ? 'text-[var(--color-primary)]' : 'text-white'
                            }`}>
                              {design}
                            </span>
                          </div>
                          {isSelected && (
                            <div className="absolute top-2 right-2 w-5 h-5 bg-[var(--color-primary)] rounded-full flex items-center justify-center">
                              <svg className="w-3 h-3 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                          )}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Size Picker */}
              {availableSizes.length > 0 && (
                <div className="mb-6">
                  <label className="block text-white font-bold mb-4 text-base uppercase tracking-wide" style={{ fontFamily: 'var(--font-heading)' }}>
                    SELECT SIZE
                  </label>
                  <div className="flex flex-col gap-3 max-w-xs">
                    {availableSizes.map((size) => {
                      const isSelected = selectedSize === size
                      const sizeVariant = product.variants.find(v => {
                        const parts = v.name.split(' - ')
                        return parts[0] === selectedDesign && v.size === size
                      })
                      const isAvailable = sizeVariant?.available !== false
                      
                      return (
                        <button
                          key={size}
                          onClick={() => isAvailable && setSelectedSize(size)}
                          disabled={!isAvailable}
                          className={`relative w-full h-14 rounded-xl border-2 font-bold text-base uppercase tracking-wide transition-all flex items-center justify-center ${
                            isSelected
                              ? 'border-[var(--color-primary)] bg-[#1A1A1A] text-white'
                              : isAvailable
                              ? 'border-white/10 bg-[#1A1A1A] text-white hover:border-white/30 hover:bg-[#2A2A2A]'
                              : 'border-white/5 bg-[#0A0A0A] text-gray-600 cursor-not-allowed opacity-50'
                          }`}
                          style={{ fontFamily: 'var(--font-heading)' }}
                        >
                          {size}
                          {isSelected && (
                            <div className="absolute -top-2 -right-2 w-5 h-5 bg-[var(--color-primary)] rounded-full flex items-center justify-center">
                              <svg className="w-3 h-3 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                          )}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Selected Variant Info */}
              {currentVariant && (
                <div className="mb-6 p-4 rounded-lg bg-[#1A1A1A] border border-white/10">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-white font-semibold">{currentVariant.name}</p>
                      <p className="text-gray-400 text-sm mt-1">
                        {color && `Color: ${color}`}
                        {color && currentVariant.size && ' • '}
                        {currentVariant.size && `Size: ${currentVariant.size}`}
                      </p>
                    </div>
                    <p className="text-2xl font-bold text-[var(--color-primary)]">
                      ${parseFloat(price).toFixed(2)}
                    </p>
                  </div>
                </div>
              )}

              {/* Add to Cart Button */}
              <button
                disabled={!currentVariant}
                className={`w-full h-12 sm:h-14 px-8 bg-[var(--color-primary)] text-black font-bold uppercase tracking-widest text-sm hover:brightness-110 active:scale-[0.98] transition-all duration-200 mb-6 ${
                  !currentVariant ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {currentVariant ? 'Add to Cart' : 'Select Size & Design'}
              </button>

              {/* Additional Info */}
              <div className="space-y-4 pt-6 border-t border-white/10">
                <div className="flex items-start gap-4">
                  <svg className="w-5 h-5 text-[var(--color-primary)] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Free Shipping</h3>
                    <p className="text-gray-400 text-sm">Free shipping on orders over $50. Standard delivery 5-7 business days.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <svg className="w-5 h-5 text-[var(--color-primary)] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <div>
                    <h3 className="text-white font-semibold mb-1">30-Day Returns</h3>
                    <p className="text-gray-400 text-sm">30-day return policy. Items must be unworn and in original condition.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
