# Deploy Automation to VPS

## Option 1: Using SCP (Requires SSH Authentication)

```bash
# From your local machine
cd "/Users/simeonreid/MH5 Website/mh5-site"
scp -r automation root@72.61.72.94:/var/www/mh5-site/

# Then SSH in and run setup
ssh root@72.61.72.94
cd /var/www/mh5-site
bash automation/vps-setup.sh
```

## Option 2: Clone from GitHub (If VPS has GitHub access)

```bash
ssh root@72.61.72.94
cd /var/www
git clone https://github.com/Dongetabag/mh5-website.git mh5-site
cd mh5-site
bash automation/vps-setup.sh
```

## Option 3: Manual Upload via n8n

If SSH is not working, you can:
1. Create a webhook in n8n to receive files
2. Upload files via n8n interface
3. Use n8n to execute the setup script

## After Deployment

Once files are on VPS, run:
```bash
cd /var/www/mh5-site
bash automation/vps-setup.sh
```

This will:
- Install Google AI SDK
- Configure environment variables
- Set up helper scripts
- Prepare automation directories

## Verify Installation

```bash
# Test Google AI helper
node automation/scripts/google-ai-helper.js analyze

# Check environment
cat .env | grep GOOGLE_AI_API_KEY
```
