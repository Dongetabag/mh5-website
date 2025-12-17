# Printful Integration Setup Guide

## Overview
This guide explains how to set up and use the Printful integration for the MH5 website.

## Setup Steps

### 1. Get Printful API Key

1. Sign up at [Printful.com](https://www.printful.com/)
2. Go to Dashboard → Stores → API
3. Generate a new API key
4. Copy the API key (starts with `pf_`)

### 2. Get Stripe Keys

1. Sign up at [Stripe.com](https://stripe.com/)
2. Go to Developers → API keys
3. Copy your **Publishable key** (starts with `pk_`)
4. Copy your **Secret key** (starts with `sk_`)

### 3. Set Environment Variables

Create a `.env.local` file in the root directory:

```env
# Printful API
PRINTFUL_API_KEY=your_printful_api_key_here

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Create Products in Printful

1. Log into Printful Dashboard
2. Go to Stores → Your Store → Products
3. Click "Add product"
4. Choose from catalog or create custom products
5. Upload your MH5 designs/images
6. Set pricing and product details
7. Products will automatically sync via the API

### 5. Set Up Webhooks (Optional but Recommended)

**Stripe Webhook:**
1. Go to Stripe Dashboard → Developers → Webhooks
2. Add endpoint: `https://yourdomain.com/api/stripe/webhook`
3. Select events: `payment_intent.succeeded`
4. Copy webhook secret to `.env.local`

**Printful Webhook:**
1. Go to Printful Dashboard → Settings → Webhooks
2. Add endpoint: `https://yourdomain.com/api/printful/webhook`
3. Select events: `order:created`, `order:updated`, `order:failed`
4. Save webhook URL

## API Routes Created

### Printful Routes

- `GET /api/printful/products` - Get all products
- `GET /api/printful/products/[id]` - Get product details
- `POST /api/printful/shipping/estimate` - Estimate shipping costs
- `POST /api/printful/orders` - Create order after payment

### Stripe Routes

- `POST /api/stripe/create-payment-intent` - Create payment intent
- `POST /api/stripe/webhook` - Handle Stripe webhooks (to be created)

## Usage Flow

1. **Customer browses products** → `/shop` page displays products from Printful
2. **Customer adds to cart** → Cart stored in client state
3. **Customer proceeds to checkout** → Shipping calculated via Printful API
4. **Payment processed** → Stripe payment intent created
5. **Payment confirmed** → Order created in Printful with customer details
6. **Printful fulfills order** → Prints, packs, and ships directly to customer

## Testing

### Test Mode
- Use Printful test API key for development
- Use Stripe test mode keys
- Test with Stripe test card: `4242 4242 4242 4242`

### Production
- Switch to production API keys
- Update `NEXT_PUBLIC_SITE_URL` to your production domain
- Enable webhooks on production URLs

## Product Design Upload

To add designs to products:
1. Prepare design files (PNG, JPG, PDF)
   - Recommended: PNG with transparent background
   - Minimum 300 DPI for best quality
   - Max file size: 25MB
2. Upload to Printful:
   - Dashboard → Files → Add new file
   - Upload your design
   - Design will be available when creating products

## Common Issues

### Products Not Showing
- Check API key is correct
- Verify products exist in Printful store
- Check browser console for errors

### Order Creation Fails
- Verify payment intent succeeded
- Check order data format matches Printful requirements
- Review Printful API logs in dashboard

### Shipping Calculation Issues
- Ensure address fields are complete
- Check country code format (ISO 2-letter)
- Verify items have valid variant IDs

## Support

- Printful API Docs: https://developers.printful.com/
- Stripe Docs: https://stripe.com/docs/api
- Printful Support: support@printful.com

