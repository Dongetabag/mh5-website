#!/usr/bin/env node

/**
 * ORGANIZE MEDIA BY COLOR TAGS
 * =============================
 * Processes files from "new MH5 Media full folder" which is color-organized:
 * - Orange = Basketball
 * - Blue = Events/Club Hosting
 * - Purple = Brand Campaigns
 * 
 * Since we can't read Finder tags directly, we'll:
 * 1. Process files from the new folder (color-organized source)
 * 2. Use file patterns to categorize
 * 3. Remove duplicates
 * 4. Clean up the folder structure
 */

const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const { execSync } = require('child_process')

const SOURCE_DIR = path.join(__dirname, '../Milan Mh5 Media')
const COLOR_ORGANIZED_DIR = path.join(SOURCE_DIR, 'new MH5 Media full folder')
const PUBLIC_DIR = path.join(__dirname, '../public')

// Known basketball files (orange tags)
const BASKETBALL_FILES = [
  '123_1', 'IMG_2493', 'IMG_5504',
  '09C7861A-0733-4818-B9AF-077EC300A440',
  '1DCFE9D5-F638-4842-A9D6-793DB9350066',
  '2516F603-3659-4D99-A163-D276CFF02C2F',
  '278543FD-E8F1-48C4-B12D-F5014265F665',
  '342A3669-0A8F-4616-89F2-89B1C8B3DDF5',
  '26e44d220245495a8a592c0002ace524',
  '67df5ad85df7404a81f2d6e311e19d8c',
  '13f27e29c219419d852eac4f5ef134dd',
  '6536a9824ab348f29c26ce57c181f307',
  '69722150427940f68a4a967b2ba80576',
  '6f40c6f056194535a398d54f76c6f2da'
]

// Known brand campaign files (purple tags)
const BRAND_CAMPAIGN_FILES = [
  'B0CACDEC-BE6E-4435-A8AF-523237E9974A',
  'A8A2681C-EE12-4329-B186-53D5C364CA5B',
  'A1905360-DC17-4045-A863-A0E4BAFE6DD2',
  '69F59DD8-E162-4731-B2C3-4FE2654F2948',
  '37f8ca3c904745f7a7c16d2da3e44b5c',
  '90d1467329ec4a3dac3a8658cba48dd8'
]

// Clean filename
function cleanFilename(filename) {
  return filename
    .replace(/\.(MOV|mov)\.mov$/i, '.MOV')
    .replace(/\.(HEIC|heic)\.heic$/i, '.HEIC')
    .replace(/\.(JPG|jpg|JPEG|jpeg)\.(heic|jpg|jpeg)$/i, (match, p1) => {
      if (p1.match(/^HEIC$/i)) return '.HEIC'
      if (p1.match(/^JPG$/i)) return '.JPG'
      if (p1.match(/^JPEG$/i)) return '.JPEG'
      return match
    })
    .replace(/ copy/i, '')
    .replace(/ copy\./i, '.')
}

// Get file hash
function getFileHash(filePath) {
  try {
    const fileBuffer = fs.readFileSync(filePath)
    return crypto.createHash('md5').update(fileBuffer).digest('hex')
  } catch {
    return null
  }
}

// Determine category
function determineCategory(filename) {
  const upperName = filename.toUpperCase().replace(/\.[^.]+$/, '')
  
  // Check basketball
  if (BASKETBALL_FILES.some(f => upperName.includes(f.toUpperCase()))) {
    return 'basketball'
  }
  
  // Check brand campaigns
  if (BRAND_CAMPAIGN_FILES.some(f => upperName.includes(f.toUpperCase()))) {
    return 'brand-campaigns'
  }
  
  // Filtered videos = social
  if (upperName.includes('FILTERED')) {
    return 'social'
  }
  
  // IMG_ pattern - check if known basketball
  if (upperName.match(/^IMG_2493|^IMG_5504/)) {
    return 'basketball'
  }
  
  // Default to events
  return 'events'
}

// Convert HEIC to JPG
function convertHEICtoJPG(sourcePath, destPath) {
  try {
    const destDir = path.dirname(destPath)
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true })
    }
    execSync(`sips -s format jpeg "${sourcePath}" --out "${destPath}" --resampleHeightWidthMax 1920`, {
      stdio: 'ignore'
    })
    return true
  } catch {
    return false
  }
}

// Main processing
console.log('\n🎨 ORGANIZING MEDIA BY COLOR TAGS\n')
console.log('='.repeat(60))

if (!fs.existsSync(COLOR_ORGANIZED_DIR)) {
  console.log(`❌ Color-organized folder not found: ${COLOR_ORGANIZED_DIR}`)
  process.exit(1)
}

const files = fs.readdirSync(COLOR_ORGANIZED_DIR)
const processed = { basketball: 0, events: 0, 'brand-campaigns': 0, social: 0, duplicates: 0, errors: 0 }
const fileHashes = new Map()
const filesInPublic = new Set()

