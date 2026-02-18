# Development Environment Startup Script for Windows
# Run this script to start both frontend and backend

Write-Host "🚀 Starting CO Attainment Calculator - Development Mode" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
$nodeVersion = node --version 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Node.js is not installed. Please install Node.js 18+ first." -ForegroundColor Red
    exit 1
}

Write-Host "✅ Node.js version: $nodeVersion" -ForegroundColor Green
Write-Host ""

# Start Backend
Write-Host "📦 Starting Backend Server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\server'; npm start"
Start-Sleep -Seconds 3

# Start Frontend
Write-Host "🎨 Starting Frontend Development Server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\client'; npm run dev"
Start-Sleep -Seconds 2

Write-Host ""
Write-Host "✅ Development environment is starting..." -ForegroundColor Green
Write-Host ""
Write-Host "📍 Backend:  http://localhost:5000" -ForegroundColor Cyan
Write-Host "📍 Frontend: http://localhost:5173" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press any key to exit (this will NOT stop the servers)..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
