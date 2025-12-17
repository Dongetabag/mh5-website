#!/usr/bin/env node

/**
 * Postbuild script for Hostinger deployment
 * Copies public folder contents to standalone output directory
 */

'use strict';

var fs = require('fs');
var path = require('path');

var standaloneDir = path.join(__dirname, '..', '.next', 'standalone');
var publicDir = path.join(__dirname, '..', 'public');
var targetPublicDir = path.join(standaloneDir, 'public');

// Helper function to copy directory recursively
function copyDirSync(src, dest) {
  try {
    if (!fs.existsSync(src)) {
      console.log('Source directory does not exist: ' + src);
      return;
    }

    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }

    var entries = fs.readdirSync(src);

    for (var i = 0; i < entries.length; i++) {
      var entry = entries[i];
      var srcPath = path.join(src, entry);
      var destPath = path.join(dest, entry);
      var stat = fs.statSync(srcPath);

      if (stat.isDirectory()) {
        copyDirSync(srcPath, destPath);
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  } catch (err) {
    console.log('Error copying: ' + err.message);
  }
}

console.log('Running postbuild script for Hostinger...');

// Check if standalone directory exists
if (!fs.existsSync(standaloneDir)) {
  console.log('Standalone directory not found. Skipping public folder copy.');
  process.exit(0);
}

// Copy public folder to standalone directory
console.log('Copying public folder to standalone output...');
copyDirSync(publicDir, targetPublicDir);

// Also copy static folder from .next
var staticDir = path.join(__dirname, '..', '.next', 'static');
var targetStaticDir = path.join(standaloneDir, '.next', 'static');

if (fs.existsSync(staticDir)) {
  console.log('Copying .next/static folder...');
  copyDirSync(staticDir, targetStaticDir);
}

console.log('Postbuild complete!');
