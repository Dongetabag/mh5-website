import { NextResponse } from 'next/server'
import { getTapStitchProducts } from '@/lib/tapstitch'

/**
 * GET /api/tapstitch/products
 * Fetch products from TapStitch store
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

    // Fetch products from TapStitch
    const products = await getTapStitchProducts()

    // Apply pagination
    const paginatedProducts = products.slice(offset, offset + limit)

    return NextResponse.json({
      success: true,
      data: {
        products: paginatedProducts,
        total: products.length,
        limit,
        offset,
      },
    })
  } catch (error: any) {
    console.error('TapStitch products API error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to fetch products',
        message: 'Please configure TapStitch API credentials. See TAPSTITCH_INTEGRATION_PLAN.md',
      },
      { status: 500 }
    )
  }
}

