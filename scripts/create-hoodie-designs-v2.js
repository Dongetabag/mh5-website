#!/usr/bin/env node

/**
 * MH5 Hoodie Collection Designer v2
 * Uses Google AI (Gemini) to analyze hoodie images and generate design specs
 * Creates detailed design specifications for logo placement
 */

const { GoogleGenerativeAI } = require('@google/generative-ai')
const fs = require('fs')
const path = require('path')

const API_KEY = process.env.GOOGLE_AI_API_KEY || ''
const HOODIE_FOLDER = '/Users/simeonreid/Downloads/Snow Wash Fleece Oversize Hoodie_gallery'
const OUTPUT_FOLDER = path.join(__dirname, '../public/images/hoodie-designs')

// Ensure output folder exists
if (!fs.existsSync(OUTPUT_FOLDER)) {
  fs.mkdirSync(OUTPUT_FOLDER, { recursive: true })
}

// Initialize Gemini
const genAI = new GoogleGenerativeAI(API_KEY)

// Design variations
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
 * Generate design specification using Gemini
 */
async function generateDesignSpec(imagePath, variant) {
  try {
    console.log(`\n🎨 Creating ${variant.name} design spec from ${path.basename(imagePath)}...`)
    
    // Use gemini-2.0-flash-exp which supports vision
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' })
    
    const imageData = imageToBase64(imagePath)
    const mimeType = getMimeType(imagePath)
    
    const prompt = `
You are a professional graphic designer creating premium apparel designs for the MH5 brand.

PRODUCT IMAGE: This is a hoodie product photo from TapStitch (print-on-demand platform).

TASK: Analyze this hoodie image and provide detailed design specifications for adding the MH5 logo.

LOGO SPECIFICATIONS:
- Text: "MH5" in bold, modern sans-serif font (similar to Oswald or similar bold sans-serif)
- Primary Color: Neon Cyan (#7DF9FF) - a vibrant electric cyan
- Secondary Color: Frost (#9DFBFF) - can be used for accents if needed
- Style: Clean, minimal, premium aesthetic suitable for streetwear/athletic apparel
- The logo should be professional and match the premium quality of the hoodie

DESIGN VARIANT: ${variant.description}
PLACEMENT REQUIREMENT: ${variant.placement}

Please analyze the hoodie image and provide a detailed JSON response with:
1. "placement": Exact placement description (e.g., "center of chest, 3 inches below collar")
2. "size": Recommended logo size in inches or as percentage of hoodie width
3. "color": Primary color to use (#7DF9FF)
4. "coordinates": Approximate placement as percentages (top: X%, left: Y%, width: W%, height: H%)
5. "colorContrast": How well the neon cyan will contrast with this hoodie color
6. "notes": Any additional design considerations or recommendations
7. "alternativePlacements": 1-2 alternative placement options if applicable

Format your response as valid JSON only, no markdown formatting.
`

    const imagePart = {
      inlineData: {
        data: imageData,
        mimeType: mimeType,
      },
    }

    const result = await model.generateContent([prompt, imagePart])
    const response = await result.response
    const text = response.text()
    
    // Try to extract JSON from response
    let jsonData
    try {
      // Remove markdown code blocks if present
      const jsonText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
      jsonData = JSON.parse(jsonText)
    } catch (e) {
      // If not JSON, create structure from text
      jsonData = {
        description: text,
        placement: variant.placement,
        variant: variant.name,
      }
    }
    
    console.log(`✅ Generated design spec for ${variant.name}`)
    
    return {
      success: true,
      variant: variant.name,
      imageFile: path.basename(imagePath),
      designSpec: jsonData,
      rawResponse: text,
    }
  } catch (error) {
    console.error(`❌ Error generating design for ${variant.name}:`, error.message)
    return {
      success: false,
      variant: variant.name,
      imageFile: path.basename(imagePath),
      error: error.message,
    }
  }
}

/**
 * Main function
 */
async function main() {
  console.log('🏀 MH5 Hoodie Collection Designer v2')
  console.log('====================================\n')
  
  // Get all images from hoodie folder
  const files = fs.readdirSync(HOODIE_FOLDER)
    .filter(file => /\.(png|jpg|jpeg)$/i.test(file))
    .map(file => path.join(HOODIE_FOLDER, file))
    .slice(0, 3) // Process first 3 images for testing
  
  if (files.length === 0) {
    console.error('❌ No image files found in hoodie folder')
    process.exit(1)
  }
  
  console.log(`📸 Processing ${files.length} hoodie images`)
  console.log(`🎨 Creating ${DESIGN_VARIANTS.length} design variants for each image\n`)
  
  const allResults = []
  
  // Process each image
  for (const imageFile of files) {
    console.log(`\n📷 Processing: ${path.basename(imageFile)}`)
    
    const imageResults = []
    
    // Generate designs for each variant
    for (const variant of DESIGN_VARIANTS) {
      const result = await generateDesignSpec(imageFile, variant)
      imageResults.push(result)
      
      // Delay between requests to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 3000))
    }
    
    allResults.push({
      image: path.basename(imageFile),
      variants: imageResults,
    })
  }
  
  // Save results
  const resultsFile = path.join(OUTPUT_FOLDER, 'design-specs.json')
  fs.writeFileSync(resultsFile, JSON.stringify(allResults, null, 2))
  
  console.log('\n\n✅ Design generation complete!')
  console.log(`📁 Results saved to: ${resultsFile}`)
  console.log(`\n📊 Summary:`)
  console.log(`   - Images processed: ${files.length}`)
  console.log(`   - Variants per image: ${DESIGN_VARIANTS.length}`)
  console.log(`   - Total designs: ${files.length * DESIGN_VARIANTS.length}`)
}

// Run the script
main().catch(console.error)

