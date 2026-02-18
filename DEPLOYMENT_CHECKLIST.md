# 🚀 QUICK DEPLOYMENT CHECKLIST

## ✅ PRE-DEPLOYMENT VERIFICATION

### Backend Files:
- [x] server.js - Production-ready with health checks
- [x] package.json - "start" script configured
- [x] .env - CLIENT_ORIGINS set (update after Netlify deploy)
- [x] Puppeteer - Render-compatible configuration

### Frontend Files:
- [x] api.js - Environment variable support
- [x] .env - VITE_API_URL set (update with Render URL)
- [x] _redirects - React Router fix
- [x] netlify.toml - Build configuration

---

## 📋 DEPLOYMENT STEPS

### STEP 1: Deploy Backend to Render

1. **Create Web Service:**
   - Go to: https://dashboard.render.com/
   - Click: "New +" → "Web Service"
   - Connect: Your GitHub repository

2. **Configure:**
   ```
   Name:              co-attainment-backend
   Root Directory:    server
   Build Command:     npm install
   Start Command:     npm start
   ```

3. **Environment Variables:**
   ```
   NODE_ENV=production
   CLIENT_ORIGINS=https://your-app.netlify.app
   ```
   ⚠️ Update CLIENT_ORIGINS after Netlify deploy

4. **Deploy:**
   - Click "Create Web Service"
   - Wait 5-10 minutes (Puppeteer installs Chrome)

5. **Copy Backend URL:**
   ```
   Example: https://co-attainment-8508.onrender.com
   ```

### STEP 2: Deploy Frontend to Netlify

1. **Create Site:**
   - Go to: https://app.netlify.com/
   - Click: "Add new site" → "Import an existing project"
   - Connect: Your GitHub repository

2. **Configure:**
   ```
   Base directory:     client
   Build command:      npm run build
   Publish directory:  client/dist
   ```

3. **Environment Variables:**
   ```
   VITE_API_URL=https://co-attainment-8508.onrender.com/api
   ```
   ⚠️ Use your actual Render backend URL

4. **Deploy:**
   - Click "Deploy site"
   - Wait 2-3 minutes

5. **Copy Frontend URL:**
   ```
   Example: https://co-attainment.netlify.app
   ```

### STEP 3: Update CORS Configuration

1. **Go back to Render:**
   - Navigate to: Environment variables
   - Update: `CLIENT_ORIGINS=https://co-attainment.netlify.app`
   - Save changes (triggers redeploy)

### STEP 4: Test End-to-End

1. **Backend Health Check:**
   ```
   https://your-backend.onrender.com/
   Should return: {"status":"OK","message":"..."}
   ```

2. **Frontend Access:**
   ```
   https://your-app.netlify.app
   Should load: Home page
   ```

3. **File Upload Test:**
   - Upload a test Excel file
   - Verify: Processing completes
   - Download: Excel and PDF outputs

---

## 🔧 LOCAL DEVELOPMENT SETUP

### Backend (.env):
```bash
PORT=5000
NODE_ENV=development
CLIENT_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
```

### Frontend (.env):
```bash
VITE_API_URL=http://localhost:5000/api
```

### Run Locally:
```bash
# Terminal 1 - Backend
cd server
npm install
npm start

# Terminal 2 - Frontend
cd client
npm install
npm run dev
```

---

## ⚠️ CRITICAL REMINDERS

### Render (Backend):
- ❌ Do NOT set PORT manually (Render auto-injects)
- ✅ Root directory MUST be "server"
- ✅ Use Starter plan ($7/month) for reliable Puppeteer
- ✅ Health check path: "/"

### Netlify (Frontend):
- ❌ Do NOT forget base directory "client"
- ✅ Publish directory MUST be "client/dist"
- ✅ _redirects file MUST exist in public folder
- ✅ VITE_API_URL MUST include "/api" suffix

### Environment Variables:
- 🔄 CLIENT_ORIGINS: Update after Netlify deployment
- 🔄 VITE_API_URL: Update after Render deployment
- ⚠️ NO trailing slashes in URLs
- ⚠️ CORS must match exactly (https vs http matters)

---

## 🐛 TROUBLESHOOTING

### Issue: CORS Error
**Symptom:** "Access to XMLHttpRequest has been blocked"
**Fix:**
1. Check CLIENT_ORIGINS in Render matches Netlify URL exactly
2. No trailing slash: `https://app.netlify.app` ✅
3. With slash: `https://app.netlify.app/` ❌

### Issue: 404 on Page Refresh
**Symptom:** Direct URL navigation fails
**Fix:**
1. Verify _redirects exists: `client/public/_redirects`
2. Content: `/*    /index.html   200`
3. Redeploy Netlify

### Issue: API Calls Fail
**Symptom:** Network errors in browser console
**Fix:**
1. Check VITE_API_URL in Netlify environment variables
2. Must include "/api": `https://backend.onrender.com/api` ✅
3. Missing "/api": `https://backend.onrender.com` ❌

### Issue: Puppeteer Timeout
**Symptom:** PDF generation fails
**Fix:**
1. Upgrade to Render Starter plan ($7/month)
2. Free tier insufficient for Chrome + Node.js
3. Check Render logs for memory errors

---

## 📊 DEPLOYMENT COSTS

### Free Tier (Testing):
- Render Free: $0/month (sleeps after 15min inactivity)
- Netlify Free: $0/month (100GB bandwidth)
- **Total:** $0/month

### Production Tier:
- Render Starter: $7/month (always on, more resources)
- Netlify Free: $0/month (sufficient for most apps)
- **Total:** $7/month

**Recommendation:** Start free, upgrade Render if PDF generation is slow/fails.

---

## ✅ POST-DEPLOYMENT CHECKLIST

- [ ] Backend health check responds
- [ ] Frontend loads without errors
- [ ] CORS configured correctly
- [ ] File upload works
- [ ] Excel processing completes
- [ ] PDF generation works
- [ ] Downloads work (Excel + PDF)
- [ ] React Router navigation works
- [ ] No console errors
- [ ] Mobile responsive (test on phone)

---

## 🔄 CONTINUOUS DEPLOYMENT

### Auto-Deploy Setup:
1. **Render:** Enabled by default for main branch
2. **Netlify:** Enabled by default for main branch

### Making Updates:
```bash
git add .
git commit -m "your changes"
git push origin main
```

Both platforms auto-deploy on push to main. No manual action needed!

---

## 📞 SUPPORT RESOURCES

- **Render Docs:** https://render.com/docs
- **Netlify Docs:** https://docs.netlify.com/
- **Puppeteer on Render:** https://render.com/docs/puppeteer

**Deployment complete! 🎉**
