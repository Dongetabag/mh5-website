/**
 * MH5 Website Media Report Generator
 * ===================================
 * Analyzes media usage across the website to identify:
 * - Duplicate images/videos
 * - Unused media files
 * - Missing media references
 * - Media-to-description mismatches
 *
 * Usage: npx ts-node scripts/report-generator.ts
 */

import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

interface MediaReference {
  file: string
  line: number
  path: string
  context: string
  description?: string
}

interface MediaFile {
  path: string
  relativePath: string
  size: number
  type: 'image' | 'video'
  category: string
}

interface Report {
  timestamp: string
  summary: {
    totalMediaFiles: number
    totalImages: number
    totalVideos: number
    referencedFiles: number
    unreferencedFiles: number
    duplicateUsages: number
    missingFiles: number
  }
  duplicates: {
    path: string
    usageCount: number
    usedIn: MediaReference[]
  }[]
  unreferenced: MediaFile[]
  missing: MediaReference[]
  mediaByCategory: Record<string, MediaFile[]>
  usageMap: Record<string, MediaReference[]>
}

const ROOT_DIR = path.join(__dirname, '..')
const PUBLIC_DIR = path.join(ROOT_DIR, 'public')
const SRC_DIR = path.join(ROOT_DIR, 'src')

// Collect all media files from public directory
function collectMediaFiles(): MediaFile[] {
  const mediaFiles: MediaFile[] = []

  function scanDir(dir: string, type: 'image' | 'video') {
    if (!fs.existsSync(dir)) return

    const items = fs.readdirSync(dir, { withFileTypes: true })

    for (const item of items) {
      if (item.name.startsWith('.')) continue

      const fullPath = path.join(dir, item.name)

      if (item.isDirectory()) {
        scanDir(fullPath, type)
      } else {
        const ext = path.extname(item.name).toLowerCase()
        const validExts = type === 'image'
          ? ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg']
          : ['.mp4', '.mov', '.webm', '.avi']

        if (validExts.includes(ext)) {
          const stats = fs.statSync(fullPath)
          const relativePath = '/' + path.relative(PUBLIC_DIR, fullPath)
          const category = path.basename(path.dirname(fullPath))

          mediaFiles.push({
            path: fullPath,
            relativePath,
            size: stats.size,
            type,
            category
          })
        }
      }
    }
  }

  scanDir(path.join(PUBLIC_DIR, 'images'), 'image')
  scanDir(path.join(PUBLIC_DIR, 'videos'), 'video')

  return mediaFiles
}

