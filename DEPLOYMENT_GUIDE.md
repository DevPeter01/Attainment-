# Production Deployment Guide

## 🚀 BACKEND DEPLOYMENT (Render)

### Step 1: Create New Web Service
1. Go to https://dashboard.render.com/
2. Click "New +" → "Web Service"
3. Connect your GitHub repository

### Step 2: Configure Service Settings

**Basic Configuration:**
```
Name:                co-attainment-backend
Region:              Oregon (US West) or closest to users
Branch:              main
Root Directory:      server
Runtime:             Node
```

**Build & Deploy:**
```
Build Command:       npm install
Start Command:       npm start
```

**Instance Type:**
```
Free tier or Starter ($7/month recommended for Puppeteer)
```

### Step 3: Environment Variables (CRITICAL)

Add these in Render Dashboard → Environment:

```bash
NODE_ENV=production
CLIENT_ORIGINS=https://your-app-name.netlify.app
PORT=10000
```

**⚠️ DO NOT set PORT manually - Render injects it automatically**

### Step 4: Advanced Settings

**Auto-Deploy:**
- ✅ Enable "Auto-Deploy" for main branch

**Health Check Path:**
```
/
```

### Step 5: Puppeteer on Render (CRITICAL)

Render provides Chrome automatically. Your code already handles this:
```javascript
const browser = await puppeteer.launch({
  executablePath: process.env.CHROME_PATH || null,
  args: ['--no-sandbox', '--disable-setuid-sandbox']
});
```

**No additional configuration needed** - Render detects Puppeteer and installs Chrome.

### Common Mistakes to Avoid:
❌ Setting PORT environment variable manually (Render does this)
❌ Using "npm run dev" as start command (use "npm start")
❌ Forgetting root directory "server"
❌ Not adding CLIENT_ORIGINS for CORS
❌ Using free tier for heavy Puppeteer usage (may timeout)

---

## 🌐 FRONTEND DEPLOYMENT (Netlify)

### Step 1: Create New Site
1. Go to https://app.netlify.com/
2. Click "Add new site" → "Import an existing project"
3. Connect your GitHub repository

### Step 2: Configure Build Settings

**Basic Configuration:**
```
Base directory:      client
Build command:       npm run build
Publish directory:   client/dist
```

**Production branch:**
```
main
```

### Step 3: Environment Variables

Add in Netlify Dashboard → Site settings → Environment variables:

```bash
VITE_API_URL=https://co-attainment-8508.onrender.com
```

**⚠️ Replace URL after Render deployment completes**

### Step 4: Deploy Settings (Auto-deploy)

- ✅ Enable "Auto publishing" for main branch
- ✅ Enable "Deploy previews" for pull requests

### Step 5: React Router Fix (CRITICAL)

Create redirect rule for client-side routing:

**File:** `client/public/_redirects`
```
/*    /index.html   200
```

**This file already exists in your project structure.**

### Common Mistakes to Avoid:
❌ Wrong base directory (must be "client")
❌ Wrong publish directory (must be "client/dist")
❌ Forgetting _redirects file (breaks React Router)
❌ Not setting VITE_API_URL environment variable
❌ Using localhost URLs in production

---

## ✅ VERIFICATION CHECKLIST

### Backend (Render):
- [ ] Health check responds at https://your-backend.onrender.com/
- [ ] CORS allows your Netlify domain
- [ ] Puppeteer launches without errors (check logs)
- [ ] /api/upload endpoint works with test file

### Frontend (Netlify):
- [ ] Site loads at https://your-app.netlify.app
- [ ] API calls reach backend (check Network tab)
- [ ] File upload works end-to-end
- [ ] React Router navigation works (no 404s)

---

## 🔧 DEBUGGING

### Render Logs:
```bash
# View live logs in Render Dashboard → Logs
# Look for:
- "Server running on port 10000"
- "Environment: production"
- No CORS errors
```

### Netlify Logs:
```bash
# View build logs in Netlify Dashboard → Deploys → Deploy log
# Check for:
- "Build successful"
- No environment variable warnings
```

### Common Issues:

**1. CORS Error:**
```
Fix: Add your Netlify URL to CLIENT_ORIGINS in Render
Format: https://your-app.netlify.app (no trailing slash)
```

**2. Puppeteer Timeout:**
```
Fix: Upgrade Render instance to Starter plan
Reason: Free tier has limited resources for Chrome
```

**3. 404 on React Router:**
```
Fix: Ensure _redirects file exists in client/public/
```

**4. API calls fail:**
```
Fix: Check VITE_API_URL in Netlify environment variables
Must match your Render backend URL exactly
```

---

## 📊 DEPLOYMENT TIMELINE

1. **Backend (Render):** 5-10 minutes first deploy
2. **Frontend (Netlify):** 2-3 minutes
3. **Total:** ~15 minutes end-to-end

**First deploy takes longer due to Puppeteer Chrome installation.**

---

## 🔄 UPDATE WORKFLOW

### Making Changes:

1. **Code changes:**
   ```bash
   git add .
   git commit -m "your changes"
   git push origin main
   ```

2. **Auto-deployment:**
   - Render rebuilds backend automatically
   - Netlify rebuilds frontend automatically

3. **Verify:**
   - Check Render logs for successful deployment
   - Check Netlify preview before production

**No manual deployment needed after initial setup!**
