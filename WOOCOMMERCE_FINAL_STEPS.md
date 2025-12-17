# Final Steps - WooCommerce Setup Almost Complete!

✅ **Stripe is Active** - Payments are configured!
✅ **WooCommerce Installed** - Store is ready!

Now let's complete the setup:

---

## Step 1: Connect TapStitch to WooCommerce (5 minutes)

This is the crucial step that connects your store to TapStitch for automatic fulfillment.

1. **Go to TapStitch Dashboard**
   - Visit: https://www.tapstitch.com
   - Log in to your TapStitch account

2. **Connect Your Store**
   - Click **"Stores"** in the left menu (or **"Integrations"**)
   - Click **"Connect Store"** or **"Add Store"** button
   - Select **"WooCommerce"** from the list

3. **Enter Your Store Details**
   - **Store URL:** `limegreen-dinosaur-663046.hostingersite.com`
     - Or if you set up a custom domain: `shop.yourdomain.com`
   - Click **"Connect"** or **"Next"**

4. **Complete the Connection**
   - TapStitch may ask you to install their plugin (if available)
   - Follow any authorization prompts
   - Connection should complete automatically

5. **Verify Connection**
   - Check TapStitch dashboard - your WooCommerce store should appear
   - Status should show as **"Connected"** or **"Active"**

**Important:** Once connected, all orders from WooCommerce will automatically sync to TapStitch for fulfillment!

---

## Step 2: Add Your First Product (10 minutes)

Let's add the MH5 Hoodie:

1. **In WordPress Admin**, go to **Products → Add New**

2. **Basic Product Information:**
   - **Product Name:** `MH5 Snow Wash Fleece Oversize Hoodie`
   - **Description:**
     ```
     Premium oversized hoodie made with high-quality fleece material, perfect for comfort and style. 
     Clean, minimalist design with premium quality construction.
     ```
   - **Short Description:** `Premium oversized hoodie with fleece material`

3. **Product Image:**
   - Click **"Set product image"**
   - Upload the hoodie front image
   - Click **"Set product image"** button

4. **Product Gallery:**
   - Scroll to **Product Gallery**
   - Click **"Add product gallery images"**
   - Upload all hoodie images (front, back, side, detail)
   - Click **"Add to gallery"**

5. **Product Data (Important!):**
   - In the **Product Data** box, select **"Variable product"** (dropdown)
   - This allows you to add different sizes

6. **Attributes Tab:**
   - Click **"Attributes"** tab
   - Click **"Add"** button
   - **Name:** `Size`
   - **Values:** Type `Small | Medium | Large | XL`
     - (Use pipe `|` to separate values)
   - Check the box: **"Used for variations"**
   - Click **"Save attributes"**

7. **Variations Tab:**
   - Click **"Variations"** tab
   - Click the dropdown: **"Add variation"** → Select **"Create variations from all attributes"**
   - Click **"Go"** button
   - Confirm by clicking **"OK"**

   Now you'll see 4 variations (Small, Medium, Large, XL). For each:

   - Click the variation dropdown arrow to expand it
   - **Regular Price:** `65.00` (for Small, Medium, Large)
   - **Regular Price:** `68.00` (for XL)
   - **SKU (optional):** `MH5-HOODIE-S`, `MH5-HOODIE-M`, etc.
   - Click **"Save changes"** button at the top

8. **General Tab:**
   - Go back to **"General"** tab
   - **SKU (optional):** `MH5-HOODIE-001`

9. **Publish:**
   - Click the **"Publish"** button (top right)
   - Your product is now live!

---

## Step 3: Test Your Store (5 minutes)

1. **View Your Shop:**
   - Visit: `https://limegreen-dinosaur-663046.hostingersite.com/shop`
   - Or go to your custom domain if set up
   - You should see your hoodie product!

2. **Test Product Page:**
   - Click on the hoodie product
   - Select a size
   - Click **"Add to cart"**

3. **Test Checkout:**
   - Click cart icon
   - Click **"Checkout"**
   - Fill in test information:
     - Use Stripe test card: `4242 4242 4242 4242`
     - Any future expiry date
     - Any 3-digit CVC
   - Complete the order

4. **Verify Order Sync:**
   - Check **WooCommerce → Orders** - order should appear
   - Check **TapStitch Dashboard → Orders** - order should sync automatically
   - TapStitch will start fulfillment process

---

## Step 4: Update Next.js Site Configuration (2 minutes)

Once you confirm your WooCommerce store URL, update your Next.js site:

**In Hostinger (where your Next.js site is deployed), add these environment variables:**

```env
NEXT_PUBLIC_WOOCOMMERCE_URL=https://limegreen-dinosaur-663046.hostingersite.com
NEXT_PUBLIC_SHOP_TYPE=woocommerce
```

**Or if you set up a custom subdomain:**
```env
NEXT_PUBLIC_WOOCOMMERCE_URL=https://shop.yourdomain.com
NEXT_PUBLIC_SHOP_TYPE=woocommerce
```

**How to add environment variables in Hostinger:**
1. Go to hPanel
2. Find your Next.js site/domain
3. Look for **"Environment Variables"** or **".env"** settings
4. Add the variables above
5. Restart/redeploy your Next.js site

After this, when visitors go to `yourdomain.com/shop`, they'll be redirected to your WooCommerce store!

---

## Quick Checklist

- [x] WooCommerce installed ✅
- [x] Stripe payment configured ✅
- [ ] TapStitch connected to WooCommerce
- [ ] First product added (MH5 Hoodie)
- [ ] Test order placed
- [ ] TapStitch order sync verified
- [ ] Next.js environment variables updated
- [ ] Shop redirect working from main site

---

## Need Help?

- **TapStitch Connection Issues:** support@tapstitch.com | +1 213-376-2727
- **WooCommerce Help:** Check WooCommerce → Help in WordPress admin
- **Product Questions:** The product setup above has detailed steps

---

**Once TapStitch is connected and you've added a product, let me know and I can help test everything!** 🚀

