# Deployment Guide
## Setting Up MH5 Website Automation on VPS

---

## Prerequisites

- ✅ VPS access (72.61.72.94)
- ✅ SSH credentials configured
- ✅ n8n running (https://n8n.srv1167160.hstgr.cloud)
- ✅ Claude Code agent installed
- ✅ Google AI API Key: `AIzaSyAmOIJHGlsZdMYy1NJbbXTNAuB-Du0mrsc`

---

## Step 1: Upload Files to VPS

### Option A: Using SCP (Recommended)

```bash
# From your local machine
cd "/Users/simeonreid/MH5 Website/mh5-site"

# Upload automation directory
scp -r automation root@72.61.72.94:/var/www/mh5-site/

# Verify upload
ssh root@72.61.72.94 "ls -la /var/www/mh5-site/automation"
```

### Option B: Using Git (If repo exists)

```bash
ssh root@72.61.72.94
cd /var/www/mh5-site
git pull origin main
```

---

## Step 2: Run Setup Script

```bash
# SSH into VPS
ssh root@72.61.72.94

# Navigate to project
cd /var/www/mh5-site

# Make script executable
chmod +x automation/vps-setup.sh

# Run setup
bash automation/vps-setup.sh
```

**Expected output:**
```
🚀 MH5 Website Automation Setup
================================

Step 1: Checking prerequisites...
✓ Prerequisites checked

Step 2: Setting up project directory...
✓ Project directory ready

Step 3: Installing Google AI SDK...
✓ Google AI SDK installed
✓ Google AI Python SDK installed

Step 4: Creating environment configuration...
✓ Environment configuration created

Step 5: Creating automation scripts directory...
✓ Automation directories created

Step 6: Creating Google AI helper script...
✓ Google AI helper script created

Step 7: Creating Claude Code integration script...
✓ Claude Code integration script created

Step 8: Setting up n8n workflow directory...
✓ n8n workflow directory ready

✅ Setup Complete!
```

---

## Step 3: Verify Installation

```bash
# Test Google AI helper
cd /var/www/mh5-site
node automation/scripts/google-ai-helper.js analyze

# Check if Google AI SDK is installed
node -e "require('@google/generative-ai'); console.log('✓ Google AI SDK installed')"

# Verify environment variables
cat .env | grep GOOGLE_AI_API_KEY
```

---

## Step 4: Configure n8n Workflow

### 4.1 Access n8n Dashboard
1. Open: `https://n8n.srv1167160.hstgr.cloud`
2. Login with your credentials

### 4.2 Import Workflow

1. Click **"Workflows"** in sidebar
2. Click **"Import from File"**
3. Upload: `automation/workflows/mh5-website-automation.json`
4. Workflow should appear in your list

### 4.3 Configure Workflow Settings

1. Open the imported workflow
2. Click on **"Schedule Trigger"** node
3. Configure schedule (recommended: Every 4 hours)
4. Click on **"Analyze Project"** node
5. Verify command path: `/var/www/mh5-site`
6. Click on **"Generate Component"** node
7. Verify command paths are correct

### 4.4 Save and Activate

1. Click **"Save"** button (top right)
2. Toggle **"Active"** switch to ON
3. Workflow will now run on schedule

---

## Step 5: Test Automation

### 5.1 Manual Test Run

```bash
# Test project analysis
cd /var/www/mh5-site
node automation/scripts/google-ai-helper.js analyze

# Test component generation (example)
node automation/scripts/google-ai-helper.js generate CountdownTimer \
  "Create a production-ready React component following MH5 design system. Include TypeScript types, Tailwind CSS styling, and Framer Motion animations."
```

### 5.2 Test n8n Workflow

1. In n8n, open the workflow
2. Click **"Execute Workflow"** button
3. Watch execution in real-time
4. Check logs for any errors

---

## Step 6: Configure Claude Code Agent

### 6.1 Verify Claude Code Installation

```bash
ssh root@72.61.72.94
which claude-code
claude-code --version
```

### 6.2 Configure Project Context

```bash
cd /var/www/mh5-site

# Set environment variables (add to ~/.bashrc for persistence)
export PROJECT_DIR=/var/www/mh5-site
export GOOGLE_AI_API_KEY=AIzaSyAmOIJHGlsZdMYy1NJbbXTNAuB-Du0mrsc
export CLAUDE_CODE_ENABLED=true

# Test Claude Code integration
bash automation/scripts/claude-code-integration.sh analyze-project
```

---

## Step 7: Monitor Automation

### 7.1 n8n Execution Logs

1. Go to n8n dashboard
2. Click **"Executions"** in sidebar
3. View recent workflow runs
4. Check for errors or warnings

### 7.2 Project Progress Tracking

```bash
# Check generated components
ls -la src/components/

# View component index
cat src/components/index.ts

# Check TypeScript compilation
npm run build
```

---

## Troubleshooting

### Issue: Google AI API Key Invalid

**Solution:**
```bash
# Verify API key in .env
cat /var/www/mh5-site/.env | grep GOOGLE_AI_API_KEY

# Test API key manually
node -e "
const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI('AIzaSyAmOIJHGlsZdMYy1NJbbXTNAuB-Du0mrsc');
console.log('API Key loaded successfully');
"
```

### Issue: n8n Workflow Not Executing

**Check:**
1. Workflow is set to **Active**
2. Schedule trigger is configured correctly
3. n8n service is running: `systemctl status n8n`
4. Check n8n logs: `journalctl -u n8n -f`

### Issue: Generated Code Has Errors

**Solution:**
1. Review generated code manually
2. Use Claude Code agent to fix issues
3. Update generation prompts for better results
4. Add more specific requirements

### Issue: Permission Denied Errors

**Solution:**
```bash
# Fix script permissions
chmod +x automation/scripts/*.sh
chmod +x automation/scripts/*.js

# Fix directory permissions
chmod -R 755 automation/
```

---

## Next Steps

1. ✅ Setup complete
2. ✅ Workflow configured
3. ⏳ Monitor first execution
4. ⏳ Review generated components
5. ⏳ Iterate and improve prompts

---

## Support & Maintenance

### Daily Checks
- Review n8n execution logs
- Check generated components
- Verify build success

### Weekly Reviews
- Component quality assessment
- Prompt optimization
- Workflow efficiency review

### Monthly Optimization
- Performance metrics review
- Automation improvements
- Strategic adjustments

---

**Last Updated:** December 17, 2024  
**Status:** Ready for Deployment

