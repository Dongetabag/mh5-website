# TapStitch Integration with Hostinger - Complete Setup Guide

## Overview
This guide walks you through connecting your Hostinger-hosted Next.js site to TapStitch for order processing.

Since TapStitch doesn't have a direct Next.js integration, we'll use their **API** to sync products and process orders.

---

## Step 1: Get TapStitch API Access

### Contact TapStitch Support
1. **Log in to your TapStitch account**: https://www.tapstitch.com
2. **Go to Settings** → **API** or contact support directly
3. **Request API access** with the following information:

**Email Template:**
```
Subject: API Access Request for Custom Next.js Integration

Hello TapStitch Team,

I'm running a Next.js website on Hostinger and would like to integrate TapStitch 
for print-on-demand fulfillment via your API.

Could you please provide:
1. API documentation
2. API credentials (API Key, API Secret)
3. Base API URL
4. Webhook setup instructions
5. Authentication method

My website URL: [YOUR_DOMAIN]
Contact Email: contact@therealmh5.com
Use case: Custom e-commerce store needing POD fulfillment

Thank you!
```

**Contact Info:**
- Email: support@tapstitch.com
- Phone: +1 213-376-2727

---

## Step 2: Configure Environment Variables on Hostinger

Once you have your API credentials:

### Option A: Via Hostinger hPanel (Recommended)

1. **Log in to Hostinger hPanel**
2. **Go to your domain** → **Advanced** → **Environment Variables**
3. **Add these variables:**

```env
# TapStitch API Configuration
TAPSTITCH_API_URL=https://api.tapstitch.com
TAPSTITCH_API_KEY=your_api_key_here
TAPSTITCH_API_SECRET=your_api_secret_here
TAPSTITCH_WEBHOOK_SECRET=your_webhook_secret_here

# Stripe (for payment processing)
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

### Option B: Via `.env.local` file (If using VPS/Custom server)

1. **Access your site files** via FTP or Hostinger File Manager
2. **Create/edit** `.env.local` in your Next.js project root
3. **Add the same variables** as above
4. **Restart your Next.js application**

---

## Step 3: Complete the API Integration

The code is already set up, but you need to verify the API endpoints match TapStitch's documentation.

### Files to Review/Update:

1. **`src/lib/tapstitch.ts`** - API client functions
2. **`src/app/api/tapstitch/orders/route.ts`** - Order creation endpoint
3. **`src/app/api/tapstitch/products/route.ts`** - Product sync endpoint
4. **`src/app/api/tapstitch/webhooks/route.ts`** - Webhook receiver

### Update API Base URL (if different):
```typescript
// src/lib/tapstitch.ts
const TAPSTITCH_API_URL = process.env.TAPSTITCH_API_URL || 'https://api.tapstitch.com'
```

---

## Step 4: Configure Webhook URL

TapStitch needs to send order status updates to your site.

### Your Webhook Endpoint:
```
https://yourdomain.com/api/tapstitch/webhooks
```

### Setup in TapStitch Dashboard:
1. **Log in to TapStitch**
2. **Go to Settings** → **Webhooks** (or **Integrations**)
3. **Add Webhook URL**: `https://yourdomain.com/api/tapstitch/webhooks`
4. **Select Events** to listen for:
   - Order created
   - Order shipped
   - Order delivered
   - Order cancelled
5. **Copy the Webhook Secret** → Add to your environment variables

---

## Step 5: Update Checkout to Send Orders to TapStitch

The checkout page (`src/app/checkout/page.tsx`) needs to:
1. Process payment via Stripe
2. After successful payment → Create order in TapStitch
3. Store order reference for tracking

### Current Flow:
```
Customer completes checkout
    ↓
Stripe payment processed
    ↓
Order created in TapStitch via API
    ↓
Order confirmation sent to customer
    ↓
TapStitch fulfills & ships
    ↓
Webhook updates order status on your site
```

### Update Checkout Handler:

