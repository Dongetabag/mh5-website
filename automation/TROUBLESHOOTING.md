# Troubleshooting Guide
## n8n Workflow Execution Errors

---

## Common Issues and Solutions

### Issue 1: "Permission Denied" or Command Execution Fails

**Symptoms:**
- Error when executing command nodes
- "Permission denied" messages
- Commands not found

**Solutions:**

#### A. Check n8n User Permissions

n8n needs permissions to execute commands and access directories:

```bash
# SSH into VPS
ssh root@72.61.72.94

# Check which user n8n runs as
ps aux | grep n8n

# Give n8n user permissions (if running as 'n8n' user)
# Option 1: Add to sudoers (if needed)
echo "n8n ALL=(ALL) NOPASSWD: /usr/bin/git, /usr/bin/node, /usr/bin/bash" | sudo tee /etc/sudoers.d/n8n

# Option 2: Run n8n as root (not recommended for production, but works)
# Edit n8n service file
systemctl edit n8n
# Add:
# [Service]
# User=root
# Group=root
```

#### B. Check Directory Permissions

```bash
# Ensure /var/www is accessible
chmod 755 /var/www
chown -R root:root /var/www

# Or allow n8n user access
chown -R n8n:n8n /var/www/mh5-site  # if using n8n user
```

#### C. Update Workflow to Use Absolute Paths

If commands fail, try using full paths:

```bash
# Instead of: git clone
# Use: /usr/bin/git clone

# Instead of: node
# Use: /usr/bin/node (or /usr/local/bin/node)
```

---

### Issue 2: "git: command not found"

**Solution:**
```bash
# Install git on VPS
apt-get update
apt-get install -y git

# Verify installation
which git
git --version
```

---

### Issue 3: "node: command not found"

**Solution:**
```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

# Verify
which node
node --version
```

---

### Issue 4: "Directory /var/www doesn't exist"

**Solution:**
```bash
# Create directory
mkdir -p /var/www
chmod 755 /var/www
```

---

### Issue 5: Clone Fails - Repository Not Found

**Possible Causes:**
1. Repository is private and needs authentication
2. Network issues
3. GitHub rate limiting

**Solutions:**

#### A. For Private Repos - Use SSH Key
```bash
# On VPS, generate SSH key for n8n user
sudo -u n8n ssh-keygen -t ed25519 -C "n8n@vps"

# Add public key to GitHub
sudo -u n8n cat ~/.ssh/id_ed25519.pub

# Update workflow to use SSH URL:
# git@github.com:Dongetabag/mh5-website.git
```

#### B. For Public Repos - Use HTTPS
```bash
# Current workflow uses HTTPS, which should work for public repos
# If it fails, check network connectivity:
curl -I https://github.com
```

---

### Issue 6: "Cannot access /var/www/mh5-site" - Permission Denied

**Solution:**
```bash
# Fix permissions
chmod -R 755 /var/www
chown -R root:root /var/www

# Or if n8n runs as different user:
chown -R n8n:n8n /var/www/mh5-site
```

---

### Issue 7: Setup Script Fails

**Common Causes:**
1. Script not executable
2. Dependencies missing
3. API key issues

**Solution:**
```bash
# Make scripts executable
cd /var/www/mh5-site
chmod +x automation/vps-setup.sh
chmod +x automation/scripts/*.sh
chmod +x automation/scripts/*.js

# Run setup manually to see errors
bash automation/vps-setup.sh
```

---

## Quick Diagnostic Commands

Run these on the VPS to diagnose:

```bash
# Check n8n service status
systemctl status n8n

# Check n8n user
ps aux | grep n8n

# Test if n8n can execute commands (run as n8n user)
sudo -u n8n whoami
sudo -u n8n git --version
sudo -u n8n node --version
sudo -u n8n ls -la /var/www

# Check directory permissions
ls -la /var/www
stat /var/www

# Test git clone manually
cd /tmp
git clone https://github.com/Dongetabag/mh5-website.git test-clone
rm -rf test-clone
```

---

## Workflow Fixes

### Fix 1: Add Error Handling

Update workflow nodes to handle errors gracefully:

1. After "Clone Repository" node, add error handling
2. Check exit codes before proceeding
3. Log errors for debugging

### Fix 2: Use Sudo for Commands (If Needed)

If n8n user doesn't have direct access, wrap commands in sudo:

```bash
# In command node:
sudo -u root bash -c "cd /var/www && git clone https://github.com/Dongetabag/mh5-website.git mh5-site"
```

### Fix 3: Pre-create Directories

Add a node before clone to ensure directories exist:

```bash
mkdir -p /var/www
chmod 755 /var/www
```

---

## Recommended Workflow Updates

### Update 1: Add Pre-Flight Checks Node

Before "Clone Repository", add a node to check prerequisites:

```bash
# Check prerequisites
which git && echo "git OK" || echo "git MISSING"
which node && echo "node OK" || echo "node MISSING"
ls -d /var/www && echo "directory OK" || echo "directory MISSING"
```

### Update 2: Add Better Error Messages

Update error nodes to show more detail:

```javascript
// In Error Summary node
const error = $input.item.json.stderr || $input.item.json.stdout || 'Unknown error';
const exitCode = $input.item.json.exitCode || -1;
const command = $input.item.json.command || 'Unknown command';

return [{
  json: {
    status: 'error',
    message: `Command failed: ${command}`,
    exitCode: exitCode,
    error: error,
    troubleshooting: 'Check n8n user permissions and directory access'
  }
}];
```

---

## Testing Workflow Step by Step

1. **Test Manual Trigger**
   - Should execute immediately
   - Check for errors

2. **Test Clone Repository**
   - Check output for git clone messages
   - Verify exit code is 0

3. **Test Each Subsequent Node**
   - Run workflow up to each node
   - Check data passing between nodes
   - Verify conditions work correctly

---

## Getting Help

If issues persist:

1. Check n8n execution logs:
   - Click "Executions" in n8n
   - View failed execution
   - Check error details

2. Check VPS logs:
   ```bash
   journalctl -u n8n -f
   ```

3. Test commands manually:
   ```bash
   # Run the exact command from workflow node
   cd /var/www && git clone https://github.com/Dongetabag/mh5-website.git mh5-site
   ```

---

## Success Indicators

You'll know it's working when:

1. ✅ Clone Repository node shows exit code 0
2. ✅ "Clone Successful?" node goes to "true" branch
3. ✅ Setup script runs without errors
4. ✅ Google AI test passes
5. ✅ Environment check shows API key
6. ✅ Success Summary shows completion message

