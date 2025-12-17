# Apple.com Font Update Complete ✅

## Changes Made

### Typography Updated to Match Apple.com

1. **Font Stack - Apple System Fonts**
   - Updated `--font-heading` to use Apple's system font stack: `-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`
   - Updated `--font-body` to use Apple's system font stack: `-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`

2. **Headings (h1-h6)**
   - Changed from serif (Cormorant Garamond) to Apple's system fonts
   - Updated font-weight from 300 (light) to 400 (regular)
   - Updated letter-spacing to -0.01em (Apple standard)
   - Line-height set to 1.1 (Apple standard)
   - Added font smoothing

3. **Body Text**
   - Font size: 17px (Apple standard)
   - Line-height: 1.47059 (Apple standard)
   - Letter-spacing: -0.022em (Apple standard)
   - Added font smoothing

4. **Paragraphs, Lists, Spans**
   - Applied Apple's typography standards
   - Line-height: 1.47059
   - Letter-spacing: -0.022em

5. **Removed**
   - Google Fonts import for Cormorant Garamond (no longer needed)
   - Kept Bebas Neue for MH5 logo only

## Result

The site now uses the same font system as Apple.com:
- **On Apple devices**: Renders as SF Pro Display (headings) and SF Pro Text (body)
- **On other platforms**: Falls back to system fonts (Segoe UI on Windows, Roboto on Android, etc.)

This provides a clean, modern, Apple-like typography experience across all devices!



