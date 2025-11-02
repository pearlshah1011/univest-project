#!/bin/bash

echo "🚀 Starting Univest Meeting Assistant Deployment"

# Check for Python and Node.js
if ! command -v python3 &> /dev/null; then
    echo "❌ Python3 is required but not installed. Please install Python 3.8 or higher."
    exit 1
fi

if ! command -v node &> /dev/null; then
    echo "❌ Node.js is required but not installed. Please install Node.js 14 or higher."
    exit 1
fi

# Create and activate Python virtual environment
echo "📦 Setting up Python virtual environment..."
python3 -m venv venv
source venv/bin/activate || source venv/Scripts/activate

# Install backend dependencies
echo "📥 Installing backend dependencies..."
pip install -r requirements.txt

# Install frontend dependencies and build
echo "🏗️ Setting up frontend..."
cd frontend
npm install

echo "🔨 Building frontend..."
npm run build

# Start the applications
echo "🌐 Starting the services..."

# Start backend in the background
cd ..
echo "🔄 Starting backend server..."
nohup uvicorn app.main:app --host 0.0.0.0 --port 8000 > backend.log 2>&1 &
BACKEND_PID=$!

# Serve frontend using a static server
echo "🌟 Setting up frontend server..."
cd frontend
npm install -g serve
serve -s dist -l 3000 > ../frontend.log 2>&1
FRONTEND_PID=$!

echo "✨ Deployment complete!"
echo "📝 Backend logs: backend.log"
echo "📝 Frontend logs: frontend.log"
echo "🔗 Backend running on: http://localhost:8000"
echo "🔗 Frontend running on: http://localhost:3000"
echo "💡 Process IDs - Backend: $BACKEND_PID, Frontend: $FRONTEND_PID"