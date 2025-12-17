# WooCommerce Setup Steps - Quick Guide

## Overview
Setting up WooCommerce on a subdomain to connect with TapStitch for seamless order fulfillment.

---

## Step 1: Create Subdomain in Hostinger (5 minutes)

1. **Log in to Hostinger hPanel**
   - Go to: https://hpanel.hostinger.com
   - Select your domain

2. **Create Subdomain**
   - Go to **Domains** → **Subdomains**
   - Click **Create Subdomain**
   - **Subdomain name:** `shop`
   - **Document root:** Leave default or set to `public_html/shop`
   - Click **Create**

3. **Verify**
   - Subdomain should now exist: `shop.yourdomain.com`
   - Wait 5-10 minutes for DNS propagation

---

## Step 2: Install WordPress (10 minutes)

1. **Open Auto Installer**
   - In hPanel, go to **Website** → **Auto Installer**
   - Or search for "WordPress" in hPanel

2. **Install WordPress**
   - Click **WordPress** → **Install**
   - **Domain:** Select `shop.yourdomain.com`
   - **Directory:** Leave empty (root of subdomain)
   - **Site Name:** "MH5 Shop" or "MH5 Store"
   - **Admin Username:** Choose a username (not "admin")
   - **Admin Password:** Create strong password (save it!)
   - **Admin Email:** contact@therealmh5.com
   - Click **Install**

3. **Note Your Credentials**
   - WordPress admin URL: `https://shop.yourdomain.com/wp-admin`
   - Save your username and password!

---

## Step 3: Install WooCommerce (5 minutes)

1. **Log in to WordPress**
   - Go to: `https://shop.yourdomain.com/wp-admin`
   - Log in with your admin credentials

2. **Install WooCommerce Plugin**
   - In WordPress dashboard, go to **Plugins** → **Add New**
   - Search for: "WooCommerce"
   - Click **Install Now** (by Automattic)
   - Click **Activate**

3. **Run WooCommerce Setup Wizard**
   - You'll be redirected to setup wizard automatically
   - **Store Details:**
     - Address: Your business address
     - City, State, ZIP: Your location
     - Country: United States (or your country)
   - **Industry:** Select "Fashion, Apparel, and Accessories"
   - **Product Types:** Select "Physical products"
   - **Business Details:** Fill in as needed
   - Click **Continue** through all steps
   - At the end, click **Go to Dashboard**

---

## Step 4: Connect TapStitch (5 minutes)

1. **Log in to TapStitch Dashboard**
   - Go to: https://www.tapstitch.com
   - Log in to your account

2. **Connect Store**
   - Go to **Stores** (or **Integrations**)
   - Click **Connect Store** or **Add Store**
   - Select **WooCommerce**

3. **Enter Store URL**
   - Store URL: `https://shop.yourdomain.com`
   - Click **Connect** or **Next**

4. **Install TapStitch Plugin** (if required)
   - TapStitch may prompt you to install their plugin
   - Click **Install Plugin** (or follow their instructions)
   - Activate the plugin if needed

5. **Complete Connection**
   - Follow any additional steps TapStitch requires
   - You may need to authorize the connection
   - Connection should complete automatically

6. **Verify Connection**
   - Check TapStitch dashboard - your WooCommerce store should appear
   - Status should show as "Connected" or "Active"

---

## Step 5: Configure Your Next.js Site (Already Done!)

The code is already set up! Just update the environment variable:

### Option A: Update Environment Variable (Recommended)

In Hostinger, add this environment variable:
```env
NEXT_PUBLIC_WOOCOMMERCE_URL=https://shop.yourdomain.com
NEXT_PUBLIC_SHOP_TYPE=woocommerce
```

### Option B: Update Config File Directly

If you prefer, edit `src/config/shop.config.ts` and update:
```typescript
woocommerceUrl: 'https://shop.yourdomain.com',
```

---

## Step 6: Add Products to WooCommerce

1. **In WordPress Admin**
   - Go to **Products** → **Add New**

