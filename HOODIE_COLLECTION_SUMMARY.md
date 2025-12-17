# MH5 Hoodie Collection - Design Summary

## Overview
Using Google AI (Gemini 2.0 Flash) to create design specifications for adding the MH5 logo to TapStitch hoodie product images.

## Design Variants Created

### 1. Classic Front
- **Placement**: Front chest, centered
- **Size**: Small to medium
- **Style**: Clean, minimal, professional
- **Use Case**: Subtle branding, everyday wear

### 2. Classic Back
- **Placement**: Back center, large
- **Size**: Large, statement piece
- **Style**: Bold, eye-catching
- **Use Case**: Maximum brand visibility

### 3. Minimal Corner
- **Placement**: Front left chest corner
- **Size**: Small, subtle
- **Style**: Premium, understated
- **Use Case**: Sophisticated branding

### 4. Oversized Back
- **Placement**: Back, extra large
- **Size**: Dominant, covers most of back
- **Style**: Streetwear, bold
- **Use Case**: Maximum impact, statement piece

## Logo Specifications

### Design
- **Text**: "MH5"
- **Font**: Bold, modern sans-serif (similar to Oswald)
- **Style**: Clean, minimal, premium

### Colors
- **Primary**: Neon Cyan (#7DF9FF)
- **Secondary**: Frost (#9DFBFF) - for accents if needed
- **Contrast**: Designed to work on various hoodie colors

## Generated Design Specs

Design specifications have been generated for multiple hoodie images and saved to:
- `public/images/hoodie-designs/design-specs.json`

Each specification includes:
- Exact placement coordinates
- Recommended logo size
- Color specifications
- Contrast analysis
- Design notes and recommendations

## Next Steps

1. **Review Design Specs**
   - Check `design-specs.json` for detailed specifications
   - Review each variant's placement and sizing recommendations

2. **Create Logo Files**
   - Design MH5 logo in vector format (SVG/AI)
   - Create PNG versions at various sizes
   - Ensure logo uses Neon Cyan (#7DF9FF)

3. **Apply Designs**
   - Use design specs to place logos on hoodie mockups
   - Create final product images for each variant
   - Test logo visibility on different hoodie colors

4. **Upload to TapStitch**
   - Create products in TapStitch dashboard
   - Upload designed hoodie images
   - Set up product variants (different logo placements)
   - Configure pricing and inventory

5. **Add to Shop Page**
   - Sync products from TapStitch API
   - Display on `/shop` page
   - Enable customer purchases

## Scripts Available

- `scripts/create-hoodie-designs-v2.js` - Generate design specs using Gemini
- `scripts/test-gemini-models.js` - Test available Gemini models
- `src/app/api/gemini/hoodie-design/route.ts` - API endpoint for design generation

## Usage

```bash
# Generate design specs for all hoodie images
node scripts/create-hoodie-designs-v2.js

# Process specific number of images (edit script to change slice limit)
# Currently processes first 3 images for testing
```

## Design Guidelines

When implementing the designs:

1. **Placement Precision**: Follow the coordinates provided in design specs
2. **Size Consistency**: Maintain consistent logo sizes across variants
3. **Color Accuracy**: Use exact Neon Cyan (#7DF9FF) for brand consistency
4. **Quality**: Ensure high-resolution logo files for crisp printing
5. **Contrast**: Verify logo visibility on each hoodie color variant

## Files Generated

- `public/images/hoodie-designs/design-specs.json` - Complete design specifications
- Design specs include JSON-formatted placement, size, color, and notes for each variant

