import { NextResponse } from 'next/server'
import { createTapStitchOrder } from '@/lib/tapstitch'

/**
 * POST /api/tapstitch/orders
 * Create a new order in TapStitch
 * 
 * Body should include:
 * - items: array of { productId, variantId?, quantity, price }
 * - shipping: { name, address, city, state, zip, country, phone? }
 */
export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.items || !Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Order items are required',
        },
        { status: 400 }
      )
    }

    if (!body.shipping) {
      return NextResponse.json(
        {
          success: false,
          error: 'Shipping information is required',
        },
        { status: 400 }
      )
    }

    // Create order in TapStitch
    const order = await createTapStitchOrder({
      items: body.items,
      shipping: body.shipping,
    })

    return NextResponse.json({
      success: true,
      data: { order },
    })
  } catch (error: any) {
    console.error('TapStitch orders API error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to create order',
        message: 'Please configure TapStitch API credentials. See TAPSTITCH_INTEGRATION_PLAN.md',
      },
      { status: 500 }
    )
  }
}

