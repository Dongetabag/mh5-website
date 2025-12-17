import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getPrintfulClient } from '@/lib/printful'

/**
 * POST /api/stripe/webhook
 * Handle Stripe webhook events
 */
export async function POST(request: Request) {
  const secretKey = process.env.STRIPE_SECRET_KEY
  if (!secretKey) {
    return NextResponse.json(
      { error: 'Stripe not configured' },
      { status: 500 }
    )
  }

  const stripe = new Stripe(secretKey, {
    apiVersion: '2025-12-15.clover',
  })
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json(
      { error: 'No signature provided' },
      { status: 400 }
    )
  }

  let event: Stripe.Event

  try {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
    if (!webhookSecret) {
      throw new Error('STRIPE_WEBHOOK_SECRET is not set')
    }

    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message)
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    )
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent
      
      // Here you would typically:
      // 1. Retrieve order data from your database using paymentIntent.metadata
      // 2. Create Printful order
      // 3. Update order status in your database
      
      console.log('Payment succeeded:', paymentIntent.id)
      
      // Example: Create Printful order if order data is in metadata
      if (paymentIntent.metadata.orderData) {
        try {
          const orderData = JSON.parse(paymentIntent.metadata.orderData)
          const client = getPrintfulClient()
          const printfulOrder = await client.createOrder(orderData)
          console.log('Printful order created:', printfulOrder.id)
        } catch (error) {
          console.error('Failed to create Printful order:', error)
        }
      }
      break
    }

    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent
      console.log('Payment failed:', paymentIntent.id)
      // Handle failed payment (notify customer, update order status, etc.)
      break
    }

    default:
      console.log(`Unhandled event type: ${event.type}`)
  }

  return NextResponse.json({ received: true })
}

