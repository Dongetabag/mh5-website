# WooCommerce Store - Next Steps (You Just Created It!)

Great! WooCommerce is installed and activated. Now let's get it fully configured and connected to TapStitch.

---

## Step 1: Complete WooCommerce Setup (5 minutes)

You see a **red "1" notification** next to "Payments" in the WooCommerce menu. Let's fix that:

1. **Click on "WooCommerce"** in the left sidebar
2. **Click on "Payments"** (the one with the red notification)
3. **Set up your payment method:**
   - **Stripe** (Recommended - you already have Stripe)
     - Click "Set up" or "Get started" next to Stripe
     - Enter your Stripe API keys (from your Stripe account)
     - Test mode vs Live mode - use Test mode for now
   - Or enable **Cash on delivery** for testing

4. **Go back to WooCommerce → Settings**
5. **Complete any remaining setup wizard steps** if prompted

---

## Step 2: Connect TapStitch to WooCommerce (5 minutes)

This is the key step that makes everything work!

### Option A: TapStitch Plugin (If Available)
1. **In WordPress Admin**, go to **Plugins → Add New**
2. **Search for:** "TapStitch" or "Tap Stitch"
3. **Install and activate** the TapStitch plugin (if available)

### Option B: Connect via TapStitch Dashboard (Recommended)
1. **Log in to TapStitch:** https://www.tapstitch.com
2. **Go to:** **Stores** (or **Integrations**)
3. **Click:** **Connect Store** or **Add Store**
4. **Select:** **WooCommerce**
5. **Enter your WooCommerce store URL:**
   - Your URL appears to be: `limegreen-dinosaur-663046.hostingersite.com`
   - Or if you set up a custom domain: `shop.yourdomain.com`
6. **Click Connect** and follow the prompts
7. **Authorize the connection** if asked

**Important:** Note your WooCommerce store URL - we'll need it for the Next.js redirect!

---

## Step 3: Add Your First Product (10 minutes)

Let's add the MH5 hoodie:

1. **In WordPress Admin**, go to **Products → Add New**

2. **Product Details:**
   - **Product Name:** `MH5 Snow Wash Fleece Oversize Hoodie`
   - **Description:** `Premium oversized hoodie made with high-quality fleece material, perfect for comfort and style. Clean, minimalist design with premium quality construction.`
   - **Product Image:** Upload the hoodie images from your site
   - **Product Gallery:** Add all product images

3. **Product Data (in the Product Data box):**
   - Select **"Variable product"** (for sizes)
   - **General Tab:**
     - SKU: `MH5-HOODIE-001` (optional)
   - **Attributes Tab:**
     - Click **"Add"**
     - **Name:** `Size`
     - **Values:** `Small, Medium, Large, XL`
     - Check **"Used for variations"**
     - Click **Save attributes**

4. **Variations Tab:**
   - Click **"Create variations from all attributes"**
   - Click **OK** to confirm
   - For each variation (Small, Medium, Large, XL):
     - Click the variation dropdown
     - Set **Regular Price:** `$65.00` (or `$68.00` for XL)
     - Set **SKU** (optional)
     - Click **Save changes**

5. **Inventory Tab:**
   - **Manage stock?** Check if you want to track inventory
   - Or leave unchecked to allow unlimited orders

6. **Click "Publish"** to save your product!

---

## Step 4: Configure Your WooCommerce Store URL (2 minutes)

We need to know your WooCommerce store URL to update the Next.js site. You have two options:

### Option A: Use the Hostinger Subdomain (Current)
Your store is currently at: `limegreen-dinosaur-663046.hostingersite.com`

### Option B: Set Up Custom Subdomain (Recommended)
1. **In Hostinger hPanel**, go to **Domains → Subdomains**
2. **Create subdomain:** `shop.yourdomain.com`
3. **Point it to your WordPress installation**
4. Update your WordPress **Settings → General** with the new URL

**Which URL are you using?** Let me know and I'll update the Next.js config!

---

## Step 5: Update Next.js Site Configuration

Once you know your WooCommerce store URL, we'll update your Next.js site to redirect to it:

**In Hostinger (or your deployment), add these environment variables:**
```env
NEXT_PUBLIC_WOOCOMMERCE_URL=https://limegreen-dinosaur-663046.hostingersite.com
NEXT_PUBLIC_SHOP_TYPE=woocommerce
```

Or if you set up a custom subdomain:
```env
NEXT_PUBLIC_WOOCOMMERCE_URL=https://shop.yourdomain.com
NEXT_PUBLIC_SHOP_TYPE=woocommerce
```

---

## Step 6: Test the Complete Flow (5 minutes)

1. **Visit your WooCommerce shop:**
   - Go directly to your WooCommerce URL
   - Verify your product appears

2. **Test from Next.js site:**
   - Go to `https://yourdomain.com/shop`
   - Should redirect to your WooCommerce shop

3. **Test checkout:**
   - Add product to cart
   - Proceed to checkout
   - Complete test order (use test mode if Stripe is in test mode)

4. **Verify TapStitch sync:**
   - Check TapStitch dashboard → Orders
   - Order should appear automatically
   - TapStitch will start fulfillment

---

## Quick Checklist

- [ ] WooCommerce installed ✅ (Already done!)
- [ ] Payment method configured (Stripe or other)
- [ ] TapStitch connected to WooCommerce
- [ ] First product added (MH5 Hoodie)
- [ ] WooCommerce store URL confirmed
- [ ] Next.js environment variables updated
- [ ] Test order placed
- [ ] TapStitch order sync verified

---

## Troubleshooting

### Payment Setup Issue
- If Stripe setup is complicated, you can temporarily enable "Cash on delivery" to test
- You can always switch to Stripe later

### TapStitch Connection Issues
- Make sure your WooCommerce site is publicly accessible (not password protected)
- Ensure HTTPS is enabled
- Try disconnecting and reconnecting in TapStitch dashboard

### Product Not Showing
- Make sure product is **Published** (not Draft)
- Check that product has a price set
- Verify product is in stock (or stock management is disabled)

---

**What's your WooCommerce store URL?** Once you confirm it, I can help update the Next.js site configuration!

