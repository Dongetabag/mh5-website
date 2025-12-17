'use client'

/**
 * PRODUCT DETAIL PAGE
 * Individual product page with full details and variants
 */

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { getProductById, type Product } from '@/data/products'

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const productId = parseInt(params.id as string)
  
  const [product, setProduct] = useState<Product | null>(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedVariant, setSelectedVariant] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch product data
    const productData = getProductById(productId)
    if (productData) {
      setProduct(productData)
      setSelectedVariant(productData.variants[0]?.id || null)
      setLoading(false)
    } else {
      setLoading(false)
    }
  }, [productId])

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

  const currentVariant = product.variants.find((v) => v.id === selectedVariant)
  const price = currentVariant?.retail_price || currentVariant?.price || '0'

  return (
    <div className="bg-[#0a0a0a] min-h-screen pt-20 sm:pt-24 lg:pt-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="text-gray-400 hover:text-[var(--color-primary)] transition-colors mb-8 flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Shop
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Product Images */}
          <div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
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
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? 'border-[var(--color-primary)]'
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
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                {product.name}
              </h1>

              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                {product.description}
              </p>

              {/* Price */}
              <div className="mb-8">
                <p className="text-3xl font-bold text-[var(--color-primary)]">
                  ${parseFloat(price).toFixed(2)}
                </p>
                {currentVariant && (
                  <p className="text-gray-500 text-sm mt-1">
                    {currentVariant.name}
                  </p>
                )}
              </div>

              {/* Variants */}
              {product.variants.length > 0 && (
                <div className="mb-8">
                  <label className="block text-white font-semibold mb-4">
                    Select Variant
                  </label>
                  <div className="space-y-3">
                    {product.variants
                      .filter((v) => v.available !== false)
                      .map((variant) => (
                        <button
                          key={variant.id}
                          onClick={() => setSelectedVariant(variant.id)}
                          className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                            selectedVariant === variant.id
                              ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10'
                              : 'border-white/10 hover:border-white/30'
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-white font-semibold">{variant.name}</p>
                              {(variant.size || variant.color) && (
                                <p className="text-gray-400 text-sm mt-1">
                                  {[variant.size, variant.color].filter(Boolean).join(' • ')}
                                </p>
                              )}
                            </div>
                            <p className="text-[var(--color-primary)] font-bold">
                              ${parseFloat(variant.retail_price || variant.price).toFixed(2)}
                            </p>
                          </div>
                        </button>
                      ))}
                  </div>
                </div>
              )}

              {/* Add to Cart Button */}
              <button
                className="w-full h-12 sm:h-14 px-8 bg-[var(--color-primary)] text-black font-bold uppercase tracking-widest text-sm hover:brightness-110 active:scale-[0.98] transition-all duration-200"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Add to Cart
              </button>

              {/* Additional Info */}
              <div className="mt-12 space-y-6 text-gray-400 text-sm">
                <div>
                  <h3 className="text-white font-semibold mb-2">Shipping</h3>
                  <p>Free shipping on orders over $50. Standard delivery 5-7 business days.</p>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">Returns</h3>
                  <p>30-day return policy. Items must be unworn and in original condition.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