// Build set of files already in public (by hash)
function scanPublicFolder(dir, category, isVideo) {
  if (!fs.existsSync(dir)) return
  const files = fs.readdirSync(dir)
  files.forEach(file => {
    const filePath = path.join(dir, file)
    if (fs.statSync(filePath).isFile()) {
      const hash = getFileHash(filePath)
      if (hash) filesInPublic.add(hash)
    }
  })
}

// Scan all public files
scanPublicFolder(path.join(PUBLIC_DIR, 'images/basketball'), 'basketball', false)
scanPublicFolder(path.join(PUBLIC_DIR, 'images/events'), 'events', false)
scanPublicFolder(path.join(PUBLIC_DIR, 'images/brand-campaigns'), 'brand-campaigns', false)
scanPublicFolder(path.join(PUBLIC_DIR, 'videos/basketball'), 'basketball', true)
scanPublicFolder(path.join(PUBLIC_DIR, 'videos/events'), 'events', true)
scanPublicFolder(path.join(PUBLIC_DIR, 'videos/brand-campaigns'), 'brand-campaigns', true)
scanPublicFolder(path.join(PUBLIC_DIR, 'videos/social'), 'social', true)

console.log(`\nProcessing ${files.length} files from color-organized folder...\n`)

files.forEach(file => {
  const filePath = path.join(COLOR_ORGANIZED_DIR, file)
  if (!fs.statSync(filePath).isFile()) return
  
  const ext = path.extname(file).toLowerCase()
  if (!['.jpg', '.jpeg', '.heic', '.mov', '.mp4'].includes(ext)) return
  
  const cleanedName = cleanFilename(file)
  const baseName = path.basename(cleanedName, path.extname(cleanedName))
  const isVideo = ['.mov', '.mp4'].includes(ext)
  const isPhoto = ['.jpg', '.jpeg', '.heic'].includes(ext)
  
  if (!isVideo && !isPhoto) return
  
  // Get hash
  const hash = getFileHash(filePath)
  if (!hash) {
    processed.errors++
    return
  }
  
  // Check for duplicates
  if (filesInPublic.has(hash)) {
    console.log(`⏭️  Duplicate: ${cleanedName}`)
    processed.duplicates++
    // Delete from source
    try {
      fs.unlinkSync(filePath)
    } catch {}
    return
  }
  
  filesInPublic.add(hash)
  
  // Determine category
  const category = determineCategory(cleanedName)
  
  // Determine destination
  let destPath
  let finalName = cleanedName
  
  if (isVideo) {
    destPath = path.join(PUBLIC_DIR, 'videos', category, cleanedName)
  } else {
    if (ext === '.heic') {
      finalName = `${baseName}.jpg`
      destPath = path.join(PUBLIC_DIR, 'images', category, finalName)
    } else {
      destPath = path.join(PUBLIC_DIR, 'images', category, cleanedName)
    }
  }
  
  // Skip if exists
  if (fs.existsSync(destPath)) {
    processed.duplicates++
    try {
      fs.unlinkSync(filePath)
    } catch {}
    return
  }
  
  // Copy/convert
  try {
    const destDir = path.dirname(destPath)
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true })
    }
    
    if (ext === '.heic') {
      if (convertHEICtoJPG(filePath, destPath)) {
        console.log(`✅ ${category}: ${finalName}`)
        processed[category]++
        fs.unlinkSync(filePath)
      } else {
        processed.errors++
      }
    } else {
      fs.copyFileSync(filePath, destPath)
      console.log(`✅ ${category}: ${finalName}`)
      processed[category]++
      fs.unlinkSync(filePath)
    }
  } catch (error) {
    console.error(`❌ Error: ${cleanedName}`, error.message)
    processed.errors++
  }
})

console.log('\n' + '='.repeat(60))
console.log('\n📊 ORGANIZATION SUMMARY\n')
console.log(`✅ Basketball (Orange): ${processed.basketball}`)
console.log(`✅ Events/Club Hosting (Blue): ${processed.events}`)
console.log(`✅ Brand Campaigns (Purple): ${processed['brand-campaigns']}`)
console.log(`✅ Social: ${processed.social}`)
console.log(`⏭️  Duplicates removed: ${processed.duplicates}`)
console.log(`❌ Errors: ${processed.errors}`)

// Clean up empty folders
try {
  if (fs.existsSync(COLOR_ORGANIZED_DIR)) {
    const remaining = fs.readdirSync(COLOR_ORGANIZED_DIR)
    if (remaining.length === 0) {
      fs.rmdirSync(COLOR_ORGANIZED_DIR)
      console.log(`\n🗑️  Removed empty folder: new MH5 Media full folder`)
    }
  }
} catch {}

console.log(`\n✅ Media organization complete!\n`)



