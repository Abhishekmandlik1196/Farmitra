@echo off
REM Farmitra - Quick Start Script (Windows)

echo ==========================================
echo    🌾 Farmitra - Smart Farming Companion
echo ==========================================

IF NOT EXIST "node_modules" (
    echo.
    echo 📦 Installing dependencies...
    call npm install
)

echo.
echo 🚀 Starting dev server...
echo    Open http://localhost:5173 in your browser
echo    Press Ctrl+C to stop
echo.

call npm run dev
