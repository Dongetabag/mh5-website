import { NextResponse } from 'next/server'
import { getAllProducts } from '@/data/products'

/**
 * GET /api/tapstitch/products
 * Fetch products from local data (will be replaced with TapStitch API once configured)
 * 
 * Query params:
 * - limit: number of products to return (default: 20)
 * - offset: pagination offset (default: 0)
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = parseInt(searchParams.get('offset') || '0')

    // Get all products from local data
    const allProducts = getAllProducts()
    
    // Apply pagination
    const paginatedProducts = allProducts.slice(offset, offset + limit)

    return NextResponse.json({
      success: true,
      data: {
        items: paginatedProducts,
        products: paginatedProducts, // Support both formats
        total: allProducts.length,
        offset,
        limit,
      },
    })
  } catch (error: any) {
    console.error('Products API error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to fetch products',
      },
      { status: 500 }
    )
  }
}
