import { NextResponse } from 'next/server'
import Stripe from 'stripe'

/**
 * POST /api/stripe/create-payment-intent
 * Create a Stripe payment intent
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
    const { amount, currency = 'usd', metadata } = body

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { success: false, error: 'Invalid amount' },
        { status: 400 }
      )
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: currency.toLowerCase(),
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: metadata || {},
    })

    return NextResponse.json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    })
  } catch (error: any) {
    console.error('Stripe payment intent creation error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to create payment intent',
      },
      { status: 500 }
    )
  }
}

