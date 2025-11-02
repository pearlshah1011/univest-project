# Univest Meeting Assistant Deployment Script
Write-Host "🚀 Starting Univest Meeting Assistant Deployment" -ForegroundColor Cyan

# Check for Python and Node.js
if (-not (Get-Command python -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Python is required but not installed. Please install Python 3.8 or higher." -ForegroundColor Red
    exit 1
}

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Node.js is required but not installed. Please install Node.js 14 or higher." -ForegroundColor Red
    exit 1
}

# Create and activate Python virtual environment
Write-Host "📦 Setting up Python virtual environment..." -ForegroundColor Yellow
python -m venv venv
.\venv\Scripts\Activate

# Install backend dependencies
Write-Host "📥 Installing backend dependencies..." -ForegroundColor Yellow
pip install -r requirements.txt

# Install frontend dependencies and build
Write-Host "🏗️ Setting up frontend..." -ForegroundColor Yellow
Set-Location -Path frontend
npm install

Write-Host "🔨 Building frontend..." -ForegroundColor Yellow
npm run build

# Start the applications
Write-Host "🌐 Starting the services..." -ForegroundColor Green

# Start backend
Set-Location -Path ..
Write-Host "🔄 Starting backend server..." -ForegroundColor Yellow
$backendJob = Start-Job -ScriptBlock {
    Set-Location $using:PWD
    .\venv\Scripts\uvicorn app.main:app --host 0.0.0.0 --port 8000
}

# Serve frontend using a static server
Write-Host "🌟 Setting up frontend server..." -ForegroundColor Yellow
Set-Location -Path frontend
npm install -g serve
$frontendJob = Start-Job -ScriptBlock {
    Set-Location $using:PWD
    serve -s dist -l 3000
}

Write-Host "✨ Deployment complete!" -ForegroundColor Green
Write-Host "🔗 Backend running on: http://localhost:8000" -ForegroundColor Cyan
Write-Host "🔗 Frontend running on: http://localhost:3000" -ForegroundColor Cyan
Write-Host "💡 Job IDs - Backend: $($backendJob.Id), Frontend: $($frontendJob.Id)" -ForegroundColor Yellow
Write-Host "`nTo stop the services, run: Stop-Job $($backendJob.Id), $($frontendJob.Id)" -ForegroundColor Yellow