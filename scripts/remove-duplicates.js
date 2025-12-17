#!/usr/bin/env node

/**
 * REMOVE DUPLICATES FROM SOURCE FOLDER
 * =====================================
 * After consolidating to public/, removes duplicate files from source folders
 */

const fs = require('fs')
const path = require('path')
const crypto = require('crypto')

const SOURCE_DIR = path.join(__dirname, '../Milan Mh5 Media')
const PUBLIC_DIR = path.join(__dirname, '../public')

function getFileHash(filePath) {
  try {
    const fileBuffer = fs.readFileSync(filePath)
    return crypto.createHash('md5').update(fileBuffer).digest('hex')
  } catch (error) {
    return null
  }
}

function getAllFiles(dir) {
  const files = []
  if (!fs.existsSync(dir)) return files
  
  const items = fs.readdirSync(dir)
  items.forEach(item => {
    const itemPath = path.join(dir, item)
    const stat = fs.statSync(itemPath)
    
    if (stat.isDirectory() && item !== 'MH5 Media' && !item.includes('new MH5 Media')) {
      // Skip old nested folders, process new folder
      const subFiles = getAllFiles(itemPath)
      files.push(...subFiles)
    } else if (stat.isFile()) {
      const ext = path.extname(item).toLowerCase()
      if (['.jpg', '.jpeg', '.heic', '.mov', '.mp4'].includes(ext)) {
        files.push(itemPath)
      }
    }
  })
  
  return files
}

function checkFileInPublic(filePath) {
  const fileName = path.basename(filePath)
  const ext = path.extname(fileName).toLowerCase()
  const baseName = path.basename(fileName, ext)
  
  // Clean filename
  let cleanName = fileName
    .replace(/\.(MOV|mov)\.mov$/i, '.MOV')
    .replace(/\.(HEIC|heic|JPG|jpg|JPEG|jpeg)\.(heic|jpg|jpeg)$/i, (match, p1) => {
      if (p1.match(/^HEIC$/i)) return '.HEIC'
      if (p1.match(/^JPG$/i)) return '.JPG'
      if (p1.match(/^JPEG$/i)) return '.JPEG'
      return match
    })
  
  const isVideo = ['.mov', '.mp4'].includes(ext)
  const isPhoto = ['.jpg', '.jpeg', '.heic'].includes(ext)
  
  if (isVideo) {
    // Check in videos folder
    const categories = ['basketball', 'events', 'social', 'brand-campaigns']
    for (const cat of categories) {
      const checkPath = path.join(PUBLIC_DIR, 'videos', cat, cleanName)
      if (fs.existsSync(checkPath)) return true
      // Also check with .MOV extension
      if (!cleanName.endsWith('.MOV')) {
        const movPath = path.join(PUBLIC_DIR, 'videos', cat, cleanName.replace(/\.mov$/i, '.MOV'))
        if (fs.existsSync(movPath)) return true
      }
    }
  } else if (isPhoto) {
    // Check in images folder
    const categories = ['basketball', 'events', 'brand-campaigns', 'media-flyers']
    for (const cat of categories) {
      let checkPath
      if (ext === '.heic') {
        checkPath = path.join(PUBLIC_DIR, 'images', cat, `${baseName}.jpg`)
      } else {
        checkPath = path.join(PUBLIC_DIR, 'images', cat, cleanName)
      }
      if (fs.existsSync(checkPath)) return true
    }
  }
  
  return false
}

console.log('\n🗑️  REMOVING DUPLICATES FROM SOURCE FOLDER\n')
console.log('='.repeat(60))

const allSourceFiles = getAllFiles(SOURCE_DIR)
console.log(`\nChecking ${allSourceFiles.length} files in source folder...\n`)

let removed = 0
let kept = 0

allSourceFiles.forEach(filePath => {
  const fileName = path.basename(filePath)
  
  // Check if file exists in public folder (means it's been consolidated)
  if (checkFileInPublic(filePath)) {
    try {
      fs.unlinkSync(filePath)
      console.log(`🗑️  Removed: ${fileName}`)
      removed++
    } catch (error) {
      console.error(`❌ Error removing ${fileName}:`, error.message)
    }
  } else {
    kept++
  }
})

console.log('\n' + '='.repeat(60))
console.log('\n📊 CLEANUP SUMMARY\n')
console.log(`🗑️  Files removed: ${removed}`)
console.log(`✅ Files kept: ${kept}`)
console.log(`\n✅ Duplicate removal complete!\n`)



