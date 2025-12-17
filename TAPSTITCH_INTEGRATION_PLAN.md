# TapStitch Integration Plan for MH5 Website

## Overview
Integrating TapStitch print-on-demand service with Next.js site hosted on Hostinger.

## Contact Information
- **Email**: support@tapstitch.com
- **Phone**: +1 213-376-2727
- **Website**: https://www.tapstitch.com

## Integration Steps

### 1. API Access (Required First)
- Contact TapStitch support to request:
  - API documentation
  - API credentials (API key, secret, etc.)
  - Authentication methods
  - Available endpoints for:
    - Product catalog
    - Order creation
    - Order status tracking
    - Inventory updates
  - Webhook support for order status updates

### 2. Project Structure

```
mh5-site/
├── src/
│   ├── app/
│   │   ├── shop/
│   │   │   ├── page.tsx          # Product catalog page
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx      # Product detail page
│   │   │   └── cart/
│   │   │       └── page.tsx      # Shopping cart
│   │   ├── api/
│   │   │   └── tapstitch/
│   │   │       ├── products/route.ts     # Sync products from TapStitch
│   │   │       ├── orders/route.ts       # Create orders in TapStitch
│   │   │       └── webhooks/route.ts     # Receive order updates
│   │   └── checkout/
│   │       └── page.tsx          # Checkout page
│   ├── lib/
│   │   ├── tapstitch.ts          # TapStitch API client
│   │   └── cart.ts               # Cart management utilities
│   └── components/
│       └── shop/
│           ├── ProductCard.tsx
│           ├── ProductGrid.tsx
│           ├── Cart.tsx
│           └── CheckoutForm.tsx
├── .env.local                    # Store TapStitch API credentials
└── TAPSTITCH_INTEGRATION_PLAN.md
```

### 3. Integration Architecture

```
User Flow:
1. Browse products (from TapStitch catalog)
2. Add to cart (local storage/state)
3. Checkout (payment via Stripe)
4. Order sent to TapStitch API
5. TapStitch fulfills and ships
6. Webhook updates order status
```

### 4. Required API Endpoints (Expected)

```
GET    /api/tapstitch/products       # Fetch product catalog
GET    /api/tapstitch/products/:id   # Get product details
POST   /api/tapstitch/orders         # Create new order
GET    /api/tapstitch/orders/:id     # Get order status
POST   /api/tapstitch/webhooks       # Receive webhooks from TapStitch
```

### 5. Environment Variables Needed

```env
# TapStitch API Credentials
TAPSTITCH_API_KEY=
TAPSTITCH_API_SECRET=
TAPSTITCH_WEBHOOK_SECRET=
TAPSTITCH_API_URL=https://api.tapstitch.com  # (verify actual URL)

# Payment Processing
STRIPE_SECRET_KEY=
STRIPE_PUBLISHABLE_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
```

### 6. Payment Integration

**Recommended: Stripe**
- Process payments on your site
- After successful payment → create order in TapStitch
- Handle refunds through Stripe if needed

### 7. Implementation Phases

#### Phase 1: Setup & API Connection
- [ ] Contact TapStitch for API access
- [ ] Get API credentials
- [ ] Set up API client library
- [ ] Test API connection

#### Phase 2: Product Display
- [ ] Create `/shop` page
- [ ] Fetch and display products from TapStitch
- [ ] Create product detail pages
- [ ] Implement product filtering/search

#### Phase 3: Shopping Cart
- [ ] Create cart functionality (local state or database)
- [ ] Cart UI component
- [ ] Add/remove items
- [ ] Quantity management

#### Phase 4: Checkout & Orders
- [ ] Integrate Stripe payment
- [ ] Create checkout page
- [ ] Send orders to TapStitch API
- [ ] Handle order confirmation

#### Phase 5: Order Management
- [ ] Set up webhooks from TapStitch
- [ ] Order status tracking
- [ ] Order history page
- [ ] Email notifications

## Next Steps

1. **Immediate**: Contact TapStitch support at support@tapstitch.com
   - Request API documentation
   - Request API credentials
   - Ask about:
     - REST API availability
     - Authentication method
     - Rate limits
     - Webhook support
     - Product catalog endpoints
     - Order creation endpoints

2. **Once API access is confirmed**: 
   - Set up API client
   - Begin implementing product catalog
   - Test with sample products

## Notes

- TapStitch currently has better Shopify integration, but custom API integration is possible
- May need to use Shopify as intermediary if direct API is not available
- Alternative: Use Shopify Storefront API to access TapStitch products

