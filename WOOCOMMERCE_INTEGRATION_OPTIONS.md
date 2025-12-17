# WooCommerce Integration Options for MH5 Website

## Overview
You're currently running a **Next.js** (React) site on Hostinger. WooCommerce is a **WordPress plugin**, so there are several ways to integrate it depending on your goals.

---

## Option 1: WooCommerce as TapStitch Bridge (Recommended for POD)

### Why This Works:
- TapStitch has **native WooCommerce integration** (no API needed!)
- You keep your Next.js site for the main website
- WooCommerce handles only the shop/checkout functionality
- Orders automatically sync to TapStitch

### Setup Approach:

#### Subdomain Setup (Easiest)
```
Main Site: yourdomain.com (Next.js)
Shop: shop.yourdomain.com (WordPress + WooCommerce + TapStitch)
```

**Steps:**
1. **Install WordPress on a subdomain** (Hostinger makes this easy)
   - Go to Hostinger hPanel → Domains → Add Subdomain
   - Create `shop.yourdomain.com`
   - Install WordPress on that subdomain
   - Install WooCommerce plugin
   - Connect TapStitch to WooCommerce (one-click in TapStitch dashboard)

2. **Link from Next.js site to WooCommerce shop**
   - Update `/shop` links to point to `shop.yourdomain.com`
   - Or embed WooCommerce products via iframe/widget
   - Or use WooCommerce REST API to display products on Next.js pages

**Pros:**
- ✅ Native TapStitch integration (no API coding)
- ✅ Keep your beautiful Next.js site
- ✅ WooCommerce handles all shop functionality
- ✅ Automatic order fulfillment via TapStitch

**Cons:**
- ⚠️ Shop is on a subdomain (can affect SEO slightly)
- ⚠️ Requires managing two separate sites

---

## Option 2: Headless WooCommerce (Best of Both Worlds)

### How It Works:
- WordPress + WooCommerce runs on backend (can be subdomain or separate)
- Next.js uses **WooCommerce REST API** to fetch products
- Customers checkout on your Next.js site
- Orders created via API sync to WooCommerce → TapStitch

