import { NextResponse } from 'next/server'
import { getPrintfulClient } from '@/lib/printful'

/**
 * GET /api/printful/products
 * Fetch products from Printful store
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const offset = parseInt(searchParams.get('offset') || '0')
    const limit = parseInt(searchParams.get('limit') || '20')

    const client = getPrintfulClient()
    const result = await client.getStoreProducts(offset, limit)

    return NextResponse.json({
      success: true,
      data: result,
    })
  } catch (error: any) {
    console.error('Printful products API error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to fetch products',
      },
      { status: 500 }
    )
  }
}

