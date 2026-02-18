# CO Attainment Calculator

A full-stack web application for generating Course Outcome (CO) attainment reports from Excel files, with automated PDF generation.

## 🚀 Quick Start

### Local Development

**Backend:**
```bash
cd server
npm install
npm start
```

**Frontend:**
```bash
cd client
npm install
npm run dev
```

Visit: http://localhost:5173

### Production Deployment

See [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) for step-by-step instructions.

## 📁 Project Structure

- **client/** - React frontend (Netlify)
- **server/** - Express backend (Render)

## 🔧 Tech Stack

**Frontend:**
- React 18 + Vite 7
- Tailwind CSS
- Axios
- React Router DOM

**Backend:**
- Node.js + Express
- Multer (file uploads)
- ExcelJS (Excel processing)
- Puppeteer (PDF generation)

## 📚 Documentation

- [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) - Complete deployment guide
- [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) - Quick reference
- [DEPLOYMENT_SUMMARY.md](DEPLOYMENT_SUMMARY.md) - All changes made
- [ARCHITECTURE.md](ARCHITECTURE.md) - System architecture

## 🌐 Deployment Platforms

- **Frontend:** Netlify (Free)
- **Backend:** Render (Free / $7/month Starter)

## ⚙️ Environment Variables

**Backend (.env):**
```bash
PORT=5000
NODE_ENV=development
CLIENT_ORIGINS=http://localhost:5173
```

**Frontend (.env):**
```bash
VITE_API_URL=http://localhost:5000/api
```

## 🎯 Features

- ✅ Excel file upload and processing
- ✅ CO attainment calculation
- ✅ Matrix generation
- ✅ Excel export
- ✅ PDF export
- ✅ Data preview
- ✅ Responsive design

## 📝 License

MIT

## 👤 Author

Rohith Palanivel - Full Stack Developer
