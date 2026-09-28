@echo off
REM Farmitra - Production server (Windows)

echo ==========================================
echo    🌾 Farmitra - Production Server
echo ==========================================

IF NOT EXIST "dist" (
    echo 📦 Building production bundle...
    call npm install
    call npm run build
)

echo.
echo 🚀 Serving on http://localhost:8080
echo    Press Ctrl+C to stop
echo.

node serve-dist.cjs