Edit `src/app/checkout/page.tsx` → `handleSubmit` function:

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setProcessingPayment(true)

  try {
    // 1. Create Stripe payment intent
    const paymentResponse = await fetch('/api/stripe/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: total,
        currency: 'usd',
        metadata: { items: JSON.stringify(items) },
      }),
    })

    const paymentData = await paymentResponse.json()
    if (!paymentData.success) throw new Error(paymentData.error)

    // 2. Process payment (using Stripe Elements or redirect to Stripe Checkout)
    // ... payment processing code ...

    // 3. After successful payment, create order in TapStitch
    const orderResponse = await fetch('/api/tapstitch/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: items.map(item => ({
          productId: item.productId.toString(),
          variantId: item.variantId.toString(),
          quantity: item.quantity,
          price: item.price,
        })),
        shipping: formData,
        paymentIntentId: paymentData.paymentIntentId,
      }),
    })

    const orderData = await orderResponse.json()
    if (!orderData.success) throw new Error(orderData.error)

    // 4. Clear cart and redirect to confirmation
    clearCart()
    router.push(`/order-confirmation?orderId=${orderData.data.order.id}`)
  } catch (error: any) {
    console.error('Checkout error:', error)
    alert('Order failed: ' + error.message)
  } finally {
    setProcessingPayment(false)
  }
}
```

---

## Step 6: Test the Integration

### 1. Test Product Sync
```bash
# Via browser or API client
GET https://yourdomain.com/api/tapstitch/products
```

### 2. Test Order Creation
Use the checkout page with a test product and verify:
- Order appears in TapStitch dashboard
- Order confirmation email received
- Order status shows as "pending"

### 3. Test Webhook
- Create a test order in TapStitch
- Manually trigger webhook (or wait for status change)
- Verify webhook is received at `/api/tapstitch/webhooks`
- Check order status updates on your site

---

## Step 7: Monitor & Troubleshoot

### Check Logs
- **Hostinger Logs**: Check application logs for API errors
- **TapStitch Dashboard**: Monitor orders and fulfillment status
- **Browser Console**: Check for frontend errors

### Common Issues

1. **"API key not configured"**
   - Verify environment variables are set in Hostinger
   - Restart your Next.js application
   - Check variable names match exactly (case-sensitive)

2. **"401 Unauthorized"**
   - Verify API key is correct
   - Check authentication method in TapStitch docs
   - Ensure API key hasn't expired

3. **"Webhook not received"**
   - Verify webhook URL is publicly accessible
   - Check webhook secret matches
   - Ensure HTTPS is enabled (required for webhooks)

4. **"Orders not syncing"**
   - Check API endpoint URLs match TapStitch documentation
   - Verify request payload format
   - Check TapStitch dashboard for error messages

---

## Alternative: Using TapStitch Store (If API Not Available)

If TapStitch doesn't provide API access for custom sites, you can:

### Option 1: Manual Order Import
- Export orders from your site
- Manually import into TapStitch dashboard
- Not recommended for high volume

### Option 2: Shopify Bridge (Recommended)
1. **Create a Shopify store** (free trial)
2. **Connect TapStitch to Shopify** (direct integration available)
3. **Sync products** between your site and Shopify
4. **Use Shopify webhooks** to sync orders
5. **TapStitch auto-fulfills** orders from Shopify

This adds a middle layer but provides reliable integration.

---

## Next Steps

1. ✅ **Contact TapStitch** for API access
2. ✅ **Get API credentials**
3. ✅ **Set environment variables** in Hostinger
4. ✅ **Update API endpoints** to match TapStitch docs
5. ✅ **Configure webhook** URL in TapStitch
6. ✅ **Test integration** with a test order
7. ✅ **Go live** with real orders

---

## Support Resources

- **TapStitch Support**: support@tapstitch.com | +1 213-376-2727
- **Hostinger Support**: https://www.hostinger.com/contact
- **Next.js Docs**: https://nextjs.org/docs
- **Stripe Docs**: https://stripe.com/docs

---

## Files Reference

- `src/lib/tapstitch.ts` - API client
- `src/app/api/tapstitch/orders/route.ts` - Order creation
- `src/app/api/tapstitch/products/route.ts` - Product sync
- `src/app/api/tapstitch/webhooks/route.ts` - Webhook receiver
- `src/app/checkout/page.tsx` - Checkout page
- `TAPSTITCH_INTEGRATION_PLAN.md` - Original integration plan