**Steps:**
1. **Set up WordPress + WooCommerce** (on subdomain or same domain in `/shop` folder)
2. **Enable WooCommerce REST API** (it's built-in)
3. **Connect TapStitch** to WooCommerce (one-click)
4. **Update Next.js code** to:
   - Fetch products from WooCommerce API
   - Display on your Next.js shop pages
   - Create orders via WooCommerce API after Stripe payment

**Pros:**
- ✅ Keep unified Next.js design
- ✅ Native TapStitch integration through WooCommerce
- ✅ More control over checkout flow

**Cons:**
- ⚠️ More complex setup
- ⚠️ Need to manage API calls

**Example API Endpoints:**
```
GET https://shop.yourdomain.com/wp-json/wc/v3/products
POST https://shop.yourdomain.com/wp-json/wc/v3/orders
```

---

## Option 3: Full WordPress Migration (Not Recommended)

### Convert entire site to WordPress:
- Move all Next.js pages to WordPress
- Install WooCommerce
- Connect TapStitch
- Lose all your custom Next.js components

**Pros:**
- ✅ Everything in one place
- ✅ Native TapStitch integration

**Cons:**
- ❌ Lose your beautiful custom Next.js design
- ❌ Major migration work
- ❌ Lose React components and modern tooling

**Verdict:** Don't do this unless you want to rebuild everything.

---

## Option 4: Keep Next.js + Direct TapStitch API (Current Plan)

### What You're Already Building:
- Next.js shop pages
- Cart and checkout on Next.js
- Direct TapStitch API integration (need API access)

**Pros:**
- ✅ Everything stays on your Next.js site
- ✅ Full control
- ✅ No additional WordPress installation

**Cons:**
- ⚠️ Need TapStitch API access (may not be available)
- ⚠️ More coding required
- ⚠️ Need to handle webhooks manually

---

## Recommended Approach: Option 1 (Subdomain WooCommerce)

### Why This Is Best for You:

1. **TapStitch Native Integration**
   - No API keys needed
   - No webhook setup
   - One-click connection in TapStitch dashboard

2. **Minimal Changes to Your Site**
   - Keep all your Next.js pages
   - Just point `/shop` to WooCommerce subdomain
   - Or embed shop section

3. **Easy Setup on Hostinger**
   - Hostinger has one-click WordPress installer
   - Can create subdomain in minutes
   - WooCommerce is free

4. **Professional Solution**
   - WooCommerce is battle-tested
   - Handles tax, shipping, inventory automatically
   - TapStitch syncs orders automatically

---

## Step-by-Step: Setting Up WooCommerce Subdomain on Hostinger

### Step 1: Create Subdomain in Hostinger

1. **Log in to Hostinger hPanel**
2. **Go to Domains** → **Subdomains**
3. **Create subdomain:** `shop.yourdomain.com`
4. **Point to:** `public_html/shop` (or separate directory)

### Step 2: Install WordPress

1. **Go to hPanel** → **Website** → **Auto Installer**
2. **Select:** WordPress
3. **Install to:** `shop.yourdomain.com`
4. **Set admin credentials**

### Step 3: Install WooCommerce

1. **Log in to WordPress admin** (`shop.yourdomain.com/wp-admin`)
2. **Plugins** → **Add New**
3. **Search:** "WooCommerce"
4. **Install & Activate**
5. **Run WooCommerce Setup Wizard**

### Step 4: Connect TapStitch to WooCommerce

1. **Log in to TapStitch dashboard**
2. **Go to Stores** → **Connect Store**
3. **Select WooCommerce**
4. **Enter your WooCommerce site URL:** `shop.yourdomain.com`
5. **Follow connection wizard** (usually just install TapStitch plugin)

### Step 5: Link from Next.js Site

**Option A: Redirect `/shop` to WooCommerce**
```javascript
// In Next.js: src/app/shop/page.tsx
import { redirect } from 'next/navigation'

export default function ShopPage() {
  redirect('https://shop.yourdomain.com')
}
```

**Option B: Embed WooCommerce Shop**
- Use WooCommerce REST API to fetch products
- Display on Next.js pages
- Redirect checkout to WooCommerce

**Option C: Use WooCommerce Shortcode/Widget**
- If you want to embed shop section directly

---

## WooCommerce REST API Integration (Headless Option)

If you want products on Next.js but checkout through WooCommerce:

### Fetch Products:
```typescript
// src/lib/woocommerce.ts
const WOOCOMMERCE_URL = 'https://shop.yourdomain.com'
const WOOCOMMERCE_KEY = process.env.WOOCOMMERCE_CONSUMER_KEY
const WOOCOMMERCE_SECRET = process.env.WOOCOMMERCE_CONSUMER_SECRET

export async function getWooCommerceProducts() {
  const response = await fetch(
    `${WOOCOMMERCE_URL}/wp-json/wc/v3/products?consumer_key=${WOOCOMMERCE_KEY}&consumer_secret=${WOOCOMMERCE_SECRET}`
  )
  return response.json()
}

export async function createWooCommerceOrder(orderData: any) {
  const response = await fetch(
    `${WOOCOMMERCE_URL}/wp-json/wc/v3/orders`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${btoa(`${WOOCOMMERCE_KEY}:${WOOCOMMERCE_SECRET}`)}`,
      },
      body: JSON.stringify(orderData),
    }
  )
  return response.json()
}
```

### Get API Credentials:
1. **WordPress Admin** → **WooCommerce** → **Settings** → **Advanced** → **REST API**
2. **Add Key**
3. **Set permissions:** Read/Write
4. **Copy Consumer Key & Secret**
5. **Add to Hostinger environment variables**

---

## Comparison Table

| Feature | Next.js + TapStitch API | Next.js + WooCommerce Bridge | Full WooCommerce |
|---------|------------------------|------------------------------|------------------|
| Setup Complexity | High (need API access) | Medium (subdomain setup) | Low |
| TapStitch Integration | Manual (API) | Native (one-click) | Native (one-click) |
| Keep Next.js Design | ✅ Yes | ✅ Yes (headless) | ❌ No |
| Order Sync | Manual coding | Automatic | Automatic |
| Maintenance | High | Medium | Low |
| Cost | Free (if API available) | Free (WooCommerce free) | Free |

---

## Recommendation

**Go with Option 1 (WooCommerce Subdomain)** because:

1. ✅ **Easiest TapStitch integration** - one-click connection
2. ✅ **Keep your Next.js site** - no major changes needed
3. ✅ **Fast setup** - can be done in 1-2 hours
4. ✅ **Professional solution** - WooCommerce is industry standard
5. ✅ **No API coding** - TapStitch handles everything automatically

You can always upgrade to headless WooCommerce later if you want more control.

---

## Next Steps

1. **Decide which option** you prefer
2. **If Option 1:** I can help you set up the subdomain redirect
3. **If Option 2:** I can help build the WooCommerce API integration
4. **If Option 4:** Continue with current TapStitch API approach

Let me know which direction you'd like to go!

