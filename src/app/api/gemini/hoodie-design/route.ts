import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

const API_KEY = process.env.GOOGLE_AI_API_KEY || ''
const genAI = new GoogleGenerativeAI(API_KEY)

/**
 * POST /api/gemini/hoodie-design
 * Generate hoodie design description using Google AI (Gemini)
 * 
 * Body:
 * - imageBase64: base64 encoded image
 * - variant: design variant name (classic-front, classic-back, etc.)
 */
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { imageBase64, variant = 'classic-front', mimeType = 'image/png' } = body

    if (!imageBase64) {
      return NextResponse.json(
        { error: 'Image data is required' },
        { status: 400 }
      )
    }

    // Design variant descriptions
    const variants: Record<string, { description: string; placement: string }> = {
      'classic-front': {
        description: 'MH5 logo on front chest, small and clean, centered',
        placement: 'front chest, centered, small size',
      },
      'classic-back': {
        description: 'Large MH5 logo on back, bold statement piece',
        placement: 'back center, large size, bold',
      },
      'minimal-corner': {
        description: 'Small MH5 logo on front left chest corner',
        placement: 'front left chest, small, subtle',
      },
      'oversized-back': {
        description: 'Oversized MH5 logo covering most of the back',
        placement: 'back, extra large, dominant',
      },
    }

    const selectedVariant = variants[variant] || variants['classic-front']

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' })

    const prompt = `
You are a professional graphic designer creating premium apparel designs for the MH5 brand.

PRODUCT IMAGE: This is a hoodie product photo from TapStitch that will be used for print-on-demand.

TASK: Analyze this hoodie image and provide detailed instructions for adding the MH5 logo with the following specifications:

LOGO DESIGN:
- Text: "MH5" in bold, modern sans-serif font
- Primary Color: Neon Cyan (#7DF9FF)
- Secondary Color: Frost (#9DFBFF) for accents if needed
- Style: Clean, minimal, premium aesthetic
- The logo should be clearly visible but tastefully integrated

DESIGN VARIANT: ${selectedVariant.description}
PLACEMENT: ${selectedVariant.placement}

REQUIREMENTS:
1. Provide exact placement coordinates or guidelines (e.g., "center of chest, 2 inches below collar")
2. Specify logo size relative to hoodie (e.g., "3 inches wide")
3. Describe how the neon cyan color will look on this hoodie color
4. Ensure the logo placement doesn't interfere with any existing design elements
5. Make sure the logo is positioned optimally for visual appeal
6. Consider the hoodie's color and suggest any adjustments needed

Return a detailed design specification in JSON format with:
- placement: exact placement description
- size: recommended logo size
- color: primary color to use
- coordinates: approximate placement (top, left, width, height percentages)
- notes: any additional design considerations

Be specific and detailed so a designer can implement this exactly.
`

    const imagePart = {
      inlineData: {
        data: imageBase64,
        mimeType: mimeType,
      },
    }

    const result = await model.generateContent([prompt, imagePart])
    const response = await result.response
    const text = response.text()

    return NextResponse.json({
      success: true,
      variant,
      designSpec: text,
      message: 'Design specification generated successfully',
    })
  } catch (error: any) {
    console.error('Gemini API error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to generate design',
      },
      { status: 500 }
    )
  }
}

