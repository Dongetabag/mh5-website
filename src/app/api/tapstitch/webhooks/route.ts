import { NextResponse } from 'next/server'
import { verifyTapStitchWebhook } from '@/lib/tapstitch'

/**
 * POST /api/tapstitch/webhooks
 * Receive webhooks from TapStitch for order status updates
 * 
 * Webhook events:
 * - order.created
 * - order.processing
 * - order.shipped
 * - order.delivered
 * - order.cancelled
 */
export async function POST(request: Request) {
  try {
    const signature = request.headers.get('x-tapstitch-signature') || ''
    const body = await request.text()

    // Verify webhook signature
    const isValid = verifyTapStitchWebhook(body, signature)
    if (!isValid) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid webhook signature',
        },
        { status: 401 }
      )
    }

    const payload = JSON.parse(body)
    const event = payload.event || payload.type
    const orderData = payload.data || payload.order

    // Handle different webhook events
    switch (event) {
      case 'order.created':
        console.log('Order created:', orderData.id)
        // TODO: Store order in database, send confirmation email
        break

      case 'order.processing':
        console.log('Order processing:', orderData.id)
        // TODO: Update order status in database
        break

      case 'order.shipped':
        console.log('Order shipped:', orderData.id, 'Tracking:', orderData.trackingNumber)
        // TODO: Update order status, send shipping notification email
        break

      case 'order.delivered':
        console.log('Order delivered:', orderData.id)
        // TODO: Update order status, send delivery confirmation
        break

      case 'order.cancelled':
        console.log('Order cancelled:', orderData.id)
        // TODO: Update order status, handle refunds
        break

      default:
        console.log('Unknown webhook event:', event)
    }

    return NextResponse.json({
      success: true,
      message: 'Webhook received',
    })
  } catch (error: any) {
    console.error('TapStitch webhook error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to process webhook',
      },
      { status: 500 }
    )
  }
}

