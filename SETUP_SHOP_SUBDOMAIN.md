# Setting Up shop.therealmh5.com for WooCommerce Store

This guide shows you how to set up `shop.therealmh5.com` as a subdomain for your WooCommerce store.

---

## Option 1: Subdomain Setup (Recommended) - shop.therealmh5.com

This is the cleanest approach - your main site stays at `therealmh5.com` and the shop is at `shop.therealmh5.com`.

---

## Step 1: Create Subdomain in Hostinger (5 minutes)

1. **Log in to Hostinger hPanel**
   - Go to: https://hpanel.hostinger.com
   - Select your domain: `therealmh5.com`

2. **Create Subdomain**
   - Go to **Domains** → **Subdomains**
   - Click **"Create Subdomain"**
   - **Subdomain name:** `shop`
   - **Document root:** 
     - Option A: `public_html/shop` (if WordPress is in a subdirectory)
     - Option B: Leave default and point it to your existing WordPress install location
   - Click **"Create"**

3. **Note the Path**
   - Remember where your WordPress is installed
   - It might be at: `public_html` or `public_html/shop` or another location

---

## Step 2: Point Subdomain to WordPress Installation

You have two scenarios:

### Scenario A: WordPress is Already Installed Somewhere

If your WordPress is already installed (like at the Hostinger subdomain), you need to either:

**Option 1: Move WordPress to the subdomain directory**
- Move all WordPress files to `public_html/shop/`
- Update database references (see Step 3)

**Option 2: Use domain mapping**
- Keep WordPress where it is
- Map `shop.therealmh5.com` to point to that directory
- This requires domain mapping in Hostinger

### Scenario B: Fresh WordPress Install on Subdomain (Easiest)

1. **Install WordPress on the Subdomain**
   - In hPanel, go to **Website** → **Auto Installer**
   - Select **WordPress**
   - **Domain:** Select `shop.therealmh5.com`
   - **Directory:** Leave empty (root of subdomain)
   - Install WordPress here
   - This gives you a fresh WordPress installation specifically for the shop

**Recommendation:** Use Scenario B (fresh install) - it's cleaner and easier.

---

## Step 3: Update WordPress Site URL (If Needed)

If you moved WordPress or need to update URLs:

1. **Log in to WordPress Admin**
   - Go to: `https://shop.therealmh5.com/wp-admin`

2. **Update Site URL**
   - Go to **Settings** → **General**
   - **WordPress Address (URL):** `https://shop.therealmh5.com`
   - **Site Address (URL):** `https://shop.therealmh5.com`
   - Click **"Save Changes"**

3. **If you get locked out:**
   - You can update via database or wp-config.php
   - Or use Hostinger File Manager to edit `wp-config.php`:
     ```php
     define('WP_HOME','https://shop.therealmh5.com');
     define('WP_SITEURL','https://shop.therealmh5.com');
     ```

---

## Step 4: Install WooCommerce (If Fresh Install)

If you did a fresh install on the subdomain:

1. **Log in to WordPress Admin**
   - Go to: `https://shop.therealmh5.com/wp-admin`

2. **Install WooCommerce**
   - Go to **Plugins** → **Add New**
   - Search "WooCommerce"
   - Install and activate
   - Run the setup wizard

3. **Configure Stripe**
   - WooCommerce → Payments
   - Set up Stripe with your API keys

---

## Step 5: Connect TapStitch

1. **Log in to TapStitch Dashboard**
   - Go to: https://www.tapstitch.com

2. **Connect Store**
   - Go to **Stores** → **Connect Store**
   - Select **WooCommerce**
   - **Store URL:** `https://shop.therealmh5.com`
   - Complete the connection

---

## Step 6: Update Next.js Site Configuration

Update your Next.js site to redirect to the new subdomain:

**In Hostinger (where your Next.js site is), add these environment variables:**

```env
NEXT_PUBLIC_WOOCOMMERCE_URL=https://shop.therealmh5.com
NEXT_PUBLIC_SHOP_TYPE=woocommerce
```

**Or update the config file directly:**

Edit `src/config/shop.config.ts`:
```typescript
woocommerceUrl: 'https://shop.therealmh5.com',
```

---

## Option 2: Use Subdirectory Path (Alternative)

If you prefer `therealmh5.com/shop` instead of a subdomain:

### Step 1: Install WordPress in Subdirectory

1. **Create Directory**
   - In Hostinger File Manager, go to `public_html/`
   - Create folder: `shop`

2. **Install WordPress**
   - Use Hostinger Auto Installer
   - Select domain: `therealmh5.com`
   - Directory: `/shop`
   - Install WordPress here

### Step 2: Update WordPress Settings

1. **WordPress Admin** → **Settings** → **General**
   - **WordPress Address (URL):** `https://therealmh5.com/shop`
   - **Site Address (URL):** `https://therealmh5.com/shop`

### Step 3: Update Next.js Config

```env
NEXT_PUBLIC_WOOCOMMERCE_URL=https://therealmh5.com/shop
NEXT_PUBLIC_SHOP_TYPE=woocommerce
```

---

## DNS Configuration (If Needed)

If the subdomain doesn't work immediately:

1. **Check DNS Settings**
   - In Hostinger hPanel, go to **Domains** → **DNS Zone Editor**
   - Look for subdomain record:
     - **Type:** A or CNAME
     - **Name:** `shop`
     - **Value:** Should point to your server IP or domain

2. **Wait for Propagation**
   - DNS changes can take 5 minutes to 48 hours
   - Usually happens within 15-30 minutes

3. **Test the Subdomain**
   - Visit: `https://shop.therealmh5.com`
   - Should show your WordPress site

---

## SSL Certificate (Important!)

Make sure HTTPS works on your subdomain:

1. **Hostinger usually auto-configures SSL**
   - Check if `https://shop.therealmh5.com` loads
   - If not, go to **SSL** section in hPanel
   - Enable SSL for the subdomain

2. **Force HTTPS in WordPress**
   - WordPress → Settings → General
   - Make sure both URLs use `https://`

---

## Quick Reference

- **Shop URL:** `https://shop.therealmh5.com`
- **Main Site:** `https://therealmh5.com` (Next.js)
- **Shop Redirect:** `https://therealmh5.com/shop` → redirects to `shop.therealmh5.com`

---

## Recommendation

**Use the subdomain approach (`shop.therealmh5.com`)** because:
- ✅ Cleaner separation between Next.js site and WooCommerce
- ✅ Easier to manage
- ✅ Better for SEO (separate subdomain)
- ✅ Standard e-commerce practice
- ✅ Easier SSL management

---

## Next Steps After Setup

1. ✅ Subdomain created and working
2. ✅ WordPress installed on subdomain
3. ✅ WooCommerce installed and configured
4. ✅ Stripe payment set up
5. ✅ TapStitch connected
6. ✅ Next.js config updated
7. ✅ Test shop redirect from main site

---

**Once you've set up the subdomain, let me know and I can help you:**
- Update the Next.js configuration
- Test the redirect
- Add your first product
- Verify TapStitch connection

