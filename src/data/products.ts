/**
 * Local Product Data
 * Products displayed on the shop page
 * Will be replaced with TapStitch API data once configured
 */

export interface Product {
  id: number
  name: string
  description: string
  thumbnail_url: string
  images: string[]
  variants: Array<{
    id: number
    name: string
    price: string
    retail_price: string
    size?: string
    color?: string
    available?: boolean
  }>
  category?: string
  featured?: boolean
}

export const products: Product[] = [
  {
    id: 1,
    name: 'MH5 Snow Wash Fleece Oversize Hoodie',
    description: 'Premium oversized hoodie featuring the MH5 logo in Neon Cyan. Made with high-quality fleece material, perfect for comfort and style.',
    thumbnail_url: '/images/hoodie-designs/designed-hoodies/Snow Wash Fleece Oversize Hoodie-gallery-1-classic-front.png',
    images: [
      '/images/hoodie-designs/designed-hoodies/Snow Wash Fleece Oversize Hoodie-gallery-1-classic-front.png',
      '/images/hoodie-designs/designed-hoodies/Snow Wash Fleece Oversize Hoodie-gallery-1-classic-back.png',
      '/images/hoodie-designs/designed-hoodies/Snow Wash Fleece Oversize Hoodie-gallery-1-minimal-corner.png',
      '/images/hoodie-designs/designed-hoodies/Snow Wash Fleece Oversize Hoodie-gallery-1-oversized-back.png',
    ],
    category: 'Apparel',
    featured: true,
    variants: [
      {
        id: 101,
        name: 'Classic Front - Small',
        price: '65.00',
        retail_price: '65.00',
        size: 'S',
        color: 'Snow Wash',
        available: true,
      },
      {
        id: 102,
        name: 'Classic Front - Medium',
        price: '65.00',
        retail_price: '65.00',
        size: 'M',
        color: 'Snow Wash',
        available: true,
      },
      {
        id: 103,
        name: 'Classic Front - Large',
        price: '65.00',
        retail_price: '65.00',
        size: 'L',
        color: 'Snow Wash',
        available: true,
      },
      {
        id: 104,
        name: 'Classic Front - X-Large',
        price: '68.00',
        retail_price: '68.00',
        size: 'XL',
        color: 'Snow Wash',
        available: true,
      },
      {
        id: 105,
        name: 'Classic Back - Small',
        price: '69.00',
        retail_price: '69.00',
        size: 'S',
        color: 'Snow Wash',
        available: true,
      },
      {
        id: 106,
        name: 'Classic Back - Medium',
        price: '69.00',
        retail_price: '69.00',
        size: 'M',
        color: 'Snow Wash',
        available: true,
      },
      {
        id: 107,
        name: 'Classic Back - Large',
        price: '69.00',
        retail_price: '69.00',
        size: 'L',
        color: 'Snow Wash',
        available: true,
      },
      {
        id: 108,
        name: 'Classic Back - X-Large',
        price: '72.00',
        retail_price: '72.00',
        size: 'XL',
        color: 'Snow Wash',
        available: true,
      },
      {
        id: 109,
        name: 'Minimal Corner - Small',
        price: '62.00',
        retail_price: '62.00',
        size: 'S',
        color: 'Snow Wash',
        available: true,
      },
      {
        id: 110,
        name: 'Minimal Corner - Medium',
        price: '62.00',
        retail_price: '62.00',
        size: 'M',
        color: 'Snow Wash',
        available: true,
      },
      {
        id: 111,
        name: 'Minimal Corner - Large',
        price: '62.00',
        retail_price: '62.00',
        size: 'L',
        color: 'Snow Wash',
        available: true,
      },
      {
        id: 112,
        name: 'Minimal Corner - X-Large',
        price: '65.00',
        retail_price: '65.00',
        size: 'XL',
        color: 'Snow Wash',
        available: true,
      },
      {
        id: 113,
        name: 'Oversized Back - Small',
        price: '75.00',
        retail_price: '75.00',
        size: 'S',
        color: 'Snow Wash',
        available: true,
      },
      {
        id: 114,
        name: 'Oversized Back - Medium',
        price: '75.00',
        retail_price: '75.00',
        size: 'M',
        color: 'Snow Wash',
        available: true,
      },
      {
        id: 115,
        name: 'Oversized Back - Large',
        price: '75.00',
        retail_price: '75.00',
        size: 'L',
        color: 'Snow Wash',
        available: true,
      },
      {
        id: 116,
        name: 'Oversized Back - X-Large',
        price: '78.00',
        retail_price: '78.00',
        size: 'XL',
        color: 'Snow Wash',
        available: true,
      },
    ],
  },
]

/**
 * Get all products
 */
export function getAllProducts(): Product[] {
  return products
}

/**
 * Get product by ID
 */
export function getProductById(id: number): Product | undefined {
  return products.find((p) => p.id === id)
}

/**
 * Get featured products
 */
export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured)
}

/**
 * Get products by category
 */
export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category)
}

