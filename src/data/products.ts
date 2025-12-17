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
    description: 'Premium oversized hoodie made with high-quality fleece material, perfect for comfort and style. Clean, minimalist design with premium quality construction.',
    thumbnail_url: '/images/products/hoodie-front.png',
    images: [
      '/images/products/hoodie-front.png',
      '/images/products/hoodie-side.png',
      '/images/products/hoodie-back.png',
      '/images/products/hoodie-detail.png',
    ],
    category: 'Apparel',
    featured: true,
    variants: [
      {
        id: 101,
        name: 'Small',
        price: '65.00',
        retail_price: '65.00',
        size: 'S',
        color: 'Snow Wash',
        available: true,
      },
      {
        id: 102,
        name: 'Medium',
        price: '65.00',
        retail_price: '65.00',
        size: 'M',
        color: 'Snow Wash',
        available: true,
      },
      {
        id: 103,
        name: 'Large',
        price: '65.00',
        retail_price: '65.00',
        size: 'L',
        color: 'Snow Wash',
        available: true,
      },
      {
        id: 104,
        name: 'X-Large',
        price: '68.00',
        retail_price: '68.00',
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

