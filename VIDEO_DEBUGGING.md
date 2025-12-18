# Video Loading Debugging Guide

## Issue: Videos Not Loading on Static Website

### Common Causes:

1. **Video Files Not Uploaded**
   - Check that all video files from `public/videos/` are uploaded to your server
   - Verify file paths match exactly (case-sensitive on some servers)

2. **MIME Type Issues**
   - Ensure `.htaccess` file is in root directory
   - Check server supports `.htaccess` (Apache does, Nginx needs different config)

3. **Browser Compatibility**
   - `.MOV` files work best in Safari
   - Chrome/Firefox may have issues with `.MOV`
   - Mobile browsers vary

4. **File Path Issues**
   - Videos should be at: `/videos/basketball/...`, `/videos/events/...`, etc.
   - Check browser console (F12) for 404 errors

### Debugging Steps:

1. **Open Browser Console (F12)**
   - Look for video loading messages
   - Check for 404 errors on video files
   - Note any MIME type errors

2. **Check Network Tab**
   - See if video files are being requested
   - Check response codes (200 = success, 404 = not found)
   - Verify Content-Type headers

3. **Test Video URLs Directly**
   - Try: `https://your-site.com/videos/basketball/88b0d1582ab545f8befd9ad80dabd80f.MOV`
   - If it downloads instead of playing, MIME type is wrong
   - If 404, file is missing

4. **Verify File Structure**
   ```
   your-site-root/
   ├── videos/
   │   ├── basketball/
   │   │   ├── 88b0d1582ab545f8befd9ad80dabd80f.MOV
   │   │   └── ...
   │   ├── events/
   │   └── hero/
   └── .htaccess
   ```

### Quick Fixes:

1. **If videos are 404:**
   - Re-upload video files to correct paths
   - Check file names match exactly (case-sensitive)

2. **If videos download instead of play:**
   - Ensure `.htaccess` is uploaded
   - Check server supports `.htaccess`
   - For Nginx, add MIME types to config

3. **If videos don't autoplay:**
   - This is normal - browsers block autoplay
   - Videos should still load and be playable
   - Check if videos show black screen (they're loading)

### For Hostinger Static Hosting:

1. Upload `.htaccess` file to root
2. Ensure all `public/videos/` files are uploaded
3. Check file permissions (should be 644 for files)
4. Verify paths in browser console match actual file locations

### Alternative Solution:

If `.MOV` files continue to have issues, consider converting to `.mp4`:
- Use FFmpeg: `ffmpeg -i input.MOV -c:v libx264 -c:a aac output.mp4`
- Or use online converters
- Then update video paths in code to use `.mp4`

