#!/usr/bin/env node

/**
 * CONSOLIDATE MEDIA BY COLOR TAGS
 * ================================
 * Organizes media based on color tags:
 * - Orange = Basketball
 * - Blue = Club Hosting (Events)
 * - Purple = Past Campaigns (Brand Campaigns)
 * 
 * Also removes duplicates and consolidates folders
 */

const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const { execSync } = require('child_process')

const SOURCE_DIR = path.join(__dirname, '../Milan Mh5 Media')
const PUBLIC_DIR = path.join(__dirname, '../public')

// Color mapping based on user's organization
// Note: macOS Finder tags aren't directly readable, so we'll use file analysis
// Orange files = Basketball
// Blue files = Events/Club Hosting  
// Purple files = Brand Campaigns

// Known basketball files (based on previous audit)
const BASKETBALL_FILES = [
  '123_1.JPEG', 'IMG_2493.JPG', 'IMG_5504.JPG',
  '09C7861A-0733-4818-B9AF-077EC300A440.JPG',
  '1DCFE9D5-F638-4842-A9D6-793DB9350066.JPG',
  '2516F603-3659-4D99-A163-D276CFF02C2F.JPG',
  '278543FD-E8F1-48C4-B12D-F5014265F665.JPG',
  '342A3669-0A8F-4616-89F2-89B1C8B3DDF5.JPG',
  '26e44d220245495a8a592c0002ace524.MOV',
  '67df5ad85df7404a81f2d6e311e19d8c.MOV',
  '13f27e29c219419d852eac4f5ef134dd.MOV',
  '6536a9824ab348f29c26ce57c181f307.MOV',
  '69722150427940f68a4a967b2ba80576.MOV',
  '6f40c6f056194535a398d54f76c6f2da.MOV'
]

// Known brand campaign files (purple)
const BRAND_CAMPAIGN_FILES = [
  'B0CACDEC-BE6E-4435-A8AF-523237E9974A.JPG',
  'A8A2681C-EE12-4329-B186-53D5C364CA5B.JPG',
  'A1905360-DC17-4045-A863-A0E4BAFE6DD2.JPG',
  '69F59DD8-E162-4731-B2C3-4FE2654F2948.JPEG',
  '37f8ca3c904745f7a7c16d2da3e44b5c.MOV',
  '90d1467329ec4a3dac3a8658cba48dd8.MOV'
]

// Calculate file hash for duplicate detection
function getFileHash(filePath) {
  try {
    const fileBuffer = fs.readFileSync(filePath)
    return crypto.createHash('md5').update(fileBuffer).digest('hex')
  } catch (error) {
    return null
  }
}

// Clean filename (remove duplicate extensions)
function cleanFilename(filename) {
  // Remove duplicate extensions like .MOV.mov, .HEIC.heic
  let cleaned = filename
    .replace(/\.(MOV|mov)\.mov$/i, '.MOV')
    .replace(/\.(HEIC|heic|JPG|jpg|JPEG|jpeg)\.(heic|jpg|jpeg)$/i, (match, p1) => {
      if (p1.match(/^HEIC$/i)) return '.HEIC'
      if (p1.match(/^JPG$/i)) return '.JPG'
      if (p1.match(/^JPEG$/i)) return '.JPEG'
      return match
    })
    .replace(/ copy/i, '')
    .replace(/ copy\./i, '.')
  
  return cleaned
}

// Determine category based on filename patterns
function determineCategory(filename, baseName) {
  const upperName = filename.toUpperCase()
  const upperBase = baseName.toUpperCase()
  
  // Check if it's a known basketball file
  if (BASKETBALL_FILES.some(f => upperName.includes(f.toUpperCase().replace(/\.(MOV|JPG|JPEG)$/, '')))) {
    return 'basketball'
  }
  
  // Check if it's a known brand campaign file
  if (BRAND_CAMPAIGN_FILES.some(f => upperName.includes(f.toUpperCase().replace(/\.(MOV|JPG|JPEG)$/, '')))) {
    return 'brand-campaigns'
  }
  
  // Check for filtered videos (social media)
  if (upperName.includes('FILTERED')) {
    return 'social'
  }
  
  // Check for IMG_ pattern (usually events, but could be basketball)
  if (upperName.match(/^IMG_\d+/)) {
    // If it's a known basketball IMG file, categorize as basketball
    if (['IMG_2493', 'IMG_5504'].some(p => upperBase.includes(p))) {
      return 'basketball'
    }
    // Otherwise default to events
    return 'events'
  }
  
  // UUID pattern files - check if known
  if (upperName.match(/^[A-F0-9]{8}-[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{12}/)) {
    // Check if it's a known brand campaign UUID
    if (BRAND_CAMPAIGN_FILES.some(f => upperName.includes(f.split('.')[0].toUpperCase()))) {
      return 'brand-campaigns'
    }
    // Check if it's a known basketball UUID
    if (BASKETBALL_FILES.some(f => upperName.includes(f.split('.')[0].toUpperCase()))) {
      return 'basketball'
    }
    // Default to events for UUID files
    return 'events'
  }
  
  // Hash pattern files (32 char hex) - usually events
  if (upperName.match(/^[a-f0-9]{32}\./i)) {
    return 'events'
  }
  
  // Default to events if uncertain
  return 'events'
}

// Convert HEIC to JPG
function convertHEICtoJPG(sourcePath, destPath, width = 1920) {
  try {
    const destDir = path.dirname(destPath)
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true })
    }
    
    execSync(`sips -s format jpeg "${sourcePath}" --out "${destPath}" --resampleHeightWidthMax ${width}`, {
      stdio: 'ignore'
    })
    return true
  } catch (error) {
    console.error(`❌ Failed to convert ${sourcePath}:`, error.message)
    return false
  }
}