2. **Add Product Details**
   - **Product Name:** e.g., "MH5 Snow Wash Fleece Oversize Hoodie"
   - **Description:** Product description
   - **Regular Price:** $65.00
   - **Categories:** Create "Apparel" or "Hoodies"
   - **Product Image:** Upload product images
   - **Product Data:** Set to "Variable product" if you have sizes

3. **Add Variations** (for sizes)
   - Go to **Variations** tab
   - Click **Add variation**
   - Select sizes: Small, Medium, Large, XL
   - Set prices for each size
   - Click **Save variations**

4. **Publish Product**
   - Click **Publish**

5. **Sync with TapStitch**
   - Products should sync automatically
   - Check TapStitch dashboard → Catalog to verify

---

## Step 7: Test the Integration

1. **Visit Your Shop**
   - Go to: `https://yourdomain.com/shop`
   - Should redirect to: `https://shop.yourdomain.com`

2. **Add Product to Cart**
   - Select a product
   - Choose size/variation
   - Add to cart

3. **Test Checkout**
   - Proceed to checkout
   - Complete test order
   - Verify order appears in:
     - WooCommerce: **Orders** section
     - TapStitch: **Orders** section

4. **Verify Order Flow**
   - Order should sync from WooCommerce → TapStitch automatically
   - TapStitch should start fulfillment process

---

## Troubleshooting

### Subdomain Not Working
- **Wait 5-10 minutes** for DNS propagation
- Check DNS in hPanel → Domains → DNS Zone Editor
- Verify subdomain points to correct IP

### WordPress Installation Fails
- Check disk space in hPanel
- Try installing to a different directory (e.g., `/shop/`)
- Contact Hostinger support if issues persist

### WooCommerce Not Installing
- Make sure you're using the official WooCommerce plugin
- Check WordPress version (should be 6.0+)
- Try manual upload if auto-install fails

### TapStitch Connection Fails
- Verify WooCommerce is activated
- Check that your WooCommerce URL is accessible
- Ensure SSL (HTTPS) is enabled on subdomain
- Try disconnecting and reconnecting in TapStitch
- Check TapStitch documentation for troubleshooting

### Products Not Syncing
- Products need to be published (not drafts)
- Check TapStitch plugin settings in WordPress
- Verify TapStitch connection status
- Manually trigger sync if available in TapStitch plugin

---

## Next Steps After Setup

1. ✅ **Customize WooCommerce Theme**
   - Install a theme that matches your brand
   - Or use WooCommerce's default theme and customize

2. ✅ **Set Up Payment Gateway**
   - In WooCommerce: **Settings** → **Payments**
   - Enable Stripe (recommended - you already have Stripe setup)
   - Or enable other payment methods

3. ✅ **Configure Shipping**
   - WooCommerce → **Settings** → **Shipping**
   - TapStitch handles fulfillment, but you may want to set shipping rates

4. ✅ **Set Up Tax**
   - WooCommerce → **Settings** → **Tax**
   - Enable tax calculation if needed

5. ✅ **Test Complete Order Flow**
   - Place a test order
   - Verify payment processing
   - Verify order syncs to TapStitch
   - Verify fulfillment starts

---

## Support Resources

- **WooCommerce Docs:** https://woocommerce.com/documentation/
- **TapStitch Support:** support@tapstitch.com | +1 213-376-2727
- **Hostinger Support:** https://www.hostinger.com/contact
- **WordPress Docs:** https://wordpress.org/support/

---

## Quick Reference

- **WooCommerce Admin:** `https://shop.yourdomain.com/wp-admin`
- **Shop URL:** `https://shop.yourdomain.com`
- **TapStitch Dashboard:** https://www.tapstitch.com
- **Main Site:** `https://yourdomain.com` (Next.js)
- **Shop Redirect:** `https://yourdomain.com/shop` → redirects to WooCommerce

---

**You're all set!** Once you complete these steps, your shop will be live and connected to TapStitch for automatic order fulfillment. 🚀

