/**
 * Printful API Client
 * Handles all Printful API interactions
 */

const PRINTFUL_API_URL = 'https://api.printful.com'

interface PrintfulProduct {
  id: number
  name: string
  type: string
  description: string
  currency: string
  files: Array<{
    id: number
    type: string
    title: string
    additional_price: string
  }>
  options: Array<{
    id: string
    name: string
    type: string
    values: Array<{
      id: number
      title: string
      colors?: string[]
    }>
  }>
  variants: Array<{
    id: number
    product_id: number
    name: string
    size: string
    color: string
    color_code: string
    availability_status: string
    availability_status_description: string
    price: string
    retail_price: string
    currency: string
    files: number[]
    options: number[]
    dimensions: string
    is_discontinued: boolean
    is_enabled: boolean
  }>
}

interface PrintfulStoreProduct {
  id: number
  variant_id: number
  product_id: number
  image: string
  name: string
  description: string
  price: string
  currency: string
  availability_status: string
  availability_status_description: string
}

export class PrintfulClient {
  private apiKey: string
  private baseUrl: string

  constructor(apiKey: string) {
    this.apiKey = apiKey
    this.baseUrl = PRINTFUL_API_URL
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseUrl}${endpoint}`
    const response = await fetch(url, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Unknown error' }))
      throw new Error(error.message || `Printful API error: ${response.status}`)
    }

    return response.json()
  }

  /**
   * Get all store products
   */
  async getStoreProducts(offset = 0, limit = 20) {
    const response = await this.request(`/store/products?offset=${offset}&limit=${limit}`)
    return response.result
  }

  /**
   * Get product details by ID
   */
  async getProduct(productId: number) {
    const response = await this.request(`/store/products/${productId}`)
    return response.result
  }

  /**
   * Get catalog products (Printful catalog)
   */
  async getCatalogProducts(categoryId?: number, limit = 20) {
    const endpoint = categoryId
      ? `/catalog-products?category_id=${categoryId}&limit=${limit}`
      : `/catalog-products?limit=${limit}`
    const response = await this.request(endpoint)
    return response.result
  }

  /**
   * Create an order
   */
  async createOrder(orderData: {
    recipient: {
      name: string
      address1: string
      city: string
      state_code: string
      country_code: string
      zip: string
      email?: string
      phone?: string
    }
    items: Array<{
      variant_id: number
      quantity: number
      files: Array<{
        url: string
      }>
    }>
    retail_costs?: {
      currency: string
      subtotal?: string
      discount?: string
      shipping?: string
      tax?: string
    }
  }) {
    const response = await this.request('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    })
    return response.result
  }

  /**
   * Get order by ID
   */
  async getOrder(orderId: string) {
    const response = await this.request(`/orders/@${orderId}`)
    return response.result
  }

  /**
   * Estimate shipping costs
   */
  async estimateShipping(data: {
    recipient: {
      address1: string
      city: string
      state_code: string
      country_code: string
      zip: string
    }
    items: Array<{
      variant_id: number
      quantity: number
    }>
  }) {
    const response = await this.request('/shipping/rates', {
      method: 'POST',
      body: JSON.stringify(data),
    })
    return response.result
  }
}

// Create a singleton instance
let printfulClient: PrintfulClient | null = null

export function getPrintfulClient(): PrintfulClient {
  if (!printfulClient) {
    const apiKey = process.env.PRINTFUL_API_KEY
    if (!apiKey) {
      throw new Error('PRINTFUL_API_KEY is not set in environment variables')
    }
    printfulClient = new PrintfulClient(apiKey)
  }
  return printfulClient
}

export type { PrintfulProduct, PrintfulStoreProduct }

