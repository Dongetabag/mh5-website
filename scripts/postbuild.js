#!/usr/bin/env node

/**
 * Postbuild script for Hostinger deployment
 * Copies public folder contents to standalone output directory
 */

const fs = require('fs');
const path = require('path');

const standaloneDir = path.join(__dirname, '..', '.next', 'standalone');
const publicDir = path.join(__dirname, '..', 'public');
const targetPublicDir = path.join(standaloneDir, 'public');

// Helper function to copy directory recursively
function copyDirSync(src, dest) {
  if (!fs.existsSync(src)) {
    console.log(`Source directory does not exist: ${src}`);
    return;
  }

  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

console.log('🚀 Running postbuild script for Hostinger...');

// Check if standalone directory exists
if (!fs.existsSync(standaloneDir)) {
  console.log('⚠️  Standalone directory not found. Skipping public folder copy.');
  process.exit(0);
}

// Copy public folder to standalone directory
console.log('📁 Copying public folder to standalone output...');
copyDirSync(publicDir, targetPublicDir);

// Also copy static folder from .next
const staticDir = path.join(__dirname, '..', '.next', 'static');
const targetStaticDir = path.join(standaloneDir, '.next', 'static');

if (fs.existsSync(staticDir)) {
  console.log('📁 Copying .next/static folder...');
  copyDirSync(staticDir, targetStaticDir);
}

console.log('✅ Postbuild complete! Files ready for Hostinger deployment.');
