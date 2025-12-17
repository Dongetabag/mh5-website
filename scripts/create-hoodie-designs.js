#!/usr/bin/env node

/**
 * MH5 Hoodie Collection Designer
 * Uses Google AI (Gemini) to add MH5 logo to hoodie product images
 * Creates multiple design variations for the collection
 */

const { GoogleGenerativeAI } = require('@google/generative-ai')
const fs = require('fs')
const path = require('path')

const API_KEY = 'AIzaSyAmOIJHGlsZdMYy1NJbbXTNAuB-Du0mrsc'
const HOODIE_FOLDER = '/Users/simeonreid/Downloads/Snow Wash Fleece Oversize Hoodie_gallery'
const OUTPUT_FOLDER = path.join(__dirname, '../public/images/hoodie-designs')

// Ensure output folder exists
if (!fs.existsSync(OUTPUT_FOLDER)) {
  fs.mkdirSync(OUTPUT_FOLDER, { recursive: true })
}

// Initialize Gemini
const genAI = new GoogleGenerativeAI(API_KEY)

// MH5 Logo Description
const MH5_LOGO_DESCRIPTION = `
MH5 Logo Design:
- Bold "MH5" text in modern sans-serif font
- "M" and "H5" separated, with "H5" slightly smaller
- Primary color: Neon Cyan (#7DF9FF)
- Optional secondary accent: Frost (#9DFBFF)
- Clean, minimal design suitable for premium apparel
- Can be placed on chest area or back of hoodie
`

// Design variations for the collection
const DESIGN_VARIANTS = [
  {
    name: 'classic-front',
    description: 'MH5 logo on front chest, small and clean, centered',
    placement: 'front chest, centered, small size',
  },
  {
    name: 'classic-back',
    description: 'Large MH5 logo on back, bold statement piece',
    placement: 'back center, large size, bold',
  },
  {
    name: 'minimal-corner',
    description: 'Small MH5 logo on front left chest corner',
    placement: 'front left chest, small, subtle',
  },
  {
    name: 'oversized-back',
    description: 'Oversized MH5 logo covering most of the back',
    placement: 'back, extra large, dominant',
  },
]

/**
 * Convert image to base64
 */
function imageToBase64(imagePath) {
  const imageBuffer = fs.readFileSync(imagePath)
  return imageBuffer.toString('base64')
}

/**
 * Get image MIME type
 */
function getMimeType(imagePath) {
  const ext = path.extname(imagePath).toLowerCase()
  const mimeTypes = {
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
  }
  return mimeTypes[ext] || 'image/png'
}

/**
 * Generate hoodie design using Gemini
 */
async function generateHoodieDesign(imagePath, variant) {
  try {
    console.log(`\n🎨 Creating ${variant.name} design from ${path.basename(imagePath)}...`)
    
    // Use gemini-pro or gemini-1.5-pro for better image understanding
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' })
    
    const imageData = imageToBase64(imagePath)
    const mimeType = getMimeType(imagePath)
    
    const prompt = `
You are a professional graphic designer creating premium apparel designs for the MH5 brand.

PRODUCT IMAGE: This is a hoodie product photo from TapStitch.

TASK: Add the MH5 logo to this hoodie design with the following specifications:

${MH5_LOGO_DESCRIPTION}

DESIGN VARIANT: ${variant.description}
PLACEMENT: ${variant.placement}

REQUIREMENTS:
1. Add the MH5 logo to the hoodie in the specified placement
2. Use the neon cyan color (#7DF9FF) for the logo
3. Ensure the logo looks professional and premium
4. Make sure the logo is properly integrated into the hoodie design
5. Maintain the hoodie's original quality and appearance
6. The logo should be clearly visible but tasteful

Return the edited image with the MH5 logo applied.
`

    // Use Gemini with image input
    const imagePart = {
      inlineData: {
        data: imageData,
        mimeType: mimeType,
      },
    }

    const result = await model.generateContent([prompt, imagePart])
    const response = await result.response
    const text = response.text()
    
    console.log(`✅ Generated design description: ${text.substring(0, 100)}...`)
    
    // Note: Gemini 1.5 Flash doesn't directly output images
    // This script provides the prompt - for actual image editing,
    // you may need to use Gemini 1.5 Pro with image generation capabilities
    // or use a separate image editing API
    
    return {
      success: true,
      variant: variant.name,
      description: text,
    }
  } catch (error) {
    console.error(`❌ Error generating design for ${variant.name}:`, error.message)
    return {
      success: false,
      variant: variant.name,
      error: error.message,
    }
  }
}

/**
 * Main function
 */
async function main() {
  console.log('🏀 MH5 Hoodie Collection Designer')
  console.log('==================================\n')
  
  // Get all images from hoodie folder
  const files = fs.readdirSync(HOODIE_FOLDER)
    .filter(file => /\.(png|jpg|jpeg)$/i.test(file))
    .map(file => path.join(HOODIE_FOLDER, file))
  
  if (files.length === 0) {
    console.error('❌ No image files found in hoodie folder')
    process.exit(1)
  }
  
  console.log(`📸 Found ${files.length} hoodie images`)
  console.log(`🎨 Creating ${DESIGN_VARIANTS.length} design variants for each image\n`)
  
  // Use first image as sample
  const sampleImage = files[0]
  console.log(`📷 Using sample image: ${path.basename(sampleImage)}\n`)
  
  const results = []
  
  // Generate designs for each variant
  for (const variant of DESIGN_VARIANTS) {
    const result = await generateHoodieDesign(sampleImage, variant)
    results.push(result)
    
    // Small delay between requests
    await new Promise(resolve => setTimeout(resolve, 2000))
  }
  
  // Save results
  const resultsFile = path.join(OUTPUT_FOLDER, 'design-results.json')
  fs.writeFileSync(resultsFile, JSON.stringify(results, null, 2))
  
  console.log('\n✅ Design generation complete!')
  console.log(`📁 Results saved to: ${resultsFile}`)
  console.log('\nNOTE: For actual image editing with logo placement, consider:')
  console.log('1. Using Gemini 1.5 Pro with image generation')
  console.log('2. Using a dedicated image editing API (e.g., Remove.bg, Canva API)')
  console.log('3. Manual design using the generated descriptions as guidelines')
}

// Run the script
main().catch(console.error)

