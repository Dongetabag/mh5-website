'use client'

/**
 * SHOP PAGE - TapStitch Product Catalog
 * =====================================
 * Display products from TapStitch store
 * Integrated with shopping cart and checkout
 */

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface Product {
  id: number
  name: string
  thumbnail_url: string
  variants: Array<{
    id: number
    name: string
    price: string
    retail_price: string
    size?: string
    color?: string
  }>
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      // TODO: Update endpoint once TapStitch API is configured
      const response = await fetch('/api/tapstitch/products?limit=20')
      const data = await response.json()

      if (data.success) {
        // Handle both formats: data.data.products or data.data.items
        const productsData = data.data?.products || data.data?.items || data.data || []
        setProducts(Array.isArray(productsData) ? productsData : [])
      } else {
        setError(data.error || 'Failed to load products')
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch products')
    } finally {
      setLoading(false)
    }
  }

  const getLowestPrice = (variants: Product['variants']) => {
    if (!variants || variants.length === 0) return 'N/A'
    const prices = variants.map(v => parseFloat(v.retail_price || v.price || '0'))
    const lowest = Math.min(...prices)
    return `$${lowest.toFixed(2)}`
  }

  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 sm:pt-24 lg:pt-32 pb-12 sm:pb-16 px-5 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block bg-[var(--color-primary)] text-black px-4 py-1.5 text-xs md:text-sm font-bold uppercase tracking-[0.3em] mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
              MH5 Merchandise
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              Shop <span className="text-[var(--color-primary)]">The Movement</span>
            </h1>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto uppercase tracking-widest" style={{ fontFamily: 'var(--font-heading)' }}>
              Official MH5 apparel and merchandise. Premium quality, shipped directly to you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 sm:py-16 lg:py-20 px-5 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-primary)]"></div>
              <p className="text-gray-400 mt-4">Loading products...</p>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-red-400 mb-4">Error: {error}</p>
              <button
                onClick={fetchProducts}
                className="px-6 py-3 bg-[var(--color-primary)] text-black font-bold uppercase tracking-widest text-sm hover:brightness-110 transition"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Try Again
              </button>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 mb-4">No products available yet.</p>
              <p className="text-gray-500 text-sm">Check back soon for official MH5 merchandise!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <Link href={`/shop/${product.id}`} className="block">
                    <div className="relative aspect-square rounded-xl sm:rounded-2xl overflow-hidden bg-[#111] border border-white/10 group-hover:border-[var(--color-primary)]/50 transition-all duration-300">
                      {product.thumbnail_url ? (
                        <img
                          src={product.thumbnail_url}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-secondary)]/20">
                          <span className="text-white/50 text-sm">No Image</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="mt-4">
                      <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-[var(--color-primary)] transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-[var(--color-primary)] font-bold text-xl">
                        From {getLowestPrice(product.variants)}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