// Find all media references in source files
function findMediaReferences(): MediaReference[] {
  const references: MediaReference[] = []
  const mediaPatterns = [
    /['"`](\/images\/[^'"`]+)['"`]/g,
    /['"`](\/videos\/[^'"`]+)['"`]/g,
    /src:\s*['"`](\/[^'"`]+\.(jpg|jpeg|png|gif|webp|mp4|mov|webm))['"`]/gi,
    /poster:\s*['"`](\/[^'"`]+\.(jpg|jpeg|png|gif|webp))['"`]/gi,
    /image:\s*['"`](\/[^'"`]+\.(jpg|jpeg|png|gif|webp))['"`]/gi,
    /backgroundImage:\s*['"`]url\(([^)]+)\)['"`]/gi
  ]

  function scanFile(filePath: string) {
    const content = fs.readFileSync(filePath, 'utf-8')
    const lines = content.split('\n')

    lines.forEach((line, index) => {
      for (const pattern of mediaPatterns) {
        pattern.lastIndex = 0
        let match
        while ((match = pattern.exec(line)) !== null) {
          const mediaPath = match[1]
          if (mediaPath && (mediaPath.startsWith('/images/') || mediaPath.startsWith('/videos/'))) {
            // Try to extract description/context
            let description = ''
            const titleMatch = line.match(/title:\s*['"`]([^'"`]+)['"`]/)
            const labelMatch = line.match(/label:\s*['"`]([^'"`]+)['"`]/)
            const altMatch = line.match(/alt:\s*['"`]([^'"`]+)['"`]/)

            if (titleMatch) description = titleMatch[1]
            else if (labelMatch) description = labelMatch[1]
            else if (altMatch) description = altMatch[1]

            // Get surrounding context (3 lines before and after)
            const startLine = Math.max(0, index - 3)
            const endLine = Math.min(lines.length - 1, index + 3)
            const context = lines.slice(startLine, endLine + 1).join('\n')

            references.push({
              file: path.relative(ROOT_DIR, filePath),
              line: index + 1,
              path: mediaPath,
              context,
              description
            })
          }
        }
      }
    })
  }

  function scanDir(dir: string) {
    if (!fs.existsSync(dir)) return

    const items = fs.readdirSync(dir, { withFileTypes: true })

    for (const item of items) {
      if (item.name.startsWith('.') || item.name === 'node_modules') continue

      const fullPath = path.join(dir, item.name)

      if (item.isDirectory()) {
        scanDir(fullPath)
      } else {
        const ext = path.extname(item.name).toLowerCase()
        if (['.tsx', '.ts', '.jsx', '.js'].includes(ext)) {
          scanFile(fullPath)
        }
      }
    }
  }

  scanDir(SRC_DIR)

  return references
}

// Generate the report
function generateReport(): Report {
  console.log('Collecting media files...')
  const mediaFiles = collectMediaFiles()

  console.log('Finding media references in source code...')
  const references = findMediaReferences()

  // Build usage map
  const usageMap: Record<string, MediaReference[]> = {}
  for (const ref of references) {
    if (!usageMap[ref.path]) {
      usageMap[ref.path] = []
    }
    usageMap[ref.path].push(ref)
  }

  // Find duplicates (media used more than once)
  const duplicates = Object.entries(usageMap)
    .filter(([_, refs]) => refs.length > 1)
    .map(([mediaPath, refs]) => ({
      path: mediaPath,
      usageCount: refs.length,
      usedIn: refs
    }))
    .sort((a, b) => b.usageCount - a.usageCount)

  // Find unreferenced media
  const referencedPaths = new Set(Object.keys(usageMap))
  const unreferenced = mediaFiles.filter(
    file => !referencedPaths.has(file.relativePath)
  )

  // Find missing media (referenced but doesn't exist)
  const existingPaths = new Set(mediaFiles.map(f => f.relativePath))
  const missing = references.filter(
    ref => !existingPaths.has(ref.path)
  )

  // Group media by category
  const mediaByCategory: Record<string, MediaFile[]> = {}
  for (const file of mediaFiles) {
    if (!mediaByCategory[file.category]) {
      mediaByCategory[file.category] = []
    }
    mediaByCategory[file.category].push(file)
  }

  return {
    timestamp: new Date().toISOString(),
    summary: {
      totalMediaFiles: mediaFiles.length,
      totalImages: mediaFiles.filter(f => f.type === 'image').length,
      totalVideos: mediaFiles.filter(f => f.type === 'video').length,
      referencedFiles: referencedPaths.size,
      unreferencedFiles: unreferenced.length,
      duplicateUsages: duplicates.length,
      missingFiles: missing.length
    },
    duplicates,
    unreferenced,
    missing,
    mediaByCategory,
    usageMap
  }
}

// Format file size
function formatSize(bytes: number): string {
  const units = ['B', 'KB', 'MB', 'GB']
  let size = bytes
  let unitIndex = 0
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024
    unitIndex++
  }
  return `${size.toFixed(1)} ${units[unitIndex]}`
}

// Print report to console
function printReport(report: Report) {
  console.log('\n' + '='.repeat(60))
  console.log('MH5 WEBSITE MEDIA REPORT')
  console.log('='.repeat(60))
  console.log(`Generated: ${report.timestamp}`)

  console.log('\n--- SUMMARY ---')
  console.log(`Total Media Files: ${report.summary.totalMediaFiles}`)
  console.log(`  - Images: ${report.summary.totalImages}`)
  console.log(`  - Videos: ${report.summary.totalVideos}`)
  console.log(`Referenced in Code: ${report.summary.referencedFiles}`)
  console.log(`Unreferenced Files: ${report.summary.unreferencedFiles}`)
  console.log(`Duplicate Usages: ${report.summary.duplicateUsages}`)
  console.log(`Missing Files: ${report.summary.missingFiles}`)

  if (report.duplicates.length > 0) {
    console.log('\n--- DUPLICATE MEDIA USAGE ---')
    console.log('(Same image/video used in multiple places)')
    for (const dup of report.duplicates) {
      console.log(`\n  ${dup.path} (used ${dup.usageCount}x)`)
      for (const ref of dup.usedIn) {
        console.log(`    - ${ref.file}:${ref.line}`)
        if (ref.description) {
          console.log(`      Description: "${ref.description}"`)
        }
      }
    }
  }

  if (report.missing.length > 0) {
    console.log('\n--- MISSING FILES ---')
    console.log('(Referenced in code but file not found)')
    for (const ref of report.missing) {
      console.log(`  ${ref.path}`)
      console.log(`    Referenced in: ${ref.file}:${ref.line}`)
    }
  }

  console.log('\n--- MEDIA BY CATEGORY ---')
  for (const [category, files] of Object.entries(report.mediaByCategory)) {
    const totalSize = files.reduce((sum, f) => sum + f.size, 0)
    console.log(`\n  ${category}: ${files.length} files (${formatSize(totalSize)})`)
  }

  if (report.unreferenced.length > 0) {
    console.log('\n--- UNREFERENCED FILES ---')
    console.log('(Files that exist but are not used in code)')
    for (const file of report.unreferenced.slice(0, 20)) {
      console.log(`  ${file.relativePath} (${formatSize(file.size)})`)
    }
    if (report.unreferenced.length > 20) {
      console.log(`  ... and ${report.unreferenced.length - 20} more`)
    }
  }

  console.log('\n' + '='.repeat(60))
}

// Save report to JSON file
function saveReport(report: Report) {
  const reportPath = path.join(ROOT_DIR, 'media-report.json')
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2))
  console.log(`\nFull report saved to: ${reportPath}`)
}

// Main execution
console.log('MH5 Media Report Generator')
console.log('-'.repeat(30))

const report = generateReport()
printReport(report)
saveReport(report)

// Exit with error code if there are issues
if (report.missing.length > 0) {
  console.log('\nWarning: Found missing media files!')
  process.exit(1)
}
