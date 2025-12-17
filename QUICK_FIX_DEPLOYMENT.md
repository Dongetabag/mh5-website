# Quick Fix: Website Down

## Immediate Steps

### 1. Check What Error You're Seeing

**In Hostinger Dashboard:**
1. Go to **Web Apps** → Your Application
2. Check **Build Logs** - what errors show?
3. Check **Application Logs** - any runtime errors?

**In Browser:**
1. Visit `https://therealmh5.com`
2. Press **F12** to open Developer Tools
3. Check **Console** tab for errors (red text)
4. Check **Network** tab - are files loading? (red = failed)

---

## Most Likely Issues

### Issue 1: Build Failed
**If you see build errors in Hostinger:**

1. **Check for missing dependencies**
   - Hostinger might not have installed `node_modules`
   - Solution: Ensure build command includes `npm install`

2. **Check environment variables**
   - Missing `NODE_ENV=production`
   - Solution: Add in Hostinger Web App settings

### Issue 2: Application Not Starting
**If build succeeds but site doesn't load:**

1. **Check start command in Hostinger**
   - Should be: `npm start`
   - NOT: `npm run dev`

2. **Check Node version**
   - Should be Node.js 18.x or 20.x
   - Check in Hostinger settings

### Issue 3: Runtime Error (White Screen)
**If site loads but shows blank/white page:**

1. **Check browser console for errors**
2. **Common causes:**
   - Missing environment variables (`NEXT_PUBLIC_*` vars)
   - Component import error
   - Video file path issues

---

## Quick Fix Checklist

### In Hostinger Web App Settings:

✅ **Build Command:** `npm run build`  
✅ **Start Command:** `npm start`  
✅ **Node Version:** 18.x or 20.x  
✅ **Environment Variables Set:**
   - `NODE_ENV=production`
   - `NEXT_PUBLIC_WOOCOMMERCE_URL=https://shop.therealmh5.com`
   - `NEXT_PUBLIC_SHOP_TYPE=woocommerce`

### If Using Static Export (Alternative):

If Hostinger doesn't support Node.js, you may need static export:

1. **Update `next.config.js`:**
   ```javascript
   const nextConfig = {
     output: 'export',
     images: {
       unoptimized: true,
     },
   }
   ```

2. **Build locally and upload:**
   ```bash
   npm run build
   # Upload the 'out' folder to Hostinger
   ```

---

## Emergency: Revert to Last Working Version

If nothing works, you can:

1. **Revert last commit** (if deployment broke it):
   ```bash
   git revert HEAD
   git push origin main
   ```

2. **Or deploy previous commit:**
   - In GitHub, go to your repo
   - Find a working commit
   - Update Hostinger to use that commit hash

---

## Need More Help?

**Share with me:**
1. What error message you see (exact text)
2. Screenshot of Hostinger build logs
3. Browser console errors (F12 → Console)
4. What you see when visiting the site

Then I can help fix the specific issue!

