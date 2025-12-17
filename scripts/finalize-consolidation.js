#!/usr/bin/env node

/**
 * FINALIZE MEDIA CONSOLIDATION
 * =============================
 * Processes remaining files and ensures everything is properly organized
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

const SOURCE_DIR = path.join(__dirname, '../Milan Mh5 Media')
const PUBLIC_DIR = path.join(__dirname, '../public')

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

console.log('\n🎯 FINALIZING MEDIA CONSOLIDATION\n')
console.log('='.repeat(60))

// Process remaining HEIC files
const remainingFiles = fs.readdirSync(SOURCE_DIR).filter(f => {
  const filePath = path.join(SOURCE_DIR, f)
  return fs.statSync(filePath).isFile() && f.toUpperCase().endsWith('.HEIC')
})

console.log(`\nProcessing ${remainingFiles.length} remaining HEIC files...\n`)

const processed = { converted: 0, skipped: 0, errors: 0 }

remainingFiles.forEach(file => {
  const filePath = path.join(SOURCE_DIR, file)
  const baseName = path.basename(file, '.HEIC')
  
  // Determine category based on filename
  let category = 'events' // default
  if (file.includes('MHF')) {
    category = 'media-flyers'
  } else if (['IMG_1424', 'IMG_2482', 'IMG_3457', 'IMG_4847', 'IMG_5432'].some(p => file.includes(p))) {
    category = 'events'
  } else if (file.includes('BE564DC8')) {
    category = 'events'
  }
  
  const destPath = path.join(PUBLIC_DIR, 'images', category, `${baseName}.jpg`)
  
  // Check if already exists
  if (fs.existsSync(destPath)) {
    console.log(`⏭️  Already exists: ${category}/${baseName}.jpg`)
    processed.skipped++
    // Remove source file
    try {
      fs.unlinkSync(filePath)
    } catch {}
    return
  }
  
  // Convert
  if (convertHEICtoJPG(filePath, destPath)) {
    console.log(`✅ Converted: ${category}/${baseName}.jpg`)
    processed.converted++
    // Remove source file after successful conversion
    try {
      fs.unlinkSync(filePath)
    } catch {}
  } else {
    processed.errors++
  }
})

console.log('\n' + '='.repeat(60))
console.log('\n📊 FINALIZATION SUMMARY\n')
console.log(`✅ Files converted: ${processed.converted}`)
console.log(`⏭️  Files skipped (exists): ${processed.skipped}`)
console.log(`❌ Errors: ${processed.errors}`)

// Check for any remaining files
const allRemaining = fs.readdirSync(SOURCE_DIR).filter(f => {
  const filePath = path.join(SOURCE_DIR, f)
  return fs.statSync(filePath).isFile() && 
    ['.jpg', '.jpeg', '.heic', '.mov', '.mp4'].includes(path.extname(f).toLowerCase())
})

if (allRemaining.length > 0) {
  console.log(`\n⚠️  ${allRemaining.length} files still in source folder:`)
  allRemaining.forEach(f => console.log(`   - ${f}`))
} else {
  console.log(`\n✅ Source folder cleaned! All files consolidated.`)
}

console.log(`\n✅ Finalization complete!\n`)



