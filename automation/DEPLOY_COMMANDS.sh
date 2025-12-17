#!/bin/bash
# Deployment Commands - Run these on your local machine or VPS

echo "🚀 MH5 Website Automation Deployment"
echo "===================================="
echo ""

# Option 1: Upload files using SCP (requires SSH access)
echo "Step 1: Upload automation files to VPS"
echo "Run this command from your local machine:"
echo ""
echo "cd '/Users/simeonreid/MH5 Website/mh5-site'"
echo "scp -r automation root@72.61.72.94:/var/www/mh5-site/"
echo ""
read -p "Press Enter after uploading files, or Ctrl+C to exit and upload manually..."

# Option 2: If files are already on VPS, skip to setup
echo ""
echo "Step 2: SSH into VPS and run setup"
echo "Run these commands:"
echo ""
echo "ssh root@72.61.72.94"
echo "cd /var/www/mh5-site"
echo "bash automation/vps-setup.sh"
echo ""

# Option 3: Alternative - Clone from GitHub if repo is accessible
echo ""
echo "Alternative: Clone from GitHub (if repo is public or VPS has access)"
echo "ssh root@72.61.72.94"
echo "cd /var/www"
echo "git clone https://github.com/Dongetabag/mh5-website.git mh5-site"
echo "cd mh5-site"
echo "bash automation/vps-setup.sh"
echo ""

echo "✅ Deployment instructions displayed"
echo ""
echo "Choose your deployment method:"
echo "1. SCP upload (requires SSH keys/password)"
echo "2. GitHub clone (if repo is accessible from VPS)"
echo "3. Manual file copy via n8n file operations"

