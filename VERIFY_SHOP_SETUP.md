# Verify shop.therealmh5.com Setup

Your subdomain is created! Let's verify everything is set up correctly.

---

## Step 1: Verify WordPress is Working (2 minutes)

1. **Click "WP Admin"** next to `shop.therealmh5.com` in your Hostinger dashboard
   - Or visit: `https://shop.therealmh5.com/wp-admin`
   - Log in with your WordPress credentials

2. **Check Site URL**
   - Go to **Settings** → **General**
   - Verify:
     - **WordPress Address (URL):** `https://shop.therealmh5.com`
     - **Site Address (URL):** `https://shop.therealmh5.com`
   - If different, update them and click **Save Changes**

---

## Step 2: Verify WooCommerce is Installed (1 minute)

1. **In WordPress Admin**, check the left sidebar
   - You should see **"WooCommerce"** in the menu
   - If not, install it:
     - Go to **Plugins** → **Add New**
     - Search "WooCommerce"
     - Install and activate

2. **Check WooCommerce Status**
   - Click **WooCommerce** in the sidebar
   - Should show your store overview
   - Check if there are any setup steps remaining

---

## Step 3: Verify Stripe Payment (1 minute)

1. **In WordPress Admin**, go to **WooCommerce** → **Payments**
   - Stripe should show as **"Active"**
   - If not, set it up:
     - Click **"Set up"** next to Stripe
     - Enter your Stripe API keys
     - Save

---

## Step 4: Connect TapStitch (5 minutes)

1. **Log in to TapStitch Dashboard**
   - Go to: https://www.tapstitch.com
   - Log in to your account

2. **Connect Your Store**
   - Click **"Stores"** (or **"Integrations"**)
   - Click **"Connect Store"** or **"Add Store"**
   - Select **"WooCommerce"**

3. **Enter Store Details**
   - **Store URL:** `https://shop.therealmh5.com`
   - Click **"Connect"** or **"Next"**

4. **Complete Connection**
   - Follow any prompts to authorize
   - Install TapStitch plugin if required
   - Wait for connection to complete

5. **Verify Connection**
   - Check TapStitch dashboard - store should show as **"Connected"**
   - Status should be **"Active"**

---

## Step 5: Update Next.js Configuration (2 minutes)

Since your subdomain is ready, update your Next.js site to redirect to it.

**In Hostinger (where your Next.js site `therealmh5.com` is hosted):**

1. **Add Environment Variables**
   - Go to your Next.js site settings
   - Find **"Environment Variables"** or **".env"** settings
   - Add these variables:

```env
NEXT_PUBLIC_WOOCOMMERCE_URL=https://shop.therealmh5.com
NEXT_PUBLIC_SHOP_TYPE=woocommerce
```

2. **Save and Redeploy**
   - Save the environment variables
   - Redeploy/restart your Next.js site if needed
   - Changes should take effect immediately

**Alternative: If you can't access environment variables, I can help update the config file directly.**

---

## Step 6: Test the Redirect (1 minute)

1. **Visit your main site shop page:**
   - Go to: `https://therealmh5.com/shop`
   - Should automatically redirect to: `https://shop.therealmh5.com`

2. **Verify it works:**
   - You should see your WooCommerce shop
   - Not your Next.js shop page

---

## Quick Checklist

- [ ] Subdomain created: `shop.therealmh5.com` ✅
- [ ] WordPress accessible on subdomain
- [ ] WordPress URL settings correct
- [ ] WooCommerce installed and active
- [ ] Stripe payment configured
- [ ] TapStitch connected to WooCommerce
- [ ] Next.js environment variables updated
- [ ] Shop redirect working from main site

---

## Next: Add Products

Once everything above is verified:

1. **Add your first product:**
   - WordPress Admin → Products → Add New
   - Add the MH5 Hoodie with sizes
   - See `WOOCOMMERCE_FINAL_STEPS.md` for detailed product setup

2. **Test order flow:**
   - Add product to cart
   - Complete checkout
   - Verify order syncs to TapStitch

---

**Let me know:**
1. Can you access WordPress admin on `shop.therealmh5.com`?
2. Is WooCommerce installed and active?
3. Have you connected TapStitch yet?
4. Do you need help updating the Next.js environment variables?

