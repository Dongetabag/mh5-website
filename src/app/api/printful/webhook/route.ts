import { NextResponse } from 'next/server'
import crypto from 'crypto'

/**
 * POST /api/printful/webhook
 * Handle Printful webhook events (order status updates)
 */
export async function POST(request: Request) {
  try {
    const body = await request.text()
    const signature = request.headers.get('x-printful-signature')

    // Verify webhook signature (if Printful provides one)
    // Note: Printful webhooks may not always include signatures
    // Check Printful docs for webhook verification method

    const event = JSON.parse(body)

    // Handle different event types
    switch (event.type) {
      case 'order:created':
        console.log('Printful order created:', event.data.id)
        // Update order status in your database
        break

      case 'order:updated':
        console.log('Printful order updated:', event.data.id)
        // Update order status in your database
        // event.data.status will contain the new status
        break

      case 'order:failed':
        console.log('Printful order failed:', event.data.id)
        // Handle failed order (notify customer, refund if needed, etc.)
        break

      case 'package_shipped':
        console.log('Package shipped:', event.data.tracking_number)
        // Update order status, notify customer with tracking info
        break

      default:
        console.log('Unhandled Printful webhook event:', event.type)
    }

    return NextResponse.json({ received: true })
  } catch (error: any) {
    console.error('Printful webhook error:', error)
    return NextResponse.json(
      { error: error.message || 'Webhook processing failed' },
      { status: 500 }
    )
  }
}

