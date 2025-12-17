# n8n Deployment Workflow Guide
## Automated GitHub Deployment for MH5 Website

---

## Overview

Two n8n workflows are available for deploying the MH5 website automation:

1. **Manual Deploy Workflow** - Trigger manually from n8n dashboard
2. **Webhook Deploy Workflow** - Trigger via HTTP webhook (for CI/CD)

---

## Workflow 1: Manual Deploy & Setup

### Import Workflow

1. Go to n8n: `https://n8n.srv1167160.hstgr.cloud`
2. Click **"Workflows"** → **"Import from File"**
3. Upload: `automation/workflows/manual-deploy-workflow.json`
4. Workflow appears in your list

### What It Does

1. ✅ Backs up existing mh5-site directory (if exists)
2. ✅ Clones repository from GitHub
3. ✅ Runs setup script (installs Google AI SDK, configures environment)
4. ✅ Tests Google AI helper
5. ✅ Verifies environment configuration
6. ✅ Provides success summary with next steps

### How to Use

1. Open the workflow in n8n
2. Click **"Execute Workflow"** button (top right)
3. Watch execution in real-time
4. Review output for success/errors

### Expected Output

On success, you'll see:
```json
{
  "status": "success",
  "message": "MH5 Website automation deployed and verified",
  "setup": "...",
  "googleAI": "...",
  "environment": "GOOGLE_AI_API_KEY=AIzaSyAmOIJHGlsZdMYy1NJbbXTNAuB-Du0mrsc",
  "nextSteps": [
    "Import n8n workflow from automation/workflows/mh5-website-automation.json",
    "Configure workflow credentials",
    "Activate workflow to start automation"
  ]
}
```

---

## Workflow 2: Webhook Deploy (Advanced)

### Import Workflow

1. Import: `automation/workflows/deploy-from-github-workflow.json`
2. Activate the workflow
3. Copy the webhook URL from the Webhook Trigger node

### What It Does

Same as Manual Deploy, but can be triggered via HTTP POST request.

### How to Use

**Trigger via curl:**
```bash
curl -X POST https://n8n.srv1167160.hstgr.cloud/webhook/mh5-deploy
```

**Trigger via GitHub Actions (example):**
```yaml
- name: Deploy to VPS
  run: |
    curl -X POST ${{ secrets.N8N_WEBHOOK_URL }}
```

**Trigger from another n8n workflow:**
Use HTTP Request node pointing to the webhook URL.

---

## Workflow Execution Steps

### Step 1: Clone Repository
```bash
cd /var/www
git clone https://github.com/Dongetabag/mh5-website.git mh5-site
```

### Step 2: Run Setup Script
```bash
cd /var/www/mh5-site
bash automation/vps-setup.sh
```

This installs:
- Google AI SDK (Node.js)
- Google AI SDK (Python)
- Creates .env file with API key
- Sets up helper scripts
- Configures automation directories

### Step 3: Verify Installation
```bash
node automation/scripts/google-ai-helper.js analyze
cat .env | grep GOOGLE_AI_API_KEY
```

---

## Troubleshooting

### Error: "git: command not found"

**Solution:**
```bash
# On VPS, install git
apt-get update
apt-get install -y git
```

### Error: "Permission denied" when running setup script

**Solution:**
The workflow includes `chmod +x` but if it still fails:
```bash
# Manually on VPS
cd /var/www/mh5-site
chmod +x automation/vps-setup.sh
chmod +x automation/scripts/*.sh
```

### Error: "node: command not found"

**Solution:**
Setup script should install Node.js, but if it fails:
```bash
# On VPS
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs
```

### Error: Clone fails with authentication

**Solution:**
If repository is private, you'll need to:
1. Set up SSH keys on VPS
2. Or use GitHub token in clone URL:
   ```
   git clone https://TOKEN@github.com/Dongetabag/mh5-website.git
   ```

---

## After Successful Deployment

### Next Steps

1. **Import Component Automation Workflow**
   - Import: `automation/workflows/mh5-website-automation.json`
   - This workflow handles component generation

2. **Verify Setup**
   ```bash
   cd /var/www/mh5-site
   node automation/scripts/google-ai-helper.js analyze
   ```

3. **Start Automation**
   - Activate the component automation workflow
   - Set schedule (recommended: every 4 hours)
   - Monitor executions

---

## Workflow Customization

### Change Project Directory

Edit the workflow nodes and change:
```
/var/www/mh5-site
```
to your preferred directory.

### Add Notifications

Add nodes after "Success Summary":
- **Email node** - Send success notification
- **Slack node** - Post to Slack channel
- **Discord node** - Send Discord message

### Add Rollback

Add a node before clone that:
1. Checks if backup exists
2. Restores from backup on error

---

## Security Considerations

1. **Webhook URL** - Keep webhook URL secret
2. **API Keys** - Never commit API keys to GitHub
3. **Permissions** - Run workflows with appropriate user permissions
4. **Backups** - Always backup before deployment

---

## Monitoring

### Check Workflow Execution

1. Go to n8n dashboard
2. Click **"Executions"** in sidebar
3. View recent runs
4. Check logs for errors

### Verify Deployment

```bash
# SSH into VPS
ssh root@72.61.72.94

# Check project exists
ls -la /var/www/mh5-site

# Verify automation directory
ls -la /var/www/mh5-site/automation

# Test Google AI
cd /var/www/mh5-site
node automation/scripts/google-ai-helper.js analyze
```

---

**Status:** Ready to Use  
**Recommended:** Start with Manual Deploy Workflow

