# MH5 Hoodie Collection Design Guide

## Overview
Using Google AI (Gemini) to create MH5 hoodie collection designs by adding the MH5 logo to TapStitch hoodie product images.

## Setup

1. **Install dependencies:**
```bash
npm install @google/generative-ai
```

2. **Run the design script:**
```bash
node scripts/create-hoodie-designs.js
```

## Design Variants

### 1. Classic Front
- MH5 logo on front chest
- Small, centered placement
- Clean and minimal

### 2. Classic Back
- Large MH5 logo on back
- Bold statement piece
- Dominant design

### 3. Minimal Corner
- Small MH5 logo on front left chest
- Subtle branding
- Premium look

### 4. Oversized Back
- Extra large MH5 logo on back
- Maximum impact
- Streetwear style

## Logo Specifications

- **Text**: "MH5"
- **Primary Color**: Neon Cyan (#7DF9FF)
- **Secondary Color**: Frost (#9DFBFF)
- **Font**: Modern sans-serif, bold
- **Style**: Clean, minimal, premium

## Output

Generated designs will be saved to:
- `public/images/hoodie-designs/`
- Design descriptions in JSON format
- Ready for TapStitch product upload

## Alternative Approaches

Since Gemini 1.5 Flash doesn't directly output edited images, consider:

1. **Gemini 1.5 Pro**: Better for image generation/editing
2. **Image Editing APIs**: 
   - Remove.bg API
   - Canva API
   - Cloudinary
3. **Manual Design Tools**:
   - Use the generated descriptions as guidelines
   - Create designs in Figma/Photoshop
   - Apply to hoodie mockups

## Next Steps

1. Run the script to generate design descriptions
2. Use descriptions to create actual logo placements
3. Upload designs to TapStitch as product variants
4. Add to shop page for customer purchase

