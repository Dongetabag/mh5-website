#!/usr/bin/env node

/**
 * MEDIA IMPORT SCRIPT
 * ===================
 * Organizes, converts, and imports media from Milan Mh5 Media folder
 * - Converts HEIC to JPG
 * - Resizes images for web optimization
 * - Converts MOV to MP4
 * - Organizes by category
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

const SOURCE_DIR = path.join(__dirname, '../Milan Mh5 Media')
const PUBLIC_DIR = path.join(__dirname, '../public')

// Category mappings based on inventory
const PHOTO_CATEGORIES = {
  basketball: [
    '123_1.JPEG', 'IMG_2493.JPG', 'IMG_5504.JPG',
    '09C7861A-0733-4818-B9AF-077EC300A440.JPG',
    '1DCFE9D5-F638-4842-A9D6-793DB9350066.JPG',
    '2516F603-3659-4D99-A163-D276CFF02C2F.JPG',
    '278543FD-E8F1-48C4-B12D-F5014265F665.JPG',
    '342A3669-0A8F-4616-89F2-89B1C8B3DDF5.JPG'
  ],
  events: [
    'IMG_1424.HEIC', 'IMG_2428.HEIC', 'IMG_2482.HEIC',
    '82FBC6C8-B341-4FDA-92EB-DB88748EED98.JPG',
    '856B54AD-FCA3-4477-B871-A9D03CB7B1F3.JPG',
    '88BE14ED-B9D6-460B-BDA3-D892F086EDC4.JPG',
    '95A0BBC3-F879-4FEC-AA09-B1683ECF65B2.JPG',
    '4430EAE3-2CD3-4285-9892-9494FA6EE94F.JPG',
    '3AFC5E5E-A1FA-4E30-9D2B-6263B98B922C.JPG',
    '3B027662-DE3B-4A1B-8441-8412D0215E16.JPG',
    'C8593DE0-E4F4-4BBA-A145-B5318AB30E90.JPG',
    'DBAEFDA8-FB32-499C-BF46-4B55DCAEC8C6.JPG',
    'e0857ff9-f9da-4a3d-9d21-4f538c744511.JPG',
    '898f9a5d-4f08-4e70-b654-ae4cce89e350.JPG',
    'BE564DC8-2241-4DC9-969F-8CA7F99D25AE.HEIC',
    'IMG_3457.HEIC', 'IMG_4847.HEIC', 'IMG_5432.HEIC'
  ],
  'brand-campaigns': [
    'B0CACDEC-BE6E-4435-A8AF-523237E9974A.JPG',
    'A8A2681C-EE12-4329-B186-53D5C364CA5B.JPG',
    'A1905360-DC17-4045-A863-A0E4BAFE6DD2.JPG',
    '69F59DD8-E162-4731-B2C3-4FE2654F2948.JPEG'
  ],
  'media-flyers': [
    'MHF.HEIC',
    '92C52557-B021-428B-A18B-476A08F37D37.JPG',
    '92C52557-B021-428B-A18B-476A08F37D37 2.JPG'
  ]
}

const VIDEO_CATEGORIES = {
  basketball: [
    '26e44d220245495a8a592c0002ace524.MOV',
    '67df5ad85df7404a81f2d6e311e19d8c.MOV',
    '13f27e29c219419d852eac4f5ef134dd.MOV',
    '6536a9824ab348f29c26ce57c181f307.MOV',
    '69722150427940f68a4a967b2ba80576.MOV',
    '6f40c6f056194535a398d54f76c6f2da.MOV'
  ],
  events: [
    '9f90e8aa68434121b10f738f483e53f2.MOV',
    '5893e5fd7bfc44d6a422765f2277d665.MOV',
    '5089b366326446a49925a5305985a148.MOV',
    'd478bfa5726949438ca2f506c332a6bc.MOV',
    '37f8ca3c904745f7a7c16d2da3e44b5c.MOV',
    '90d1467329ec4a3dac3a8658cba48dd8.MOV',
    'F6401E28-2949-4092-BDFF-98C11CA5B439.MOV',
    '74c0f77d-1a1a-478d-9184-c71c2c1a88db.MOV'
  ],
  'brand-campaigns': [
    '37f8ca3c904745f7a7c16d2da3e44b5c.MOV',
    '90d1467329ec4a3dac3a8658cba48dd8.MOV'
  ],
  social: [
    'filtered-2F916CF0-0B8F-42E2-839A-B21C7B0D264C.MOV',
    'filtered-5A24BB8F-BE3D-4C29-8EBA-4571FA6DBF86.MOV'
  ]
}

function convertHEICtoJPG(sourcePath, destPath, width = 1920) {
  try {
    const destDir = path.dirname(destPath)
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true })
    }
    
    // Use sips to convert and resize
    execSync(`sips -s format jpeg "${sourcePath}" --out "${destPath}" --resampleHeightWidthMax ${width}`, {
      stdio: 'ignore'
    })
    console.log(`✅ Converted: ${path.basename(sourcePath)} -> ${path.basename(destPath)}`)
    return true
  } catch (error) {
    console.error(`❌ Failed to convert ${sourcePath}:`, error.message)
    return false
  }
}

function copyAndResizeJPG(sourcePath, destPath, width = 1920) {
  try {
    const destDir = path.dirname(destPath)
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true })
    }
    
    // Copy and resize using sips
    execSync(`sips -s format jpeg "${sourcePath}" --out "${destPath}" --resampleHeightWidthMax ${width}`, {
      stdio: 'ignore'
    })
    console.log(`✅ Processed: ${path.basename(sourcePath)}`)
    return true
  } catch (error) {
    // Fallback to simple copy
    fs.copyFileSync(sourcePath, destPath)
    console.log(`⚠️  Copied (no resize): ${path.basename(sourcePath)}`)
    return true
  }
}

function convertMOVtoMP4(sourcePath, destPath) {
  try {
    const destDir = path.dirname(destPath)
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true })
    }
    
    // Check if ffmpeg is available
    try {
      execSync('which ffmpeg', { stdio: 'ignore' })
      // Use ffmpeg for conversion
      execSync(`ffmpeg -i "${sourcePath}" -c:v libx264 -c:a aac -movflags +faststart "${destPath}" -y`, {
        stdio: 'ignore'
      })
      console.log(`✅ Converted video: ${path.basename(sourcePath)} -> ${path.basename(destPath)}`)
    } catch {
      // Fallback: just copy the MOV file (browsers can play MOV)
      fs.copyFileSync(sourcePath, destPath)
      console.log(`⚠️  Copied video (MOV format): ${path.basename(sourcePath)}`)
    }
    return true
  } catch (error) {
    console.error(`❌ Failed to process video ${sourcePath}:`, error.message)
    return false
  }
}

function sanitizeFilename(filename) {
  // Remove special characters, keep alphanumeric, dash, underscore
  return filename.replace(/[^a-zA-Z0-9._-]/g, '_').toLowerCase()
}

// Process photos
console.log('\n📸 Processing Photos...\n')
Object.entries(PHOTO_CATEGORIES).forEach(([category, files]) => {
  const destDir = path.join(PUBLIC_DIR, 'images', category)
  files.forEach((filename) => {
    const sourcePath = path.join(SOURCE_DIR, filename)
    if (!fs.existsSync(sourcePath)) {
      console.log(`⚠️  File not found: ${filename}`)
      return
    }
    
    const ext = path.extname(filename).toLowerCase()
    const baseName = path.basename(filename, ext)
    const sanitized = sanitizeFilename(baseName)
    
    let destPath
    if (ext === '.heic' || ext === '.HEIC') {
      destPath = path.join(destDir, `${sanitized}.jpg`)
      convertHEICtoJPG(sourcePath, destPath)
    } else {
      destPath = path.join(destDir, `${sanitized}${ext.toLowerCase()}`)
      copyAndResizeJPG(sourcePath, destPath)
    }
  })
})

// Process videos
console.log('\n🎥 Processing Videos...\n')
Object.entries(VIDEO_CATEGORIES).forEach(([category, files]) => {
  const destDir = path.join(PUBLIC_DIR, 'videos', category)
  files.forEach((filename) => {
    const sourcePath = path.join(SOURCE_DIR, filename)
    if (!fs.existsSync(sourcePath)) {
      console.log(`⚠️  File not found: ${filename}`)
      return
    }
    
    const baseName = path.basename(filename, path.extname(filename))
    const sanitized = sanitizeFilename(baseName)
    const destPath = path.join(destDir, `${sanitized}.mp4`)
    
    convertMOVtoMP4(sourcePath, destPath)
  })
})

console.log('\n✅ Media import complete!\n')



