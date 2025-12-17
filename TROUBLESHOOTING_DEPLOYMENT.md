# Troubleshooting: Website is Down

## Quick Diagnosis Steps

### 1. Check Hostinger Build Logs
- Log into Hostinger hPanel
- Go to Web Apps → Your Application
- Check **Build Logs** or **Deployment Logs**
- Look for errors (red text)

### 2. Common Issues & Fixes

#### Issue: Build Failed
**Symptoms:** Build logs show errors

**Common Causes:**
- Missing dependencies
- TypeScript errors
- Environment variables not set

**Fix:**
- Check build logs for specific error
- Ensure all environment variables are set in Hostinger
- Verify `package.json` has all dependencies

#### Issue: Application Crashed
**Symptoms:** Build succeeds but site shows error page

**Common Causes:**
- Runtime JavaScript errors
- Missing environment variables at runtime
- Memory limit exceeded

**Fix:**
- Check application logs in Hostinger
- Verify environment variables are set
- Check browser console for errors

#### Issue: Videos Not Loading (Our Recent Changes)
**Symptoms:** Site loads but videos don't play

**What We Fixed:**
- Updated video sources to use MP4 format
- Added proper video MIME type headers
- Added error handling for video playback

**If Still Not Working:**
- Verify video files exist in `public/videos/` directory
- Check that `.mp4` versions of videos exist
- Verify video file permissions are correct

#### Issue: 404 Errors
**Symptoms:** Pages not found

**Fix:**
- Verify Next.js routing configuration
- Check that all pages exist in `src/app/`
- Ensure static export is configured if needed

#### Issue: White Screen / Blank Page
**Symptoms:** Site loads but shows blank page

**Common Causes:**
- JavaScript runtime error
- Component import error
- Missing dependencies

**Fix:**
- Open browser console (F12)
- Check for JavaScript errors
- Verify all imports are correct

---

## Current Configuration Checklist

### Environment Variables (Should be set in Hostinger)
```env
NEXT_PUBLIC_WOOCOMMERCE_URL=https://shop.therealmh5.com
NEXT_PUBLIC_SHOP_TYPE=woocommerce
NODE_ENV=production
```

### Video Files (Should exist)
- `/public/videos/hero/hero-bg.mp4` ✅
- `/public/videos/hero/vertical-highlight.mp4` ✅
- Other video files in `/public/videos/`

### Next.js Config
- `next.config.js` has video headers configured ✅
- Image optimization settings are correct ✅

---

## Immediate Actions

1. **Check Hostinger Logs**
   - Application logs
   - Build logs
   - Error logs

2. **Check Browser Console**
   - Open site in browser
   - Press F12 → Console tab
   - Look for red error messages

3. **Verify Deployment Status**
   - In Hostinger dashboard
   - Check if application is running
   - Check deployment status

4. **Try Redeploying**
   - Click "Redeploy" or "Rebuild" in Hostinger
   - Watch build logs for errors
   - Wait for deployment to complete

---

## Contact Points

- **Hostinger Support:** https://www.hostinger.com/contact
- **Next.js Docs:** https://nextjs.org/docs
- **GitHub Repo:** https://github.com/Dongetabag/mh5-website

---

## What We Just Fixed

1. ✅ Video playback (MP4 format priority)
2. ✅ Video error handling
3. ✅ Next.js config (video headers, image optimization)
4. ✅ All code builds successfully locally

**If site is still down, the issue is likely:**
- Deployment configuration in Hostinger
- Missing environment variables
- Runtime error not caught in build

Check the logs first! 🔍

