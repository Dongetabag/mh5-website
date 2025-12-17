# Hostinger Deployment Guide for MH5 Website

## Overview
This guide walks you through deploying your Next.js MH5 website to Hostinger using their Web App platform.

---

## Prerequisites

✅ **GitHub Repository:** Code is pushed to GitHub  
✅ **Hostinger Account:** Access to Hostinger hPanel  
✅ **Domain:** `therealmh5.com` configured in Hostinger  

---

## Step 1: Connect GitHub to Hostinger (5 minutes)

1. **Log in to Hostinger hPanel**
   - Go to: https://hpanel.hostinger.com
   - Select your domain: `therealmh5.com`

2. **Navigate to Web Apps**
   - In hPanel, go to **"Web Apps"** or **"Node.js Apps"**
   - If you don't see this option, you may need to upgrade to a plan that supports Node.js

3. **Create New Application**
   - Click **"Create Application"** or **"Add Application"**
   - Select **"Node.js"** as the framework
   - Choose **"Next.js"** from the framework options (if available)

4. **Connect GitHub Repository**
   - Click **"Connect GitHub"** or **"Import from Git"**
   - Authorize Hostinger to access your GitHub account
   - Select your repository: `Dongetabag/mh5-website` (or your repo name)
   - Select branch: `main`

---

## Step 2: Configure Build Settings (5 minutes)

Hostinger should auto-detect Next.js, but verify these settings:

### Build Configuration:
- **Framework:** Next.js
- **Build Command:** `npm run build`
- **Start Command:** `npm start`
- **Output Directory:** `.next` (or leave default)
- **Node Version:** 18.x or 20.x (recommended: 20.x)

### Environment Variables:
Add these in the Hostinger Web App settings:

```env
# Shop Configuration (WooCommerce)
NEXT_PUBLIC_WOOCOMMERCE_URL=https://shop.therealmh5.com
NEXT_PUBLIC_SHOP_TYPE=woocommerce

# Stripe (if you have keys)
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# Node Environment
NODE_ENV=production
```

---

## Step 3: Deploy (2 minutes)

1. **Click "Deploy" or "Build"**
   - Hostinger will:
     - Clone your repository
     - Install dependencies (`npm install`)
     - Run build command (`npm run build`)
     - Start the application

2. **Wait for Build to Complete**
   - First build may take 5-10 minutes
   - Watch the build logs for any errors

3. **Verify Deployment**
   - Check the deployment status
   - Once successful, your site should be live at `https://therealmh5.com`

---

## Step 4: Configure Domain (If Needed)

If your domain isn't automatically connected:

1. **In Hostinger Web App Settings**
   - Go to **"Domains"** or **"Custom Domain"**
   - Add `therealmh5.com`
   - Hostinger will configure DNS automatically

2. **Verify SSL Certificate**
   - SSL should auto-configure
   - Ensure HTTPS is enabled
   - Check certificate status in Hostinger dashboard

---

## Step 5: Test Your Deployment

Visit your live site and test:

1. **Homepage:** `https://therealmh5.com`
2. **Shop Page:** `https://therealmh5.com/shop` (should redirect to WooCommerce)
3. **Navigation:** All pages should load correctly
4. **Images:** Verify all images load
5. **Cart:** Test cart functionality (if using local products)

---

## Troubleshooting

### Build Fails

**Error: "Module not found"**
- Check that all dependencies are in `package.json`
- Ensure `node_modules` is not committed to git
- Try adding missing dependencies locally and pushing

**Error: "Build timeout"**
- First build can take longer
- Check build logs for specific errors
- Consider optimizing build (remove unused dependencies)

**Error: "Memory limit exceeded"**
- Contact Hostinger support to increase memory limit
- Or optimize your Next.js build

### Site Not Loading

**Check:**
- Is the application running? (Check status in Hostinger dashboard)
- Are environment variables set correctly?
- Check application logs in Hostinger dashboard

### 404 Errors

**Possible causes:**
- Next.js routing not configured correctly
- Missing `next.config.js` settings
- Static export needed? (if so, use `output: 'export'` in next.config.js)

### WooCommerce Redirect Not Working

**Verify:**
- Environment variable `NEXT_PUBLIC_WOOCOMMERCE_URL` is set
- Value is correct: `https://shop.therealmh5.com`
- Subdomain `shop.therealmh5.com` is accessible

---

## Alternative: Static Export (If Node.js Not Available)

If Hostinger doesn't support Node.js apps, you can use static export:

### 1. Update next.config.js:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // ... rest of config
}

module.exports = nextConfig
```

### 2. Build Locally:
```bash
npm run build
```

### 3. Upload to Hostinger:
- Upload the `out` folder contents to `public_html`
- Use Hostinger File Manager or FTP

**Note:** Static export has limitations (no API routes, no server-side features).

---

## Manual Deployment Steps (If Web App Not Available)

If Hostinger Web Apps aren't available for your plan:

### Option 1: FTP/SFTP Upload

1. **Build locally:**
   ```bash
   npm run build
   npm run start  # Test locally first
   ```

2. **Upload files via FTP:**
   - Connect to Hostinger via FTP/SFTP
   - Upload entire project to `public_html`
   - Run `npm install --production` on server
   - Run `npm run build` on server
   - Set up process manager (PM2) to run `npm start`

### Option 2: Git + SSH

1. **SSH into Hostinger:**
   - Enable SSH in Hostinger hPanel
   - Connect via SSH

2. **Clone and Build:**
   ```bash
   cd public_html
   git clone https://github.com/yourusername/mh5-website.git .
   npm install
   npm run build
   pm2 start npm --name "mh5-site" -- start
   ```

---

## Post-Deployment Checklist

- [ ] Site loads at `https://therealmh5.com`
- [ ] All pages accessible
- [ ] Images load correctly
- [ ] Navigation works
- [ ] Shop redirects to WooCommerce
- [ ] Cart functions properly
- [ ] Mobile responsive
- [ ] SSL certificate active (HTTPS)
- [ ] Environment variables configured
- [ ] Analytics working (if configured)

---

## Continuous Deployment

Hostinger Web Apps can be configured for automatic deployments:

1. **Auto-deploy on push:**
   - Enable in Web App settings
   - Every push to `main` branch will trigger rebuild

2. **Manual deployments:**
   - Use "Redeploy" button in Hostinger dashboard
   - Useful for testing before auto-deploy

---

## Support Resources

- **Hostinger Support:** https://www.hostinger.com/contact
- **Next.js Deployment Docs:** https://nextjs.org/docs/deployment
- **Hostinger Web Apps Docs:** Check Hostinger knowledge base

---

## Quick Reference

- **Repository:** Your GitHub repo URL
- **Branch:** `main`
- **Build Command:** `npm run build`
- **Start Command:** `npm start`
- **Domain:** `therealmh5.com`
- **Shop Subdomain:** `shop.therealmh5.com`

---

**Once deployed, your site will be live at `https://therealmh5.com`!** 🚀

