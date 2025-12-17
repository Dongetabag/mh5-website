# How to Get WooCommerce API Credentials for TapStitch

TapStitch needs your WooCommerce REST API credentials to connect. Here's how to get them:

---

## Step-by-Step: Get WooCommerce API Keys

### Step 1: Log in to WordPress Admin

1. **Go to your WooCommerce store admin:**
   - Visit: `https://shop.therealmh5.com/wp-admin`
   - Log in with your WordPress admin credentials

### Step 2: Navigate to WooCommerce REST API Settings

1. **In WordPress Admin**, go to:
   - **WooCommerce** → **Settings** (in the left sidebar)
   - Click the **"Advanced"** tab
   - Click **"REST API"** in the submenu

   OR

   - Go directly to: **WooCommerce** → **Settings** → **Advanced** → **REST API**

### Step 3: Add New API Key

1. **Click the "Add Key" button** (or "Add new key" button)
   - Usually in the top right or at the top of the REST API page

2. **Fill in the Key Details:**
   - **Description:** `TapStitch Integration` (or any name you want)
   - **User:** Select your admin user (or create a dedicated user)
   - **Permissions:** Select **"Read/Write"**
     - This allows TapStitch to read products and create orders
   - Click **"Generate API Key"** button

### Step 4: Copy Your Credentials

After clicking "Generate API Key", you'll see:
- **Consumer Key:** A long string (starts with `ck_...`)
- **Consumer Secret:** Another long string (starts with `cs_...`)

**IMPORTANT:** Copy both of these immediately! You won't be able to see the Consumer Secret again.

---

## Step 5: Enter Credentials in TapStitch

1. **Back in TapStitch modal:**
   - **Store URL:** `https://shop.therealmh5.com`
   - **Store's Key:** Paste your **Consumer Key** (starts with `ck_...`)
   - **Store's Secret:** Paste your **Consumer Secret** (starts with `cs_...`)

2. **Click "Connect"**

---

## Visual Guide - Where to Find It

**WordPress Admin Navigation Path:**
```
WooCommerce
  └── Settings
      └── Advanced (tab at top)
          └── REST API (submenu item)
              └── Add Key (button)
                  └── Generate API Key
                      └── Copy Consumer Key & Consumer Secret
```

---

## Troubleshooting

### Can't Find REST API Section?

**Option 1: WooCommerce Settings Path**
1. WooCommerce → Settings
2. Look for tabs at the top: **General, Products, Shipping, Payments, Accounts, Emails, Integration, Advanced**
3. Click **"Advanced"** tab
4. Look for **"REST API"** in the list on the left

**Option 2: Direct URL**
- Try visiting: `https://shop.therealmh5.com/wp-admin/admin.php?page=wc-settings&tab=advanced&section=keys`

### "Add Key" Button Not Showing?

- Make sure you're logged in as an administrator
- Check that WooCommerce is activated
- Try refreshing the page

### Need to Create New Credentials?

- You can create multiple API keys
- Each key can have different permissions
- For TapStitch, use **"Read/Write"** permissions

### Lost Your Consumer Secret?

- You can't retrieve it - you'll need to generate a new key
- Delete the old key and create a new one
- Update TapStitch with the new credentials

---

## Security Notes

- ✅ **Consumer Key** can be viewed later (starts with `ck_`)
- ❌ **Consumer Secret** is shown only once (starts with `cs_`)
- 🔒 Keep these credentials secure
- 🔄 You can revoke/delete keys if needed
- 👤 Consider creating a dedicated WordPress user for API access

---

## Quick Checklist

- [ ] Logged into WordPress admin at `shop.therealmh5.com/wp-admin`
- [ ] Navigated to WooCommerce → Settings → Advanced → REST API
- [ ] Clicked "Add Key" button
- [ ] Filled in description and selected "Read/Write" permissions
- [ ] Generated API key
- [ ] Copied Consumer Key (starts with `ck_...`)
- [ ] Copied Consumer Secret (starts with `cs_...`)
- [ ] Entered all three values in TapStitch modal
- [ ] Clicked "Connect" in TapStitch

---

**Once you have the credentials, enter them in the TapStitch modal and click "Connect"!**

