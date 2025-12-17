#!/bin/bash
# MH5 Website - VPS Automation Setup Script
# Installs Google AI SDK and configures Claude Code + Google AI integration

set -e

echo "🚀 MH5 Website Automation Setup"
echo "================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
GOOGLE_AI_API_KEY="AIzaSyAmOIJHGlsZdMYy1NJbbXTNAuB-Du0mrsc"
PROJECT_DIR="/var/www/mh5-site"
N8N_DIR="/root/.n8n"

echo -e "${BLUE}Step 1: Checking prerequisites...${NC}"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${YELLOW}Node.js not found. Installing...${NC}"
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
    apt-get install -y nodejs
fi

# Check if Python3 is installed
if ! command -v python3 &> /dev/null; then
    echo -e "${YELLOW}Python3 not found. Installing...${NC}"
    apt-get update
    apt-get install -y python3 python3-pip
fi

echo -e "${GREEN}✓ Prerequisites checked${NC}"

echo -e "${BLUE}Step 2: Setting up project directory...${NC}"
mkdir -p $PROJECT_DIR
cd $PROJECT_DIR

echo -e "${GREEN}✓ Project directory ready${NC}"

echo -e "${BLUE}Step 3: Installing Google AI SDK...${NC}"

# Install Google Generative AI SDK for Node.js
if [ -f "package.json" ]; then
    echo "Installing Google AI dependencies..."
    npm install @google/generative-ai@latest
    echo -e "${GREEN}✓ Google AI SDK installed${NC}"
else
    echo -e "${YELLOW}⚠ package.json not found. Run this script from the project root.${NC}"
fi

# Install Google AI SDK for Python (for server-side automation)
echo "Installing Google AI Python SDK..."
pip3 install --upgrade google-generativeai

echo -e "${GREEN}✓ Google AI Python SDK installed${NC}"

echo -e "${BLUE}Step 4: Creating environment configuration...${NC}"

# Create .env file with Google AI API key
cat > .env << EOF
# Google AI Configuration
GOOGLE_AI_API_KEY=$GOOGLE_AI_API_KEY

# Claude Code Configuration
CLAUDE_CODE_ENABLED=true

# Project Configuration
NODE_ENV=production
PROJECT_DIR=$PROJECT_DIR

# n8n Configuration
N8N_HOST=https://n8n.srv1167160.hstgr.cloud
N8N_PROTOCOL=https
EOF

echo -e "${GREEN}✓ Environment configuration created${NC}"

echo -e "${BLUE}Step 5: Creating automation scripts directory...${NC}"
mkdir -p automation/scripts
mkdir -p automation/workflows

echo -e "${GREEN}✓ Automation directories created${NC}"

echo -e "${BLUE}Step 6: Creating Google AI helper script...${NC}"

cat > automation/scripts/google-ai-helper.js << 'EOJAVASCRIPT'
#!/usr/bin/env node
/**
 * Google AI Helper Script for MH5 Website Automation
 * Provides AI-powered code generation and website completion
 */

const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const API_KEY = process.env.GOOGLE_AI_API_KEY || process.argv[2];
const genAI = new GoogleGenerativeAI(API_KEY);

const model = genAI.getGenerativeModel({ 
    model: 'gemini-2.0-flash-exp',
    generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 8192,
    }
});

/**
 * Generate code using Google AI
 */
async function generateCode(prompt, context = '') {
    try {
        const fullPrompt = context 
            ? `${context}\n\nTask: ${prompt}\n\nGenerate production-ready code following best practices.`
            : prompt;

        const result = await model.generateContent(fullPrompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error('Error generating code:', error);
        throw error;
    }
}

/**
 * Analyze website structure and suggest improvements
 */
async function analyzeWebsite(projectPath = process.cwd()) {
    const prompt = `
Analyze the MH5 website project structure at ${projectPath} and provide:
1. List of incomplete components from the roadmap
2. Priority order for completion
3. Suggested implementation approach for each component
4. Dependencies between components
    `;

    return await generateCode(prompt);
}

/**
 * Generate a specific component based on requirements
 */
async function generateComponent(componentName, requirements) {
    const context = `
You are an expert React/Next.js developer working on the MH5 website.
The project uses:
- Next.js 16
- TypeScript
- Tailwind CSS 4
- Framer Motion for animations
- Component location: src/components/

Generate a complete, production-ready component that:
${requirements}
    `;

    const prompt = `Create the ${componentName} component with all necessary TypeScript types, props, and styling.`;

    return await generateCode(prompt, context);
}

// CLI interface
if (require.main === module) {
    const command = process.argv[2];
    const args = process.argv.slice(3);

    (async () => {
        try {
            switch (command) {
                case 'analyze':
                    const analysis = await analyzeWebsite();
                    console.log(analysis);
                    break;
                
                case 'generate':
                    const [componentName, ...reqParts] = args;
                    const requirements = reqParts.join(' ');
                    const code = await generateComponent(componentName, requirements);
                    console.log(code);
                    break;
                
                default:
                    console.log(`
Usage:
  node google-ai-helper.js analyze
  node google-ai-helper.js generate <component-name> <requirements>
                    `);
            }
        } catch (error) {
            console.error('Error:', error.message);
            process.exit(1);
        }
    })();
}

module.exports = { generateCode, analyzeWebsite, generateComponent };
EOJAVASCRIPT

chmod +x automation/scripts/google-ai-helper.js

echo -e "${GREEN}✓ Google AI helper script created${NC}"

echo -e "${BLUE}Step 7: Creating Claude Code integration script...${NC}"

cat > automation/scripts/claude-code-integration.sh << 'EOBASH'
#!/bin/bash
# Claude Code Integration Script
# Coordinates between Claude Code agent and Google AI

TASK="$1"
COMPONENT_NAME="$2"
GOOGLE_AI_API_KEY="${GOOGLE_AI_API_KEY:-AIzaSyAmOIJHGlsZdMYy1NJbbXTNAuB-Du0mrsc}"

case "$TASK" in
    "generate-component")
        echo "🤖 Generating component: $COMPONENT_NAME"
        node automation/scripts/google-ai-helper.js generate "$COMPONENT_NAME" \
            "Follow MH5 design system, use TypeScript, include animations with Framer Motion"
        ;;
    "analyze-project")
        echo "📊 Analyzing project structure..."
        node automation/scripts/google-ai-helper.js analyze
        ;;
    *)
        echo "Usage: $0 {generate-component|analyze-project} [component-name]"
        exit 1
        ;;
esac
EOBASH

chmod +x automation/scripts/claude-code-integration.sh

echo -e "${GREEN}✓ Claude Code integration script created${NC}"

echo -e "${BLUE}Step 8: Setting up n8n workflow directory...${NC}"
mkdir -p $N8N_DIR/workflows

echo -e "${GREEN}✓ n8n workflow directory ready${NC}"

echo ""
echo -e "${GREEN}✅ Setup Complete!${NC}"
echo ""
echo "Next steps:"
echo "1. Import the n8n workflow from: automation/workflows/mh5-website-automation.json"
echo "2. Update the Google AI API key in n8n credentials if needed"
echo "3. Configure Claude Code agent with this project directory"
echo ""
echo "Test the setup:"
echo "  cd $PROJECT_DIR"
echo "  node automation/scripts/google-ai-helper.js analyze"

