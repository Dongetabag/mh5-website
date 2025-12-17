#!/usr/bin/env node

/**
 * Test script to find available Gemini models
 */

const { GoogleGenerativeAI } = require('@google/generative-ai')

const API_KEY = 'AIzaSyAmOIJHGlsZdMYy1NJbbXTNAuB-Du0mrsc'
const genAI = new GoogleGenerativeAI(API_KEY)

async function testModels() {
  console.log('Testing available Gemini models...\n')
  
  const modelNames = [
    'gemini-pro',
    'gemini-1.5-pro',
    'gemini-1.5-flash',
    'gemini-2.0-flash-exp',
    'gemini-pro-vision',
  ]
  
  for (const modelName of modelNames) {
    try {
      console.log(`Testing: ${modelName}...`)
      const model = genAI.getGenerativeModel({ model: modelName })
      
      // Try a simple text generation
      const result = await model.generateContent('Say "hello" in one word')
      const response = await result.response
      const text = response.text()
      
      console.log(`✅ ${modelName} - Works! Response: ${text.substring(0, 50)}`)
    } catch (error) {
      console.log(`❌ ${modelName} - Error: ${error.message.substring(0, 80)}`)
    }
    
    await new Promise(resolve => setTimeout(resolve, 1000))
  }
}

testModels().catch(console.error)

