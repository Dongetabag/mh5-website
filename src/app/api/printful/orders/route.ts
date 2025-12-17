import { NextResponse } from 'next/server'
import { getPrintfulClient } from '@/lib/printful'
import Stripe from 'stripe'

/**
 * POST /api/printful/orders
 * Create an order after payment confirmation
 */
export async function POST(request: Request) {
  const secretKey = process.env.STRIPE_SECRET_KEY
  if (!secretKey) {
    return NextResponse.json(
      { success: false, error: 'Stripe not configured' },
      { status: 500 }
    )
  }

  const stripe = new Stripe(secretKey, {
    apiVersion: '2025-12-15.clover',
  })
  try {
    const body = await request.json()
    const { paymentIntentId, orderData } = body

    if (!paymentIntentId || !orderData) {
      return NextResponse.json(
        { success: false, error: 'Missing payment intent or order data' },
        { status: 400 }
      )
    }

    // Verify payment intent
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)
    
    if (paymentIntent.status !== 'succeeded') {
      return NextResponse.json(
        { success: false, error: 'Payment not completed' },
        { status: 400 }
      )
    }

    // Create Printful order
    const client = getPrintfulClient()
    const result = await client.createOrder(orderData)

    return NextResponse.json({
      success: true,
      data: result,
      orderId: result.id,
    })
  } catch (error: any) {
    console.error('Printful order creation error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to create order',
      },
      { status: 500 }
    )
  }
}

