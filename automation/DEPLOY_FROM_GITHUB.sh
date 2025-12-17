#!/bin/bash
# Deploy MH5 Website Automation from GitHub
# Run this script ON THE VPS SERVER

set -e

echo "🚀 MH5 Website Automation - GitHub Deployment"
echo "=============================================="
echo ""

# Configuration
PROJECT_DIR="/var/www/mh5-site"
GITHUB_REPO="https://github.com/Dongetabag/mh5-website.git"
GOOGLE_AI_API_KEY="${GOOGLE_AI_API_KEY:-YOUR_GOOGLE_AI_API_KEY_HERE}"

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
    echo -e "${YELLOW}⚠️  Please run as root: sudo bash $0${NC}"
    exit 1
fi

echo -e "${BLUE}Step 1: Installing prerequisites...${NC}"
apt-get update
apt-get install -y git nodejs npm python3 python3-pip

echo -e "${GREEN}✓ Prerequisites installed${NC}"

echo -e "${BLUE}Step 2: Setting up project directory...${NC}"

# Backup existing directory if it exists
if [ -d "$PROJECT_DIR" ]; then
    echo -e "${YELLOW}⚠️  Directory exists. Creating backup...${NC}"
    mv "$PROJECT_DIR" "${PROJECT_DIR}.backup.$(date +%Y%m%d_%H%M%S)"
fi

# Create directory
mkdir -p "$PROJECT_DIR"
cd "$PROJECT_DIR"

echo -e "${GREEN}✓ Project directory ready${NC}"

echo -e "${BLUE}Step 3: Cloning from GitHub...${NC}"
git clone "$GITHUB_REPO" .

echo -e "${GREEN}✓ Repository cloned${NC}"

echo -e "${BLUE}Step 4: Running automation setup...${NC}"
if [ -f "automation/vps-setup.sh" ]; then
    bash automation/vps-setup.sh
else
    echo -e "${YELLOW}⚠️  Setup script not found. Running manual setup...${NC}"
    
    # Manual setup if script doesn't exist
    npm install @google/generative-ai@latest
    pip3 install --upgrade google-generativeai
    
    cat > .env << EOF
GOOGLE_AI_API_KEY=$GOOGLE_AI_API_KEY
CLAUDE_CODE_ENABLED=true
NODE_ENV=production
PROJECT_DIR=$PROJECT_DIR
EOF
    
    chmod +x automation/scripts/*.sh automation/scripts/*.js 2>/dev/null || true
fi

echo -e "${GREEN}✓ Setup complete${NC}"

echo -e "${BLUE}Step 5: Verifying installation...${NC}"

# Verify Google AI SDK
if node -e "require('@google/generative-ai'); console.log('✓ Google AI SDK installed')" 2>/dev/null; then
    echo -e "${GREEN}✓ Google AI SDK verified${NC}"
else
    echo -e "${YELLOW}⚠️  Google AI SDK verification failed${NC}"
fi

# Verify environment
if [ -f ".env" ]; then
    echo -e "${GREEN}✓ Environment file created${NC}"
    echo "API Key configured: $(grep GOOGLE_AI_API_KEY .env | cut -d'=' -f2 | cut -c1-20)..."
else
    echo -e "${YELLOW}⚠️  Environment file not found${NC}"
fi

echo ""
echo -e "${GREEN}✅ Deployment Complete!${NC}"
echo ""
echo "Next steps:"
echo "1. Test the setup: cd $PROJECT_DIR && node automation/scripts/google-ai-helper.js analyze"
echo "2. Import n8n workflow from: automation/workflows/mh5-website-automation.json"
echo "3. Configure Claude Code agent with project directory"
echo ""
echo "Project location: $PROJECT_DIR"

