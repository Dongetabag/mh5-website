import { NextResponse } from 'next/server'
import { getPrintfulClient } from '@/lib/printful'

/**
 * POST /api/printful/shipping/estimate
 * Estimate shipping costs
 */
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { recipient, items } = body

    if (!recipient || !items || !Array.isArray(items)) {
      return NextResponse.json(
        { success: false, error: 'Invalid request data' },
        { status: 400 }
      )
    }

    const client = getPrintfulClient()
    const result = await client.estimateShipping({
      recipient,
      items,
    })

    return NextResponse.json({
      success: true,
      data: result,
    })
  } catch (error: any) {
    console.error('Printful shipping estimate error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to estimate shipping',
      },
      { status: 500 }
    )
  }
}