// Process all files
function consolidateMedia() {
  console.log('\n🎨 CONSOLIDATING MEDIA BY COLOR TAGS\n')
  console.log('='.repeat(60))
  
  const fileHashes = new Map() // Track file hashes to detect duplicates
  const processed = { basketball: 0, events: 0, 'brand-campaigns': 0, social: 0, duplicates: 0, errors: 0 }
  
  // Get all media files from all subdirectories
  function getAllMediaFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir)
    
    files.forEach(file => {
      const filePath = path.join(dir, file)
      const stat = fs.statSync(filePath)
      
      if (stat.isDirectory()) {
        // Recursively check subdirectories
        getAllMediaFiles(filePath, fileList)
      } else {
        const ext = path.extname(file).toLowerCase()
        if (['.jpg', '.jpeg', '.heic', '.mov', '.mp4'].includes(ext)) {
          fileList.push(filePath)
        }
      }
    })
    
    return fileList
  }
  
  const allFiles = getAllMediaFiles(SOURCE_DIR)
  console.log(`\nFound ${allFiles.length} media files to process\n`)
  
  allFiles.forEach((filePath, index) => {
    const originalName = path.basename(filePath)
    const cleanedName = cleanFilename(originalName)
    const baseName = path.basename(cleanedName, path.extname(cleanedName))
    const ext = path.extname(cleanedName).toLowerCase()
    
    const isVideo = ['.mov', '.mp4'].includes(ext)
    const isPhoto = ['.jpg', '.jpeg', '.heic'].includes(ext)
    
    if (!isVideo && !isPhoto) return
    
    // Get file hash for duplicate detection
    const fileHash = getFileHash(filePath)
    if (!fileHash) {
      processed.errors++
      return
    }
    
    // Determine category
    const category = determineCategory(cleanedName, baseName)
    
    // Check for duplicates
    if (fileHashes.has(fileHash)) {
      console.log(`⏭️  Duplicate: ${cleanedName} (same as ${fileHashes.get(fileHash)})`)
      processed.duplicates++
      return
    }
    
    fileHashes.set(fileHash, cleanedName)
    
    // Determine destination
    let destPath
    let finalName = cleanedName
    
    if (isVideo) {
      // Keep MOV extension for videos
      destPath = path.join(PUBLIC_DIR, 'videos', category, cleanedName)
    } else {
      // Handle HEIC conversion
      if (ext === '.heic') {
        finalName = `${baseName}.jpg`
        destPath = path.join(PUBLIC_DIR, 'images', category, finalName)
      } else {
        destPath = path.join(PUBLIC_DIR, 'images', category, cleanedName)
      }
    }
    
    // Skip if already exists
    if (fs.existsSync(destPath)) {
      console.log(`⏭️  Exists: ${category}/${finalName}`)
      return
    }
    
    // Copy or convert file
    try {
      const destDir = path.dirname(destPath)
      if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true })
      }
      
      if (ext === '.heic') {
        if (convertHEICtoJPG(filePath, destPath)) {
          console.log(`✅ ${category}: ${finalName}`)
          processed[category]++
        } else {
          processed.errors++
        }
      } else {
        fs.copyFileSync(filePath, destPath)
        console.log(`✅ ${category}: ${finalName}`)
        processed[category]++
      }
    } catch (error) {
      console.error(`❌ Error processing ${cleanedName}:`, error.message)
      processed.errors++
    }
  })
  
  console.log('\n' + '='.repeat(60))
  console.log('\n📊 CONSOLIDATION SUMMARY\n')
  console.log(`✅ Basketball files: ${processed.basketball}`)
  console.log(`✅ Events/Club Hosting files: ${processed.events}`)
  console.log(`✅ Brand Campaign files: ${processed['brand-campaigns']}`)
  console.log(`✅ Social files: ${processed.social}`)
  console.log(`⏭️  Duplicates removed: ${processed.duplicates}`)
  console.log(`❌ Errors: ${processed.errors}`)
  console.log(`\n✅ Media consolidation complete!\n`)
}

// Run consolidation
consolidateMedia()



